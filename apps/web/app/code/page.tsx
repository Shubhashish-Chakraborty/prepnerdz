'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function Home() {
    // State variables
    const [code, setCode] = useState<string>('// Welcome to the Online Code Editor!\n// Select a language and start coding.');
    const [language, setLanguage] = useState<string>('javascript');
    const [output, setOutput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Add a default snippet for C++
    const defaultCode: { [key: string]: string } = {
        javascript: 'console.log("Hello, JavaScript!");',
        python: 'print("Hello, Python!")',
        cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}',
    };

    // Handler for language change
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);
        setCode(defaultCode[newLanguage] || '');
    };

    // Handler for running the code (no changes here)
    const handleRunCode = async () => {
        setIsLoading(true);
        setOutput('');
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_CODE_EDITOR_BACKEND_URL}/run`, {
                language,
                code,
            });
            setOutput(response.data.output);
        } catch (error: unknown) {
            // setOutput(error.response?.data?.error || 'An error occurred while running the code.');
            if (axios.isAxiosError(error)) {
                setOutput(
                    (error.response?.data as { error?: string })?.error ||
                    "An error occurred while running the code."
                );
            } else {
                setOutput("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative flex flex-col min-h-screen bg-gray-900 text-white p-4 font-sans">
            <header className="relative z-10 flex space-x-90 items-center mb-4 border-b border-gray-700 pb-2">
                <h1 className="text-2xl font-bold text-cyan-400">Under Development!</h1>
                <div className="flex items-center space-x-4">
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                    </select>
                    <button
                        onClick={handleRunCode}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Running...' : 'Run Code'}
                    </button>
                </div>
            </header>

            <div className="relative z-10 flex flex-grow gap-4">
                <div className="w-1/2 flex flex-col">
                    <Editor
                        height="80vh"
                        // Use 'cpp' for Monaco's language highlighting
                        language={language === 'cpp' ? 'cpp' : language}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 16,
                            wordWrap: 'on',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>

                <div className="w-1/2 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-gray-300">Output:</h2>
                    <div className="bg-black rounded-md p-4 h-full overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">{output}</pre>
                    </div>
                </div>
            </div>
        </main>
    );
}
