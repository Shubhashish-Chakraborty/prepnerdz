import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import prisma from '../db/prisma';
import { BASE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET } from '../config';
import { generateHashedPassword } from '../utils/generateHash';

// Commented out for development - uncomment when OAuth credentials are available
// if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET) {
//     throw new Error('Missing OAuth credentials in environment variables');
// }

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

// Google Strategy - only create if credentials are available
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
    passport.use(
        'google',
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
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
}

/* GitHub Strategy - only create if credentials are available */
if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET,
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
}


// Twitter/X Strategy (OAuth 2.0) - only create if credentials are available
if (TWITTER_CLIENT_ID && TWITTER_CLIENT_SECRET) {
    passport.use(
        'twitter',
        new TwitterStrategy(
            {
                consumerKey: TWITTER_CLIENT_ID,
                consumerSecret: TWITTER_CLIENT_SECRET,
                callbackURL: `${BASE_URL}/auth/twitter/callback`,
                includeEmail: true,
            },
            async (_token, _tokenSecret, profile, done) => {
                // console.log("--- Twitter/X Profile Received ---");
                // console.log(JSON.stringify(profile, null, 2)); // Log the entire profile object

                try {
                    const email = profile.emails?.[0]?.value;
                    // console.log(`Extracted Email: ${email}`); // Log the email we found

                    if (!email) {
                        console.error("CRITICAL: No email found in Twitter profile.");
                        // This error message will now be clearly visible in your server logs.
                        done(new Error('No email found in Twitter profile. Please ensure permissions are set in the X Developer Portal.'));
                        return
                    }

                    // console.log(`Searching for user with email: ${email}`);
                    let user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (user) {
                        console.log(`User found: ${user.id}. Skipping creation.`);
                    } else {
                        // console.log(`No user found. Creating a new user...`);
                        user = await prisma.user.create({
                            data: {
                                email,
                                username: profile.username || `user-${Math.random().toString(36).substring(2, 9)}`,
                                password: await generateHashedPassword(),
                                contactNumber: "NOT_PROVIDED",
                                isMailVerified: true,
                                provider: 'twitter',
                                providerId: profile.id,
                            },
                        });
                        // console.log(`New user created with ID: ${user.id}`);
                    }

                    // console.log(`Authentication successful. Passing user to Passport.`);
                    done(null, user);
                    return;
                } catch (err) {
                    console.error(err); // Log the full error from Prisma or elsewhere
                    done(err as Error);
                    return;
                }
            }
        )
    );
}