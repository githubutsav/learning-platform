-- =============================================
-- LEARNING PLATFORM DATABASE SCHEMA
-- Supabase PostgreSQL Database
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE
-- Stores user accounts and profiles
-- =============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  coins INTEGER DEFAULT 0,
  diamonds INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- USER_INTERESTS TABLE
-- Tracks user's selected learning interests
-- =============================================
CREATE TABLE user_interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interest_id TEXT NOT NULL,
  interest_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, interest_id)
);

-- =============================================
-- LEARNING_PATHS TABLE
-- Available learning paths/courses
-- =============================================
CREATE TABLE learning_paths (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_hours INTEGER,
  total_lessons INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CHAPTERS TABLE
-- Chapters within learning paths
-- =============================================
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  path_id TEXT REFERENCES learning_paths(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(path_id, chapter_number)
);

-- =============================================
-- LESSONS TABLE
-- Individual lessons within chapters
-- =============================================
CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  chapter_id TEXT REFERENCES chapters(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('lesson', 'quiz', 'challenge', 'project')),
  duration INTEGER, -- in minutes
  xp_reward INTEGER DEFAULT 50,
  coin_reward INTEGER DEFAULT 100,
  content JSONB, -- lesson content, code examples, etc.
  quiz_questions JSONB, -- array of quiz questions
  prerequisites TEXT[], -- array of lesson IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(chapter_id, lesson_number)
);

-- =============================================
-- USER_PROGRESS TABLE
-- Tracks user's progress through lessons
-- =============================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
  path_id TEXT REFERENCES learning_paths(id) ON DELETE CASCADE,
  chapter_id TEXT REFERENCES chapters(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  score INTEGER, -- quiz score percentage
  time_spent INTEGER DEFAULT 0, -- in seconds
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- =============================================
-- NOTIFICATIONS TABLE
-- User notifications
-- =============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('achievement', 'xp', 'level', 'mission', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ACHIEVEMENTS TABLE
-- Available achievements
-- =============================================
CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  xp_reward INTEGER DEFAULT 0,
  coin_reward INTEGER DEFAULT 0,
  criteria JSONB, -- achievement unlock criteria
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- USER_ACHIEVEMENTS TABLE
-- Tracks user's unlocked achievements
-- =============================================
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- =============================================
-- SHOP_ITEMS TABLE
-- Available items in shop (avatars, themes, etc.)
-- =============================================
CREATE TABLE shop_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('avatar', 'theme', 'badge', 'powerup')),
  price_coins INTEGER DEFAULT 0,
  price_diamonds INTEGER DEFAULT 0,
  preview_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- USER_INVENTORY TABLE
-- Items owned by users
-- =============================================
CREATE TABLE user_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_id TEXT REFERENCES shop_items(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- =============================================
-- DAILY_MISSIONS TABLE
-- Daily challenges for users
-- =============================================
CREATE TABLE daily_missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_type TEXT NOT NULL,
  mission_title TEXT NOT NULL,
  mission_description TEXT,
  target_count INTEGER NOT NULL,
  current_count INTEGER DEFAULT 0,
  xp_reward INTEGER DEFAULT 50,
  coin_reward INTEGER DEFAULT 100,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- LEADERBOARD VIEW
-- Real-time leaderboard rankings
-- =============================================
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  u.id,
  u.full_name,
  u.avatar_url,
  u.level,
  u.xp,
  u.streak,
  RANK() OVER (ORDER BY u.xp DESC) as rank
FROM users u
WHERE u.role = 'user'
ORDER BY u.xp DESC;

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_xp ON users(xp DESC);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_lessons_chapter_id ON lessons(chapter_id);
CREATE INDEX idx_chapters_path_id ON chapters(path_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS for all tables
-- =============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_missions ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can read their own progress
CREATE POLICY "Users can read own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert/update their own progress
CREATE POLICY "Users can manage own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Learning paths are readable by all authenticated users
CREATE POLICY "Learning paths are public" ON learning_paths
  FOR SELECT TO authenticated USING (true);

-- Chapters are readable by all authenticated users
CREATE POLICY "Chapters are public" ON chapters
  FOR SELECT TO authenticated USING (true);

-- Lessons are readable by all authenticated users
CREATE POLICY "Lessons are public" ON lessons
  FOR SELECT TO authenticated USING (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update user's updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_progress table
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update user level based on XP
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  -- Level calculation (simple: 1000 XP per level)
  NEW.level = FLOOR(NEW.xp / 1000) + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update level when XP changes
CREATE TRIGGER update_level_on_xp_change BEFORE UPDATE OF xp ON users
  FOR EACH ROW EXECUTE FUNCTION update_user_level();

-- =============================================
-- SAMPLE DATA INSERTION
-- =============================================

-- Insert Frontend Web Development Path
INSERT INTO learning_paths (id, title, description, icon, color, difficulty, estimated_hours, total_lessons)
VALUES (
  'frontend-web-dev',
  'Frontend Web Development',
  'Master HTML, CSS, JavaScript, and modern frameworks to build stunning web applications',
  '🎨',
  'from-purple-500 to-purple-700',
  'beginner',
  120,
  85
) ON CONFLICT (id) DO NOTHING;

-- Insert Chapter 1: HTML Fundamentals
INSERT INTO chapters (id, path_id, chapter_number, title, description)
VALUES (
  'html-fundamentals',
  'frontend-web-dev',
  1,
  'Chapter 1: HTML Fundamentals',
  'Learn the building blocks of web pages with HTML'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
DO $$ 
BEGIN 
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Configure your Supabase project URL and anon key in .env';
  RAISE NOTICE '2. Run this SQL in your Supabase SQL Editor';
  RAISE NOTICE '3. Enable Email Auth in Supabase Authentication settings';
END $$;
