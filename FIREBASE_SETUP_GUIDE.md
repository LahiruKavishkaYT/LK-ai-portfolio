# Firebase Backend Setup Guide

## 🔴 CRITICAL ISSUE: Your backend is not configured!

Your Vercel-hosted portfolio is trying to use Firebase but **environment variables are not set**. Here's how to fix it.

---

## STEP 1: Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter project name: `lahiru-portfolio` (or your choice)
4. **Accept the analytics terms**
5. Click **Create project** and wait for completion

---

## STEP 2: Enable Firestore Database

1. In Firebase Console, click **Build** (left sidebar)
2. Click **Firestore Database**
3. Click **Create Database**
4. Select **Start in Test Mode** (we'll secure it later)
5. Choose location closest to you (e.g., `us-central1`)
6. Click **Create**

### Test Mode Security (30-day limit):
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 3, 7);
    }
  }
}
```

---

## STEP 3: Enable Firebase Storage

1. In Firebase Console, click **Build** → **Storage**
2. Click **Get started**
3. Start in **Test Mode**
4. Choose the same location as Firestore
5. Click **Done**

### Storage Security Rules (Test Mode):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2026, 3, 7);
    }
  }
}
```

---

## STEP 4: Register Your Web App & Get Credentials

1. In Firebase Console, click the **Settings icon** (⚙️) → **Project settings**
2. Scroll down to **Your apps** section
3. Click **"</>‚ Web"** button to register a web app
4. App nickname: `lahiru-portfolio-web`
5. Check **"Also set up Firebase Hosting"** (optional)
6. Click **Register app**
7. Copy the config object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

---

## STEP 5: Set Up Local Development Environment

### For Local Development:

1. **Create `.env.local` file in your project root:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local` and paste your Firebase credentials:**
   ```
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

3. **⚠️ IMPORTANT: `.env.local` is already in `.gitignore` - do NOT commit it!**

---

## STEP 6: Set Up Vercel Environment Variables

Since `.env.local` is NOT deployed to Vercel, you need to add the variables directly in Vercel:

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

4. **Select environments**: Check ✓ **Production**, **Preview**, and **Development**
5. Click **Save**
6. **Redeploy** your application (Vercel should auto-redeploy)

---

## STEP 7: Create Firestore Collections

### Collection: `contacts`
Fields:
- `name` (string)
- `email` (string)
- `message` (string)
- `createdAt` (timestamp)
- `status` (string: "new", "replied")

### Collection: `feedbacks`
Fields:
- `fullName` (string)
- `role` (string)
- `type` (string: "written" or "video")
- `testimonial` (string, optional for video)
- `videoUrl` (string, nullable)
- `createdAt` (timestamp)
- `status` (string: "pending", "approved", "rejected")

**Note:** Firestore auto-creates collections when you first write to them, so you don't need to manually create them.

---

## STEP 8: Test the Setup

1. **Run locally:**
   ```bash
   npm run dev
   ```

2. **Test Contact Form:**
   - Go to **Contact** section
   - Fill in the form
   - Submit
   - Check Firestore: Go to **Firestore Database** → `contacts` collection
   - You should see your message!

3. **Test Feedback Form:**
   - Go to **Feedback** section
   - Submit written feedback
   - Check Firestore: Go to `feedbacks` collection
   - You should see the entry!

4. **Test Video Upload:**
   - Go to **Feedback** section
   - Switch to **VIDEO** tab
   - Record or upload a video
   - Submit
   - Check **Storage**: Go to `Storage` → You should see the video file in `/testimonials/`

---

## STEP 9: Monitor & Debug

### Check Errors:
1. Open **Browser Console** (F12) → **Console** tab
2. Look for any Firebase errors
3. Check **Firestore Rules** in Firebase Console if writes are failing

### Common Issues:

| Issue | Solution |
|-------|----------|
| "Missing or insufficient permissions" | Check Firestore/Storage Rules - ensure Test Mode is enabled |
| Environment variables undefined | Verify `.env.local` is created with correct values |
| Vercel not working | Add environment variables to Vercel project settings and redeploy |
| "apiKey is undefined" | Check that `VITE_FIREBASE_API_KEY` is in `.env.local` |

---

## STEP 10: Secure Your Database (AFTER 30 days)

Replace Test Mode rules with production-ready rules:

### Firestore Rules:
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to contacts and feedbacks
    match /contacts/{document=**} {
      allow create;
      allow read: if request.auth != null;
    }
    match /feedbacks/{document=**} {
      allow create;
      allow read: if resource.data.status == 'approved';
    }
  }
}
```

### Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public uploads but not downloads
    match /testimonials/{allPaths=**} {
      allow create;
      allow read: if resource.data.status == 'approved';
    }
  }
}
```

---

## Summary Checklist

- [ ] Created Firebase project
- [ ] Enabled Firestore Database (Test Mode)
- [ ] Enabled Storage (Test Mode)
- [ ] Registered Web App and copied config
- [ ] Created `.env.local` with Firebase credentials
- [ ] Verified `.env.local` is in `.gitignore`
- [ ] Added environment variables to Vercel
- [ ] Redeployed Vercel project
- [ ] Tested Contact form submission
- [ ] Tested Feedback form submission
- [ ] Tested Video upload
- [ ] Verified data appears in Firestore
- [ ] Verified videos appear in Storage

---

## Additional Resources

- [Firebase Console](https://console.firebase.google.com)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Questions?** Check the browser console (F12) for detailed error messages!
