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

interface User {
    id: string;
    username: string;
    email: string;
    contactNumber?: string;
    role: string;
}

export default function TotalUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editUsername, setEditUsername] = useState("");
    const [editRole, setEditRole] = useState("STUDENT");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let mounted = true;
        const fetchUsers = async () => {
            try {
                // Session check: allow only the designated superadmin or ADMIN
                const sessionResp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, { withCredentials: true });
                const sessionData = sessionResp.data;

                if (sessionData?.message?.user?.role !== "ADMIN") {
                    window.location.href = "/"; // Redirect if not admin
                    return;
                }
                setIsAdmin(true); // User is authorized

                const resp = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/getUsers`,
                    { withCredentials: true }
                );
                if (!mounted) return;
                setUsers(resp.data?.users ?? []);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                window.location.href = "/"; // Redirect on error
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchUsers();
        return () => {
            mounted = false;
        };
    }, []);

    const startEdit = (u: User) => {
        setEditingId(u.id);
        setEditUsername(u.username ?? "");
        setEditRole(u.role ?? "STUDENT");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditUsername("");
        setEditRole("STUDENT");
    };

    const saveEdit = async () => {
        if (!editingId) return;
        try {
            const originalUser = users.find(u => u.id === editingId);

            // 1. Update user's username and role (your existing endpoint)
            await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/user/${editingId}`,
                { username: editUsername, role: editRole },
                { withCredentials: true }
            );

            // 2. Check if role changed to MENTOR
            if (editRole === 'MENTOR' && originalUser?.role !== 'MENTOR') {
                // Call the new admin route to create a mentor profile
                await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/assign-mentor`,
                    { userId: editingId, bio: 'Assigned by Admin.', expertise: ['General'] },
                    { withCredentials: true }
                );
            }

            // 3. Check if role changed FROM MENTOR
            if (originalUser?.role === 'MENTOR' && editRole !== 'MENTOR') {
                // Call the new admin route to unassign and delete mentor profile
                await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/unassign-mentor`,
                    { userId: editingId },
                    { withCredentials: true }
                );
            }

            // 4. Update UI state
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === editingId ? { ...u, username: editUsername, role: editRole } : u
                )
            );
            cancelEdit();
        } catch (err) {
            console.error("Failed to update user:", err);
            alert("Failed to update user. Please try again."); // Replace with a modal
        }
    };

    const deleteUser = async (id: string) => {
        // Replace with a custom modal in production
        if (!confirm("Are you sure you want to delete this user? This is irreversible.")) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/user/${id}`, {
                withCredentials: true,
            });
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error("Failed to delete user:", err);
            alert("Failed to delete user."); // Replace with a modal
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;
    if (!isAdmin) return null; // Prevent flash of unauthenticated content

    return (
        <div className="bg-mainBgColor text-white min-h-screen">
            <Navbar />
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Total Users</h1>
                    <div>
                        <a
                            href="/superadmin"
                            className="bg-gray-800 px-4 py-2 rounded mr-4"
                        >
                            Back
                        </a>
                        {/* Link to the new applications page */}
                        <a
                            href="/superadmin/mentor-applications"
                            className="bg-blue-600 px-4 py-2 rounded"
                        >
                            Mentor Applications
                        </a>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-4 text-left">ID</th>
                                    <th className="p-4 text-left">Username</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-left">Role</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="border-b border-gray-700 hover:bg-gray-700"
                                    >
                                        <td className="p-4 text-sm text-gray-300">{u.id}</td>
                                        <td className="p-4">
                                            {editingId === u.id ? (
                                                <input
                                                    value={editUsername}
                                                    onChange={(e) => setEditUsername(e.target.value)}
                                                    className="bg-gray-900 p-2 rounded text-white"
                                                />
                                            ) : (
                                                u.username
                                            )}
                                        </td>
                                        <td className="p-4 text-blue-400">{u.email}</td>
                                        <td className="p-4">
                                            {editingId === u.id ? (
                                                <select
                                                    value={editRole}
                                                    onChange={(e) => setEditRole(e.target.value)}
                                                    className="bg-gray-900 p-2 rounded text-white"
                                                >
                                                    <option value="STUDENT">STUDENT</option>
                                                    <option value="ADMIN">ADMIN</option>
                                                    <option value="MENTOR">MENTOR</option>
                                                </select>
                                            ) : (
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === "ADMIN" ? "bg-purple-600 text-white" :
                                                        u.role === "MENTOR" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                                                        }`}
                                                >
                                                    {u.role}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingId === u.id ? (
                                                <>
                                                    <button
                                                        onClick={saveEdit}
                                                        className="bg-green-600 px-3 py-1 rounded mr-2"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="bg-gray-600 px-3 py-1 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => startEdit(u)}
                                                        className="bg-blue-600 px-3 py-1 rounded mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUser(u.id)}
                                                        className="bg-red-600 px-3 py-1 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

