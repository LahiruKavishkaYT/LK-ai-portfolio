import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Home, Activity, HeartPulse, Loader2, RotateCcw } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { VoiceDemoProps } from '../types';
import { getAudioUrl } from '../config/audioConfig';

const VoiceCard: React.FC<VoiceDemoProps> = ({ icon: Icon, title, subtitle, quote, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause all other audio elements on the page
      document.querySelectorAll('audio').forEach(el => {
        if (el !== audioRef.current) {
          el.pause();
        }
      });

      // If we previously had an error or it's not loaded, try re-triggering load
      if (loadError || audioRef.current.readyState === 0) {
        setIsLoading(true);
        setLoadError(false);
        // Force a reload with cache buster if it failed before
        if (loadError) {
          audioRef.current.src = `${audioUrl}?t=${Date.now()}`;
        }
        audioRef.current.load();
      }

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        setIsLoading(true);
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
            setRetryCount(0);
          })
          .catch(e => {
            console.error(`Playback failed for ${title}:`, e);
            setIsLoading(false);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleRetry = () => {
    setLoadError(false);
    setRetryCount(prev => prev + 1);
    if (audioRef.current) {
      audioRef.current.src = `${audioUrl}?retry=${retryCount}`;
      audioRef.current.load();
    }
  };

  const handleEnded = () => setIsPlaying(false);
  const handlePlay = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };
  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.currentTarget;
    const err = target.error;
    let msg = "Unknown error";
    if (err) {
      switch (err.code) {
        case 1: msg = "Aborted"; break;
        case 2: msg = "Network error"; break;
        case 3: msg = "Decoding error"; break;
        case 4: msg = "Format not supported or server unreachable"; break;
      }
    }
    console.error(`Audio failed for ${title}: ${msg}`, err);
    setLoadError(true);
    setIsLoading(false);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-6 md:p-8 rounded-xl relative overflow-hidden hover:border-brand-orange/20 transition-all group">
      {/* Hidden Audio Element with explicit type hint for S3 assets */}
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

      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#111] rounded-lg border border-white/5 text-brand-orange">
            <Icon size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base md:text-lg">{title}</h3>
            <p className="text-[10px] uppercase tracking-widest text-brand-text/60 font-semibold">{subtitle}</p>
          </div>
        </div>
        {(isPlaying || isLoading) && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-1.5 text-brand-orange text-[10px] font-bold tracking-widest"
          >
            {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Activity size={12} className="animate-pulse" />}
            {isLoading ? 'LOADING' : 'LIVE'}
          </motion.div>
        )}
      </div>

      <div className="bg-[#111] rounded-lg p-4 mb-6 border border-white/5 flex items-center gap-6">
        <motion.button 
          onClick={toggleAudio}
          disabled={isLoading}
          aria-label={isPlaying ? `Pause ${title} demo` : `Play ${title} demo`}
          className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(255,87,34,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
          whileHover={{ scale: 1.05, backgroundColor: "#e64a19" }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 size={16} className="animate-spin" />
              </motion.div>
            ) : isPlaying ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <Pause size={16} fill="white" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <Play size={16} fill="white" className="ml-0.5" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        <div className="flex-1 flex items-center gap-1.5 h-12 px-2" aria-hidden="true">
          {[...Array(24)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-1 rounded-full"
              initial={false}
              animate={isPlaying ? {
                height: [8, 12 + ((i * 5 + i * i) % 24), 8], 
                opacity: 1,
                backgroundColor: "#FF5722"
              } : {
                height: 4,
                opacity: 0.3,
                backgroundColor: "#333"
              }}
              transition={isPlaying ? {
                duration: 0.4 + ((i * 13) % 5) * 0.1, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.02 
              } : {
                duration: 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative pl-4 border-l-2 border-brand-orange/50">
        <p className="text-sm text-brand-text italic leading-relaxed">"{quote}"</p>
        {loadError && (
          <div className="flex items-center gap-2 mt-3">
            <p className="text-[10px] text-red-500">Error loading audio.</p>
            <button 
              onClick={handleRetry}
              className="text-[10px] text-brand-orange hover:text-white transition-colors flex items-center gap-1 border border-brand-orange/30 px-2 py-1 rounded hover:bg-brand-orange/10"
              aria-label="Retry loading audio"
            >
              <RotateCcw size={10} />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const VoiceDemos: React.FC = () => {
  return (
    <section id="demos" className="py-24 px-6 max-w-6xl mx-auto" aria-labelledby="voice-capabilities-heading">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
        <Reveal>
          <div>
            <h2 id="voice-capabilities-heading" className="text-3xl md:text-4xl font-bold mb-3 text-white">Voice Capabilities</h2>
            <p className="text-brand-text text-sm md:text-base font-light">Latency under 500ms. Human emotion analysis.</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF4444] uppercase tracking-widest bg-[#FF4444]/10 px-3 py-1.5 rounded-full border border-[#FF4444]/20">
            <span className="text-lg leading-none mb-0.5" aria-hidden="true">+</span> LIVE SYSTEMS
          </div>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal delay={0.2}>
          <VoiceCard 
            icon={Home}
            title="Real Estate Acquisition"
            subtitle="Inbound Qualification"
            quote="The agent negotiates price based on condition, schedules the inspection, and updates the CRM instantly."
            audioUrl={getAudioUrl('realEstate')}
          />
        </Reveal>
        <Reveal delay={0.4}>
          <VoiceCard 
            icon={HeartPulse}
            title="Lumina Med Spa"
            subtitle="Clinical Triage & Scheduling"
            quote="Handles service selection, availability checking, and instant triage for clinical appointments."
            audioUrl={getAudioUrl('medSpa')}
          />
        </Reveal>
      </div>
    </section>
  );
};

export default VoiceDemos;