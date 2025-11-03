"use client";

import React, { useState, useEffect, FormEvent } from 'react';
// Removed: import { useParams } from 'next/navigation'; - will get from window
import axios from 'axios';
// Removed: import Navbar from '@/components/ui/navbars/Navbar'; - replaced with placeholder
// Removed: import Image from 'next/image'; - replaced with <img>
// Removed: import Link from 'next/link'; - replaced with <a>

// --- Type Definitions ---
interface Author {
    username: string;
    avatar?: { url: string };
}
interface Attachment {
    id: string;
    url: string;
    type: string;
}
interface Reply {
    id: string;
    content: string;
    author: Author;
    attachments: Attachment[];
    createdAt: string;
}
interface Post {
    id: string;
    title: string;
    content: string;
    author: Author;
    isAnonymous: boolean;
    doubtCleared: boolean;
    createdAt: string;
    tags: string[];
    attachments: Attachment[];
    replies: Reply[];
    authorId: string; // Need this to check if current user is author
}

// --- Placeholder Navbar ---
const Navbar = () => (
    <nav className="w-full bg-white shadow-md h-16 flex items-center px-8">
        <p className="font-bold text-xl text-blue-600">PrepNerdz</p>
    </nav>
);

// --- Helper: Post Author ---
const PostAuthor = ({ author }: { author: Author }) => (
    <div className="flex items-center">
        {/* Replaced next/image with <img> */}
        <img
            src={
                author.avatar?.url ??
                `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(
                    author.username
                )}&chars=2`
            }
            alt={author.username}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full mr-3"
        />
        <div>
            <p className="text-sm font-semibold text-gray-800">{author.username}</p>
            <p className="text-xs text-gray-500">Posted on {new Date().toLocaleDateString()}</p>
        </div>
    </div>
);

// --- Helper: Attachment Viewer ---
const AttachmentViewer = ({ att }: { att: Attachment }) => (
    <a
        href={att.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gray-100 p-3 rounded-lg border hover:bg-gray-200 transition"
    >
        <span className="text-blue-600 font-medium">📎 {att.type.toUpperCase()} Attachment</span>
        {/* Replaced next/image with <img> */}
        {att.type.match(/png|jpg|jpeg|webp/) ? (
            <img src={att.url} alt="Attachment" width={200} height={150} className="rounded-md mt-2 object-cover" />
        ) : (
            <p className="text-sm text-gray-600 mt-1">Click to view file</p>
        )}
    </a>
);


// --- Main Post Detail Page Component ---
export default function PostDetailPage() {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [postId, setPostId] = useState<string | null>(null);

    // --- Replaced next/navigation ---
    useEffect(() => {
        // Get postId from the URL path
        const pathSegments = window.location.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];
        if (id) {
            setPostId(id);
        } else {
            setError("Could not find post ID in URL.");
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (postId) {
            fetchPostData();
        }
    }, [postId]);

    const fetchPostData = async () => {
        if (!postId) return;
        const API_ENDPOINT = `http://localhost:3001/nerdconnect/post/${postId}`;
        try {
            const { data } = await axios.get(API_ENDPOINT);
            setPost(data);
        } catch (err) {
            setError('Failed to fetch post. It may not exist.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReplySubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!replyContent || !postId) return;
        setIsReplying(true);

        const API_ENDPOINT = `http://localhost:3001/nerdconnect/post/${postId}`;

        try {
            const replyData = {
                content: replyContent,
                attachments: [],
            };

            await axios.post(`${API_ENDPOINT}/replies`, replyData, { withCredentials: true });
            
            setReplyContent('');
            await fetchPostData();

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to post reply. Are you logged in?');
        } finally {
            setIsReplying(false);
        }
    };

    const handleToggleDoubtCleared = async () => {
        if (!postId) return;
        const API_ENDPOINT = `http://localhost:3001/nerdconnect/post/${postId}`;
        
        try {
            const { data } = await axios.patch(
                `${API_ENDPOINT}/toggle-cleared`, 
                {}, 
                { withCredentials: true }
            );
            if (post) {
                setPost({ ...post, doubtCleared: data.doubtCleared });
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Could not update post.');
        }
    };

    if (isLoading) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <Navbar />
                <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-3xl">
                    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6 animate-pulse"></div>
                </div>
            </div>
        )
    }

    if (error || !post) {
         return (
            <div className="bg-gray-50 min-h-screen">
                <Navbar />
                <div className="container mx-auto p-4 text-center">
                    <h1 className="text-2xl font-bold text-red-500 mt-10">{error}</h1>
                    {/* Replaced next/link with <a> */}
                    <a href="/nerdconnect" className="text-blue-600 mt-4 inline-block">
                        &larr; Back to all questions
                    </a>
                </div>
            </div>
         )
    }

    // TODO: Need a way to get current user's ID to check if they are the author
    const isAuthor = true; // Placeholder

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-3xl">

                {/* --- The Post --- */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                        {post.doubtCleared 
                            ? <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">✓ Doubt Cleared</span>
                            : <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">? Open Question</span>
                        }
                        {isAuthor && (
                            <button onClick={handleToggleDoubtCleared} className="text-sm text-blue-600 hover:text-blue-800">
                                {post.doubtCleared ? 'Mark as Unsolved' : 'Mark as Solved'}
                            </button>
                        )}
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                    <PostAuthor author={post.author} />
                    <hr className="my-6" />

                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                    
                    {post.attachments.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Attachments</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {post.attachments.map(att => <AttachmentViewer key={att.id} att={att} />)}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 items-center mt-6">
                        {post.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">#{tag}</span>)}
                    </div>
                </div>

                {/* --- Replies Section --- */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">{post.replies.length} Replies</h2>

                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
                        <form onSubmit={handleReplySubmit}>
                            <textarea
                                placeholder="Write your reply... (Only mentors can add attachments)"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <button type="submit" disabled={isReplying} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                                    {isReplying ? 'Posting...' : 'Post Reply'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-4">
                        {post.replies.map(reply => (
                            <div key={reply.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                <PostAuthor author={reply.author} />
                                <p className="text-gray-700 py-4 whitespace-pre-wrap">{reply.content}</p>
                                {reply.attachments.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Attachments</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {reply.attachments.map(att => <AttachmentViewer key={att.id} att={att} />)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

