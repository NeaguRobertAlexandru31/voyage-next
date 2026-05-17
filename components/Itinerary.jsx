'use client';

import React from 'react';
import { Icon } from './Icons';
import { Pill } from './Screens';
import { ItineraryMap } from './Map';
import { SubgroupsCard, getDaySubgroups } from './Stop';

// Voyage — itinerary view with per-day map, step rows, regenerate

// Mock itinerary content for the Lisbon trip
const STEP_ICONS = {
  flight: '✈️', hotel: '🛎', walk: 'walk', meal: 'wine', breakfast: 'coffee',
  culture: 'pin', view: 'camera', sunset: 'sun', experience: 'sparkle',
  shop: 'pin', rest: 'moon',
};

function StepIcon({ kind, size = 18, color }) {
  const map = {
    walk: <Icon.Walk size={size} />, wine: <Icon.Wine size={size} />,
    coffee: <Icon.Coffee size={size} />, pin: <Icon.Pin size={size} />,
    camera: <Icon.Camera size={size} />, sun: <Icon.Sun size={size} />,
    sparkle: <Icon.Sparkle size={size} />, moon: <Icon.Moon size={size} />,
    heart: <Icon.Heart size={size} />,
  };
  const name = STEP_ICONS[kind];
  if (map[name]) return <span style={{ color }}>{map[name]}</span>;
  return <span style={{ fontSize: size, color }}>{name || kind}</span>;
}

