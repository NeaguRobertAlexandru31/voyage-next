'use client';

import React from 'react';
import { Icon } from './Icons';
import { Avatar, AvatarStack, Pill, PrimaryButton, ScreenHeader } from './Screens';
import { ItineraryMap } from './Map';

// Voyage — destination detail, quiz form, waiting state, generation animation

// ─────────────────────────────────────────────────────────────
// Destination detail / hub — shows status, members, CTA
// ─────────────────────────────────────────────────────────────
function DestDetail({ dest, onBack, onStartForm, onSeeItinerary, onRegenerate, onOpenChat, onOpenFeedback }) {
  const submitted = dest.members.filter(m => m.submitted).length;
  const total = dest.members.length;
  const meMember = dest.members.find(m => m.isMe);
  const meSubmitted = meMember?.submitted;
  const allDone = submitted === total;

  return (
    <div className="voy-content screen-enter">
      <div className="voy-screen-scroll" style={{ paddingBottom: 130 }}>
        {/* Map hero */}
        <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
          <ItineraryMap
            destination={dest.name + ' ' + dest.place}
            stops={dest.previewStops || []}
            height={320}
            animated={false}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(246,244,239,0.7) 0%, rgba(246,244,239,0) 30%, rgba(246,244,239,0) 60%, rgba(246,244,239,1) 100%)',
            pointerEvents: 'none',
          }} />

          {/* top bar */}
          <div style={{
            position: 'absolute', top: 56, left: 16, right: 16,
            display: 'flex', justifyContent: 'space-between', gap: 8,
          }}>
            <button onClick={onBack} style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)',
              boxShadow: '0 2px 6px rgba(8,37,103,0.08)',
              border: '0.5px solid rgba(8,37,103,0.06)',
            }}><Icon.Back size={20} /></button>
            <div style={{ flex: 1 }}/>
            {onOpenChat && (
              <button onClick={onOpenChat} style={{
                height: 40, padding: '0 14px', borderRadius: 12,
                background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'var(--ink)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 500,
                boxShadow: '0 2px 6px rgba(8,37,103,0.08)',
                border: '0.5px solid rgba(8,37,103,0.06)',
              }}><Icon.Chat size={14}/> Chat</button>
            )}
            <button style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)',
              boxShadow: '0 2px 6px rgba(8,37,103,0.08)',
              border: '0.5px solid rgba(8,37,103,0.06)',
            }}><Icon.More size={18} /></button>
          </div>
        </div>

        {/* Title block */}
        <div style={{ padding: '0 20px', marginTop: -40, position: 'relative', zIndex: 2 }}>
          <Pill tone="dark"><Icon.Pin size={11} /> {dest.place}</Pill>
          <h1 style={{ margin: '12px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: -0.8, lineHeight: 1.05 }}>{dest.name}</h1>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--mute)', fontSize: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon.Calendar size={13}/> {dest.dateLabel}
            </span>
            <span>·</span>
            <span>{dest.days} giorni</span>
          </div>
        </div>

        {/* Status panel */}
        {dest.status === 'waiting' && (
          <div style={{ padding: '24px 20px 0' }}>
            <div style={{
              background: 'var(--surface)', borderRadius: 22,
              border: '0.5px solid var(--line)', padding: 18,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="mono">Status</div>
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3, marginTop: 2 }}>
                    {submitted} di {total} hanno risposto
                  </div>
                </div>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  position: 'relative',
                }}>
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(8,37,103,0.08)" strokeWidth="4" />
                    <circle cx="28" cy="28" r="24" fill="none" stroke="var(--accent)" strokeWidth="4"
                      strokeDasharray={`${2*Math.PI*24}`}
                      strokeDashoffset={`${2*Math.PI*24*(1 - submitted/total)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600, letterSpacing: -0.2,
                  }}>{Math.round((submitted/total)*100)}%</div>
                </div>
              </div>

              {/* member rows */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dest.members.map((m, i) => (
                  <div key={m.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '8px 0',
                    borderTop: i === 0 ? 'none' : '0.5px solid var(--line)',
                  }}>
                    <Avatar name={m.name} color={m.color} size={32} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.2 }}>
                        {m.name}{m.isMe && <span style={{ color: 'var(--mute)', fontWeight: 400 }}> · tu</span>}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--mute)' }} className="mono">
                        {m.submitted ? 'risposto' : 'in attesa…'}
                      </div>
                    </div>
                    {m.submitted ? (
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: 'var(--accent)', color: '#FFFFFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><Icon.Check size={12} /></div>
                    ) : (
                      <div className="pulse" style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: 'var(--warn)',
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {!meSubmitted && (
                <PrimaryButton tone="accent" onClick={onStartForm}>
                  <Icon.Sparkle size={16}/> Compila il tuo form
                </PrimaryButton>
              )}
              {meSubmitted && allDone && (
                <PrimaryButton onClick={onSeeItinerary}>
                  <Icon.Sparkle size={16}/> Genera l'itinerario
                </PrimaryButton>
              )}
              {meSubmitted && !allDone && (
                <div style={{
                  background: 'rgba(8,37,103,0.04)', borderRadius: 16,
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <Icon.Clock size={16} style={{ color: 'var(--mute)' }} />
                  <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Aspettiamo gli altri. Ti avvisiamo appena hanno finito.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {dest.status === 'ready' && (
          <div style={{ padding: '24px 20px 0' }}>
            <div style={{
              background: 'var(--ink)', color: '#FBF7E5',
              borderRadius: 22, padding: 20,
              backgroundImage: 'radial-gradient(400px 200px at 80% 0%, rgba(255,255,255,0.06), transparent)',
            }}>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(246,244,239,0.6)' }}>itinerario</div>
              <div style={{ marginTop: 6, fontSize: 22, fontWeight: 600, letterSpacing: -0.4, lineHeight: 1.2 }}>
                Tutti d'accordo. <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-soft)' }}>Ecco la tua avventura.</span>
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                <button onClick={onSeeItinerary} style={{
                  flex: 1, height: 46, background: 'var(--accent)', color: '#FFFFFF',
                  borderRadius: 12, fontSize: 14, fontWeight: 500, letterSpacing: -0.2,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  Apri itinerario <Icon.ArrowRight size={14} />
                </button>
                <button onClick={onRegenerate} style={{
                  height: 46, padding: '0 14px',
                  background: 'rgba(255,255,255,0.08)', color: '#FBF7E5',
                  borderRadius: 12, fontSize: 14, fontWeight: 500,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  <Icon.Refresh size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {dest.status === 'past' && (
          <div style={{ padding: '24px 20px 0' }}>
            <div style={{
              background: 'var(--solar-soft)', border: '1px solid var(--solar-deep)',
              borderRadius: 22, padding: 18,
            }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Viaggio concluso</div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.3, marginTop: 4, color: 'var(--ink)' }}>
                Com'è andata?
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-2)' }}>
                Lascia un feedback per i prossimi viaggi del gruppo.
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                <button onClick={onOpenFeedback} style={{
                  flex: 1, height: 46, background: 'var(--ink)', color: 'var(--solar)',
                  borderRadius: 12, fontSize: 14, fontWeight: 500, letterSpacing: -0.2,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <Icon.Star size={14}/> Lascia feedback
                </button>
                <button onClick={onSeeItinerary} style={{
                  height: 46, padding: '0 14px',
                  background: 'rgba(8,37,103,0.06)', color: 'var(--ink)',
                  borderRadius: 12, fontSize: 14, fontWeight: 500,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  Rivedi
                </button>
              </div>
            </div>
          </div>
        )}

        {dest.note && (
          <div style={{ padding: '20px 20px 0' }}>
            <div style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }} className="mono">Nota del creatore</div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{dest.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QUIZ FORM — multi-step, anonymous
// ─────────────────────────────────────────────────────────────
const MOOD_OPTIONS = [
  { id: 'avventura', label: 'Avventura', desc: 'Pelle d\'oca, gambe stanche.', icon: '🏔', accent: '#E07A4A' },
  { id: 'relax',     label: 'Relax',     desc: 'Pace, ombra, niente sveglie.', icon: '🌿', accent: '#6082B6' },
  { id: 'cultura',   label: 'Cultura',   desc: 'Storia, mostre, quartieri.', icon: '🏛', accent: '#082567' },
  { id: 'sociale',   label: 'Sociale',   desc: 'Gente, locali, vita di città.', icon: '🥂', accent: '#F0DC4A' },
];

const PACE_OPTIONS = [
  { id: 'slow', label: 'Tranquillo', desc: '2-3 cose al giorno' },
  { id: 'medium', label: 'Bilanciato', desc: 'Mix di attività e pause' },
  { id: 'full', label: 'Pieno', desc: 'Sveglia presto, dentro tutto' },
];

const FOOD_OPTIONS = [
  { id: 'street', label: 'Street food', emoji: '🌯' },
  { id: 'tipico', label: 'Cucina tipica', emoji: '🍝' },
  { id: 'fine',   label: 'Fine dining', emoji: '🥂' },
  { id: 'veg',    label: 'Veg-friendly', emoji: '🥗' },
  { id: 'cafe',   label: 'Café & dolci', emoji: '☕' },
  { id: 'mercato',label: 'Mercati', emoji: '🥦' },
];

const SUGGESTED_MUSTDO = [
  'Tramonto in spiaggia', 'Mercato locale', 'Tour gastronomico',
  'Camminata in centro', 'Vista panoramica', 'Concerto live',
  'Spa / hammam', 'Trekking', 'Bagno all\'alba',
];

function QuizProgress({ step, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '12px 20px 4px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 999,
          background: i < step ? 'var(--ink)' : i === step ? 'var(--ink)' : 'rgba(8,37,103,0.1)',
          opacity: i < step ? 1 : i === step ? 0.45 : 1,
          transition: 'all 300ms',
        }} />
      ))}
    </div>
  );
}

function QuizForm({ destName, place, onBack, onComplete }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    mood: '', openness: 50, mustDo: [], custom: '', pace: '', food: [],
  });
  const total = 5;

  function update(key, value) { setData(d => ({ ...d, [key]: value })); }
  function toggleArr(key, value) {
    setData(d => ({ ...d, [key]: d[key].includes(value) ? d[key].filter(x => x !== value) : [...d[key], value] }));
  }

  const canNext = (() => {
    if (step === 0) return !!data.mood;
    if (step === 2) return data.mustDo.length > 0;
    if (step === 3) return !!data.pace;
    if (step === 4) return data.food.length > 0;
    return true;
  })();

  function next() {
    if (step < total - 1) setStep(s => s + 1);
    else onComplete(data);
  }

  return (
    <div className="voy-content screen-enter" style={{ background: 'var(--bg)' }}>
      <div style={{ paddingTop: 56 }}>
        <QuizProgress step={step} total={total} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 8px' }}>
          <button onClick={() => step === 0 ? onBack() : setStep(s => s - 1)} style={{
            width: 40, height: 40, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(8,37,103,0.05)',
          }}><Icon.Back size={18} /></button>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>
              Form anonimo · {step + 1} / {total}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', letterSpacing: -0.2, marginTop: 2 }}>
              {destName}
            </div>
          </div>
          <div style={{ width: 40 }} />
        </div>
      </div>

      <div className="voy-screen-scroll" key={step}>
        <div className="screen-enter" style={{ padding: '16px 20px 40px' }}>
          {step === 0 && <StepMood data={data} update={update} />}
          {step === 1 && <StepOpenness data={data} update={update} />}
          {step === 2 && <StepMustDo data={data} update={update} toggleArr={toggleArr} />}
          {step === 3 && <StepPace data={data} update={update} />}
          {step === 4 && <StepFood data={data} toggleArr={toggleArr} />}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, left: 16, right: 16 }}>
        <PrimaryButton onClick={next} disabled={!canNext}>
          {step < total - 1 ? 'Avanti' : 'Invia anonimamente'}
          <Icon.ArrowRight size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
}

function StepHeader({ kicker, title, hint }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--accent-deep)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{kicker}</div>
      <h2 style={{ margin: '8px 0 6px', fontSize: 28, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.12 }}>{title}</h2>
      {hint && <p style={{ margin: 0, fontSize: 14, color: 'var(--mute)', lineHeight: 1.5 }}>{hint}</p>}
    </div>
  );
}

function StepMood({ data, update }) {
  return (
    <div>
      <StepHeader
        kicker="01 · Mood"
        title={<>Per <i className="serif" style={{ fontWeight: 400 }}>te</i>, che viaggio dev'essere?</>}
        hint="Scegli quello che ti rappresenta di più — risposte combinate poi."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {MOOD_OPTIONS.map(opt => {
          const sel = data.mood === opt.id;
          return (
            <button key={opt.id} onClick={() => update('mood', opt.id)} style={{
              padding: '16px 14px 14px',
              borderRadius: 18,
              textAlign: 'left',
              background: sel ? 'var(--ink)' : 'var(--surface)',
              color: sel ? '#FBF7E5' : 'var(--ink)',
              border: '0.5px solid ' + (sel ? 'var(--ink)' : 'var(--line)'),
              transition: 'all 200ms',
              minHeight: 130,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              boxShadow: sel ? '0 4px 12px rgba(8,37,103,0.18)' : 'var(--shadow-sm)',
            }}>
              <div style={{ fontSize: 28 }}>{opt.icon}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.3 }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: sel ? 'rgba(246,244,239,0.6)' : 'var(--mute)', marginTop: 2, lineHeight: 1.3 }}>{opt.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepOpenness({ data, update }) {
  const val = data.openness;
  return (
    <div>
      <StepHeader
        kicker="02 · Apertura"
        title={<>Quanto sei <i className="serif" style={{ fontWeight: 400 }}>aperto</i> a cose nuove?</>}
        hint="Da 'voglio quello che conosco' a 'sorprendimi totale'."
      />

      <div style={{
        background: 'var(--surface)', borderRadius: 22,
        border: '0.5px solid var(--line)', padding: 22,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1, color: 'var(--ink)' }}>
            {val}<span style={{ fontSize: 22, fontWeight: 500, color: 'var(--mute)' }}>/100</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: 'var(--mute)' }}>
            {val < 20 && 'Comfort zone — ho voglia di quello che amo'}
            {val >= 20 && val < 45 && 'Qualche novità, ma niente di assurdo'}
            {val >= 45 && val < 70 && 'Vado a cuore aperto, vediamo'}
            {val >= 70 && val < 90 && 'Sorprendimi spesso'}
            {val >= 90 && 'Tutto nuovo, niente piano'}
          </div>
        </div>

        <input
          type="range" min="0" max="100" step="1"
          value={val}
          onChange={e => update('openness', parseInt(e.target.value))}
          style={{
            width: '100%', accentColor: 'var(--accent)',
            height: 4,
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--mute)' }} className="mono">
          <span>ROUTINE</span>
          <span>SORPRESA</span>
        </div>
      </div>

      {/* visual feedback */}
      <div style={{ marginTop: 18, display: 'flex', gap: 6, justifyContent: 'center' }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 11;
          const active = t * 100 <= val;
          return (
            <div key={i} style={{
              width: 6, height: 32 + i * 2, borderRadius: 4,
              background: active ? 'var(--accent)' : 'rgba(8,37,103,0.06)',
              transition: 'background 200ms',
            }} />
          );
        })}
      </div>
    </div>
  );
}

function StepMustDo({ data, update, toggleArr }) {
  return (
    <div>
      <StepHeader
        kicker="03 · Must-do"
        title={<>Cosa <i className="serif" style={{ fontWeight: 400 }}>non puoi</i> perderti?</>}
        hint="Le cose senza le quali torneresti a casa storta. Anche solo una basta."
      />

      <input
        type="text" value={data.custom}
        onChange={e => update('custom', e.target.value)}
        placeholder="Aggiungi una cosa tua…"
        style={{
          width: '100%', height: 52, padding: '0 18px',
          background: 'var(--surface)',
          border: '0.5px solid var(--line)',
          borderRadius: 16,
          fontSize: 15, outline: 'none', letterSpacing: -0.2,
          marginBottom: 18,
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && data.custom.trim()) {
            toggleArr('mustDo', data.custom.trim());
            update('custom', '');
          }
        }}
      />

      <div className="mono" style={{ fontSize: 11, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
        Suggerimenti
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SUGGESTED_MUSTDO.map(s => {
          const sel = data.mustDo.includes(s);
          return (
            <button key={s} onClick={() => toggleArr('mustDo', s)} style={{
              padding: '10px 14px', borderRadius: 999,
              background: sel ? 'var(--ink)' : 'var(--surface)',
              color: sel ? '#FBF7E5' : 'var(--ink-2)',
              border: sel ? '0.5px solid var(--ink)' : '0.5px solid var(--line)',
              fontSize: 14, fontWeight: 500, letterSpacing: -0.1,
              transition: 'all 180ms',
            }}>{sel && '✓ '}{s}</button>
          );
        })}
      </div>

      {data.mustDo.filter(x => !SUGGESTED_MUSTDO.includes(x)).length > 0 && (
        <>
          <div className="mono" style={{ fontSize: 11, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '18px 0 10px' }}>
            Tue aggiunte
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {data.mustDo.filter(x => !SUGGESTED_MUSTDO.includes(x)).map(s => (
              <span key={s} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 12px', borderRadius: 999,
                background: 'var(--accent-soft)', color: 'var(--accent-deep)',
                fontSize: 14, fontWeight: 500,
              }}>
                {s}
                <button onClick={() => toggleArr('mustDo', s)} style={{ display: 'inline-flex', color: 'inherit' }}>
                  <Icon.Close size={12} />
                </button>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StepPace({ data, update }) {
  return (
    <div>
      <StepHeader
        kicker="04 · Ritmo"
        title={<>Che <i className="serif" style={{ fontWeight: 400 }}>ritmo</i> ti immagini?</>}
        hint="Quanta densità di cose vuoi nella giornata-tipo."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PACE_OPTIONS.map((opt, i) => {
          const sel = data.pace === opt.id;
          return (
            <button key={opt.id} onClick={() => update('pace', opt.id)} style={{
              padding: '18px 20px',
              borderRadius: 18, textAlign: 'left',
              background: sel ? 'var(--ink)' : 'var(--surface)',
              color: sel ? '#FBF7E5' : 'var(--ink)',
              border: '0.5px solid ' + (sel ? 'var(--ink)' : 'var(--line)'),
              display: 'flex', alignItems: 'center', gap: 16,
              transition: 'all 180ms',
              boxShadow: sel ? '0 4px 12px rgba(8,37,103,0.18)' : 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} style={{
                    width: 5, height: 20 + j * 6, borderRadius: 3,
                    background: j <= i ? (sel ? '#FBF7E5' : 'var(--accent)') : (sel ? 'rgba(246,244,239,0.2)' : 'rgba(8,37,103,0.08)'),
                  }} />
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.3 }}>{opt.label}</div>
                <div style={{ fontSize: 13, color: sel ? 'rgba(246,244,239,0.6)' : 'var(--mute)', marginTop: 2 }}>{opt.desc}</div>
              </div>
              {sel && <Icon.Check size={20} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepFood({ data, toggleArr }) {
  return (
    <div>
      <StepHeader
        kicker="05 · Tavola"
        title={<>Come <i className="serif" style={{ fontWeight: 400 }}>mangi</i> in viaggio?</>}
        hint="Più di una. Aiuta a trovare i posti giusti per tutti."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {FOOD_OPTIONS.map(opt => {
          const sel = data.food.includes(opt.id);
          return (
            <button key={opt.id} onClick={() => toggleArr('food', opt.id)} style={{
              padding: '18px 16px', borderRadius: 18,
              background: sel ? 'var(--accent-soft)' : 'var(--surface)',
              border: '0.5px solid ' + (sel ? 'var(--accent)' : 'var(--line)'),
              color: 'var(--ink)',
              display: 'flex', alignItems: 'center', gap: 12,
              textAlign: 'left',
              transition: 'all 180ms',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontSize: 22 }}>{opt.emoji}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500, letterSpacing: -0.2 }}>{opt.label}</div>
              {sel && <div style={{
                width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)',
                color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon.Check size={12} /></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Form completion → success then back to detail
// ─────────────────────────────────────────────────────────────
function FormDone({ onContinue }) {
  React.useEffect(() => {
    const t = setTimeout(onContinue, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="voy-content fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: 32 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--accent)', color: '#FFFFFF',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
          boxShadow: '0 16px 40px rgba(111,142,81,0.4)',
        }}><Icon.Check size={36} /></div>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: -0.6 }}>
          Inviato <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400 }}>anonimamente</span>
        </h2>
        <p style={{ margin: '10px 24px 0', fontSize: 14, color: 'var(--mute)', lineHeight: 1.5 }}>
          Le tue preferenze entreranno nel calcolo. Nessuno saprà cos'hai scritto.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GENERATING animation
// ─────────────────────────────────────────────────────────────
const GEN_STEPS = [
  'Sto leggendo i mood di tutti',
  'Sovrappongo i must-do',
  'Filtro per ritmo e apertura',
  'Compongo le giornate',
  'Ottimizzo gli spostamenti',
];

function Generating({ destName, onDone }) {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setStep(s => {
        if (s + 1 >= GEN_STEPS.length) {
          clearInterval(id);
          setTimeout(onDone, 700);
          return s + 1;
        }
        return s + 1;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="voy-content fade-in" style={{ background: 'var(--ink)', color: '#FBF7E5' }}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 32, textAlign: 'center',
      }}>
        {/* Animated rings */}
        <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 30 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute', inset: i * 16, borderRadius: '50%',
              border: '0.5px solid rgba(246,244,239,0.15)',
              borderTopColor: 'var(--accent)',
              animation: `spin ${3 + i}s linear infinite`,
              animationDirection: i % 2 ? 'reverse' : 'normal',
            }} />
          ))}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48,
          }}>
            <Icon.Sparkle size={48} style={{ color: 'var(--accent)' }} />
          </div>
        </div>

        <div className="mono" style={{ fontSize: 10, color: 'rgba(246,244,239,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>
          Generazione · {destName}
        </div>

        <div style={{ minHeight: 100, width: '100%' }}>
          {GEN_STEPS.map((s, i) => {
            if (i > step) return null;
            return (
              <div key={i} className="fade-in" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 20px',
                opacity: i === step ? 1 : 0.4,
                fontSize: i === step ? 16 : 13,
                fontWeight: i === step ? 500 : 400,
                letterSpacing: -0.2,
                transition: 'all 300ms',
              }}>
                {i < step
                  ? <Icon.Check size={14} style={{ color: 'var(--accent)' }} />
                  : <div className="pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                }
                <span>{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export { DestDetail, QuizForm, FormDone, Generating, StepHeader, QuizProgress, MOOD_OPTIONS };
