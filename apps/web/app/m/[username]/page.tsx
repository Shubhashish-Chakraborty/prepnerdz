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

interface MentorProfileData {
    user: {
        id: string;
        username: string;
        UserAddedAt: string;
        avatar: { url: string }[];
    };
    profile: {
        id: string;
        bio: string;
        expertise: string[];
        category: string;
        introVideoUrl?: string;
        socials: {
            linkedin?: string;
            github?: string;
            website?: string;
        };
    };
}

export default function MentorProfilePage() {
    const [profile, setProfile] = useState<MentorProfileData | null>(null);
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
            setError('Could not find mentor in URL.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (username) {
            const fetchProfile = async () => {
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/${username}`);
                    setProfile(data);
                } catch (err: any) {
                    console.error(err);
                    setError(err.response?.data?.message || 'Mentor not found');
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        }
    }, [username]);

    if (loading) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8">Loading mentor profile...</div></div>;
    }

    if (error || !profile) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8 text-red-500">{error || 'Could not load profile.'}</div></div>;
    }
    
    const { user, profile: mentorProfile } = profile;
    const avatarUrl = user.avatar.length > 0 ? user.avatar[0].url : `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(user.username)}&chars=2`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-4 md:p-8 max-w-4xl">
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    {/* Header Card */}
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Using <img> tag to avoid Next.js Image import errors */}
                        <img
                            src={avatarUrl}
                            alt={user.username}
                            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                        />
                        <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-800">{user.username}</h1>
                            <p className="text-lg text-gray-600 mt-1">{mentorProfile.category.replace('_', ' ')}</p>
                            <div className="flex justify-center md:justify-start space-x-4 mt-4">
                                {mentorProfile.socials?.linkedin && (
                                    <a href={mentorProfile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                                {mentorProfile.socials?.github && (
                                    <a href={mentorProfile.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.602-3.369-1.34-3.369-1.34-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.026 2.747-1.026.546 1.376.202 2.393.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.842-2.338 4.687-4.566 4.935.359.307.678.915.678 1.846 0 1.334-.012 2.41-.012 2.736 0 .267.18.577.688.48C19.137 20.165 22 16.418 22 12A10 10 0 0012 2z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                                {mentorProfile.socials?.website && (
                                    <a href={mentorProfile.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-12h2v2h-2v-2zm-3 2h2v2h-2v-2zm6 0h2v2h-2v-2zm-3 3h2v2h-2v-2zm-3 2h2v2h-2v-2zm6 0h2v2h-2v-2z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Bio */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">About Me</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{mentorProfile.bio}</p>
                    </div>

                    {/* Expertise */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Areas of Expertise</h2>
                        <div className="flex flex-wrap gap-3">
                            {mentorProfile.expertise.map(skill => (
                                <span key={skill} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Intro Video */}
                    {mentorProfile.introVideoUrl && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction</h2>
                            <div className="rounded-lg overflow-hidden border">
                                {/* Using aspect-video for responsive iframe */}
                                <iframe 
                                    src={mentorProfile.introVideoUrl.replace("watch?v=", "embed/")} // Convert YouTube URL
                                    title="Mentor Introduction"
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full aspect-video"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

