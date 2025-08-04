"use client";

import { Footer } from "@/components/ui/Footer";
import Navbar from "@/components/ui/navbars/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Head from "next/head";

type Bookmark = {
  id: string;
  resource: {
    id: string;
    type: string;
    title: string;
    description: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
    subject: {
      subjectName: string;
      subjectCode: string;
    };
  };
};

export default function MyBookmarksPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  // Authentication Check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`,
          { withCredentials: true }
        );
        setIsAuthenticated(response.status === 200);
        setUserId(response.data.message.user.id);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        router.push("/");
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Fetch bookmarks if authenticated
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark/user/${userId}`,
          { withCredentials: true }
        );
        setBookmarks(response.data.data);
      } catch (err) {
        console.error("Failed to fetch bookmarks", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && userId) {
      fetchBookmarks();
    }
  }, [isAuthenticated, userId]);

  return (
    <div className="relative min-h-screen bg-mainBgColor">
      <Head>
        <title>My Bookmarked Resources | PrepNerdz</title>
        <meta
          name="description"
          content="Easily access and manage your saved resources on PrepNerdz. Quickly review your bookmarked study materials, notes, and more."
        />
        <meta
          name="keywords"
          content="bookmarked resources, saved study materials, PrepNerdz bookmarks, student notes, tech learning, study resources, btech bookmarks, study platform, educational resources, My resources"
        />
        <meta property="og:title" content="Bookmarks | PrepNerdz" />
        <meta
          property="og:description"
          content="View all your saved and bookmarked educational resources in one place on PrepNerdz."
        />
        <meta property="og:url" content="https://prepnerdz.tech/bookmarks" />
        <meta property="og:site_name" content="PrepNerdz" />
        <meta property="og:image" content="/prepnerdz-only-specs.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bookmarks | PrepNerdz" />
        <meta
          name="twitter:description"
          content="Access your saved and favorite content at PrepNerdz anytime, anywhere."
        />
        <meta name="twitter:image" content="/prepnerdz-only-specs.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://prepnerdz.tech/bookmarks" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Background Circles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-red-300/80 blur-[80px] md:blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/40 blur-[60px] md:blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2.4 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-500/40 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold mb-6 text-center special">
            📌 My Bookmarked Resources
          </h1>

          {authLoading || loading ? (
            <p className="text-center">Loading bookmarks...</p>
          ) : bookmarks.length === 0 ? (
            <p className="text-center">No bookmarks found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="rounded-xl p-4 shadow-lg cursor-pointer transition-all duration-500 hover:shadow-amber-300 backdrop-blur-md border"
                >
                  <iframe
                    src={bookmark.resource.fileUrl}
                    title={bookmark.resource.title}
                    className="w-full h-64 rounded-md mb-3"
                    allow="autoplay"
                  />
                  <h2 className="text-xl font-semibold">
                    {bookmark.resource.title}
                  </h2>
                  <p className="text-sm mb-2">
                    {bookmark.resource.description}
                  </p>
                  <div className="text-sm">
                    <p>
                      <strong>Subject:</strong>{" "}
                      {bookmark.resource.subject.subjectName} (
                      {bookmark.resource.subject.subjectCode})
                    </p>
                    <p>
                      <strong>Type:</strong> {bookmark.resource.type}
                    </p>
                    <p>
                      <strong>Size:</strong>{" "}
                      {(bookmark.resource.fileSize / 1024).toFixed(2)} MB
                    </p>
                    <p>
                      <strong>Format:</strong> {bookmark.resource.fileType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
