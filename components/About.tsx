import React from 'react';

const About: React.FC = () => (
  <section id="about" style={{ padding: '60px 0' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div style={{
          aspectRatio: '4 / 5',
          borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 0 60px rgba(0,245,212,0.08)',
        }}>
          <img
            src="/images/lahiru.png"
            alt="Lahiru Kavishka"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              display: 'block',
            }}
          />
          {/* Subtle gradient overlay at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em' }}>LAHIRU · 2025</div>
        </div>
      </div>

      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          color: 'var(--accent)', marginBottom: 20,
        }}>
          <span style={{ width: 22, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          About
        </div>
        <h2 style={{ color: 'var(--ink)' }}>
          Built by one engineer<br />who went <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>all-in on voice AI</span>.
        </h2>
        <p style={{ marginTop: 22, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          I'm Lahiru Kavishka — a software engineer (class of 2025) who spent the last year going
          deep on voice AI. I spotted a clear pattern doing market research: US auto dealerships
          lose thousands every week in missed service revenue because nobody answers after 6pm or
          on weekends. The problem is obvious. The fix is automatable.
        </p>
        <p style={{ marginTop: 16, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          I built functional voice agents across four industries — entirely self-taught on Vapi,
          ElevenLabs, and N8n — and I'm now bringing that stack to my first dealership clients.
          I do the engineering, the integration, and the onboarding myself. No agency, no SDRs —
          when you email me, you get me.
        </p>
        <div style={{ display: 'flex', gap: 30, marginTop: 36, flexWrap: 'wrap' }}>
          {([['2025', 'CS graduate'], ['3–5', 'live call demos'], ['4', 'industries built'], ['Vapi · N8n', 'core stack']] as [string, string][]).map(([n, l], i) => (
            <div key={i}>
              <div style={{ fontWeight: 800, fontSize: 26, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{n}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
