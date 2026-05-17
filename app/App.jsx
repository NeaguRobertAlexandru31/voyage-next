'use client';

import React from 'react';
import { IOSDevice } from '../components/IOSDevice';
import {
  HomeScreen, CreateScreen, InvitiScreen, ProfileScreen, GlassNav,
} from '../components/Screens';
import { DestDetail, QuizForm, FormDone, Generating } from '../components/Flow';
import { Itinerary } from '../components/Itinerary';
import { ChatScreen, ExpensesScreen } from '../components/Chat';
import { StopDetail } from '../components/Stop';
import { FeedbackScreen, FeedbackDone } from '../components/Feedback';

const SEED_DESTINATIONS = [
  {
    id: 'lisbon-2026',
    name: 'Long weekend a Lisbona',
    place: 'Lisbona, Portogallo',
    dateLabel: '12 — 15 giu',
    days: 4,
    status: 'waiting',
    note: 'Volo già preso. Hotel da decidere ma 4 stelle vicino Baixa. Punti fermi: pastéis e tramonto.',
    members: [
      { id: 'me', name: 'Sara', initials: 'S', color: '#082567', isMe: true, submitted: true },
      { id: 'm1', name: 'Marco Bianchi', initials: 'MB', color: '#E07A4A', submitted: true },
      { id: 'm2', name: 'Giulia Rossi', initials: 'GR', color: '#6082B6', submitted: false },
      { id: 'm3', name: 'Davide Ferri', initials: 'DF', color: '#2E5BA0', submitted: false },
    ],
    previewStops: [
      { id: 'p1', x: 200, y: 270 }, { id: 'p2', x: 80, y: 335 },
      { id: 'p3', x: 280, y: 250 }, { id: 'p4', x: 160, y: 280 },
    ],
  },
  {
    id: 'salento-2025',
    name: 'Estate in Salento',
    place: 'Lecce → Otranto',
    dateLabel: '9 — 16 ago',
    days: 8,
    status: 'ready',
    members: [
      { id: 'me', name: 'Sara', initials: 'S', color: '#082567', isMe: true, submitted: true },
      { id: 'm4', name: 'Anna De Luca', color: '#E07A4A', submitted: true },
      { id: 'm5', name: 'Luca M.', color: '#6082B6', submitted: true },
      { id: 'm6', name: 'Elena Conti', color: '#2E5BA0', submitted: true },
      { id: 'm7', name: 'Tommaso', color: '#D4A04A', submitted: true },
    ],
    previewStops: [
      { id: 'p1', x: 90, y: 200 }, { id: 'p2', x: 130, y: 280 },
      { id: 'p3', x: 250, y: 360 }, { id: 'p4', x: 320, y: 350 },
    ],
  },
  {
    id: 'dolomiti-2024',
    name: 'Trekking Dolomiti',
    place: "Cortina d'Ampezzo",
    dateLabel: '20 — 22 set',
    days: 3,
    status: 'past',
    members: [
      { id: 'me', name: 'Sara', initials: 'S', color: '#082567', isMe: true, submitted: true },
      { id: 'm8', name: 'Paolo', color: '#E07A4A', submitted: true },
      { id: 'm9', name: 'Federica', color: '#6082B6', submitted: true },
    ],
    previewStops: [
      { id: 'p1', x: 80, y: 320 }, { id: 'p2', x: 240, y: 280 }, { id: 'p3', x: 360, y: 290 },
    ],
  },
];

const PENDING_INVITES = [
  { id: 'inv1', name: 'Capodanno a Praga', place: 'Praga, Repubblica Ceca', from: 'Sofia Carrara' },
];

