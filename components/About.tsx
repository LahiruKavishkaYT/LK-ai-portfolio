import React from 'react';
import { Reveal } from './ui/Reveal';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto" aria-labelledby="about-heading">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <Reveal>
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0" aria-hidden="true">
            <div className="absolute inset-0 bg-brand-card border border-brand-border rounded-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/lahiru.png" 
                  alt="Lahiru Kavishka" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/20 to-transparent mix-blend-overlay"></div>
            </div>
            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-orange/20 blur-2xl rounded-full"></div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div>
            <h2 id="about-heading" className="text-4xl font-bold mb-6">Hi, I'm <span className="text-brand-orange">Lahiru Kavishka</span></h2>
            <p className="text-xl font-medium text-white mb-6">
              I build <span className="text-brand-orange">Voice AI Agents</span> for businesses to enhance their sales and customer handling.
            </p>
            <div className="space-y-6 text-brand-text leading-relaxed">
              <p>
                I help businesses scale their operations without scaling their headcount. My AI agents don't just answer calls; they understand context, handle objections, and close deals just like your best human employees—but at a fraction of the cost and with zero downtime.
              </p>
              <p>
                From qualifying leads to scheduling appointments and resolving support tickets, I build custom voice infrastructure that integrates seamlessly with your existing CRM. The result? You stop losing leads to voicemail and start capturing every opportunity, day or night.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;