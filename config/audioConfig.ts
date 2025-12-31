// Audio Configuration for Voice Demos
// Update these URLs based on where you store your audio files

export const AUDIO_CONFIG = {
  // Option 1: Local audio files (place in /public/audio/)
  useLocalAudio: true, // Set to true when you add local files
  
  // Option 2: External hosting (S3, Cloudinary, etc.)
  useExternalAudio: false,
  
  demos: {
    realEstate: {
      // Local path (when useLocalAudio = true)
      local: '/audio/property-acquisition-specialist.wav',
      // External URL (when useExternalAudio = true)
      external: 'https://vapi-public-assets.s3.amazonaws.com/97e9375b-9d2a-4384-95e2-63b7720963d7.mp3',
      // Fallback URL
      fallback: '/audio/placeholder.mp3'
    },
    medSpa: {
      local: '/audio/lumina-spa.wav',
      external: 'https://vapi-public-assets.s3.amazonaws.com/0014e366-508b-4b67-9c9f-3211516e8b7c.mp3',
      fallback: '/audio/placeholder.mp3'
    }
  }
};

// Helper function to get the appropriate audio URL
export const getAudioUrl = (demoName: keyof typeof AUDIO_CONFIG.demos): string => {
  const demo = AUDIO_CONFIG.demos[demoName];
  
  if (AUDIO_CONFIG.useLocalAudio) {
    return demo.local;
  }
  
  if (AUDIO_CONFIG.useExternalAudio) {
    return demo.external;
  }
  
  return demo.fallback;
};

// Upload your audio files here:
// 1. AWS S3: https://aws.amazon.com/s3/
// 2. Cloudinary: https://cloudinary.com/
// 3. Firebase Storage: https://firebase.google.com/docs/storage
// 4. Vercel Blob: https://vercel.com/docs/storage/vercel-blob
// 5. Local /public folder for development
