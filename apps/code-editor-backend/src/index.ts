// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import Docker from 'dockerode';
import { URL } from 'url'; // Import the URL class

// --- SETUP ---
const app = express();
const port = 5000;

// --- DOCKER INITIALIZATION - FINAL ROBUST FIX ---
let docker: Docker;

// Add logging to see what the environment variable is in production
console.log(`DOCKER_HOST environment variable is: ${process.env.DOCKER_HOST}`);

try {
    // Check if the DOCKER_HOST variable is set and in the expected format
    if (process.env.DOCKER_HOST && process.env.DOCKER_HOST.startsWith('tcp://')) {
        console.log('DOCKER_HOST found, attempting to connect via TCP...');
        const dockerHostUrl = new URL(process.env.DOCKER_HOST);
        docker = new Docker({
            host: dockerHostUrl.hostname,
            port: dockerHostUrl.port,
        });
        console.log(`Successfully configured Docker to connect to ${dockerHostUrl.hostname}:${dockerHostUrl.port}`);
    } else {
        console.log('DOCKER_HOST not found or invalid, falling back to default socket connection for local dev...');
        // This is for local development on Windows/Mac/Linux
        docker = new Docker();
    }
} catch (e) {
    console.error('FATAL: Could not initialize Docker. Please check DOCKER_HOST environment variable.', e);
    // Fallback to the default, which will likely fail but prevents the app from crashing on startup.
    docker = new Docker();
}


app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Add 'cpp' to the list of allowed languages
interface RunRequestBody {
    language: 'javascript' | 'python' | 'cpp';
    code: string;
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
        // Add the case for C++
        case 'cpp':
            imageName = 'gcc:latest'; // Use the official GCC compiler image
            extension = 'cpp';
            // This command first compiles the code into an executable named 'output',
            // and then executes it. Both stdout and stderr from both commands are captured.
            command = ['/bin/sh', '-c', `g++ /app/${fileName}.${extension} -o /app/output && /app/output`];
            break;
        default:
            const unhandledLanguage: never = language;
            res.status(400).json({ error: `Language "${unhandledLanguage}" is not supported.` });
            return;
    }

    const filePath = path.join(tempDir, `${fileName}.${extension}`);
    fs.writeFileSync(filePath, code);

    // --- DOCKER EXECUTION ---
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
        fs.unlinkSync(filePath);
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
