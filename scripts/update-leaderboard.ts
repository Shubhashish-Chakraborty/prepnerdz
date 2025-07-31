import * as fs from 'fs';
import { Octokit } from '@octokit/rest';

// configurations!!:
const OWNER = 'Shubhashish-Chakraborty';
const REPO = 'prepnerdz';
const LEADERBOARD_FILE_PATH = './apps/web/public/leaderboard.json';

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

// Initialize Octokit with the GitHub token provided by the GitHub Actions environment
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Defines the points awarded for each PR label
const SCORE_MAP: { [key: string]: number } = {
    'level 3': 10,
    'level 2': 6,
    'level 1': 4,
};
const NORMAL_PR_SCORE = 1; // Score for PRs without a specific level label

/**
 * The main function to fetch PRs, calculate scores, and update the leaderboard.
 */
async function run(): Promise<void> {
    console.log('Starting leaderboard update...');

    try {
        // Use octokit.paginate to automatically fetch all pages of results
        const allPRs = await octokit.paginate('GET /repos/{owner}/{repo}/pulls', {
            owner: OWNER,
            repo: REPO,
            state: 'closed', // We only care about closed PRs
            per_page: 100,
        });

        console.log(`Found ${allPRs.length} total closed PRs. Filtering for merged ones...`);

        // FIX: Define the type for the contributors object.
        // This tells TypeScript that `contributors` is a dictionary-like object
        // where each key is a string (the username) and each value is a `Contributor` object.
        // This resolves the "No index signature" error.
        const contributors: { [key: string]: Contributor } = {};

        for (const pr of allPRs) {
            // We only process PRs that have been successfully merged
            if (!pr.merged_at) {
                continue;
            }

            // FIX: Add a null check for `pr.user`.
            // It's possible for a user to be null if their account was deleted.
            // This resolves the "'pr.user' is possibly 'null'" error.
            if (!pr.user) {
                console.log(`Skipping PR #${pr.number} because it has no user.`);
                continue;
            }

            const username = pr.user.login;
            const avatar_url = pr.user.avatar_url;

            // Initialize the contributor object if this is their first merged PR
            if (!contributors[username]) {
                contributors[username] = {
                    username,
                    avatar_url,
                    merged_prs: 0,
                    level_3: 0,
                    level_2: 0,
                    level_1: 0,
                    normal_prs: 0,
                    total_score: 0,
                };
            }

            const contributor = contributors[username];
            contributor.merged_prs += 1;

            // Get all labels in lowercase for case-insensitive matching
            const labels = pr.labels.map((label) => label.name.toLowerCase());
            let score = 0;
            let isLevelPR = false;

            // Check for level labels and assign points
            if (labels.includes('level 3')) {
                score = SCORE_MAP['level 3'];
                contributor.level_3 += 1;
                isLevelPR = true;
            } else if (labels.includes('level 2')) {
                score = SCORE_MAP['level 2'];
                contributor.level_2 += 1;
                isLevelPR = true;
            } else if (labels.includes('level 1')) {
                score = SCORE_MAP['level 1'];
                contributor.level_1 += 1;
                isLevelPR = true;
            }

            // If no level label was found, assign the default score for a normal PR
            if (!isLevelPR) {
                score = NORMAL_PR_SCORE;
                contributor.normal_prs += 1;
            }

            contributor.total_score += score;
        }

        // Convert the contributors object into an array and sort it by total_score descending
        const sortedLeaderboard = Object.values(contributors).sort(
            (a, b) => b.total_score - a.total_score
        );

        // Write the final sorted array to the JSON file
        fs.writeFileSync(
            LEADERBOARD_FILE_PATH,
            JSON.stringify(sortedLeaderboard, null, 2)
        );

        console.log(`✅ Leaderboard updated successfully with ${sortedLeaderboard.length} contributors.`);

    } catch (error) {
        console.error('Error updating leaderboard:', error);
        process.exit(1); // Exit with an error code to fail the GitHub Action
    }
}

// Run the script and handle any top-level errors
run().catch((error) => {
    console.error(error);
    process.exit(1);
});