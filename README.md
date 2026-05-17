# Voyage

Assistente di viaggio mobile-first per gruppi — fonde i desideri di tutti i partecipanti in un itinerario condiviso.

## Funzionalità

- 📍 **Mete condivise** — crea un viaggio, invita amici, vedi lo stato di chi ha risposto
- 🎲 **Form anonimo a quiz** — ogni partecipante esprime mood, must-do, ritmo, preferenze
- ✨ **Itinerario generato** — l'algoritmo fonde le risposte in giornate ottimizzate
- 💬 **Chat di gruppo** — messaggi, foto e momenti condivisi per ogni viaggio
- 💸 **Spese condivise** — registra spese, vedi saldi, salda i conti
- 🗺 **Info per tappa** — come arrivare, tip pratici, perché questa tappa
- 👥 **Sottogruppi suggeriti** — quando i mood divergono, si splitta intelligentemente
- ⭐ **Feedback fine viaggio** — chiudi il cerchio per i prossimi viaggi del gruppo

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **No external CSS framework** — solo Geist + Instrument Serif via Google Fonts, CSS variables custom

## Avvio locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) — l'app gira renderizzata dentro un device frame iOS.

## Deploy su Vercel

1. Push del repository su GitHub/GitLab/Bitbucket
2. Importa il progetto su [vercel.com](https://vercel.com)
3. Deploy. Nessuna variabile d'ambiente richiesta.

Oppure con Vercel CLI:

```bash
npx vercel
```

## Struttura

```
voyage-next/
├── app/
│   ├── layout.jsx       # Root layout, Google Fonts
│   ├── page.jsx         # Root — monta <App />
│   ├── App.jsx          # State + routing tra le schermate
│   └── globals.css      # Variabili CSS, palette, utility
├── components/
│   ├── IOSDevice.jsx    # Device frame iOS
│   ├── Icons.jsx        # Set icone line-art
│   ├── Map.jsx          # Mappa illustrata SVG
│   ├── Screens.jsx      # Home, Create, Inviti, Profilo, GlassNav
│   ├── Flow.jsx         # Dettaglio meta + Form quiz + Generating
│   ├── Itinerary.jsx    # Vista itinerario con timeline + rigenera
│   ├── Chat.jsx         # Chat di gruppo + Spese
│   ├── Stop.jsx         # Dettaglio tappa + Sottogruppi
│   └── Feedback.jsx     # Form feedback fine viaggio
└── package.json
```

## Palette

- **Dark Sapphire** `#082567` — testo, brand foundation
- **Glaucous Blue** `#6082B6` — accenti, tag, secondary CTA
- **Solar Flare** `#FFF785` — highlight, CTA principali, attivo

## Scorciatoie

- `D` — segna tutti gli amici come "hanno risposto"
- `H` — torna alla home

## Demo

L'app parte con una destinazione di esempio (Lisbona, 12-15 giugno) in stato "in attesa di risposte". Compila il form, premi `D` per finta-simulare le risposte degli amici, lascia generare l'itinerario, esplora chat / spese / tappe.

---

Costruito con cura per dimostrare un flusso completo. Sostituisci i dati mock in `app/App.jsx` con la tua sorgente reale.
