import React from "react";

const CodeRun = ({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="animated-button relative flex items-center gap-1 px-9 py-4 text-[16px] font-semibold rounded-full text-[greenyellow] border-4 border-transparent shadow-[0_0_0_2px_greenyellow] overflow-hidden cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] bg-inherit disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg
                viewBox="0 0 24 24"
                className="arr-2 absolute w-6 left-[-25%] fill-[greenyellow] z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>

            <span className="text relative z-[1] -translate-x-3 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
                {isLoading ? "Running..." : "Run Code"}
            </span>

            <span className="circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[greenyellow] rounded-full opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]" />

            <svg
                viewBox="0 0 24 24"
                className="arr-1 absolute w-6 right-4 fill-[greenyellow] z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
        </button>
    );
};

export default CodeRun;