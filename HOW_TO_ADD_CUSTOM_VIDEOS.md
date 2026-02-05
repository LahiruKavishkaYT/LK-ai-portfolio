# How to Add Custom Videos to Industry Solutions Section

## Overview
The "Industry Solutions" section displays 5 different use case videos. Currently, they use placeholder videos from Pexels. Here's how to replace them with your custom videos.

---

## Option 1: Local Videos (Recommended for Hosting on Vercel)

### Step 1: Prepare Your Videos
- **Format**: MP4 (recommended), WebM, or MOV
- **Resolution**: 1920x1080 (Full HD) or 2560x1440 (2K) recommended
- **File size**: Keep under 20MB per video for fast loading
- **Duration**: 25-45 seconds per video (as shown in the UI)

### Step 2: Create Videos Folder
```bash
mkdir public/videos
```

### Step 3: Add Your Videos
Place your video files in `public/videos/`:
```
public/
  videos/
    med-spa.mp4              # Medical Spa video
    real-estate.mp4          # Real Estate video
    legal-intake.mp4         # Legal video
    recruitment.mp4          # Recruitment video
    hvac-service.mp4         # HVAC/Home Services video
```

### Step 4: Update UseCase.tsx
Replace the `USE_CASES` array (lines 6-43) with your local video paths:

```typescript
const USE_CASES = [
  {
    id: 'med-spa',
    title: 'Medical Spa Concierge',
    description: 'Automate consultations, qualify patients, and collect deposits.',
    video: '/videos/med-spa.mp4',  // ✅ Local path
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop',
    duration: '0:30'  // ⚠️ Update to match your actual video duration
  },
  {
    id: 'real-estate',
    title: 'Real Estate ISA',
    description: 'Qualify buyer intent and live-transfer hot leads to closers.',
    video: '/videos/real-estate.mp4',  // ✅ Local path
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop',
    duration: '0:25'  // ⚠️ Update to match your actual video duration
  },
  {
    id: 'legal',
    title: 'Legal Intake Specialist',
    description: 'Screen claimants and gather incident details 24/7.',
    video: '/videos/legal-intake.mp4',  // ✅ Local path
    thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2670&auto=format&fit=crop',
    duration: '0:40'  // ⚠️ Update to match your actual video duration
  },
  {
    id: 'recruitment',
    title: 'Recruitment Screener',
    description: 'Evaluate technical requirements and culture fit at scale.',
    video: '/videos/recruitment.mp4',  // ✅ Local path
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop',
    duration: '0:35'  // ⚠️ Update to match your actual video duration
  },
  {
    id: 'home-services',
    title: 'Service Dispatch (HVAC)',
    description: 'Triage emergency issues and route technicians efficiently.',
    video: '/videos/hvac-service.mp4',  // ✅ Local path
    thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop',
    duration: '0:45'  // ⚠️ Update to match your actual video duration
  }
];
```

### Step 5: Optional - Add Custom Thumbnails
If you have custom thumbnail images:

1. **Create thumbnails folder:**
   ```bash
   mkdir public/videos/thumbnails
   ```

2. **Add thumbnail images** (JPG or PNG, 1920x1080 recommended)

3. **Update UseCase.tsx:**
   ```typescript
   {
     id: 'med-spa',
     title: 'Medical Spa Concierge',
     description: 'Automate consultations, qualify patients, and collect deposits.',
     video: '/videos/med-spa.mp4',
     thumbnail: '/videos/thumbnails/med-spa.jpg',  // ✅ Custom thumbnail
     duration: '0:30'
   }
   ```

---

## Option 2: Remote Hosted Videos (YouTube, Vimeo, or Cloud Storage)

### Using Direct Video URLs (AWS S3, Cloudflare R2, etc.)

If your videos are hosted elsewhere:

```typescript
const USE_CASES = [
  {
    id: 'med-spa',
    title: 'Medical Spa Concierge',
    description: 'Automate consultations, qualify patients, and collect deposits.',
    video: 'https://your-cdn.com/videos/med-spa.mp4',  // Direct URL
    thumbnail: 'https://your-cdn.com/thumbnails/med-spa.jpg',
    duration: '0:30'
  },
  // ... rest of your videos
];
```

### ⚠️ Note on YouTube/Vimeo
The current video player expects direct video file URLs (`.mp4`, `.webm`). If you want to use YouTube or Vimeo, you'll need to:
1. Embed using their iframe players instead, OR
2. Use a library like `react-player`

