"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useRouter } from "next/navigation";


interface DoubtItem {
    text: string;
    cleared: boolean;
}

export default function GssocDoubtsPage() {
    const [doubts, setDoubts] = useState<DoubtItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                });
                const data = response.data;
                if (data.message?.isAuthenticated && data.message?.user?.role === 'ADMIN') {
                    setUsername(data.message.user.username);
                } else {
                    router.push("/");
                }
            } catch {
                router.push("/");
            }
        };
        fetchSession();
    }, [router]);

    useEffect(() => {
        async function fetchDoubts() {
            try {
                const csvUrl = process.env.NEXT_PUBLIC_CSV_URL;
                if (!csvUrl) {
                    throw new Error("NEXT_PUBLIC_CSV_URL is not defined in .env file");
                }

                const { data: csvText } = await axios.get<string>(csvUrl, {
                    responseType: "text",
                });

                const parsed = Papa.parse<string[]>(csvText, { skipEmptyLines: true });
                const rows = parsed.data;

                const doubtsList: DoubtItem[] = [];
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    if (row.length > 5) {
                        doubtsList.push({ text: row[5], cleared: false });
                    }
                }

                setDoubts(doubtsList);
            } catch (error) {
                console.error("Error fetching doubts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDoubts();
    }, []);

    const toggleCleared = (index: number) => {
        setDoubts((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, cleared: !item.cleared } : item
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-bold text-left text-gray-500">
                    Welcome {username}!
                </h1>
                <h1 className="text-3xl font-bold mb-6 text-center">
                    GSSoC Doubts & Questions
                </h1>

                {loading ? (
                    <p className="text-center text-gray-400">Loading doubts...</p>
                ) : doubts.length === 0 ? (
                    <p className="text-center text-gray-400">No doubts found.</p>
                ) : (
                    <ul className="space-y-4">
                        {doubts.map((doubt, index) => (
                            <li
                                key={index}
                                className={`flex items-center gap-3 bg-gray-800 rounded-lg shadow p-4 transition ${doubt.cleared ? "opacity-50 line-through" : ""
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={doubt.cleared}
                                    onChange={() => toggleCleared(index)}
                                    className="w-5 h-5 cursor-pointer accent-green-500"
                                />
                                <span>{doubt.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
