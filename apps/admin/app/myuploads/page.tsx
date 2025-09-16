"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Upload {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt?: string;
  subject?: { subjectName: string } | null;
  uploadedBy?: { id: string } | null;
}

export default function MyUploadsPage() {
  const router = useRouter();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchUploads = async () => {
      try {
        // Get session to find user id
        const sessionResp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, { withCredentials: true });
        const userId = sessionResp.data?.message?.user?.id;
        if (!userId) {
          router.push("/");
          return;
        }
        // Fetch all uploads, filter by user id
        const uploadsResp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/superadmin/uploads`, { withCredentials: true });
        const allUploads: Upload[] = uploadsResp.data?.uploads ?? [];
        const myUploads = allUploads.filter(u => u.uploadedBy?.id === userId);
        if (mounted) setUploads(myUploads);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch uploads");
        router.push("/");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUploads();
    return () => { mounted = false };
  }, [router]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (error) return <div className="p-8 text-red-400">{error}</div>;

  return (
    <div className="bg-mainBgColor text-white min-h-screen p-8">
      <button onClick={() => router.push("/dashboard")} className="bg-gray-800 px-4 py-2 rounded mr-2">Back</button>
      <h1 className="text-2xl font-bold mb-6">My Uploads</h1>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">File URL</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {uploads.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">No uploads found.</td>
                </tr>
              )}
              {uploads.map(u => (
                <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-4 text-sm text-gray-300">{u.id}</td>
                  <td className="p-4">{u.title}</td>
                  <td className="p-4">{u.description}</td>
                  <td className="p-4">{u.fileUrl ? <a className="text-blue-300" href={u.fileUrl} target="_blank" rel="noreferrer">Open</a> : '-'}</td>
                  <td className="p-4">{u.subject?.subjectName ?? '-'}</td>
                  <td className="p-4">{u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={() => router.push("/dashboard")} className="bg-gray-800 px-4 py-2 rounded">Back to Dashboard</button>
    </div>
  );
}
