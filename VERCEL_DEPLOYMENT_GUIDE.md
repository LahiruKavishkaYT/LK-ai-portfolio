# Vercel Deployment Guide for Firebase Backend

## Problem
Your app is deployed on Vercel but the Firebase backend isn't working because **environment variables are missing in Vercel**.

## Quick Fix (5 minutes)

### Step 1: Get Your Firebase Credentials
From your Firebase Console project:
- Go to **Project Settings** → **Your apps** → Copy the config

### Step 2: Add to Vercel

1. Go to https://vercel.com → Select your project
2. Click **Settings** tab
3. Click **Environment Variables** (left sidebar)
4. Add these 6 variables:

| Variable Name | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | `AIzaSy...` (from your config) |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `your-project-id` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789` |
| `VITE_FIREBASE_APP_ID` | `1:123456789:web:abcd...` |

5. For each variable:
   - Check ✓ **Production**
   - Check ✓ **Preview**
   - Check ✓ **Development**
6. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **...** menu on your latest deployment
3. Click **Redeploy**
4. **Wait** for the deployment to complete (show green checkmark)

### Step 4: Test
1. Visit your live site
2. Go to Contact or Feedback form
3. Submit a test message
4. Check your Firebase Console → Firestore for the data

---

## Why It Wasn't Working

1. **Your local `.env.local` file is NOT deployed to Vercel** (it's in `.gitignore`)
2. Vite needs environment variables at build time
3. Vercel needs these variables configured separately
4. Without them, Firebase config has `undefined` values

## Troubleshooting

### Still not working?
1. **Check browser console (F12)** for error messages
2. **Verify Firebase Rules** - go to Firestore/Storage and check Test Mode is enabled
3. **Check Vercel Logs**:
   - Go to **Deployments** → Click the latest one
   - Click **Function Logs** tab
   - Look for Firebase errors

### "Missing or insufficient permissions"
- Your Firestore/Storage is still in **Test Mode** (default - this is correct for now)
- Make sure rules allow `read` and `write` for the test period

### Environment variable shows as undefined
- Redeploy after adding the variables to Vercel
- Wait 1-2 minutes for the redeploy to complete

---

## Next Steps
Once everything works:
1. Monitor Firebase usage (free tier is generous)
2. After 30 days, update Firestore/Storage rules from Test Mode to production rules
3. Set up optional Admin Dashboard to review submissions
