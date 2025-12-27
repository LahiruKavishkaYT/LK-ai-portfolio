import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Zap, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, Loader2 } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const USE_CASES = [
  {
    id: 'med-spa',
    title: 'Medical Spa Concierge',
    description: 'Automate consultations, qualify patients, and collect deposits.',
    video: 'https://videos.pexels.com/video-files/4033108/4033108-uhd_2560_1440_25fps.mp4', 
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop',
    duration: '0:30'
  },
  {
    id: 'real-estate',
    title: 'Real Estate ISA',
    description: 'Qualify buyer intent and live-transfer hot leads to closers.',
    video: 'https://videos.pexels.com/video-files/8292415/8292415-uhd_2560_1440_30fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop',
    duration: '0:25'
  },
  {
    id: 'legal',
    title: 'Legal Intake Specialist',
    description: 'Screen claimants and gather incident details 24/7.',
    video: 'https://videos.pexels.com/video-files/4033116/4033116-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2670&auto=format&fit=crop',
    duration: '0:40'
  },
  {
    id: 'recruitment',
    title: 'Recruitment Screener',
    description: 'Evaluate technical requirements and culture fit at scale.',
    video: 'https://videos.pexels.com/video-files/3130203/3130203-uhd_2560_1440_30fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop',
    duration: '0:35'
  },
  {
    id: 'home-services',
    title: 'Service Dispatch (HVAC)',
    description: 'Triage emergency issues and route technicians efficiently.',
    video: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop',
    duration: '0:45'
  }
];

const SimpleTooltip: React.FC<{ children: React.ReactNode, content: string }> = ({ children, content }) => (
  <div className="group relative flex items-center">
    {children}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-black border border-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
      {content}
    </span>
  </div>
);