export default function App() {
  const [tab, setTab] = React.useState('mete');
  const [destinations, setDestinations] = React.useState(SEED_DESTINATIONS);
  const [view, setView] = React.useState({ name: 'list' });

  function open(destId) { setView({ name: 'dest', destId }); }
  function openInvite(invId) { setView({ name: 'invite-form', invId }); }
  function goHome() { setTab('mete'); setView({ name: 'list' }); }

  function fastForwardFriends() {
    setDestinations(curr => curr.map(d => {
      if (d.status === 'waiting') {
        return { ...d, members: d.members.map(m => ({ ...m, submitted: true })) };
      }
      return d;
    }));
  }

  React.useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'd' || e.key === 'D') fastForwardFriends();
      else if (e.key === 'h' || e.key === 'H') goHome();
      else if (e.key === '?') {
        alert('Shortcuts:\nD — segna tutti gli amici come risposto\nH — torna alla home');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const currentDest = view.destId ? destinations.find(d => d.id === view.destId) : null;

  function submitForm() {
    if (!currentDest) return;
    setDestinations(curr => curr.map(d => {
      if (d.id !== currentDest.id) return d;
      return { ...d, members: d.members.map(m => m.isMe ? { ...m, submitted: true } : m) };
    }));
    setView({ name: 'form-done', destId: currentDest.id });
  }

  function formatDateLabel(s, e) {
    const months = ['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];
    const sd = s.getDate(), ed = e.getDate();
    const sm = months[s.getMonth()], em = months[e.getMonth()];
    if (sm === em) return `${sd} — ${ed} ${sm}`;
    return `${sd} ${sm} — ${ed} ${em}`;
  }

  function createDestination({ name, place, dateStart, dateEnd, note, people }) {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const days = Math.max(1, Math.round((end - start) / 86400000) + 1);
    const dateLabel = formatDateLabel(start, end);
    const newDest = {
      id: 'd' + Date.now(),
      name, place, dateLabel, days,
      status: 'waiting', note: note || null,
      members: [
        { id: 'me', name: 'Sara', color: '#082567', isMe: true, submitted: false },
        ...people.map(p => ({ id: p.id, name: p.name, color: p.color, submitted: false })),
      ],
      previewStops: [
        { id: 'p1', x: 200, y: 260 }, { id: 'p2', x: 280, y: 280 }, { id: 'p3', x: 140, y: 300 },
      ],
    };
    setDestinations(curr => [newDest, ...curr]);
    setView({ name: 'dest', destId: newDest.id });
  }

  let screen;
  let hideNav = false;

  if (tab === 'mete') {
    if (view.name === 'list') {
      screen = <HomeScreen destinations={destinations} onOpen={open} onCreate={() => setView({ name: 'create' })} />;
    } else if (view.name === 'create') {
      hideNav = true;
      screen = <CreateScreen onBack={() => setView({ name: 'list' })} onSubmit={createDestination} />;
    } else if (view.name === 'dest' && currentDest) {
      hideNav = true;
      screen = <DestDetail
        dest={currentDest}
        onBack={() => setView({ name: 'list' })}
        onStartForm={() => setView({ name: 'form', destId: currentDest.id })}
        onSeeItinerary={() => {
          if (currentDest.status === 'ready' || currentDest.status === 'past') {
            setView({ name: 'itinerary', destId: currentDest.id });
          } else {
            setView({ name: 'generating', destId: currentDest.id });
          }
        }}
        onRegenerate={() => setView({ name: 'generating', destId: currentDest.id })}
        onOpenChat={() => setView({ name: 'chat', destId: currentDest.id })}
        onOpenFeedback={() => setView({ name: 'feedback', destId: currentDest.id })}
      />;
    } else if (view.name === 'form' && currentDest) {
      hideNav = true;
      screen = <QuizForm destName={currentDest.name} place={currentDest.place}
        onBack={() => setView({ name: 'dest', destId: currentDest.id })}
        onComplete={submitForm} />;
    } else if (view.name === 'form-done' && currentDest) {
      hideNav = true;
      screen = <FormDone onContinue={() => setView({ name: 'dest', destId: currentDest.id })} />;
    } else if (view.name === 'generating' && currentDest) {
      hideNav = true;
      screen = <Generating destName={currentDest.name} onDone={() => {
        setDestinations(curr => curr.map(d => d.id === currentDest.id ? { ...d, status: 'ready' } : d));
        setView({ name: 'itinerary', destId: currentDest.id });
      }} />;
    } else if (view.name === 'itinerary' && currentDest) {
      hideNav = true;
      screen = <Itinerary dest={currentDest}
        onBack={() => setView({ name: 'dest', destId: currentDest.id })}
        onRegenerateAll={() => setView({ name: 'generating', destId: currentDest.id })}
        onOpenChat={() => setView({ name: 'chat', destId: currentDest.id })}
        onOpenStop={(step, day) => setView({ name: 'stop', destId: currentDest.id, step, dayLabel: day.date + ' · ' + day.label })}
        onOpenFeedback={() => setView({ name: 'feedback', destId: currentDest.id })} />;
    } else if (view.name === 'stop' && currentDest) {
      hideNav = true;
      screen = <StopDetail step={view.step} dayLabel={view.dayLabel} dest={currentDest}
        onBack={() => setView({ name: 'itinerary', destId: currentDest.id })} />;
    } else if (view.name === 'chat' && currentDest) {
      hideNav = true;
      screen = <ChatScreen dest={currentDest}
        onBack={() => setView({ name: 'dest', destId: currentDest.id })}
        onOpenExpenses={() => setView({ name: 'expenses', destId: currentDest.id })} />;
    } else if (view.name === 'expenses' && currentDest) {
      hideNav = true;
      screen = <ExpensesScreen dest={currentDest}
        onBack={() => setView({ name: 'chat', destId: currentDest.id })} />;
    } else if (view.name === 'feedback' && currentDest) {
      hideNav = true;
      screen = <FeedbackScreen dest={currentDest}
        onBack={() => setView({ name: 'dest', destId: currentDest.id })}
        onDone={() => setView({ name: 'feedback-done', destId: currentDest.id })} />;
    } else if (view.name === 'feedback-done' && currentDest) {
      hideNav = true;
      screen = <FeedbackDone onContinue={() => setView({ name: 'list' })} />;
    } else {
      screen = <HomeScreen destinations={destinations} onOpen={open} onCreate={() => setView({ name: 'create' })} />;
    }
  } else if (tab === 'inviti') {
    screen = <InvitiScreen pending={PENDING_INVITES} onOpen={openInvite} />;
    if (view.name === 'invite-form') {
      const inv = PENDING_INVITES.find(p => p.id === view.invId);
      if (inv) {
        hideNav = true;
        screen = <QuizForm destName={inv.name} place={inv.place}
          onBack={() => setView({ name: 'list' })}
          onComplete={() => setView({ name: 'invite-done' })} />;
      }
    }
    if (view.name === 'invite-done') {
      hideNav = true;
      screen = <FormDone onContinue={() => setView({ name: 'list' })} />;
    }
  } else if (tab === 'profilo') {
    screen = <ProfileScreen />;
  }

  return (
    <IOSDevice width={402} height={874}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 48 }}>
        {screen}
        {!hideNav && (
          <GlassNav
            tab={tab}
            setTab={(t) => { setTab(t); setView({ name: 'list' }); }}
            pendingInvites={PENDING_INVITES.length}
          />
        )}
      </div>
    </IOSDevice>
  );
}