---

## Option 3: Quick Test with Single Video

To test quickly, replace just one video:

```typescript
const USE_CASES = [
  {
    id: 'med-spa',
    title: 'Medical Spa Concierge',
    description: 'Automate consultations, qualify patients, and collect deposits.',
    video: '/videos/my-test-video.mp4',  // Your test video
    thumbnail: '/videos/my-test-thumbnail.jpg',
    duration: '0:30'
  },
  // ... keep the rest unchanged for now
];
```

---

## Updating Video Duration

To get the exact duration of your video:

### Option A: Check File Properties
- **Windows**: Right-click video → Properties → Details tab
- **Mac**: Right-click video → Get Info → More Info section
- **Linux**: `ffprobe -i video.mp4 -show_entries format=duration -v quiet -of csv="p=0"`

### Option B: Let Video Auto-Display
You can also dynamically show the duration. Replace the hardcoded `duration` field:

```typescript
// In the UseCase component, add state for actual duration
const [videoDuration, setVideoDuration] = useState<string>('0:00');

// Add this handler to the video element
<video
  ref={videoRef}
  key={activeCase.video}
  src={activeCase.video}
  onLoadedMetadata={() => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setVideoDuration(formatTime(duration));
    }
  }}
  // ... rest of props
/>

// Then use videoDuration instead of activeCase.duration in the UI
```

---

## File Structure After Setup

```
d:\LK-ai-portfolio\
├── public/
│   ├── videos/
│   │   ├── med-spa.mp4
│   │   ├── real-estate.mp4
│   │   ├── legal-intake.mp4
│   │   ├── recruitment.mp4
│   │   ├── hvac-service.mp4
│   │   └── thumbnails/           # Optional
│   │       ├── med-spa.jpg
│   │       ├── real-estate.jpg
│   │       └── ...
│   ├── images/
│   └── audio/
├── components/
│   └── UseCase.tsx               # ← Edit this file
└── ...
```

---

## Testing Your Videos

1. **Run locally:**
   ```bash
   npm run dev
   ```

2. **Navigate to the Industry Solutions section** on your page

3. **Click each tab** to ensure all videos load correctly

4. **Check for:**
   - ✅ Video plays when clicking the play button
   - ✅ Thumbnail shows before playing
   - ✅ Duration displays correctly
   - ✅ Video controls work (play, pause, seek, volume)
   - ✅ No console errors (press F12)

---

## Video Optimization Tips

### Compress Videos for Web
Use these tools to reduce file size without losing quality:

- **FFmpeg** (command line):
  ```bash
  ffmpeg -i input.mp4 -vcodec h264 -acodec aac -strict -2 -crf 23 output.mp4
  ```

- **Online Tools:**
  - [HandBrake](https://handbrake.fr/) (free, desktop app)
  - [Cloudinary](https://cloudinary.com/) (online, free tier)
  - [FFmpeg.wasm](https://ffmpegwasm.netlify.app/) (browser-based)

### Recommended Settings
- **Codec**: H.264 (MP4)
- **Resolution**: 1920x1080 or 2560x1440
- **Bitrate**: 2-5 Mbps for 1080p
- **Frame rate**: 25-30 fps
- **Audio**: AAC, 128kbps

---

## Deployment to Vercel

After adding videos locally:

1. **Commit your changes:**
   ```bash
   git add public/videos/
   git add components/UseCase.tsx
   git commit -m "Add custom industry solution videos"
   ```

2. **Push to your repository:**
   ```bash
   git push origin main
   ```

3. **Vercel auto-deploys** - your videos will be live in 1-2 minutes!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Video doesn't load** | Check file path - must be `/videos/filename.mp4` (starts with `/`) |
| **Black screen** | Video format may not be supported - convert to MP4 H.264 |
| **Slow loading** | Compress video file size (see optimization tips above) |
| **Duration shows wrong** | Update the `duration` field in USE_CASES array |
| **Thumbnail doesn't show** | Ensure thumbnail URL is valid and accessible |

---

## Need Different Video Players?

If you want to use YouTube/Vimeo or need different video features, consider:
- **react-player**: Supports YouTube, Vimeo, Facebook, Twitch, etc.
- **Plyr**: Customizable HTML5 video player
- **Video.js**: Advanced HTML5 video player

Let me know if you need help integrating any of these!
