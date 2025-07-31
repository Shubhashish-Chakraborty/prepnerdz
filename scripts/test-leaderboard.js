// prepnerdz/scripts/test-leaderboard.js

const fs = require('fs');
const path = require('path');

// Sample data based on typical GitHub contributions
const sampleContributors = [
  {
    username: "ragha",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
    merged_prs: 8,
    level_3: 2,
    level_2: 3,
    level_1: 2,
    normal_prs: 1,
    total_score: 42
  },
  {
    username: "contributor1",
    avatar_url: "https://avatars.githubusercontent.com/u/234567?v=4",
    merged_prs: 5,
    level_3: 1,
    level_2: 2,
    level_1: 1,
    normal_prs: 1,
    total_score: 26
  },
  {
    username: "contributor2",
    avatar_url: "https://avatars.githubusercontent.com/u/345678?v=4",
    merged_prs: 3,
    level_3: 0,
    level_2: 1,
    level_1: 2,
    normal_prs: 0,
    total_score: 16
  },
  {
    username: "contributor3",
    avatar_url: "https://avatars.githubusercontent.com/u/456789?v=4",
    merged_prs: 2,
    level_3: 0,
    level_2: 0,
    level_1: 1,
    normal_prs: 1,
    total_score: 5
  }
];

// Sort by total score descending
const sorted = sampleContributors.sort((a, b) => b.total_score - a.total_score);

// Write leaderboard.json
fs.writeFileSync(
  path.join(__dirname, '../leaderboard.json'),
  JSON.stringify(sorted, null, 2)
);

// Write leaderboard.md
let md = `# 🏆 Project Leaderboard\n\n`;
md += `This file is automatically updated after every successful PR merge.\n\n`;
md += `| Rank | Contributor | Avatar | Merged PRs | Level 3 | Level 2 | Level 1 | Normal PRs | Total Score |\n`;
md += `|------|-------------|--------|------------|---------|---------|---------|------------|------------|\n`;
sorted.forEach((c, i) => {
  md += `| ${i + 1} | ${c.username} | ![](${c.avatar_url}&s=32) | ${c.merged_prs} | ${c.level_3} | ${c.level_2} | ${c.level_1} | ${c.normal_prs} | ${c.total_score} |\n`;
});
md += `\n_Leaderboard will be updated automatically. Do not edit manually._\n`;
fs.writeFileSync(path.join(__dirname, '../leaderboard.md'), md);

console.log('Test leaderboard generated successfully!');
console.log(`Generated leaderboard with ${sorted.length} contributors`);
console.log('Files updated:');
console.log('- leaderboard.json (prepnerdz/)');
console.log('- leaderboard.md (prepnerdz/)');
console.log('\nTo update the frontend, run: node copy-leaderboard-json.js');