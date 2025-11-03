"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Eye } from "@/icons/Eye"
import { ResourceModal } from "@/components/modals/ResourcePreview"
import { Bookmark } from "@/icons/Bookmark"
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
    "syllabus": "SYLLABUS",
    "labmanual": "LAB_MANUAL",
}

// Configuration for different search panels
const searchPanelConfig = {
    "shivani-books": {
        title: "Search Shivani Books",
        description: "Find books by branch and semester",
        placeholder: "Search for books...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "midsem-papers": {
        title: "Search Midsem Papers",
        description: "Find previous midsem papers by branch and semester",
        placeholder: "Search for midsem papers...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "endsem-papers": {
        title: "Search Endsem Papers",
        description: "Find previous endsem papers by branch and semester",
        placeholder: "Search for endsem papers...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "imp-questions": {
        title: "Search Important Questions",
        description: "Find important questions by branch and semester, subjects, units!",
        placeholder: "Search for important questions...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "imp-topics": {
        title: "Search Important Topics",
        description: "Find important topics by branch and semester, subjects, units!",
        placeholder: "Search for important topics...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "best-notes": {
        title: "Search Best Academic Notes",
        description: "Find best notes by subjects, units!",
        placeholder: "Search for notes...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "syllabus": {
        title: "Search Syllabus",
        description: "Find Branch Syllabus",
        placeholder: "Search for Syllabus...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "labmanual": {
        title: "Search Lab Manuals",
        description: "Find LabManuals and reading by subjects, units!",
        placeholder: "Search for labmanuals and its readings...",
        branches: ["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE"],
        semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    },
}

interface Bookmark {
    id: string;
    userId: string;
    resourceId: string;
    createdAt: string;
    resource: Resource;
}

