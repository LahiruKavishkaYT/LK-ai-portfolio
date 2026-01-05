import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'WORK', href: '#demos' },
  { label: 'FEEDBACK', href: '#feedback' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll detection for background style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active Section Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Handle "Home" click
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection(''); // Clear active section
      return;
    }

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        // Calculate offset position for fixed header
        const navHeight = 80; // Approximate navbar height + breathing room
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Optimistic update for immediate UI feedback
        setActiveSection(targetId);
    }
  };

  // Helper to map current section to the corresponding nav item href
  const getActiveNavHref = (currentSection: string): string => {
    switch (currentSection) {
      // WORK Group
      case 'demos':
      case 'work':
      case 'use-cases':
        return '#demos';
        
      // FEEDBACK Group
      case 'feedback':
        return '#feedback';
        
      // ABOUT Group
      case 'about':
      case 'roi':
        return '#about';
        
      // CONTACT Group
      case 'contact':
        return '#contact';
        
      default:
        return '';
    }
  };

  const activeNavHref = getActiveNavHref(activeSection);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-brand-dark/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-50">
        {/* Logo / Brand Name */}
        <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, '#')}
            className="flex items-center gap-2 group relative z-50" 
            aria-label="Lahiru Kavishka Home"
        >
          <span className="font-bold text-lg tracking-wide group-hover:text-brand-orange transition-colors">Lahiru Kavishka</span>
        </a>

        {/* Desktop Links - Pill Design */}
        <div className="hidden md:flex items-center gap-1 bg-brand-card/80 p-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-2xl">
          <LayoutGroup id="navbar-tabs">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNavHref === item.href;
              
              return (
                  <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-colors duration-300 z-10 ${
                      isActive 
                      ? 'text-white' 
                      : 'text-brand-text hover:text-white'
                  }`}
                  >
                  {isActive && (
                      <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-orange rounded-full shadow-[0_2px_10px_rgba(255,87,34,0.3)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ zIndex: -1 }}
                      />
                  )}
                  {item.label}
                  </a>
              );
            })}
          </LayoutGroup>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <span className="mb-0.5">BOOK CALL</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-brand-dark/98 backdrop-blur-xl z-40 flex flex-col pt-32 px-6 md:hidden h-screen"
          >
             <div className="flex flex-col gap-6">
                {NAV_ITEMS.map((item, idx) => (
                    <motion.a
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className={`text-3xl font-bold transition-colors flex justify-between items-center group border-b border-white/5 pb-4 ${activeNavHref === item.href ? 'text-brand-orange' : 'text-white hover:text-brand-orange'}`}
                    >
                        {item.label}
                        <ArrowUpRight className={`opacity-0 group-hover:opacity-100 transition-opacity text-brand-orange ${activeNavHref === item.href ? 'opacity-100' : ''}`} size={24} />
                    </motion.a>
                ))}
                <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    href="#contact" 
                    onClick={(e) => handleLinkClick(e, '#contact')}
                    className="w-full flex justify-center items-center gap-2 bg-brand-orange text-white px-5 py-4 rounded-sm font-bold text-sm mt-4 shadow-xl shadow-orange-500/20"
                >
                    BOOK STRATEGY CALL
                </motion.a>
            </div>
            
            {/* Mobile Footer Info */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto mb-10 text-brand-text/50 text-xs text-center"
            >
                <p>Designed by Lahiru Kavishka</p>
                <p>© 2024 All rights reserved.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;