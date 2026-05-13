import React, { useState } from 'react';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--ink)', padding: '12px 14px', fontSize: 15, borderRadius: 10,
  fontFamily: '"Plus Jakarta Sans", Inter, sans-serif', outline: 'none', marginTop: 6,
  transition: 'border-color .2s ease-in-out, box-shadow .2s ease-in-out',
};

const selectStyle: React.CSSProperties = { ...fieldStyle, appearance: 'none', cursor: 'pointer' };

interface FieldProps {
  label: string;
  children?: React.ReactNode;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, children, ...rest }) => (
  <label style={{ display: 'block' }}>
    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>{label}</span>
    {children || (
      <input
        {...rest}
        style={fieldStyle}
        onFocus={e => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px rgba(0,245,212,0.1), 0 0 16px rgba(0,245,212,0.12)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(255,255,255,0.1)';
          e.target.style.boxShadow = 'none';
        }}
      />
    )}
  </label>
);

const SpotsLeft: React.FC = () => (
  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginRight: 8 }}>SPOTS LEFT</div>
    {[1, 2, 3].map(i => (
      <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid var(--accent)', background: 'var(--accent)', boxShadow: '0 0 8px rgba(0,245,212,0.4)' }} />
    ))}
  </div>
);

const Offer: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', dealership: '', role: '', email: '', phone: '', calls: '100-500' });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="offer" style={{ position: 'relative', overflow: 'hidden', paddingTop: 130, paddingBottom: 130 }}>
      {/* Teal glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 900, height: 900,
        background: 'radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 55%)',
        pointerEvents: 'none', filter: 'blur(40px)',
      }} />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(0,245,212,0.1)', color: 'var(--accent)',
            border: '1px solid rgba(0,245,212,0.25)',
            fontSize: 13, fontWeight: 600,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s ease-in-out infinite', display: 'inline-block' }} />
            3 spots only · US dealerships
          </div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(44px, 6vw, 76px)', color: 'var(--ink)' }}>
            Zero-fee installation.<br />
            <span style={{ color: 'var(--accent)' }}>You only pay tool costs.</span>
          </h2>
          <p style={{ fontSize: 20, marginTop: 22, maxWidth: 660, margin: '22px auto 0', lineHeight: 1.55, color: 'var(--ink-soft)' }}>
            I'm onboarding my first 3 US dealerships at zero install fee to build
            out my case-study portfolio. You cover the underlying tool costs (Twilio,
            ElevenLabs, Vapi — roughly $300–$700/mo depending on volume). That's it.
            No retainer. No agency markup. After 90 days I ask for a video testimonial and a logo.
          </p>
        </div>

        {/* What's included */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, padding: 40, marginBottom: 24,
        }}>
          <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>What's included · $0</div>
              <div style={{ marginTop: 18 }}>
                {[
                  "Custom voice agent trained on your dealership",
                  "CRM integration — custom-built to your exact setup during onboarding",
                  "Phone number provisioning + call routing",
                  "SMS confirmation flow + cancel-link automation",
                  "Web voice widget for your site",
                  "Live dashboard with call transcripts & tagging",
                  "2 weeks of shadow tuning + go-live support",
                  "Direct line to me — no account managers",
                ].map((x, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'var(--accent)', color: 'var(--accent-ink)',
                      display: 'grid', placeItems: 'center', fontSize: 11, flexShrink: 0, marginTop: 2,
                      boxShadow: '0 0 8px rgba(0,245,212,0.3)',
                    }}>✓</div>
                    <div style={{ fontSize: 15, color: 'var(--ink)' }}>{x}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="r-no-border-left" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 40 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>What you pay</div>
              <div style={{ fontWeight: 800, fontSize: 56, marginTop: 16, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
                <span style={{ color: 'var(--ink-faint)', fontSize: 28, fontWeight: 400, textDecoration: 'line-through', marginRight: 12 }}>$4,800</span>
                $0
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-faint)' }}>installation fee</div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '26px 0' }} />

              <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 8 }}>You cover tool costs (pass-through, no markup):</div>
              {([
                ['Twilio (calls + SMS)', '~$0.04 / min'],
                ['ElevenLabs (voice)', '~$0.05 / min'],
                ['AI model usage', '~$0.06 / min'],
                ['Typical monthly total', '$300–$700'],
              ] as [string, string][]).map(([k, v], i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', fontSize: 14,
                  borderTop: i === 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  marginTop: i === 3 ? 6 : 0, padding: '6px 0', paddingTop: i === 3 ? 12 : 6,
                }}>
                  <span style={{ color: i === 3 ? 'var(--ink)' : 'var(--ink-soft)', fontWeight: i === 3 ? 600 : 400 }}>{k}</span>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', color: i === 3 ? 'var(--accent)' : 'var(--ink-soft)', fontWeight: i === 3 ? 600 : 400 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div style={{
          background: 'rgba(0,245,212,0.05)',
          border: '1px solid rgba(0,245,212,0.2)',
          borderRadius: 16, padding: '28px 36px', marginBottom: 20,
          display: 'flex', gap: 24, alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: 40, flexShrink: 0, lineHeight: 1 }}>🔒</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, color: 'var(--ink)' }}>30-Day Full Refund Guarantee</div>
            <p style={{ marginTop: 8, fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 640 }}>
              If the agent doesn't demonstrably pay for itself in the first 30 days, I refund every dollar of tool costs.
              No questions. No fine print. You take zero risk — I take all of it.
            </p>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, padding: 36,
        }}>
          {submitted ? (
            <div style={{ padding: '30px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 48 }}>🎉</div>
              <h3 style={{ marginTop: 12, fontSize: 32, color: 'var(--ink)' }}>
                You're on the list, {form.name.split(' ')[0] || 'friend'}.
              </h3>
              <p style={{ marginTop: 12, fontSize: 16, color: 'var(--ink-soft)' }}>
                I'll email <span style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--accent)' }}>{form.email}</span> within 24 hours
                with a calendar link and a 2-minute demo call recording so you can hear what your agent will sound like.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, gap: 24, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 26, color: 'var(--ink)' }}>Claim a free install spot</h3>
                <SpotsLeft />
              </div>

              <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Your name" value={form.name} onChange={update('name') as any} placeholder="Mike Torres" required />
                <Field label="Role" value={form.role} onChange={update('role') as any} placeholder="GM / Service Director / Owner" required />
                <Field label="Dealership" value={form.dealership} onChange={update('dealership') as any} placeholder="Hollister Ford" required />
                <Field label="Work email" type="email" value={form.email} onChange={update('email') as any} placeholder="mike@hollisterford.com" required />
                <Field label="Best phone (US only)" value={form.phone} onChange={update('phone') as any} placeholder="(555) 555-0100" required />
                <Field label="Approx. inbound calls / week">
                  <select value={form.calls} onChange={update('calls')} style={selectStyle}>
                    <option>Under 100</option>
                    <option>100-500</option>
                    <option>500-1,000</option>
                    <option>1,000-2,500</option>
                    <option>2,500+</option>
                  </select>
                </Field>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, gap: 18, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 12, color: 'var(--ink-faint)', maxWidth: 380 }}>
                  No spam, no calls from offshore SDRs. I personally email every applicant within 24 hours.
                </div>
                <button type="submit" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '18px 32px', borderRadius: 999,
                  background: 'var(--accent)', color: 'var(--accent-ink)',
                  fontWeight: 700, fontSize: 17, border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 28px rgba(0,245,212,0.4)',
                  transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,245,212,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(0,245,212,0.4)'; }}>
                  Claim my spot →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Offer;
