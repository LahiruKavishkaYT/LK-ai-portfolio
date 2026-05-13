import React from 'react';

const HowItWorks: React.FC = () => (
  <section id="how" style={{ padding: '110px 0', position: 'relative' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
      <div style={{ maxWidth: 720 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          color: 'var(--accent)', marginBottom: 20,
        }}>
          <span style={{ width: 22, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          How it works
        </div>
        <h2 style={{ color: 'var(--ink)' }}>
          Live in your dealership in{' '}
          <span style={{ color: 'var(--accent)' }}>under 3 weeks</span>.
        </h2>
        <p style={{ marginTop: 18, fontSize: 19, maxWidth: 600, color: 'var(--ink-soft)' }}>
          Forward your main line (or just your after-hours overflow). The agent handles the rest —
          writing to your DMS, booking techs, and texting the customer.
        </p>
      </div>

      <div className="r-4col" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {([
          ['01', 'Discovery call', 'A 30-min call with your service manager. I listen to a week of your inbound audio and map the top intents.'],
          ['02', 'Train & integrate', 'Custom agent built on your inventory, hours, tech schedule. Plugged into CDK / Reynolds / Tekion.'],
          ['03', 'Shadow week', 'Agent runs alongside your BDC. Every call reviewed. We tune until it sounds like your best receptionist.'],
          ['04', 'Go live', 'Forward the line — or drop the web widget. SMS confirmations start flowing immediately.'],
        ] as [string, string, string][]).map(([n, t, d], i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 26,
            transition: 'border-color .25s ease-in-out, transform .25s ease-in-out',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,212,0.25)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.1em' }}>STEP {n}</div>
            <div style={{ fontWeight: 700, fontSize: 20, marginTop: 14, marginBottom: 10, color: 'var(--ink)' }}>{t}</div>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)' }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
