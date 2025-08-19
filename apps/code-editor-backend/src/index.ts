// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import Docker from 'dockerode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// --- SETUP ---
const app = express();
const port = process.env.PORT || 5000;

// --- DOCKER INITIALIZATION - FIXED FOR RENDER ---
// Render doesn't support Docker-in-Docker for Web Services, only for background workers
// We'll use a different approach that works on Render
console.log(`Initializing in environment: ${process.env.RENDER ? 'Render' : 'Local'}`);

let docker: Docker;
if (process.env.RENDER) {
    // On Render, we can't use Docker-in-Docker for Web Services
    // We'll use a fallback method using child processes
    docker = null as any;
} else {
    // Local development with Docker
    docker = new Docker();
}

app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Add 'cpp' to the list of allowed languages
interface RunRequestBody {
    language: 'javascript' | 'python' | 'cpp';
    code: string;
}

// Function to execute code without Docker (for Render)
async function executeWithoutDocker(language: string, code: string, fileName: string, extension: string): Promise<string> {
    const filePath = path.join(tempDir, `${fileName}.${extension}`);
    fs.writeFileSync(filePath, code);

    try {
        let command: string;

        switch (language) {
            case 'javascript':
                command = `node ${filePath}`;
                break;
            case 'python':
                command = `python ${filePath}`;
                break;
            case 'cpp':
                // Compile then run
                const outputFile = path.join(tempDir, fileName);
                await execAsync(`g++ ${filePath} -o ${outputFile}`);
                command = outputFile;
                break;
            default:
                throw new Error(`Unsupported language: ${language}`);
        }

        const { stdout, stderr } = await execAsync(command);
        return stdout + (stderr ? `\nERROR: ${stderr}` : '');
    } catch (error: any) {
        return error.stderr || error.message;
    } finally {
        // Clean up
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Clean up compiled C++ binary
        if (language === 'cpp') {
            const outputFile = path.join(tempDir, fileName);
            if (fs.existsSync(outputFile)) {
                fs.unlinkSync(outputFile);
            }
        }
    }
}

// --- API ENDPOINT ---
app.post('/run', async (req: Request, res: Response) => {
    const { language, code } = req.body as RunRequestBody;

    if (!code) {
        res.status(400).json({ error: 'Code is required.' });
        return;
    }

    let imageName: string, command: string[], extension: string;
    const fileName = `code-${Date.now()}`;

    switch (language) {
        case 'javascript':
            imageName = 'node:alpine';
            extension = 'js';
            command = ['node', `/app/${fileName}.${extension}`];
            break;
        case 'python':
            imageName = 'python:alpine';
            extension = 'py';
            command = ['python', `/app/${fileName}.${extension}`];
            break;
        case 'cpp':
            imageName = 'gcc:latest';
            extension = 'cpp';
            command = ['/bin/sh', '-c', `g++ /app/${fileName}.${extension} -o /app/output && /app/output`];
            break;
        default:
            const unhandledLanguage: never = language;
            res.status(400).json({ error: `Language "${unhandledLanguage}" is not supported.` });
            return;
    }

    // On Render, use the fallback method
    if (process.env.RENDER) {
        try {
            const output = await executeWithoutDocker(language, code, fileName, extension);
            res.json({ output });
        } catch (error) {
            console.error("Execution failed:", error);
            res.status(500).json({ error: 'Failed to execute code.' });
        }
        return;
    }

    // Local execution with Docker
    const filePath = path.join(tempDir, `${fileName}.${extension}`);
    fs.writeFileSync(filePath, code);

    try {
        const container = await docker.createContainer({
            Image: imageName,
            Cmd: command,
            HostConfig: {
                Binds: [`${tempDir}:/app`],
                AutoRemove: true,
            },
            Tty: false,
        });

        await container.start();

        const logs = await container.logs({ follow: true, stdout: true, stderr: true });

        let output = '';
        logs.on('data', (chunk: Buffer) => {
            output += chunk.toString('utf8').substring(8);
        });

        await new Promise<void>((resolve) => logs.on('end', resolve));

        res.json({ output });

    } catch (error) {
        console.error("Docker execution failed:", error);
        res.status(500).json({ error: 'Failed to execute code.' });
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});