interface BookmarksResponse {
    success: boolean;
    data: Bookmark[];
    count: number;
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
    const [bookmarkedResourceIds, setBookmarkedResourceIds] = useState<string[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

    useEffect(() => {
        console.log("Welcome to PrepNerdz!")
    }, [totalCount])

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const sessionRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true
                });

                if (!sessionRes.data.message.isAuthenticated) return;

                const id = sessionRes.data.message.user.id;
                setUserId(id);

                const bookmarkRes = await axios.get<BookmarksResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark/user/${id}`, {
                    withCredentials: true
                });

                // const ids = bookmarkRes.data.data.map((b: any) => b.resource.id);

                const ids = bookmarkRes.data.data
                    .filter((b) => b.resource && b.resource.id)
                    .map((b) => b.resource.id);

                setBookmarkedResourceIds(ids);
            } catch (error) {
                console.error("Failed to fetch bookmarks:", error);
            }
        };

        fetchBookmarks();
    }, []);



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
            const branchToUse = (selectedSemester === '1' || selectedSemester === '2' || selectedSemester === '4') ? "COMMON" : selectedBranch
            const semesterToUse = (selectedSemester === '1' || selectedSemester === '2') ? "0" : selectedSemester

            // First get branch ID
            const branchResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/branchid`,
                { params: { branchName: branchToUse } }
            )

            // Then get semester ID
            const semesterResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/semesterid`,
                { params: { semNumber: semesterToUse, branchId: branchResponse.data.branchId} }
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
            const branchToUse = (selectedSemester === '1' || selectedSemester === '2' || selectedSemester === '4') ? "COMMON" : selectedBranch
            const semesterToUse = (selectedSemester === '1' || selectedSemester === '2') ? "0" : selectedSemester

            // Get IDs again in case they're needed
            const branchResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/branchid`,
                { params: { branchName: branchToUse } }
            )

            const semesterResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyid/semesterid`,
                { params: { semNumber: semesterToUse, branchId: branchResponse.data.branchId } }
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
        setSelectedResource(resource);
        setIsResourceModalOpen(true);
    };

    const handleBookmarkToggle = async (resourceId: string) => {
        if (!userId) {
            toast.error("Please log in to bookmark.");
            return;
        }

        const isBookmarked = bookmarkedResourceIds.includes(resourceId);

        try {
            if (isBookmarked) {
                // Unbookmark
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark`, {
                    data: { userId, resourceId },
                    withCredentials: true
                });

                if (res.data.success) {
                    toast.success("Bookmark removed");
                    setBookmarkedResourceIds((prev) => prev.filter((id) => id !== resourceId));
                } else {
                    toast.error(res.data.message || "Failed to remove bookmark");
                }
            } else {
                // Bookmark
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark`, {
                    userId,
                    resourceId
                }, { withCredentials: true });

                if (res.data.success) {
                    toast.success("Bookmarked");
                    setBookmarkedResourceIds((prev) => [...prev, resourceId]);
                } else {
                    toast.error(res.data.message || "Failed to bookmark");
                }
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Bookmark toggle error:", error);
        }
    };


    const formatFileSize = (sizeInKb: number) => {
        const sizeInMb = sizeInKb / 1000; // OnPurpose im dividing it by 1000 instead of 1024!
        return `${sizeInMb.toFixed(2)} MB`;
        // if (sizeInKb < 1024) {
        //     return `${sizeInKb.toFixed(1)} KB`
        // }
        // return `${(sizeInKb / 1024).toFixed(1)} MB`
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
        <div className="bg-gradient-to-br from-white via-amber-50 to-yellow-50 rounded-2xl shadow-2xl border border-amber-200 overflow-hidden backdrop-blur-sm">
            <div>
                <ResourceModal
                    open={isResourceModalOpen}
                    onClose={() => setIsResourceModalOpen(false)}
                    resource={selectedResource}
                />
            </div>

            {/* Panel Header */}
            <div className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-6 py-12 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                        {currentPanel.title}
                    </h1>
                    <p className="text-lg text-yellow-100 max-w-2xl mx-auto leading-relaxed">
                        {currentPanel.description}
                    </p>
                </div>
            </div>

            {/* Search Form */}
            <div className="p-4 sm:p-6 lg:p-10">
                <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                    {/* Search Input */}
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <label htmlFor="search" className="block text-sm font-semibold text-gray-800 mb-3">
                            Search Query
                        </label>
                        <div className="relative group">
                            <input
                                id="search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={currentPanel.placeholder}
                                className="w-full px-6 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 pl-14 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
                            />
                            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                <svg
                                    className="w-6 h-6 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-200"
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
                    </div>

                    {/* Filters Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-6 duration-700">
                        {/* Branch Selection */}
                        <div className="space-y-3">
                            <label htmlFor="branch" className="block text-sm font-semibold text-gray-800">
                                Branch
                            </label>
                            <div className="relative">
                                <select
                                    id="branch"
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="w-full px-6 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl appearance-none cursor-pointer"
                                >
                                    <option value="">Select Branch</option>
                                    {currentPanel.branches.map((branch) => (
                                        <option key={branch} value={branch}>
                                            {branch}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Semester Selection */}
                        <div className="space-y-3">
                            <label htmlFor="semester" className="block text-sm font-semibold text-gray-800">
                                Semester
                            </label>
                            <div className="relative">
                                <select
                                    id="semester"
                                    value={selectedSemester}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                    className="w-full px-6 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl appearance-none cursor-pointer"
                                >
                                    <option value="">Select Semester</option>
                                    {currentPanel.semesters.map((sem) => (
                                        <option key={sem} value={sem}>
                                            Semester {sem}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-6 animate-in slide-in-from-bottom-10 duration-1000">
                        <button
                            onClick={handleSearch}
                            disabled={isSearching || !searchQuery.trim() || !selectedBranch || !selectedSemester}
                            className="flex-1 sm:flex-none px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl hover:from-amber-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center shadow-lg hover:shadow-xl font-semibold text-lg"
                        >
                            {isSearching ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Search Resources
                                </>
                            )}
                        </button>

                        <button
                            onClick={resetForm}
                            className="px-8 py-4 border-2 border-amber-300 text-gray-700 rounded-2xl hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                        >
                            Reset Form
                        </button>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6 mt-12">
                        {resources.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        Search Results ({totalCount})
                                    </h3>
                                </div>
                                <div className="grid gap-6">
                                    {resources.map((resource) => (
                                        <div key={resource.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="flex justify-between items-start gap-6">
                                                <div className="flex-1">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-lg text-gray-800 mb-2">{resource.title}</h4>
                                                            <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                {resource.subject?.subjectName && (
                                                                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                                                                        {resource.subject.subjectName}
                                                                    </span>
                                                                )}
                                                                {resource.subject?.subjectCode && (
                                                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                                                        {resource.subject.subjectCode}
                                                                    </span>
                                                                )}
                                                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                                                    {formatFileSize(resource.fileSize)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleBookmarkToggle(resource.id)}
                                                        className={`p-3 rounded-xl transition-all duration-200 ${
                                                            bookmarkedResourceIds.includes(resource.id)
                                                                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                                                                : 'bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-600'
                                                        }`}
                                                        title={bookmarkedResourceIds.includes(resource.id) ? 'Remove bookmark' : 'Add bookmark'}
                                                    >
                                                        <Bookmark className="size-6" />
                                                    </button>
                                                    <button
                                                        onClick={() => openModal(resource)}
                                                        className="p-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                        title="View resource"
                                                    >
                                                        <Eye className="size-6" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {hasMore && (
                                    <button
                                        onClick={loadMoreResources}
                                        className="w-full py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-2xl text-gray-700 font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                                    >
                                        <span>Load More Resources</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                        {resources.length === 0 && initialLoad && (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your search criteria or browse different categories.</p>
                                <button
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-200 font-medium"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}