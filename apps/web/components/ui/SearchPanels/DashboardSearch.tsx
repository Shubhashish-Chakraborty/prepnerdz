"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Download } from "@/icons/Download"
import { Eye } from "@/icons/Eye"
import { Bookmark } from "@/icons/Bookmark"
import { CloseCircle } from "@/icons/CloseCircle"
// import { FiBookmark, FiDownload, FiEye, FiX } from "react-icons/fi"

interface SearchPanelProps {
    activeNavItem: string
}

interface Resource {
    id: string
    type: string
    title: string
    year: string
    month: string
    description: string
    fileUrl: string
    fileSize: number
    fileType: string
    subjectId: string
    uploadedById: string
    verified: boolean
    createdAt: string
    updatedAt: string
    subject?: {
        id: string
        subjectName: string
        subjectCode: string
        semesterId: string
        semester?: {
            id: string
            semNumber: number
            branchId: string
            branch?: {
                id: string
                branchName: string
            }
        }
    }
    uploadedBy?: {
        username: string
    }
}

// Mapping from nav item to API type
const typeMapping: Record<string, string> = {
    "shivani-books": "SHIVANI_BOOKS",
    "midsem-papers": "MID_SEM_PAPER",
    "endsem-papers": "END_SEM_PAPER",
    "imp-questions": "IMP_QUESTION",
    "imp-topics": "IMP_TOPIC",
    "best-notes": "NOTES",
    "syllabus": "NOTES",
    "labmanual": "LAB_MANUAL", 
}

