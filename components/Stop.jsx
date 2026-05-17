'use client';

import React from 'react';
import { Icon } from './Icons';
import { Pill, PrimaryButton } from './Screens';
import { PhotoPlaceholder } from './Chat';

// Voyage — stop detail screen + subgroups card

// ─────────────────────────────────────────────────────────────
// Enriched stop info (mock — would come from algorithm/AI in real app)
// ─────────────────────────────────────────────────────────────
function getStopInfo(step) {
  // returns transport options, tips, why-this-stop, photos count
  const transportByKind = {
    flight: [
      { mode: 'aeroporto', icon: 'flight', label: 'Aeroplano', detail: 'Lisbon LIS · Volo TP1813' },
    ],
    hotel: [
      { mode: 'taxi', icon: 'taxi', label: 'Taxi/Uber', detail: '€8 — 12 min dall\'aeroporto' },
      { mode: 'metro', icon: 'metro', label: 'Metro rossa', detail: '€1.65 — fermata Saldanha' },
    ],
  };
  const generic = [
    { mode: 'walk', icon: 'walk', label: 'A piedi', detail: '12 min · 950m da Baixa', pref: true },
    { mode: 'metro', icon: 'metro', label: 'Metropolitana', detail: '€1.65 · linea verde Rossio' },
    { mode: 'taxi', icon: 'taxi', label: 'Taxi/Uber', detail: '€5–7 · 6 min' },
  ];
  return transportByKind[step.kind] || generic;
}

function getStopTips(step) {
  // tip examples per kind
  const tips = {
    breakfast: [
      'Aspettati 15-20 min di coda — vale la pena.',
      'Ordina al banco è più veloce che al tavolo.',
      'Non perdere il pastéis caldo con cannella sopra.',
    ],
    culture: [
      'Biglietto online 20% in meno e salti la coda.',
      'Mattino presto = poche persone e luce migliore.',
      'Audioguida disponibile in italiano.',
    ],
    view: [
      'L\'orario d\'oro è 30 min prima del tramonto.',
      'Porta una giacca leggera — vento di mare.',
      'C\'è un piccolo chiosco con caffè.',
    ],
    walk: [
      'Scarpe comode — ciottoli ovunque.',
      'Non perderti i miradouros lungo il percorso.',
      'Una bottiglia d\'acqua aiuta col caldo.',
    ],
    meal: [
      'Prenotazione consigliata in stagione.',
      'Menu del giorno meno caro a pranzo.',
      'Hanno opzioni veg ma chiedi al cameriere.',
    ],
    sunset: [
      'Arrivate 30 min prima per trovare posto.',
      'C\'è chi suona fado, lascia 2-3€.',
      'Le scalinate sono ripide — calma.',
    ],
    shop: [
      'Aperto fino a tardi nel weekend.',
      'Lerm Devagar — libreria iconica al primo piano.',
      'Pagamenti contactless ovunque.',
    ],
  };
  return tips[step.kind] || tips.walk;
}

function getStopWhy(step) {
  // explanation linked to mood / consensus
  const map = {
    'must-do · 4/4': 'L\'avete messo tutti tra i must-do. È prioritario nell\'itinerario.',
    'cultura · 3/4': 'Marco, Giulia e Davide hanno scelto "Cultura". Sara può unirsi o spostarsi al café accanto.',
    'tramonto · 4/4': '4 di 4 hanno indicato il tramonto come momento clou. Slot riservato.',
    'cibo · 4/4': 'Tutti hanno indicato "cucina tipica" — questo posto matcha al 92%.',
    'cibo · 3/4': '3 di 4 vogliono cucina tipica. Davide ha veg-friendly: opzioni presenti.',
    'avventura · 4/4': 'Quartiere top per chi ha messo "avventura" e apertura > 70.',
    'vista · 4/4': 'Tutti hanno chiesto "vista panoramica" tra i must-do.',
    'relax · 4/4': 'Tutti vogliono pace al mattino. Slot leggero per partire bene.',
    'sociale · 3/4': '3 hanno chiesto vita locale. Slot serale ideale.',
  };
  return map[step.consensus] || 'Buon match medio per il mood del gruppo.';
}