const UseCase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = USE_CASES[activeTab];

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setShowThumbnail(true);
    setIsBuffering(false);
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (showThumbnail) {
        setShowThumbnail(false);
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
        setIsPlaying(true);
    } else {
        if (videoRef.current.paused) {
            videoRef.current.play().catch(e => console.error("Video play failed:", e));
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || isDragging) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setProgress(percentage);
    
    const duration = videoRef.current.duration;
    if (Number.isFinite(duration)) {
        videoRef.current.currentTime = (percentage / 100) * duration;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSeek(e);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="use-cases" className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto" aria-labelledby="use-case-heading">
      <Reveal width="100%">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Zap size={12} fill="currentColor" />
                    Applied Intelligence
                </div>
                <h2 id="use-case-heading" className="text-3xl md:text-5xl font-bold mb-4 text-white">
                    Industry Solutions
                </h2>
                <p className="text-brand-text font-light max-w-xl">
                    Deploy specialized agents that understand the nuance of your workflow.
                </p>
            </div>
        </div>
      </Reveal>

      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
        <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {USE_CASES.map((useCase, index) => (
                <button
                    key={useCase.id}
                    onClick={() => setActiveTab(index)}
                    className={`relative p-6 text-left rounded-xl transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                        activeTab === index ? 'text-white' : 'text-brand-text hover:text-white'
                    }`}
                >
                    {activeTab === index && (
                        <motion.div
                            layoutId="activeUseCase"
                            className="absolute inset-0 bg-[#111] border border-white/10 rounded-xl"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10 flex flex-col gap-1">
                        <span className="font-bold text-lg">{useCase.title}</span>
                        <span className={`text-sm font-light transition-colors ${activeTab === index ? 'text-white/70' : 'text-brand-text/50 group-hover:text-white/50'}`}>
                            {useCase.description}
                        </span>
                    </span>
                </button>
            ))}
        </div>

        <div className="w-full lg:w-2/3">
            <Reveal width="100%" delay={0.2}>
                <div 
                  ref={containerRef}
                  className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl aspect-video lg:h-[500px] lg:aspect-auto group/video"
                >
                    
                    <AnimatePresence mode="wait">
                        {showThumbnail && (
                             <motion.div 
                                key="thumbnail"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-black cursor-pointer group"
                                onClick={togglePlay}
                             >
                                 <img 
                                    src={activeCase.thumbnail} 
                                    alt={activeCase.title} 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
                                 />
                                 
                                 <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300 shadow-2xl">
                                        <Play size={32} fill="white" className="ml-1 text-white" />
                                     </div>
                                 </div>

                                 <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded text-xs font-mono text-white/90">
                                     {activeCase.duration}
                                 </div>
                             </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isBuffering && !showThumbnail && (
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                             >
                                 <div className="p-3 bg-black/40 backdrop-blur-sm rounded-full">
                                     <Loader2 size={32} className="text-brand-orange animate-spin" />
                                 </div>
                             </motion.div>
                        )}
                    </AnimatePresence>

                    <video
                        ref={videoRef}
                        key={activeCase.video}
                        src={activeCase.video}
                        className="w-full h-full object-cover"
                        loop
                        playsInline
                        onTimeUpdate={handleTimeUpdate}
                        onClick={togglePlay}
                        onWaiting={() => setIsBuffering(true)}
                        onPlaying={() => setIsBuffering(false)}
                        onCanPlay={() => setIsBuffering(false)}
                    />

                    <AnimatePresence>
                        {!showThumbnail && !isPlaying && !isBuffering && (
                             <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                             >
                                 <div className="p-4 bg-black/40 backdrop-blur-sm rounded-full">
                                     <Pause size={32} fill="white" className="text-white" />
                                 </div>
                             </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {!showThumbnail && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-300 opacity-0 group-hover/video:opacity-100 focus-within:opacity-100">
                            <div 
                                className="h-10 flex items-center cursor-pointer group/progress"
                                ref={progressBarRef}
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerLeave={handlePointerUp}
                            >
                                <div className="w-full h-1 bg-white/20 rounded-full overflow-visible relative group-hover/progress:h-1.5 transition-all">
                                    <div 
                                        className="h-full bg-brand-orange rounded-full relative" 
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between -mt-2">
                                <div className="flex items-center gap-4">
                                    <SimpleTooltip content={isPlaying ? "Pause" : "Play"}>
                                        <button 
                                            onClick={togglePlay}
                                            className="text-white hover:text-brand-orange transition-colors focus-visible:outline-none"
                                            aria-label={isPlaying ? "Pause video" : "Play video"}
                                        >
                                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                        </button>
                                    </SimpleTooltip>

                                    <div className="group/volume flex items-center gap-2 relative">
                                        <SimpleTooltip content={isMuted ? "Unmute" : "Mute"}>
                                            <button 
                                                onClick={() => setIsMuted(!isMuted)}
                                                className="text-white hover:text-brand-orange transition-colors focus-visible:outline-none"
                                            >
                                                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                            </button>
                                        </SimpleTooltip>
                                        
                                        <div className="w-0 overflow-hidden group-hover/volume:w-24 group-focus-within/volume:w-24 transition-all duration-300 ease-in-out flex items-center">
                                            <input 
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={isMuted ? 0 : volume}
                                                onChange={(e) => {
                                                    setVolume(parseFloat(e.target.value));
                                                    setIsMuted(parseFloat(e.target.value) === 0);
                                                }}
                                                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:accent-brand-orange focus-visible:outline-none"
                                            />
                                        </div>
                                    </div>
                                    
                                    <span className="text-xs font-mono text-white/70 tabular-nums select-none">
                                        {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"} / {activeCase.duration}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                     <SimpleTooltip content="Restart">
                                        <button 
                                            onClick={() => {
                                                if (videoRef.current) videoRef.current.currentTime = 0;
                                            }}
                                            className="text-white hover:text-brand-orange transition-colors"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                    </SimpleTooltip>

                                    <SimpleTooltip content={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                                        <button 
                                            onClick={toggleFullscreen}
                                            className="text-white hover:text-brand-orange transition-colors"
                                            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                        >
                                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                        </button>
                                    </SimpleTooltip>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Reveal>
        </div>
      </div>
    </section>
  );
};

export default UseCase;