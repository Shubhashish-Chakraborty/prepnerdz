#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up backend environment...\n');

const envPath = path.join(__dirname, '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    console.log('   If you want to recreate it, delete the existing file first.\n');
    process.exit(0);
}

// Default environment variables
const envContent = `# Backend Environment Variables
# Generated on ${new Date().toISOString()}

# Server Configuration
PORT=3002
NODE_ENV=development

# Session and JWT Secrets (CHANGE THESE IN PRODUCTION!)
SESSION_SECRET=dev-session-secret-change-this-in-production-${Date.now()}
JWT_USER_SECRET=dev-jwt-secret-change-this-in-production-${Date.now()}

# Frontend URLs
FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:3002

# Optional: Email Configuration (for OTP)
# OTP_SENDERMAIL=your-email@gmail.com
# OTP_MAIL_PASSWORD=your-app-password

# Optional: OAuth Configuration
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
# GITHUB_CLIENT_ID=your-github-client-id
# GITHUB_CLIENT_SECRET=your-github-client-secret
# TWITTER_CLIENT_ID=your-twitter-client-id
# TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Optional: Cloudinary Configuration (for avatars)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret

# Optional: Database (if using external database)
# DATABASE_URL="postgresql://username:password@localhost:5432/prepnerdz"
`;

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📁 Location:', envPath);
    console.log('\n🔑 Generated secrets:');
    console.log('   - SESSION_SECRET: dev-session-secret-change-this-in-production-' + Date.now());
    console.log('   - JWT_USER_SECRET: dev-jwt-secret-change-this-in-production-' + Date.now());
    console.log('\n⚠️  IMPORTANT: Change these secrets in production!');
    console.log('\n🚀 You can now start the server with:');
    console.log('   npm run dev');
    console.log('\n📖 For more information, see ENVIRONMENT_SETUP.md');
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    process.exit(1);
} 