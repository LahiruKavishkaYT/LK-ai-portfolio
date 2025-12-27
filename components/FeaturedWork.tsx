import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Play, Pause, Zap, Activity, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { CaseStudyProps } from '../types';

const CaseStudyCard: React.FC<CaseStudyProps & { extraLabel?: React.ReactNode, audioUrl?: string }> = ({ 
  category, subCategory, title, description, image, linkText, isReversed, extraLabel, audioUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleActionClick = () => {
    if (linkText === "Hear Interaction" && audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Stop all other audios
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
              console.error("Featured work audio playback failed:", e);
              setIsLoading(false);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const handleEnded = () => setIsPlaying(false);
  const handlePlay = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };
  const handleError = () => {
    setIsLoading(false);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden mb-12 group hover:border-white/10 transition-all">
      {audioUrl && (
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
      )}

      <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        <div className="lg:w-[55%] relative min-h-[300px] lg:min-h-[450px] overflow-hidden bg-[#111]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0A0A0A]/50" aria-hidden="true" />
            
            <img 
              src={image} 
              alt={`${title} Interface Preview`} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            
            <div className="absolute inset-0 border border-white/5 m-4 rounded-lg pointer-events-none z-20" aria-hidden="true" />
            
            <div className="absolute bottom-6 right-6 z-20" aria-hidden="true">
               <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-xs text-white/50 border border-white/10">
                 {isLoading ? <Loader2 size={12} className="animate-spin text-brand-orange" /> : isPlaying ? <Activity size={12} className="text-brand-orange animate-pulse" /> : "ai"}
               </div>
            </div>
        </div>

        <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center bg-[#0A0A0A]">
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 bg-[#151515] border border-white/5 rounded text-[10px] uppercase tracking-wider font-bold text-brand-text">
              {category}
            </span>
            <span className="px-3 py-1 bg-[#2A1510] border border-brand-orange/20 rounded text-[10px] uppercase tracking-wider font-bold text-brand-orange">
              {subCategory}
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-brand-text mb-8 leading-relaxed text-sm md:text-base font-light">
            {description}
          </p>

          <div className="flex items-center gap-6">
            <button 
              onClick={handleActionClick}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:opacity-50 ${linkText === "Hear Interaction" ? (isPlaying ? "bg-brand-orange text-white" : "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black") : "bg-white text-black hover:bg-gray-200"}`}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 size={14} className="animate-spin" />
                  </motion.div>
                ) : linkText === "Hear Interaction" ? (
                  <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {isLoading ? "Loading..." : isPlaying ? "Pause Demo" : linkText}
              {linkText !== "Hear Interaction" && <ArrowUpRight size={14} aria-hidden="true" />}
            </button>
            
            {extraLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedWork: React.FC = () => {
  return (
    <section id="work" className="py-20 px-6 max-w-6xl mx-auto" aria-labelledby="featured-work-heading">
      <div className="text-center mb-16">
        <Reveal width="100%">
          <h2 id="featured-work-heading" className="text-3xl font-bold mb-4">Featured Architecture</h2>
        </Reveal>
      </div>

      <Reveal width="100%" delay={0.2}>
        <CaseStudyCard 
          category="Strategy"
          subCategory="Webflow"
          title="Bhanuka Harischandra"
          description="A digital command center for a Forbes 30 Under 30 entrepreneur. We engineered a content repurposing engine that automatically distributes YouTube transcripts to newsletters, saving 15 hours/week."
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
          linkText="Visit Site"
          linkHref="#"
          extraLabel={
            <div className="flex items-center gap-2 text-xs font-medium text-brand-text/60">
              <Zap size={14} className="text-brand-orange" fill="#FF5722" aria-hidden="true" />
              Automated Pipeline
            </div>
          }
        />
      </Reveal>

      <Reveal width="100%" delay={0.4}>
        <CaseStudyCard 
          category="Healthcare"
          subCategory="Voice AI"
          title="Apex Dental Reception"
          description="Deployed a Vapi-powered voice agent that answers 100% of missed calls. Integrated with OpenDental to book appointments in real-time, recovering $15k/mo in revenue."
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
          linkText="Hear Interaction"
          linkHref="#"
          isReversed={true}
          audioUrl="https://vapi-public-assets.s3.amazonaws.com/0014e366-508b-4b67-9c9f-3211516e8b7c.mp3"
        />
      </Reveal>
    </section>
  );
};

export default FeaturedWork;