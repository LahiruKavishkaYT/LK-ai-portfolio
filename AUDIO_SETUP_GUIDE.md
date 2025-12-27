# Voice Demo Audio Setup Guide

## 🎯 Quick Start

Your voice demo audio functionality is **fully implemented**! You just need to add your audio files.

## 📁 Where to Store Audio

### **Option 1: Local Storage (Development)**
1. Place your MP3 files in `/public/audio/`
2. Update [audioConfig.ts](../config/audioConfig.ts):
   ```typescript
   useLocalAudio: true,
   useExternalAudio: false,
   ```

### **Option 2: Cloud Storage (Production - Recommended)**
1. Upload to cloud provider
2. Get public URLs
3. Update `audioConfig.ts` with your URLs

---

## 🎤 Where to Get Voice AI Demos

### **Method 1: Record Real Demos**
Use actual Voice AI platforms:
- **VAPI**: https://vapi.ai
- **Bland AI**: https://bland.ai
- **Retell AI**: https://retell.ai
- **Synthflow**: https://synthflow.ai

### **Method 2: Generate with AI Voice Tools**

**Premium Options:**
- **ElevenLabs** (Best Quality): https://elevenlabs.io
  - Natural voices, emotion control
  - $5/month starter plan
  
- **Play.ht**: https://play.ht
  - Great for conversational AI
  - Free tier available

- **Resemble AI**: https://resemble.ai
  - Clone your own voice
  - Professional quality

**Free Options:**
- **Google Cloud Text-to-Speech**: https://cloud.google.com/text-to-speech
  - 1 million characters free/month
  - Good quality

- **Azure Speech Services**: https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/
  - Free tier available

### **Method 3: Create Mock Conversations**
1. Write a script for your demo scenario
2. Use any TTS tool to generate both sides of conversation
3. Edit together using:
   - **Audacity** (Free): https://www.audacityteam.org/
   - **Adobe Audition** (Paid)
   - **Descript** (AI-powered editing): https://www.descript.com/

---

## 🗂️ Recommended Cloud Storage

### **AWS S3** (Current Setup)
```bash
# 1. Create S3 bucket
# 2. Upload files
# 3. Set public read access
# 4. Get URL: https://your-bucket.s3.amazonaws.com/file.mp3
```

### **Cloudinary** (Easy Setup)
```bash
# 1. Sign up: https://cloudinary.com
# 2. Upload audio files
# 3. Copy URLs
# Very simple, has free tier
```

### **Vercel Blob** (If deploying on Vercel)
```bash
npm i @vercel/blob
# Upload via dashboard or API
```

### **Firebase Storage** (If using Firebase)
```bash
# 1. Enable Storage in Firebase Console
# 2. Upload files
# 3. Get download URLs
```

---

## 🎬 Sample Voice Demo Script

### Real Estate Acquisition Demo:
```
AI: "Hi, this is Alex with Property Solutions. I understand you're interested in selling your property at 123 Main Street. Is that correct?"

Caller: "Yes, that's right."

AI: "Perfect! I'd love to help. Can you tell me about the current condition of the property? Any recent renovations or repairs needed?"

Caller: "It needs some work. The roof is about 15 years old and the kitchen could use updating."

AI: "Thank you for that information. Based on the condition you've described, I can offer you $285,000 for the property. We can close in as little as 7 days. Would you like me to schedule an inspection for this week?"

Caller: "That sounds interesting. Yes, let's schedule it."

AI: "Great! I have Thursday at 2 PM or Friday at 10 AM available. Which works better for you?"

Caller: "Thursday at 2 works."

AI: "Perfect! I've scheduled the inspection for Thursday, April 15th at 2 PM. I'm also updating your information in our CRM. You'll receive a confirmation email within the next few minutes. Is there anything else I can help you with today?"
```

---

## 🛠️ Audio File Specifications

- **Format**: MP3 (best browser compatibility)
- **Bitrate**: 128-192 kbps (balance of quality/size)
- **Sample Rate**: 44.1 kHz or 48 kHz
- **Channels**: Stereo or Mono
- **Duration**: 20-60 seconds (optimal for demos)
- **File Size**: Keep under 2MB each

---

## 🚀 Quick Test

### Test with Current External URLs:
The app is already set to use public VAPI demo URLs. If you see errors:

1. **Check your internet connection**
2. **Try the Retry button**
3. **Open browser console** (F12) to see specific errors
4. **Check CORS**: Some external URLs may block browser access

### Test with Your Own Audio:
1. Place a test MP3 in `/public/audio/test.mp3`
2. Update `audioConfig.ts`:
   ```typescript
   realEstate: {
     local: '/audio/test.mp3',
     // ...
   }
   ```
3. Set `useLocalAudio: true`
4. Refresh and click play

---

## 🐛 Troubleshooting

### "Error loading audio"
- **CORS Issue**: External URL blocks browser requests
  - Solution: Use your own hosting or local files
  
- **File Not Found**: URL is incorrect
  - Solution: Verify the URL in browser address bar
  
- **Format Not Supported**: Some browsers don't support certain formats
  - Solution: Use MP3 format (universally supported)

### Audio Doesn't Play
- **Browser Autoplay Policy**: Browsers block autoplay
  - This is normal - user must click play button
  
- **File Too Large**: Large files take time to load
  - Solution: Compress to 128-192kbps
  
- **Network Issue**: Slow connection
  - Solution: Use CDN or compress files

### Multiple Audios Playing
- This is prevented by the auto-pause code
- If it happens, check browser console for errors

---

## 📝 Current Configuration

Location: [audioConfig.ts](../config/audioConfig.ts)

```typescript
useLocalAudio: false     // Using external URLs
useExternalAudio: true   // Current setting
```

To switch to local files:
```typescript
useLocalAudio: true      // Use /public/audio files
useExternalAudio: false
```

---

## ✅ Implementation Status

✅ Audio player functionality fully implemented
✅ Play/pause controls working
✅ Animated waveform visualization
✅ Loading states
✅ Error handling with retry
✅ Auto-pause other audios
✅ Responsive design
✅ Accessibility (ARIA labels)

❓ Pending: Add your actual audio demo files

---

## 🎯 Next Steps

1. **Choose your audio source** (record, generate, or use placeholders)
2. **Decide on storage** (local for dev, cloud for production)
3. **Update audioConfig.ts** with your audio URLs
4. **Test functionality** in browser
5. **Deploy** when satisfied

---

Need help? Check the browser console (F12) for detailed error messages.
