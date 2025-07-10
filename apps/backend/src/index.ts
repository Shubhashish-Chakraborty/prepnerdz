import './oauth/passport';
import passport from 'passport';
import express from 'express';
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { PORT } from './config';
import { UserRouter } from './routes/userRoutes';
import { OauthRouter } from './oauth/main';
import { requestValidation } from './middlewares/requestValidation';
import { courseRouter } from './routes/courseRoutes';
import { branchRouter } from './routes/branchRoutes';
import { semesterRouter } from './routes/semesterRoutes';
import { subjectRouter } from './routes/subjectRoutes';
import { resourceRouter } from './routes/resourceRoutes';
import { searchRouter } from './routes/searchRoutes';
import { getMyIdRouter } from './routes/getMyIdRoutes';
import { AvatarRouter } from './routes/avatarRoutes';
import { ContactRouter } from './routes/contactRoutes';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Session configuration
app.use(
    session({
        // secret: process.env.SESSION_SECRET || 'defaultsecret',
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
        },
    })
);

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://prepnerdz.vercel.app',
        'https://prepnerdz.tech',
        'https://www.prepnerdz.tech',
        'https://prepnerdz-admin.vercel.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use("/api/v1/auth/user", UserRouter);
app.use("/auth", OauthRouter);
app.use("/api/v1/avatar", AvatarRouter);
app.use("/api/v1/contact", ContactRouter);

// ADMIN API ENDPOINTS!!!
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/branch", branchRouter);
app.use("/api/v1/semester", semesterRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/getmyid" , getMyIdRouter);

app.get("/", (req, res) => {
    res.send(`
        <h1 style="text-align: center;">PrepNerdz's Server is up and running!!</h1>
    `)
})

app.get("/health", requestValidation, (req, res) => { // for testing purpose!
    res.json({
        healthy: true,
        message: "server is up!"
    })
})

app.listen(PORT, () => {
    console.log(`BACKEND IS HOSTED : http://localhost:${PORT}`)
});