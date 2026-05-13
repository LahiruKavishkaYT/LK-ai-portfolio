import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,15,30,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      transition: 'all .3s ease-in-out',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 28px' }}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, var(--accent), var(--secondary))',
            display: 'grid', placeItems: 'center',
            color: 'var(--accent-ink)', fontWeight: 800, fontSize: 15,
            boxShadow: '0 0 16px rgba(0,245,212,0.3)',
          }}>L</div>
          <div>
            <div style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: 'var(--ink)' }}>Lahiru Kavishka</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.12em' }}>VOICE AI · DEALERSHIPS</div>
          </div>
        </a>

        <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
          {[['The Problem', '#results'], ['How it works', '#how'], ['Features', '#features'], ['Offer', '#offer'], ['FAQ', '#faq']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none', transition: 'color .2s ease-in-out' }}
               onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
               onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>{label}</a>
          ))}
          <a href="#offer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', borderRadius: 999,
            background: 'var(--accent)', color: 'var(--accent-ink)',
            fontWeight: 700, fontSize: 13, textDecoration: 'none',
            boxShadow: '0 0 20px rgba(0,245,212,0.3)',
            transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,245,212,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,212,0.3)'; }}>
            Claim free install →
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
