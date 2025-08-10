#!/usr/bin/env node

/**
 * Simple script to test hydration issues
 * Run this after making changes to verify fixes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing hydration fixes...\n');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Please run this script from the web app directory');
  process.exit(1);
}

try {
  // Build the app to check for any build-time issues
  console.log('📦 Building the app...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');

  // Start the dev server
  console.log('🚀 Starting development server...');
  console.log('💡 Tips to test hydration:');
  console.log('   1. Open the app in an incognito/private window');
  console.log('   2. Disable browser extensions temporarily');
  console.log('   3. Check the console for hydration warnings');
  console.log('   4. Look for fdprocessedid attributes in the DOM');
  console.log('\n🔍 If you still see hydration errors:');
  console.log('   - Check browser extensions (LastPass, Grammarly, etc.)');
  console.log('   - Try a different browser');
  console.log('   - Clear browser cache and cookies');
  
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} 