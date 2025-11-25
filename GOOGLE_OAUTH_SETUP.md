# Google OAuth Setup Guide

## Current Issue
Google Sign-In/Sign-Up is not working. This is typically due to configuration issues in Supabase.

## Setup Steps

### 1. Configure Google OAuth in Supabase Dashboard

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the provider list
4. Enable the Google provider
5. You'll need to provide:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

### 2. Get Google OAuth Credentials

If you don't have Google OAuth credentials yet:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted:
   - User Type: External
   - App name: Learning Platform
   - User support email: your email
   - Developer contact: your email
6. For Application Type, select **Web application**
7. Add Authorized redirect URIs:
   - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - (Replace YOUR_PROJECT_REF with your actual Supabase project reference)
8. Click **Create**
9. Copy the **Client ID** and **Client Secret**

### 3. Configure Redirect URLs in Supabase

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add the following to **Redirect URLs**:
   - `http://localhost:5175/auth/callback`
   - `http://localhost:5174/auth/callback`
   - `http://localhost:5173/auth/callback`
   - `http://localhost:3000/auth/callback`
   - Your production URL (when deployed)

### 4. Test the Setup

After configuration:

1. Clear browser cache and cookies
2. Open the app: http://localhost:5175
3. Click "Continue with Google"
4. Check browser console for any errors
5. You should be redirected to Google login
6. After successful Google login, you should be redirected back to the app

## Debugging

### Check Console Logs

Open browser DevTools (F12) and look for these logs:

- `Starting Google sign-in...` - Button clicked
- `Google sign-in result:` - Check if success is true
- `OAuth callback detected, processing...` - After Google redirect
- `OAuth callback successful:` - User profile created

### Common Errors

**Error: "Invalid redirect URL"**
- Add your localhost URL to Supabase redirect URLs

**Error: "Google OAuth not configured"**
- Enable Google provider in Supabase and add Client ID/Secret

**Error: "Popup blocked"**
- Google OAuth uses redirects, not popups. Check redirect URLs.

**Error: "403 Forbidden" or "406 Not Acceptable"**
- RLS policy issue. Run the SQL from FIX_RLS_POLICIES.md

### Manual Test

You can test the OAuth URL directly:

```javascript
// In browser console on http://localhost:5175
const { supabase } = await import('./src/lib/supabase.js');
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`
  }
});
console.log({ data, error });
```

## Current Implementation

The app is properly configured to handle Google OAuth:

1. **LoginScreen.jsx**: Google sign-in button calls `signInWithGoogle()`
2. **auth.js**: `signInWithGoogle()` initiates OAuth flow with redirect to `/auth/callback`
3. **App.jsx**: On mount, checks for OAuth callback and processes it
4. **auth.js**: `handleOAuthCallback()` creates user profile for new Google users

## Next Steps

1. Complete the Google OAuth configuration in Supabase Dashboard
2. Test the flow end-to-end
3. Check browser console for any errors
4. If issues persist, check the Supabase logs in the dashboard

## Support

If you're still having issues:
- Check Supabase project logs (Dashboard → Logs)
- Verify RLS policies allow user creation
- Ensure Google OAuth credentials are correct
- Try the manual test above to see detailed error messages
