'use client';

import React from 'react';
import { Icon } from './Icons';
import { Avatar, AvatarStack, Pill, PrimaryButton, ScreenHeader } from './Screens';

// Voyage — chat + expenses + photo sharing

// ─────────────────────────────────────────────────────────────
// Mock data: chat messages & expenses
// ─────────────────────────────────────────────────────────────
function makeChatMessages() {
  return [
    { id: 'm1', from: 'm1', name: 'Marco', avatar: '#E07A4A', day: 'Mar 10 giu', time: '14:23',
      kind: 'text', text: 'Hotel confermato per tutti e 4! Check-in al pomeriggio.' },
    { id: 'm2', from: 'me', time: '14:25',
      kind: 'text', text: 'Top 🙌 io penso al ristorante per sabato sera' },
    { id: 'm3', from: 'm2', name: 'Giulia', avatar: '#6082B6', time: '14:31',
      kind: 'text', text: 'Ho prenotato l\'Uber per dall\'aeroporto, vi mando il link più tardi' },
    { id: 'm4', from: 'm3', name: 'Davide', avatar: '#2E5BA0', day: 'Ven 12 giu', time: '18:45',
      kind: 'photo', text: 'Tramonto da Belém 🌅', caption: 'Belém, primo giorno' },
    { id: 'm5', from: 'me', time: '18:52',
      kind: 'text', text: 'Pazzesco. Domani si va in alto?' },
    { id: 'm6', from: 'm1', name: 'Marco', avatar: '#E07A4A', time: '21:34',
      kind: 'expense', amount: 84.50, paidBy: 'me', paidByName: 'Tu',
      forWhat: 'Cena al Time Out Market', splitAmong: 4 },
    { id: 'm7', from: 'm2', name: 'Giulia', avatar: '#6082B6', time: '21:36',
      kind: 'text', text: 'Grazie Sara! Sistemo dopo via Splitwise' },
    { id: 'm8', from: 'system', day: 'Sab 13 giu', time: '08:00',
      kind: 'system', text: 'Voyage · oggi il gruppo si divide. Ne parliamo nell\'itinerario.' },
  ];
}

function makeExpenses() {
  return [
    { id: 'e1', label: 'Hotel Baixa Chiado', amount: 480, paidBy: 'Marco', paidById: 'm1', split: ['me','m1','m2','m3'], date: '10 giu' },
    { id: 'e2', label: 'Uber aeroporto', amount: 28, paidBy: 'Giulia', paidById: 'm2', split: ['me','m1','m2','m3'], date: '12 giu' },
    { id: 'e3', label: 'Cena Time Out', amount: 84.50, paidBy: 'Tu', paidById: 'me', split: ['me','m1','m2','m3'], date: '12 giu' },
    { id: 'e4', label: 'Biglietti Castello', amount: 32, paidBy: 'Davide', paidById: 'm3', split: ['me','m1','m2','m3'], date: '14 giu' },
    { id: 'e5', label: 'Pastéis di Belém', amount: 16, paidBy: 'Tu', paidById: 'me', split: ['me','m1','m2','m3'], date: '13 giu' },
  ];
}

