# Backend Architecture: Serverless (Firebase)

Since you have already installed `firebase` and need a robust, free, and serverless solution that handles large video files, **Firebase** (by Google) is the perfect choice. It provides a generous free tier ("Spark Plan") that will easily cover your portfolio's needs.

## 1. Why Firebase?
*   **True Serverless**: No servers to manage. You connect directly from your React app.
*   **Bypasses Vercel Limits**: Firebase Storage allows direct uploads from the browser, solving the 4.5MB limit on Vercel functions for your video testimonials.
*   **Free Tier**:
    *   **Firestore (Database)**: 50,000 reads/day, 20,000 writes/day (Free).
    *   **Storage**: 5GB of storage, 1GB download/day (Free).
    *   **Hosting**: (We are using Vercel, which is fine).

## 2. Data Structure (Cloud Firestore)

We will use a NoSQL database (Firestore) with two collections.

### Collection: `contacts`
Stores messages from the "Contact" section.
*   `id`: Auto-generated
*   `name`: string
*   `email`: string
*   `message`: string
*   `timestamp`: serverTimestamp

### Collection: `feedbacks`
Stores the testimonials.
*   `id`: Auto-generated
*   `fullName`: string
*   `role`: string
*   `type`: 'written' | 'video'
*   `testimonial`: string (optional if video)
*   `videoUrl`: string (URL from Firebase Storage)
*   `timestamp`: serverTimestamp

## 3. File Storage (Firebase Storage)

### Bucket Structure
*   `/testimonials/{timestamp}_{random_id}.webm`
    *   Stores the recorded video files.
    *   **Security Rule**: Allow public write (for uploads), allow public read (for playback).

## 4. Implementation Plan

### Step 1: Firebase Console Setup (You need to do this)
1.  Go to [console.firebase.google.com](https://console.firebase.google.com).
2.  Create a new project (e.g., "lahiru-portfolio").
3.  **Enable Firestore Database**: Start in **Test Mode** (allows read/write for 30 days, we can secure it later).
4.  **Enable Storage**: Start in **Test Mode**.
5.  **Register Web App**: Click the `</>` icon, register the app, and copy the `firebaseConfig` object.

### Step 2: Code Integration
1.  Create `src/lib/firebase.ts` to initialize the app.
2.  Update `Contact.tsx` to write to Firestore.
3.  Update `FeedbackForm.tsx` to upload video to Storage and save metadata to Firestore.

### Step 3: Environment Variables
Store your keys in `.env.local` (do not commit them to GitHub).
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
