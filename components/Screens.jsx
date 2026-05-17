'use client';

import React from 'react';
import { Icon } from './Icons';
import { MapThumb, CreateMap } from './Map';

// Voyage — shared components, home, create flow, profile, nav

// ─────────────────────────────────────────────────────────────
// Shared UI primitives
// ─────────────────────────────────────────────────────────────

function Avatar({ name, color = '#6082B6', size = 28, ring = false, dim = false }) {
  const initials = (name || '?').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: dim ? '#E0DDD4' : color,
      color: dim ? 'rgba(8,37,103,0.45)' : '#FFFFFF',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 600,
      flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px #FBF7E5, 0 0 0 ${dim ? 3 : 3.5}px ${color}` : 'none',
      letterSpacing: -0.3,
    }}>{initials}</div>
  );
}

function AvatarStack({ members, max = 4, size = 28 }) {
  const shown = members.slice(0, max);
  const rest = members.length - shown.length;
  return (
    <div style={{ display: 'inline-flex' }}>
      {shown.map((m, i) => (
        <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
          <Avatar name={m.name} color={m.color} size={size} ring />
        </div>
      ))}
      {rest > 0 && (
        <div style={{
          marginLeft: -8,
          width: size, height: size, borderRadius: '50%',
          background: '#FFFFFF', color: 'var(--ink-2)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size * 0.36, fontWeight: 600,
          boxShadow: '0 0 0 2px #FBF7E5, 0 0 0 3px rgba(8,37,103,0.1)',
        }}>+{rest}</div>
      )}
    </div>
  );
}

function Pill({ children, tone = 'neutral', size = 'sm' }) {
  const styles = {
    neutral: { bg: 'rgba(8,37,103,0.05)', fg: 'var(--ink-2)' },
    accent:  { bg: 'var(--accent-soft)', fg: 'var(--accent-deep)' },
    warn:    { bg: 'rgba(224,122,74,0.14)', fg: '#B25F38' },
    success: { bg: 'var(--solar)', fg: 'var(--ink)' },
    dark:    { bg: 'var(--ink)', fg: 'var(--solar)' },
    solar:   { bg: 'var(--solar-soft)', fg: 'var(--ink)' },
  }[tone];
  const sz = size === 'lg' ? { fs: 13, py: 5, px: 11 } : { fs: 11, py: 3, px: 9 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: styles.bg, color: styles.fg,
      fontSize: sz.fs, fontWeight: 500,
      padding: `${sz.py}px ${sz.px}px`,
      borderRadius: 999,
      letterSpacing: -0.1,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function PrimaryButton({ children, onClick, full = true, disabled = false, tone = 'dark', style = {} }) {
  const bg = disabled
    ? 'rgba(8,37,103,0.12)'
    : tone === 'accent' ? 'var(--accent)'
    : tone === 'solar' ? 'var(--solar)'
    : 'var(--ink)';
  const fg = disabled
    ? 'rgba(8,37,103,0.4)'
    : tone === 'accent' ? '#FFFFFF'
    : tone === 'solar' ? 'var(--ink)'
    : 'var(--solar)';
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      width: full ? '100%' : 'auto',
      height: 52,
      background: bg,
      color: fg,
      borderRadius: 16,
      fontSize: 16, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      letterSpacing: -0.2,
      transition: 'transform 120ms ease, background 200ms',
      ...style,
    }}
    onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      height: 44, padding: '0 16px',
      background: 'rgba(8,37,103,0.05)',
      color: 'var(--ink)',
      borderRadius: 14,
      fontSize: 15, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      ...style,
    }}>{children}</button>
  );
}

function ScreenHeader({ title, subtitle, onBack, action, dark = false }) {
  return (
    <div style={{
      padding: '12px 20px 8px',
      display: 'flex', alignItems: 'flex-start', gap: 12,
      color: dark ? '#FFFFFF' : 'var(--ink)',
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 40, height: 40, borderRadius: 12,
          background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(8,37,103,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 4,
          color: dark ? '#FFFFFF' : 'var(--ink)',
        }}><Icon.Back size={20} /></button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && (
          <div style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: dark ? 'rgba(255,255,255,0.6)' : 'var(--mute)',
            marginBottom: 4,
          }}>{subtitle}</div>
        )}
        <h1 style={{
          margin: 0, fontSize: 30, fontWeight: 600,
          letterSpacing: -0.7, lineHeight: 1.05,
        }}>{title}</h1>
      </div>
      {action}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Liquid glass bottom nav
