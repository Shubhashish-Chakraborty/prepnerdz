"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// NOTE: Using a placeholder Navbar component to avoid import errors
// You can replace this with your actual <Navbar /> import
const Navbar = () => (
    <nav className="w-full bg-gray-900 h-16 flex items-center px-8">
        <p className="font-bold text-xl text-white">PrepNerdz Admin</p>
    </nav>
);

interface Application {
    id: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
    expertise: string[];
    bio: string;
    status: string;
    createdAt: string;
}

export default function MentorApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // Auth check happens on the backend via AdminAuth middleware
                const resp = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/mentor-applications`,
                    { withCredentials: true }
                );
                setApplications(resp.data);
            } catch (err: any) {
                console.error("Failed to fetch applications:", err);
                setError(err.response?.data?.message || 'Failed to fetch data');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    window.location.href = "/"; // Redirect if not admin
                }
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/review-application/${id}`,
                { status },
                { withCredentials: true }
            );
            // Update UI 
            setApplications(prev =>
                prev.map(app => app.id === id ? { ...app, status } : app)
            );
        } catch (err) {
            console.error("Failed to review application:", err);
            alert('Failed to update status'); // Use custom modal
        }
    };

    if (loading) return <div className="p-8 text-white">Loading applications...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="bg-mainBgColor text-white min-h-screen">
            <Navbar />
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Mentor Applications</h1>
                    <a href="/superadmin/users" className="bg-gray-800 px-4 py-2 rounded">
                        Back to Users
                    </a>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-4 text-left">Applicant</th>
                                    <th className="p-4 text-left">Bio</th>
                                    <th className="p-4 text-left">Expertise</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-400">
                                            No pending applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    applications.map((app) => (
                                        <tr key={app.id} className="border-b border-gray-700 hover:bg-gray-700">
                                            <td className="p-4">
                                                <div>{app.user.username}</div>
                                                <div className="text-sm text-blue-400">{app.user.email}</div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-300 max-w-xs truncate" title={app.bio}>{app.bio}</td>
                                            <td className="p-4 text-sm">{app.expertise.join(', ')}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${app.status === "APPROVED" ? "bg-green-600 text-white" :
                                                        app.status === "REJECTED" ? "bg-red-600 text-white" : "bg-yellow-600 text-black"
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {app.status === 'PENDING' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleReview(app.id, 'APPROVED')}
                                                            className="bg-green-600 px-3 py-1 rounded mr-2 text-xs"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReview(app.id, 'REJECTED')}
                                                            className="bg-red-600 px-3 py-1 rounded text-xs"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

