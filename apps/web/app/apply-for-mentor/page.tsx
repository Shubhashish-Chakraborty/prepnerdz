"use client";

import React, { useState } from 'react';
import axios from 'axios';

// NOTE: Using a placeholder Navbar component to avoid import errors
// You can replace this with your actual <Navbar /> import
const Navbar = () => (
    <nav className="w-full bg-white shadow-md h-16 flex items-center px-8">
        <p className="font-bold text-xl text-blue-600">PrepNerdz</p>
    </nav>
);

export default function MentorApplyPage() {
    const [bio, setBio] = useState('');
    const [expertise, setExpertise] = useState('');
    const [category, setCategory] = useState('SENIOR');
    const [socials, setSocials] = useState({ linkedin: '', github: '', website: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const applicationData = {
                bio,
                expertise: expertise.split(',').map(s => s.trim()).filter(Boolean),
                category,
                socials
            };

            // This hits the /api/v1/mentor/apply endpoint
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/nerdconnect/mentor/apply`,
                applicationData,
                { withCredentials: true }
            );

            setSuccess('Application submitted successfully! You will be notified upon review.');
            setBio('');
            setExpertise('');
            setCategory('SENIOR');
            setSocials({ linkedin: '', github: '', website: '' });

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to submit application. Are you logged in?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-4 md:p-8 max-w-2xl">
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Become a Mentor</h1>
                    <p className="text-gray-600 mb-6">Share your knowledge and help fellow students grow. Fill out the application below to get started.</p>

                    {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">{success}</div>}
                    {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">I am a...</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="SENIOR">Top Performing Senior</option>
                                <option value="ALUMNI">Alumni / Industry Expert</option>
                                <option value="FACULTY">Faculty Member</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Your Bio</label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Tell us about yourself, your skills, and why you want to be a mentor."
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Areas of Expertise (Comma-separated)</label>
                            <input
                                type="text"
                                id="expertise"
                                value={expertise}
                                onChange={(e) => setExpertise(e.target.value)}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Data Structures, Java, MERN Stack, Career Advice"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL (Optional)</label>
                                <input type="url" id="linkedin" value={socials.linkedin} onChange={(e) => setSocials(s => ({ ...s, linkedin: e.target.value }))} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub Profile URL (Optional)</label>
                                <input type="url" id="github" value={socials.github} onChange={(e) => setSocials(s => ({ ...s, github: e.target.value }))} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-all"
                            >
                                {loading ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