// ─────────────────────────────────────────────────────────────
function GlassNav({ tab, setTab, pendingInvites = 0 }) {
  const items = [
    { id: 'mete', label: 'Mete', icon: Icon.Compass },
    { id: 'inviti', label: 'Inviti', icon: Icon.Bell, badge: pendingInvites },
    { id: 'profilo', label: 'Profilo', icon: Icon.User },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 18, left: 16, right: 16,
      zIndex: 40,
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'relative',
        borderRadius: 999,
        padding: 6,
        display: 'flex',
        gap: 4,
        pointerEvents: 'auto',
        boxShadow: '0 8px 24px rgba(8,37,103,0.14), 0 2px 6px rgba(8,37,103,0.08)',
        overflow: 'hidden',
      }}>
        {/* liquid glass background layers */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(255,255,255,0.55)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          boxShadow: 'inset 1px 1px 1px rgba(255,255,255,0.9), inset -1px -1px 1px rgba(255,255,255,0.4)',
          border: '0.5px solid rgba(8,37,103,0.06)',
          pointerEvents: 'none',
        }} />
        {/* shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
          opacity: 0.6,
          pointerEvents: 'none',
        }} />

        {items.map(item => {
          const active = item.id === tab;
          const I = item.icon;
          return (
            <button key={item.id} onClick={() => setTab(item.id)} style={{
              position: 'relative', zIndex: 1,
              height: 44, padding: '0 14px',
              borderRadius: 999,
              display: 'flex', alignItems: 'center', gap: 6,
              background: active ? 'var(--ink)' : 'transparent',
              color: active ? 'var(--solar)' : 'var(--ink-2)',
              transition: 'background 200ms, color 200ms',
              fontSize: 13, fontWeight: 500,
              letterSpacing: -0.1,
            }}>
              <I size={18} />
              {active && <span>{item.label}</span>}
              {item.badge > 0 && !active && (
                <span style={{
                  position: 'absolute', top: 8, right: 8,
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.7)',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME — list of destinations
// ─────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  if (status === 'ready') return <Pill tone="success"><Icon.Check size={11}/> Pronto</Pill>;
  if (status === 'waiting') return <Pill tone="warn">In attesa</Pill>;
  if (status === 'past') return <Pill tone="neutral">Conclusa</Pill>;
  return <Pill tone="neutral">Bozza</Pill>;
}

function MetaCard({ dest, onOpen }) {
  const submitted = dest.members.filter(m => m.submitted).length;
  const total = dest.members.length;
  return (
    <button onClick={onOpen} style={{
      display: 'block', width: '100%', textAlign: 'left',
      background: 'var(--surface)',
      borderRadius: 22,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      border: '0.5px solid var(--line)',
    }}>
      <div style={{ position: 'relative' }}>
        <MapThumb destination={dest.name + ' ' + dest.place} height={120} pinCount={dest.days > 5 ? 4 : 3} />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <StatusPill status={dest.status} />
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <AvatarStack members={dest.members} size={26} />
        </div>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: -0.3 }}>{dest.name}</h3>
          <span className="mono" style={{ fontSize: 11, color: 'var(--mute)' }}>{dest.days}gg</span>
        </div>
        <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--mute)', fontSize: 13 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon.Pin size={13} /> {dest.place}
          </span>
          <span>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon.Calendar size={12} /> {dest.dateLabel}
          </span>
        </div>
        {dest.status === 'waiting' && (
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 4, background: 'rgba(8,37,103,0.06)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(submitted/total)*100}%`, background: 'var(--accent)', borderRadius: 999 }} />
            </div>
            <span className="mono" style={{ fontSize: 11, color: 'var(--mute)' }}>{submitted}/{total}</span>
          </div>
        )}
      </div>
    </button>
  );
}

function HomeScreen({ destinations, onOpen, onCreate }) {
  return (
    <div className="voy-content screen-enter">
      <div className="voy-screen-scroll" style={{ paddingBottom: 110 }}>
        {/* Top bar */}
        <div style={{ paddingTop: 60, padding: '60px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mar 17 mag · Roma</div>
          <Avatar name="Sara" color="var(--ink)" size={32} />
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 600, letterSpacing: -0.9, lineHeight: 1.02 }}>
            Ciao, Sara <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400 }}>—</span><br/>
            dove vi portate?
          </h1>
        </div>

        {/* Quick row */}
        <div style={{ padding: '24px 20px 0', display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
          <button onClick={onCreate} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--ink)', color: '#FBF7E5',
            padding: '12px 16px', borderRadius: 999,
            fontSize: 14, fontWeight: 500, letterSpacing: -0.2,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            <Icon.Plus size={16} /> Nuova meta
          </button>
          {['Weekend', 'Coppia', 'Famiglia', 'Solo'].map(t => (
            <span key={t} style={{
              background: 'rgba(8,37,103,0.04)',
              padding: '12px 14px', borderRadius: 999,
              fontSize: 14, color: 'var(--ink-2)',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>{t}</span>
          ))}
        </div>

        {/* Section: in attesa */}
        {destinations.some(d => d.status === 'waiting') && (
          <div style={{ padding: '28px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--ink)', letterSpacing: -0.2 }}>In preparazione</h2>
              <span className="mono" style={{ fontSize: 10, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>aspettano voi</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {destinations.filter(d => d.status === 'waiting').map(d => (
                <MetaCard key={d.id} dest={d} onOpen={() => onOpen(d.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Section: ready */}
        {destinations.some(d => d.status === 'ready') && (
          <div style={{ padding: '28px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>Pronti a partire</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {destinations.filter(d => d.status === 'ready').map(d => (
                <MetaCard key={d.id} dest={d} onOpen={() => onOpen(d.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Section: past */}
        {destinations.some(d => d.status === 'past') && (
          <div style={{ padding: '28px 20px 0' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--mute)', letterSpacing: -0.2 }}>Ricordi</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {destinations.filter(d => d.status === 'past').map(d => (
                <MetaCard key={d.id} dest={d} onOpen={() => onOpen(d.id)} />
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CREATE flow — single screen with progressive fields
// ─────────────────────────────────────────────────────────────
const SUGGESTED_PLACES = [
  { name: 'Lisbona, Portogallo', emoji: '🇵🇹' },
  { name: 'Salento, Italia', emoji: '🌊' },
  { name: 'Marrakech, Marocco', emoji: '🇲🇦' },
  { name: 'Atene, Grecia', emoji: '🏛' },
  { name: 'Berlino, Germania', emoji: '🇩🇪' },
];

const SUGGESTED_FRIENDS = [
  { id: 'm1', name: 'Marco Bianchi', initials: 'MB', color: '#E07A4A' },
  { id: 'm2', name: 'Giulia Rossi', initials: 'GR', color: '#6082B6' },
  { id: 'm3', name: 'Davide Ferri', initials: 'DF', color: '#2E5BA0' },
  { id: 'm4', name: 'Anna De Luca', initials: 'AD', color: '#D4A04A' },
  { id: 'm5', name: 'Elena Conti', initials: 'EC', color: '#9B6F8A' },
];

function FieldLabel({ children, idx }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <span className="mono" style={{
        fontSize: 10, background: 'var(--ink)', color: '#FBF7E5',
        padding: '2px 6px', borderRadius: 5, letterSpacing: '0.05em',
      }}>{String(idx).padStart(2, '0')}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', letterSpacing: -0.1 }}>{children}</span>
    </div>
  );
}

function FieldShell({ children, idx, label }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <FieldLabel idx={idx}>{label}</FieldLabel>
      {children}
    </div>
  );
}

function CreateScreen({ onBack, onSubmit }) {
  const [name, setName] = React.useState('');
  const [place, setPlace] = React.useState('');
  const [dateStart, setDateStart] = React.useState('');
  const [dateEnd, setDateEnd] = React.useState('');
  const [note, setNote] = React.useState('');
  const [people, setPeople] = React.useState([]);

  const canSubmit = name && place && dateStart && dateEnd;

  function togglePerson(p) {
    setPeople(curr => curr.find(x => x.id === p.id)
      ? curr.filter(x => x.id !== p.id)
      : [...curr, p]
    );
  }

  return (
    <div className="voy-content screen-enter">
      <div className="voy-screen-scroll" style={{ paddingBottom: 140 }}>
        <ScreenHeader
          title="Nuova meta"
          subtitle="Step 1 di 1"
          onBack={onBack}
        />

        <div style={{ padding: '12px 20px 0' }}>
          {/* Map preview */}
          <div style={{
            borderRadius: 22, overflow: 'hidden',
            border: '0.5px solid var(--line)', marginBottom: 24,
          }}>
            <CreateMap query={place || name} height={200} />
          </div>

          <FieldShell idx={1} label="Come la chiami?">
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Es. Weekend a Lisbona"
              style={{
                width: '100%', height: 56, padding: '0 18px',
                background: 'var(--surface)',
                border: '0.5px solid var(--line)',
                borderRadius: 16,
                fontSize: 17, fontWeight: 500,
                color: 'var(--ink)',
                outline: 'none',
                letterSpacing: -0.3,
              }}
            />
          </FieldShell>

          <FieldShell idx={2} label="Dove?">
            <div style={{
              background: 'var(--surface)', borderRadius: 16,
              border: '0.5px solid var(--line)', overflow: 'hidden',
            }}>
              <div style={{ padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10, height: 56 }}>
                <Icon.Search size={18} style={{ color: 'var(--mute)' }} />
                <input
                  type="text" value={place} onChange={e => setPlace(e.target.value)}
                  placeholder="Cerca città o regione"
                  style={{
                    flex: 1, height: '100%', border: 'none', background: 'transparent',
                    fontSize: 16, outline: 'none', letterSpacing: -0.2,
                  }}
                />
              </div>
              <div style={{ height: 0.5, background: 'var(--line)' }} />
              <div style={{ padding: '10px 8px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SUGGESTED_PLACES.map(p => (
                  <button key={p.name} onClick={() => setPlace(p.name)} style={{
                    background: place === p.name ? 'var(--accent-soft)' : 'rgba(8,37,103,0.04)',
                    color: place === p.name ? 'var(--accent-deep)' : 'var(--ink-2)',
                    padding: '8px 11px', borderRadius: 999,
                    fontSize: 13, fontWeight: 500,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>{p.emoji}</span>{p.name}
                  </button>
                ))}
              </div>
            </div>
          </FieldShell>

          <FieldShell idx={3} label="Quando partite?">
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 16, border: '0.5px solid var(--line)', padding: '12px 16px' }}>
                <div style={{ fontSize: 11, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="mono">Inizio</div>
                <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 15, fontWeight: 500, outline: 'none', padding: '4px 0 0', color: dateStart ? 'var(--ink)' : 'var(--mute)' }}
                />
              </div>
              <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 16, border: '0.5px solid var(--line)', padding: '12px 16px' }}>
                <div style={{ fontSize: 11, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="mono">Fine</div>
                <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 15, fontWeight: 500, outline: 'none', padding: '4px 0 0', color: dateEnd ? 'var(--ink)' : 'var(--mute)' }}
                />
              </div>
            </div>
          </FieldShell>

          <FieldShell idx={4} label="Una nota per il gruppo">
            <textarea
              value={note} onChange={e => setNote(e.target.value)}
              placeholder="Idee, vincoli, hype… che vibe è?"
              rows={3}
              style={{
                width: '100%', padding: '14px 18px',
                background: 'var(--surface)',
                border: '0.5px solid var(--line)',
                borderRadius: 16,
                fontSize: 15, color: 'var(--ink)',
                outline: 'none', resize: 'none',
                lineHeight: 1.4, letterSpacing: -0.1,
              }}
            />
          </FieldShell>

          <FieldShell idx={5} label="Chi viene?">
            <div style={{
              background: 'var(--surface)', borderRadius: 16,
              border: '0.5px solid var(--line)', overflow: 'hidden',
            }}>
              {/* selected */}
              <div style={{ padding: '14px 14px 0', display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 8 }}>
                {people.map(p => (
                  <button key={p.id} onClick={() => togglePerson(p)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'var(--ink)', color: '#FBF7E5',
                    padding: '6px 10px 6px 6px', borderRadius: 999,
                    fontSize: 13, fontWeight: 500,
                  }}>
                    <Avatar name={p.name} color={p.color} size={22} />
                    {p.name.split(' ')[0]}
                    <Icon.Close size={12} />
                  </button>
                ))}
                {people.length === 0 && (
                  <div style={{ fontSize: 13, color: 'var(--mute)', padding: '4px 4px 0' }}>Nessuno ancora — tocca per aggiungere</div>
                )}
              </div>
              <div style={{ padding: '14px 6px 6px' }}>
                {SUGGESTED_FRIENDS.map(p => {
                  const sel = people.find(x => x.id === p.id);
                  return (
                    <button key={p.id} onClick={() => togglePerson(p)} style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 12px', borderRadius: 12,
                      background: sel ? 'var(--accent-soft)' : 'transparent',
                      textAlign: 'left',
                    }}>
                      <Avatar name={p.name} color={p.color} size={32} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--mute)' }}>@{p.name.toLowerCase().split(' ')[0]}</div>
                      </div>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: sel ? 'var(--accent)' : 'transparent',
                        border: sel ? 'none' : '1.5px solid rgba(8,37,103,0.15)',
                        color: '#FFFFFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {sel && <Icon.Check size={14} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </FieldShell>
        </div>
      </div>

      {/* Floating submit */}
      <div style={{
        position: 'absolute', bottom: 18, left: 16, right: 16, zIndex: 30,
      }}>
        <PrimaryButton
          onClick={() => canSubmit && onSubmit({ name, place, dateStart, dateEnd, note, people })}
          disabled={!canSubmit}
        >
          {canSubmit ? `Invita ${people.length} e inizia` : 'Compila i campi richiesti'}
          {canSubmit && <Icon.ArrowRight size={18} />}
        </PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INVITI screen — pending forms to fill from friends
// ─────────────────────────────────────────────────────────────
function InvitiScreen({ pending = [], onOpen }) {
  return (
    <div className="voy-content screen-enter">
      <div className="voy-screen-scroll" style={{ paddingBottom: 110 }}>
        <div style={{ paddingTop: 60, padding: '60px 20px 0' }}>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: -0.7 }}>Inviti</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--mute)', fontSize: 14 }}>
            {pending.length > 0 ? `${pending.length} form da compilare` : 'Tutto fatto. Goditi i preparativi.'}
          </p>
        </div>

        <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pending.map(p => (
            <button key={p.id} onClick={() => onOpen(p.id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'var(--surface)', borderRadius: 22,
              overflow: 'hidden', border: '0.5px solid var(--line)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 96, position: 'relative', flexShrink: 0 }}>
                  <MapThumb destination={p.name + p.place} height={120} pinCount={3} />
                </div>
                <div style={{ flex: 1, padding: '16px 16px 16px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <Pill tone="warn">Da compilare</Pill>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3 }}>{p.name}</div>
                  <div style={{ marginTop: 2, fontSize: 12, color: 'var(--mute)' }}>
                    da <b style={{ color: 'var(--ink-2)', fontWeight: 500 }}>{p.from}</b> · {p.place}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: 'var(--mute)' }}>
                    <Icon.Clock size={11} style={{ verticalAlign: -2 }}/> 5 min · anonimo
                  </div>
                </div>
              </div>
            </button>
          ))}

          {pending.length === 0 && (
            <div style={{
              background: 'var(--surface)', borderRadius: 22,
              border: '0.5px solid var(--line)',
              padding: '40px 20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✈️</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Nessun invito in attesa</div>
              <div style={{ fontSize: 13, color: 'var(--mute)', marginTop: 4 }}>Quando gli amici ti includono, atterrano qui.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE screen — minimal
// ─────────────────────────────────────────────────────────────
function ProfileScreen() {
  return (
    <div className="voy-content screen-enter">
      <div className="voy-screen-scroll" style={{ paddingBottom: 110 }}>
        <div style={{ paddingTop: 60, padding: '60px 20px 0' }}>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: -0.7 }}>Profilo</h1>
        </div>

        <div style={{ padding: '24px 20px 0' }}>
          <div style={{
            background: 'var(--surface)', borderRadius: 22,
            border: '0.5px solid var(--line)',
            padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <Avatar name="Sara" color="var(--ink)" size={72} />
            <div style={{ marginTop: 14, fontSize: 22, fontWeight: 600, letterSpacing: -0.3 }}>Sara Marchetti</div>
            <div style={{ fontSize: 13, color: 'var(--mute)' }} className="mono">@sara · Roma</div>
            <div style={{ marginTop: 18, display: 'flex', gap: 28 }}>
              {[['Viaggi', '12'], ['Amici', '34'], ['Km', '8.4k']].map(([l, v]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.3 }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="mono">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20, background: 'var(--surface)', borderRadius: 22, border: '0.5px solid var(--line)', overflow: 'hidden' }}>
            {[
              { label: 'Preferenze viaggio', sub: 'Le tue risposte di default' },
              { label: 'Amici e gruppi', sub: '34 persone' },
              { label: 'Notifiche', sub: 'Solo essenziali' },
              { label: 'Aiuto e supporto', sub: '' },
            ].map((row, i, arr) => (
              <div key={row.label} style={{
                display: 'flex', alignItems: 'center', padding: '16px 18px',
                borderBottom: i < arr.length - 1 ? '0.5px solid var(--line)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>{row.label}</div>
                  {row.sub && <div style={{ fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>{row.sub}</div>}
                </div>
                <Icon.ArrowRight size={16} style={{ color: 'var(--mute-2)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export { Avatar, AvatarStack, Pill, PrimaryButton, GhostButton, ScreenHeader, GlassNav, HomeScreen, CreateScreen, InvitiScreen, ProfileScreen, StatusPill };
