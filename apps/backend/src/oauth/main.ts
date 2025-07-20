import jwt from 'jsonwebtoken';
import { Request, Response, Router } from 'express';
import passport from 'passport';
import { FRONTEND_URL, JWT_USER_SECRET } from '../config';

export const OauthRouter = Router();

// Helper function for success redirect

const handleAuthSuccess = (req: Request, res: Response) => {
    if (!req.user) {
        // This case should ideally be caught by failureRedirect, but as a fallback
        res.redirect(`${FRONTEND_URL}/auth/failure?message=Authentication failed`);
        return;
    }

    const user = req.user as any;

    // Generate JWT token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_USER_SECRET,
        { expiresIn: "4d" }
    );

    // Set cookie with the token
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 Days
        path: "/",
    });

    // Redirect to the frontend dashboard
    const redirectUrl = new URL(`${FRONTEND_URL}/dashboard`);
    res.redirect(redirectUrl.toString());
};


// --- Google Auth Routes ---
OauthRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

OauthRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failure',
        session: false
    }),
    handleAuthSuccess // Use the helper function
);


// --- GitHub Auth Routes ---
OauthRouter.get('/github', passport.authenticate('github', {
    scope: ['user:email'],
    session: false
}));

OauthRouter.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/auth/failure',
        session: false
    }),
    handleAuthSuccess // Use the helper function
);


// --- Twitter/X Auth Routes ---
OauthRouter.get('/twitter', passport.authenticate('twitter', {
    session: false
}));

OauthRouter.get(
    '/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/auth/failure',
        session: false
    }),
    handleAuthSuccess // Use the helper function
);


// --- Common Routes ---

// Logout
OauthRouter.get('/logout', (req: Request, res: Response) => {
    // req.logout is session-based, for JWT we just clear the cookie
    res.clearCookie('token', { path: '/' });
    res.redirect('/');
});

// Auth Failure
OauthRouter.get('/failure', (req: Request, res: Response) => {
    const message = req.query.message || 'Failed to authenticate.';
    res.status(401).send(message);
});
