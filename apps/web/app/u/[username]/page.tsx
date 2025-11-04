"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// NOTE: Using a placeholder Navbar component to avoid import errors
// You can replace this with your actual <Navbar /> import
const Navbar = () => (
    <nav className="w-full bg-white shadow-md h-16 flex items-center px-8">
        <a href="/" className="font-bold text-xl text-blue-600">PrepNerdz</a>
    </nav>
);

interface UserProfile {
    id: string;
    username: string;
    role: string;
    UserAddedAt: string;
    avatar: { url: string }[];
    _count: {
        uploads: number;
        posts: number;
        replies: number;
    }
}

export default function UserProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Get username from URL path
        const pathSegments = window.location.pathname.split('/');
        const user = pathSegments[pathSegments.length - 1]; // Get the last part
        if (user) {
            setUsername(decodeURIComponent(user));
        } else {
            setError('Could not find username in URL.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (username) {
            const fetchProfile = async () => {
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}`);
                    setProfile(data);
                } catch (err: any) {
                    console.error(err);
                    setError(err.response?.data?.message || 'User not found');
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        }
    }, [username]);

    if (loading) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8">Loading profile...</div></div>;
    }

    if (error || !profile) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8 text-red-500">{error || 'Could not load profile.'}</div></div>;
    }

    const avatarUrl = profile.avatar.length > 0 ? profile.avatar[0].url : `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(profile.username)}&chars=2`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-4 md:p-8 max-w-2xl">
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center">
                        {/* Using <img> tag to avoid Next.js Image import errors */}
                        <img
                            src={avatarUrl}
                            alt={profile.username}
                            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                        />
                        <div className="ml-6">
                            <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold mt-2 inline-block ${profile.role === "ADMIN" ? "bg-purple-100 text-purple-700" :
                                    profile.role === "MENTOR" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                }`}>
                                {profile.role}
                            </span>
                        </div>
                    </div>
                    <hr className="my-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{profile._count.posts}</p>
                            <p className="text-sm text-gray-500">Questions Asked</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{profile._count.replies}</p>
                            <p className="text-sm text-gray-500">Replies Given</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{profile._count.uploads}</p>
                            <p className="text-sm text-gray-500">Resources Uploaded</p>
                        </div>
                    </div>
                    <div className="text-center mt-6 text-sm text-gray-400">
                        Joined on {new Date(profile.UserAddedAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}

