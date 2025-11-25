# 🗄️ Supabase Backend Setup Guide

This guide will help you set up the complete Supabase backend for the Learning Platform.

## 📋 What We've Built

### Database Architecture:
- **Users** - User accounts and profiles (XP, level, coins, streak)
- **User Progress** - Tracks lesson completion and scores
- **Learning Paths** - Course structures
- **Chapters & Lessons** - Course content
- **Notifications** - User notifications
- **Achievements** - Unlockable achievements
- **Shop Items & Inventory** - Purchasable items
- **Leaderboard** - Real-time rankings
- **Daily Missions** - Daily challenges

### API Services:
- Authentication (Sign Up, Sign In, Sign Out)
- User Progress Tracking
- Notifications Management
- Leaderboard
- Shop & Inventory
- Learning Paths & Lessons

---

## 🚀 Setup Steps

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Sign in with GitHub (or create account)
4. Create a new organization (if first time)
5. Click **"New project"**
6. Fill in:
   - **Name**: `learning-platform` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for development

7. Click **"Create new project"**
8. Wait 2-3 minutes for setup to complete

---

### 2. Get Your Supabase Credentials

1. Once project is created, go to **Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

4. Copy these values!

---

### 3. Configure Environment Variables

1. Open your `.env` file in the project root
2. Replace the Supabase placeholder values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**⚠️ Important**: Never commit your `.env` file to Git! It's already in `.gitignore`.

---

### 4. Create Database Schema

1. In Supabase dashboard, go to **SQL Editor** (database icon in sidebar)
2. Click **"New query"**
3. Open the file `supabase-schema.sql` in this project
4. **Copy ALL the SQL code** from that file
5. **Paste it** into the Supabase SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. You should see: ✅ **Success. No rows returned**

This creates all tables, indexes, security policies, and sample data!

---

### 5. Enable Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (should be by default)
3. Configure email settings:
   - Go to **Authentication** → **Settings**
   - Scroll to **Auth Providers** → **Email**
   - Enable **"Confirm email"** (recommended for production)
   - For development, you can disable it for faster testing

#### Enable Google OAuth:

1. Go to **Authentication** → **Providers**
2. Find **Google** in the list
3. Click **Enable**
4. You'll need Google OAuth credentials:
   
   **Get Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client ID**
   - Configure consent screen if prompted
   - Application type: **Web application**
   - Add authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - (Copy from Supabase - it shows the exact URL in the Google provider settings)
   - Copy **Client ID** and **Client Secret**

5. Back in Supabase, paste:
   - **Client ID**: Your Google Client ID
   - **Client Secret**: Your Google Client Secret
6. Click **Save**

**Note**: For local development, Google OAuth will redirect to your Supabase URL, then back to your app.

---

### 6. Configure Row Level Security (RLS)

The schema already includes RLS policies, but verify:

1. Go to **Authentication** → **Policies**
2. You should see policies for each table
3. Common policies:
   - Users can read/update their own data
   - Learning content is public (readable by all)
   - Progress is private (user-specific)

---

### 7. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

The environment variables will now be loaded!

---

## 🧪 Testing the Setup

### Test Authentication:

1. Open your app: `http://localhost:5174`
2. Click **"Sign Up"**
3. Fill in:
   - Full Name
   - Email
   - Password (min 6 characters)
   - Confirm Password
4. Select **User** role
5. Click **"Sign Up"**

If successful:
- You'll see a success message
- Check your email for verification (if enabled)
- You can sign in immediately (even without verification)

### Test Data Syncing:

1. Sign in to your account
2. Complete a lesson
3. Check Supabase dashboard:
   - Go to **Table Editor** → **user_progress**
   - You should see your completed lesson!

---

## 📊 View Your Data

In Supabase dashboard, go to **Table Editor**:

- **users** - See all registered users
- **user_progress** - Lesson completion tracking
- **notifications** - User notifications
- **learning_paths** - Available courses
- **leaderboard** (view) - Real-time rankings

---

