import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { Tiles } from './ui/Tiles';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = "https://vapi-public-assets.s3.amazonaws.com/0014e366-508b-4b67-9c9f-3211516e8b7c.mp3";

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Stop other audios
      document.querySelectorAll('audio').forEach(el => {
        if (el !== audioRef.current) el.pause();
      });

      if (audioRef.current.readyState === 0) {
        setIsLoading(true);
        audioRef.current.load();
      }

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        setIsLoading(true);
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(e => {
            console.error("Audio play failed:", e);
            setIsLoading(false);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleEnded = () => setIsPlaying(false);
  const handlePlay = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };
  const handleError = () => {
    const err = audioRef.current?.error;
    console.error("Hero demo audio error:", err);
    setIsLoading(false);
    setIsPlaying(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden bg-brand-dark" aria-label="Hero Section">
      {/* Hidden Audio Tag for better format recognition */}
      <audio 
        ref={audioRef}
        onEnded={handleEnded}
        onPlay={handlePlay}
        onError={handleError}
        preload="none"
        src={audioUrl}
      >
        <source src={audioUrl} type="audio/mpeg" />
      </audio>

      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-brand-dark/90 z-10" /> 
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-15 grayscale blur-sm"
          src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4"
        >
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/60 to-brand-dark z-10" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-auto opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-dark/80 z-10 pointer-events-none" />
        <Tiles rows={50} cols={20} />
      </div>

      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none z-0" 
        aria-hidden="true" 
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="z-10 text-center max-w-5xl mx-auto px-6 relative pointer-events-none">
        <div className="pointer-events-auto">
          <Reveal width="100%" yOffset={10} duration={0.8} blurStrength={4}>
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-[11px] font-bold uppercase tracking-widest text-brand-orange backdrop-blur-sm shadow-[0_0_15px_rgba(255,87,34,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                Voice AI & Automation
              </div>
            </div>
          </Reveal>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white flex flex-col items-center">
            <Reveal width="fit-content" delay={0.2} yOffset={25} duration={1.2} blurStrength={10}>
              <span>Engineering The</span>
            </Reveal>
            <Reveal width="fit-content" delay={0.4} yOffset={25} duration={1.2} blurStrength={10}>
              <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-br from-brand-orange via-brand-orange to-orange-200 inline-block">
                Invisible Workforce.
              </span>
            </Reveal>
          </h1>

          <Reveal width="100%" delay={0.6} yOffset={20} duration={1.4} blurStrength={6}>
            <p className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              I engineer autonomous AI workforces for aesthetic clinics. My systems handle patient intake, scheduling, and sales with human-like empathy—scaling your revenue 24/7 without adding front-desk headcount.
            </p>
          </Reveal>

          <Reveal width="100%" delay={0.8} yOffset={15} duration={1.0} blurStrength={4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-sm font-bold text-sm hover:bg-[#f0f0f0] transition-all w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-lg shadow-white/5 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,87,34,0.3)] active:scale-95 duration-300">
                <Calendar size={16} className="mb-0.5 transition-transform group-hover:rotate-12" aria-hidden="true" />
                Book Strategy Session
              </a>
              
              <button 
                onClick={toggleAudio}
                disabled={isLoading}
                className={`group flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-sm font-bold text-sm hover:bg-white/5 transition-all w-full sm:w-auto justify-center backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white hover:border-white/50 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] duration-300 cursor-pointer disabled:opacity-50 ${isPlaying ? 'border-brand-orange/50 shadow-[0_0_15px_rgba(255,87,34,0.2)] bg-brand-orange/5' : ''}`}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={16} className="animate-spin" />
                    </motion.div>
                  ) : isPlaying ? (
                    <motion.div key="pause" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Pause size={16} fill="white" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Play size={16} fill="white" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {isLoading ? 'Loading...' : isPlaying ? 'Pause Demo' : 'Audible Demo'}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;