// prepnerdz/scripts/update-leaderboard.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const OWNER = 'raghavendra-24'; // Your GitHub username or org
const REPO = 'prepnerdz'; // Your repository name (case-sensitive!)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const LEVEL_POINTS = {
  'level 1': 4,
  'level 2': 6,
  'level 3': 10,
};

function githubApi(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path,
      headers: {
        'User-Agent': 'leaderboard-script',
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
      },
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function getMergedPRs(page = 1, per_page = 100) {
  const prs = await githubApi(`/repos/${OWNER}/${REPO}/pulls?state=closed&per_page=${per_page}&page=${page}&sort=updated&direction=desc`);
  return prs.filter(pr => pr.merged_at);
}

async function getIssue(issue_number) {
  return githubApi(`/repos/${OWNER}/${REPO}/issues/${issue_number}`);
}

async function getAllMergedPRs() {
  let all = [], page = 1, batch;
  do {
    batch = await getMergedPRs(page);
    all = all.concat(batch);
    console.log(`Fetched ${batch.length} PRs from page ${page}`);
    page++;
  } while (batch.length > 0);
  console.log(`Total merged PRs found: ${all.length}`);
  return all;
}

async function main() {
  console.log('Starting leaderboard update...');
  const prs = await getAllMergedPRs();
  const contributors = {};

  for (const pr of prs) {
    const closingIssues = (pr.body.match(/(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?) #([0-9]+)/gi) || [])
      .map(m => parseInt(m.match(/#(\d+)/)[1], 10));
    
    if (closingIssues.length === 0) {
      const user = pr.user.login;
      const avatar_url = pr.user.avatar_url;
      if (!contributors[user]) {
        contributors[user] = {
          username: user,
          avatar_url,
          merged_prs: 0,
          level_3: 0,
          level_2: 0,
          level_1: 0,
          normal_prs: 0,
          total_score: 0,
        };
      }
      contributors[user].merged_prs++;
      contributors[user].normal_prs++;
      contributors[user].total_score += 1;
      continue;
    }

    const user = pr.user.login;
    const avatar_url = pr.user.avatar_url;
    if (!contributors[user]) {
      contributors[user] = {
        username: user,
        avatar_url,
        merged_prs: 0,
        level_3: 0,
        level_2: 0,
        level_1: 0,
        normal_prs: 0,
        total_score: 0,
      };
    }
    contributors[user].merged_prs++;

    for (const issue_number of closingIssues) {
      try {
        const issue = await getIssue(issue_number);
        const levelLabel = (issue.labels.find(l => l.name.toLowerCase().startsWith('level')) || {}).name?.toLowerCase();
        if (levelLabel && LEVEL_POINTS[levelLabel]) {
          if (levelLabel === 'level 3') contributors[user].level_3++;
          if (levelLabel === 'level 2') contributors[user].level_2++;
          if (levelLabel === 'level 1') contributors[user].level_1++;
          contributors[user].total_score += LEVEL_POINTS[levelLabel];
        } else {
          if (!('normal_prs' in contributors[user])) contributors[user].normal_prs = 0;
          contributors[user].normal_prs++;
          contributors[user].total_score += 1;
        }
      } catch (e) {
        console.error(`Failed to fetch issue #${issue_number}:`, e.message);
        if (!('normal_prs' in contributors[user])) contributors[user].normal_prs = 0;
        contributors[user].normal_prs++;
        contributors[user].total_score += 1;
      }
    }
  }

  console.log(`Processed ${Object.keys(contributors).length} contributors`);

  // Write leaderboard.json
  fs.writeFileSync(
    path.join(__dirname, '../leaderboard.json'),
    JSON.stringify(Object.values(contributors).sort((a, b) => b.total_score - a.total_score || b.merged_prs - a.merged_prs), null, 2)
  );

  // Write leaderboard.md
  let md = `# 🏆 Project Leaderboard\n\n`;
  md += `This file is automatically updated after every successful PR merge.\n\n`;
  md += `| Rank | Contributor | Avatar | Merged PRs | Level 3 | Level 2 | Level 1 | Normal PRs | Total Score |\n`;
  md += `|------|-------------|--------|------------|---------|---------|---------|------------|------------|\n`;
  Object.values(contributors).sort((a, b) => b.total_score - a.total_score || b.merged_prs - a.merged_prs).forEach((c, i) => {
    md += `| ${i + 1} | ${c.username} | ![](${c.avatar_url}&s=32) | ${c.merged_prs} | ${c.level_3} | ${c.level_2} | ${c.level_1} | ${c.normal_prs || 0} | ${c.total_score} |\n`;
  });
  if (Object.keys(contributors).length === 0) {
    md += `| 1 | _TBD_ | | | | | | | |\n`;
  }
  md += `\n_Leaderboard will be updated automatically. Do not edit manually._\n`;
  fs.writeFileSync(path.join(__dirname, '../leaderboard.md'), md);

  console.log('Leaderboard updated successfully!');
  console.log(`Generated leaderboard with ${Object.keys(contributors).length} contributors`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});