function makeLisbonItinerary() {
  return [
    {
      idx: 1, date: 'Ven 12 giu', label: 'Arrivo & Baixa', vibe: 'Atterrate e prendete confidenza col centro.', km: 4.2, hours: 8,
      stops: [
        { id: 's1-1', time: '14:30', name: 'Aeroporto Humberto Delgado', desc: 'Volo TP1813 da Roma FCO', kind: 'flight', durationMin: 30, area: 'Lisboa Airport', x: 380, y: 80, consensus: 'logistica' },
        { id: 's1-2', time: '16:00', name: 'Check-in · Hotel Baixa Chiado', desc: 'Quartiere centrale, vicino al metrò.', kind: 'hotel', durationMin: 45, area: 'Baixa', x: 210, y: 270, consensus: 'concorda 4/4' },
        { id: 's1-3', time: '18:30', name: 'Praça do Comércio + Rua Augusta', desc: 'Camminata tra la piazza e l\'arco.', kind: 'walk', durationMin: 90, area: 'Baixa', x: 220, y: 305, consensus: 'cultura · 3/4' },
        { id: 's1-4', time: '21:00', name: 'Time Out Market', desc: 'Cena easy, tante opzioni anche veg.', kind: 'meal', durationMin: 120, area: 'Cais do Sodré', x: 175, y: 290, consensus: 'cibo · 4/4' },
      ],
    },
    {
      idx: 2, date: 'Sab 13 giu', label: 'Belém & costa', vibe: 'Giornata cultura + sole vicino al fiume.', km: 8.6, hours: 11,
      stops: [
        { id: 's2-1', time: '09:00', name: 'Pastéis de Belém', desc: 'Colazione storica. C\'è coda — ne vale la pena.', kind: 'breakfast', durationMin: 45, area: 'Belém', x: 80, y: 335, consensus: 'must-do · 4/4' },
        { id: 's2-2', time: '10:30', name: 'Torre di Belém', desc: 'Simbolo dei navigatori, vista oceanica.', kind: 'culture', durationMin: 75, area: 'Belém', x: 60, y: 350, consensus: 'cultura · 3/4' },
        { id: 's2-3', time: '12:00', name: 'Padrão dos Descobrimentos', desc: 'Salita per panorama sulla foce.', kind: 'view', durationMin: 60, area: 'Belém', x: 95, y: 345, consensus: 'vista · 4/4' },
        { id: 's2-4', time: '14:00', name: 'Pranzo a Belém', desc: 'Tavola pesce locale.', kind: 'meal', durationMin: 90, area: 'Belém', x: 110, y: 330, consensus: 'cibo · 3/4' },
        { id: 's2-5', time: '17:00', name: 'LX Factory', desc: 'Cortili, botteghe, design.', kind: 'shop', durationMin: 120, area: 'Alcântara', x: 130, y: 305, consensus: 'aperti al nuovo' },
        { id: 's2-6', time: '21:00', name: 'Cena vista Tejo', desc: 'Tavolo prenotato sulla collina.', kind: 'meal', durationMin: 120, area: 'Bairro Alto', x: 230, y: 340, consensus: 'tramonto · 4/4' },
      ],
    },
    {
      idx: 3, date: 'Dom 14 giu', label: 'Alfama & miradouros', vibe: 'Quartiere antico, tramonti dall\'alto, fado.', km: 6.1, hours: 11,
      stops: [
        { id: 's3-1', time: '10:00', name: 'Castello São Jorge', desc: 'Mura, vista sul centro e pavoni.', kind: 'culture', durationMin: 90, area: 'Alfama', x: 280, y: 250, consensus: 'cultura · 3/4' },
        { id: 's3-2', time: '12:30', name: 'Alfama walking tour', desc: 'Vicoli, panni stesi, fado nascosto.', kind: 'walk', durationMin: 120, area: 'Alfama', x: 320, y: 270, consensus: 'avventura · 4/4' },
        { id: 's3-3', time: '15:00', name: 'Pranzo tradizionale', desc: 'Tasca con bacalhau e vinho verde.', kind: 'meal', durationMin: 90, area: 'Alfama', x: 310, y: 275, consensus: 'cibo · 3/4' },
        { id: 's3-4', time: '18:00', name: 'Miradouro da Senhora do Monte', desc: 'Il punto più alto per il tramonto.', kind: 'sunset', durationMin: 75, area: 'Graça', x: 260, y: 220, consensus: 'must-do · 4/4' },
        { id: 's3-5', time: '21:30', name: 'Serata fado', desc: 'Esperienza intima, cena inclusa.', kind: 'experience', durationMin: 150, area: 'Alfama', x: 290, y: 285, consensus: 'sociale · 3/4' },
      ],
    },
    {
      idx: 4, date: 'Lun 15 giu', label: 'Relax & rientro', vibe: 'Ultime cose con calma prima del volo.', km: 5.4, hours: 7,
      stops: [
        { id: 's4-1', time: '10:00', name: 'Brunch a Príncipe Real', desc: 'Quartiere chill, locali nuovi.', kind: 'breakfast', durationMin: 90, area: 'Príncipe Real', x: 160, y: 250, consensus: 'relax · 4/4' },
        { id: 's4-2', time: '12:00', name: 'Jardim da Estrela', desc: 'Parco con laghetto, ombra e gelato.', kind: 'rest', durationMin: 75, area: 'Estrela', x: 140, y: 280, consensus: 'relax · 4/4' },
        { id: 's4-3', time: '15:00', name: 'LX Factory · ultimi souvenir', desc: 'Libreria Ler Devagar, gelati artigianali.', kind: 'shop', durationMin: 90, area: 'Alcântara', x: 130, y: 305, consensus: 'shopping · 3/4' },
        { id: 's4-4', time: '17:30', name: 'Trasferimento aeroporto', desc: 'Uber prenotato dall\'hotel.', kind: 'flight', durationMin: 30, area: 'Lisboa', x: 380, y: 80, consensus: 'logistica' },
      ],
    },
  ];
}

