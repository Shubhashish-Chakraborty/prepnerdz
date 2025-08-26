"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import Editor from "@monaco-editor/react"
import axios from "axios"
import AdsenseAd from "@/components/ads/AdsenseAd"
import Navbar from "@/components/ui/navbars/Leaderboard-Navbar"

export default function CodePage() {
    // State variables
    const [code, setCode] = useState<string>(
        "// Welcome to the Online Code Editor!\n// Select a language and start coding.",
    )
    const [language, setLanguage] = useState<string>("javascript")
    const [output, setOutput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showOutput, setShowOutput] = useState<boolean>(true)
    const [editorWidth, setEditorWidth] = useState<number>(50) // Percentage
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const resizeRef = useRef<HTMLDivElement>(null)

    // Add a default snippet for different languages
    const defaultCode: { [key: string]: string } = {
        javascript: 'console.log("Hello, JavaScript!");',
        python: 'print("Hello, Python!")',
        cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}',
    }

    // Handler for language change
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.target.value
        setLanguage(newLanguage)
        setCode(defaultCode[newLanguage] || "")
    }

    // Handler for running the code
    const handleRunCode = async () => {
        setIsLoading(true)
        setOutput("")
        setShowOutput(true) // Auto-show output when running

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_CODE_EDITOR_BACKEND_URL}/run`, {
                language,
                code,
            })
            setOutput(response.data.output)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setOutput((error.response?.data as { error?: string })?.error || "An error occurred while running the code.")
            } else {
                setOutput("An unexpected error occurred.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const toggleOutput = () => {
        setShowOutput(!showOutput)
    }

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return

            const container = containerRef.current
            const containerRect = container.getBoundingClientRect()
            const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

            // Constrain between 20% and 80%
            const constrainedWidth = Math.min(Math.max(newWidth, 20), 80)
            setEditorWidth(constrainedWidth)
        },
        [isDragging],
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
            document.body.style.cursor = "col-resize"
            document.body.style.userSelect = "none"
        } else {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.body.style.cursor = ""
            document.body.style.userSelect = ""
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.body.style.cursor = ""
            document.body.style.userSelect = ""
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Fixed Horizontal Ad at Top - FIXED */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700" style={{ height: "60px" }}>
                <div className="flex justify-center items-center h-full">
                    <AdsenseAd
                        client="ca-pub-8097731478229459"
                        slot="5261635117"
                        className="w-full max-w-4xl"
                        style={{ display: "block", width: "728px", height: "60px" }}
                        format="horizontal"
                    />
                </div>
            </div>

            {/* Fixed Vertical Ad at Right */}
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
                <AdsenseAd
                    client="ca-pub-8097731478229459"
                    slot="5390429950"
                    className="h-full"
                    style={{ display: "block", width: "160px", height: "600px" }}
                    format="vertical"
                />
            </div>

            {/* Main Content with Top Margin for Ad - FIXED */}
            <main className="flex flex-col flex-1 pt-16 px-4 pb-4 xl:pr-44">
                <div className="mt-6">
                    <Navbar />
                </div>

                {/* Header with Controls */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-gray-700 pb-4 gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">Code Editor</h1>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm min-w-[120px]"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="cpp">C++</option>
                        </select>
                        <button
                            onClick={handleRunCode}
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                        >
                            {isLoading ? "Running..." : "Run Code"}
                        </button>
                        <button
                            onClick={toggleOutput}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out text-sm whitespace-nowrap"
                        >
                            {showOutput ? "Hide Output" : "Show Output"}
                        </button>
                    </div>
                </header>

                {/* Editor and Output Container */}
                <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0" ref={containerRef}>
                    {/* Editor Panel */}
                    <div
                        className={`flex flex-col transition-all duration-300 ${showOutput ? "lg:flex-1 w-full" : "w-full"}`}
                        style={{
                            width: showOutput ? `${editorWidth}%` : "100%",
                            minWidth: showOutput ? "300px" : undefined,
                        }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold text-gray-300">Editor</h2>
                        </div>
                        <div className="flex-1 border border-gray-600 rounded-md overflow-hidden min-h-[400px]">
                            <Editor
                                height="100%"
                                language={language === "cpp" ? "cpp" : language}
                                theme="vs-dark"
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    wordWrap: "on",
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollbar: {
                                        vertical: "visible",
                                        horizontal: "visible",
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Resizer */}
                    {showOutput && (
                        <div
                            ref={resizeRef}
                            className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-gray-700 hover:bg-gray-600 transition-colors duration-200 rounded select-none"
                            onMouseDown={handleMouseDown}
                        >
                            <div className="w-1 h-8 bg-gray-500 rounded pointer-events-none"></div>
                        </div>
                    )}

                    {/* Output Panel */}
                    {showOutput && (
                        <div
                            className="flex flex-col transition-all duration-300 lg:flex-1 w-full"
                            style={{
                                width: `${100 - editorWidth}%`,
                                minWidth: "300px",
                            }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold text-gray-300">Output</h2>
                                <button
                                    onClick={() => setOutput("")}
                                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors duration-200"
                                >
                                    Clear
                                </button>
                            </div>
                            <div className="flex-1 bg-black border border-gray-600 rounded-md p-4 overflow-auto min-h-[400px] max-h-[600px] output-container">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                                    </div>
                                ) : (
                                    <pre className="text-sm whitespace-pre-wrap text-green-400 font-mono">
                                        {output || "No output yet. Run your code to see results here."}
                                    </pre>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}