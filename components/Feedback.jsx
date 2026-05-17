'use client';

import React from 'react';
import { Icon } from './Icons';
import { PrimaryButton } from './Screens';
import { StepHeader, QuizProgress } from './Flow';

// Voyage — end-of-trip feedback

function StarRating({ value, onChange, size = 32 }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} onClick={() => onChange(i)} style={{
          color: i <= value ? '#F0DC4A' : 'rgba(8,37,103,0.18)',
          padding: 4,
          transition: 'transform 120ms, color 200ms',
          transform: i <= value ? 'scale(1.05)' : 'scale(1)',
        }}>
          <svg width={size} height={size} viewBox="0 0 24 24"
               fill={i <= value ? '#FFF785' : 'none'}
               stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            <path d="M12 3l2.9 6.3 6.9 1-5 4.9 1.2 6.8L12 18.7l-6 3.3 1.2-6.8-5-4.9 6.9-1L12 3z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

function FeedbackScreen({ dest, onBack, onDone }) {
  const [step, setStep] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [bestDay, setBestDay] = React.useState(null);
  const [highlights, setHighlights] = React.useState([]);
  const [note, setNote] = React.useState('');
  const [share, setShare] = React.useState(true);

  const total = 4;

  const HIGHLIGHTS = [
    'Pasteis di Belém', 'Miradouro al tramonto', 'Cena Time Out',
    'Fado in Alfama', 'LX Factory', 'Camminata Alfama',
    'Castello São Jorge', 'Brunch Príncipe Real',
  ];

  function toggleHighlight(h) {
    setHighlights(curr => curr.includes(h) ? curr.filter(x => x !== h) : [...curr, h]);
  }

  function next() {
    if (step < total - 1) setStep(s => s + 1);
    else onDone({ rating, bestDay, highlights, note, share });
  }

  return (
    <div className="voy-content screen-enter" style={{ background: 'var(--bg)' }}>
      <div style={{ paddingTop: 56 }}>
        <QuizProgress step={step} total={total} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 8px' }}>
          <button onClick={() => step === 0 ? onBack() : setStep(s => s - 1)} style={{
            width: 40, height: 40, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(8,37,103,0.05)', color: 'var(--ink)',
          }}><Icon.Back size={18} /></button>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>
              Feedback · {step + 1} / {total}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', letterSpacing: -0.2, marginTop: 2 }}>
              {dest.name}
            </div>
          </div>
          <div style={{ width: 40 }} />
        </div>
      </div>

      <div className="voy-screen-scroll" key={step} style={{ paddingBottom: 110 }}>
        <div className="screen-enter" style={{ padding: '16px 20px 0' }}>

          {step === 0 && (
            <div>
              <StepHeader
                kicker="01 · Overall"
                title={<>Com'è stato, <i className="serif" style={{ fontWeight: 400 }}>davvero</i>?</>}
                hint="Una stella e basta. Lo aiuta gli amici futuri."
              />
              <div style={{
                background: 'var(--surface)', borderRadius: 22,
                border: '0.5px solid var(--line)',
                padding: '40px 20px',
              }}>
                <StarRating value={rating} onChange={setRating} size={42} />
                <div style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: 'var(--mute)' }}>
                  {rating === 0 && 'Tocca per dare una stella'}
                  {rating === 1 && 'Meglio dimenticare'}
                  {rating === 2 && 'Niente di che'}
                  {rating === 3 && 'Carino, va detto'}
                  {rating === 4 && 'Davvero bello'}
                  {rating === 5 && 'Top — lo rifarei domani'}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <StepHeader
                kicker="02 · Giornata top"
                title="Quale giorno ti è rimasto?"
                hint="Quello che racconteresti per primo."
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[1,2,3,4].map(i => (
                  <button key={i} onClick={() => setBestDay(i)} style={{
                    padding: '16px 18px', borderRadius: 16,
                    textAlign: 'left',
                    background: bestDay === i ? 'var(--ink)' : 'var(--surface)',
                    color: bestDay === i ? '#FFFFFF' : 'var(--ink)',
                    border: '0.5px solid ' + (bestDay === i ? 'var(--ink)' : 'var(--line)'),
                    display: 'flex', alignItems: 'center', gap: 14,
                    boxShadow: bestDay === i ? '0 4px 12px rgba(8,37,103,0.2)' : 'var(--shadow-sm)',
                    transition: 'all 180ms',
                  }}>
                    <div className="mono" style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: bestDay === i ? 'var(--solar)' : 'var(--accent-soft)',
                      color: 'var(--ink)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 600,
                    }}>{`G${i}`}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>
                        {['Arrivo & Baixa', 'Belém & costa', 'Alfama & miradouros', 'Relax & rientro'][i-1]}
                      </div>
                      <div style={{ fontSize: 12, color: bestDay === i ? 'rgba(255,255,255,0.6)' : 'var(--mute)' }}>
                        {['12 giu', '13 giu', '14 giu', '15 giu'][i-1]}
                      </div>
                    </div>
                    {bestDay === i && <Icon.Check size={18} style={{ color: 'var(--solar)' }}/>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <StepHeader
                kicker="03 · Highlight"
                title="Cosa ricordi di più?"
                hint="Tocca tutto quello che è stato un highlight."
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {HIGHLIGHTS.map(h => {
                  const sel = highlights.includes(h);
                  return (
                    <button key={h} onClick={() => toggleHighlight(h)} style={{
                      padding: '10px 14px', borderRadius: 999,
                      background: sel ? 'var(--solar)' : 'var(--surface)',
                      color: 'var(--ink)',
                      border: sel ? '1px solid var(--solar-deep)' : '0.5px solid var(--line)',
                      fontSize: 14, fontWeight: 500, letterSpacing: -0.1,
                      transition: 'all 180ms',
                    }}>
                      {sel && '★ '}{h}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <StepHeader
                kicker="04 · Nota"
                title={<>Una nota per <i className="serif" style={{ fontWeight: 400 }}>dopo</i></>}
                hint="Per gli amici futuri o per te stessa. Facoltativo."
              />
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="La cosa migliore è stata… / un consiglio che darei…"
                rows={5}
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'var(--surface)',
                  border: '0.5px solid var(--line)',
                  borderRadius: 16,
                  fontSize: 14, color: 'var(--ink)',
                  outline: 'none', resize: 'none',
                  lineHeight: 1.5, letterSpacing: -0.1,
                }}
              />

              <div style={{
                marginTop: 14, padding: '14px 16px',
                background: 'var(--surface)',
                border: '0.5px solid var(--line)',
                borderRadius: 16,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <Icon.Users size={20} style={{ color: 'var(--accent)' }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.2 }}>Condividi col gruppo</div>
                  <div style={{ fontSize: 12, color: 'var(--mute)' }}>Marco, Giulia e Davide vedranno la tua nota.</div>
                </div>
                <button onClick={() => setShare(s => !s)} style={{
                  width: 44, height: 26, borderRadius: 13,
                  background: share ? 'var(--ink)' : 'rgba(8,37,103,0.15)',
                  position: 'relative', transition: 'background 200ms',
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 3, left: share ? 21 : 3,
                    width: 20, height: 20, borderRadius: '50%',
                    background: share ? 'var(--solar)' : '#FFFFFF',
                    transition: 'left 200ms',
                    boxShadow: '0 1px 3px rgba(8,37,103,0.2)',
                  }}/>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, left: 16, right: 16 }}>
        <PrimaryButton onClick={next} disabled={step === 0 && rating === 0}>
          {step < total - 1 ? 'Avanti' : 'Invia feedback'}
          <Icon.ArrowRight size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
}

function FeedbackDone({ onContinue }) {
  React.useEffect(() => {
    const t = setTimeout(onContinue, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="voy-content fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
      <div style={{ textAlign: 'center', padding: 32, color: '#FFFFFF' }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: 'var(--solar)', color: 'var(--ink)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22,
          boxShadow: '0 16px 40px rgba(240,220,74,0.35)',
        }}>
          <Icon.Star size={42}/>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: -0.7 }}>
          Grazie <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--solar)' }}>davvero</span>
        </h2>
        <p style={{ margin: '10px 24px 0', fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
          Il tuo feedback aiuta a comporre meglio i prossimi itinerari del gruppo.
        </p>
      </div>
    </div>
  );
}
export { FeedbackScreen, FeedbackDone, StarRating };