// ─────────────────────────────────────────────────────────────
// Photo placeholder — stylized illustration
// ─────────────────────────────────────────────────────────────
function PhotoPlaceholder({ caption, height = 200 }) {
  // simple sapphire-toned illustration with solar accent
  return (
    <div style={{
      width: '100%', height, borderRadius: 14, overflow: 'hidden',
      background: 'linear-gradient(135deg, #E6ECF5 0%, #C9D5E8 60%, #FFFAD0 100%)',
      position: 'relative',
    }}>
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        {/* sun */}
        <circle cx="240" cy="60" r="32" fill="#FFF785" />
        <circle cx="240" cy="60" r="32" fill="none" stroke="rgba(8,37,103,0.15)" strokeWidth="0.5" />
        {/* horizon */}
        <path d="M 0 130 Q 80 120 160 128 Q 240 135 320 125 L 320 200 L 0 200 Z" fill="rgba(8,37,103,0.25)" />
        {/* buildings */}
        <rect x="40" y="100" width="20" height="40" fill="rgba(8,37,103,0.55)" />
        <rect x="65" y="90" width="14" height="50" fill="rgba(8,37,103,0.6)" />
        <rect x="84" y="110" width="22" height="30" fill="rgba(8,37,103,0.5)" />
        <path d="M 130 90 L 145 70 L 160 90 L 160 140 L 130 140 Z" fill="rgba(8,37,103,0.65)" />
        <rect x="175" y="105" width="18" height="35" fill="rgba(8,37,103,0.55)" />
        {/* water reflection */}
        <path d="M 0 145 L 320 145" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <path d="M 230 145 Q 235 150 240 145 Q 245 150 250 145" stroke="#FFF785" strokeWidth="1.5" fill="none" />
      </svg>
      {caption && (
        <div style={{
          position: 'absolute', bottom: 10, left: 12, right: 12,
          color: '#FFFFFF', fontSize: 12, fontWeight: 500,
          textShadow: '0 1px 4px rgba(8,37,103,0.4)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon.Pin size={12} /> {caption}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Chat screen
// ─────────────────────────────────────────────────────────────
function ChatScreen({ dest, onBack, onOpenExpenses }) {
  const [draft, setDraft] = React.useState('');
  const [messages, setMessages] = React.useState(makeChatMessages());

  function send() {
    if (!draft.trim()) return;
    setMessages(m => [...m, {
      id: 'm' + Date.now(), from: 'me', time: 'Ora',
      kind: 'text', text: draft.trim(),
    }]);
    setDraft('');
  }

  return (
    <div className="voy-content screen-enter" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        paddingTop: 56, paddingBottom: 12,
        background: 'var(--surface)',
        borderBottom: '0.5px solid var(--line)',
        position: 'relative', zIndex: 5,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
          <button onClick={onBack} style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(8,37,103,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)',
          }}><Icon.Back size={20} /></button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{dest.name}</div>
            <div style={{ fontSize: 11, color: 'var(--mute)' }}>
              <AvatarStack members={dest.members.slice(0,4)} size={16} />
              <span style={{ marginLeft: 8 }}>{dest.members.length} membri</span>
            </div>
          </div>
          <button onClick={onOpenExpenses} style={{
            height: 40, padding: '0 12px', borderRadius: 12,
            background: 'var(--solar)', color: 'var(--ink)',
            fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <Icon.Wallet size={14}/> Spese
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="voy-screen-scroll" style={{ padding: '14px 14px 80px' }}>
        {messages.map((m, i) => (
          <ChatMessage key={m.id} m={m} prev={messages[i-1]} />
        ))}
      </div>

      {/* Input bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: '12px 14px 24px',
        background: 'linear-gradient(180deg, rgba(251,247,229,0) 0%, var(--bg) 30%)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface)',
          borderRadius: 22,
          border: '0.5px solid var(--line)',
          padding: 4,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <button style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'rgba(8,37,103,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink-2)',
            flexShrink: 0,
          }}><Icon.Image size={16}/></button>
          <input
            value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Scrivi al gruppo…"
            style={{
              flex: 1, height: 36, border: 'none', background: 'transparent',
              outline: 'none', fontSize: 14, letterSpacing: -0.2,
              color: 'var(--ink)',
            }}
          />
          <button onClick={send} disabled={!draft.trim()} style={{
            width: 36, height: 36, borderRadius: 18,
            background: draft.trim() ? 'var(--ink)' : 'rgba(8,37,103,0.1)',
            color: draft.trim() ? 'var(--solar)' : 'var(--mute)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'all 180ms',
          }}><Icon.Send size={16}/></button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ m, prev }) {
  const isMe = m.from === 'me';
  const isSystem = m.from === 'system';
  const showDay = m.day && (!prev || prev.day !== m.day);

  return (
    <>
      {showDay && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          margin: '14px 0 18px',
        }}>
          <div style={{ flex: 1, height: 0.5, background: 'var(--line)' }} />
          <span className="mono" style={{
            fontSize: 10, color: 'var(--mute)',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>{m.day}</span>
          <div style={{ flex: 1, height: 0.5, background: 'var(--line)' }} />
        </div>
      )}

      {isSystem ? (
        <div style={{
          background: 'var(--solar-soft)',
          border: '0.5px solid var(--solar-deep)',
          borderRadius: 14,
          padding: '12px 14px',
          margin: '10px 0',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon.Sparkle size={16} style={{ color: 'var(--ink)', flexShrink: 0 }} />
          <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>{m.text}</div>
        </div>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 8,
          flexDirection: isMe ? 'row-reverse' : 'row',
          marginBottom: 8,
        }}>
          {!isMe && <Avatar name={m.name} color={m.avatar} size={28} />}
          <div style={{ maxWidth: '74%' }}>
            {!isMe && (
              <div style={{ fontSize: 11, color: 'var(--mute)', marginBottom: 3, paddingLeft: 4 }}>{m.name}</div>
            )}
            {m.kind === 'text' && (
              <div style={{
                background: isMe ? 'var(--ink)' : 'var(--surface)',
                color: isMe ? 'var(--solar)' : 'var(--ink)',
                padding: '10px 14px',
                borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                fontSize: 14, lineHeight: 1.4,
                letterSpacing: -0.1,
                border: isMe ? 'none' : '0.5px solid var(--line)',
                boxShadow: isMe ? 'none' : 'var(--shadow-sm)',
              }}>{m.text}</div>
            )}
            {m.kind === 'photo' && (
              <div style={{
                background: 'var(--surface)',
                borderRadius: 18, overflow: 'hidden',
                border: '0.5px solid var(--line)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <PhotoPlaceholder caption={m.caption} height={180} />
                {m.text && (
                  <div style={{ padding: '10px 14px', fontSize: 14, color: 'var(--ink)', letterSpacing: -0.1 }}>{m.text}</div>
                )}
              </div>
            )}
            {m.kind === 'expense' && <ExpenseMessage m={m} isMe={isMe} />}
            <div style={{
              fontSize: 10, color: 'var(--mute-2)',
              marginTop: 3,
              textAlign: isMe ? 'right' : 'left',
              paddingLeft: isMe ? 0 : 4,
              paddingRight: isMe ? 4 : 0,
            }} className="mono">{m.time}</div>
          </div>
        </div>
      )}
    </>
  );
}

function ExpenseMessage({ m, isMe }) {
  const perPerson = (m.amount / m.splitAmong).toFixed(2);
  return (
    <div style={{
      background: 'var(--solar-soft)',
      border: '1px solid var(--solar)',
      borderRadius: 18,
      padding: '12px 14px',
      minWidth: 200,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Icon.Wallet size={14} style={{ color: 'var(--ink)' }}/>
        <span className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-2)' }}>Spesa registrata</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 8, letterSpacing: -0.2 }}>{m.forWhat}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--ink)', letterSpacing: -0.5 }}>€{m.amount.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-2)' }}>pagato da <b>{m.paidByName}</b></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}>÷{m.splitAmong}</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>€{perPerson} a testa</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Expenses sheet — full breakdown + who owes whom
// ─────────────────────────────────────────────────────────────
function ExpensesScreen({ dest, onBack }) {
  const expenses = React.useMemo(() => makeExpenses(), []);
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const n = dest.members.length;
  const perPerson = total / n;

  // Calc balances
  const paid = {}; // memberId -> amount paid
  dest.members.forEach(m => paid[m.id] = 0);
  expenses.forEach(e => paid[e.paidById] = (paid[e.paidById] || 0) + e.amount);

  const balances = dest.members.map(m => ({
    member: m, balance: paid[m.id] - perPerson,
  }));

  return (
    <div className="voy-content screen-enter" style={{ background: 'var(--bg)' }}>
      <div className="voy-screen-scroll" style={{ paddingBottom: 110 }}>
        <ScreenHeader
          title="Spese del viaggio"
          subtitle={dest.name}
          onBack={onBack}
        />

        {/* Total card */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{
            background: 'var(--ink)', color: '#FFFFFF',
            borderRadius: 22, padding: 20,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 160, height: 160, borderRadius: '50%',
              background: 'var(--solar)', opacity: 0.18,
            }} />
            <div className="mono" style={{ fontSize: 10, color: 'var(--solar)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Totale gruppo</div>
            <div style={{ fontSize: 42, fontWeight: 600, letterSpacing: -1, marginTop: 4 }}>
              €{total.toFixed(2)}
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              <div><b style={{ color: '#FFFFFF' }}>€{perPerson.toFixed(2)}</b> a testa</div>
              <div><b style={{ color: '#FFFFFF' }}>{expenses.length}</b> spese</div>
              <div><b style={{ color: '#FFFFFF' }}>{n}</b> persone</div>
            </div>
          </div>
        </div>

        {/* Balances */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }} className="mono">Saldi</div>
          <div style={{
            background: 'var(--surface)', borderRadius: 18,
            border: '0.5px solid var(--line)',
            overflow: 'hidden',
          }}>
            {balances.map((b, i) => (
              <div key={b.member.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderTop: i === 0 ? 'none' : '0.5px solid var(--line)',
              }}>
                <Avatar name={b.member.name} color={b.member.color} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.2 }}>{b.member.name}{b.member.isMe && <span style={{ color: 'var(--mute)', fontWeight: 400 }}> · tu</span>}</div>
                  <div style={{ fontSize: 11, color: 'var(--mute)' }}>
                    pagato €{paid[b.member.id].toFixed(2)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: 15, fontWeight: 600, letterSpacing: -0.3,
                    color: b.balance >= 0 ? 'var(--accent-deep)' : '#B25F38',
                  }}>
                    {b.balance >= 0 ? '+' : ''}€{b.balance.toFixed(2)}
                  </div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--mute-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {b.balance >= 0 ? 'in credito' : 'in debito'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense list */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="mono">Spese · {expenses.length}</div>
            <button style={{
              padding: '6px 12px', borderRadius: 10,
              background: 'var(--ink)', color: 'var(--solar)',
              fontSize: 12, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}><Icon.Plus size={12}/> Aggiungi</button>
          </div>
          <div style={{
            background: 'var(--surface)', borderRadius: 18,
            border: '0.5px solid var(--line)',
            overflow: 'hidden',
          }}>
            {expenses.map((e, i) => (
              <div key={e.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderTop: i === 0 ? 'none' : '0.5px solid var(--line)',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--solar-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--ink)',
                  flexShrink: 0,
                }}><Icon.Wallet size={16}/></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.2 }}>{e.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--mute)' }}>
                    {e.paidBy} · {e.date} · ÷{e.split.length}
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.3, color: 'var(--ink)' }}>
                  €{e.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settle CTA */}
        <div style={{ padding: '24px 20px 0' }}>
          <PrimaryButton tone="solar"><Icon.Check size={16}/> Salda i conti</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
export { ChatScreen, ExpensesScreen, makeChatMessages, makeExpenses, PhotoPlaceholder };
