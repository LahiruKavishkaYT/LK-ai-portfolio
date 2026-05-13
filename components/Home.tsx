import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import HowItWorks from './VoiceDemos';
import Features from './IndustrySolutions';
import Results from './ROICalculator';
import About from './About';
import Offer from './Contact';
import Footer, { FAQ, FinalCTA } from './Footer';

const Home: React.FC = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.getAttribute('href') !== '#') {
        const targetEl = document.getElementById(anchor.hash.slice(1));
        if (targetEl) {
          e.preventDefault();
          const offsetPosition = targetEl.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', position: 'relative' }}>
      {/* Ambient blobs */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: '55vw', height: '55vh',
        background: 'radial-gradient(circle at 70% 25%, rgba(77,159,255,0.10) 0%, transparent 55%)',
        pointerEvents: 'none', zIndex: 0, animation: 'float-blob 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '55vw', height: '55vh',
        background: 'radial-gradient(circle at 30% 75%, rgba(0,245,212,0.08) 0%, transparent 55%)',
        pointerEvents: 'none', zIndex: 0, animation: 'float-blob 22s ease-in-out infinite reverse',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Results />
          <HowItWorks />
          <Features />
          <About />
          <Offer />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
