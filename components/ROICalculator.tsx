import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { Reveal } from './ui/Reveal';

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1], // Ease out expo
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

const ROICalculator: React.FC = () => {
  const [ticketSize, setTicketSize] = useState<number | ''>(800);
  const [missedCalls, setMissedCalls] = useState<number | ''>(50);
  const [closeRate, setCloseRate] = useState<number | ''>(30);

  const [revenueLost, setRevenueLost] = useState(0);

  // Validation Limits
  const LIMITS = {
    ticket: { min: 100, max: 10000, sliderMax: 2000 },
    calls: { min: 10, max: 1000, sliderMax: 200 },
    rate: { min: 5, max: 100, sliderMax: 60 }
  };

  useEffect(() => {
    const ticket = typeof ticketSize === 'number' ? ticketSize : 0;
    const calls = typeof missedCalls === 'number' ? missedCalls : 0;
    const rate = typeof closeRate === 'number' ? closeRate : 0;
    const lost = ticket * calls * (rate / 100);
    setRevenueLost(Math.floor(lost));
  }, [ticketSize, missedCalls, closeRate]);

  // Handlers for Ticket Size
  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setTicketSize('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) setTicketSize(num);
  };

  const handleTicketBlur = () => {
    if (ticketSize === '' || ticketSize < LIMITS.ticket.min) {
      setTicketSize(LIMITS.ticket.min);
    } else if (ticketSize > LIMITS.ticket.max) {
      setTicketSize(LIMITS.ticket.max);
    }
  };

  // Handlers for Missed Calls
  const handleCallsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setMissedCalls('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) setMissedCalls(num);
  };

  const handleCallsBlur = () => {
    if (missedCalls === '' || missedCalls < LIMITS.calls.min) {
      setMissedCalls(LIMITS.calls.min);
    } else if (missedCalls > LIMITS.calls.max) {
      setMissedCalls(LIMITS.calls.max);
    }
  };

  // Handlers for Close Rate
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setCloseRate('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) setCloseRate(num);
  };

  const handleRateBlur = () => {
    if (closeRate === '' || closeRate < LIMITS.rate.min) {
      setCloseRate(LIMITS.rate.min);
    } else if (closeRate > LIMITS.rate.max) {
      setCloseRate(LIMITS.rate.max);
    }
  };

  return (
    <section id="roi" className="py-24 px-6 max-w-4xl mx-auto" aria-labelledby="roi-heading">
      <Reveal width="100%">
        <div className="text-center mb-16">
          <h2 id="roi-heading" className="text-3xl md:text-4xl font-bold">See How Much You're <span className="text-brand-orange">Losing Right Now</span></h2>
          <p className="text-brand-text mt-4">Play with the sliders to calculate your actual revenue loss</p>
        </div>
      </Reveal>

      <Reveal width="100%" delay={0.2}>
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <motion.div 
              className="absolute -top-20 -right-20 w-96 h-96 bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none" 
              aria-hidden="true"
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Controls */}
                <div className="space-y-10">
                    {/* Slider 1 - Average Ticket Size */}
                    <div className="group">
                        <div className="flex justify-between mb-4 items-end">
                            <label htmlFor="ticket-size-input" className="text-xs font-bold tracking-widest text-brand-text group-focus-within:text-brand-orange transition-colors">AVERAGE HVAC TICKET SIZE</label>
                            <div className="flex items-center font-bold text-white text-xl border-b border-white/10 focus-within:border-brand-orange transition-colors">
                              <span className="mr-0.5" aria-hidden="true">$</span>
                              <input 
                                id="ticket-size-input"
                                type="number" 
                                value={ticketSize}
                                onChange={handleTicketChange}
                                onBlur={handleTicketBlur}
                                className="bg-transparent text-right w-24 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 focus-visible:outline-none"
                              />
                            </div>
                        </div>
                        <motion.input 
                            type="range" 
                            aria-label="Adjust average HVAC ticket size"
                            min={LIMITS.ticket.min}
                            max={LIMITS.ticket.sliderMax} 
                            step="50"
                            value={typeof ticketSize === 'number' ? Math.min(ticketSize, LIMITS.ticket.sliderMax) : 0}
                            onChange={(e) => setTicketSize(Number(e.target.value))}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full h-1.5 bg-[#222] rounded-lg appearance-none cursor-pointer accent-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                        />
                        <div className="flex justify-between text-[10px] text-brand-text/40 mt-1 font-mono" aria-hidden="true">
                           <span>${LIMITS.ticket.min}</span>
                           <span>${LIMITS.ticket.sliderMax}+</span>
                        </div>
                    </div>

                    {/* Slider 2 - Missed Calls */}
                    <div className="group">
                        <div className="flex justify-between mb-4 items-end">
                            <label htmlFor="missed-calls-input" className="text-xs font-bold tracking-widest text-brand-text group-focus-within:text-brand-orange transition-colors">MISSED CALLS A MONTH</label>
                            <div className="flex items-center font-bold text-white text-xl border-b border-white/10 focus-within:border-brand-orange transition-colors">
                                <input 
                                    id="missed-calls-input"
                                    type="number" 
                                    value={missedCalls}
                                    onChange={handleCallsChange}
                                    onBlur={handleCallsBlur}
                                    className="bg-transparent text-right w-16 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 focus-visible:outline-none"
                                />
                            </div>
                        </div>
                        <motion.input 
                            type="range"
                            aria-label="Adjust missed calls per month"
                            min={LIMITS.calls.min}
                            max={LIMITS.calls.sliderMax}
                            step="5"
                            value={typeof missedCalls === 'number' ? Math.min(missedCalls, LIMITS.calls.sliderMax) : 0}
                            onChange={(e) => setMissedCalls(Number(e.target.value))}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full h-1.5 bg-[#222] rounded-lg appearance-none cursor-pointer accent-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                        />
                         <div className="flex justify-between text-[10px] text-brand-text/40 mt-1 font-mono" aria-hidden="true">
                           <span>{LIMITS.calls.min}</span>
                           <span>{LIMITS.calls.sliderMax}+</span>
                        </div>
                    </div>

                    {/* Slider 3 - Close Rate */}
                    <div className="group">
                        <div className="flex justify-between mb-4 items-end">
                            <label htmlFor="close-rate-input" className="text-xs font-bold tracking-widest text-brand-text group-focus-within:text-brand-orange transition-colors">CLOSE RATE OF ANSWERED CALLS</label>
                            <div className="flex items-center font-bold text-white text-xl border-b border-white/10 focus-within:border-brand-orange transition-colors">
                                <input 
                                    id="close-rate-input"
                                    type="number" 
                                    value={closeRate}
                                    onChange={handleRateChange}
                                    onBlur={handleRateBlur}
                                    className="bg-transparent text-right w-16 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 focus-visible:outline-none"
                                />
                                <span className="ml-0.5" aria-hidden="true">%</span>
                            </div>
                        </div>
                        <motion.input 
                            type="range"
                            aria-label="Adjust close rate percentage"
                            min={LIMITS.rate.min}
                            max={LIMITS.rate.sliderMax}
                            step="5"
                            value={typeof closeRate === 'number' ? Math.min(closeRate, LIMITS.rate.sliderMax) : 0}
                            onChange={(e) => setCloseRate(Number(e.target.value))}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full h-1.5 bg-[#222] rounded-lg appearance-none cursor-pointer accent-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                        />
                         <div className="flex justify-between text-[10px] text-brand-text/40 mt-1 font-mono" aria-hidden="true">
                           <span>{LIMITS.rate.min}%</span>
                           <span>{LIMITS.rate.sliderMax}%</span>
                        </div>
                    </div>
                </div>

                {/* Result Card */}
                <motion.div 
                    layout
                    className="bg-[#050505] border border-white/5 rounded-2xl p-8 text-center flex flex-col items-center justify-center relative shadow-inner h-full" 
                    role="status" 
                    aria-live="polite"
                >
                    <p className="text-[10px] uppercase tracking-widest text-brand-text mb-4 font-bold">You're Losing Every Month</p>
                    <div className="text-5xl md:text-6xl font-bold text-brand-orange mb-2 tracking-tighter" aria-label={`Estimated monthly revenue lost: $${revenueLost.toLocaleString()}`}>
                        $<AnimatedNumber value={revenueLost} />
                    </div>
                    <p className="text-xs text-brand-text/60 mb-8 font-medium">That's <span className="text-white">$<AnimatedNumber value={revenueLost * 12} /></span> /year</p>
                    
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.03, backgroundColor: "#f0f0f0" }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-white text-black px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors w-full mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    >
                        Stop The Bleeding
                    </motion.a>
                </motion.div>
            </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ROICalculator;