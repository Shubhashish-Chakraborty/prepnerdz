import React from 'react';

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

async function getLeaderboard(): Promise<Contributor[]> {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    : '';
  const res = await fetch(`${baseUrl}/leaderboard.json`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">🏆 Project Leaderboard</h1>
      <p className="mb-4 text-gray-600">
        This leaderboard is updated automatically after every successful PR merge.
      </p>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Contributor</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Merged PRs</th>
              <th className="px-4 py-2">Level 3</th>
              <th className="px-4 py-2">Level 2</th>
              <th className="px-4 py-2">Level 1</th>
              <th className="px-4 py-2">Normal PRs</th>
              <th className="px-4 py-2">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No contributors yet.
                </td>
              </tr>
            ) : (
              leaderboard.map((c, i) => (
                <tr key={c.username} className="border-t">
                  <td className="px-4 py-2 text-center">{i + 1}</td>
                  <td className="px-4 py-2">{c.username}</td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={c.avatar_url}
                      alt={c.username}
                      width={32}
                      height={32}
                      className="rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{c.merged_prs}</td>
                  <td className="px-4 py-2 text-center">{c.level_3}</td>
                  <td className="px-4 py-2 text-center">{c.level_2}</td>
                  <td className="px-4 py-2 text-center">{c.level_1}</td>
                  <td className="px-4 py-2 text-center">{c.normal_prs || 0}</td>
                  <td className="px-4 py-2 text-center font-bold">{c.total_score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-6 italic text-gray-500">
        Leaderboard will be updated automatically. Do not edit manually.
      </p>
    </div>
  );
}