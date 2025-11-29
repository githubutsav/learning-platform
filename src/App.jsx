import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { celebrateLevelUp, celebrateXPGain, celebrateCoinCollection, celebrateQuestComplete } from './utils/animations';

// Data Imports
import { LEVELS, AVATARS, QUESTS, MOCK_LESSON, DAILY_MISSIONS, FEATURED_LESSONS, WEEKLY_STATS, LEADERBOARD_DATA, LEARNING_PATHS, CS_INTERESTS } from './data/mockData';

// Component Imports
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import QuestMap from './components/QuestMap';
import Shop from './components/Shop';
import LessonOverlay from './components/LessonOverlay';
import TeacherDashboard from './components/TeacherDashboard';
import ClassRank from './components/ClassRank';
import Dashboard from './components/Dashboard';
import GoalsPlanner from './components/GoalsPlanner';
import ChatBot from './components/ChatBot';

export default function App() {
  // Navigation State
  const [phase, setPhase] = useState('app'); // Skip login, go directly to app
  const [view, setView] = useState('dashboard');
  const [activeLesson, setActiveLesson] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set()); // Track completed lesson IDs
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  
  // Stats State
  const [weeklyStats, setWeeklyStats] = useState({
    lessonsCompleted: 0,
    timeSpent: 0,
    accuracy: 0,
    xpGained: 0
  });
  
  // User State
  const [role, setRole] = useState('user');
  const [user, setUser] = useState({
    id: null, // Supabase user ID
    name: "Alex Morgan",
    email: "alex.morgan@student.edu",
    role: "user",
    xp: 850,
    level: 1,
    diamonds: 144,
    coins: 2321,
    streak: 12,
    avatar: AVATARS[0].src,
    inventory: ['alex'],
    interests: [],
    stats: { completed: 56, lessons: { current: 21, total: 23 }, hours: { current: 120, total: 111 } }
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You completed your first lesson in Frontend Web Development! 🎉',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
      read: false
    },
    {
      id: 2,
      type: 'xp',
      title: 'XP Gained',
      message: 'You earned 100 XP for completing "HTML Document Structure"',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
      read: false
    },
    {
      id: 3,
      type: 'level',
      title: 'Level Up!',
      message: 'Congratulations! You reached Level 1 - Novice Learner',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true
    },
    {
      id: 4,
      type: 'mission',
      title: 'Daily Mission Available',
      message: 'Complete 3 lessons today to earn bonus rewards',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true
    }
  ]);

  // Derived State
  const levelInfo = LEVELS[user.level] || LEVELS[3];

  // No auth - skip session checks completely
  useEffect(() => {
    // App starts directly in dashboard - no authentication needed
  }, []);

  // Handlers
  const handleLogin = async (selectedRole, userData = {}) => {
    setRole(selectedRole);
    
    // Update user with complete data from Supabase
    if (userData) {
      setUser({
        id: userData.id, // Store Supabase user ID
        name: userData.full_name || userData.fullName || 'User',
        role: selectedRole,
        email: userData.email,
        xp: userData.xp || 0,
        level: userData.level || 1,
        diamonds: userData.diamonds || 0,
        coins: userData.coins || 500,
        streak: userData.streak || 0,
        avatar: userData.avatar_url || AVATARS[0].src,
        inventory: ['alex'], // TODO: Load from user_inventory
        interests: [],
        stats: { completed: 0, lessons: { current: 0, total: 0 }, hours: { current: 0, total: 0 } }
      });

      // Load user's completed lessons and stats
      if (userData.id) {
        const progressResult = await getCompletedLessons(userData.id);
        if (progressResult.success) {
          const completedIds = new Set(progressResult.lessons.map(l => l.lesson_id));
          setCompletedLessons(completedIds);
        }
        
        // Load weekly stats
        const statsResult = await getWeeklyStats(userData.id);
        if (statsResult.success) {
          setWeeklyStats(statsResult.stats);
        }
      }
    }
    
    if (selectedRole === 'user') setPhase('selection');
    else setPhase('app');
  };

  const handleClassSelect = (interests) => {
    setUser(prev => ({ ...prev, interests }));
    setPhase('app');
  };

  const handleStartLesson = (node) => {
    // Set the node with its id, title, and type for LessonOverlay to use
    setActiveLesson({
      id: node.id,
      title: node.title,
      type: node.type,
      questions: MOCK_LESSON.questions // Fallback questions for nodes without content
    });
  };

  const handleCompleteLesson = async (xpReward, coinReward) => {
    // Mark current lesson as completed
    if (activeLesson) {
      setCompletedLessons(prev => new Set([...prev, activeLesson.id]));
      
      // Calculate new XP and level
      const newXp = user.xp + xpReward;
      const newCoins = user.coins + coinReward;
      let newLevel = user.level;
      
      if (newXp >= LEVELS[user.level].max && LEVELS[user.level + 1]) {
        newLevel++;
      }
      
      // Save to Supabase if user is logged in
      if (user.id) {
        try {
          // Save lesson completion
          await completeLesson(
            user.id,
            activeLesson.id,
            'frontend', // TODO: Get actual path ID from context
            activeLesson.chapterId || 'chapter1', // TODO: Get actual chapter ID
            100, // Score (percentage)
            0 // Time spent (seconds) - TODO: track actual time
          );
          
          // Update user rewards in database
          await updateUserRewards(user.id, xpReward, coinReward);
          
          // If level up, update level in database too
          if (newLevel !== user.level) {
            const { supabase } = await import('./lib/supabase');
            await supabase
              .from('users')
              .update({ level: newLevel })
              .eq('id', user.id);
          }
          
          // Reload weekly stats
          const statsResult = await getWeeklyStats(user.id);
          if (statsResult.success) {
            setWeeklyStats(statsResult.stats);
          }
        } catch (error) {
          console.error('Failed to save progress to Supabase:', error);
        }
      }
      
      // Add notification for XP gain
      addNotification('xp', 'XP Gained', `You earned ${xpReward} XP for completing "${activeLesson.title}"!`);
      
      // Update local state
      setUser(prev => ({
        ...prev,
        xp: newXp,
        coins: newCoins,
        level: newLevel
      }));
      
      // Celebrations
      setActiveLesson(null);
      celebrateQuestComplete();
      setTimeout(() => celebrateXPGain(), 300);
      setTimeout(() => celebrateCoinCollection(coinReward), 600);
      
      if (newLevel !== user.level) {
        setTimeout(() => {
          celebrateLevelUp();
          alert("LEVEL UP! You are now a " + LEVELS[newLevel].title);
          addNotification('level', 'Level Up!', `Congratulations! You reached Level ${newLevel} - ${LEVELS[newLevel].title}`);
        }, 1000);
      }
    }
  };

  const handleBuyItem = async (item) => {
    if (user.coins >= item.cost && user.id) {
      const newCoins = user.coins - item.cost;
      
      try {
        // Update coins in database
        const { supabase } = await import('./lib/supabase');
        await supabase
          .from('users')
          .update({ coins: newCoins })
          .eq('id', user.id);
        
        // Add to inventory in database
        await supabase
          .from('user_inventory')
          .insert([{
            user_id: user.id,
            item_id: item.id
          }]);
        
        // Update local state
        setUser(prev => ({
          ...prev,
          coins: newCoins,
          inventory: [...prev.inventory, item.id],
          avatar: item.src // Auto-equip
        }));
        
        alert(`Equipped ${item.name}!`);
      } catch (error) {
        console.error('Failed to purchase item:', error);
        alert('Failed to purchase item. Please try again.');
      }
    }
  };

  // Notification Handlers
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (type, title, message) => {
    const newNotif = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Profile Handlers
  const handleSelectAvatar = (avatarSrc) => {
    setUser(prev => ({ ...prev, avatar: avatarSrc }));
  };

  const handleUpdateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const handleLogout = async () => {
    // Sign out from Supabase
    await signOut();
    
    // Reset all state
    setShowProfileModal(false);
    setPhase('login');
    setView('dashboard');
    setActiveLesson(null);
    setSelectedPath(null);
    setCompletedLessons(new Set());
    setIsChatBotOpen(false);
    setUser({
      id: null,
      name: "Alex Morgan",
      email: "alex.morgan@student.edu",
      role: "user",
      xp: 850,
      level: 1,
      diamonds: 144,
      coins: 2321,
      streak: 12,
      avatar: AVATARS[0].src,
      inventory: ['alex'],
      interests: [],
      stats: { completed: 56, lessons: { current: 21, total: 23 }, hours: { current: 120, total: 111 } }
    });
    setRole('user');
    // Reset notifications
    setNotifications([]);
  };

  // --- RENDERING ---
  // Skip login and class selection - go directly to dashboard

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* Lesson Overlay */}
      {activeLesson && (
        <LessonOverlay 
          lesson={activeLesson} 
          onClose={() => setActiveLesson(null)} 
          onComplete={handleCompleteLesson} 
        />
      )}

      {/* Sidebar */}
      <Sidebar view={view} setView={setView} role={role} />

      <div className="flex-1 ml-24 p-8">
        <Header 
          user={role === 'user' ? user : null} 
          role={role} 
          levelInfo={levelInfo}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onClearAllNotifications={handleClearAllNotifications}
          avatars={AVATARS}
          onSelectAvatar={handleSelectAvatar}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
        />

        {/* USER VIEW */}
        {role === 'user' && (
          <>
            {view === 'dashboard' && (
              <Dashboard 
                user={user}
                weeklyStats={weeklyStats}
                dailyMissions={DAILY_MISSIONS}
                featuredLessons={FEATURED_LESSONS}
                leaderboardData={LEADERBOARD_DATA}
                onViewLeaderboard={() => setView('achievements')}
              />
            )}
            {view === 'learning-path' && (
              <div className="max-w-7xl mx-auto">
                {!selectedPath ? (
                  // Learning Path Selection
                  <div className="space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-12"
                    >
                      <h1 className="text-5xl font-black text-white mb-4">Choose Your Learning Path</h1>
                      <p className="text-xl text-slate-400">Select a subject to begin your journey</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {LEARNING_PATHS.map((path, index) => (
                        <motion.div 
                          key={path.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03, y: -5 }}
                          className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-2 border-slate-700/50 hover:border-purple-500/50 transition-all cursor-pointer group overflow-hidden"
                          onClick={() => setSelectedPath(path)}
                          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="relative z-10 flex items-start gap-6">
                            <motion.div 
                              className={`w-20 h-20 bg-gradient-to-br ${path.color === 'bg-purple-100' ? 'from-purple-500 to-purple-700' : path.color === 'bg-blue-100' ? 'from-blue-500 to-blue-700' : path.color === 'bg-green-100' ? 'from-green-500 to-green-700' : 'from-orange-500 to-orange-700'} rounded-2xl flex items-center justify-center text-4xl shadow-xl`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}
                            >
                              {path.icon}
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-white mb-2">{path.title}</h3>
                              <p className="text-slate-400 mb-4">{path.description}</p>
                              
                              <div className="space-y-3">
                                {/* Progress Bar */}
                                <div>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400 font-medium">Progress</span>
                                    <span className="font-bold text-purple-400">{path.completedLessons}/{path.totalLessons} lessons</span>
                                  </div>
                                  <div className="relative w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                                    <motion.div 
                                      className={`h-3 rounded-full bg-gradient-to-r ${path.color === 'bg-purple-100' ? 'from-purple-500 to-purple-600' : path.color === 'bg-blue-100' ? 'from-blue-500 to-blue-600' : path.color === 'bg-green-100' ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600'}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${path.progress}%` }}
                                      transition={{ duration: 1, delay: index * 0.2 }}
                                      style={{ boxShadow: '0 0 10px currentColor' }}
                                    />
                                  </div>
                                </div>
                                
                                {/* Details */}
                                <div className="flex gap-3 text-sm">
                                  <span className="px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-full font-medium">{path.difficulty}</span>
                                  <span className="px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-full font-medium">{path.estimatedTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Individual Learning Path
                  <div className="space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-2 border-purple-500/30"
                      style={{ boxShadow: '0 0 40px rgba(147, 51, 234, 0.25)' }}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <motion.button 
                            onClick={() => setSelectedPath(null)}
                            whileHover={{ scale: 1.05, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors text-white font-semibold"
                          >
                            ← Back
                          </motion.button>
                          <motion.div 
                            className={`w-16 h-16 bg-gradient-to-br ${selectedPath.color === 'bg-purple-100' ? 'from-purple-500 to-purple-700' : selectedPath.color === 'bg-blue-100' ? 'from-blue-500 to-blue-700' : selectedPath.color === 'bg-green-100' ? 'from-green-500 to-green-700' : 'from-orange-500 to-orange-700'} rounded-2xl flex items-center justify-center text-3xl shadow-xl`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            {selectedPath.icon}
                          </motion.div>
                          <div>
                            <h1 className="text-3xl font-bold text-white">{selectedPath.title}</h1>
                            <p className="text-slate-400">{selectedPath.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-400 mb-1">Progress</div>
                          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{selectedPath.progress}%</div>
                        </div>
                      </div>
                      
                      {/* Quest Map for Selected Path */}
                      <div className="space-y-8">
                        {selectedPath.quests && selectedPath.quests.map((quest, index) => {
                          // Check if previous chapter is fully completed
                          const previousChapterComplete = index === 0 || 
                            selectedPath.quests[index - 1].nodes.every(node => completedLessons.has(node.id));
                          
                          return (
                            <div key={quest.id}>
                              <QuestMap 
                                quests={[quest]} 
                                onStartNode={handleStartLesson} 
                                chapterNumber={index + 1}
                                completedLessons={completedLessons}
                                isChapterUnlocked={previousChapterComplete}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
            {view === 'goals' && <GoalsPlanner />}
            {view === 'shop' && <Shop user={user} items={AVATARS} onBuy={handleBuyItem} />}
            {view === 'achievements' && <ClassRank />}
          </>
        )}

        {/* ADMIN VIEW */}
        {role === 'admin' && <TeacherDashboard />}
      </div>

      {/* Floating ChatBot Button & Window */}
      {phase === 'app' && role === 'user' && (
        <>
          {!isChatBotOpen && (
            <motion.button
              onClick={() => setIsChatBotOpen(true)}
              className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-2xl border-2 border-purple-400/50 text-white hover:shadow-purple-500/50 transition-all z-50 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
              >
                <MessageCircle size={28} />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block">
                <div className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl border border-purple-500/30">
                  Ask CS Questions 💭
                </div>
              </div>
            </motion.button>
          )}
          
          {isChatBotOpen && (
            <ChatBot onClose={() => setIsChatBotOpen(false)} />
          )}
        </>
      )}
    </div>
  );
}