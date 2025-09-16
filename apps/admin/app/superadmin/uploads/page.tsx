"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Upload {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  uploadedBy?: { id: string; username?: string; email?: string } | null;
  createdAt?: string; // ISO date string
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function UploadsByAdmins() {
  const router = useRouter();
  const [admins, setAdmins] = useState<User[]>([]);
  const [allUploads, setAllUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFileUrl, setEditFileUrl] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        // check session and restrict to the superadmin id
        const sessionResp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, { withCredentials: true });
        const sessionData = sessionResp.data;
        if (sessionData?.message?.user?.id !== "cmcxr2inw0000js04os2u8mjm") {
          router.push("/");
          return;
        }

        const [usersResp, uploadsResp] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/getUsers`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/uploads`, { withCredentials: true }),
        ]);

        if (!mounted) return;

        const users: User[] = usersResp.data?.users ?? [];
        const adminUsers = users.filter((u: User) => u.role === "ADMIN");
        setAdmins(adminUsers);

        const uploads: Upload[] = uploadsResp.data?.uploads ?? [];
        setAllUploads(uploads);
      } catch (err) {
        console.error(err);
        router.push("/");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAll();
    return () => { mounted = false };
  }, [router]);

  const selectAdmin = (id: string | null) => {
    setSelectedAdminId(id);
    setEditingId(null);
  };

  const startEdit = (it: Upload) => {
    setEditingId(it.id);
    setEditTitle(it.title || "");
    setEditDescription(it.description || "");
    setEditFileUrl(it.fileUrl || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditFileUrl("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/upload/${editingId}`,
        { title: editTitle, description: editDescription, fileUrl: editFileUrl },
        { withCredentials: true }
      );

      setAllUploads(prev => prev.map(u => (u.id === editingId ? { ...u, title: editTitle, description: editDescription, fileUrl: editFileUrl } : u)));
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to update upload");
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this upload?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/upload/${id}`, { withCredentials: true });
      setAllUploads(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete upload");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  const uploadsToShow = selectedAdminId
    ? allUploads.filter(u => u.uploadedBy?.id === selectedAdminId)
    : [];

  return (
    <div className="bg-mainBgColor text-white min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Uploads by Admins</h1>
        <div>
          <button onClick={() => router.push("/superadmin")} className="bg-gray-800 px-4 py-2 rounded mr-2">Back</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-gray-800 rounded p-4">
          <h2 className="font-semibold mb-3">Admin users</h2>
          {admins.length === 0 && <div className="text-sm text-gray-400">No admin users found</div>}
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left p-2 rounded ${selectedAdminId === null ? 'bg-gray-700' : 'bg-transparent'}`}
                onClick={() => selectAdmin(null)}
              >
                All admins (select to view uploads)
              </button>
            </li>
            {admins.map(a => (
              <li key={a.id}>
                <button
                  className={`w-full text-left p-2 rounded ${selectedAdminId === a.id ? 'bg-gray-700' : 'bg-transparent'}`}
                  onClick={() => selectAdmin(a.id)}
                >
                  {a.username} <span className="text-xs text-gray-400">({a.email})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          {!selectedAdminId && <div className="mb-4 text-gray-300">Select an admin to view their uploads.</div>}

          {selectedAdminId !== null && (
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-4 text-left">ID</th>
                      <th className="p-4 text-left">Title</th>
                      <th className="p-4 text-left">Description</th>
                      <th className="p-4 text-left">Link</th>
                      <th className="p-4 text-left">Uploaded By</th>
                      <th className="p-4 text-left">Uploaded At</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadsToShow.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-gray-400">No uploads for this admin.</td>
                      </tr>
                    )}
                    {uploadsToShow.map(it => (
                      <tr key={it.id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="p-4 text-sm text-gray-300">{it.id}</td>
                        <td className="p-4">{editingId === it.id ? (
                          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="bg-gray-900 p-2 rounded" />
                        ) : it.title}</td>
                        <td className="p-4">{editingId === it.id ? (
                          <input value={editDescription} onChange={e => setEditDescription(e.target.value)} className="bg-gray-900 p-2 rounded" />
                        ) : it.description}</td>
                        <td className="p-4">{editingId === it.id ? (
                          <input value={editFileUrl} onChange={e => setEditFileUrl(e.target.value)} className="bg-gray-900 p-2 rounded" />
                        ) : it.fileUrl ? <a className="text-blue-300" href={it.fileUrl} target="_blank" rel="noreferrer">Open</a> : '-'}</td>
                        <td className="p-4">{it.uploadedBy?.username ?? it.uploadedBy?.email ?? '-'}</td>
                        <td className="p-4">{it.createdAt ? new Date(it.createdAt).toLocaleString() : '-'}</td>
                        <td className="p-4">{editingId === it.id ? (
                          <>
                            <button onClick={saveEdit} className="bg-green-600 px-3 py-1 rounded mr-2">Save</button>
                            <button onClick={cancelEdit} className="bg-gray-600 px-3 py-1 rounded">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(it)} className="bg-blue-600 px-3 py-1 rounded mr-2">Edit</button>
                            <button onClick={() => deleteItem(it.id)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
                          </>
                        )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
