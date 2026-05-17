'use client';

import React from 'react';

// Voyage — illustrated line-art map components

// Stable hash for seeded pseudo-random
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function seededRand(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Pre-baked region "personalities" — each destination gets one based on its name
const REGIONS = {
  // Lisbona — coastal, river curve
  lisbon: {
    coast: 'M -20 220 Q 80 200 150 230 Q 220 260 320 240 Q 400 225 480 250',
    river: 'M -20 320 Q 100 310 200 330 Q 300 350 480 330',
    hills: ['M 40 180 Q 80 160 110 175 Q 140 188 170 175', 'M 250 200 Q 290 185 320 195'],
    blocks: [
      { x: 60, y: 240, w: 24, h: 16 }, { x: 100, y: 250, w: 18, h: 14 },
      { x: 140, y: 255, w: 22, h: 18 }, { x: 175, y: 240, w: 16, h: 14 },
      { x: 210, y: 252, w: 20, h: 16 }, { x: 250, y: 260, w: 18, h: 14 },
      { x: 295, y: 255, w: 24, h: 18 }, { x: 340, y: 245, w: 20, h: 16 },
    ],
  },
  // Salento — peninsula
  salento: {
    coast: 'M 40 80 Q 60 200 100 300 Q 150 380 240 410 Q 340 430 420 380',
    coastInner: 'M 70 80 Q 85 200 130 290 Q 175 360 250 380 Q 330 395 400 360',
    waves: [
      'M 200 100 Q 240 95 270 110 Q 300 120 340 105',
      'M 320 200 Q 350 195 380 210',
    ],
    blocks: [
      { x: 90, y: 200, w: 14, h: 10 }, { x: 130, y: 280, w: 18, h: 12 },
      { x: 180, y: 340, w: 16, h: 12 }, { x: 250, y: 360, w: 20, h: 14 },
      { x: 320, y: 350, w: 16, h: 12 },
    ],
  },
  // Dolomiti — mountains
  dolomiti: {
    ridges: [
      'M -20 280 L 40 220 L 90 260 L 140 200 L 200 250 L 260 190 L 320 240 L 380 200 L 480 250',
      'M -20 340 L 60 290 L 120 320 L 200 280 L 280 320 L 360 290 L 480 320',
    ],
    valleys: 'M -20 380 Q 100 370 200 385 Q 300 395 480 380',
    pines: [
      { x: 80, y: 320, h: 18 }, { x: 120, y: 360, h: 14 },
      { x: 180, y: 350, h: 16 }, { x: 240, y: 370, h: 12 },
      { x: 310, y: 340, h: 18 }, { x: 360, y: 360, h: 14 },
    ],
  },
  // Default — generic coastal+inland
  generic: {
    coast: 'M -20 200 Q 60 180 140 215 Q 220 245 320 220 Q 400 200 480 230',
    river: 'M 100 260 Q 200 280 280 270 Q 360 260 480 290',
    blocks: [
      { x: 80, y: 240, w: 22, h: 16 }, { x: 130, y: 250, w: 18, h: 14 },
      { x: 200, y: 240, w: 20, h: 16 }, { x: 260, y: 255, w: 16, h: 14 },
      { x: 320, y: 240, w: 22, h: 16 },
    ],
  },
};

function pickRegion(name = '') {
  const n = name.toLowerCase();
  if (n.includes('lisb')) return 'lisbon';
  if (n.includes('salen') || n.includes('puglia') || n.includes('lecce')) return 'salento';
  if (n.includes('dolo') || n.includes('alp') || n.includes('mont')) return 'dolomiti';
  return 'generic';
}

// Renders the illustrated background — coast, river/hills, schematic blocks
function MapLandscape({ region = 'generic', mute = false }) {
  const ink = mute ? 'rgba(8,37,103,0.35)' : 'rgba(8,37,103,0.55)';
  const sec = mute ? 'rgba(8,37,103,0.18)' : 'rgba(8,37,103,0.28)';
  const wave = mute ? 'rgba(96,130,182,0.45)' : 'rgba(96,130,182,0.65)';
  const r = REGIONS[region] || REGIONS.generic;

  return (
    <g>
      {r.coast && (
        <>
          <path d={r.coast} fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          {/* water hatching */}
          <path d={r.coast} fill="none" stroke={wave} strokeWidth="0.6" strokeDasharray="2 4" transform="translate(0,8)" />
          <path d={r.coast} fill="none" stroke={wave} strokeWidth="0.6" strokeDasharray="2 4" transform="translate(0,16)" />
        </>
      )}
      {r.coastInner && (
        <path d={r.coastInner} fill="none" stroke={sec} strokeWidth="0.8" strokeDasharray="3 3" />
      )}
      {r.river && (
        <path d={r.river} fill="none" stroke={wave} strokeWidth="1.6" strokeLinecap="round" />
      )}
      {r.hills && r.hills.map((h, i) => (
        <path key={`h${i}`} d={h} fill="none" stroke={sec} strokeWidth="1" strokeLinecap="round" />
      ))}
      {r.ridges && r.ridges.map((p, i) => (
        <path key={`r${i}`} d={p} fill="none" stroke={ink} strokeWidth={i === 0 ? 1.4 : 1} strokeLinejoin="round" />
      ))}
      {r.valleys && (
        <path d={r.valleys} fill="none" stroke={wave} strokeWidth="1.4" strokeLinecap="round" />
      )}
      {r.waves && r.waves.map((p, i) => (
        <path key={`w${i}`} d={p} fill="none" stroke={wave} strokeWidth="0.8" strokeLinecap="round" />
      ))}
      {r.blocks && r.blocks.map((b, i) => (
        <rect key={`b${i}`} x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke={sec} strokeWidth="0.8" />
      ))}
      {r.pines && r.pines.map((p, i) => (
        <g key={`p${i}`} stroke={sec} strokeWidth="0.8" fill="none">
          <path d={`M ${p.x} ${p.y} L ${p.x - 4} ${p.y + p.h} L ${p.x + 4} ${p.y + p.h} Z`} />
          <path d={`M ${p.x} ${p.y + p.h} L ${p.x} ${p.y + p.h + 3}`} />
        </g>
      ))}
      {/* compass rose, tiny */}
      <g transform="translate(420, 60)" opacity="0.5">
        <circle r="14" fill="none" stroke={sec} strokeWidth="0.6" />
        <path d="M 0 -10 L 2.5 0 L 0 10 L -2.5 0 Z" fill={ink} />
        <text x="0" y="-17" textAnchor="middle" fontSize="7" fontFamily="Geist Mono, monospace" fill={ink}>N</text>
      </g>
    </g>
  );
}

// Map pin
function MapPin({ x, y, n, active = false, color = '#082567', dim = false }) {
  const bg = active ? '#FFF785' : '#FFFFFF';
  const fg = '#082567';
  const stroke = dim ? 'rgba(8,37,103,0.25)' : '#082567';
  return (
    <g transform={`translate(${x}, ${y})`}>
      {active && (
        <circle r="22" fill="none" stroke="#FFF785" strokeWidth="3" opacity="0.55" />
      )}
      <circle r="16" fill={bg} stroke={stroke} strokeWidth={active ? 2 : 1.5} />
      <text textAnchor="middle" dominantBaseline="central" y="0.5"
        fontSize="13" fontWeight="600" fontFamily="Geist, system-ui" fill={fg}>{n}</text>
    </g>
  );
}

// Full itinerary map: landscape + route + pins
// stops: [{ id, name, x, y }]
function ItineraryMap({ destination, stops = [], activeIdx = -1, height = 260, animated = true }) {
  const region = pickRegion(destination);
  const pathD = stops.length > 1
    ? `M ${stops.map(s => `${s.x} ${s.y}`).join(' L ')}`
    : '';

  return (
    <div style={{ width: '100%', height, position: 'relative', background: 'linear-gradient(180deg, #F2EFE7 0%, #ECE8DF 100%)', overflow: 'hidden' }}>
      <svg viewBox="0 0 460 480" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        {/* grid backdrop */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(8,37,103,0.04)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="460" height="480" fill="url(#grid)" />
        <MapLandscape region={region} />
        {/* route */}
        {pathD && (
          <>
            <path d={pathD} fill="none" stroke="#082567" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.15" />
            <path d={pathD} fill="none" stroke="#082567" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" className={animated ? 'dash-flow' : ''} />
          </>
        )}
        {/* pins */}
        {stops.map((s, i) => (
          <MapPin key={s.id || i} x={s.x} y={s.y} n={i + 1} active={i === activeIdx} />
        ))}
      </svg>
      {/* subtle vignette */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 60px rgba(8,37,103,0.06)' }} />
    </div>
  );
}

// Thumbnail map — small static preview for cards
function MapThumb({ destination, height = 110, pinCount = 3 }) {
  const region = pickRegion(destination);
  const r = seededRand(hash(destination || 'x'));
  const pins = Array.from({ length: pinCount }, (_, i) => ({
    x: 60 + i * 110 + r() * 30,
    y: 200 + r() * 80,
  }));
  return (
    <div style={{ width: '100%', height, position: 'relative', background: 'linear-gradient(180deg, #F2EFE7 0%, #E8E3D6 100%)', overflow: 'hidden', borderRadius: 'inherit' }}>
      <svg viewBox="0 0 460 320" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <MapLandscape region={region} mute />
        {pins.length > 1 && (
          <path
            d={`M ${pins.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none" stroke="#6082B6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7"
          />
        )}
        {pins.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="6" fill="#6082B6" stroke="#FFFFFF" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

// Map for creation step — interactive feel, with reticle
function CreateMap({ query = '', height = 220 }) {
  const region = pickRegion(query);
  return (
    <div style={{ width: '100%', height, position: 'relative', background: 'linear-gradient(180deg, #F2EFE7 0%, #ECE8DF 100%)', overflow: 'hidden' }}>
      <svg viewBox="0 0 460 480" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(8,37,103,0.04)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="460" height="480" fill="url(#grid2)" />
        <MapLandscape region={region} />
        {query && (
          <g transform="translate(230, 240)">
            <circle r="32" fill="none" stroke="#6082B6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle r="16" fill="#6082B6" />
            <circle r="6" fill="#FFFFFF" />
          </g>
        )}
      </svg>
      <div style={{
        position: 'absolute', top: 12, left: 12, right: 12,
        display: 'flex', gap: 6,
        fontFamily: 'Geist Mono, monospace', fontSize: 10,
        color: 'rgba(8,37,103,0.5)', textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        <span>38.722° N</span>
        <span>·</span>
        <span>9.139° W</span>
      </div>
    </div>
  );
}
export { ItineraryMap, MapThumb, CreateMap, pickRegion };
