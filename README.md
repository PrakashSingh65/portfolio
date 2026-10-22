# 🚀 Modern Developer Portfolio & AI Assistant

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-000000?style=for-the-badge&logo=pinecone)](https://www.pinecone.io/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-LangChain-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

A high-performance, full-stack personal portfolio and content management system built with **Next.js 16 (App Router & Turbopack)**, **TypeScript**, **Tailwind CSS v4**, and **MongoDB**. Features an integrated **RAG-powered AI chatbot assistant** trained on portfolio knowledge, a live **GitHub contribution activity graph**, dynamic **blog authoring**, and a secured **admin dashboard**.

---

## ✨ Features

- ⚡ **High Performance & Modern Stack**: Built with Next.js 16 (Turbopack), React 19, and Tailwind CSS v4 with full Dark / Light mode theming (`next-themes`).
- 🤖 **Interactive AI Portfolio Chatbot**: Real-time floating AI assistant powered by **LangChain**, **Google Gemini**, and **Pinecone vector database** answering visitor inquiries about skills, experience, and projects.
- 📊 **Live GitHub Activity Graph**: Dynamic contribution heatmap calendar integrated via GitHub's GraphQL API (`/api/github`) with theme-adaptive colors and hover tooltips.
- 💼 **Showcase & Filterable Projects**: Interactive project cards showcasing live demos, source repositories, tech stacks, and individual detailed project view pages.
- 📝 **Markdown-Powered Tech Blog**: Full-featured blog engine supporting rich markdown rendering, code syntax highlighting, and SEO optimization.
- 🎓 **Verified Certificates & Credentials**: Dedicated gallery to display certifications with full-resolution previews.
- 🛠️ **Full CRUD Admin Control Panel (`/admin-panel`)**: Secured with NextAuth.js credentials authentication to manage Intro, About, Skills, Projects, Certificates, and Blogs directly from the web interface.
- 🧠 **Vector Ingestion Pipeline (`/api/ingest`)**: Automatic document chunking and embedding pipeline to keep the AI chatbot's Pinecone knowledge base synchronized.
- 🔍 **SEO & Accessibility**: Complete JSON-LD schema (`Person`), OpenGraph tags, dynamic sitemap (`sitemap.xml`), robots.txt, and keyboard navigation.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack), [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), `next-themes` |
| **Animations & Effects** | [Framer Motion](https://www.framer.com/motion/), [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/), Typewriter Effect |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas), [Mongoose](https://mongoosejs.com/) |
| **Vector Database & AI** | [Pinecone](https://www.pinecone.io/), [Google Gemini AI](https://ai.google.dev/), [LangChain](https://js.langchain.com/), [Hugging Face](https://huggingface.co/) |
| **Data Visualization** | `react-activity-calendar` (GitHub Contributions) |
| **Media Management** | [Cloudinary](https://cloudinary.com/), `next-cloudinary` |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) (Credentials Provider) |
| **Markdown Editing** | `@uiw/react-md-editor`, `react-markdown` |

---

## 📁 Project Structure

```text
portfolio/
├── app/
│   ├── (admin)/                # Protected Admin Panel
│   │   ├── admin-panel/        # About, Blog, Certificate, Intro, Projects, Skills
│   │   │   └── login/          # Admin authentication page
│   │   └── layout.tsx
│   ├── (main)/                 # Public Portfolio Pages
│   │   ├── about/              # About Me page
│   │   ├── activity/           # Activity alias page
│   │   ├── blog/               # Blog listing & dynamic [id] view
│   │   ├── certificate/        # Certificate gallery & details
│   │   ├── contact/            # Contact form page
│   │   ├── github/             # Dedicated GitHub Activity calendar page
│   │   ├── intro/              # Hero & intro section
│   │   ├── projects/           # Projects list & detailed views
│   │   ├── resume/             # Career journey & resume view
│   │   ├── skill/              # Categorized skills matrix
│   │   ├── layout.tsx          # Main layout with Header, Footer & Chat Widget
│   │   └── page.tsx            # Single-page home feed
│   ├── api/                    # REST & GraphQL API Endpoints
│   │   ├── about/              # CRUD for about data
│   │   ├── auth/[...nextauth]/ # NextAuth authentication handler
│   │   ├── blog/               # CRUD for blog posts
│   │   ├── certificate/        # CRUD for certificates
│   │   ├── chat/               # LangChain + Gemini + Pinecone RAG chat route
│   │   ├── github/             # GitHub GraphQL contributions proxy
│   │   ├── ingest/             # Knowledge ingestion into Pinecone vector index
│   │   ├── intro/              # CRUD for intro headline & assets
│   │   ├── project/            # CRUD for portfolio projects
│   │   └── skill/              # CRUD for technical skills
│   ├── globals.css             # Tailwind v4 theme definitions
│   ├── layout.tsx              # Root HTML layout with SEO metadata & JSON-LD
│   ├── robots.ts               # Search engine indexing rules
│   └── sitemap.ts              # Dynamic sitemap generator
├── components/                 # Reusable UI & Business Components
│   ├── home/
│   │   └── GithubActivity.tsx  # GitHub Heatmap Component
│   ├── ui/                     # shadcn/ui primitive components
│   ├── AdminSideBar.tsx        # Dashboard navigation
│   ├── GlobalChatWidget.tsx    # Floating AI chatbot drawer
│   ├── Header.tsx              # Sticky navigation bar with ThemeToggle
│   ├── Footer.tsx              # Site footer and social links
│   ├── ThemeToggle.tsx         # Dark / Light theme switcher
│   └── ...
├── models/                     # Mongoose Schemas & TypeScript Models
├── lib/                        # Database connections, data access, and utilities
└── public/                     # Static assets, icons, and logos
```

---

## ⚙️ Environment Variables

Create a `.env` (or `.env.local`) file in the root directory by referencing the configuration below:

```env
# MongoDB Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/PORTFOLIO?retryWrites=true&w=majority"

# NextAuth Configuration
NEXTAUTH_SECRET="your-generated-jwt-secret-key-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# AI / LLM APIs
GEMINI_API_KEY="your-gemini-api-key"
HUGGINGFACE_API_KEY="your-huggingface-api-key"

# Pinecone Vector Database
PINECONE_API_KEY="your-pinecone-api-key"
PINECONE_INDEX_NAME="portfolio-index"

# GitHub Activity Integration
GITHUB_TOKEN="ghp_your_personal_access_token_or_fine_grained_pat"
GITHUB_USERNAME="PrakashSingh65"

# Optional Email Notification Service
# RESEND_API_KEY="re_123456789"
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have installed:
- **Node.js**: `v20.x` or higher
- **npm**, **pnpm**, or **yarn**
- **MongoDB Atlas** database account
- **Pinecone** account (for AI Chat RAG)

### 2. Clone the Repository
```bash
git clone https://github.com/PrakashSingh65/portfolio.git
cd portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment
Copy `.env.example` to `.env` and fill in the required API keys and connection strings:
```bash
cp .env.example .env
```

### 5. Seed / Ingest AI Knowledge Base (Optional)
If you want to train the AI assistant with your portfolio profile information:
```bash
curl -X POST http://localhost:3000/api/ingest
```

### 6. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 GitHub Contribution Activity Setup

The portfolio displays your live GitHub contribution calendar using GitHub's GraphQL API:

1. Generate a **GitHub Personal Access Token (Classic)** on GitHub via **Settings** ➔ **Developer settings** ➔ **Personal access tokens** ➔ **Tokens (classic)** with the `read:user` scope.
2. Add your token and username to `.env`:
   ```env
   GITHUB_TOKEN=ghp_your_token_here
   GITHUB_USERNAME=your_github_username
   ```
3. The calendar will automatically query `https://api.github.com/graphql` via the `/api/github` internal route and render on the home page as well as `/github`.

---

## 🔒 Admin Panel Access

The portfolio includes a protected administration panel to create, update, and delete entries:

- **Route**: `http://localhost:3000/admin-panel`
- **Features**:
  - Update Hero Intro & Profile Picture
  - Edit "About Me" description
  - Add & categorize technical skills (Frontend, Backend, Database, Tools)
  - Publish projects with live URLs, GitHub repos, and tech tags
  - Upload certificates and credentials
  - Write and publish Markdown blog articles

---

## 📦 Build & Deployment

To generate an optimized production build:

```bash
npm run build
npm run start
```

### Deploying on Vercel
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set all environment variables from your `.env` in the Vercel Project Settings.
4. Deploy!

---

## 👨‍💻 Author

**Prakash Singh**  
- **Portfolio**: [https://prakash-singh.vercel.app](https://prakash-singh.vercel.app)  
- **GitHub**: [@PrakashSingh65](https://github.com/PrakashSingh65)  
- **LinkedIn**: [prakash-singh-rajput](https://www.linkedin.com/in/prakash-singh-rajput-a89a15243/)  
- **X (Twitter)**: [@Prakash89795230](https://x.com/Prakash89795230)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