// Configuration for different search panels
const searchPanelConfig = {
    "shivani-books": {
        title: "Search Shivani Books",
        description: "Find books by branch and semester",
        placeholder: "Search for books...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "midsem-papers": {
        title: "Search Midsem Papers",
        description: "Find previous midsem papers by branch and semester",
        placeholder: "Search for midsem papers...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "endsem-papers": {
        title: "Search Endsem Papers",
        description: "Find previous endsem papers by branch and semester",
        placeholder: "Search for endsem papers...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "imp-questions": {
        title: "Search Important Questions",
        description: "Find important questions by branch and semester, subjects, units!",
        placeholder: "Search for important questions...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "imp-topics": {
        title: "Search Important Topics",
        description: "Find important topics by branch and semester, subjects, units!",
        placeholder: "Search for important topics...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "best-notes": {
        title: "Search Best Academic Notes",
        description: "Find best notes by subjects, units!",
        placeholder: "Search for notes...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "syllabus": {
        title: "Search Syllabus",
        description: "Find Branch Syllabus",
        placeholder: "Search for Syllabus...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "labmanual": {
        title: "Search Lab Manuals",
        description: "Find LabManuals and reading by subjects, units!", 
        placeholder: "Search for labmanuals and its readings...",
        branches: ["CSE", "CSE-IOT", "ECE", "ME", "CE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
}

export default function SearchPanel({ activeNavItem }: SearchPanelProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedBranch, setSelectedBranch] = useState("")
    const [selectedSemester, setSelectedSemester] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [resources, setResources] = useState<Resource[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [initialLoad, setInitialLoad] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        console.log("Welcome to PrepNerdz!")
    }, [totalCount])

    // Get current panel configuration
    const currentPanel = searchPanelConfig[activeNavItem as keyof typeof searchPanelConfig]

    useEffect(() => {
        // Reset states when activeNavItem changes
        setSearchQuery("")
        setSelectedBranch("")
        setSelectedSemester("")
        setResources([])
        setPage(1)
        setHasMore(false)
        setInitialLoad(false)
    }, [activeNavItem])

    const fetchInitialResources = async () => {
        try {
            const type = typeMapping[activeNavItem]
            if (!type) return

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resource`, {
                params: { type }
            })

            setResources(response.data.slice(0, 5)) // Show first 5 items initially
            setHasMore(response.data.length > 5)
            setInitialLoad(true)
        } catch (error) {
            toast.error("Failed to fetch initial resources")
            console.error("Error fetching initial resources:", error)
        }
    }

    const handleSearch = async () => {
        if (!searchQuery.trim() || !selectedBranch || !selectedSemester) {
            toast.error("Please fill in all fields")
            return
        }

        setIsSearching(true)

        try {
            // Handle COMMON branch case
            const branchToUse = (selectedSemester === '1' || selectedSemester === '2') ? "COMMON" : selectedBranch
            const semesterToUse = (selectedSemester === '1' || selectedSemester === '2') ? "0" : selectedSemester

            // First get branch ID
            const branchResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/branchid`,
                { params: { branchName: branchToUse } }
            )

            // Then get semester ID
            const semesterResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/semesterid`,
                { params: { semNumber: semesterToUse } }
            )

            const type = typeMapping[activeNavItem]
            if (!type) {
                toast.error("Invalid resource type")
                return
            }

            // Perform the search with pagination
            const searchResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search`,
                {
                    params: {
                        type,
                        branch: branchResponse.data.branchId,
                        semester: semesterResponse.data.semesterId,
                        query: searchQuery,
                        page: 1,  // First page
                        limit: 5   // 5 items per page
                    }
                }
            )

            setResources(searchResponse.data.data)
            setTotalCount(searchResponse.data.total)
            setPage(1)
            setHasMore(searchResponse.data.hasMore)
        } catch (error) {
            toast.error("Search failed. Please try again.")
            console.error("Search error:", error)
        } finally {
            setIsSearching(false)
        }
    }

    const loadMoreResources = async () => {
        try {
            const nextPage = page + 1

            // Handle COMMON branch case
            const branchToUse = (selectedSemester === '1' || selectedSemester === '2') ? "COMMON" : selectedBranch
            const semesterToUse = (selectedSemester === '1' || selectedSemester === '2') ? "0" : selectedSemester

            // Get IDs again in case they're needed
            const branchResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/branchid`,
                { params: { branchName: branchToUse } }
            )

            const semesterResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/semesterid`,
                { params: { semNumber: semesterToUse } }
            )

            const type = typeMapping[activeNavItem]
            const searchResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search`,
                {
                    params: {
                        type,
                        branch: branchResponse.data.branchId,
                        semester: semesterResponse.data.semesterId,
                        query: searchQuery,
                        page: nextPage,
                        limit: 5
                    }
                }
            )

            setResources(prev => [...prev, ...searchResponse.data.data])
            setPage(nextPage)
            setHasMore(searchResponse.data.hasMore)
        } catch (error) {
            toast.error("Failed to load more resources")
            console.error("Load more error:", error)
        }
    }

    const resetForm = () => {
        setSearchQuery("")
        setSelectedBranch("")
        setSelectedSemester("")
        setResources([])
        setPage(1)
        setHasMore(false)
        setInitialLoad(false)
    }

    const openModal = (resource: Resource) => {
        setSelectedResource(resource)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedResource(null)
    }

    const handleDownload = (url: string, title: string) => {
        const link = document.createElement('a')
        link.href = url
        link.download = title
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleBookmark = (resourceId: string) => {
        // Implement bookmark functionality here
        toast.success("Bookmarked successfully!")
        console.log(resourceId);
    }

    const formatFileSize = (sizeInKb: number) => {
        if (sizeInKb < 1024) {
            return `${sizeInKb.toFixed(1)} KB`
        }
        return `${(sizeInKb / 1024).toFixed(1)} MB`
    }

    // Load initial resources when panel is first rendered
    useEffect(() => {
        if (!initialLoad && currentPanel) {
            fetchInitialResources()
        }
    }, [activeNavItem, initialLoad, currentPanel])

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
                    <p className="text-lg">Its on the Way, Stay Tuned!</p>
                    <p className="text-lg">You will be notified!!</p>
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

                    {/* Results Section */}
                    <div className="space-y-4 mt-8">
                        {resources.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Results ({totalCount})</h3>
                                {resources.map((resource) => (
                                    <div key={resource.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-lg text-blue-600">{resource.title}</h4>
                                                <p className="text-gray-600 mt-1">{resource.description}</p>
                                                <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500 gap-2">
                                                    {resource.subject?.subjectName && (
                                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                                            {resource.subject.subjectName}
                                                        </span>
                                                    )}
                                                    {resource.subject?.subjectCode && (
                                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                                            {resource.subject.subjectCode}
                                                        </span>
                                                    )}
                                                    <span className="bg-gray-100 px-2 py-1 rounded">
                                                        {formatFileSize(resource.fileSize)}
                                                    </span>
                                                    {resource.uploadedBy?.username && (
                                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                                            Uploaded by: {resource.uploadedBy.username}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleBookmark(resource.id)}
                                                    className="p-2 text-gray-500 hover:text-amber-500 transition-colors"
                                                    aria-label="Bookmark"
                                                >
                                                    <Bookmark className="size-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(resource.fileUrl, resource.title)}
                                                    className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                                                    aria-label="Download"
                                                >
                                                    <Download className="size-5" />
                                                </button>
                                                <button
                                                    onClick={() => openModal(resource)}
                                                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                                                    aria-label="View"
                                                >
                                                    <Eye className="size-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {hasMore && (
                                    <button
                                        onClick={loadMoreResources}
                                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span>Show More</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                        {resources.length === 0 && initialLoad && (
                            <div className="text-center py-8 text-gray-500">
                                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p>No resources found. Try a different search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* PDF Viewer Modal */}
            {isModalOpen && selectedResource && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                            onClick={closeModal}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal container */}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {selectedResource.title}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <CloseCircle className="size-5" />
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <div className="h-[70vh] w-full">
                                        {selectedResource.fileType === 'pdf' ? (
                                            <iframe
                                                src={selectedResource.fileUrl}
                                                className="w-full h-full border border-gray-200 rounded"
                                                title={selectedResource.title}
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-gray-100 rounded">
                                                <p className="text-gray-500">
                                                    Preview not available for {selectedResource.fileType.toUpperCase()} files.
                                                    <br />
                                                    <a
                                                        href={selectedResource.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Open in new tab
                                                    </a>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => handleDownload(selectedResource.fileUrl, selectedResource.title)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    <Download className="size-5" />
                                    Download
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}