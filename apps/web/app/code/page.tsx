"use client"

import React, { useState, useRef, useEffect } from "react"
import { Terminal, Keyboard, Eraser, Play, Loader2, Code2, Home, Info } from "lucide-react"
import Link from "next/link";
import AdsenseAd from "@/components/ads/AdsenseAd";

// --- INTERNAL MOCK COMPONENTS (to resolve "Could not resolve" errors) ---

// Mock Adsense Component
// const AdsenseAd = ({ slot, className, style, format }: any) => (
//     <div className={`bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-600 text-xs overflow-hidden ${className}`} style={style}>
//         <div className="text-center">
//             <p className="font-bold opacity-50">ADVERTISEMENT</p>
//             <p className="opacity-30 text-[10px] uppercase">{format} - {slot}</p>
//         </div>
//     </div>
// );

// Mock Typing Text Component
const TypingText = ({ text, className }: { text: string; className?: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [text]);
    return <span className={className}>{displayedText}</span>;
};

interface LangSelectProps {
  value: string;
  onChange: (value: string) => void;
  configs: Record<string, unknown>;
}

// Internal LangSelect Component
const LangSelect = ({ value, onChange, configs }: LangSelectProps) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
        {Object.keys(configs).map((lang) => (
            <option key={lang} value={lang}>
                {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
        ))}
    </select>
);

