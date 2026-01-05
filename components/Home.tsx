import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import VoiceDemos from './VoiceDemos';
import UseCase from './UseCase';
import ROICalculator from './ROICalculator';
import Feedback from './Feedback';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
  // Global Smooth Scroll Handler for all internal links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the nearest parent anchor tag
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.getAttribute('href') !== '#') {
        const targetId = anchor.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Calculate offset position for the fixed header
          const navHeight = 80; // Standard navbar height
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Optionally update URL without jump
          window.history.pushState(null, '', anchor.hash);
        }
      } else if (anchor && anchor.getAttribute('href') === '#') {
        // Scroll to top for empty hash links
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <VoiceDemos />
        <UseCase />
        <Feedback />
        <About />
        <ROICalculator />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
