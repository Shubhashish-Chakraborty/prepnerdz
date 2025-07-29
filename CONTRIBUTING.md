# Contributing to Prepnerdz 🤝

First off, thank you for considering contributing to Prepnerdz! We're excited to have you join our community. Every contribution, no matter how small, helps us build the best academic resource platform for students.

This guide will walk you through the entire contribution process, from setting up your local environment to submitting a polished pull request.

> **New to Open Source?** No problem! This guide is designed to be beginner-friendly. If you get stuck, don't hesitate to open an issue or ask for help.

## Table of Contents

1.  [Code of Conduct](#-code-of-conduct)
2.  [How Can I Contribute?](#-how-can-i-contribute)
3.  [Getting Started: Your First Contribution](#-getting-started-your-first-contribution)
    - [Step 1: System Prerequisites](#step-1-system-prerequisites)
    - [Step 2: Fork & Clone the Repository](#step-2-fork--clone-the-repository)
    - [Step 3: Create a New Branch](#step-3-create-a-new-branch)
    - [Step 4: Set Up the Local Environment](#step-4-set-up-the-local-environment)
4.  [Making Your Changes](#-making-your-changes)
5.  [Submitting a Pull Request (PR)](#-submitting-a-pull-request-pr)
6.  [Contribution Focus Areas](#-contribution-focus-areas)
7.  [Community and Communication](#-community-and-communication)

---

## 📜 Code of Conduct

Before you begin, please read our [**Code of Conduct**](./CODE_OF_CONDUCT.md). We enforce this code to ensure our community is a welcoming, inclusive, and respectful environment for everyone.

---

## 🤔 How Can I Contribute?

There are many ways to contribute to Prepnerdz:

- **Reporting Bugs**: Find a bug? Open an issue and describe it with as much detail as possible.
- **Suggesting Enhancements**: Have an idea for a new feature? Open an issue to discuss it.
- **Writing Code**: Fix a bug or implement a new feature.
- **Improving Documentation**: Help us make our guides clearer and more comprehensive.
- **Answering Questions**: Help other community members in discussions or by triaging issues.

---

## 🚀 Getting Started: Your First Contribution

Ready to write some code? Follow these steps carefully to set up your local development environment.

### Step 1: System Prerequisites

Ensure you have the following software installed on your machine:

- **Node.js**: v18.x or higher is recommended.
- **npm** or **yarn**: The project uses npm by default.
- **Git**: For version control.
- **PostgreSQL**: A local or cloud-based ([NEON](https://neon.tech)) PostgreSQL database (v15+ recommended).

### Step 2: Fork & Clone the Repository

1.  **Fork the repository**: Click the "Fork" button on the top-right of the [Prepnerdz GitHub page](https://github.com/Shubhashish-Chakraborty/prepnerdz). This creates a copy of the project under your own GitHub account.

2.  **Clone your fork**: On your local machine, run the following command, replacing `your-github-username` with your actual username.

    ```bash
    git clone https://github.com/your-github-username/prepnerdz.git
    cd prepnerdz
    ```

### Step 3: Create a New Branch

**This is a mandatory step.** All contributions must be made on a separate branch, not on `main`. Pull requests made from the `main` branch will be closed.

Create a new branch with a descriptive name.

- For features: `git checkout -b feat/your-feature-name` (e.g., `feat/add-dark-mode`)
- For bug fixes: `git checkout -b fix/your-bug-fix` (e.g., `fix/login-button-bug`)

```bash
# Example:
git checkout -b feat/add-resource-search-bar
```

### Step 4: Set Up the Local Environment

1.  **Install Dependencies**: From the root directory of the project, install all the necessary packages.

    ```bash
    npm install
    ```

2.  **Set Up Environment Variables (`.env`)**: You need to create a `.env` file for each application (`web`, `backend`, `admin`). Sample files are provided.

    - Navigate to each app's directory and copy the `.env.sample` file to a new `.env` file.
    - **For the backend (`apps/backend`):**
      ```bash
      cd apps/backend
      cp .env.sample .env
      ```
    - **Open `apps/backend/.env`** and fill in the required values, especially your `DATABASE_URL`.

    Repeat this process for `apps/web` and `apps/admin`.

3.  **Run the Project**: Start all applications in development mode. Run this command from the **root directory**.
    ```bash
    npm run dev
    ```
    This command uses Turborepo to start the frontend, backend, and admin panel simultaneously. You're now ready to code!

---

## 💻 Making Your Changes

- **Follow the Code Style**: Please adhere to the existing code style and conventions used throughout the project. We use ESLint and Prettier to maintain consistency.
- **Write Clear Commit Messages**: Use a conventional commit style (e.g., `feat:`, `fix:`, `docs:`, `refactor:`). This helps us understand your changes at a glance.
  - Good: `feat: Implement user password reset flow`
  - Bad: `updated files`

---

## ✅ Submitting a Pull Request (PR)

Once your changes are ready, it's time to submit them for review.

1.  **Push Your Branch**: Push your new branch to your forked repository.

    ```bash
    # Example:
    git push origin feat/add-resource-search-bar
    ```

2.  **Create the Pull Request**: Go to your fork on GitHub. You should see a prompt to "Compare & pull request". Click it.

3.  **Write a Detailed PR Description**:

    - Clearly describe the problem you are solving and the changes you have made.
    - Link to the issue your PR is resolving (e.g., "Closes #123").
    - **Add Screenshots/Screen Recordings**: This is crucial! Visuals help reviewers understand your changes much faster. **Screen recordings are highly encouraged for UI/UX changes.**

4.  **Communicate**: Be responsive to feedback and comments on your PR. Further changes may be requested before it can be merged.

---

## 🎯 Contribution Focus Areas

We are actively developing and refactoring certain areas. To make your contribution effective, please check our current focus areas.

### 🎯 Focus Areas

We are currently focused on enhancing the user experience and visual polish of the platform. If you're looking for a place to contribute, these are our top priorities:

- 🎨 **UI/UX Enhancement:** We welcome creative ideas to make our UI more modern, interactive, and beautiful. If you have a good eye for design, this is your chance to shine!
- ✨ **Animations & Transitions:** Implementing smooth and delightful animations using `framer-motion`. This includes page transitions, component animations (like cards appearing), and interactive micro-animations.
- 🧭 **Core Component Polish:** Improving the look, feel, and functionality of key components like the Navbar, Sidebar, Footer, and the user Dashboard.
- 📱 **Responsive Design:** This is a top priority! Ensuring every page and component is perfectly responsive across all devices (mobile, tablet, desktop) is crucial for a great student experience.

### ⚠️ Areas to Avoid for Now

To maintain stability and a clear roadmap, please avoid making changes in the following areas without prior discussion:

- 🗄️ **Core Database Schema:** Please **do not** make any changes to the Prisma schema, especially for the core academic structure models (`Course`, `Branch`, `Semester`, `Subject`, `Resource`). The current structure is stable and foundational to the application.
- ⚙️ **Unsolicited Backend Changes:** Please refrain from making significant backend changes unless they are tied to an existing issue that a maintainer has approved. If you have a great idea for the backend, please **first open an issue** to discuss it. We'll give you the green signal if it aligns with our roadmap.

---

## ❤️ Community and Communication

- **Be Respectful and Inclusive**: Our community is our greatest asset. Please follow our **[Code of Conduct](./CODE_OF_CONDUCT.md)** in all interactions.
- **Help Others**: If you see someone struggling with a question in an issue or discussion, feel free to help them out!

Thank you again for your interest in contributing. We can't wait to see what you build!
