"use client";

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

// --- Placeholder Navbar ---
const Navbar = () => (
    <nav className="w-full bg-white shadow-md h-16 flex items-center px-8">
        <a href="/" className="font-bold text-xl text-blue-600">PrepNerdz</a>
    </nav>
);

// --- Type Definitions ---
interface SearchUser {
    id: string;
    username: string;
    bio?: string;
    avatar: { url: string }[];
    role: 'STUDENT' | 'MENTOR';
}

// --- Debounce Hook ---
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

// --- User Card Component ---
const UserCard = ({ user }: { user: SearchUser }) => {
    const avatarUrl = user.avatar.length > 0 ? user.avatar[0].url : `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(user.username)}&chars=2`;

    // Determine the correct profile link based on role
    const profileLink = user.role === 'MENTOR' ? `/m/${user.username}` : `/u/${user.username}`;

    return (
        <a href={profileLink} className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200">
            <div className="flex items-center space-x-4">
                <img src={avatarUrl} alt={user.username} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{user.username}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{user.bio || "No bio provided."}</p>
                </div>
            </div>
        </a>
    );
};

// --- Main Page Component ---
export default function CommunityPage() {
    const [view, setView] = useState<'users' | 'mentors'>('users');
    const [searchTerm, setSearchTerm] = useState('');
    const [allResults, setAllResults] = useState<SearchUser[]>([]); // Holds all users or search results
    const [loading, setLoading] = useState(true); // Start loading on initial mount
    const [error, setError] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // API call effect
    // This now runs on mount (since debouncedSearchTerm is initially "")
    // and whenever debouncedSearchTerm changes.
    useEffect(() => {
        const searchUsers = async () => {
            setLoading(true);
            setError('');
            try {
                // Use the new /api/v1/profile/search endpoint
                // The backend controller is set to return all users if 'q' is empty
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/search`, {
                    params: {
                        q: debouncedSearchTerm,
                    },
                    withCredentials: true,
                });
                setAllResults(data); // Store all results from the API
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to fetch results.');
            } finally {
                setLoading(false);
            }
        };

        searchUsers();
    }, [debouncedSearchTerm]); // This runs on mount and when the search term changes

    // Filter results based on the view toggle (this is now client-side filtering)
    const filteredResults = useMemo(() => {
        if (view === 'mentors') {
            return allResults.filter(user => user.role === 'MENTOR');
        }
        return allResults.filter(user => user.role === 'STUDENT' || 'ADMIN');
    }, [view, allResults]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-4 md:p-8 max-w-4xl">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">PrepNerdz Community</h1>
                    <p className="text-md text-gray-600 mt-2">Find and connect with other students and mentors.</p>
                </header>

                {/* Toggle Buttons */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-200 rounded-lg p-1 flex space-x-1">
                        <button
                            onClick={() => setView('users')}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${view === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Students
                        </button>
                        <button
                            onClick={() => setView('mentors')}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${view === 'mentors' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Mentors
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={`Search for ${view === 'users' ? 'students' : 'mentors'} by username, email, or bio...`}
                        className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    </div>
                </div>

                {/* Results Grid */}
                <div>
                    {loading && (
                        <p className="text-center text-gray-600">Loading...</p>
                    )}
                    {!loading && error && (
                        <p className="text-center text-red-500">{error}</p>
                    )}
                    {!loading && !error && filteredResults.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredResults.map(user => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                    {!loading && !error && filteredResults.length === 0 && (
                        <p className="text-center text-gray-600">No {view === 'users' ? 'students' : 'mentors'} found.</p>
                    )}
                </div>

            </div>
        </div>
    );
}