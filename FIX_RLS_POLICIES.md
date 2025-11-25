# Fix RLS Policy Errors

## Problem
You're seeing these errors:
- `406 Not Acceptable` - Query format issues
- `403 Forbidden` - RLS policies blocking operations
- `PGRST116` - "Cannot coerce the result to a single JSON object"

## Solution

### 1. Update Code (✅ DONE)
Changed all `.single()` to `.maybeSingle()` in auth.js to handle empty results gracefully.

### 2. Fix RLS Policies in Supabase

#### Step 1: Go to Supabase Dashboard
1. Open [supabase.com](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **Policies**
4. Find the `users` table

#### Step 2: Update Users Table RLS Policy

**Delete the existing policy** that's blocking inserts, then create this new one:

```sql
-- Policy Name: "Users can insert their own profile"
-- Allowed operation: INSERT
-- Target roles: authenticated

CREATE POLICY "Users can insert their own profile"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
```

This allows authenticated users to create their own profile (where their auth UID matches the profile ID).

#### Step 3: Verify All Policies Exist

Run this SQL in the **SQL Editor** to see all policies:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';
```

You should see these policies:

| Policy Name | Operation | Check |
|------------|-----------|-------|
| Users can insert their own profile | INSERT | auth.uid() = id |
| Users can read own data | SELECT | auth.uid() = id |
| Users can update own data | UPDATE | auth.uid() = id |

#### Step 4: If Policies Don't Exist, Create Them

Run this SQL in **SQL Editor**:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read own data"
ON users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own data"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

### 3. Test Authentication

After updating policies:

1. **Refresh your app** (Ctrl+R or Cmd+R)
2. **Clear browser storage:**
   - Open DevTools (F12)
   - Application tab → Storage → Clear site data
3. **Try signing up again** with a new email
4. **Check browser console** - errors should be gone

### 4. Verify in Supabase Dashboard

After signing up:

1. Go to **Authentication** → **Users**
   - Should see your new user with email
   
2. Go to **Table Editor** → `users` table
   - Should see a new row with your profile data
   - Check: full_name, role, xp, coins, etc.

3. Go to **SQL Editor** and run:
   ```sql
   SELECT * FROM users WHERE email = 'your-email@example.com';
   ```
   - Should return your profile data

### 5. Common Issues

#### Issue: "Row Level Security violation"
**Fix:** Make sure the policy uses `auth.uid()` not `user_id` or other column names.

#### Issue: "Permission denied for table users"
**Fix:** 
1. Go to Table Editor → users table → Settings
2. Enable RLS
3. Apply the policies above

#### Issue: "Profile not found after sign up"
**Fix:**
1. Check if email confirmation is required
2. Go to Authentication → Settings → Email Auth
3. Disable "Confirm email" for testing
4. Try signing up again

#### Issue: Still seeing 406 errors
**Fix:**
1. Clear browser cache completely
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Network tab in DevTools for exact error
4. Verify Supabase URL and anon key in .env

### 6. Alternative: Disable RLS for Testing

⚠️ **Only for testing - NOT for production!**

```sql
-- Temporarily disable RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

This will allow all operations without restrictions. Use only to verify the rest of your code works.

**Remember to re-enable it:**
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

### 7. Expected Behavior After Fix

✅ **Sign Up:**
- Creates auth user
- Creates profile in users table
- No errors in console
- Redirects to role selection

✅ **Sign In:**
- Authenticates user
- Loads profile from users table
- Restores completed lessons
- Enters app with correct user data

✅ **Refresh Page:**
- Checks for existing session
- Auto-loads user profile
- Shows correct XP/coins/level
- No need to sign in again

✅ **Complete Lesson:**
- Saves to user_progress table
- Updates XP/coins in users table
- No console errors

---

## Quick Checklist

- [ ] Updated code to use `.maybeSingle()` (✅ already done)
- [ ] RLS enabled on users table
- [ ] INSERT policy allows `auth.uid() = id`
- [ ] SELECT policy allows `auth.uid() = id`
- [ ] UPDATE policy allows `auth.uid() = id`
- [ ] Cleared browser storage
- [ ] Tested sign up
- [ ] Verified user in Authentication tab
- [ ] Verified profile in users table
- [ ] No console errors

## Need Help?

If errors persist:

1. **Screenshot the exact error** from browser console
2. **Check Supabase logs:**
   - Project Settings → Logs → Postgres Logs
   - Look for RLS policy violations
3. **Verify .env variables:**
   ```bash
   cat .env | grep SUPABASE
   ```
4. **Test Supabase connection:**
   - Add console.log in src/lib/supabase.js
   - Verify URL and key are loaded correctly
