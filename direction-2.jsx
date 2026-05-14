// Direction 2 · "Atelier" — Pixel / devlog terminal
// Space Grotesk Display headlines + VT323 / Press Start 2P chrome.
// Dithered placeholders, ASCII rules, CRT noise. Text-scramble hovers.

const D2_W = 1280;
const D2_H = 3780;

const d2Styles = `
.dir-2 {
  --ink: #0e1419;
  --paper: #d9dde2;
  --fog: #c5cad1;
  --line: #2a323b;
  --cyan: oklch(0.82 0.10 200);
  --cyan-deep: oklch(0.62 0.13 210);
  --amber: oklch(0.78 0.14 75);
  width: ${D2_W}px;
  background: var(--ink);
  color: var(--paper);
  font-family: 'Space Grotesk', system-ui, sans-serif;
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
}
.dir-2::before {
  /* scanline overlay */
  content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 4;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,0.020) 0 1px, transparent 1px 3px);
  mix-blend-mode: overlay;
}
.dir-2::after {
  /* CRT vignette */
  content:''; position: absolute; inset:0; pointer-events:none; z-index:4;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%);
}
.dir-2 .mono { font-family: 'VT323', monospace; font-size: 18px; letter-spacing: 0; }
.dir-2 .pixel { font-family: 'Press Start 2P', monospace; font-size: 11px; letter-spacing: 0; line-height: 1.6; text-transform: uppercase; }

.dir-2 .topbar {
  display: grid; grid-template-columns: auto 1fr auto;
  gap: 16px; align-items: center;
  padding: 14px 32px;
  border-bottom: 1px solid var(--line);
  background: #0a0f13;
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: var(--cyan);
}
.dir-2 .topbar .leftgroup { display:flex; align-items:center; gap: 14px; }
.dir-2 .topbar .dots { display:flex; gap: 6px; }
.dir-2 .topbar .dots i { width: 10px; height: 10px; background: #2a323b; display:inline-block; }
.dir-2 .topbar .dots i.on { background: var(--cyan); box-shadow: 0 0 6px var(--cyan); }
.dir-2 .topbar .path { color: var(--paper); }
.dir-2 .topbar .status { color: var(--cyan); }
.dir-2 .topbar .status .blink { animation: d2blink 1.1s steps(2) infinite; }
@keyframes d2blink { 0%,49% {opacity: 1;} 50%,100% {opacity: 0;} }

.dir-2 .nav {
  display:flex; gap: 22px;
  padding: 16px 32px;
  border-bottom: 1px solid var(--line);
  background: #0c1216;
  font-family: 'VT323', monospace; font-size: 19px;
}
.dir-2 .nav a { color: var(--paper); text-decoration: none; padding: 4px 8px; position: relative; }
.dir-2 .nav a::before { content: '['; opacity: 0; padding-right: 4px; transition: opacity .15s; }
.dir-2 .nav a::after  { content: ']'; opacity: 0; padding-left: 4px;  transition: opacity .15s; }
.dir-2 .nav a:hover { color: var(--cyan); }
.dir-2 .nav a:hover::before, .dir-2 .nav a:hover::after { opacity: 1; }
.dir-2 .nav .spacer { flex: 1; }
.dir-2 .nav .right { color: var(--cyan); }

.dir-2 .hero { padding: 64px 32px 40px; position: relative; }
.dir-2 .hero .terminal {
  border: 1px solid var(--line);
  background: linear-gradient(180deg, #10171d 0%, #0b1014 100%);
  border-radius: 4px;
  padding: 0;
  overflow: hidden;
  max-width: 1216px; margin: 0 auto;
}
.dir-2 .term-head {
  display:flex; align-items:center; gap: 10px;
  padding: 10px 14px; border-bottom: 1px solid var(--line);
  font-family: 'VT323', monospace; font-size: 15px; color: var(--paper);
}
.dir-2 .term-head .btns { display:flex; gap: 6px; }
.dir-2 .term-head .btns i { width: 11px; height: 11px; background: #2a323b; display:inline-block; border-radius: 2px; }
.dir-2 .term-head .btns i:nth-child(1) { background: oklch(0.65 0.18 25); }
.dir-2 .term-head .btns i:nth-child(2) { background: oklch(0.78 0.14 75); }
.dir-2 .term-head .btns i:nth-child(3) { background: var(--cyan); }
.dir-2 .term-head .title { margin-left: 6px; color: var(--paper); }

.dir-2 .term-body { padding: 36px 32px 32px; }
.dir-2 .term-body .prompt { font-family: 'VT323', monospace; font-size: 22px; color: var(--cyan); margin-bottom: 14px; }
.dir-2 .term-body h1 {
  margin: 0 0 24px; font-size: 124px; line-height: 0.94; letter-spacing: -0.04em; font-weight: 500;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  color: var(--paper);
}
.dir-2 .term-body h1 span.cyan { color: var(--cyan); }
.dir-2 .term-body .ledegrid {
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px;
  margin-top: 24px; padding-top: 24px;
  border-top: 1px dashed var(--line);
}
.dir-2 .term-body .ledegrid p { font-size: 20px; line-height: 1.4; margin: 0; max-width: 540px; color: var(--paper); }
.dir-2 .stats { font-family: 'VT323', monospace; font-size: 18px; color: var(--paper); line-height: 1.6; }
.dir-2 .stats .row { display:flex; justify-content: space-between; gap: 16px; }
.dir-2 .stats .row .k { color: var(--cyan); }
.dir-2 .stats .row .dots { flex:1; border-bottom: 2px dotted #2a323b; transform: translateY(-4px); }

.dir-2 .ascii-rule {
  font-family: 'VT323', monospace; font-size: 18px; color: #2a323b;
  white-space: pre; overflow: hidden; text-align: center;
  padding: 18px 0; line-height: 1;
}

.dir-2 .section { padding: 64px 32px 24px; }
.dir-2 .section-head { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: baseline; margin-bottom: 36px; }
.dir-2 .section-head .pixel.k { color: var(--cyan); }
.dir-2 .section-head h2 { margin: 0; font-size: 56px; font-weight: 500; letter-spacing: -0.03em; }
.dir-2 .section-head .meta { font-family:'VT323', monospace; font-size: 17px; color: var(--paper); opacity: .8; text-align: right; }

.dir-2 .game-card {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
  background: #10171d; border: 1px solid var(--line); padding: 24px;
  border-radius: 4px;
}
.dir-2 .game-card .art {
  height: 460px; position: relative; overflow: hidden;
  background:
    radial-gradient(circle at 30% 35%, #1a2530 0 18%, transparent 19%),
    radial-gradient(circle at 70% 60%, #2a3a48 0 12%, transparent 13%),
    repeating-conic-gradient(#0e1419 0% 25%, #131a21 0% 50%) 0 0/4px 4px;
  border: 1px solid var(--line);
}
.dir-2 .game-card .art .grid {
  position:absolute; inset: 0;
  background-image:
    linear-gradient(rgba(180,200,210,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,200,210,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}
.dir-2 .game-card .art .ph-label { color: var(--cyan); font-family: 'VT323', monospace; font-size: 16px; }
.dir-2 .game-card .art .tag {
  position:absolute; top: 14px; left: 14px;
  font-family:'Press Start 2P', monospace; font-size: 9px;
  padding: 6px 8px; background: var(--cyan); color: var(--ink);
}
.dir-2 .game-card .art .crosshair {
  position:absolute; top: 14px; right: 14px;
  font-family:'VT323', monospace; font-size: 16px; color: var(--cyan);
}
.dir-2 .game-card .art .atb {
  position:absolute; bottom: 14px; left: 14px; right: 14px;
  font-family:'VT323', monospace; font-size: 16px; color: var(--paper);
  background: rgba(14,20,25,0.85); border: 1px solid var(--cyan);
  padding: 10px 12px;
}
.dir-2 .game-card .art .atb .bar { display:inline-block; vertical-align: middle; height: 8px; width: 220px; background: var(--ink); border: 1px solid var(--line); margin: 0 8px; position: relative; }
.dir-2 .game-card .art .atb .bar i { display:block; height: 100%; background: var(--cyan); width: 68%; box-shadow: 0 0 8px var(--cyan); }

.dir-2 .game-info { display:flex; flex-direction: column; justify-content: space-between; padding: 4px 4px 4px 12px; }
.dir-2 .game-info .title { font-size: 88px; line-height: 0.9; font-weight: 500; letter-spacing: -0.035em; margin: 0 0 12px; }
.dir-2 .game-info .title span.cyan { color: var(--cyan); }
.dir-2 .game-info .sub { font-family:'VT323', monospace; font-size: 18px; color: var(--cyan); margin-bottom: 18px; }
.dir-2 .game-info p { font-size: 16px; line-height: 1.5; margin: 0 0 14px; color: var(--paper); }
.dir-2 .specs { font-family:'VT323', monospace; font-size: 17px; line-height: 1.6; margin-top: 14px; padding-top: 14px; border-top: 1px dashed var(--line); }
.dir-2 .specs .row { display:flex; justify-content: space-between; }
.dir-2 .specs .row .k { color: var(--cyan); }

.dir-2 .btn {
  display:inline-flex; align-items:center; gap: 10px; padding: 12px 18px;
  background: var(--cyan); color: var(--ink); font-family:'VT323', monospace; font-size: 20px;
  border: 0; cursor: pointer; transition: transform .15s;
  box-shadow: 4px 4px 0 var(--cyan-deep);
}
.dir-2 .btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--cyan-deep); }
.dir-2 .btn:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--cyan-deep); }

.dir-2 .about { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
.dir-2 .about .quote { font-size: 30px; line-height: 1.2; letter-spacing: -0.015em; font-weight: 400; margin: 0; }
.dir-2 .about .quote em { font-style: normal; color: var(--cyan); }
.dir-2 .about .bio { font-size: 15px; line-height: 1.6; color: var(--paper); margin-top: 18px; opacity: .8; }
.dir-2 .about .card {
  background: #10171d; border: 1px solid var(--line); padding: 20px; border-radius: 4px;
  font-family: 'VT323', monospace; font-size: 18px;
}
.dir-2 .about .card .row { display:flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed var(--line); }
.dir-2 .about .card .row:last-child { border-bottom: 0; }
.dir-2 .about .card .row .k { color: var(--cyan); }
.dir-2 .about .card .h { font-family: 'Press Start 2P', monospace; font-size: 10px; color: var(--cyan); margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }

.dir-2 .news-list { display:flex; flex-direction: column; gap: 0; border-top: 1px solid var(--line); }
.dir-2 .news-item {
  display: grid; grid-template-columns: 100px 140px 1fr 180px; gap: 16px; align-items: baseline;
  padding: 18px 8px; border-bottom: 1px solid var(--line);
  cursor: pointer; transition: background .2s;
}
.dir-2 .news-item:hover { background: #10171d; }
.dir-2 .news-item:hover h3 { color: var(--cyan); }
.dir-2 .news-item .n  { font-family:'VT323', monospace; font-size: 18px; color: var(--cyan); }
.dir-2 .news-item .d  { font-family:'VT323', monospace; font-size: 17px; color: var(--paper); opacity: .8; }
.dir-2 .news-item h3  { margin:0; font-size: 22px; font-weight: 500; letter-spacing: -0.01em; color: var(--paper); transition: color .2s; }
.dir-2 .news-item .t  { font-family:'VT323', monospace; font-size: 17px; color: var(--paper); opacity: .8; text-align: right; }

.dir-2 .contact .big {
  font-size: 120px; line-height: 0.94; font-weight: 500; letter-spacing: -0.04em; margin: 0;
}
.dir-2 .contact .big span.cyan { color: var(--cyan); }
.dir-2 .contact .row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-top: 40px; }
.dir-2 .contact .col {
  border: 1px solid var(--line); padding: 18px; background: #10171d;
}
.dir-2 .contact .col .h { font-family:'Press Start 2P', monospace; font-size: 10px; color: var(--cyan); margin-bottom: 12px; }
.dir-2 .contact .col a, .dir-2 .contact .col p { font-family:'VT323', monospace; font-size: 19px; color: var(--paper); display:block; text-decoration: none; }

.dir-2 footer {
  border-top: 1px solid var(--line); padding: 18px 32px;
  display:flex; justify-content: space-between; font-family:'VT323', monospace; font-size: 16px; color: var(--paper); opacity: .8;
}
.dir-2 footer .right { display:flex; gap: 20px; }

/* scramble */
.dir-2 .scramble { cursor: default; }
`;

