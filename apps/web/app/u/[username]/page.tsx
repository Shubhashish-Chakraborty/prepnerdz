"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/ui/navbars/Navbar';

// --- Type Definitions ---
interface UserProfile {
    id: string;
    username: string;
    email: string;
    contactNumber?: string;
    role: string;
    UserAddedAt: string;
    avatar: { url: string }[];
    bio?: string;
    socials?: {
        linkedin?: string;
        github?: string;
        website?: string;
    };
    _count: {
        uploads: number;
        posts: number;
        replies: number;
    }
}

interface SessionUser {
    id: string;
    email: string;
    role: string;
}

// --- Socials Display Component ---
const SocialLinks = ({ socials }: { socials: UserProfile['socials'] }) => {
    if (!socials || (socials.linkedin === "" && socials.github === "" && socials.website === "")) {
        return <p className="text-sm text-gray-500 mt-4">No social links provided.</p>;
    }

    return (
        <div className="flex justify-center md:justify-start space-x-4 mt-4">
            {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-500 hover:text-blue-700">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
            )}
            {socials.github && (
                <a href={socials.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-500 hover:text-gray-900">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.602-3.369-1.34-3.369-1.34-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.026 2.747-1.026.546 1.376.202 2.393.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.842-2.338 4.687-4.566 4.935.359.307.678.915.678 1.846 0 1.334-.012 2.41-.012 2.736 0 .267.18.577.688.48C19.137 20.165 22 16.418 22 12A10 10 0 0012 2z" clipRule="evenodd" /></svg>
                </a>
            )}
            {socials.website && (
                <a href={socials.website} target="_blank" rel="noopener noreferrer" title="Website" className="text-gray-500 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-12h2v2h-2v-2zm-3 2h2v2h-2v-2zm6 0h2v2h-2v-2zm-3 3h2v2h-2v-2zm-3 2h2v2h-2v-2zm6 0h2v2h-2v-2z" clipRule="evenodd" /></svg>
                </a>
            )}
        </div>
    );
};

// --- Edit Modal Component ---
const EditUserModal = ({ profile, onClose, onUpdateSuccess }: { profile: UserProfile, onClose: () => void, onUpdateSuccess: (data: any) => void }) => {
    const [username, setUsername] = useState(profile.username);
    const [contactNumber, setContactNumber] = useState(profile.contactNumber || '');
    const [bio, setBio] = useState(profile.bio || '');
    const [socials, setSocials] = useState(profile.socials || { linkedin: '', github: '', website: '' });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`,
                { username, contactNumber, bio, socials }, // Send all fields
                { withCredentials: true }
            );
            onUpdateSuccess(data.user); // Pass updated user data back
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl my-8">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    {/* Contact Number */}
                    <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="e.g., +91..."
                        />
                    </div>
                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={4}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Tell us a bit about yourself..."
                        />
                    </div>
                    {/* Socials */}
                    <h3 className="text-lg font-medium text-gray-900 border-t pt-4">Social Links</h3>
                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
                        <input
                            type="url"
                            id="linkedin"
                            value={socials.linkedin || ''}
                            onChange={(e) => setSocials(s => ({...s, linkedin: e.target.value}))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://www.linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub</label>
                        <input
                            type="url"
                            id="github"
                            value={socials.github || ''}
                            onChange={(e) => setSocials(s => ({...s, github: e.target.value}))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Personal Website</label>
                        <input
                            type="url"
                            id="website"
                            value={socials.website || ''}
                            onChange={(e) => setSocials(s => ({...s, website: e.target.value}))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://my-portfolio.com"
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Page Component ---
export default function UserProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);

    // 1. Get username from URL
    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const user = pathSegments[pathSegments.length - 1];
        if (user) {
            setUsername(decodeURIComponent(user));
        } else {
            setError('Could not find username in URL.');
            setLoading(false);
        }
    }, []);

    // 2. Fetch profile data AND session data
    useEffect(() => {
        if (username) {
            const fetchProfile = async () => {
                setLoading(true);
                try {
                    // Fetch profile
                    const profileRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}`);
                    setProfile(profileRes.data);

                    // Fetch session user
                    try {
                         const sessionRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, { withCredentials: true });
                         setSessionUser(sessionRes.data?.message?.user);
                    } catch (sessionErr) {
                        console.log("User not logged in"); // Not an error
                    }

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

    // Check if the logged-in user is viewing their own profile
    const isOwnProfile = sessionUser && profile && sessionUser.id === profile.id;

    const handleUpdateSuccess = (updatedData: { username: string, contactNumber?: string, bio?: string, socials?: any }) => {
        if (profile) {
            setProfile({
                ...profile,
                username: updatedData.username,
                contactNumber: updatedData.contactNumber,
                bio: updatedData.bio,
                socials: updatedData.socials
            });
            // If username changed, redirect to new URL
            if (updatedData.username !== username) {
                window.location.href = `/u/${updatedData.username}`;
            }
        }
    };

    if (loading) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8">Loading profile...</div></div>;
    }

    if (error || !profile) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8 text-red-500">{error}</div></div>;
    }
    
    const avatarUrl = profile.avatar.length > 0 ? profile.avatar[0].url : `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(profile.username)}&chars=2`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            {isOwnProfile && showEditModal && (
                <EditUserModal
                    profile={profile}
                    onClose={() => setShowEditModal(false)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
            <div className="container mx-auto p-4 md:p-8 max-w-4xl">
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    {/* Header Card */}
                    <div className="flex flex-col md:flex-row items-center">
                        <img
                            src={avatarUrl}
                            alt={profile.username}
                            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                        />
                        <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start space-x-3">
                                <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
                                {isOwnProfile && (
                                    <button onClick={() => setShowEditModal(true)} title="Edit Profile" className="text-gray-500 hover:text-blue-600">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM3 17a2 2 0 012-2h11a1 1 0 110 2H5a2 2 0 01-2-2z"></path></svg>
                                    </button>
                                )}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold mt-2 inline-block ${
                                profile.role === "ADMIN" ? "bg-purple-100 text-purple-700" :
                                profile.role === "MENTOR" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                            }`}>
                                {profile.role}
                            </span>
                            {/* --- PUBLIC SOCIALS DISPLAY --- */}
                            <SocialLinks socials={profile.socials} />
                        </div>
                    </div>
                    
                    {/* --- PUBLIC BIO SECTION --- */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">About Me</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {profile.bio || "No bio provided."}
                        </p>
                    </div>

                    <hr className="my-6" />

                    {/* --- PUBLIC CONTACT (if provided) --- */}
                    {profile.contactNumber && profile.contactNumber !== "NOT_PROVIDED" && (
                         <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
                            <p className="text-gray-600">{profile.contactNumber}</p>
                        </div>
                    )}

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

