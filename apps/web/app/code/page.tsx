"use client"

import type * as monaco from "monaco-editor"
import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import Editor from "@monaco-editor/react"
import axios from "axios"
import AdsenseAd from "@/components/ads/AdsenseAd"
import Link from "next/link"
import LangSelect from "@/components/ui/code-editor/LangSelect"
import CodeRun from "@/components/ui/buttons/RunCodeBtn"
import TypingText from "@/components/ui/TypingTest"

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
    const [fontSize, setFontSize] = useState<number>(14) // Default font size

    const containerRef = useRef<HTMLDivElement>(null)
    const resizeRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    // const editorRef = useRef<any>(null)

    // Function to handle editor mount
    const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;

        // Add keyboard event listener for zoom in/out
        editor.onKeyDown((e: monaco.IKeyboardEvent) => {
            // Check for Ctrl+ (zoom in) or Ctrl- (zoom out)
            if (e.ctrlKey && (e.code === 'Equal' || e.code === 'NumpadAdd')) {
                e.preventDefault();
                setFontSize(prev => Math.min(prev + 1, 30)); // Max font size 30
            } else if (e.ctrlKey && (e.code === 'Minus' || e.code === 'NumpadSubtract')) {
                e.preventDefault();
                setFontSize(prev => Math.max(prev - 1, 8)); // Min font size 8
            }
        });
    };

    // Add a default snippet for different languages
    const defaultCode: { [key: string]: string } = {
        javascript: 'console.log("Hello, JavaScript!");',
        python: 'print("Hello, Python!")',
        cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}',
    }

    const handleLanguageChange = (newLanguage: string) => {
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
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return

            e.preventDefault()
            const container = containerRef.current
            const containerRect = container.getBoundingClientRect()
            const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

            // Constrain between 25% and 75% for better usability
            const constrainedWidth = Math.min(Math.max(newWidth, 25), 75)
            setEditorWidth(constrainedWidth)
        },
        [isDragging],
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        if (isDragging) {
            const handleMove = (e: MouseEvent) => handleMouseMove(e)
            const handleUp = () => handleMouseUp()

            document.addEventListener("mousemove", handleMove, { passive: false })
            document.addEventListener("mouseup", handleUp)
            document.body.style.cursor = "col-resize"
            document.body.style.userSelect = "none"

            return () => {
                document.removeEventListener("mousemove", handleMove)
                document.removeEventListener("mouseup", handleUp)
                document.body.style.cursor = ""
                document.body.style.userSelect = ""
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0B0F0C] to-[#3f3801] text-white">
            {/* Fixed Horizontal Ad at Top - FIXED */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F0C] border-b border-gray-700" style={{ height: "60px" }}>
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
                {/* Header with Controls */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 mt-10 border-b border-gray-700 pb-4 gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-xl sm:text-2xl font-bold text-white">PrepNerdz Exclusive Code Editor</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Practice your code, Learn DSA, Enhance your skills with our online editor.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <div className="hidden md:flex items-center gap-3 text-sm text-gray-300">
                            <Link href="/" className="hover:text-amber-400 transition-colors">
                                Home
                            </Link>
                            <span className="text-gray-600">|</span>
                            {/* <Link href="/practice" className="hover:text-amber-400 transition-colors">
                                Practice Problems
                            </Link> */}
                            {/* <span className="text-gray-600">|</span> */}
                            <Link href="/about" className="hover:text-amber-400 transition-colors">
                                About Us
                            </Link>

                        </div>

                        <LangSelect value={language} onChange={handleLanguageChange} />

                        <CodeRun isLoading={isLoading} onClick={handleRunCode} />

                        <button
                            onClick={toggleOutput}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out text-sm whitespace-nowrap"
                        >
                            {showOutput ? "Hide Output" : "Show Output"}
                        </button>
                    </div>
                </header>

                {/* Editor and Output Container */}
                <div className="flex-1 flex flex-col lg:flex-row gap-0 min-h-0 relative" ref={containerRef}>
                    {/* Editor Panel */}
                    <div
                        className={`flex flex-col transition-all duration-200 ${showOutput ? "lg:flex-none" : "w-full"}`}
                        style={{
                            width: showOutput ? `${editorWidth}%` : "100%",
                            minWidth: showOutput ? "300px" : undefined,
                        }}
                    >
                        <div className="flex items-center justify-between mr-6">
                            <h2 className="text-lg font-semibold text-gray-300">Editor</h2>
                            <div className="text-sm text-gray-300">
                                <TypingText text="Click inside the Code Editor, Ctrl +/- to zoom in/out" />
                            </div>
                        </div>
                        <div className="flex-1 border border-gray-600 rounded-md overflow-hidden min-h-[400px]">
                            <Editor
                                height="100%"
                                language={language === "cpp" ? "cpp" : language}
                                theme="vs-dark"
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                onMount={handleEditorDidMount}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: fontSize,
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

                    {showOutput && (
                        <div
                            ref={resizeRef}
                            className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-gray-700 hover:bg-gray-600 transition-colors duration-200 select-none group relative"
                            onMouseDown={handleMouseDown}
                            style={{
                                minWidth: "8px",
                                zIndex: 10,
                            }}
                        >
                            <div className="w-1 h-12 bg-gray-300 group-hover:bg-gray-400 rounded transition-colors duration-200 pointer-events-none"></div>
                            {/* Visual indicator when dragging */}
                            {isDragging && <div className="absolute inset-0 bg-blue-500 opacity-50 rounded"></div>}
                        </div>
                    )}

                    {/* Output Panel */}
                    {showOutput && (
                        <div
                            className="flex flex-col transition-all duration-200 lg:flex-none w-full"
                            style={{
                                width: `${100 - editorWidth}%`,
                                minWidth: "300px",
                            }}
                        >
                            <div className="flex items-center justify-between ml-6">
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