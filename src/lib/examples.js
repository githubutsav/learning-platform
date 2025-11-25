// =============================================
// SUPABASE INTEGRATION EXAMPLES
// Quick reference for using the backend API
// =============================================

import { signUp, signIn, signOut, getCurrentUser } from './lib/auth';
import { 
  completeLesson, 
  updateUserRewards, 
  getCompletedLessons,
  createNotification,
  getNotifications,
  getLeaderboard,
  purchaseItem,
  getUserInventory
} from './lib/api';

// =============================================
// AUTHENTICATION EXAMPLES
// =============================================

// Sign up a new user
const handleSignUp = async () => {
  const result = await signUp(
    'user@example.com',
    'password123',
    'John Doe',
    'user' // or 'admin'
  );

  if (result.success) {
    console.log('User created:', result.user);
    // Navigate to app or show success message
  } else {
    console.error('Sign up failed:', result.error);
    // Show error to user
  }
};

// Sign in an existing user
const handleSignIn = async () => {
  const result = await signIn('user@example.com', 'password123');

  if (result.success) {
    console.log('Signed in:', result.user);
    // Update app state with user data
    setUser(result.user);
    setPhase('app');
  } else {
    console.error('Sign in failed:', result.error);
    // Show error to user
  }
};

// Sign out
const handleSignOut = async () => {
  const result = await signOut();
  
  if (result.success) {
    // Clear app state and return to login
    setUser(null);
    setPhase('login');
  }
};

// Get current user on app load
const loadCurrentUser = async () => {
  const result = await getCurrentUser();
  
  if (result.success && result.user) {
    setUser(result.user);
    setPhase('app');
  } else {
    // No user logged in, show login screen
    setPhase('login');
  }
};

// =============================================
// USER PROGRESS EXAMPLES
// =============================================

// Complete a lesson
const handleLessonComplete = async (userId, lessonId, pathId, chapterId, score) => {
  // 1. Mark lesson as completed
  const progressResult = await completeLesson(
    userId,
    lessonId,
    pathId,
    chapterId,
    score,
    timeSpent // in seconds
  );

  // 2. Award XP and coins
  const xpGain = score >= 80 ? 100 : score >= 60 ? 75 : 50;
  const coinGain = score >= 80 ? 150 : score >= 60 ? 100 : 50;

  const rewardResult = await updateUserRewards(userId, xpGain, coinGain);

  // 3. Create notification
  await createNotification(
    userId,
    'xp',
    'XP Gained',
    `You earned ${xpGain} XP for completing the lesson!`
  );

  // 4. Update local state
  setUser(prev => ({
    ...prev,
    xp: prev.xp + xpGain,
    coins: prev.coins + coinGain
  }));

  // 5. Add to completed lessons
  setCompletedLessons(prev => new Set([...prev, lessonId]));
};

// Get user's completed lessons
const loadCompletedLessons = async (userId) => {
  const result = await getCompletedLessons(userId);
  
  if (result.success) {
    // Convert to Set for easy lookup
    const completedIds = new Set(result.lessons.map(l => l.lesson_id));
    setCompletedLessons(completedIds);
  }
};

// =============================================
// NOTIFICATIONS EXAMPLES
// =============================================

// Load user notifications
const loadNotifications = async (userId) => {
  const result = await getNotifications(userId, 20); // last 20
  
  if (result.success) {
    setNotifications(result.notifications);
  }
};

// Send a notification
const sendAchievementNotification = async (userId, achievementName) => {
  await createNotification(
    userId,
    'achievement',
    'Achievement Unlocked!',
    `You earned: ${achievementName} 🏆`
  );
};

// =============================================
// LEADERBOARD EXAMPLES
// =============================================

// Load leaderboard
const loadLeaderboard = async () => {
  const result = await getLeaderboard(50); // top 50
  
  if (result.success) {
    setLeaderboardData(result.leaderboard);
  }
};

// =============================================
// SHOP EXAMPLES
// =============================================