## 🔒 Security Features

### Implemented:
- ✅ Row Level Security (RLS) on all tables
- ✅ Authentication required for user data
- ✅ Users can only access their own data
- ✅ Public read access for learning content
- ✅ Secure password hashing (automatic)

### Best Practices:
- Never expose your `service_role` key (not used in this app)
- Only use `anon` key in frontend (already configured)
- RLS policies protect data even if client is compromised

---

## 📡 Real-time Features (Optional)

Supabase supports real-time subscriptions! To enable:

1. Go to **Database** → **Replication**
2. Enable replication for tables you want to sync in real-time:
   - `users` - Live XP/level updates
   - `notifications` - Instant notifications
   - `leaderboard` - Live rankings

---

## 🐛 Troubleshooting

### "Supabase not configured" warning in console

- Check `.env` file has correct values
- Restart dev server after changing `.env`
- Values should NOT have quotes: `VITE_SUPABASE_URL=https://xxx.supabase.co`

### SQL errors when running schema

- Make sure you copied ALL the SQL code
- Check if tables already exist (schema is idempotent, safe to re-run)
- Look for specific error message in Supabase dashboard

### Authentication not working

- Check email provider is enabled
- Verify Supabase URL and key are correct
- Check browser console for errors
- Try disabling email confirmation for testing

### Can't see data in tables

- Check RLS policies are created
- Verify you're signed in
- Use SQL Editor to query directly: `SELECT * FROM users;`

---

## 🚀 Next Steps

### Add More Data:

Use SQL Editor to insert:

```sql
-- Add more learning paths
INSERT INTO learning_paths (id, title, description, icon, color, difficulty, total_lessons)
VALUES 
('backend-dev', 'Backend Development', 'Master server-side programming', '⚙️', 'from-blue-500 to-blue-700', 'intermediate', 60),
('database-design', 'Database Design', 'Learn database modeling and SQL', '🗄️', 'from-green-500 to-green-700', 'intermediate', 45);

-- Add chapters
INSERT INTO chapters (id, path_id, chapter_number, title, description)
VALUES 
('node-basics', 'backend-dev', 1, 'Node.js Basics', 'Introduction to server-side JavaScript'),
('sql-fundamentals', 'database-design', 1, 'SQL Fundamentals', 'Master structured query language');
```

### Enable Real-time:

```javascript
// Example: Listen to XP changes
supabase
  .channel('user-xp')
  .on('postgres_changes', 
    { event: 'UPDATE', schema: 'public', table: 'users' },
    (payload) => console.log('XP updated!', payload)
  )
  .subscribe();
```

### Add Cloud Functions:

Supabase supports Edge Functions for custom backend logic!

---

## 📚 Resources

- **Supabase Docs**: https://supabase.com/docs
- **Authentication Guide**: https://supabase.com/docs/guides/auth
- **Database Guide**: https://supabase.com/docs/guides/database
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Database schema executed successfully
- [ ] Environment variables configured in `.env`
- [ ] Dev server restarted
- [ ] Email authentication enabled
- [ ] Test sign up works
- [ ] Test sign in works
- [ ] User data appears in Supabase dashboard
- [ ] Lesson completion syncs to database

---

## 🎉 You're All Set!

Your backend is now fully configured and integrated with the frontend!

Features now working:
- ✅ User registration & authentication
- ✅ Persistent user progress
- ✅ XP and coins tracking
- ✅ Leaderboard rankings
- ✅ Notifications system
- ✅ Shop & inventory

**Happy coding!** 🚀

---

## 💡 Development vs Production

### Current Setup (Development):
- Free tier Supabase
- Email confirmation optional
- Local .env file

### For Production:
1. Upgrade Supabase plan (if needed)
2. Enable email confirmation
3. Add custom domain
4. Set up environment variables in hosting platform (Vercel, Netlify, etc.)
5. Enable additional security features
6. Set up database backups
7. Monitor usage and performance

---

Need help? Check the Supabase Discord or GitHub Discussions!
