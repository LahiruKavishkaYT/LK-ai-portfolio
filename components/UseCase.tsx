import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Zap } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import VideoModal from './VideoModal';

const USE_CASES = [
  {
    id: 'dental-clinic',
    title: 'Dental Clinic',
    description: 'Automate consultations, qualify patients, and collect deposits.',
    vimeoId: 1162403102,
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop'
  },
  {
    id: 'ai-agency',
    title: 'AI Agency',
    description: 'Qualify buyer intent and live-transfer hot leads to closers.',
    vimeoId: 1162402990,
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop'
  },
  {
    id: 'hvac',
    title: 'Service Dispatch (HVAC)',
    description: 'Triage emergency issues and route technicians efficiently.',
    vimeoId: 1162401652,
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop'
  }
];

const UseCase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCase = USE_CASES[activeTab];

  const handlePlayClick = () => {
    setIsModalOpen(true);
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
                  className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl aspect-video lg:h-[500px] lg:aspect-auto cursor-pointer group"
                  onClick={handlePlayClick}
                >
                    <motion.div 
                        key={activeCase.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black"
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
                    </motion.div>
                </div>
            </Reveal>
        </div>
      </div>

      <VideoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vimeoId={activeCase.vimeoId}
        title={activeCase.title}
      />
    </section>
  );
};

export default UseCase;