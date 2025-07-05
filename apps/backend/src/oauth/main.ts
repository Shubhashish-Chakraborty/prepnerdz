import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import { FRONTEND_URL, JWT_USER_SECRET } from '../config';

export const OauthRouter = Router();

// Google Auth
OauthRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false // We're using JWT instead of sessions
}));


OauthRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failure',
        session: false
    }),
    (req, res) => {
        if (!req.user) {
            res.redirect('/auth/failure');
            return
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: (req.user as any).id,
                email: (req.user as any).email
            },
            JWT_USER_SECRET,
            {
                expiresIn: "4d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            maxAge: 4 * 24 * 60 * 60 * 1000, // 4 Days
            path: "/",
        });

        const redirectUrl = new URL(`${FRONTEND_URL}/dashboard`);

        res.redirect(redirectUrl.toString());
    }
);


/* GitHub Auth */

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
    (req, res) => {
        if (!req.user) {
            return res.redirect(`${FRONTEND_URL}/auth/failure`);
        }

        const user = req.user as any;

        // Generate JWT token (same as Google flow)
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_USER_SECRET,
            { expiresIn: "4d" }
        );

        // Set cookie with same configuration
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
            path: "/",
        });


        const redirectUrl = new URL(`${FRONTEND_URL}/`); // initially redirecting to signin page!

        res.redirect(redirectUrl.toString());
    }
);

// Logout
OauthRouter.get('/logout', (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) console.error(err);
        res.redirect('/');
    });
});

// Auth Failure
OauthRouter.get('/failure', (req: Request, res: Response) => {
    res.send('Failed to authenticate.');
});