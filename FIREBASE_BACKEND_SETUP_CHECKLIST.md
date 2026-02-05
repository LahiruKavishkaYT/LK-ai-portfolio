# Firebase & Vercel Backend Setup - Quick Checklist

## 🔴 YOUR CURRENT ISSUE
Backend not working on Vercel because **Firebase environment variables are not configured**.

---

## ✅ QUICK FIX CHECKLIST (Follow in order)

### Phase 1: Firebase Setup (5-10 min)
- [ ] Go to [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Create new project named `lahiru-portfolio`
- [ ] Enable Firestore Database (Test Mode)
- [ ] Enable Storage (Test Mode)
- [ ] Register Web App and copy the config
- [ ] Save credentials in a safe place

### Phase 2: Local Development (2 min)
- [ ] Create `.env.local` file from `.env.local.example`
- [ ] Paste Firebase credentials into `.env.local`
- [ ] Run `npm run dev`
- [ ] Test Contact form → Check Firestore
- [ ] Test Feedback form → Check Firestore
- [ ] Test Video upload → Check Storage

### Phase 3: Vercel Production (3 min)
- [ ] Go to vercel.com → Your Project → Settings
- [ ] Click Environment Variables
- [ ] Add 6 Firebase variables (see VERCEL_DEPLOYMENT_GUIDE.md)
- [ ] Set each to: Production ✓ Preview ✓ Development ✓
- [ ] Go to Deployments → Redeploy latest
- [ ] Wait for green checkmark
- [ ] Test live site

### Phase 4: Verification (2 min)
- [ ] Check live site Contact form works
- [ ] Check live site Feedback form works
- [ ] Verify data in Firebase Console → Firestore
- [ ] Verify videos in Firebase Console → Storage

---

## 📁 Files Created/Modified

| File | Purpose |
|------|---------|
| `.env.local.example` | Template for local environment variables |
| `FIREBASE_SETUP_GUIDE.md` | Complete step-by-step Firebase setup |
| `VERCEL_DEPLOYMENT_GUIDE.md` | Quick guide for Vercel environment variables |
| `.gitignore` | Updated to exclude `.env.local` and `.env` files |

---

## 🎯 Expected Results After Setup

**Local Development:**
- [ ] Contact form submissions appear in Firestore `contacts` collection
- [ ] Feedback submissions appear in Firestore `feedbacks` collection
- [ ] Video uploads appear in Storage `testimonials/` folder

**Vercel Production:**
- [ ] Same functionality works on live domain
- [ ] No console errors about undefined Firebase config
- [ ] Data persists in Firebase (viewable in console)

---

## ⚠️ IMPORTANT NOTES

1. **Do NOT commit `.env.local`** - It's in `.gitignore` for security
2. **Test Mode expires in 30 days** - Plan to update security rules before then
3. **Free Firebase tier includes:**
   - 50k Firestore reads/day
   - 20k Firestore writes/day
   - 5GB Storage
   - 1GB download/day
4. **Check browser console (F12)** if anything fails

---

## 🆘 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Cannot read properties of undefined (reading 'app')" | Environment variables not set in Vercel |
| "Missing or insufficient permissions" | Check Firestore/Storage Test Mode is enabled |
| Contact form submits but data doesn't appear | Check Firestore Database is created |
| Video won't upload | Check Storage is created and Test Mode enabled |
| Works locally but not on Vercel | Verify variables added to Vercel AND redeployed |

---

## 📞 Need Help?

1. Check browser console (F12) for exact error message
2. Read the detailed guide: `FIREBASE_SETUP_GUIDE.md`
3. Read Vercel guide: `VERCEL_DEPLOYMENT_GUIDE.md`
4. Check official docs:
   - [Firebase Setup](https://firebase.google.com/docs/setup/web)
   - [Vercel Env Vars](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Estimated total time: 15-20 minutes**
