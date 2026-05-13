import React, { useState, useEffect } from 'react';

// ── Feature 02: animated SMS conversation ────────────────────────────────────
const SMS_MESSAGES = [
  { from: 'agent', text: "Hi Mike — you're booked Thu 4/24 at 9:00 AM with Chris for a brake inspection. Reply C to cancel." },
  { from: 'customer', text: "Thanks! See you Thursday 👍" },
  { from: 'agent', text: "Perfect. We'll have your Silverado pulled in when you arrive. Chris will meet you at Bay 3." },
];

const STEP_DELAYS = [700, 1500, 500, 1200, 500, 1800, 2400];
const MAX_STEP = SMS_MESSAGES.length * 2;

const PhoneSMS: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const delay = STEP_DELAYS[Math.min(step, STEP_DELAYS.length - 1)];
    const t = setTimeout(() => {
      setStep(s => (s >= MAX_STEP ? 0 : s + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [step]);

  const visibleCount = Math.floor(step / 2);
  const isTyping = step % 2 === 1;
  const typingFrom = isTyping ? SMS_MESSAGES[Math.floor(step / 2)]?.from : null;

  return (
    <>
      <style>{`
        @keyframes sms-in {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 14,
        marginTop: 16, border: '1px solid rgba(255,255,255,0.08)', minHeight: 130,
      }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink-faint)', marginBottom: 10, letterSpacing: '0.1em' }}>iMessage · +1 (888) 580-0027</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SMS_MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.from === 'customer' ? 'flex-end' : 'flex-start',
              animation: 'sms-in 0.3s ease-out both',
            }}>
              <div style={{
                background: msg.from === 'customer' ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                color: msg.from === 'customer' ? 'var(--accent-ink)' : 'var(--ink)',
                borderRadius: msg.from === 'customer' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                padding: '8px 12px', fontSize: 13, maxWidth: '88%', lineHeight: 1.45,
                fontWeight: msg.from === 'customer' ? 600 : 400,
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && typingFrom && (
            <div style={{ display: 'flex', justifyContent: typingFrom === 'customer' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                background: typingFrom === 'customer' ? 'rgba(0,245,212,0.15)' : 'rgba(255,255,255,0.08)',
                borderRadius: typingFrom === 'customer' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center',
              }}>
                {[0, 1, 2].map(d => (
                  <span key={d} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: typingFrom === 'customer' ? 'var(--accent)' : 'var(--ink-faint)',
                    display: 'inline-block',
                    animation: `dot-bounce 1.1s ease-in-out ${d * 0.18}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>
        {visibleCount > 0 && !isTyping && (
          <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 6 }}>Delivered · just now</div>
        )}
      </div>
    </>
  );
};

// ── Feature 01: animated call answering ─────────────────────────────────────
type AnswerPhase = 'ringing' | 'answering' | 'answered';

const CALL_SCENARIOS = [
  { time: 'Sunday · 11:22 PM', label: 'After hours',    ms: 680 },
  { time: 'Mon · 12:08 PM',    label: 'Lunch rush',     ms: 520 },
  { time: 'Tue · 7:41 PM',     label: 'After closing',  ms: 610 },
  { time: 'Sat · 9:15 AM',     label: 'Weekend',        ms: 740 },
];

const ANSWER_PHASE_MS: Record<AnswerPhase, number> = { ringing: 900, answering: 850, answered: 1800 };

const AnswerMock: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<AnswerPhase>('ringing');
  const [log, setLog] = useState<typeof CALL_SCENARIOS>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (phase === 'answered') {
        setLog(prev => [CALL_SCENARIOS[idx], ...prev].slice(0, 3));
        setIdx(i => (i + 1) % CALL_SCENARIOS.length);
        setPhase('ringing');
      } else {
        setPhase(p => p === 'ringing' ? 'answering' : 'answered');
      }
    }, ANSWER_PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase, idx]);

  const scenario = CALL_SCENARIOS[idx];

  return (
    <>
      <style>{`
        @keyframes live-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes ring-shake {
          0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-14deg)}
          40%{transform:rotate(14deg)} 60%{transform:rotate(-9deg)} 80%{transform:rotate(9deg)}
        }
        @keyframes log-slide-in {
          from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)}
        }
      `}</style>

      {/* Stat row */}
      <div style={{ display: 'flex', gap: 8, marginTop: 22, marginBottom: 14 }}>
        {([['142', 'calls today'], ['100%', 'answered'], ['< 1s', 'response']] as [string,string][]).map(([n, l], i) => (
          <div key={i} style={{
            flex: 1, padding: '10px 12px', borderRadius: 8,
            background: i === 2 ? 'rgba(0,245,212,0.07)' : 'rgba(255,255,255,0.03)',
            border: i === 2 ? '1px solid rgba(0,245,212,0.2)' : '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: i === 2 ? 'var(--accent)' : 'var(--ink)' }}>{n}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Live call card */}
      <div style={{
        borderRadius: 12, padding: '14px 16px',
        background: phase === 'answered' ? 'rgba(74,222,128,0.04)' : phase === 'answering' ? 'rgba(0,245,212,0.05)' : 'rgba(77,159,255,0.05)',
        border: `1px solid ${phase === 'answered' ? 'rgba(74,222,128,0.28)' : phase === 'answering' ? 'rgba(0,245,212,0.28)' : 'rgba(77,159,255,0.22)'}`,
        transition: 'background .4s ease-in-out, border-color .4s ease-in-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: 20, display: 'inline-block',
              animation: phase === 'ringing' ? 'ring-shake 0.55s ease-in-out infinite' : 'none',
            }}>📞</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{scenario.time}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 1 }}>{scenario.label}</div>
            </div>
          </div>
          <div style={{
            padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700,
            fontFamily: '"JetBrains Mono", monospace',
            ...(phase === 'ringing'
              ? { background: 'rgba(77,159,255,0.12)', color: 'var(--secondary)', border: '1px solid rgba(77,159,255,0.3)', animation: 'live-pulse 0.7s ease-in-out infinite' }
              : phase === 'answering'
              ? { background: 'rgba(0,245,212,0.12)', color: 'var(--accent)', border: '1px solid rgba(0,245,212,0.3)' }
              : { background: 'rgba(74,222,128,0.12)', color: 'var(--success)', border: '1px solid rgba(74,222,128,0.3)' }),
          }}>
            {phase === 'ringing' ? 'RINGING' : phase === 'answering' ? 'ANSWERING…' : '✓ ANSWERED'}
          </div>
        </div>

        {/* Response time bar */}
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: phase === 'answered' ? 'var(--success)' : 'linear-gradient(to right, var(--accent), var(--secondary))',
            width: phase === 'ringing' ? '2%' : '100%',
            transition: phase === 'answering' ? `width ${scenario.ms}ms linear` : phase === 'answered' ? 'background .3s ease-in-out' : 'none',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink-faint)' }}>0s</div>
          {phase === 'answered' && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--success)', fontWeight: 700 }}>
              {(scenario.ms / 1000).toFixed(2)}s
            </div>
          )}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink-faint)' }}>1s</div>
        </div>
      </div>

      {/* Answered call log */}
      {log.length > 0 && (
        <div style={{ marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
          {log.map((entry, i) => (
            <div key={`${entry.time}-${i}`} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0',
              animation: i === 0 ? 'log-slide-in 0.3s ease-out both' : 'none',
            }}>
              <span style={{ color: 'var(--success)', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--success)', fontWeight: 600, flexShrink: 0 }}>
                {(entry.ms / 1000).toFixed(2)}s
              </span>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)', flex: 1 }}>{entry.time}</span>
              <span style={{ fontSize: 10, color: 'var(--ink-faint)', fontFamily: '"JetBrains Mono", monospace' }}>{entry.label}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ── Feature 04: animated + interactive CRM mock ──────────────────────────────
type CRMPhase = 'incoming' | 'writing' | 'confirmed';

const CRM_ROWS = [
  {
    time: '8:00',  name: 'J. Reyes',   service: 'Oil change',    tech: 'Mark',
    vehicle: '2021 Ford F-150',       phone: '(555) 210-••••',
    transcript: '"Got you in with Mark at 8 AM Thursday for the oil change — you\'re all set."',
  },
  {
    time: '9:00',  name: 'M. Torres',  service: 'Brake inspect', tech: 'Chris',
    vehicle: '2019 Chevy Silverado',  phone: '(555) 489-••••',
    transcript: '"I\'ll put you down with Chris at 9 for the brake inspection — confirmation text is coming right now."',
  },
  {
    time: '10:30', name: 'K. Park',    service: 'Diagnostic',    tech: 'Dana',
    vehicle: '2020 Toyota Camry',     phone: '(555) 831-••••',
    transcript: '"Dana can look at it at 10:30 — I\'m booking that in now and sending you the details."',
  },
  {
    time: '1:00',  name: 'L. Nguyen', service: 'Tire rotation',  tech: 'Mark',
    vehicle: '2018 Honda CR-V',       phone: '(555) 674-••••',
    transcript: '"Perfect, 1 PM with Mark for the rotation — confirmation text is on its way."',
  },
];

const PHASE_DELAYS: Record<CRMPhase, number> = { incoming: 1400, writing: 1000, confirmed: 2600 };
const PHASE_NEXT: Record<CRMPhase, CRMPhase> = { incoming: 'writing', writing: 'confirmed', confirmed: 'incoming' };

const CRMMock: React.FC = () => {
  const [phase, setPhase] = useState<CRMPhase>('incoming');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    if (expandedRow === 1) return; // pause when M. Torres row is open
    const t = setTimeout(() => setPhase(p => PHASE_NEXT[p]), PHASE_DELAYS[phase]);
    return () => clearTimeout(t);
  }, [phase, expandedRow]);

  const animatedBadgeStyle = (p: CRMPhase): React.CSSProperties => {
    if (p === 'incoming') return { background: 'rgba(77,159,255,0.12)', color: 'var(--secondary)', border: '1px solid rgba(77,159,255,0.3)' };
    if (p === 'writing')  return { background: 'rgba(0,245,212,0.12)',  color: 'var(--accent)',    border: '1px solid rgba(0,245,212,0.3)',  animation: 'live-pulse 0.9s ease-in-out infinite' };
    return                       { background: 'rgba(74,222,128,0.12)', color: 'var(--success)',   border: '1px solid rgba(74,222,128,0.3)' };
  };
  const syncedBadge: React.CSSProperties = { background: 'rgba(74,222,128,0.12)', color: 'var(--success)', border: '1px solid rgba(74,222,128,0.3)' };

  const animatedBadgeLabel = (p: CRMPhase) =>
    p === 'incoming' ? 'INCOMING' : p === 'writing' ? 'WRITING…' : '✓ SYNCED';

  return (
    <>
      <style>{`
        @keyframes detail-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>Appointments booked by AI agent today</div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            color: phase === 'writing' ? 'var(--accent)' : 'var(--ink-faint)',
            display: 'flex', alignItems: 'center', gap: 5, transition: 'color .3s ease-in-out',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: phase === 'writing' ? 'var(--accent)' : 'var(--ink-faint)',
              display: 'inline-block', transition: 'background .3s ease-in-out',
              ...(phase === 'writing' ? { animation: 'live-pulse 0.9s ease-in-out infinite' } : {}),
            }} />
            {phase === 'writing' ? 'SYNCING' : 'LIVE'}
          </div>
        </div>

        {/* 3-step flow indicator */}
        {(() => {
          const steps = [
            { emoji: '📞', label: 'Customer calls', activePhase: 'incoming' as CRMPhase },
            { emoji: '🤖', label: 'Agent books',    activePhase: 'writing'  as CRMPhase },
            { emoji: '✅', label: 'CRM updated',    activePhase: 'confirmed' as CRMPhase },
          ];
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              {steps.map((step, i) => {
                const isActive = phase === step.activePhase;
                return (
                  <React.Fragment key={i}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '5px 10px', borderRadius: 999,
                      background: isActive ? 'rgba(0,245,212,0.12)' : 'rgba(255,255,255,0.03)',
                      border: isActive ? '1px solid rgba(0,245,212,0.3)' : '1px solid rgba(255,255,255,0.07)',
                      transition: 'background .35s ease-in-out, border-color .35s ease-in-out',
                    }}>
                      <span style={{ fontSize: 12 }}>{step.emoji}</span>
                      <span style={{
                        fontSize: 11, fontWeight: isActive ? 700 : 400,
                        color: isActive ? 'var(--accent)' : 'var(--ink-faint)',
                        transition: 'color .35s ease-in-out, font-weight .35s ease-in-out',
                        whiteSpace: 'nowrap',
                      }}>{step.label}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <span style={{ fontSize: 10, color: 'var(--ink-faint)', flexShrink: 0 }}>→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })()}

        {CRM_ROWS.map((row, i) => {
          const isAnimated  = i === 1;
          const activePhase = isAnimated ? phase : 'confirmed';
          const isExpanded  = expandedRow === i;

          const rowBg = isAnimated
            ? (activePhase === 'writing' ? 'rgba(0,245,212,0.09)' : activePhase === 'incoming' ? 'rgba(77,159,255,0.07)' : 'rgba(0,245,212,0.06)')
            : isExpanded ? 'rgba(255,255,255,0.05)' : 'transparent';
          const rowBorder = isAnimated
            ? (activePhase === 'writing' ? '1px solid rgba(0,245,212,0.25)' : activePhase === 'incoming' ? '1px solid rgba(77,159,255,0.2)' : '1px solid rgba(0,245,212,0.15)')
            : isExpanded ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent';

          return (
            <div key={i} style={{ marginBottom: isExpanded ? 0 : 4 }}>
              {/* Row */}
              <div
                onClick={() => setExpandedRow(isExpanded ? null : i)}
                onMouseEnter={e => { if (!isAnimated && !isExpanded) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; } }}
                onMouseLeave={e => { if (!isAnimated && !isExpanded) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; } }}
                style={{
                  display: 'flex', gap: 12, padding: '10px 12px', alignItems: 'center',
                  borderRadius: isExpanded ? '8px 8px 0 0' : 8,
                  background: rowBg, border: rowBorder,
                  borderBottom: isExpanded ? '1px solid rgba(255,255,255,0.06)' : rowBorder.replace('1px solid', '1px solid'),
                  cursor: 'pointer', userSelect: 'none',
                  transition: 'background .3s ease-in-out, border-color .3s ease-in-out',
                }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                  color: isAnimated ? (activePhase === 'incoming' ? 'var(--secondary)' : 'var(--accent)') : 'var(--ink-faint)',
                  width: 44, flexShrink: 0, transition: 'color .35s ease-in-out',
                }}>{row.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{row.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 1 }}>{row.service} · {row.tech}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600,
                    transition: 'all .35s ease-in-out',
                    ...(isAnimated ? animatedBadgeStyle(activePhase) : syncedBadge),
                  }}>
                    {isAnimated ? animatedBadgeLabel(activePhase) : '✓ SYNCED'}
                  </div>
                  <span style={{
                    fontSize: 11, color: 'var(--ink-faint)',
                    display: 'inline-block', transition: 'transform .2s ease-in-out',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>▾</span>
                </div>
              </div>

              {/* Expandable detail panel */}
              {isExpanded && (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: rowBorder, borderTop: 'none',
                  borderRadius: '0 0 8px 8px', padding: '12px 14px', marginBottom: 4,
                  animation: 'detail-in 0.22s ease-out both',
                }}>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 3 }}>VEHICLE</div>
                      <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>{row.vehicle}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 3 }}>PHONE</div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--ink)' }}>{row.phone}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 3 }}>BOOKED BY</div>
                      <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>AI agent · inbound call</div>
                    </div>
                  </div>
                  <div style={{
                    borderRadius: '0 6px 6px 0',
                    background: 'rgba(0,245,212,0.04)',
                    borderTop: '1px solid rgba(0,245,212,0.12)',
                    borderRight: '1px solid rgba(0,245,212,0.12)',
                    borderBottom: '1px solid rgba(0,245,212,0.12)',
                    borderLeft: '3px solid var(--accent)',
                    padding: '8px 12px', fontSize: 12, color: 'var(--ink-soft)',
                    lineHeight: 1.55, fontStyle: 'italic',
                  }}>
                    {row.transcript}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4, paddingTop: 8, textAlign: 'center' }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
            CLICK ANY ROW TO VIEW DETAILS
          </span>
        </div>
      </div>
    </>
  );
};

// ── Glass card helper styles ─────────────────────────────────────────────────
const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
};

const featureBadge = (emoji: string, label: string) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '6px 12px', borderRadius: 999,
    background: 'rgba(0,245,212,0.08)', color: 'var(--accent)',
    border: '1px solid rgba(0,245,212,0.2)',
    fontSize: 13, fontWeight: 600,
  }}>{emoji} {label}</div>
);

// ── Main section ─────────────────────────────────────────────────────────────
const Features: React.FC = () => (
  <section id="features" style={{ padding: '40px 0 110px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
      <div style={{ maxWidth: 780 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          color: 'var(--accent)', marginBottom: 20,
        }}>
          <span style={{ width: 22, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          What you get
        </div>
        <h2 style={{ color: 'var(--ink)' }}>
          Four tools, <span style={{ color: 'var(--accent)' }}>one agent</span>.<br />All talking to each other.
        </h2>
      </div>

      <div className="r-features-grid" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }}>
        {/* Feature 01 — big card */}
        <div className="r-feat01" style={{
          ...glassCard,
          padding: 36, gridRow: 'span 2',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 440,
          transition: 'border-color .25s ease-in-out, transform .25s ease-in-out',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,212,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <div>
            {featureBadge('📞', 'Feature 01')}
            <h3 style={{ marginTop: 18, fontSize: 34, color: 'var(--ink)' }}>24/7 inbound answering</h3>
            <p style={{ marginTop: 14, fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Every ring picked up in under a second. Lunch hours, after 6pm,
              Sundays, snow days. The agent knows your service hours, your
              loaner policy, and when Chris the tech is off.
            </p>
          </div>
          <AnswerMock />
        </div>

        {/* Feature 02 — SMS */}
        <div style={{
          ...glassCard, padding: 28,
          transition: 'border-color .25s ease-in-out, transform .25s ease-in-out',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,212,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          {featureBadge('💬', 'Feature 02')}
          <h3 style={{ marginTop: 16, color: 'var(--ink)' }}>SMS confirmation</h3>
          <p style={{ marginTop: 10, fontSize: 15, color: 'var(--ink-soft)' }}>
            Auto-text with the time, service advisor name, and a cancel link —
            before the customer hangs up. Cuts no-shows by ~48%.
          </p>
          <PhoneSMS />
        </div>

        {/* Feature 03 — Web widget */}
        <div style={{
          ...glassCard, padding: 28,
          transition: 'border-color .25s ease-in-out, transform .25s ease-in-out',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,212,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          {featureBadge('🌐', 'Feature 03')}
          <h3 style={{ marginTop: 16, color: 'var(--ink)' }}>Web voice widget</h3>
          <p style={{ marginTop: 10, fontSize: 15, color: 'var(--ink-soft)' }}>
            One-line install. Same agent answers your phone and your website.
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: 14, marginTop: 14,
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>{'// paste once'}</span>
            <div style={{ fontSize: 12, color: 'var(--success)', marginTop: 6 }}>
              {'<script src="cdn.lahiru.ai/widget.js"'}<br />
              {'  data-dealer="YOUR_ID"></script>'}
            </div>
          </div>
        </div>
      </div>

      {/* Feature 04 — wide CRM card */}
      <div className="r-2col" style={{
        ...glassCard,
        padding: 36, marginTop: 20,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center',
        transition: 'border-color .25s ease-in-out, transform .25s ease-in-out',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,212,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
        <div>
          {featureBadge('📅', 'Feature 04')}
          <h3 style={{ marginTop: 16, fontSize: 30, color: 'var(--ink)' }}>Books directly into your CRM</h3>
          <p style={{ marginTop: 12, fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
            No copy-paste, no next-day reconciliation. The agent is built to
            connect directly with your CRM — appointments flow in tagged,
            scheduled, and assigned to the right advisor. Integration is
            custom-built during onboarding to fit your exact setup.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
            {['Salesforce', 'VinSolutions', 'DealerSocket', 'Elead', 'HubSpot', '+ 3 more'].map(x => (
              <span key={x} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '6px 12px', borderRadius: 999,
                background: 'rgba(255,255,255,0.04)', color: 'var(--ink-soft)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 12, fontWeight: 500,
              }}>{x}</span>
            ))}
          </div>
        </div>
        <CRMMock />
      </div>
    </div>
  </section>
);

export default Features;
