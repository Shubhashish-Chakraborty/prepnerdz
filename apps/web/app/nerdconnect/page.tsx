"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Navbar from '@/components/ui/navbars/Navbar';
import Image from 'next/image';
import Link from 'next/link'; // Import Next.js Link

// --- Type Definitions ---
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
                {post.attachments && post.attachments.length > 0 && <span className="text-gray-600">📎 {post.attachments.length} Attachment(s)</span>}
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
    const [file, setFile] = useState<File | null>(null); // State for the selected file
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const API_ENDPOINT = 'http://localhost:3001/nerdconnect/post';

    // Fetch posts on initial render
    useEffect(() => {
        fetchPosts();
    }, []);

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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handlePostSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsUploading(true);

        let uploadedAttachments: Attachment[] = [];

        // --- Step 1: Handle File Upload (if one exists) ---
        if (file) {
            try {
                // 1a: Get signature from our backend
                const { data: signatureData } = await axios.get(
                    'http://localhost:3001/nerdconnect/attachments/signature',
                    { withCredentials: true }
                );

                // 1b: Prepare form data for Cloudinary
                const formData = new FormData();
                formData.append('file', file);
                formData.append('api_key', signatureData.apiKey);
                formData.append('timestamp', signatureData.timestamp);
                formData.append('signature', signatureData.signature);
                formData.append('folder', 'nerdconnect_attachments');

                // 1c: Upload directly to Cloudinary
                const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/auto/upload`;
                const { data: uploadData } = await axios.post(cloudinaryUrl, formData);

                uploadedAttachments.push({
                    url: uploadData.secure_url,
                    type: uploadData.format, // e.g., 'pdf', 'png'
                });

            } catch (err) {
                console.error(err);
                setError('File upload failed. Please try again.');
                setIsUploading(false);
                return;
            }
        }

        // --- Step 2: Submit the Post to our Backend ---
        try {
            const postData = {
                title,
                content,
                isAnonymous,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
                attachments: uploadedAttachments, // Send the Cloudinary URL
            };

            await axios.post(API_ENDPOINT, postData, { withCredentials: true });
            
            // Reset form and refetch posts
            setTitle('');
            setContent('');
            setTags('');
            setFile(null);
            setIsAnonymous(false);
            await fetchPosts();

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred. Are you logged in?';
            setError(errorMessage);
            console.error(err);
        } finally {
            setIsUploading(false);
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
                        <input type="text" placeholder="Enter a clear and concise title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                        <textarea placeholder="Describe your question in detail..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" rows={5} required />
                        <input type="text" placeholder="Add tags, comma separated (e.g. java, oops, pointers)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                        
                        {/* --- NEW FILE INPUT --- */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Add Attachment (Image or PDF)</label>
                            <input type="file" onChange={handleFileChange} accept="image/*,.pdf" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        </div>
                        
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-sm text-gray-700">Post Anonymously</span>
                            </label>
                            <button type="submit" disabled={isUploading} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-all">
                                {isUploading ? 'Uploading...' : 'Submit Question'}
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                </div>

                <div className="space-y-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonLoader key={i} />)
                        : posts.map(post => (
                            <Link href={`/nerdconnect/${post.id}`} key={post.id} className="block">
                                <PostCard post={post} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

