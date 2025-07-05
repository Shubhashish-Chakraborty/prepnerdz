"use client"

import { useState } from "react"

interface SearchPanelProps {
    activeNavItem: string
}

// Configuration for different search panels - easily extensible
const searchPanelConfig = {
    "shivani-books": {
        title: "Search Shivani Books",
        description: "Find books by branch and semester",
        placeholder: "Search for books...",
        branches: ["CSE", "AI", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
        additionalFilters: ["Author", "Publication Year"],
    },
    "midsem-papers": {
        title: "Search Midsem Papers",
        description: "Find previous midsem papers by branch and semester",
        placeholder: "Search for midsem papers...",
        branches: ["CSE", "AI", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
        additionalFilters: ["Subject", "Year"],
    },
    "endsem-papers": {
        title: "Search Endsem Papers",
        description: "Find previous endsem papers by branch and semester",
        placeholder: "Search for endsem papers...",
        branches: ["CSE", "AI", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
        additionalFilters: ["Subject", "Year"],
    },
    // Add more search panel configurations here
    // 'assignments': {
    //   title: 'Search Assignments',
    //   description: 'Find assignments by branch and semester',
    //   placeholder: 'Search for assignments...',
    //   branches: ['CSE', 'AI', 'ECE', 'ME', 'CE'],
    //   semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    //   additionalFilters: ['Due Date', 'Subject']
    // }
}

export default function SearchPanel({ activeNavItem }: SearchPanelProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedBranch, setSelectedBranch] = useState("")
    const [selectedSemester, setSelectedSemester] = useState("")
    const [isSearching, setIsSearching] = useState(false)

    // Get current panel configuration
    const currentPanel = searchPanelConfig[activeNavItem as keyof typeof searchPanelConfig]

    const handleSearch = async () => {
        if (!searchQuery.trim() || !selectedBranch || !selectedSemester) {
            alert("Please fill in all fields")
            return
        }

        setIsSearching(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Search params:", {
                query: searchQuery,
                branch: selectedBranch,
                semester: selectedSemester,
                type: activeNavItem,
            })
            setIsSearching(false)
            // Here you would typically make an API call and handle the results
        }, 1500)
    }

    const resetForm = () => {
        setSearchQuery("")
        setSelectedBranch("")
        setSelectedSemester("")
    }

    if (!currentPanel) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                    <p className="text-lg">Coming Soon, Stay Tuned!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-amber-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Panel Header */}
            <div className="bg-gradient-to-r from-amber-500 to-emerald-700 px-6 py-8 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2 animate-in slide-in-from-top-4 duration-500">
                        {currentPanel.title}
                    </h1>
                    <p className="text-blue-100 animate-in slide-in-from-top-6 duration-700">{currentPanel.description}</p>
                </div>
            </div>

            {/* Search Form */}
            <div className="p-6 lg:p-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Search Input */}
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                            Search Query
                        </label>
                        <div className="relative">
                            <input
                                id="search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={currentPanel.placeholder}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12"
                            />
                            <svg
                                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-6 duration-700">
                        {/* Branch Selection */}
                        <div>
                            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                                Branch
                            </label>
                            <select
                                id="branch"
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">Select Branch</option>
                                {currentPanel.branches.map((branch) => (
                                    <option key={branch} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Semester Selection */}
                        <div>
                            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                                Semester
                            </label>
                            <select
                                id="semester"
                                value={selectedSemester}
                                onChange={(e) => setSelectedSemester(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">Select Semester</option>
                                {currentPanel.semesters.map((sem) => (
                                    <option key={sem} value={sem}>
                                        Semester {sem}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Additional Filters (Future Enhancement) */}
                    <div className="animate-in slide-in-from-bottom-8 duration-1000">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Filters</h3>
                            <div className="flex flex-wrap gap-2">
                                {currentPanel.additionalFilters.map((filter) => (
                                    <button
                                        key={filter}
                                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in slide-in-from-bottom-10 duration-1000">
                        <button
                            onClick={handleSearch}
                            disabled={isSearching || !searchQuery.trim() || !selectedBranch || !selectedSemester}
                            className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center"
                        >
                            {isSearching ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Search
                                </>
                            )}
                        </button>

                        <button
                            onClick={resetForm}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            Reset
                        </button>
                    </div>

                    {/* Search Tips */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in slide-in-from-bottom-12 duration-1200">
                        <div className="flex items-start">
                            <svg
                                className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div>
                                <h4 className="text-sm font-medium text-blue-800 mb-1">Search Tips</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Use specific keywords for better results</li>
                                    <li>• Select both branch and semester for accurate filtering</li>
                                    <li>• Try different search terms if you don&apos;t find what you&apos;re looking for</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
