"use client";
import React from "react";

type Blog = {
  date: string;
  readTime: string;
  title: string;
  image: string;
};

export default function PrepNerdzBlogsSection() {
  const blogData: Blog[] = [
    {
      date: "Jul 10, 2025",
      readTime: "2 min read",
      title: "How to Find RGPV Papers in Seconds with PrepNerdz",
      image: "https://source.unsplash.com/random/400x300?books",
    },
    {
      date: "Jul 08, 2025",
      readTime: "3 min read",
      title: "Why Verified Notes Matter: Our Quality Control Process",
      image: "https://source.unsplash.com/random/400x300?study",
    },
    {
      date: "Jul 05, 2025",
      readTime: "4 min read",
      title: "Contribute & Shine: How to Upload Your Study Materials",
      image: "https://source.unsplash.com/random/400x300?university",
    },
    {
      date: "Jul 03, 2025",
      readTime: "3 min read",
      title: "Bookmark, Save, Succeed: PrepNerdz Productivity Features",
      image: "https://source.unsplash.com/random/400x300?notes",
    },
    {
      date: "Jul 01, 2025",
      readTime: "2 min read",
      title: "PrepNerdz vs. Dead-End Google Searches: A Comparison",
      image: "https://source.unsplash.com/random/400x300?college",
    },
    {
      date: "Jun 29, 2025",
      readTime: "2 min read",
      title: "Our Story: How 3 Developers Built a Study Revolution",
      image: "https://source.unsplash.com/random/400x300?developer",
    },
    {
      date: "Jun 27, 2025",
      readTime: "3 min read",
      title: "How AI Helps Curate Your Resources at PrepNerdz",
      image: "https://source.unsplash.com/random/400x300?ai",
    },
  ];

  return (
    <div className="w-full px-4 md:px-16 py-20 bg-white text-[#111111]">
      {/* Header */}
      <div className="flex justify-center">
        <h2 className="uppercase py-1 px-4 border-2 border-[#111111] text-xs rounded-3xl font-medium">
          our blogs
        </h2>
      </div>

      <div className="text-center mt-5 space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold">The Latest Story From</h1>
        <h1 className="text-4xl md:text-6xl font-bold">Our Blog</h1>
      </div>

      {/* Blog Cards Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogData.slice(0, 6).map((blog, index) => (
          <div key={index} className="w-full">
            <div
              className="w-full h-64 bg-[#111111] rounded-3xl bg-cover bg-center"
              style={{ backgroundImage: `url(${blog.image})` }}
            />
            <div className="p-2">
              <div className="mt-5 text-sm flex gap-5 text-gray-500 font-medium">
                <span>{blog.date}</span>
                <span>{blog.readTime}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold line-clamp-3">
                {blog.title}
              </h3>
              <div className="border-t-2 mt-5 border-gray-300">
                <div className="mt-5 flex justify-between items-center font-bold">
                  <span className="hover:underline cursor-pointer text-[#111111]">
                    Read Story
                  </span>
                  <span>-</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center mt-20">
        <button className="text-lg bg-[#81F97C] hover:bg-[#66e761] transition px-6 py-3 rounded-full font-semibold">
          See All Blogs
        </button>
      </div>
    </div>
  );
}