// ─────────────────────────────────────────────────────────────
// Stop detail full screen
// ─────────────────────────────────────────────────────────────
function StopDetail({ step, dayLabel, onBack, dest }) {
  const transports = getStopInfo(step);
  const tips = getStopTips(step);
  const why = getStopWhy(step);

  return (
    <div className="voy-content screen-enter" style={{ background: 'var(--bg)' }}>
      <div className="voy-screen-scroll" style={{ paddingBottom: 110 }}>
        {/* Hero photo */}
        <div style={{ position: 'relative', height: 280 }}>
          <PhotoPlaceholder height={280} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,37,103,0.3) 0%, rgba(8,37,103,0) 30%, rgba(8,37,103,0) 60%, var(--bg) 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 56, left: 16, right: 16,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <button onClick={onBack} style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)',
              boxShadow: '0 2px 6px rgba(8,37,103,0.1)',
            }}><Icon.Back size={20} /></button>
            <button style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)',
              boxShadow: '0 2px 6px rgba(8,37,103,0.1)',
            }}><Icon.Heart size={18} /></button>
          </div>
        </div>

        {/* Title */}
        <div style={{ padding: '0 20px', marginTop: -40, position: 'relative', zIndex: 2 }}>
          <Pill tone="solar"><Icon.Sparkle size={10}/> {step.consensus}</Pill>
          <h1 style={{ margin: '12px 0 0', fontSize: 28, fontWeight: 600, letterSpacing: -0.7, lineHeight: 1.1 }}>{step.name}</h1>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--mute)', fontSize: 13 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon.Clock size={12}/> {step.time} · {step.durationMin}min
            </span>
            <span>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon.Pin size={12}/> {step.area}
            </span>
          </div>
          <div className="mono" style={{ marginTop: 6, fontSize: 11, color: 'var(--mute-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{dayLabel}</div>
        </div>

        {/* Why this stop */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{
            background: 'var(--solar-soft)',
            border: '0.5px solid var(--solar-deep)',
            borderRadius: 18, padding: '14px 16px',
            display: 'flex', gap: 12,
          }}>
            <Icon.Sparkle size={20} style={{ color: 'var(--ink)', flexShrink: 0, marginTop: 2 }}/>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Perché questa tappa</div>
              <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.4, letterSpacing: -0.1 }}>{why}</div>
            </div>
          </div>
        </div>

        {/* Transport */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="mono">Come arrivare</div>
            <Pill tone="accent">consiglio Voyage</Pill>
          </div>
          <div style={{
            background: 'var(--surface)', borderRadius: 18,
            border: '0.5px solid var(--line)',
            overflow: 'hidden',
          }}>
            {transports.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderTop: i === 0 ? 'none' : '0.5px solid var(--line)',
                background: t.pref ? 'var(--solar-soft)' : 'transparent',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: t.pref ? 'var(--solar)' : 'var(--accent-soft)',
                  color: 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {t.icon === 'walk' ? <Icon.Walk size={16}/>
                  : t.icon === 'metro' ? <Icon.Bus size={16}/>
                  : t.icon === 'taxi' ? <Icon.Bus size={16}/>
                  : <Icon.Compass size={16}/>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {t.label}
                    {t.pref && <Pill tone="dark">consigliato</Pill>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--mute)' }}>{t.detail}</div>
                </div>
                <Icon.ArrowRight size={14} style={{ color: 'var(--mute-2)' }}/>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }} className="mono">Info utili</div>
          <div style={{
            background: 'var(--surface)', borderRadius: 18,
            border: '0.5px solid var(--line)',
            padding: '6px 4px',
          }}>
            {tips.map((tip, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12,
                padding: '12px 14px',
                borderBottom: i < tips.length - 1 ? '0.5px solid var(--line)' : 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 7,
                  background: 'var(--accent-soft)', color: 'var(--accent-deep)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600,
                  flexShrink: 0,
                  fontFamily: 'Geist Mono, monospace',
                }}>{i+1}</div>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4, letterSpacing: -0.1 }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photos teaser */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="mono">Foto del gruppo</div>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>Apri chat</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}>
                <PhotoPlaceholder height={110}/>
              </div>
            ))}
          </div>
        </div>

        {/* Action: sostituisci */}
        <div style={{ padding: '24px 20px 0' }}>
          <PrimaryButton tone="accent"><Icon.Refresh size={16}/> Sostituisci questa tappa</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Subgroups suggestion card — for use inside Itinerary day view
// ─────────────────────────────────────────────────────────────
function SubgroupsCard({ subgroups, reunion }) {
  return (
    <div style={{
      background: 'var(--ink)', color: '#FFFFFF',
      borderRadius: 20, padding: 18,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,247,133,0.25) 0%, transparent 60%)',
      }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Icon.Split size={16} style={{ color: 'var(--solar)' }}/>
          <span className="mono" style={{ fontSize: 10, color: 'var(--solar)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Suggerimento Voyage</span>
        </div>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: -0.4, lineHeight: 1.2 }}>
          Oggi pomeriggio <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--solar)' }}>vi dividete</span>
        </h3>
        <p style={{ margin: '6px 0 14px', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
          I mood divergono — meglio così, tutti felici. Vi rivedete per cena.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {subgroups.map((g, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 14, padding: 12,
            }}>
              <div style={{ display: 'flex', marginBottom: 8 }}>
                {g.members.map((m, j) => (
                  <div key={m.id} style={{ marginLeft: j === 0 ? 0 : -6 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: m.color,
                      color: '#FFFFFF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 600,
                      boxShadow: '0 0 0 2px var(--ink)',
                    }}>{(m.name || '?').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.2 }}>{g.activity}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{g.time}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 12, padding: '10px 12px',
          background: 'rgba(255,247,133,0.12)',
          border: '0.5px dashed rgba(255,247,133,0.4)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon.Pin size={14} style={{ color: 'var(--solar)' }}/>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', letterSpacing: -0.1 }}>
            Vi rivedete <b style={{ color: 'var(--solar)' }}>{reunion.where}</b> alle <b style={{ color: 'var(--solar)' }}>{reunion.time}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

// Sample subgroups for Lisbon Day 3
function getDaySubgroups(dayIdx, members) {
  // only on day 3 (index 2): culture vs relax
  if (dayIdx !== 2) return null;
  const me = members.find(m => m.isMe);
  const marco = members.find(m => m.id === 'm1');
  const giulia = members.find(m => m.id === 'm2');
  const davide = members.find(m => m.id === 'm3');
  if (!marco || !giulia || !davide) return null;
  return {
    subgroups: [
      { members: [marco, giulia], activity: 'Museo del Fado + Sé Catedral', time: '14:30 — 17:30' },
      { members: [me, davide], activity: 'Caffè al Miradouro de Santa Luzia', time: '15:00 — 17:30' },
    ],
    reunion: { where: 'Miradouro Senhora do Monte', time: '18:00' },
  };
}
export { StopDetail, SubgroupsCard, getDaySubgroups, getStopInfo, getStopTips, getStopWhy };
