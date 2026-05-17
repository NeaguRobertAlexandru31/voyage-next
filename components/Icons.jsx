'use client';

import React from 'react';

// Stroke-based line icons, sized to current font color via stroke="currentColor"
// All icons accept size and optional style.

const Icon = {
  Pin: ({ size = 20, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0c0 5.5-7 13-7 13z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  Plus: ({ size = 20, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...rest}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Compass: ({ size = 20, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5z"/>
    </svg>
  ),
  User: ({ size = 20, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>
    </svg>
  ),
  Bell: ({ size = 20, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z"/>
      <path d="M10 20a2 2 0 0 0 4 0"/>
    </svg>
  ),
  Back: ({ size = 22, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  Close: ({ size = 22, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...rest}>
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  Calendar: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="3.5" y="5" width="17" height="15" rx="2"/>
      <path d="M3.5 10h17M8 3v4M16 3v4"/>
    </svg>
  ),
  Users: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="9" cy="9" r="3.5"/>
      <circle cx="17" cy="10" r="2.5"/>
      <path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5"/>
      <path d="M15 14c1.5 0 5 1 6 4"/>
    </svg>
  ),
  Check: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M5 12.5l4.5 4.5L19 7.5"/>
    </svg>
  ),
  Sparkle: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" {...rest}>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z"/>
      <path d="M19 16l.8 2.2 2.2.8-2.2.8L19 22l-.8-2.2-2.2-.8 2.2-.8L19 16z"/>
    </svg>
  ),
  Refresh: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M20 12a8 8 0 0 1-14 5.7M4 12a8 8 0 0 1 14-5.7"/>
      <path d="M20 4v4.5h-4.5M4 20v-4.5h4.5"/>
    </svg>
  ),
  Clock: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3.5 2"/>
    </svg>
  ),
  Walk: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="13" cy="4.5" r="1.8"/>
      <path d="M10 21l2-6-3-3 1-5 3 2 3 2M9 13l-2 3"/>
    </svg>
  ),
  Coffee: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z"/>
      <path d="M17 11h2a2.5 2.5 0 0 1 0 5h-2"/>
      <path d="M8 2v3M12 2v3"/>
    </svg>
  ),
  Camera: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M3 8h3l2-3h8l2 3h3v11H3V8z"/>
      <circle cx="12" cy="13" r="3.5"/>
    </svg>
  ),
  Mountain: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M3 20l5-9 4 6 3-4 6 7H3z"/>
    </svg>
  ),
  Sun: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M17 7l1.5-1.5M5.5 18.5L7 17"/>
    </svg>
  ),
  Wine: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M7 3h10l-1 8a4 4 0 0 1-8 0L7 3z"/>
      <path d="M12 15v6M9 21h6"/>
    </svg>
  ),
  Moon: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>
    </svg>
  ),
  Heart: ({ size = 16, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>
    </svg>
  ),
  Search: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="11" cy="11" r="6.5"/>
      <path d="M16 16l4 4"/>
    </svg>
  ),
  ArrowRight: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  More: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...rest}>
      <circle cx="5" cy="12" r="1.2" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
      <circle cx="19" cy="12" r="1.2" fill="currentColor"/>
    </svg>
  ),
  Send: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M21 3L11 13"/>
      <path d="M21 3l-7 18-4-8-8-4 19-6z"/>
    </svg>
  ),
  Image: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2"/>
      <circle cx="9" cy="10" r="1.6"/>
      <path d="M21 16l-5-5-9 9"/>
    </svg>
  ),
  Wallet: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M3 7a2 2 0 0 1 2-2h13l2 3v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
      <path d="M3 9h18"/>
      <circle cx="17" cy="14" r="1.2" fill="currentColor"/>
    </svg>
  ),
  Chat: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M21 12a8 8 0 0 1-13 6.3L3 20l1.7-5A8 8 0 1 1 21 12z"/>
    </svg>
  ),
  Info: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 11v6M12 7.5v0.5"/>
    </svg>
  ),
  Star: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...rest}>
      <path d="M12 3l3 6.5 7 1-5 5 1.2 7L12 19l-6.2 3.5L7 15l-5-5 7-1L12 3z"/>
    </svg>
  ),
  Bus: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="4" y="4" width="16" height="13" rx="2"/>
      <path d="M4 10h16M8 4v13M16 4v13"/>
      <circle cx="8" cy="20" r="1.5"/><circle cx="16" cy="20" r="1.5"/>
    </svg>
  ),
  Split: ({ size = 18, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M6 4l-3 3M3 4l3 3M12 4v6M18 4l3 3M21 4l-3 3"/>
      <path d="M6 7v6c0 3 2 5 6 5s6-2 6-5V7"/>
    </svg>
  ),
};
export { Icon };
