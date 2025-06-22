import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import prisma from '../db/prisma';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config';
import { generateHashedPassword } from '../utils/generateHash';

const BASE_URL = process.env.BASE_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing OAuth credentials in environment variables');
}

if (!BASE_URL) {
    throw new Error('Missing BASE_URL in environment variables');
}


// Serialize & Deserialize user
passport.serializeUser((user: Express.User, done) => {
    done(null, (user as any).id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Google Strategy
passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `${BASE_URL}/auth/google/callback`,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    done(new Error('No email found in Google profile'));
                    return
                }

                let user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email,
                            username: profile.displayName || `user-${Math.random().toString(36).substring(2, 9)}`,
                            password: await generateHashedPassword(),
                            contactNumber: "NOT_PROVIDED",
                            isMailVerified: true,
                            provider: 'google',
                            providerId: profile.id,
                        },
                    });
                }

                done(null, user);
                return
            } catch (err) {
                done(err as Error);
                return
            }
        }
    )
);

/* GitHub Strategy */

passport.use(
    'github',
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: `${BASE_URL}/auth/github/callback`,
            scope: ['user:email']
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                // GitHub may return multiple emails, we'll use the primary one
                const primaryEmail = profile.emails?.find((email: any) => email.primary)?.value ||
                    profile.emails?.[0]?.value;

                if (!primaryEmail) {
                    done(new Error('No email found in GitHub profile'));
                    return
                }

                // Check if user exists
                const existingUser = await prisma.user.findUnique({
                    where: { email: primaryEmail },
                });

                if (existingUser) {
                    done(null, existingUser);
                    return
                }

                // Create new user if doesn't exist
                const newUser = await prisma.user.create({
                    data: {
                        email: primaryEmail,
                        username: profile.username || `user-${Math.random().toString(36).substring(2, 9)}`,
                        password: await generateHashedPassword(),
                        contactNumber: "NOT_PROVIDED",
                        isMailVerified: true,
                        provider: 'github',
                        providerId: profile.id,
                    },
                });

                done(null, newUser);
                return
            } catch (err) {
                done(err as Error);
                return
            }
        }
    )
);