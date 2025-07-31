// prepnerdz/scripts/copy-leaderboard-json.js

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../leaderboard.json');
const dest = path.join(__dirname, '../apps/web/public/leaderboard.json');

fs.copyFileSync(src, dest);
console.log('leaderboard.json copied to public directory.');