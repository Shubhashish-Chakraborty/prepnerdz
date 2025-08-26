import React, { useState } from "react";

const LangSelect = ({ value, onChange }: { value: string; onChange: (lang: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { id: "javascript", name: "JavaScript", icon: "JS" },
        { id: "python", name: "Python", icon: "Py" },
        { id: "cpp", name: "C++", icon: "C++" }
    ];

    const currentLang = languages.find(lang => lang.id === value) || languages[0];

    return (
        <div className="relative inline-block">
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white cursor-pointer select-none hover:bg-gray-700 transition-colors"
            >
                <span className="w-6 h-6 flex items-center justify-center bg-cyan-600 rounded text-xs font-bold">
                    {currentLang.icon}
                </span>
                {currentLang.name}
                <svg 
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 shadow-lg rounded-md p-2 w-40 z-10">
                    <ul className="space-y-1">
                        {languages.map((lang) => (
                            <li key={lang.id}>
                                <button
                                    onClick={() => {
                                        onChange(lang.id);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center gap-2 w-full px-3 py-2 rounded text-left hover:bg-gray-700 transition-colors ${
                                        value === lang.id ? 'bg-cyan-900 text-cyan-100' : 'text-white'
                                    }`}
                                >
                                    <span className="w-6 h-6 flex items-center justify-center bg-cyan-600 rounded text-xs font-bold">
                                        {lang.icon}
                                    </span>
                                    {lang.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LangSelect;