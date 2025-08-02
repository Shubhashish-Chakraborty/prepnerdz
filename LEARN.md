# Welcome to Prepnerdz! - A Learning Guide ⭐

Welcome, future contributor! This document is your guide to understanding the Prepnerdz project, its architecture, and how you can contribute to making it the ultimate academic resource platform for B.Tech students.

### See our [Contributing Guide](CONTRIBUTING.md) for detailed setup instructions, development guidelines, and complete focus area guidance.

> This Learning Guide is just for letting you know about the Prepnerdz project and get started with it.

## Table of Contents

1.  [What is Prepnerdz? 🎯 (Project Overview)](#what-is-prepnerdz--project-overview)
2.  [Features](#-features)
3.  [Tech Stack](#️-tech-stack)
4.  [Project Structure](#-project-structure)
5.  [Database Schema Explained](#️-database-schema-explained)
6.  [API Endpoints](#-api-endpoints)
7.  [Contributing](#contributing)
8.  [Contact the Maintainer & the Mentors](#contact-the-maintainer--the-mentors)
9.  [License](#license)

---

## What is Prepnerdz? 🎯 (Project Overview)

For countless time college students search for quality study materials like previous year papers, notes, and lab manual --> it is a chaotic journey through WhatsApp groups, unorganized Google Drives, and endless requests to seniors/classmates, etc. This process is inefficient, frustrating, and often fruitless.

**Prepnerdz solves this chaos.**

It's a centralized, organized, and community-driven platform designed specifically for B.Tech students (initially focusing on [RGPV](https://www.rgpv.ac.in)). Our mission is to provide a single, reliable source for all academic resources, ensuring students spend less time searching and more time learning.

The Current Resources that are available are:

- SHIVANI_BOOKS
- MID_SEM_PAPER
- END_SEM_PAPER
- IMP_QUESTION
- IMP_TOPIC
- NOTES
- LAB_MANUAL
- SYLLABUS

### 🌟 Features

- **📚 Centralized Resources**: Find previous year papers (PYQs), mid-semester and end-semester papers, best-in-class notes, lab manuals, syllabus, and more -> all in one place.
- **✅ Verified Content**: Materials are verified by faculty and top-performing students to ensure quality and accuracy.
- **🔖 Bookmarking**: Save important resources to your personal collection for quick and easy access later.
- **🤝 Contribution System**: Earn recognition for contributing useful content.

---

## 🛠️ Tech Stack

This section outlines the core technologies used in Prepnerdz.

- **Framework**: Next.js, Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL (from [NEON](https://neon.tech))
- **Authentication**: http-only cookies, JWT, GoogleOauth2, GithubOauth2
- **Styling**: Tailwind CSS

---

## 📁 Project Structure

This project is a **monorepo** managed using Turborepo. It contains several independent applications (`apps`) and shared libraries (`packages`).

```
/
├── apps/
│   ├── web/              # Main user-facing Next.js application
│   │   ├── app/          # Next.js App Router (pages, layouts)
│   │   ├── components/   # React components specific to the web app
│   │   └── public/       # Static assets for the web app
│   │
│   ├── admin/            # Admin dashboard Next.js application
│   │   ├── app/          # Next.js App Router for admin pages
│   │   └── components/   # React components specific to the admin app
│   │
│   └── backend/          # Backend Express.js http-server
│       ├── prisma/       # Prisma schema, migrations, and client
│       ├── src/
│       │   ├── controllers/ # Contains the business logic for API endpoints
│       │   ├── routes/      # Defines the API routes and endpoints
│       │   ├── middlewares/ # Express middlewares (e.g., auth, error handling)
│       │   ├── utils/       # Utility functions for the backend
│       │   └── index.ts     # Main entry point for the backend server
│       └── ...
│
├── packages/ (NO USE IF THIS DIRECTORY, FEEL FREE to IGNORE IT)
│   ├── ui/               # Shared React UI components used across apps
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared tsconfig.json settings
│
├── package.json          # Root dependencies and workspace configuration
└── turbo.json            # Turborepo pipeline configuration
```

---

## 🗄️ Database Schema Explained

Our database schema is defined using **Prisma**. It outlines the structure of our data, the relationships between different pieces of data, and how it's all organized.

Below is a breakdown of each model in => [prisma/schema.prisma](./apps/backend/prisma/schema.prisma).

### Model Explanations

- **User**: Represents an individual using the platform. Can be a `STUDENT` or `ADMIN`. Stores credentials, profile info, and links to their uploads, bookmarks, etc.

- **Avatar**: Stores the URL and public ID of a user's profile picture, linked to the `User` model. The images are stored in [Cloudinary](https://cloudinary.com) (**I'd Urge you to create account in that and get your own API keys**).

- **ContactUsResponse**: Stores submissions from the "Contact Us" form. (This is an alternative to the email logic on the contactPage, if the company doesn't receives the mail for some reason, so the data will still be secured and can be accessed, coz its being stored in the db in ContactUsResponse.)

  > Go to the [ContactController](./apps/backend/src/controllers/contactControllers.ts) and you'll see there are two controllers, one for sending the contact message to the company's mail, and the other one for sending the message to the database.

- **Academic Structure (Course → Branch → Semester → Subject)**: This hierarchy organizes the academic content.

  - `Course`: The top level (e.g., "B.TECH").
  - `Branch`: A specific discipline within a course (e.g., "CSE").
  - `Semester`: A specific semester within a branch (e.g., Semester 3).
  - `Subject`: A specific subject within a semester (e.g., "Data Structures").

- **Resource**: The core model for study materials. It stores the file itself (via `fileUrl`), its metadata (type, title, size), and its place in the academic structure (linked to a `Subject`). It also tracks who uploaded it (`uploadedBy`) and whether it's `verified`.

- **Bookmark**: A join table that connects a `User` to a `Resource` they have saved for later.

- **Enums (Role, ResourceType)**: These define a set of allowed values for specific fields, ensuring data consistency. `Role` defines user permissions, and `ResourceType` categorizes the study materials.

---

## 🌐 API Endpoints

This section documents the available API endpoints.

### Authentication (`/api/v1/auth/user`) [UserRoutes](./apps/backend/src/routes/userRoutes.ts)

- `POST /signup`: Register a new user.
- `POST /signin`: Log in a user and return a JWT.
- `POST /logout`: Logout a user and session.
- `POST /verify-email`: Verify a user's email using an OTP.
- `POST /send-otp-for-forgot-password`: Send a OTP to mail for resetting password.
- `POST /reset-password`: Reset the password using the OTP.
- `GET /session`: Get the session of the currently loggedIn user.
- `POST /me`: Get the profile of the currently loggedIn user.
- `PUT /update-username`: Update the username of the currently loggedIn user.
- `PUT /update-contact`: Update the contact number of the currently loggedIn user.
- `PUT /direct-otp-verification`: Directly verify OTP (for quick verification without additional prerequisites).

### Google & Github Oauth2 (`/auth`) [OauthRoutes](./apps/backend/src/oauth/main.ts)

- `GET /google`: Google Oauth2 Login
- `GET /google/callback`: Google Oauth2 Callback
- `GET /github`: Github Oauth2 Login
- `GET /github/callback`: Github Oauth2 Callback
- `GET /logout`: Logout (clear authentication token cookie and redirect to homepage).
- `GET /failure`: Handle authentication failure (return error message with 401 status code).

### Avatar (`/api/v1/avatar`) [AvatarRouter](./apps/backend/src/routes/avatarRoutes.ts)

- `POST /upload`: Upload user avatar.
- `GET /get-avatar`: Get user avatar.
- `DELETE /delete-avatar`: Delete user avatar.

### Contact (`/api/v1/contact`) [ContactRouter](./apps/backend/src/routes/contactRoutes.ts)

- `POST /`: Send message to email (submit contact form).
- `POST /to-db`: Send message to database (store contact records).

### Bookmark (`/api/v1/bookmark`) [bookmarkRouter](./apps/backend/src/routes/bookmarkRoutes.ts)

- `POST /`: Add a bookmark (associate with the current resource).
- `DELETE /`: Remove a bookmark (disassociate from the resource).
- `GET /user/:userId`: Get all bookmarks by user ID.

### Course (`/api/v1/course`) [courseRouter](./apps/backend/src/routes/courseRoutes.ts)

- `POST /add`: (Admin) Add a course after request validation.
- `GET /`: (Admin) Get all courses after request validation.

### Branch (`/api/v1/branch`) [branchRouter](./apps/backend/src/routes/branchRoutes.ts)

- `POST /add`: (Admin) Add a branch (e.g., subject branch) after request validation.

### Semester (`/api/v1/semester`) [semesterRouter](./apps/backend/src/routes/semesterRoutes.ts)

- `POST /add`: (Admin) Add a semester after request validation.

### Subject (`/api/v1/subject`) [subjectRouter](./apps/backend/src/routes/subjectRoutes.ts)

- `POST /add`: (Admin) Add a subject after request validation.
- `GET /all`: Get all subjects.

### Resource (`/api/v1/resource`) [resourceRouter](./apps/backend/src/routes/resourceRoutes.ts)

- `POST /add`: (Admin) Add a resource (e.g., study material) after request validation.
- `GET /`: Get all resources by type.

### Search (`/api/v1/search`) [searchRouter](./apps/backend/src/routes/searchRoutes.ts)

- `GET /`: Handle search requests (returns matching results; user authentication will be added later in production).  
- `GET /landing`: Handle landing page search requests (optimized for homepage scenarios; user authentication will be added later in production).  

### GetMyId (`/api/v1/getmyid`) [getMyIdRouter](./apps/backend/src/routes/getMyIdRoutes.ts)

- `GET /branchid`: Get branch ID.
- `GET /semesterid`: Get semester ID.

### SuperAdmin (`/superadmin`) [superAdminRouter](./apps/backend/src/routes/superAdminRoutes.ts)

- `GET /getUsers`: (Super Admin) Get all user information after request validation.

### Data (`/api/v1/db/data`) [dataRouter](./apps/backend/src/routes/dataRoutes.ts)

- `GET /courses`: (Admin) Get all course data.
- `GET /branches/:courseId`: (Admin) Get branch data by course ID.
- `GET /semesters/:branchId`: (Admin) Get semester data by branch ID.
- `GET /subjects/:semesterId`: (Admin) Get subject data by semester ID.

### Root & System (`/`) [Direct Endpoints](./apps/backend/src/index.ts)

- `GET /`: Check if the server is running (returns a welcome message).  
- `GET /users`: Get the total number of registered users (returns `totalUsers` count).  
- `GET /health`: Check server health status (returns `healthy: true` for testing).


## Contributing

We welcome contributions! While we're actively developing and refactoring certain areas, there are plenty of opportunities to contribute effectively.

### 🎯 Focus Areas

We are currently focused on enhancing the user experience and visual polish of the platform. If you're looking for a place to contribute, these are our top priorities:

* 🎨 **UI/UX Enhancement:** We welcome creative ideas to make our UI more modern, interactive, and beautiful. If you have a good eye for design, this is your chance to shine!
* ✨ **Animations & Transitions:** Implementing smooth and delightful animations using `framer-motion`. This includes page transitions, component animations (like cards appearing), and interactive micro-animations.
* 🧭 **Core Component Polish:** Improving the look, feel, and functionality of key components like the Navbar, Sidebar, Footer, and the user Dashboard.
* 📱 **Responsive Design:** This is a top priority! Ensuring every page and component is perfectly responsive across all devices (mobile, tablet, desktop) is crucial for a great student experience.

### ⚠️ Areas to Avoid for Now

To maintain stability and a clear roadmap, please avoid making changes in the following areas without prior discussion:

* 🗄️ **Core Database Schema:** Please **do not** make any changes to the Prisma schema, especially for the core academic structure models (`Course`, `Branch`, `Semester`, `Subject`, `Resource`). The current structure is stable and foundational to the application.
* ⚙️ **Unsolicited Backend Changes:** Please refrain from making significant backend changes unless they are tied to an existing issue that a maintainer has approved. If you have a great idea for the backend, please **first open an issue** to discuss it. We'll give you the green signal if it aligns with our roadmap.

See our [Contributing Guide](CONTRIBUTING.md) for detailed setup instructions, development guidelines, and complete focus area guidance.

**Quick start for contributors:**

- Fork the repo and clone locally
- Follow the setup instructions in [CONTRIBUTING.md](CONTRIBUTING.md)
- Create a separate branch and submit a PR

# Contact the Maintainer & the Mentors

- **Maintainer/Mentor, Founder**: [Shubhashish Chakraborty](https://bento.me/imshubh) **(DM me wherever you want, iam active on X and linkedin, i will answer your queries)**

  - Email: [shubhashish147@gmail.com](mailto:shubhashish@gmail.com)
  - [Twitter/X](https://twitter.com/__Shubhashish__)
  - [LinkedIn](https://www.linkedin.com/in/Shubhashish-Chakraborty)

- **Mentor**: [Unnati Pandit](https://www.linkedin.com/in/unnati-pandit-b83a68285/)
  - Email: [unnati3704@gmail.com](mailto:unnati3704@gmail.com)
  - [LinkedIn](https://www.linkedin.com/in/unnati-pandit-b83a68285/)

- **Mentor**: [Jaydeepsinh Parmar](https://www.linkedin.com/in/jaydeepsinh-parmar-084609247)
  - Email: [parmarjaydeepsinh099@gmail.com](mailto:parmarjaydeepsinh099@gmail.com)
  - [LinkedIn](https://www.linkedin.com/in/jaydeepsinh-parmar-084609247)

## License

[MIT LICENSE](LICENSE)
