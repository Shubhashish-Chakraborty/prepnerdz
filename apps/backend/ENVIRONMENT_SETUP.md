# Backend Environment Setup

This guide helps you set up the required environment variables for the backend server.

## 🔧 Required Environment Variables

Create a `.env` file in the `apps/backend/` directory with the following variables:

### Essential Variables (Required)
```bash
# Server Configuration
PORT=3002
NODE_ENV=development

# Session and JWT Secrets (CHANGE THESE IN PRODUCTION!)
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
JWT_USER_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URLs
FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:3002
```

### Optional Variables (for full functionality)
```bash
# Email Configuration (for OTP)
OTP_SENDERMAIL=your-email@gmail.com
OTP_MAIL_PASSWORD=your-app-password

# OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Cloudinary Configuration (for avatars)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Database (if using external database)
DATABASE_URL="postgresql://username:password@localhost:5432/prepnerdz"
```

## 🚀 Quick Start

1. **Create the .env file:**
   ```bash
   cd apps/backend
   touch .env
   ```

2. **Add the essential variables:**
   ```bash
   echo "PORT=3002" >> .env
   echo "NODE_ENV=development" >> .env
   echo "SESSION_SECRET=dev-session-secret-change-in-production" >> .env
   echo "JWT_USER_SECRET=dev-jwt-secret-change-in-production" >> .env
   echo "FRONTEND_URL=http://localhost:3000" >> .env
   echo "BASE_URL=http://localhost:3002" >> .env
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

## 🔒 Security Notes

- **NEVER commit your `.env` file to version control**
- **CHANGE the default secrets in production**
- **Use strong, random secrets in production**

## 🛠️ Troubleshooting

### Session Error
If you see "secret option required for sessions":
- Make sure `SESSION_SECRET` is set in your `.env` file
- The server will use a fallback secret if not provided

### Database Connection
If you see database connection errors:
- Make sure your database is running
- Check the `DATABASE_URL` in your `.env` file
- Run `npx prisma generate` to generate the Prisma client

### OAuth Issues
If OAuth login doesn't work:
- Make sure you've set up the OAuth apps in their respective platforms
- Verify the client IDs and secrets are correct
- Check that the redirect URLs match your configuration

## 📝 Example .env File

```bash
# Copy this to apps/backend/.env and modify as needed

PORT=3002
NODE_ENV=development

# Session and JWT Secrets
SESSION_SECRET=my-super-secret-session-key-12345
JWT_USER_SECRET=my-super-secret-jwt-key-67890

# Frontend URLs
FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:3002

# Optional: Email for OTP
# OTP_SENDERMAIL=your-email@gmail.com
# OTP_MAIL_PASSWORD=your-app-password

# Optional: OAuth (Google, GitHub, Twitter)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
# GITHUB_CLIENT_ID=your-github-client-id
# GITHUB_CLIENT_SECRET=your-github-client-secret
# TWITTER_CLIENT_ID=your-twitter-client-id
# TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Optional: Cloudinary for avatars
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
```

---

**Note:** The server will work with just the essential variables. Add the optional ones as you need the additional functionality. 