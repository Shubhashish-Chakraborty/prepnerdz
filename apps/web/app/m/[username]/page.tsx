"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// --- Placeholder Navbar ---
const Navbar = () => (
    <nav className="w-full bg-white shadow-md h-16 flex items-center px-8">
        <a href="/" className="font-bold text-xl text-blue-600">PrepNerdz</a>
    </nav>
);

// --- Type Definitions ---
interface MentorProfileData {
    id: string;
    username: string;
    role: 'MENTOR';
    UserAddedAt: string;
    avatar: { url: string }[];
    bio?: string;
    socials?: {
        linkedin?: string;
        github?: string;
        website?: string;
    };
    mentorProfile: {
        category: 'FACULTY' | 'ALUMNI' | 'SENIOR';
        expertise: string[];
        introVideoUrl?: string;
        socials?: {
            linkedin?: string;
            github?: string;
            website?: string;
        };
    };
    _count: {
        uploads: number;
        posts: number;
        replies: number;
        following: number;
        followedBy: number;
    };
    isFollowing: boolean;
}

interface SessionUser {
    id: string;
    email: string;
    role: string;
}

// --- Socials Display (Uses Mentor's specific socials first) ---
const SocialLinks = ({ userSocials, mentorSocials }: { userSocials: MentorProfileData['socials'], mentorSocials: MentorProfileData['mentorProfile']['socials'] }) => {
    // Prefer mentor socials, fall back to user socials
    const socials = {
        linkedin: mentorSocials?.linkedin || userSocials?.linkedin || "",
        github: mentorSocials?.github || userSocials?.github || "",
        website: mentorSocials?.website || userSocials?.website || "",
    };

    if (socials.linkedin === "" && socials.github === "" && socials.website === "") {
        return null;
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
const EditMentorModal = ({ profile, onClose, onUpdateSuccess }: { profile: MentorProfileData, onClose: () => void, onUpdateSuccess: (data: any) => void }) => {
    // Mentor-specific data
    const [bio, setBio] = useState(profile.bio || '');
    const [expertise, setExpertise] = useState(profile.mentorProfile.expertise.join(', '));
    const [introVideoUrl, setIntroVideoUrl] = useState(profile.mentorProfile.introVideoUrl || '');
    const [socials, setSocials] = useState(profile.mentorProfile.socials || { linkedin: '', github: '', website: '' });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const expertiseArray = expertise.split(',').map(e => e.trim()).filter(Boolean);
            const { data } = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/nerdconnect/mentor/my-profile`,
                { bio, expertise: expertiseArray, introVideoUrl, socials },
                { withCredentials: true }
            );
            onUpdateSuccess(data.profile);
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
                <h2 className="text-2xl font-bold mb-4">Edit Mentor Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
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
                    {/* Expertise */}
                    <div>
                        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise (comma-separated)</label>
                        <input
                            type="text"
                            id="expertise"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="e.g., Data Structures, Java, Career Advice"
                        />
                    </div>
                    {/* Intro Video */}
                    <div>
                        <label htmlFor="introVideoUrl" className="block text-sm font-medium text-gray-700">Intro Video URL (YouTube, Vimeo, etc.)</label>
                        <input
                            type="url"
                            id="introVideoUrl"
                            value={introVideoUrl}
                            onChange={(e) => setIntroVideoUrl(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://youtube.com/watch?v=..."
                        />
                    </div>
                    {/* Socials */}
                    <h3 className="text-lg font-medium text-gray-900 border-t pt-4">Social Links (Mentor Specific)</h3>
                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
                        <input
                            type="url"
                            id="linkedin"
                            value={socials?.linkedin || ''}
                            onChange={(e) => setSocials(s => ({ ...s, linkedin: e.target.value }))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://www.linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub</label>
                        <input
                            type="url"
                            id="github"
                            value={socials?.github || ''}
                            onChange={(e) => setSocials(s => ({ ...s, github: e.target.value }))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Personal Website</label>
                        <input
                            type="url"
                            id="website"
                            value={socials?.website || ''}
                            onChange={(e) => setSocials(s => ({ ...s, website: e.target.value }))}
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
export default function MentorProfilePage() {
    const [profile, setProfile] = useState<MentorProfileData | null>(null);
    const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

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
                    const profileRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/${username}`, { withCredentials: true });
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
                    setError(err.response?.data?.message || 'Mentor not found');
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        }
    }, [username]);

    const handleToggleFollow = async () => {
        if (!sessionUser) {
            alert("Please log in to follow users.");
            return;
        }
        if (!profile || followLoading) return;

        setFollowLoading(true);

        // Optimistic Update
        setProfile(prevProfile => {
            if (!prevProfile) return null;
            const newFollowCount = prevProfile.isFollowing
                ? prevProfile._count.followedBy - 1
                : prevProfile._count.followedBy + 1;
            return {
                ...prevProfile,
                isFollowing: !prevProfile.isFollowing,
                _count: {
                    ...prevProfile._count,
                    followedBy: newFollowCount
                }
            };
        });

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/follow/${profile.id}`,
                {}, // Empty body
                { withCredentials: true }
            );
        } catch (err) {
            console.error("Failed to toggle follow", err);
            // Revert optimistic update on failure
            setProfile(prevProfile => {
                if (!prevProfile) return null;
                const originalFollowCount = prevProfile.isFollowing
                    ? prevProfile._count.followedBy - 1
                    : prevProfile._count.followedBy + 1;
                return {
                    ...prevProfile,
                    isFollowing: !prevProfile.isFollowing,
                    _count: {
                        ...prevProfile._count,
                        followedBy: originalFollowCount
                    }
                };
            });
            alert("Failed to update follow status. Please try again.");
        } finally {
            setFollowLoading(false);
        }
    };

    const isOwnProfile = sessionUser && profile && sessionUser.id === profile.id;

    const handleUpdateSuccess = (updatedData: any) => {
        if (profile) {
            setProfile({
                ...profile,
                bio: updatedData.bio,
                mentorProfile: {
                    ...profile.mentorProfile,
                    ...updatedData
                }
            });
        }
    };

    if (loading) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8">Loading profile...</div></div>;
    }

    if (error || !profile) {
        return <div className="bg-gray-50 min-h-screen"><Navbar /><div className="p-8 text-red-500">{error || 'Mentor profile not found.'}</div></div>;
    }

    const avatarUrl = profile.avatar.length > 0 ? profile.avatar[0].url : `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(profile.username)}&chars=2`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            {isOwnProfile && showEditModal && (
                <EditMentorModal
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
                        <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left w-full">
                            <div className="flex items-center justify-center md:justify-start space-x-3">
                                <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm font-semibold mt-2 inline-block bg-blue-100 text-blue-700">
                                MENTOR ({profile.mentorProfile.category})
                            </span>
                            {/* --- PUBLIC SOCIALS DISPLAY --- */}
                            <SocialLinks userSocials={profile.socials} mentorSocials={profile.mentorProfile.socials} />

                            {/* --- FOLLOW/EDIT BUTTON LOGIC --- */}
                            <div className="mt-6 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                                {isOwnProfile ? (
                                    <button onClick={() => setShowEditModal(true)} className="w-full md:w-auto px-6 py-2 font-semibold bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                        Edit Mentor Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleToggleFollow}
                                        disabled={followLoading || !sessionUser}
                                        className={`w-full md:w-auto px-6 py-2 font-semibold rounded-md transition-all ${profile.isFollowing
                                                ? 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                            } ${!sessionUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {profile.isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- FOLLOW STATS --- */}
                    <div className="flex justify-center md:justify-start md:pl-40 mt-6 space-x-6">
                        <div className="text-center">
                            <p className="text-xl font-bold">{profile._count.followedBy}</p>
                            <p className="text-sm text-gray-500">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">{profile._count.following}</p>
                            <p className="text-sm text-gray-500">Following</p>
                        </div>
                    </div>

                    {/* --- PUBLIC BIO SECTION --- */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">About Me</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {profile.bio || "No bio provided."}
                        </p>
                    </div>

                    {/* --- MENTOR EXPERTISE --- */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.mentorProfile.expertise.length > 0 ? profile.mentorProfile.expertise.map(exp => (
                                <span key={exp} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {exp}
                                </span>
                            )) : (
                                <p className="text-gray-500">No expertise listed.</p>
                            )}
                        </div>
                    </div>

                    {/* --- INTRO VIDEO --- */}
                    {profile.mentorProfile.introVideoUrl && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction</h2>
                            <div className="aspect-w-16 aspect-h-9">
                                {/* Basic video embed (improve this with a proper player later) */}
                                <iframe
                                    src={profile.mentorProfile.introVideoUrl.replace("watch?v=", "embed/")}
                                    title="Mentor Introduction"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg shadow-md"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <hr className="my-8" />

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