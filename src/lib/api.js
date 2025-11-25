import { supabase, isSupabaseConfigured } from './supabase';

// =============================================
// USER STATS FUNCTIONS
// =============================================

/**
 * Get user's weekly stats
 */
export const getWeeklyStats = async (userId) => {
  if (!isSupabaseConfigured()) {
    return { 
      success: false, 
      stats: { lessonsCompleted: 0, timeSpent: 0, accuracy: 0, xpGained: 0 } 
    };
  }

  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Get lessons completed this week
    const { data: progressData, error: progressError } = await supabase
      .from('user_progress')
      .select('score, time_spent, completed_at')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('completed_at', oneWeekAgo.toISOString());

    if (progressError) throw progressError;

    // Calculate stats
    const lessonsCompleted = progressData.length;
    const totalTimeSpent = progressData.reduce((sum, p) => sum + (p.time_spent || 0), 0);
    const averageScore = progressData.length > 0
      ? Math.round(progressData.reduce((sum, p) => sum + (p.score || 0), 0) / progressData.length)
      : 0;

    // Estimate XP gained (assuming 50 XP per lesson on average)
    const xpGained = lessonsCompleted * 50;

    return {
      success: true,
      stats: {
        lessonsCompleted,
        timeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
        accuracy: averageScore,
        xpGained
      }
    };

  } catch (error) {
    console.error('Get weekly stats error:', error);
    return {
      success: false,
      error: error.message,
      stats: { lessonsCompleted: 0, timeSpent: 0, accuracy: 0, xpGained: 0 }
    };
  }
};

// =============================================
// USER PROGRESS FUNCTIONS
// =============================================

/**
 * Get user's completed lessons
 */
export const getCompletedLessons = async (userId) => {
  if (!isSupabaseConfigured()) {
    return { success: false, lessons: [] };
  }

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('lesson_id, score, completed_at')
      .eq('user_id', userId)
      .eq('status', 'completed');

    if (error) throw error;

    return {
      success: true,
      lessons: data
    };

  } catch (error) {
    console.error('Get completed lessons error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Mark a lesson as completed
 */
export const completeLesson = async (userId, lessonId, pathId, chapterId, score, timeSpent) => {
  if (!isSupabaseConfigured()) {
    return { success: true, message: 'Mock lesson completed' };
  }

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        path_id: pathId,
        chapter_id: chapterId,
        status: 'completed',
        score,
        time_spent: timeSpent,
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,lesson_id'
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      progress: data
    };

  } catch (error) {
    console.error('Complete lesson error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update user XP and coins
 */
export const updateUserRewards = async (userId, xpGain, coinGain) => {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { data, error } = await supabase.rpc('add_user_rewards', {
      p_user_id: userId,
      p_xp: xpGain,
      p_coins: coinGain
    });

    if (error) {
      // Fallback: manual update
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('xp, coins')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      const { error: updateError } = await supabase
        .from('users')
        .update({
          xp: userData.xp + xpGain,
          coins: userData.coins + coinGain
        })
        .eq('id', userId);

      if (updateError) throw updateError;
    }

    return { success: true };

  } catch (error) {
    console.error('Update rewards error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// =============================================
// NOTIFICATIONS FUNCTIONS
// =============================================

/**
 * Get user notifications
 */
export const getNotifications = async (userId, limit = 20) => {
  if (!isSupabaseConfigured()) {
    return { success: false, notifications: [] };
  }

  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      notifications: data
    };

  } catch (error) {
    console.error('Get notifications error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Create a notification
 */
export const createNotification = async (userId, type, title, message) => {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        user_id: userId,
        type,
        title,
        message,
        is_read: false
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      notification: data
    };

  } catch (error) {
    console.error('Create notification error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Mark notification as read
 */
export const markNotificationRead = async (notificationId) => {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;

    return { success: true };

  } catch (error) {
    console.error('Mark notification read error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsRead = async (userId) => {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;

    return { success: true };

  } catch (error) {
    console.error('Mark all notifications read error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// =============================================
// LEADERBOARD FUNCTIONS
// =============================================

/**
 * Get global leaderboard
 */
export const getLeaderboard = async (limit = 50) => {
  if (!isSupabaseConfigured()) {
    return { success: false, leaderboard: [] };
  }

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      leaderboard: data
    };

  } catch (error) {
    console.error('Get leaderboard error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// =============================================
// LEARNING PATHS FUNCTIONS
// =============================================

/**
 * Get all learning paths
 */
export const getLearningPaths = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, paths: [] };
  }

  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return {
      success: true,
      paths: data
    };

  } catch (error) {
    console.error('Get learning paths error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get chapters for a learning path
 */
export const getChapters = async (pathId) => {
  if (!isSupabaseConfigured()) {
    return { success: false, chapters: [] };
  }

  try {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('path_id', pathId)
      .order('chapter_number', { ascending: true });

    if (error) throw error;

    return {
      success: true,
      chapters: data
    };

  } catch (error) {
    console.error('Get chapters error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get lessons for a chapter
 */
export const getLessons = async (chapterId) => {
  if (!isSupabaseConfigured()) {
    return { success: false, lessons: [] };
  }

  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('lesson_number', { ascending: true });

    if (error) throw error;

    return {
      success: true,
      lessons: data
    };

  } catch (error) {
    console.error('Get lessons error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get user's progress for a path
 */
export const getPathProgress = async (userId, pathId) => {
  if (!isSupabaseConfigured()) {
    return { success: false, progress: null };
  }

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', pathId);

    if (error) throw error;

    return {
      success: true,
      progress: data
    };

  } catch (error) {
    console.error('Get path progress error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// =============================================
// SHOP FUNCTIONS
// =============================================

/**
 * Get shop items
 */
export const getShopItems = async (type = null) => {
  if (!isSupabaseConfigured()) {
    return { success: false, items: [] };
  }

  try {
    let query = supabase
      .from('shop_items')
      .select('*')
      .eq('is_available', true);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      success: true,
      items: data
    };

  } catch (error) {
    console.error('Get shop items error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Purchase an item
 */
export const purchaseItem = async (userId, itemId, priceCoin, priceDiamond) => {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    // Start transaction
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('coins, diamonds')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    if (userData.coins < priceCoin || userData.diamonds < priceDiamond) {
      return {
        success: false,
        error: 'Insufficient funds'
      };
    }

    // Deduct coins/diamonds
    const { error: updateError } = await supabase
      .from('users')
      .update({
        coins: userData.coins - priceCoin,
        diamonds: userData.diamonds - priceDiamond
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    // Add to inventory
    const { data: inventoryData, error: inventoryError } = await supabase
      .from('user_inventory')
      .insert([{
        user_id: userId,
        item_id: itemId
      }])
      .select()
      .single();

    if (inventoryError) throw inventoryError;

    return {
      success: true,
      purchase: inventoryData
    };

  } catch (error) {
    console.error('Purchase item error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get user's inventory
 */
export const getUserInventory = async (userId) => {
  if (!isSupabaseConfigured()) {
    return { success: false, inventory: [] };
  }

  try {
    const { data, error } = await supabase
      .from('user_inventory')
      .select('*, shop_items(*)')
      .eq('user_id', userId);

    if (error) throw error;

    return {
      success: true,
      inventory: data
    };

  } catch (error) {
    console.error('Get inventory error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
