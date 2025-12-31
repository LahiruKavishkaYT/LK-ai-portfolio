# Audio Files Directory

## Instructions

Place your voice AI demo audio files here:

1. **property-acquisition-specialist.wav** - Real Estate Acquisition demo
2. **med-spa-demo.mp3** - Medical Spa demo

## Recommended Audio Specifications

- Format: MP3 (best compatibility)
- Bitrate: 128kbps - 192kbps
- Duration: 20-60 seconds
- Size: Keep under 2MB per file

## Where to Get Audio Demos

### Option 1: Record Real Calls
- Use VAPI, Bland AI, or Retell AI platforms
- Export actual demo calls

### Option 2: Generate with AI Voice
- **ElevenLabs**: https://elevenlabs.io
- **Resemble AI**: https://www.resemble.ai
- **Play.ht**: https://play.ht
- **Google Cloud TTS**: https://cloud.google.com/text-to-speech

### Option 3: Placeholder Samples
Until you have real demos, you can use:
- https://www.soundjay.com/
- https://freesound.org/
- Record your own placeholder

## Usage

Once files are placed here, update VoiceDemos.tsx:

```tsx
audioUrl="/audio/real-estate-demo.mp3"
audioUrl="/audio/med-spa-demo.mp3"
```
