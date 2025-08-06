// All your imports remain the same
import React from "react";
import fs from "fs";
import path from "path";
import Navbar from "@/components/ui/navbars/Leaderboard-Navbar";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

interface Contributor {
  username: string;
  avatar_url: string;
  merged_prs: number;
  level_3: number;
  level_2: number;
  level_1: number;
  normal_prs: number;
  total_score: number;
}

export const metadata: Metadata = {
  title: "Leaderboard | PrepNerdz GSSoC 2025 Contributions",
  description:
    "Explore the PrepNerdz GSSoC 2025 leaderboard showcasing top contributors and their scores based on merged PRs and impact.",
  keywords: [
    "PrepNerdz GSSoC",
    "GSSoC 2025 leaderboard",
    "PrepNerdz contributors",
    "Open source leaderboard",
    "GSSoC PrepNerdz score",
    "student open source",
    "GSSoC top contributors",
    "GitHub leaderboard India",
    "GSSoC rankings",
  ],
  openGraph: {
    title: "GSSoC 2025 Leaderboard | PrepNerdz",
    description:
      "Check out the latest GSSoC 2025 PrepNerdz leaderboard, recognizing the most impactful open-source contributors.",
    url: "https://prepnerdz.tech/leaderboard",
    siteName: "PrepNerdz",
    images: [
      {
        url: "/prepnerdz-only-specs.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GSSoC 2025 Leaderboard | PrepNerdz",
    description:
      "Track contributor rankings and open source PR scores in PrepNerdz's GSSoC 2025 leaderboard.",
    images: ["/prepnerdz-only-specs.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

async function getLeaderboard(): Promise<Contributor[]> {
  const isServer = typeof window === "undefined";
  if (isServer) {
    try {
      const filePath = path.join(process.cwd(), "public", "leaderboard.json");
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents);
    } catch (error) {
      console.error("Error reading leaderboard file on server:", error);
      return [];
    }
  }
  const res = await fetch("/leaderboard.json", { cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch leaderboard on client");
    return [];
  }
  return res.json();
}

const PodiumCard = ({
  contributor,
  rank,
}: {
  contributor: Contributor;
  rank: number;
}) => {
  const rankStyles: {
    [key: number]: {
      borderColor: string;
      shadowColor: string;
      emoji: string;
      textColor: string;
    };
  } = {
    1: {
      borderColor: "border-yellow-400",
      shadowColor: "shadow-yellow-400/50",
      emoji: "🥇",
      textColor: "text-yellow-400",
    },
    2: {
      borderColor: "border-gray-400",
      shadowColor: "shadow-gray-400/50",
      emoji: "🥈",
      textColor: "text-gray-400",
    },
    3: {
      borderColor: "border-orange-400",
      shadowColor: "shadow-orange-400/50",
      emoji: "🥉",
      textColor: "text-orange-400",
    },
  };

  const style = rankStyles[rank];

  return (
    <Link
      href={`https://github.com/${contributor.username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border-2 ${style.borderColor} shadow-lg ${style.shadowColor} flex flex-col items-center text-center transition-transform hover:scale-105`}
      >
        <span className="text-5xl mb-4">{style.emoji}</span>
        <Image
          src={contributor.avatar_url}
          alt={contributor.username}
          width={100}
          height={100}
          className="rounded-full border-4 border-gray-700 mb-4"
        />
        <h3 className={`text-2xl font-bold ${style.textColor}`}>
          {contributor.username}
        </h3>
        <p className="text-gray-300 text-lg">
          {contributor.total_score} Points
        </p>
      </div>
    </Link>
  );
};

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();
  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <div className="bg-[#08090a] text-white min-h-screen p-4 sm:p-6 md:p-8">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        {/* Disclaimer */}
        <div className="animate-leaderboard-fade-in-up mt-12 text-center text-sm text-gray-300 border border-gray-700 rounded-lg p-4">
          <p className="font-semibold">Disclaimer</p>
          <p>
            This leaderboard reflects contributions made exclusively only to the
            PrepNerdz repository for GSSoC 2025 and does not represent the
            official, overall GSSoC standings.
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-10 animate-leaderboard-fade-in-up">
          <h1 className="text-4xl md:text-5xl special mt-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-600">
            GSSoC 2025 Contribution Leaderboard
          </h1>
          <div className="flex justify-center items-center">
            <Link
              href={"https://github.com/Shubhashish-Chakraborty/prepnerdz"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="animate-bounce cursor-pointer decoration-amber-200 hover:underline flex justify-center items-center mt-4 space-x-2">
                <div className="text-xl text-amber-400 font-extrabold">
                  For PrepNerdz Project
                </div>
                <div>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    className="size-4 text-amber-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-leaderboard-fade-in-up">
            {topThree.map((contributor, index) => (
              <PodiumCard
                key={contributor.username}
                contributor={contributor}
                rank={index + 1}
              />
            ))}
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm animate-leaderboard-fade-in-up rounded-2xl p-1 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-900/70">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 rounded-tl-xl">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Contributor</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-300">Total PRs</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-300">Level 3</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-300">Level 2</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-300">Level 1</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-300">Normal</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-300 rounded-tr-xl">Total Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-400">
                      No contributions yet. Be the first!
                    </td>
                  </tr>
                ) : (
                  restOfLeaderboard.map((c, i) => (
                    <tr key={c.username} className="border-t border-gray-700 hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-center font-bold text-gray-400">{i + 4}</td>
                      <Link
                        href={`https://github.com/${c.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <td className="px-4 py-3 flex hover:text-amber-300 items-center gap-3">
                          <Image
                            src={c.avatar_url}
                            alt={c.username}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="font-semibold">{c.username}</span>
                        </td>
                      </Link>
                      <td className="px-4 py-3 text-center text-gray-400">{c.merged_prs}</td>
                      <td className="px-4 py-3 text-center text-gray-400">{c.level_3}</td>
                      <td className="px-4 py-3 text-center text-gray-400">{c.level_2}</td>
                      <td className="px-4 py-3 text-center text-gray-400">{c.level_1}</td>
                      <td className="px-4 py-3 text-center text-gray-400">{c.normal_prs || 0}</td>
                      <td className="px-4 py-3 text-center font-bold text-lg text-purple-400">{c.total_score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
