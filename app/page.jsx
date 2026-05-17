import App from './App';

export default function Page() {
  return (
    <main id="stage">
      <aside className="side-label side-left">
        <div className="brand">Voyage</div>
        Un assistente di viaggio<br />che fonde i desideri del<br />gruppo in un itinerario<br />condiviso.<br /><br />
        <b>Prototipo interattivo</b><br />
        Apri Lisbona, compila il<br />form anonimo, chatta col<br />gruppo, dividi le spese,<br />rigenera le giornate.
      </aside>

      <App />

      <aside className="side-label side-right">
        <div className="hint-tag">SHORTCUTS</div>
        Premi <b>D</b> per saltare al<br />
        momento &quot;tutti hanno<br />risposto&quot;<br /><br />
        Premi <b>H</b> per tornare<br />
        alla home<br /><br />
        <span className="hint-new">NEW</span><br />
        Chat per ogni meta,<br />
        spese condivise,<br />
        sottogruppi suggeriti,<br />
        feedback post-viaggio.<br /><br />
        <div className="qr-block">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fvoyage-next-five.vercel.app%2F&bgcolor=DCD8C0&color=082567&qzone=1&format=svg"
            alt="QR code — voyage-next-five.vercel.app"
            width={180}
            height={180}
          />
          <div className="qr-label">Apri sul telefono</div>
        </div>
      </aside>
    </main>
  );
}
