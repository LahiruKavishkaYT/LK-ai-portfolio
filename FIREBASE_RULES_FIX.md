# Firebase Permissions Error Fix

## Problem
Getting "Missing or insufficient permissions" error when submitting forms.

## Solution: Update Firebase Security Rules

### Step 1: Go to Firebase Console
1. Open https://console.firebase.google.com/
2. Select your project: **portfolio-96bc1**

### Step 2: Update Firestore Rules
1. In left sidebar, click **Firestore Database**
2. Click the **Rules** tab at the top
3. Replace the existing rules with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to contacts collection
    match /contacts/{document=**} {
      allow read, write: if true;
    }
    
    // Allow read/write access to feedbacks collection
    match /feedbacks/{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click **Publish** button

### Step 3: Update Storage Rules (for video testimonials)
1. In left sidebar, click **Storage**
2. Click the **Rules** tab at the top
3. Replace the existing rules with:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow uploads to testimonials folder
    match /testimonials/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click **Publish** button

### Step 4: Test Your Application
1. Refresh your browser (Ctrl+F5)
2. Try submitting a contact message
3. Try submitting feedback
4. Check Firebase Console → Firestore Database to see the new documents

---

## ⚠️ Security Note

**These rules allow anyone to read/write to your database** - this is fine for development and personal portfolio sites with low traffic.

### For Production (Optional - Later):

If you want to add basic protection:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document=**} {
      // Allow anyone to write (submit forms)
      allow write: if true;
      // Only allow reading from authenticated requests
      allow read: if false; // Set to true if you need to read via admin panel
    }
    
    match /feedbacks/{document=**} {
      allow write: if true;
      allow read: if true; // Keep true since Feedback.tsx displays testimonials
    }
  }
}
```

---

## Success Indicators
✅ No more "Missing or insufficient permissions" errors
✅ Contact form submissions appear in Firebase Console
✅ Feedback submissions appear in Firebase Console
✅ Success messages display correctly
