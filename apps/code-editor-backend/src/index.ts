import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import Docker from 'dockerode';

// setup:
const app = express();
const port = 5000;
const docker = new Docker();

app.use(cors());
app.use(express.json());

// Create a directory for temporary code files if it doesn't exist
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Define the type for the request body
interface RunRequestBody {
    language: 'javascript' | 'python';
    code: string;
}

// --- API ENDPOINT ---
app.post('/run', async (req: Request, res: Response) => {
    // Apply the type to req.body here for type safety
    const { language, code } = req.body as RunRequestBody;

    if (!code) {
        res.status(400).json({ error: 'Code is required.' });
        return;
    }

    // --- LANGUAGE CONFIGURATION ---
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
        default:
            // This default case handles any languages that are not 'javascript' or 'python'
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
            // The Docker log stream has an 8-byte header we need to strip
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
