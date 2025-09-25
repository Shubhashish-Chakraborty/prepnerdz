"use client";

import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios'; // Import axios
import Navbar from '@/components/ui/navbars/Navbar';
import Image from 'next/image';

// --- Type Definitions (Updated) ---
interface Author {
    username: string;
    avatar?: { url: string };
}

interface Attachment {
    url: string;
    type: string;
}

interface Post {
    id: string;
    title: string;
    content: string;
    author: Author;
    isAnonymous: boolean;
    doubtCleared: boolean;
    _count: { replies: number; votes: number };
    createdAt: string;
    tags: string[];
    attachments: Attachment[];
}

// --- Helper Components ---
const SkeletonLoader = () => (
    <div className="border p-4 rounded-lg bg-gray-50 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
);

const PostCard = ({ post }: { post: Post }) => (
    <div className={`bg-white border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${post.doubtCleared ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}>
        <div className="flex items-center mb-2">
            {/* <Image
                src={post.author.avatar?.url || `https://api.dicebear.com/8.x/initials/svg?seed=${post.author.username}`}
                alt={post.author.username}
                height={20}
                width={20}
                className="w-8 h-8 rounded-full mr-3"
            /> */}

            <Image
                src={
                    post.author.avatar?.url ??
                    `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(
                        post.author.username
                    )}&chars=2`
                }
                alt={post.author.username}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full mr-3"
            />
            <div>
                <p className="text-sm font-semibold text-gray-800">{post.author.username}</p>
                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{post.title}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{post.content}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex flex-wrap gap-2 items-center">
                {post.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">#{tag}</span>)}
                {post.attachments && post.attachments.length > 0 && <span className="text-gray-600">📎 Attachments</span>}
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
                {post.doubtCleared && <span className="font-semibold text-green-600">✓ Cleared</span>}
                <span>{post._count.votes} votes</span>
                <span>{post._count.replies} replies</span>
            </div>
        </div>
    </div>
);

// --- Main Page Component ---
export default function NerdConnectPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const API_ENDPOINT = 'http://localhost:3001/nerdconnect/post';

    // Fetch posts on initial render using axios
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(API_ENDPOINT);
                setPosts(data);
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handlePostSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const postData = {
                title,
                content,
                isAnonymous,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
                attachments: [] // Sending empty attachments for now
            };

            // Using axios.post with withCredentials for cookie-based auth
            await axios.post(API_ENDPOINT, postData, { withCredentials: true });

            // Re-fetch posts to see the new one
            const { data: updatedPosts } = await axios.get(API_ENDPOINT);
            setPosts(updatedPosts);

            // Reset form
            setTitle('');
            setContent('');
            setTags('');
            setIsAnonymous(false);

        } catch (err: unknown) {
            let errorMessage = 'An unexpected error occurred. Are you logged in?';

            if (err instanceof Error) {
                errorMessage = err.message;
            }

            if (typeof err === "object" && err !== null && "response" in err) {
                const errorObj = err as { response?: { data?: { message?: string } } };
                errorMessage = errorObj.response?.data?.message || errorMessage;
            }

            setError(errorMessage);
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Nerd<span className="text-blue-600">Connect</span></h1>
                    <p className="text-md text-gray-600 mt-2">Your Community for Academic Questions & Expert Answers</p>
                </header>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Ask a Question</h2>
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter a clear and concise title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                        <textarea
                            placeholder="Describe your question in detail..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            rows={5}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Add tags, comma separated (e.g. java, oops, pointers)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-sm text-gray-700">Post Anonymously</span>
                            </label>
                            <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                                Submit Question
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                </div>

                <div className="space-y-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonLoader key={i} />)
                        : posts.map(post => <PostCard key={post.id} post={post} />)
                    }
                </div>
            </div>
        </div>
    );
}

