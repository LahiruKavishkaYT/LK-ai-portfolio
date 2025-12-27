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
  const [callVolume, setCallVolume] = useState<number | ''>(1000);
  const [humanCost, setHumanCost] = useState<number | ''>(5);
  const aiCost = 0.12;

  const [savings, setSavings] = useState(0);

  // Validation Limits
  const LIMITS = {
    volume: { min: 100, max: 50000, sliderMax: 5000 },
    cost: { min: 1, max: 100, sliderMax: 20 }
  };

  useEffect(() => {
    const vol = typeof callVolume === 'number' ? callVolume : 0;
    const cost = typeof humanCost === 'number' ? humanCost : 0;
    const humanTotal = vol * cost;
    const aiTotal = vol * aiCost;
    setSavings(Math.floor(humanTotal - aiTotal));
  }, [callVolume, humanCost]);

  // Handlers for Call Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setCallVolume('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) setCallVolume(num);
  };

  const handleVolumeBlur = () => {
    if (callVolume === '' || callVolume < LIMITS.volume.min) {
      setCallVolume(LIMITS.volume.min);
    } else if (callVolume > LIMITS.volume.max) {
      setCallVolume(LIMITS.volume.max);
    }
  };

  // Handlers for Human Cost
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setHumanCost('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) setHumanCost(num);
  };

  const handleCostBlur = () => {
    if (humanCost === '' || humanCost < LIMITS.cost.min) {
      setHumanCost(LIMITS.cost.min);
    } else if (humanCost > LIMITS.cost.max) {
      setHumanCost(LIMITS.cost.max);
    }
  };

  return (
    <section id="roi" className="py-24 px-6 max-w-4xl mx-auto" aria-labelledby="roi-heading">
      <Reveal width="100%">
        <div className="text-center mb-16">
          <h2 id="roi-heading" className="text-3xl md:text-4xl font-bold">The Cost of <span className="text-brand-orange">Inaction</span></h2>
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
                    {/* Slider 1 */}
                    <div className="group">
                        <div className="flex justify-between mb-4 items-end">
                            <label htmlFor="call-volume-input" className="text-xs font-bold tracking-widest text-brand-text group-focus-within:text-brand-orange transition-colors">MONTHLY CALL VOLUME</label>
                            <div className="flex items-center font-bold text-white text-xl border-b border-white/10 focus-within:border-brand-orange transition-colors">
                              <input 
                                id="call-volume-input"
                                type="number" 
                                value={callVolume}
                                onChange={handleVolumeChange}
                                onBlur={handleVolumeBlur}
                                className="bg-transparent text-right w-24 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 focus-visible:outline-none"
                              />
                            </div>
                        </div>
                        <motion.input 
                            type="range" 
                            aria-label="Adjust monthly call volume"
                            min={LIMITS.volume.min}
                            max={LIMITS.volume.sliderMax} 
                            step="100"
                            value={typeof callVolume === 'number' ? Math.min(callVolume, LIMITS.volume.sliderMax) : 0}
                            onChange={(e) => setCallVolume(Number(e.target.value))}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full h-1.5 bg-[#222] rounded-lg appearance-none cursor-pointer accent-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                        />
                        <div className="flex justify-between text-[10px] text-brand-text/40 mt-1 font-mono" aria-hidden="true">
                           <span>{LIMITS.volume.min}</span>
                           <span>{LIMITS.volume.sliderMax}+</span>
                        </div>
                    </div>

                    {/* Slider 2 */}
                    <div className="group">
                        <div className="flex justify-between mb-4 items-end">
                            <label htmlFor="human-cost-input" className="text-xs font-bold tracking-widest text-brand-text group-focus-within:text-brand-orange transition-colors">HUMAN COST / CALL</label>
                            <div className="flex items-center font-bold text-white text-xl border-b border-white/10 focus-within:border-brand-orange transition-colors">
                                <span className="mr-0.5" aria-hidden="true">$</span>
                                <input 
                                    id="human-cost-input"
                                    type="number" 
                                    value={humanCost}
                                    onChange={handleCostChange}
                                    onBlur={handleCostBlur}
                                    className="bg-transparent text-right w-16 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 focus-visible:outline-none"
                                />
                            </div>
                        </div>
                        <motion.input 
                            type="range"
                            aria-label="Adjust human cost per call"
                            min={LIMITS.cost.min}
                            max={LIMITS.cost.sliderMax}
                            step="0.5"
                            value={typeof humanCost === 'number' ? Math.min(humanCost, LIMITS.cost.sliderMax) : 0}
                            onChange={(e) => setHumanCost(Number(e.target.value))}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full h-1.5 bg-[#222] rounded-lg appearance-none cursor-pointer accent-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                        />
                         <div className="flex justify-between text-[10px] text-brand-text/40 mt-1 font-mono" aria-hidden="true">
                           <span>${LIMITS.cost.min}</span>
                           <span>${LIMITS.cost.sliderMax}+</span>
                        </div>
                    </div>

                    {/* Constant */}
                    <div className="flex justify-between items-center py-4 border-t border-white/5">
                        <span className="text-xs font-bold text-brand-text/50 uppercase tracking-wider">AI Cost Per Call</span>
                        <span className="font-mono text-white text-lg font-bold" aria-label={`$${aiCost}`}>${aiCost}</span>
                    </div>
                </div>

                {/* Result Card */}
                <motion.div 
                    layout
                    className="bg-[#050505] border border-white/5 rounded-2xl p-8 text-center flex flex-col items-center justify-center relative shadow-inner h-full" 
                    role="status" 
                    aria-live="polite"
                >
                    <p className="text-[10px] uppercase tracking-widest text-brand-text mb-4 font-bold">Projected Monthly Savings</p>
                    <div className="text-5xl md:text-6xl font-bold text-brand-orange mb-2 tracking-tighter" aria-label={`Estimated monthly savings: $${savings.toLocaleString()}`}>
                        $<AnimatedNumber value={savings} />
                    </div>
                    <p className="text-xs text-brand-text/60 mb-8 font-medium">That's <span className="text-white">$<AnimatedNumber value={savings * 12} /></span> /year</p>
                    
                    <motion.button 
                        whileHover={{ scale: 1.03, backgroundColor: "#f0f0f0" }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-white text-black px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors w-full mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    >
                        Reclaim Revenue
                    </motion.button>
                </motion.div>
            </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ROICalculator;