// ─────────────────────────────────────────────────────────────
// Itinerary screen
// ─────────────────────────────────────────────────────────────
function Itinerary({ dest, onBack, onRegenerateAll, onOpenChat, onOpenStop, onOpenFeedback }) {
  const itinerary = React.useMemo(() => dest.itinerary || makeLisbonItinerary(), [dest.itinerary]);
  const [dayIdx, setDayIdx] = React.useState(0);
  const [regenDay, setRegenDay] = React.useState(-1);
  const [activeStop, setActiveStop] = React.useState(-1);

  const day = itinerary[dayIdx];
  const stops = day.stops;
  const subgroups = getDaySubgroups ? getDaySubgroups(dayIdx, dest.members) : null;

  function regenerateDay() {
    setRegenDay(dayIdx);
    setActiveStop(-1);
    setTimeout(() => setRegenDay(-1), 1400);
  }

  return (
    <div className="voy-content screen-enter">
      {/* Map header (sticky-ish) */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', flexShrink: 0 }}>
        <ItineraryMap
          destination={dest.name + ' ' + dest.place}
          stops={stops.map(s => ({ id: s.id, name: s.name, x: s.x, y: s.y }))}
          activeIdx={activeStop}
          height={320}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(246,244,239,0.55) 0%, rgba(246,244,239,0) 22%)',
          pointerEvents: 'none',
        }} />
        {/* top bar */}
        <div style={{
          position: 'absolute', top: 56, left: 16, right: 16,
          display: 'flex', alignItems: 'center', gap: 8,
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
          <div style={{ flex: 1 }} />
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
            }}><Icon.Chat size={14} /> Chat</button>
          )}
          {dest.status === 'past' ? (
            <button onClick={onOpenFeedback} style={{
              height: 40, padding: '0 14px', borderRadius: 12,
              background: 'var(--solar)',
              color: 'var(--ink)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 500,
              boxShadow: '0 2px 6px rgba(8,37,103,0.08)',
            }}><Icon.Star size={14} /> Feedback</button>
          ) : (
            <button onClick={onRegenerateAll} style={{
              height: 40, padding: '0 14px', borderRadius: 12,
              background: 'rgba(8,37,103,0.85)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'var(--solar)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 500,
            }}><Icon.Refresh size={14} /> Rigenera</button>
          )}
        </div>

        {/* Day label overlay */}
        <div style={{
          position: 'absolute', left: 16, bottom: 16,
          background: 'rgba(8,37,103,0.85)', backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: '#FBF7E5', padding: '10px 14px', borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div className="mono" style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Giorno {day.idx}</div>
          <div style={{ width: 1, height: 14, background: 'rgba(246,244,239,0.2)' }} />
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.2 }}>{day.label}</div>
        </div>
      </div>

      {/* Day selector */}
      <div style={{
        padding: '14px 16px 4px',
        display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none',
        flexShrink: 0,
      }}>
        {itinerary.map((d, i) => {
          const sel = i === dayIdx;
          return (
            <button key={d.idx} onClick={() => { setDayIdx(i); setActiveStop(-1); }} style={{
              flexShrink: 0, padding: '10px 14px', borderRadius: 14,
              background: sel ? 'var(--ink)' : 'var(--surface)',
              color: sel ? '#FBF7E5' : 'var(--ink-2)',
              border: '0.5px solid ' + (sel ? 'var(--ink)' : 'var(--line)'),
              textAlign: 'left',
              transition: 'all 180ms',
              boxShadow: sel ? 'none' : 'var(--shadow-sm)',
            }}>
              <div className="mono" style={{ fontSize: 9, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
                {d.date.split(' ')[0]} {d.date.split(' ')[1]}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2 }}>Giorno {d.idx}</div>
            </button>
          );
        })}
      </div>

      <div className="voy-screen-scroll" style={{ paddingBottom: 100 }}>
        {/* Day summary */}
        <div style={{ padding: '14px 20px 4px' }}>
          <div style={{
            background: 'var(--surface)', borderRadius: 18,
            border: '0.5px solid var(--line)', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2, color: 'var(--ink)' }}>{day.vibe}</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 12, fontSize: 12, color: 'var(--mute)' }}>
                <span><b style={{ color: 'var(--ink-2)' }}>{day.stops.length}</b> tappe</span>
                <span><b style={{ color: 'var(--ink-2)' }}>{day.km}</b> km</span>
                <span><b style={{ color: 'var(--ink-2)' }}>{day.hours}</b> h totali</span>
              </div>
            </div>
            <button
              onClick={regenerateDay}
              disabled={regenDay === dayIdx}
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'var(--accent-soft)', color: 'var(--accent-deep)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
              title="Rigenera questa giornata"
            >
              <Icon.Refresh size={16} style={{
                animation: regenDay === dayIdx ? 'spin 800ms linear infinite' : 'none',
              }} />
            </button>
          </div>
        </div>

        {/* Subgroups suggestion (if any) */}
        {subgroups && (
          <div style={{ padding: '14px 20px 0' }}>
            <SubgroupsCard subgroups={subgroups.subgroups} reunion={subgroups.reunion} />
          </div>
        )}

        {/* Steps timeline */}
        <div style={{ padding: '16px 20px 0', position: 'relative' }}>
          {regenDay === dayIdx && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(246,244,239,0.3) 0%, rgba(246,244,239,0.85) 50%)',
              backdropFilter: 'blur(2px)',
              zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 18,
            }}>
              <div style={{ textAlign: 'center' }}>
                <Icon.Sparkle size={28} style={{ color: 'var(--accent)' }} />
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 500 }}>Sto rimescolando…</div>
              </div>
            </div>
          )}
          {stops.map((s, i) => (
            <StepRow
              key={s.id}
              step={s}
              isLast={i === stops.length - 1}
              isFirst={i === 0}
              active={activeStop === i}
              onTap={() => setActiveStop(activeStop === i ? -1 : i)}
              onOpen={() => onOpenStop && onOpenStop(s, day)}
            />
          ))}
        </div>

        {/* Bottom card with consensus stats */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{
            background: 'var(--ink)', color: '#FBF7E5',
            borderRadius: 18, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <Icon.Sparkle size={18} style={{ color: 'var(--accent)' }} />
            <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>
              <b style={{ fontWeight: 500 }}>Match 87%</b> — il giorno bilancia mood relax (Sara, Anna) e cultura (Marco, Giulia).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual step row in the timeline
function StepRow({ step, isLast, isFirst, active, onTap, onOpen }) {
  return (
    <button onClick={onTap} style={{
      display: 'flex', gap: 14, width: '100%',
      textAlign: 'left', padding: 0,
      background: 'transparent',
      position: 'relative',
      marginBottom: isLast ? 0 : 4,
    }}>
      {/* Time + timeline rail */}
      <div style={{ width: 52, flexShrink: 0, position: 'relative', paddingTop: 4 }}>
        <div className="mono" style={{
          fontSize: 12, color: 'var(--ink-2)', fontWeight: 500,
          letterSpacing: 0.02, marginBottom: 8,
        }}>{step.time}</div>
        {/* dot */}
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: active ? 'var(--accent)' : 'var(--surface)',
          color: active ? '#FFFFFF' : 'var(--ink-2)',
          border: '0.5px solid ' + (active ? 'var(--accent)' : 'var(--line)'),
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginLeft: 4,
          boxShadow: active ? '0 4px 12px rgba(111,142,81,0.3)' : 'var(--shadow-sm)',
          transition: 'all 200ms',
          position: 'relative', zIndex: 1,
        }}>
          <StepIcon kind={step.kind} size={14} />
        </div>
        {/* connecting line */}
        {!isLast && (
          <div style={{
            position: 'absolute', top: 56, left: 17.5, bottom: -10,
            width: 1, background: 'rgba(8,37,103,0.1)',
            borderLeft: '1px dashed rgba(8,37,103,0.18)',
          }} />
        )}
      </div>

      {/* Content card */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
        <div style={{
          background: active ? 'var(--surface)' : 'rgba(255,255,255,0.5)',
          borderRadius: 16,
          border: '0.5px solid ' + (active ? 'var(--ink)' : 'var(--line)'),
          padding: '14px 16px',
          transition: 'all 200ms',
          boxShadow: active ? 'var(--shadow-md)' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.2, flex: 1 }}>{step.name}</h3>
            <span className="mono" style={{ fontSize: 11, color: 'var(--mute)', whiteSpace: 'nowrap' }}>{step.durationMin}min</span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--mute)', lineHeight: 1.4 }}>{step.desc}</p>

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Pill tone="neutral"><Icon.Pin size={10} />{step.area}</Pill>
            <Pill tone="accent"><Icon.Heart size={10} />{step.consensus}</Pill>
          </div>

          {active && (
            <div className="fade-in" style={{
              marginTop: 12, paddingTop: 12,
              borderTop: '0.5px dashed var(--line)',
              display: 'flex', gap: 8,
            }}>
              <button onClick={(e) => { e.stopPropagation(); onOpen && onOpen(); }} style={{
                flex: 1, height: 36, borderRadius: 10,
                background: 'var(--ink)', color: 'var(--solar)',
                fontSize: 12, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}><Icon.Info size={12} /> Info & trasporti</button>
              <button onClick={(e) => e.stopPropagation()} style={{
                flex: 1, height: 36, borderRadius: 10,
                background: 'rgba(8,37,103,0.05)', color: 'var(--ink)',
                fontSize: 12, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}><Icon.Refresh size={12} /> Sostituisci</button>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
export { Itinerary, makeLisbonItinerary };
