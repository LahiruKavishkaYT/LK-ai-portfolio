import React from 'react';

const Results: React.FC = () => (
  <section id="results" style={{ padding: '110px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
      <div style={{ maxWidth: 780 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          color: 'var(--accent)', marginBottom: 20,
        }}>
          <span style={{ width: 22, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          The Problem
        </div>
        <h2 style={{ color: 'var(--ink)' }}>
          The revenue is already there.<br />
          <span style={{ color: 'var(--accent)' }}>Your phone is just missing it.</span>
        </h2>
        <p style={{ fontSize: 19, marginTop: 18, maxWidth: 640, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          The average service department misses 1 in 4 inbound calls. Each one is a service
          appointment that walked away — or drove straight to your competitor.
        </p>
      </div>

      {/* 3 stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 60 }}>
        {([
          {
            stat: '1 in 4',
            label: 'service calls go unanswered',
            detail: 'Industry average. Lunch hours, after 6pm, Saturdays — your busiest windows are your biggest blind spots.',
            source: 'industry average',
          },
          {
            stat: '$300+',
            label: 'average service RO per visit',
            detail: 'A single answered call is worth $300–$500 in booked service revenue. An unanswered one is worth $0 — every time.',
            source: 'NADA industry data',
          },
          {
            stat: '$0',
            label: 'revenue from a missed call',
            detail: "There's no partial credit. The customer either books or they don't. And 62% won't call back — they'll call the next dealer on Google.",
            source: 'no exceptions',
          },
        ]).map((c, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: 32,
            transition: 'border-color .25s ease-in-out, transform .25s ease-in-out',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,212,0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{
              fontWeight: 800, fontSize: 64, color: i === 2 ? '#ff6b6b' : 'var(--accent)',
              lineHeight: 1, letterSpacing: '-0.03em',
              textShadow: i === 2 ? '0 0 24px rgba(255,107,107,0.4)' : '0 0 24px rgba(0,245,212,0.4)',
            }}>{c.stat}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginTop: 12, lineHeight: 1.3 }}>{c.label}</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', marginTop: 12 }}>{c.detail}</p>
            <div style={{ marginTop: 16, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{c.source}</div>
          </div>
        ))}
      </div>

      {/* Do the math box */}
      <div style={{
        marginTop: 20, padding: '40px 48px',
        background: 'rgba(0,245,212,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 20, border: '1px solid rgba(0,245,212,0.15)',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', gap: 0, alignItems: 'center',
      }}>
        {([
          ['200', 'service calls\nper week'],
          ['×', ''],
          ['25%', 'go unanswered'],
          ['×', ''],
          ['$300', 'avg service ticket'],
          ['=', ''],
          ['$15k', 'lost per week'],
        ] as [string, string][]).map(([n, l], i) => {
          const isOp = n === '×' || n === '=';
          return (
            <div key={i} style={{ textAlign: 'center', padding: isOp ? '0 16px' : '0 24px' }}>
              {isOp ? (
                <div style={{ fontSize: 28, color: 'var(--ink-faint)', fontWeight: 300 }}>{n}</div>
              ) : (
                <>
                  <div style={{
                    fontWeight: 800,
                    fontSize: i === 6 ? 48 : 36,
                    letterSpacing: '-0.03em',
                    color: i === 6 ? '#ff6b6b' : 'var(--ink)',
                    textShadow: i === 6 ? '0 0 24px rgba(255,107,107,0.3)' : 'none',
                  }}>{n}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                    color: 'var(--ink-faint)', letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const, marginTop: 6,
                    whiteSpace: 'pre-line',
                  }}>{l}</div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12, textAlign: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink-faint)' }}>
          The agent costs $300–$700/mo. Do the math. →{' '}
        </span>
        <a href="#offer" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>
          Claim a free install spot
        </a>
      </div>
    </div>
  </section>
);

export default Results;
