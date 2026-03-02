import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface Scenario {
  id: string;
  title: string;
  description: string;
  vimeoId: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'on-brand',
    title: 'Stays on-brand, never wastes a dispatcher\'s time',
    description: 'Caller gives a zip outside the service area, the agent handles it cleanly.',
    vimeoId: '1169439543'
  },
  {
    id: 'quotes-fees',
    title: 'Quotes fees confidently, no human needed',
    description: 'Agent states the $89 service fee clearly and moves the caller to booking.',
    vimeoId: '1169438993'
  },
  {
    id: 'escalation',
    title: 'Knows when to escalate — zero risk',
    description: 'Gas smell detected mid-call agent escalates immediately, no hesitation.',
    vimeoId: '1169439609'
  },
  {
    id: 'frustrated-customers',
    title: 'Handles frustrated customers without breaking',
    description: 'Angry caller, raised tone agent stays calm and keeps the conversation on track.',
    vimeoId: '1169448912'
  },
  {
    id: 'graceful-fallback',
    title: 'Graceful fallback, caller never notices',
    description: 'Tool call fails silently agent recovers and continues without dropping the call.',
    vimeoId: '1169450770'
  },
  {
    id: 'end-to-end',
    title: 'End-to-end booking, no handoff required',
    description: 'Full appointment booking completed by the agent, zero dispatcher involvement.',
    vimeoId: '1169439250'
  }
];

const IndustrySolutions: React.FC = () => {
  // Desktop: first card active by default
  const [activeIndex, setActiveIndex] = useState(0);
  // Mobile: all cards collapsed by default
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);

  const getDesktopVimeoUrl = (vimeoId: string) =>
    `https://player.vimeo.com/video/${vimeoId}?autoplay=0&muted=0&title=0&byline=0&portrait=0&badge=0`;

  const getMobileVimeoUrl = (vimeoId: string) =>
    `https://player.vimeo.com/video/${vimeoId}?autoplay=0&muted=0&playsinline=1&title=0&byline=0&portrait=0&badge=0`;

  const handleMobileCardClick = (index: number) => {
    setMobileOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="industry-solutions" className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto" aria-labelledby="industry-solutions-heading">
      <Reveal width="100%">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-4">
            ⚡ HVAC AGENTS · USA
          </div>
          <h2 id="industry-solutions-heading" className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Hear It Handle the Hard Stuff
          </h2>
          <p className="text-brand-text font-light max-w-xl">
            Real calls. Real scenarios. No actors.
          </p>
        </div>
      </Reveal>

      {/* ── Mobile accordion layout (hidden on lg+) ── */}
      <div className="block lg:hidden flex flex-col gap-3">
        {SCENARIOS.map((scenario, index) => {
          const isOpen = mobileOpenIndex === index;
          return (
            <div
              key={scenario.id}
              className={`
                rounded-xl px-5 py-4 cursor-pointer border-l-4 transition-all duration-150
                ${isOpen
                  ? 'bg-zinc-800 border-brand-orange'
                  : 'bg-zinc-900 border-transparent hover:bg-zinc-800/60'
                }
              `}
              onClick={() => handleMobileCardClick(index)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm transition-colors duration-150 ${isOpen ? 'text-white' : 'text-gray-400'}`}>
                    {scenario.title}
                  </h3>
                  <p className={`text-xs mt-1 transition-colors duration-150 ${isOpen ? 'text-gray-400' : 'text-gray-500'}`}>
                    {scenario.description}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`shrink-0 mt-0.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {/* Video — only mounted when open; removing from DOM stops audio */}
              {isOpen && (
                <div className="mt-3 rounded-xl overflow-hidden aspect-video transition-all duration-200 ease-in-out">
                  <iframe
                    key={`mobile-${index}`}
                    src={getMobileVimeoUrl(scenario.vimeoId)}
                    allow="fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                    title={scenario.title}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Desktop split layout (hidden below lg) ── */}
      <div className="hidden lg:grid grid-cols-5 gap-12">
        {/* Left Panel — cards (40%) */}
        <div className="col-span-2 flex flex-col gap-3">
          {SCENARIOS.map((scenario, index) => (
            <div
              key={scenario.id}
              onClick={() => setActiveIndex(index)}
              className={`
                rounded-xl px-5 py-4 cursor-pointer transition-all duration-150
                border-l-4
                ${activeIndex === index
                  ? 'bg-zinc-800 border-brand-orange'
                  : 'bg-zinc-900 border-transparent hover:bg-zinc-800/60'
                }
              `}
            >
              <h3 className={`font-semibold text-base transition-colors duration-150 ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>
                {scenario.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {scenario.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Panel — video (60%) */}
        <div className="col-span-3">
          <Reveal width="100%" delay={0.2}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="relative rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl aspect-video"
            >
              <iframe
                key={`desktop-${activeIndex}`}
                src={getDesktopVimeoUrl(SCENARIOS[activeIndex].vimeoId)}
                className="w-full h-full"
                allow="fullscreen"
                allowFullScreen
                title={SCENARIOS[activeIndex].title}
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
