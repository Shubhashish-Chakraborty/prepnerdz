<h1 align="center">
    PrepNerdz📚
</h1>

<div align="center">
    <img src="https://github.com/user-attachments/assets/0f1fdfb2-e473-4a1f-9efb-618dc4f382c9" width="280" style="border-radius: 10px; margin: 10px;" />
</div>

### The ultimate academic resource platform for BTECH students - where finding study materials stops being a struggle!

<p align="center">
  <a href="./LEARN.md"><strong>Explore the Project Internals »</strong></a>
  <br />
  <br />
  <a href="https://github.com/Shubhashish-Chakraborty/prepnerdz/issues">Report Bug</a>
  ·
  <a href="https://github.com/Shubhashish-Chakraborty/prepnerdz/issues">Request Feature</a>
</p>

---

Welcome! This is the central hub for Prepnerdz. For a deep dive into the project's architecture, setup, and contribution guidelines, please see our dedicated documentation:

- **[📖 LEARN.md](./LEARN.md)**: Understand the project structure, database schema, and API.
- **[🤝 CONTRIBUTING.md](./CONTRIBUTING.md)**: Our main guide for contributors, with detailed setup and development instructions.
- **[📜 CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)**: Our community standards.

---

## 🌟 Features

- **Centralized Resources**: Previous year papers (RGPV), Best notes, lab manuals etc.., all in one place
- **Verified Content**: Faculty and topper-approved materials
- **Bookmarking**: Save important resources for quick access
- **Contribution System**: Earn recognition for contributing useful content

## 🛠 Tech Stack

| Frontend     | Backend    | Database   |
| ------------ | ---------- | ---------- |
| Next.js (TS) | Node.js    | PostgreSQL |
| Tailwind CSS | Express.js | Prisma ORM |

## 🚀 Getting Started locally on your machine!

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v15+)
- Google Cloud account (for Drive API)
- Cloudinary APIs (for avatar/image uploads)

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/Shubhashish-Chakraborty/prepnerdz.git](https://github.com/Shubhashish-Chakraborty/prepnerdz.git)
    cd prepnerdz
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

    > PrepNerdz Frontend: `/apps/web` <br/>
    > Backend : `/apps/backend` <br/>
    > Admin Panel: `/apps/admin`

3.  **Set up environment variables**

    Create a `.env` file in the respective directories:

    - For frontend : [`ENV SAMPLE`](./apps/web/.env.sample)
    - For Backend : [`ENV SAMPLE`](./apps/backend/.env.sample)
    - For Admin : [`ENV SAMPLE`](./apps/admin/.env.sample)

4.  **Run the application**

    - In the Root directory, run the following command:
      ```bash
      npm run dev
      ```
    - If you want to run Individual apps:
      - In the Frontend directory, run: `npm run dev`
      - In the Backend directory, run: `npm run dev`
      - In the Admin directory, run: `npm run dev`

---

## 🤝 How to Contribute

We welcome contributions from the community! Please see our comprehensive **[Contributing Guide](CONTRIBUTING.md)** for detailed instructions.

**Quick Summary:**

1.  Fork the repository & clone your forked repository.
2.  Submit an issue or feature request.
3.  Create a **new & separate branch** for your feature or bug fix.
4.  Make your changes.
5.  Commit your changes with a clear and descriptive commit message.
6.  Push your changes to **your forked repository**.
7.  Create a pull request to the main repository.
8.  Wait for your pull request to be reviewed and merged.
9.  Your contribution is now part of PrepNerdz!

> Finally you'll get a shoutout on [LinkedIn](https://linkedin.com/in/Shubhashish-Chakraborty) and [X (Twitter)](https://x.com/__Shubhashish__)!

## 📜 License

MIT License - See [LICENSE](./LICENSE) for details.

### 🙏 Acknowledgments

> Inspired by the struggles of college students everywhere <br />
> Built with ❤️ for the academic community
