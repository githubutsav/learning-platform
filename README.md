# Learning Platform

A modern, gamified learning platform built with React, Vite, and Supabase. Features include interactive lessons, progress tracking, achievements, and a dynamic leaderboard.

![Learning Platform](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

## ✨ Features

- 🎮 **Gamified Learning** - Earn XP, coins, and level up as you learn
- 📚 **Interactive Lessons** - Complete lessons with quizzes and challenges
- 🏆 **Achievements System** - Unlock achievements and track your progress
- 📊 **Progress Dashboard** - Real-time stats and weekly analytics
- 🔥 **Streak Tracking** - Maintain daily learning streaks
- 🛍️ **Avatar Shop** - Customize your profile with coins you earn
- 👥 **Leaderboard** - Compete with other learners
- ⚔️ **Daily Quests** - Complete daily missions for rewards
- 🤖 **AI Chatbot** - Get help with Google's Gemini AI

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email + Google OAuth)
- **AI**: Google Gemini API

## 📋 Prerequisites

- Node.js 16+ and npm
- Supabase account ([supabase.com](https://supabase.com))
- Google OAuth credentials (optional, for Google sign-in)
- Google Gemini API key (optional, for chatbot)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Supabase database**
   
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL schema from `supabase-schema.sql`
   - Configure RLS policies (see `FIX_RLS_POLICIES.md`)

5. **Configure Google OAuth** (Optional)
   
   Follow the instructions in `GOOGLE_OAUTH_SETUP.md`

## 🎯 Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
```

## 🚀 Deploying to Vercel

### Method 1: Via Vercel Dashboard (Easiest)

1. Push code to GitHub (see instructions below)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
7. Click "Deploy"

### Method 2: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## 📁 Project Structure

```
learning-platform/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── data/          # Mock data and constants
│   ├── lib/           # API and utility functions
│   ├── utils/         # Helper functions
│   └── App.jsx        # Main app component
├── .env               # Environment variables (not committed)
├── supabase-schema.sql # Database schema
└── vercel.json        # Vercel configuration
```

## 🔧 Key Files

- `src/lib/api.js` - Supabase API functions (progress, stats, etc.)
- `src/lib/auth.js` - Authentication functions
- `src/lib/supabase.js` - Supabase client configuration
- `supabase-schema.sql` - Complete database schema
- `FIX_RLS_POLICIES.md` - RLS policy troubleshooting
- `GOOGLE_OAUTH_SETUP.md` - OAuth configuration guide

## 🐛 Troubleshooting

### Authentication Issues
- See `AUTH_DEBUGGING.md`
- See `FIX_RLS_POLICIES.md`

### Session Not Persisting
- Clear browser cache
- Check environment variables
- Verify Supabase URL in `.env`

### Deployment Issues
- Ensure all environment variables are set in Vercel
- Check build logs for errors
- Verify `vercel.json` configuration

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📄 License

MIT License

---

Made with ❤️ by Utsav Singh