// Internal CodeRun Button Component
const CodeRun = ({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white font-bold py-2 px-6 rounded-md transition-all flex items-center gap-2 text-sm shadow-lg active:scale-95"
    >
        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
        {isLoading ? "Running..." : "Run Code"}
    </button>
);

// --- MAIN APP COMPONENT ---

export default function App() {
    // Piston Configuration
    const languageConfig: Record<string, { name: string; version: string; defaultCode: string }> = {
        javascript: {
            name: "javascript",
            version: "18.15.0",
            defaultCode: "// Write your JavaScript here\nconsole.log('Hello from PrepNerdz!');\n\n// Try reading input:\n// const fs = require('fs');\n// const input = fs.readFileSync(0, 'utf8');\n// console.log('Your input was:', input);"
        },
        python: {
            name: "python",
            version: "3.10.0",
            defaultCode: "# Write your Python here\nname = input('Enter your name: ')\nprint(f'Hello, {name}!')\nprint('Welcome to PrepNerdz!')"
        },
        cpp: {
            name: "c++",
            version: "10.2.0",
            defaultCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << \"Enter your name: \";\n    if (!(cin >> name)) {\n        cout << \"Stranger\";\n    } else {\n        cout << name;\n    }\n    cout << \"! Welcome to PrepNerdz!\" << endl;\n    return 0;\n}"
        },
    };

    const [code, setCode] = useState(languageConfig.javascript.defaultCode);
    const [language, setLanguage] = useState("javascript");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showOutput, setShowOutput] = useState(true);
    const [editorWidth, setEditorWidth] = useState(60); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const [fontSize, setFontSize] = useState(14);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        console.log(setFontSize);
    }, [])

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        setCode(languageConfig[newLanguage].defaultCode);
    };

    const handleRunCode = async () => {
        setIsLoading(true);
        setOutput("");
        setShowOutput(true);

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: languageConfig[language].name,
                    version: languageConfig[language].version,
                    files: [{ content: code }],
                    stdin: input,
                }),
            });

            const data = await response.json();

            if (data.run) {
                const result = data.run.stdout || data.run.stderr || "Program executed with no output.";
                setOutput(result);
            } else {
                setOutput(`Error: ${data.message || "Execution failed"}`);
            }
        } catch (error) {
            console.log(error)
            setOutput("Error: Failed to reach execution server. Please check your internet connection.");
        } finally {
            setIsLoading(false);
        }
    };

    // Resize Handling
    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
            setEditorWidth(Math.min(Math.max(newWidth, 20), 80));
        };

        const onMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
            document.body.style.cursor = "col-resize";
        } else {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            document.body.style.cursor = "";
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="flex flex-col min-h-screen bg-[#0B0F0C] text-zinc-100 font-sans selection:bg-blue-500/30">

            {/* Top Header Ad */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F0C] border-b border-zinc-800 h-[60px]">
                <div className="flex justify-center items-center h-full max-w-7xl mx-auto px-4">
                    <AdsenseAd
                        client="ca-pub-8097731478229459"
                        slot="5261635117"
                        className="w-full h-[50px] rounded"
                        format="horizontal"
                    />
                </div>
            </div>

            {/* Sidebar Ad */}
            <div className="fixed right-4 top-[120px] bottom-4 z-40 hidden 2xl:block">
                <AdsenseAd
                    client="ca-pub-8097731478229459"
                    slot="5390429950"
                    className="w-[160px] h-full rounded"
                    format="vertical"
                />
            </div>

            <main className="flex flex-col flex-1 pt-[60px] px-4 md:px-8 2xl:pr-[200px]">

                {/* Navigation & Controls */}
                <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center py-6 gap-4 border-b border-zinc-800/50 mb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-900/20">
                                <Code2 size={24} className="text-white" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">PrepNerdz <span className="text-blue-500 italic">Exclusive</span> Editor</h1>
                        </div>
                        <p className="text-zinc-500 text-sm pl-11">Advanced coding environment with Piston Engine v2</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800 w-full xl:w-auto">
                        <div className="hidden lg:flex items-center gap-4 px-3 text-sm text-zinc-400">
                            <Link href="/" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"><Home size={14} /> Home</Link>
                            <Link href="/about" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"><Info size={14} /> About</Link>
                        </div>
                        <div className="h-6 w-px bg-zinc-800 hidden lg:block mx-1"></div>
                        <LangSelect value={language} onChange={handleLanguageChange} configs={languageConfig} />
                        <CodeRun isLoading={isLoading} onClick={handleRunCode} />
                        <button
                            onClick={() => setShowOutput(!showOutput)}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${showOutput ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-zinc-100 text-black hover:bg-white'}`}
                        >
                            {showOutput ? "Hide Console" : "Open Console"}
                        </button>
                    </div>
                </header>

                {/* Workspace Container */}
                <div className="flex-1 flex flex-col lg:flex-row gap-0 min-h-[650px] bg-[#050505] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl relative" ref={containerRef}>

                    {/* Editor Panel */}
                    <div className="flex flex-col relative" style={{ width: showOutput ? `${editorWidth}%` : "100%" }}>
                        <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 border-b border-zinc-800 flex justify-between items-center z-10">
                            <div className="flex items-center gap-3">
                                <span className="flex gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                                </span>
                                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5 border-l border-zinc-800 pl-3">
                                    <Keyboard size={12} /> main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'cpp'}
                                </span>
                            </div>
                            <TypingText text="Ctrl +/- to zoom" className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold" />
                        </div>

                        {/* Note: Monaco doesn't resolve in standalone preview, so using textarea as fallback for preview functionality */}
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck="false"
                            style={{ fontSize: `${fontSize}px` }}
                            className="flex-1 bg-transparent p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed text-zinc-300 selection:bg-blue-500/40"
                        />

                        <div className="absolute bottom-4 right-6 pointer-events-none opacity-20">
                            <Code2 size={120} />
                        </div>
                    </div>

                    {/* Resizer Handle */}
                    {showOutput && (
                        <div
                            onMouseDown={onMouseDown}
                            className="w-1.5 hidden lg:flex items-center justify-center cursor-col-resize bg-zinc-800 hover:bg-blue-600 transition-colors group"
                        >
                            <div className="w-[1px] h-12 bg-zinc-700 group-hover:bg-blue-300 transition-colors"></div>
                        </div>
                    )}

                    {/* Console Area */}
                    {showOutput && (
                        <div className="flex flex-col bg-[#020202]" style={{ width: `${100 - editorWidth}%` }}>

                            {/* STDIN Panel */}
                            <div className="h-1/3 flex flex-col border-b border-zinc-800">
                                <div className="bg-zinc-900/50 px-4 py-2 flex justify-between items-center">
                                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                        <Keyboard size={12} /> Standard Input (STDIN)
                                    </h3>
                                    <button onClick={() => setInput("")} className="text-zinc-600 hover:text-white transition p-1">
                                        <Eraser size={12} />
                                    </button>
                                </div>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Provide inputs for your program here..."
                                    className="flex-1 bg-transparent p-4 text-sm font-mono focus:outline-none resize-none text-zinc-400 placeholder:text-zinc-800"
                                />
                            </div>

                            {/* STDOUT Panel */}
                            <div className="flex-1 flex flex-col">
                                <div className="bg-zinc-900/50 px-4 py-2 flex justify-between items-center">
                                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                        <Terminal size={12} /> Terminal Output
                                    </h3>
                                    <button onClick={() => setOutput("")} className="text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-tighter">
                                        Clear
                                    </button>
                                </div>
                                <div className="flex-1 p-6 font-mono text-sm overflow-auto custom-scrollbar">
                                    {isLoading ? (
                                        <div className="flex items-center gap-3 text-blue-500">
                                            <Loader2 size={16} className="animate-spin" />
                                            <span className="text-xs uppercase tracking-widest font-bold">Compiling & Executing...</span>
                                        </div>
                                    ) : output ? (
                                        <pre className={`whitespace-pre-wrap ${output.toLowerCase().includes("error") || output.toLowerCase().includes("exception") ? "text-red-400" : "text-emerald-400"}`}>
                                            {output}
                                        </pre>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-zinc-700 opacity-40">
                                            <Terminal size={48} strokeWidth={1} className="mb-2" />
                                            <p className="text-xs font-bold uppercase tracking-widest">Awaiting execution</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Ad / Footer Area */}
                {/* <footer className="mt-8 mb-12 text-center space-y-6">
          <div className="max-w-4xl mx-auto border-t border-zinc-800 pt-8">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Development Environment Insights</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Security', val: 'Sandboxed' },
                 { label: 'Latency', val: '~200ms' },
                 { label: 'Engine', val: 'Piston CE' },
                 { label: 'Memory', val: '512MB' }
               ].map(stat => (
                 <div key={stat.label} className="bg-zinc-900/30 border border-zinc-800/50 p-3 rounded-lg">
                   <p className="text-zinc-600 text-[9px] uppercase font-bold">{stat.label}</p>
                   <p className="text-zinc-300 text-xs font-mono">{stat.val}</p>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 text-zinc-500 text-xs py-4">
             <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-1">Docs <ExternalLink size={10}/></a>
             <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-1">API <ExternalLink size={10}/></a>
             <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-1">GitHub <ExternalLink size={10}/></a>
          </div>
        </footer> */}
            </main>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #050505;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #252525;
        }
        textarea::selection {
          background: rgba(59, 130, 246, 0.4);
        }
      `}</style>
        </div>
    );
}