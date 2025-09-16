"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  email: string;
  contactNumber?: string;
  role: string;
}

export default function TotalUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState("STUDENT");

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      try {
        // session check: allow only the designated superadmin
        const sessionResp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, { withCredentials: true });
        const sessionData = sessionResp.data;
        if (sessionData?.message?.user?.id !== "cmcxr2inw0000js04os2u8mjm") {
          router.push("/");
          return;
        }

        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/getUsers`,
          { withCredentials: true }
        );
        if (!mounted) return;
        setUsers(resp.data?.users ?? []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        router.push("/");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      mounted = false;
    };
  }, [router]);

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
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/user/${editingId}`,
        { username: editUsername, role: editRole },
        { withCredentials: true }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingId ? { ...u, username: editUsername, role: editRole } : u
        )
      );
      cancelEdit();
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update user");
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/user/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="bg-mainBgColor text-white min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Total Users</h1>
        <div>
          <button
            onClick={() => router.push("/superadmin")}
            className="bg-gray-800 px-4 py-2 rounded"
          >
            Back
          </button>
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
                        className="bg-gray-900 p-2 rounded"
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
                        className="bg-gray-900 p-2 rounded"
                      >
                        <option value="STUDENT">STUDENT</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          u.role === "ADMIN" ? "bg-purple-600" : "bg-green-600"
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
  );
}