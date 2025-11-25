# Disable Email Confirmation for Testing

## Problem
Email/password sign up isn't working because Supabase requires email confirmation by default. Users won't be able to sign in until they click the confirmation link in their email.

## Solution: Disable Email Confirmation (For Development)

### Step 1: Go to Supabase Dashboard

1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **Providers** → **Email**

### Step 2: Disable Email Confirmation

Scroll down to find:
- **Confirm email** toggle
- Turn it **OFF** (disable it)

This allows users to sign up and immediately sign in without confirming their email.

### Step 3: Save Settings

Click **Save** at the bottom of the page.

### Step 4: Test Sign Up

1. Clear browser storage (F12 → Application → Clear site data)
2. Try signing up with a new email
3. You should be able to sign in immediately

---

## Alternative: Enable Email Confirmation (Production)

If you want to keep email confirmation enabled (recommended for production):

### Update the Flow in Your App

The current code already handles this, but users will need to:

1. **Sign up** → Receive confirmation email
2. **Click link in email** → Email gets confirmed
3. **Return to app** → Sign in with credentials

### Configure Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation email
3. Set **Redirect URL** to your app URL

### Update Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `http://localhost:5175` (development) or your production URL
3. Add to **Redirect URLs**: `http://localhost:5175/**`

---

## Current Behavior After Fixes

### ✅ Sign In Page (Default)
- First screen users see
- For returning users with existing accounts

### ✅ Sign Up Page
- Switch from sign-in via "Sign Up" link
- Only allows NEW emails (not previously registered)
- If email exists → Shows error and switches back to sign-in

### ✅ Role Selection Removed
- All users sign up as "user" role
- No admin/user selection needed

### ✅ Google OAuth
- Works independently
- No email confirmation required
- Redirects to Google → Creates account automatically

### ✅ Email/Password (After Disabling Confirmation)
- Sign up → Immediately creates account
- Sign in → Loads profile and progress
- No email confirmation needed

---

## Troubleshooting

### Issue: "Email not confirmed"
**Fix:** 
1. Disable email confirmation in Supabase
2. OR check your email inbox for confirmation link
3. OR delete the user and sign up again

### Issue: Google works but email doesn't
**Fix:**
1. Check if email confirmation is enabled
2. Disable it for testing
3. Make sure RLS INSERT policy is created (see FIX_RLS_POLICIES.md)

### Issue: "User already exists" but can't sign in
**Fix:**
1. Go to **Authentication** → **Users**
2. Find the user
3. Check if "Email Confirmed" is false
4. Either:
   - Delete the user and sign up again
   - Or manually confirm the email in dashboard

### Issue: Sign up succeeds but profile not created
**Fix:**
1. Check RLS policies (see FIX_RLS_POLICIES.md)
2. Make sure INSERT policy exists for users table
3. Check browser console for errors

---

## Quick Checklist

- [ ] Go to Supabase Dashboard
- [ ] Authentication → Providers → Email
- [ ] Disable "Confirm email" toggle
- [ ] Click Save
- [ ] Clear browser storage
- [ ] Try signing up with new email
- [ ] Should work immediately

## After These Changes

✅ **Default Screen:** Sign In  
✅ **New Users:** Click "Sign Up" → Enter details → Account created immediately  
✅ **Existing Users:** Enter email/password → Sign in  
✅ **Duplicate Emails:** Blocked on sign up, redirected to sign in  
✅ **Google OAuth:** Works as before  
✅ **Role Selection:** Removed (everyone is "user")  

Your authentication flow is now much simpler and more user-friendly!
