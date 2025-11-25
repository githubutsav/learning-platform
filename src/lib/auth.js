import { supabase, isSupabaseConfigured } from './supabase';

// =============================================
// AUTHENTICATION FUNCTIONS
// =============================================

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, using mock auth');
    return {
      success: true,
      user: { id: 'mock-google-user', email: 'google@example.com', full_name: 'Google User', role: 'user' },
      message: 'Mock Google sign in (Supabase not configured)'
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) throw error;

    return {
      success: true,
      message: 'Redirecting to Google...'
    };

  } catch (error) {
    console.error('Google sign in error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Check if user exists in database
 */
export const checkUserExists = async (email) => {
  if (!isSupabaseConfigured()) {
    return { exists: false };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return {
      exists: !!data,
      user: data
    };

  } catch (error) {
    console.error('Check user exists error:', error);
    return {
      exists: false,
      error: error.message
    };
  }
};

/**
 * Sign up a new user
 */
export const signUp = async (email, password, fullName, role = 'user') => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, using mock auth');
    return {
      success: true,
      user: { id: 'mock-user-id', email, full_name: fullName, role },
      message: 'Mock user created (Supabase not configured)'
    };
  }

  try {
    console.log('Starting sign up for:', email);
    
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        },
        emailRedirectTo: window.location.origin // Redirect back to app after email confirmation
      }
    });

    if (authError) {
      console.error('Auth sign up error:', authError);
      throw authError;
    }
    
    console.log('Auth user created:', authData.user?.id);
    
    // Check if email confirmation is required
    if (authData.user && !authData.session) {
      console.warn('Email confirmation required. User must confirm email before signing in.');
      // Still try to create profile - it will be there when they confirm
    }

    // 2. Create user profile in users table
    console.log('Creating user profile...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        email,
        full_name: fullName,
        role,
        xp: 0,
        level: 1,
        coins: 500, // Starting coins
        diamonds: 0,
        streak: 0
      }])
      .select()
      .maybeSingle();

    if (userError) {
      console.error('User profile creation error:', userError);
      throw userError;
    }
    
    console.log('User profile created:', userData);

    return {
      success: true,
      user: userData,
      authUser: authData.user,
      session: authData.session,
      needsEmailConfirmation: !authData.session,
      message: authData.session 
        ? 'Account created successfully!' 
        : 'Account created! Please check your email to confirm your address.'
    };

  } catch (error) {
    console.error('Sign up error:', error);
    
    // Provide helpful error messages
    let errorMessage = error.message;
    if (error.message?.includes('duplicate key')) {
      errorMessage = 'An account with this email already exists.';
    } else if (error.code === '42501') { // PostgreSQL permission denied
      errorMessage = 'Database permission error. Please check RLS policies.';
    } else if (error.message?.includes('new row violates')) {
      errorMessage = 'Could not create user profile. Please contact support.';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Sign in an existing user
 */
export const signIn = async (email, password) => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, using mock auth');
    return {
      success: true,
      user: { id: 'mock-user-id', email, full_name: 'Mock User', role: 'user' },
      message: 'Mock sign in (Supabase not configured)'
    };
  }

  try {
    console.log('Attempting sign in for:', email);
    
    // 1. Sign in with Supabase Auth (don't check existence first - let Supabase handle it)
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Auth error:', authError);
      if (authError.message.includes('Invalid login credentials')) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }
      if (authError.message.includes('Email not confirmed')) {
        return {
          success: false,
          error: 'Please confirm your email address before signing in. Check your inbox.'
        };
      }
      throw authError;
    }

    console.log('Auth successful, fetching user profile...');

    // 2. Get user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (userError) {
      console.error('User profile error:', userError);
      throw userError;
    }
    
    if (!userData) {
      console.warn('User profile not found, creating one...');
      // Profile doesn't exist - create it (for users who signed up via email confirmation)
      const { data: newProfile, error: createError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email: authData.user.email,
          full_name: authData.user.user_metadata?.full_name || authData.user.email.split('@')[0],
          role: 'user',
          xp: 0,
          level: 1,
          coins: 500,
          diamonds: 0,
          streak: 0
        }])
        .select()
        .maybeSingle();
      
      if (createError) {
        console.error('Profile creation error:', createError);
        throw createError;
      }
      
      return {
        success: true,
        user: newProfile,
        authUser: authData.user,
        message: 'Signed in successfully!'
      };
    }

    console.log('User profile loaded:', userData);

    // 3. Update last_active timestamp
    await supabase
      .from('users')
      .update({ last_active: new Date().toISOString() })
      .eq('id', authData.user.id);

    return {
      success: true,
      user: userData,
      authUser: authData.user,
      message: 'Signed in successfully!'
    };

  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return {
      success: true,
      message: 'Signed out successfully!'
    };

  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get current session
 */
export const getCurrentSession = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, session: null };
  }

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;

    return {
      success: true,
      session
    };

  } catch (error) {
    console.error('Get session error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, user: null };
  }

  try {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!authUser) return { success: false, user: null };

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    if (userError) throw userError;
    
    // If user profile doesn't exist, return null (will be created on OAuth callback)
    if (!userData) {
      return { success: false, user: null, needsProfile: true };
    }

    return {
      success: true,
      user: userData
    };

  } catch (error) {
    console.error('Get user error:', error);
    console.error('Error code:', error.code);
    console.error('Error details:', error.details);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Handle OAuth callback and create user profile if needed
 */
export const handleOAuthCallback = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: { user: authUser }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    if (!authUser) return { success: false, error: 'No authenticated user' };

    // Check if user profile exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();
    
    if (checkError) throw checkError;

    // If user doesn't exist, create profile (new Google sign-in)
    if (!existingUser) {
      const newUserData = {
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.user_metadata?.full_name || authUser.email.split('@')[0],
        role: 'user',
        avatar_url: authUser.user_metadata?.avatar_url,
        xp: 0,
        level: 1,
        coins: 500,
        diamonds: 0,
        streak: 0
      };
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([newUserData])
        .select()
        .single();

      // If conflict error (duplicate key), user was already created - fetch it
      if (createError) {
        if (createError.code === '23505') {
          const { data: fetchedUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          if (fetchError) throw fetchError;
          return {
            success: true,
            user: fetchedUser,
            isNewUser: false
          };
        }
        throw createError;
      }

      return {
        success: true,
        user: newUser,
        isNewUser: true
      };
    }

    return {
      success: true,
      user: existingUser,
      isNewUser: false
    };

  } catch (error) {
    console.error('OAuth callback error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  if (!isSupabaseConfigured()) {
    return { unsubscribe: () => {} };
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      // Get or create user profile
      let { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // If no profile exists (OAuth first time), create it
      if (!userData) {
        const { data: newUser } = await supabase
          .from('users')
          .insert([{
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            role: 'user',
            avatar_url: session.user.user_metadata?.avatar_url,
            xp: 0,
            level: 1,
            coins: 500,
            diamonds: 0,
            streak: 0
          }])
          .select()
          .single();
        
        userData = newUser;
      }
      
      callback(event, session, userData);
    } else if (event === 'SIGNED_OUT') {
      // Only notify on explicit sign-out events to avoid transient events
      callback(event, session, null);
    } else {
      // Ignore other auth events (TOKEN_REFRESHED, USER_UPDATED, etc.)
      return;
    }
  });

  return subscription;
};
