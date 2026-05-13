import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number>(0);
  const items: [string, string][] = [
    [
      "What if the caller asks something the agent doesn't know?",
      "It warm-transfers to your BDC with full context — name, vehicle, what they were trying to do — so your team picks up in the middle of the conversation, not the start. We tune the agent on every escalation so over time it handles more cases.",
    ],
    [
      "Does it actually sound like a human?",
      "Yes — we use realistic neural voices (ElevenLabs / OpenAI). I'll send you a sample call from your area code before you commit. Most callers don't realize they're talking to an AI.",
    ],
    [
      "Will this work with my CRM?",
      "VinSolutions, DealerSocket, Salesforce, Elead, and HubSpot are all on my integration list. During onboarding I build the connection to your specific setup — typically 3–5 days of the install window. If you're on something else, I write a custom bridge.",
    ],
    [
      "How long until it's live on my number?",
      "11–18 days from signed agreement. The longest piece is the shadow week where I tune the agent on real calls before flipping it on.",
    ],
    [
      "What's the catch on the zero-fee install?",
      "No catch — I'm onboarding my first 3 dealerships at $0 install to build out my case-study portfolio. You cover only the actual third-party tool costs (~$300–$700/mo). After 90 days I ask for a video testimonial and a logo. That's it.",
    ],
    [
      "Can I cancel anytime?",
      "Yes. Month-to-month after the install. No retainer. If it doesn't pay for itself in 30 days I'll refund the tool costs.",
    ],
    [
      "Do you support Spanish-language calls?",
      "Out of the box. Plus 5 other languages — let me know what your area needs.",
    ],
  ];

  return (
    <section id="faq" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 110, paddingBottom: 110 }}>
      <div className="r-2col" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80 }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
            color: 'var(--accent)', marginBottom: 20,
          }}>
            <span style={{ width: 22, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            FAQ
          </div>
          <h2 style={{ color: 'var(--ink)' }}>
            Honest <span style={{ color: 'var(--accent)' }}>answers</span>.
          </h2>
          <p style={{ marginTop: 16, fontSize: 16, color: 'var(--ink-soft)' }}>
            Don't see your question? Email{' '}
            <a href="mailto:jlkavishka@gmail.com" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--accent)', textDecoration: 'none' }}>jlkavishka@gmail.com</a>
            {' '}— I read every one.
          </p>
        </div>

        <div>
          {items.map(([q, a], i) => (
            <div
              key={i}
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '22px 0', cursor: 'pointer' }}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.35, color: 'var(--ink)' }}>{q}</div>
                <div style={{
                  fontSize: 22, color: 'var(--accent)',
                  transition: 'transform .25s ease-in-out',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  flexShrink: 0,
                }}>+</div>
              </div>
              {open === i && (
                <p style={{ marginTop: 14, fontSize: 16, maxWidth: 640, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{a}</p>
              )}
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </section>
  );
};

const FinalCTA: React.FC = () => (
  <section style={{ paddingTop: 60, paddingBottom: 60 }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
      <div className="r-cta-inner" style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,245,212,0.2)',
        borderRadius: 24, padding: '70px 60px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Inner glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,245,212,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: 'var(--ink)', position: 'relative' }}>
          Every ring you miss is<br />a sale at the{' '}
          <span style={{ color: 'var(--accent)' }}>competitor down the road</span>.
        </h2>
        <div style={{ display: 'flex', gap: 14, marginTop: 40, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <a href="#offer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 32px', borderRadius: 999,
            background: 'var(--accent)', color: 'var(--accent-ink)',
            fontWeight: 700, fontSize: 17, textDecoration: 'none',
            boxShadow: '0 0 32px rgba(0,245,212,0.4)',
            transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(0,245,212,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(0,245,212,0.4)'; }}>
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
            📞 Or call the agent now
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '50px 0 30px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'linear-gradient(135deg, var(--accent), var(--secondary))',
          display: 'grid', placeItems: 'center',
          color: 'var(--accent-ink)', fontWeight: 800, fontSize: 15,
          boxShadow: '0 0 16px rgba(0,245,212,0.3)',
        }}>L</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>Lahiru Kavishka</div>
          <div style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Voice AI for US auto dealerships · 2025</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 26, fontSize: 13, color: 'var(--ink-soft)', flexWrap: 'wrap' }}>
        <a href="mailto:jlkavishka@gmail.com" style={{ color: 'var(--ink-soft)', textDecoration: 'none', transition: 'color .2s ease-in-out' }}
           onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
           onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>jlkavishka@gmail.com</a>
        <a href="tel:+18885800027" style={{ color: 'var(--ink-soft)', textDecoration: 'none', transition: 'color .2s ease-in-out' }}
           onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
           onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>+1 (888) 580-0027</a>
        <a href="https://www.linkedin.com/in/lahiru-jayasooriya/" target="_blank" rel="noreferrer" style={{ color: 'var(--ink-soft)', textDecoration: 'none', transition: 'color .2s ease-in-out' }}
           onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
           onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>LinkedIn</a>
        <a href="https://x.com/Lamba_YT" target="_blank" rel="noreferrer" style={{ color: 'var(--ink-soft)', textDecoration: 'none', transition: 'color .2s ease-in-out' }}
           onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
           onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>X / Twitter</a>
        <a href="https://www.instagram.com/ai.automationdev/" target="_blank" rel="noreferrer" style={{ color: 'var(--ink-soft)', textDecoration: 'none', transition: 'color .2s ease-in-out' }}
           onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
           onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>Instagram</a>
      </div>
    </div>
  </footer>
);

export { FAQ, FinalCTA };
export default Footer;