function D2Scramble({ text, className }) {
  const [val, setVal] = React.useState(text);
  const intervalRef = React.useRef(null);
  const chars = '!@#$%^&*<>/\\01ABCDEFGHKMNPRSTUVWXZ';
  const run = () => {
    let i = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const out = text.split('').map((c, idx) => {
        if (idx < Math.floor(i)) return c;
        if (c === ' ') return ' ';
        return chars[Math.floor(Math.random()*chars.length)];
      }).join('');
      setVal(out);
      i += 0.6;
      if (i >= text.length) { clearInterval(intervalRef.current); setVal(text); }
    }, 32);
  };
  const stop = () => { clearInterval(intervalRef.current); setVal(text); };
  return <span className={(className||'')+' scramble'} onMouseEnter={run} onMouseLeave={stop}>{val}</span>;
}

const ASCII_LINE = '────────  ╳  ────────  ╳  ────────  ╳  ────────  ╳  ────────  ╳  ────────  ╳  ────────  ╳  ────────  ╳  ────────  ╳  ────────';

function Direction2() {
  return (
    <div className="dir dir-2">
      <style>{d2Styles}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="leftgroup">
          <span className="dots"><i className="on"></i><i className="on"></i><i className="on"></i><i></i></span>
          <span className="path">~/ember-bee/studio.html</span>
        </div>
        <span></span>
        <span className="status">◉ ONLINE · BUILD 0.4.2 · <span className="blink">▮</span></span>
      </div>

      {/* NAV */}
      <div className="nav">
        <a href="#"><D2Scramble text="home" /></a>
        <a href="#"><D2Scramble text="pulsebound" /></a>
        <a href="#"><D2Scramble text="studio" /></a>
        <a href="#"><D2Scramble text="devlog" /></a>
        <a href="#"><D2Scramble text="contact" /></a>
        <div className="spacer"></div>
        <span className="right">> press ? for help</span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="terminal">
          <div className="term-head">
            <span className="btns"><i></i><i></i><i></i></span>
            <span className="title">ember-bee // /opt/studio/manifest.txt</span>
          </div>
          <div className="term-body">
            <div className="prompt">$ cat manifest.txt</div>
            <h1>EMBER BEE.<br/>A workshop for <span className="cyan">strange</span><br/>little games.</h1>
            <div className="ledegrid">
              <p>One person, one keyboard, building roguelikes and JRPGs with handmade systems and pixel-y bones. Currently making <strong style={{color:'var(--cyan)'}}>Pulsebound</strong> — a creature-catcher with real-time ATB.</p>
              <div className="stats">
                <div className="row"><span className="k">studio</span><span className="dots"></span><span>solo</span></div>
                <div className="row"><span className="k">founded</span><span className="dots"></span><span>2025</span></div>
                <div className="row"><span className="k">based</span><span className="dots"></span><span>berlin · de</span></div>
                <div className="row"><span className="k">stack</span><span className="dots"></span><span>c++/sdl · aseprite</span></div>
                <div className="row"><span className="k">cup #</span><span className="dots"></span><span>3,221</span></div>
                <div className="row"><span className="k">commits</span><span className="dots"></span><span>1,407</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-rule">{ASCII_LINE}</div>

      {/* GAMES */}
      <section className="section">
        <div className="section-head">
          <div className="pixel"><span className="k">// 02</span> games</div>
          <h2>Currently on the workbench.</h2>
          <div className="meta">[ 01 / 01 ]</div>
        </div>

        <div className="game-card">
          <div className="art">
            <div className="grid"></div>
            <span className="tag">IN DEV</span>
            <span className="crosshair">+ 24, 17</span>
            <div className="ph-label">— pulsebound · key art ·</div>
            <div className="atb">
              <span style={{color:'var(--cyan)'}}>EMBER</span> <span className="bar"><i></i></span> <span>ATB · 68%</span> <span style={{float:'right'}}>HP 142 / 142</span>
            </div>
          </div>
          <div className="game-info">
            <div>
              <div className="title">Pulse<span className="cyan">bound</span>.</div>
              <div className="sub">// jrpg · creature catcher · real-time atb</div>
              <p>A real-time ATB creature-catcher about timing, trust, and the music between turns. Slay-the-Spire economy, Chrono Trigger pacing, and a roster that grows by what they remember of you.</p>
              <p style={{opacity:.7, fontSize:15}}>~ 48 catchable creatures, 6 biomes, every fight a tempo puzzle. ~</p>
              <div className="specs">
                <div className="row"><span className="k">genre</span><span>JRPG · roguelite</span></div>
                <div className="row"><span className="k">combat</span><span>real-time ATB</span></div>
                <div className="row"><span className="k">platform</span><span>PC · Mac · Steam</span></div>
                <div className="row"><span className="k">status</span><span>preproduction</span></div>
                <div className="row"><span className="k">target</span><span>2027</span></div>
              </div>
            </div>
            <button className="btn" style={{marginTop:20, alignSelf:'flex-start'}}>▶ wishlist on steam</button>
          </div>
        </div>
      </section>

      <div className="ascii-rule">{ASCII_LINE}</div>

      {/* ABOUT */}
      <section className="section">
        <div className="section-head">
          <div className="pixel"><span className="k">// 03</span> studio</div>
          <h2>One person. One workshop.</h2>
          <div className="meta">[ solo since 2025 ]</div>
        </div>
        <div className="about">
          <div>
            <p className="quote">I make the games <em>I wished existed</em> when I was eleven — strange little worlds with generous rules and characters who remember.</p>
            <p className="bio">Ember Bee is a one-person studio operating out of a small apartment with one keyboard, one extremely opinionated cat, and a custom toolchain that grows weekly. Design, code, pixel art, music — every system handmade.</p>
            <p className="bio" style={{fontFamily:'VT323, monospace', fontSize: 20, color:'var(--cyan)', marginTop: 18}}>— sam_</p>
          </div>
          <div className="card">
            <div className="h">// stats.txt</div>
            <div className="row"><span className="k">games shipped</span><span>0 (yet)</span></div>
            <div className="row"><span className="k">games in progress</span><span>1</span></div>
            <div className="row"><span className="k">years coding</span><span>14</span></div>
            <div className="row"><span className="k">years doing this fulltime</span><span>1.2</span></div>
            <div className="row"><span className="k">favorite jrpg</span><span>chrono trigger</span></div>
            <div className="row"><span className="k">cat</span><span>marbles (cw)</span></div>
            <div className="row"><span className="k">desk plant</span><span>alive (sept '25)</span></div>
            <div className="row"><span className="k">cup count today</span><span>4 ▮▮▮▮</span></div>
          </div>
        </div>
      </section>

      <div className="ascii-rule">{ASCII_LINE}</div>

      {/* NEWS */}
      <section className="section">
        <div className="section-head">
          <div className="pixel"><span className="k">// 04</span> devlog</div>
          <h2>Notes from the workshop.</h2>
          <div className="meta">[ 12 entries · subscribe via rss ]</div>
        </div>
        <div className="news-list">
          {[
            ['#012','2026.05.09','How an ATB clock changed the whole game','pulsebound'],
            ['#011','2026.04.22','Animating 48 creatures alone, frame by frame','process'],
            ['#010','2026.04.03','On generosity in roguelikes','essay'],
            ['#009','2026.03.11','The first six months: what a solo studio costs','studio'],
            ['#008','2026.02.18','Building a custom dialogue engine from scratch','process'],
          ].map(([n,d,t,tg]) => (
            <div className="news-item" key={n}>
              <span className="n">{n}</span>
              <span className="d">{d}</span>
              <h3>{t}</h3>
              <span className="t">› {tg}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="ascii-rule">{ASCII_LINE}</div>

      {/* CONTACT */}
      <section className="section contact">
        <div className="section-head">
          <div className="pixel"><span className="k">// 05</span> contact</div>
          <h2 style={{visibility:'hidden'}}>placeholder</h2>
          <div className="meta">[ replies &lt; 48h ]</div>
        </div>
        <h2 className="big">say <span className="cyan">hi_</span> — i read everything.</h2>
        <div className="row">
          <div className="col">
            <div className="h">// email</div>
            <a href="#">hello@emberbee.studio</a>
            <a href="#">press@emberbee.studio</a>
          </div>
          <div className="col">
            <div className="h">// social</div>
            <a href="#">bluesky · @emberbee</a>
            <a href="#">youtube · /emberbee</a>
            <a href="#">github · /emberbee</a>
          </div>
          <div className="col">
            <div className="h">// devlog newsletter</div>
            <p style={{opacity:.8, marginBottom: 12}}>short note every fortnight. no fluff.</p>
            <div style={{display:'flex', gap: 8, alignItems:'center'}}>
              <span style={{color:'var(--cyan)', fontFamily:'VT323, monospace', fontSize: 20}}>></span>
              <input placeholder="your.email@..." style={{flex:1, background:'transparent', border:0, borderBottom:'1px dashed var(--paper)', color:'var(--paper)', fontFamily:'VT323, monospace', fontSize: 19, outline:'none', padding:'4px 0'}}/>
            </div>
            <button className="btn" style={{marginTop:14}}>▶ subscribe</button>
          </div>
        </div>
      </section>

      <footer>
        <span>© ember bee studio · 2026 · built with too much coffee</span>
        <div className="right">
          <span>BERLIN.DE</span>
          <span>v0.4.2</span>
          <span>up · {Math.floor(Math.random()*99)+1}d</span>
        </div>
      </footer>
    </div>
  );
}

window.Direction2 = Direction2;
window.D2_W = D2_W; window.D2_H = D2_H;