// Load shop items
const loadShopItems = async () => {
  const result = await getShopItems('avatar'); // or null for all types
  
  if (result.success) {
    setShopItems(result.items);
  }
};

// Purchase an item
const handlePurchase = async (userId, itemId, priceCoin) => {
  const result = await purchaseItem(userId, itemId, priceCoin, 0);
  
  if (result.success) {
    // Update user coins
    setUser(prev => ({
      ...prev,
      coins: prev.coins - priceCoin
    }));
    
    // Reload inventory
    loadInventory(userId);
    
    alert('Purchase successful!');
  } else {
    alert(result.error || 'Purchase failed');
  }
};

// Load user inventory
const loadInventory = async (userId) => {
  const result = await getUserInventory(userId);
  
  if (result.success) {
    // Extract item IDs for easy lookup
    const ownedItems = result.inventory.map(item => item.item_id);
    setUser(prev => ({
      ...prev,
      inventory: ownedItems
    }));
  }
};

// =============================================
// REAL-TIME SUBSCRIPTIONS (OPTIONAL)
// =============================================

import { supabase } from './lib/supabase';

// Subscribe to XP changes
const subscribeToXPChanges = (userId) => {
  const channel = supabase
    .channel('user-xp-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${userId}`
      },
      (payload) => {
        console.log('XP updated!', payload.new);
        setUser(prev => ({
          ...prev,
          xp: payload.new.xp,
          level: payload.new.level,
          coins: payload.new.coins
        }));
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Subscribe to new notifications
const subscribeToNotifications = (userId) => {
  const channel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        console.log('New notification!', payload.new);
        setNotifications(prev => [payload.new, ...prev]);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// =============================================
// USAGE IN REACT COMPONENTS
// =============================================

// Example: useEffect to load data on mount
useEffect(() => {
  if (user?.id) {
    loadCompletedLessons(user.id);
    loadNotifications(user.id);
    loadInventory(user.id);
    
    // Optional: Subscribe to real-time updates
    const unsubscribeXP = subscribeToXPChanges(user.id);
    const unsubscribeNotif = subscribeToNotifications(user.id);
    
    return () => {
      unsubscribeXP();
      unsubscribeNotif();
    };
  }
}, [user]);

// =============================================
// ERROR HANDLING PATTERN
// =============================================

const safeApiCall = async (apiFunction, ...args) => {
  try {
    const result = await apiFunction(...args);
    
    if (result.success) {
      return { success: true, data: result };
    } else {
      console.error('API error:', result.error);
      // Show user-friendly error message
      alert('Something went wrong. Please try again.');
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    alert('An unexpected error occurred.');
    return { success: false, error: error.message };
  }
};

// Usage
const handleAction = async () => {
  const result = await safeApiCall(completeLesson, userId, lessonId, pathId, chapterId, score);
  
  if (result.success) {
    // Update UI
  }
};

// =============================================
// OFFLINE SUPPORT
// =============================================

// All API functions check if Supabase is configured
// If not, they return mock data or success responses
// This allows the app to work without backend setup

// Example: The app works immediately after cloning
// Users can test the UI without setting up Supabase
// Once Supabase is configured, data persists automatically!

// =============================================
// BEST PRACTICES
// =============================================

/*
1. Always check result.success before using data
2. Handle errors gracefully with user feedback
3. Use loading states while API calls are pending
4. Debounce frequent updates (e.g., time tracking)
5. Cache data locally when appropriate
6. Use optimistic UI updates for better UX
7. Subscribe to real-time updates for live features
8. Test with and without Supabase configured
9. Never expose sensitive keys in frontend
10. Use Row Level Security for data protection
*/

export {
  handleSignUp,
  handleSignIn,
  handleSignOut,
  loadCurrentUser,
  handleLessonComplete,
  loadCompletedLessons,
  loadNotifications,
  sendAchievementNotification,
  loadLeaderboard,
  loadShopItems,
  handlePurchase,
  loadInventory,
  subscribeToXPChanges,
  subscribeToNotifications
};
