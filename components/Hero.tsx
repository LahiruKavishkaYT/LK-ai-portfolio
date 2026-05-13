import React, { useState, useEffect, useMemo } from 'react';

const Waveform: React.FC<{ progress: number }> = ({ progress }) => {
  const bars = useMemo(() => {
    const out: number[] = [];
    let s = 3;
    for (let i = 0; i < 54; i++) {
      s = (s * 9301 + 49297) % 233280;
      const t = i / 53;
      const bell = Math.sin(t * Math.PI);
      out.push(Math.max(4, Math.round(bell * 32 * (0.5 + (s / 233280) * 0.9))));
    }
    return out;
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 40, padding: '4px 2px' }}>
      {bars.map((h, i) => {
        const active = (i / bars.length) * 100 < progress;
        return (
          <div key={i} style={{
            flex: 1, height: h + 'px',
            background: active ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
            borderRadius: 2, transition: 'background .2s ease-in-out',
            boxShadow: active ? '0 0 6px rgba(0,245,212,0.5)' : 'none',
          }} />
        );
      })}
    </div>
  );
};

const Hero: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 1.5;
      });
    }, 80);
    return () => clearInterval(t);
  }, [playing]);

  const elapsed = Math.floor(progress * 0.41);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <section id="hero" style={{ paddingTop: 60, paddingBottom: 90, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '40px 28px',
        position: 'relative',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: value prop */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: 'rgba(0,245,212,0.1)', color: 'var(--accent)',
              border: '1px solid rgba(0,245,212,0.25)',
              fontSize: 13, fontWeight: 600,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: 'currentColor',
                animation: 'pulse 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              Limited: zero-fee install for 3 US dealerships
            </div>

            <h1 style={{
              marginTop: 24,
              background: 'linear-gradient(135deg, #FFFFFF 0%, var(--accent) 50%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Never miss<br />
              another service call.
            </h1>

            <p style={{ fontSize: 20, marginTop: 24, maxWidth: 520, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
              Every call your team misses after 6pm is a customer booking with
              the dealer down the road. My AI answers every ring, 24/7 — books
              the appointment, texts the confirmation, and has it ready in your
              CRM before the customer hangs up.
            </p>

            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="#offer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 32px', borderRadius: 999,
                background: 'var(--accent)', color: 'var(--accent-ink)',
                fontWeight: 700, fontSize: 17, textDecoration: 'none',
                boxShadow: '0 0 32px rgba(0,245,212,0.4), 0 0 64px rgba(0,245,212,0.15)',
                transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(0,245,212,0.6), 0 0 80px rgba(0,245,212,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(0,245,212,0.4), 0 0 64px rgba(0,245,212,0.15)'; }}>
                Claim a free install spot →
              </a>
              <a href="tel:+18885800027" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 28px', borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)', color: 'var(--ink)',
                fontWeight: 600, fontSize: 17, textDecoration: 'none',
                transition: 'border-color .2s ease-in-out, background .2s ease-in-out',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'transparent'; }}>
                📞 Call the agent — it's live
              </a>
            </div>

            <div style={{ display: 'flex', gap: 32, marginTop: 44, flexWrap: 'wrap' }}>
              {([['< 1s', 'answer time'], ['24/7', 'coverage'], ['$0', 'install fee'], ['30-day', 'refund guarantee']] as [string, string][]).map(([n, l], i) => (
                <div key={i}>
                  <div style={{ fontWeight: 800, fontSize: 28, color: i === 2 ? 'var(--accent)' : 'var(--ink)', letterSpacing: '-0.02em' }}>{n}</div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: call widget — glassmorphism */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20, padding: 28, position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 999,
                background: 'rgba(74,222,128,0.1)', color: 'var(--success)',
                border: '1px solid rgba(74,222,128,0.25)',
                fontSize: 13, fontWeight: 600,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: 'var(--success)',
                  animation: 'pulseGreen 2s ease-in-out infinite',
                  display: 'inline-block',
                }} />
                On a live call
              </div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'var(--ink-faint)' }}>
                {mm}:{ss} / 00:41
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 18, marginBottom: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.15em' }}>CALLER · MIKE T.</div>
              <div style={{ fontSize: 17, marginTop: 6, color: 'var(--ink)' }}>"Hey, my F-150's brakes are squeaking — can I bring it in?"</div>
            </div>
            <div style={{ background: 'rgba(0,245,212,0.07)', border: '1px solid rgba(0,245,212,0.2)', borderRadius: 12, padding: 18, marginBottom: 16 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.15em' }}>AGENT · AVA</div>
              <div style={{ fontSize: 17, marginTop: 6, color: 'var(--ink)' }}>"Sure Mike. I've got Thursday 9am or Friday 2pm. Which works?"</div>
            </div>

            <Waveform progress={progress} />

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button
                onClick={() => setPlaying(!playing)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '10px 16px', borderRadius: 999,
                  background: 'var(--accent)', color: 'var(--accent-ink)',
                  fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 16px rgba(0,245,212,0.35)',
                  transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(0,245,212,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,245,212,0.35)'; }}>
                {playing ? '⏸  Pause' : '▶  Play sample call'}
              </button>
              <a href="tel:+18885800027" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '10px 16px', borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)', color: 'var(--ink)',
                fontWeight: 600, fontSize: 13, textDecoration: 'none',
                transition: 'border-color .2s ease-in-out, background .2s ease-in-out',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'transparent'; }}>
                📞 Call +1 (888) 580-0027
              </a>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              {['✓ Booked Thu 9am', '✓ SMS sent', '✓ CRM sync ready'].map(x => (
                <span key={x} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px', borderRadius: 999,
                  background: 'rgba(0,245,212,0.08)', color: 'var(--accent)',
                  border: '1px solid rgba(0,245,212,0.2)',
                  fontSize: 11, fontWeight: 600,
                }}>{x}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Trusted-by strip */}
        <div style={{ marginTop: 80, paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
            Designed to integrate with
          </div>
          <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', opacity: 0.6 }}>
            {['CDK Global', 'Reynolds & Reynolds', 'Tekion', 'VinSolutions', 'DealerSocket', 'Elead'].map(b => (
              <div key={b} style={{ fontWeight: 700, fontSize: 18, color: 'var(--ink-soft)', letterSpacing: '-0.01em' }}>{b}</div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.12em' }}>
            Integrations built to your exact setup during onboarding
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
