# Authentication Debugging Guide

## What I Fixed

### 1. Loading State Issues ✅
**Problem:** Button kept spinning forever
**Fix:** Added `setIsLoading(false)` in all error cases

### 2. Better Error Logging ✅
**What to check:** Open browser console (F12) and look for:
- `Starting sign up for: [email]`
- `Auth user created: [user-id]`
- `Creating user profile...`
- `User profile created: [data]`
- `Sign in result: [object]`

### 3. Email Confirmation Handling ✅
**Problem:** Users confirm email but can't sign in
**Fix:** 
- Sign-in now creates profile if missing
- Shows proper message if email needs confirmation
- Handles both confirmed and unconfirmed users

### 4. Sign-In Flow Improvements ✅
**Problem:** Checked if user exists before trying to sign in (wrong approach)
**Fix:** Let Supabase handle authentication, create profile if missing

---

## How to Debug

### Step 1: Open Browser Console
Press **F12** → Go to **Console** tab

### Step 2: Try Signing Up
1. Enter email and password
2. Click Sign Up
3. Watch console for messages:

**✅ SUCCESS - You should see:**
```
Starting sign up for: test@example.com
Auth user created: abc-123-xyz
Creating user profile...
User profile created: {id: "abc-123-xyz", email: "test@example.com", ...}
```

**❌ ERROR - Look for:**
```
Auth sign up error: [error details]
User profile creation error: [error details]
```

### Step 3: Check for RLS Errors
If you see errors like:
- `"new row violates row-level security policy"`
- `"permission denied for table users"`
- `"PGRST301"`

**Fix:** You need to add the INSERT policy in Supabase (see FIX_RLS_POLICIES.md)

### Step 4: Try Signing In
1. Enter same email/password
2. Click Sign In
3. Watch console:

**✅ SUCCESS:**
```
Attempting sign in for: test@example.com
Auth successful, fetching user profile...
User profile loaded: {id: "abc-123-xyz", ...}
Sign in result: {success: true, user: {...}}
```

**❌ ERROR - "Invalid email or password":**
- Email confirmation might be required
- Password might be wrong
- User might not exist

**❌ ERROR - "Email not confirmed":**
- Go to your email inbox
- Click the confirmation link
- Try signing in again

### Step 5: Check Supabase Dashboard

#### Check Auth User:
1. Go to **Authentication** → **Users**
2. Find your email
3. Check **"Email Confirmed"** column
   - ✅ True = Can sign in
   - ❌ False = Need to confirm email

#### Check User Profile:
1. Go to **Table Editor** → **users** table
2. Find row with your email
3. Should see: full_name, xp, coins, level, etc.

#### Check RLS Policies:
1. Go to **Authentication** → **Policies**
2. Find **users** table
3. Should have 3 policies:
   - ✅ Users can read own data (SELECT)
   - ✅ Users can insert their own profile (INSERT)
   - ✅ Users can update own data (UPDATE)

---

## Common Issues & Fixes

### Issue 1: "Button keeps spinning"
**Cause:** Loading state never stops
**Fix:** ✅ Fixed - now stops on all errors

### Issue 2: "Email confirmed but can't sign in"
**Cause:** Profile wasn't created during sign-up
**Fix:** ✅ Fixed - sign-in now creates profile if missing

### Issue 3: "Google login doesn't work"
**Cause:** Need to configure Google OAuth in Supabase
**Fix:** 
1. Go to Supabase → Authentication → Providers → Google
2. Enable Google
3. Add Google Client ID and Secret from Google Cloud Console
4. See SUPABASE_SETUP.md for full guide

### Issue 4: "RLS policy violation"
**Cause:** Missing INSERT policy on users table
**Fix:** Run this SQL in Supabase SQL Editor:
```sql
CREATE POLICY "Users can insert their own profile"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
```

### Issue 5: "User already exists" on sign-up
**Cause:** Email already registered
**Fix:** ✅ Fixed - now shows error and switches to sign-in

### Issue 6: "No account found" on sign-in
**Cause:** User never signed up or profile deleted
**Fix:** ✅ Fixed - now creates profile if missing (for email-confirmed users)

---

## Test Checklist

### Test 1: New User Sign Up
- [ ] Enter new email and password
- [ ] Click Sign Up
- [ ] Check console for success messages
- [ ] If email confirmation enabled: Check email
- [ ] If email confirmation disabled: Should log in immediately

### Test 2: Existing User Sign In
- [ ] Enter existing email/password
- [ ] Click Sign In
- [ ] Should load profile and enter app
- [ ] XP, coins, level should be correct

### Test 3: Wrong Password
- [ ] Enter correct email, wrong password
- [ ] Click Sign In
- [ ] Should show "Invalid email or password"
- [ ] Button should stop spinning

### Test 4: Duplicate Email
- [ ] Try signing up with existing email
- [ ] Should show error
- [ ] Should auto-switch to sign-in after 2.5s

### Test 5: Email Confirmation Flow
- [ ] Sign up with new email
- [ ] Check email inbox
- [ ] Click confirmation link
- [ ] Go back to app
- [ ] Sign in with same credentials
- [ ] Should work now

### Test 6: Google Sign In
- [ ] Click "Sign in with Google"
- [ ] Should redirect to Google
- [ ] Choose account
- [ ] Should redirect back to app
- [ ] Should create profile automatically
- [ ] Should enter app

---

## Quick Fixes

### If Nothing Works:
1. **Disable email confirmation:**
   - Supabase → Authentication → Providers → Email
   - Turn OFF "Confirm email"
   - Save

2. **Delete test users:**
   - Supabase → Authentication → Users
   - Delete your test email
   - Try signing up again

3. **Check RLS policies:**
   - Run the SQL commands from FIX_RLS_POLICIES.md

4. **Clear browser storage:**
   - F12 → Application → Storage → Clear site data
   - Refresh page

5. **Check .env file:**
   ```bash
   cat .env
   ```
   - Verify VITE_SUPABASE_URL
   - Verify VITE_SUPABASE_ANON_KEY

---

## What to Report

If still not working, check console and report:
1. **Console errors** (copy full error message)
2. **Network tab** (check failed requests)
3. **Supabase Dashboard** screenshots:
   - Authentication → Users (is user there?)
   - Table Editor → users (is profile there?)
   - Authentication → Policies (are policies correct?)

With better logging, you'll now see exactly where it's failing!
