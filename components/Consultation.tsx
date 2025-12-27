import React from 'react';
import { Reveal } from './ui/Reveal';

const Consultation: React.FC = () => {
  return (
    <section id="consultation" className="py-24 px-6 max-w-4xl mx-auto" aria-labelledby="consultation-heading">
      <Reveal width="100%">
        <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-3 justify-center">
              <div className="h-px w-8 bg-brand-orange" aria-hidden="true"></div>
              <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Consultation</span>
              <div className="h-px w-8 bg-brand-orange" aria-hidden="true"></div>
            </div>
            
            <h2 id="consultation-heading" className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              2 of 5 slots<br />available.
            </h2>
            
            <p className="text-3xl font-serif italic text-white/40 mb-12">$3,000/mo</p>
            
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 md:p-12 w-full max-w-2xl relative overflow-hidden shadow-2xl">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] rounded-full pointer-events-none" aria-hidden="true"></div>

                <h3 className="font-bold text-white mb-8 text-xl">Designed for founders who:</h3>
                <ul className="space-y-6 text-left max-w-lg mx-auto">
                  <li className="flex items-start gap-4 text-brand-text text-sm md:text-base">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0 shadow-[0_0_8px_rgba(255,87,34,0.5)]" aria-hidden="true"></span>
                    <span>Are generating over <span className="text-white font-semibold">$1M in annual revenue</span> and ready to scale.</span>
                  </li>
                  <li className="flex items-start gap-4 text-brand-text text-sm md:text-base">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0 shadow-[0_0_8px_rgba(255,87,34,0.5)]" aria-hidden="true"></span>
                    <span>Need a strategic partner, not just a freelancer.</span>
                  </li>
                  <li className="flex items-start gap-4 text-brand-text text-sm md:text-base">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0 shadow-[0_0_8px_rgba(255,87,34,0.5)]" aria-hidden="true"></span>
                    <span>Understand that automation is an asset, not an expense.</span>
                  </li>
                </ul>
            </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Consultation;