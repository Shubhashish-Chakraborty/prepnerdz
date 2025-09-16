'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    username: string;
    email: string;
    contactNumber: string;
    role: string;
    isMailVerified: boolean;
    provider: string;
    providerId: string;
    UserAddedAt: string;
    UserUpdatedAt: string;
}

export const SuperAdminLanding = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [userCount, setUserCount] = useState(0);
    const usersPerPage = 10;

    // fetching total user count:
    useEffect(() => {
        const fetchUserCount = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
            setUserCount(response.data.totalUsers);
        }
        fetchUserCount();
    }, [])

    useEffect(() => {
        const fetchSessionAndUsers = async () => {
            try {
                // Check session first
                const sessionResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`,
                    { withCredentials: true }
                );

                const data = sessionResponse.data;
                if (data.message.user.id !== "cmcxr2inw0000js04os2u8mjm") {
                    router.push("/");
                    return;
                }

                // If session is valid, fetch users
                const usersResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/getUsers`,
                    { withCredentials: true }
                );

                setUsers(usersResponse.data.users);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
                setLoading(false);
                router.push("/");
            }
        };

        fetchSessionAndUsers();
    }, [router]);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current users for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    if (loading) {
        return (
            <div className="bg-mainBgColor text-white min-h-screen flex items-center justify-center">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-mainBgColor text-white min-h-screen flex items-center justify-center">
                <div className="text-2xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-mainBgColor text-white min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8">Super Admin Dashboard</h1>
            <h1 className="text-2xl font-bold mb-5">We have <span className="text-amber-400"> {userCount} </span> users</h1>

            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => router.push('/superadmin/total-users')} className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700">
                    <h2 className="text-xl font-semibold">Total Users</h2>
                    <p className="text-sm text-gray-400 mt-2">View and manage all registered users (edit/delete)</p>
                </button>

                <button onClick={() => router.push('/superadmin/uploads')} className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700">
                    <h2 className="text-xl font-semibold">Uploads by Admins</h2>
                    <p className="text-sm text-gray-400 mt-2">See which admins uploaded resources and edit or delete uploads</p>
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by username, email, ID or role..."
                    className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Username</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Contact</th>
                                <th className="p-4 text-left">Role</th>
                                <th className="p-4 text-left">Verified</th>
                                <th className="p-4 text-left">Provider</th>
                                <th className="p-4 text-left">Joined</th>
                                <th className="p-4 text-left">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="p-4 text-sm text-gray-300">{user.id}</td>
                                        <td className="p-4">{user.username}</td>
                                        <td className="p-4 text-blue-400">{user.email}</td>
                                        <td className="p-4">{user.contactNumber}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'ADMIN' ? 'bg-purple-600' :
                                                user.role === 'STUDENT' ? 'bg-green-600' :
                                                    'bg-gray-600'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {user.isMailVerified ? (
                                                <span className="text-green-500">✓</span>
                                            ) : (
                                                <span className="text-red-500">✗</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {user.provider === 'google' ? (
                                                <span className="text-blue-400">Google</span>
                                            ) : (
                                                <span className="text-blue-400" >{JSON.stringify(user.provider)}</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-gray-300">{formatDate(user.UserAddedAt)}</td>
                                        <td className="p-4 text-sm text-gray-300">{formatDate(user.UserUpdatedAt)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="p-4 text-center text-gray-400">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredUsers.length > usersPerPage && (
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        Previous
                    </button>

                    <div className="text-gray-300">
                        Page {currentPage} of {totalPages}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        Next
                    </button>
                </div>
            )}

            <div className="mt-4 text-gray-400 text-sm">
                Showing {currentUsers.length} of {filteredUsers.length} users
            </div>
        </div>
    );
};