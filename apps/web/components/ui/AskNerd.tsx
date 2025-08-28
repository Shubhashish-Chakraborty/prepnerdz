"use client";

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

// --- SVG Icons (Self-contained for portability) ---

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a.75.75 0 000 1.5h6.75a.75.75 0 000-1.5h-6.75zm-3 3.75a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
    </svg>
);

const MessageSendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);


// --- Main Component ---

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function AskNerd() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome-1',
            text: "Hi! I'm AskNerd, your AI assistant for PrepNerdz. How can I help you today?",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const suggestedQuestions = [
        "What is PrepNerdz and how can it help me?",
        "Where can I find RGPV notes?",
        "How to download previous year papers?",
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 300); // Focus input after open animation
        }
    }, [isOpen, messages]);

    const handleSendMessage = async (messageText: string = inputText) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (question: string) => {
        handleSendMessage(question);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 bg-amber-300 hover:bg-amber-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform ${isOpen ? 'scale-0' : 'scale-100 hover:scale-110'}`}
                title="AskNerd - AI Assistant"
                aria-label="Open chat"
            >
                <Image
                    src={"/asknerd-logo.png"}
                    alt="AskNerd Logo"
                    width={45}
                    height={45}
                />
            </button>

            {/* Chat Widget */}
            <div className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[calc(100vh-5rem)] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 ease-in-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
                    <div className="flex items-center space-x-3">
                        <div className="md:w-24 md:h-24 w-14 h-14 bg-white/30 rounded-full flex items-center justify-center ring-2 ring-white/50">
                            <Image
                                src={"/asknerd-logo.png"}
                                alt="AskNerd Logo"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">AskNerd</h3>
                            <p className="text-xs opacity-90 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                                AI Assistant
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="hover:bg-white/20 rounded-full p-1.5 transition-colors"
                        aria-label="Close chat"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex items-end gap-2 animate-fade-in-up ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            {!message.isUser && (
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                    <BotIcon />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${message.isUser
                                    ? 'bg-amber-500 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                <p className="text-xs opacity-60 mt-1.5 text-right">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex items-end gap-2 animate-fade-in-up">
                            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                <BotIcon />
                            </div>
                            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-sm text-gray-500">Typing</span>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Suggested Questions */}
                    {messages.length === 1 && !isLoading && (
                        <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            <p className="text-xs text-gray-500 mb-2 text-center">Or try one of these:</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {suggestedQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestionClick(q)}
                                        className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask anything..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                            disabled={isLoading}
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputText.trim() || isLoading}
                            className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 transform hover:scale-110"
                            aria-label="Send message"
                        >
                            <MessageSendIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add custom keyframe animations to global styles or a <style> tag in your layout */}
            {/* <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style> */}
        </>
    );
}
