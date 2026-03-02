import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Calendar, Loader2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { Tiles } from './ui/Tiles';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = "/audio/lumina-spa.wav";

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
        <source src={audioUrl} type="audio/wav" />
      </audio>

      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-brand-dark/90 z-10" /> 
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-15 grayscale blur-sm"
          src="/video/hvac.mp4"
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
                HVAC Voice AI Solutions
              </div>
            </div>
          </Reveal>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.15] text-white flex flex-col items-center">
            <Reveal width="fit-content" delay={0.2} yOffset={25} duration={1.2} blurStrength={10}>
              <span>Stop Losing <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-orange via-brand-orange to-orange-200">$1,000+</span></span>
            </Reveal>
            <Reveal width="fit-content" delay={0.4} yOffset={25} duration={1.2} blurStrength={10}>
              <span>Emergency HVAC Jobs</span>
            </Reveal>
            <Reveal width="fit-content" delay={0.6} yOffset={25} duration={1.2} blurStrength={10}>
              <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-br from-brand-orange via-brand-orange to-orange-200 inline-block">
                to Voicemail.
              </span>
            </Reveal>
          </h1>

          <Reveal width="100%" delay={0.8} yOffset={20} duration={1.4} blurStrength={6}>
            <p className="text-lg md:text-xl text-brand-text max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              I build Voice AI Receptionists specifically for HVAC businesses. My system answers 24/7, understands the difference between a routine tune-up and a blown compressor, qualifies the lead and books the appointment directly onto your calendar.
            </p>
          </Reveal>

          <Reveal width="100%" delay={1.0} yOffset={15} duration={1.0} blurStrength={4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-sm font-bold text-sm hover:bg-[#f0f0f0] transition-all w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-lg shadow-white/5 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,87,34,0.3)] active:scale-95 duration-300">
                <Calendar size={16} className="mb-0.5 transition-transform group-hover:rotate-12" aria-hidden="true" />
                Book Strategy Session
              </a>
              
              <a 
                href="tel:+18885800027"
                className="group flex items-center gap-2 bg-transparent border-2 border-brand-orange/50 text-white px-8 py-4 rounded-sm font-bold text-sm hover:bg-brand-orange/10 transition-all w-full sm:w-auto justify-center backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange hover:border-brand-orange hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(255,87,34,0.4)] duration-300 shadow-[0_0_15px_rgba(255,87,34,0.2)]"
              >
                <Phone size={16} className="transition-transform group-hover:rotate-12" aria-hidden="true" />
                 Call the AI Demo Now
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;