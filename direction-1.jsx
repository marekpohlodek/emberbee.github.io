// Direction 1 · "Index" — Editorial Swiss
// Space Grotesk + JetBrains Mono. Slate ink on fog. One amber accent.
// Signature interactions: magnetic CTA, image-reveal mask wipe on cards,
// number scramble on the section indices.

const D1_W = 1280;
const D1_H = 4480;

const d1Styles = `
.dir-1 {
  --ink: #14181d;
  --ink-2: #2a3038;
  --fog: #e8ebef;
  --paper: #f3f5f8;
  --line: rgba(20,24,29,0.12);
  --amber: oklch(0.78 0.13 75);
  --amber-deep: oklch(0.64 0.14 65);
  width: ${D1_W}px;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-feature-settings: 'ss01' 1, 'ss02' 1;
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
}
.dir-1 .mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0; }
.dir-1 .nav {
  position: sticky; top: 0; z-index: 5;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  padding: 24px 56px; border-bottom: 1px solid var(--line);
  background: color-mix(in oklab, var(--paper) 92%, transparent);
  backdrop-filter: blur(6px);
}
.dir-1 .logomark { display:flex; align-items:center; gap: 10px; font-weight: 600; font-size: 16px; }
.dir-1 .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 0 4px color-mix(in oklab, var(--amber) 22%, transparent); }
.dir-1 .navlinks { display: flex; gap: 28px; font-size: 13px; }
.dir-1 .navlinks a { color: var(--ink); text-decoration: none; position: relative; padding: 4px 0; }
.dir-1 .navlinks a::after { content:''; position:absolute; left:0; right:0; bottom:-2px; height:1px; background:var(--ink); transform-origin: left; transform: scaleX(0); transition: transform .35s cubic-bezier(.65,.05,.36,1); }
.dir-1 .navlinks a:hover::after { transform: scaleX(1); }
.dir-1 .nav-right { display:flex; justify-content:flex-end; gap:14px; font-size:12px; color: var(--ink-2); }
.dir-1 .nav-right .mono { font-size: 11px; }

.dir-1 .hero { padding: 72px 56px 56px; position: relative; }
.dir-1 .hero .kicker { display:flex; gap: 16px; align-items: baseline; font-size: 12px; color: var(--ink-2); margin-bottom: 64px; }
.dir-1 .hero .kicker .sw { display:inline-block; width:8px; height:8px; background: var(--amber); }
.dir-1 .hero .index { font-size: 13px; color: var(--ink-2); }
.dir-1 .hero h1 {
  font-size: 168px; line-height: 0.92; letter-spacing: -0.045em; font-weight: 500;
  margin: 0 0 28px; max-width: 1160px;
}
.dir-1 .hero h1 em { font-style: italic; font-weight: 400; color: var(--amber-deep); font-family: 'Space Grotesk'; }
.dir-1 .hero .lede { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-top: 48px; align-items: end; }
.dir-1 .hero .lede p { font-size: 22px; line-height: 1.35; max-width: 520px; color: var(--ink); margin: 0; letter-spacing: -0.005em; }
.dir-1 .hero .meta { display:flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--ink-2); }
.dir-1 .hero .meta b { color: var(--ink); font-weight: 600; }

.dir-1 .marquee {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--ink); color: var(--paper);
  padding: 22px 0; overflow: hidden; white-space: nowrap;
  font-size: 38px; letter-spacing: -0.02em; font-weight: 400;
}
.dir-1 .marquee span { display: inline-block; padding: 0 28px; }
.dir-1 .marquee .star { color: var(--amber); }

.dir-1 .section { padding: 96px 56px 24px; border-top: 1px solid var(--line); position: relative; }
.dir-1 .section-head { display: grid; grid-template-columns: 80px 1fr auto; gap: 32px; align-items: baseline; margin-bottom: 56px; }
.dir-1 .section-head .num { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--amber-deep); letter-spacing: 0.04em; }
.dir-1 .section-head h2 { margin:0; font-size: 64px; font-weight: 500; letter-spacing: -0.03em; }
.dir-1 .section-head .meta { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-2); text-align: right; }

.dir-1 .game-card {
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; padding: 0 0 32px;
  align-items: stretch;
}
.dir-1 .game-card .art {
  --ph-a: #d8dde3; --ph-b: #cfd5dc; --ph-border: rgba(0,0,0,0.08); --ph-text: rgba(20,24,29,0.55);
  height: 540px; border-radius: 2px;
  position: relative; overflow: hidden;
}
.dir-1 .game-card .art::after {
  content:''; position:absolute; inset:0; background: var(--ink);
  transform: translateY(101%); transition: transform .9s cubic-bezier(.65,.05,.36,1);
}
.dir-1 .game-card:hover .art::after { transform: translateY(0); }
.dir-1 .game-card .art .tag { position:absolute; top: 18px; left:18px; padding: 6px 10px; font-family:'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .08em; background: var(--paper); color: var(--ink); }
.dir-1 .game-card .art .reveal { position:absolute; inset: 0; display:flex; align-items:flex-end; padding: 28px; z-index: 2; opacity: 0; transition: opacity .6s .3s; color: var(--paper); font-size: 14px; line-height: 1.4; }
.dir-1 .game-card:hover .art .reveal { opacity: 1; }

.dir-1 .game-info { display: flex; flex-direction: column; justify-content: space-between; }
.dir-1 .game-info .title { font-size: 96px; line-height: 0.9; font-weight: 500; letter-spacing: -0.035em; margin: 0 0 16px; }
.dir-1 .game-info .subtitle { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-2); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 28px; }
.dir-1 .game-info p { font-size: 17px; line-height: 1.45; color: var(--ink); margin: 0 0 24px; max-width: 460px; }
.dir-1 .specs { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; margin-top: 12px; }
.dir-1 .specs .row { display:flex; justify-content: space-between; font-family:'JetBrains Mono', monospace; font-size: 11px; padding: 8px 0; border-top: 1px solid var(--line); }
.dir-1 .specs .row b { color: var(--ink); font-weight: 500; }
.dir-1 .specs .row span { color: var(--ink-2); }

.dir-1 .btn {
  display:inline-flex; align-items:center; gap: 10px; padding: 14px 22px;
  background: var(--ink); color: var(--paper); font-size: 14px; letter-spacing: -0.005em;
  border: 0; cursor: pointer; transition: transform .3s cubic-bezier(.65,.05,.36,1), background .2s;
}
.dir-1 .btn .arrow { display:inline-block; transition: transform .35s; }
.dir-1 .btn:hover { background: var(--amber-deep); color: var(--paper); }
.dir-1 .btn:hover .arrow { transform: translateX(6px); }

.dir-1 .about { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding-bottom: 56px; }
.dir-1 .about .quote { font-size: 36px; line-height: 1.15; letter-spacing: -0.02em; font-weight: 400; margin: 0; }
.dir-1 .about .quote .amber { color: var(--amber-deep); font-style: italic; }
.dir-1 .about .who {
  --ph-a: #d8dde3; --ph-b: #cfd5dc;
  height: 360px; width: 320px; border-radius: 2px; margin-left: auto;
}
.dir-1 .about .bio { font-size: 15px; line-height: 1.5; color: var(--ink-2); margin-top: 20px; max-width: 360px; }
.dir-1 .about .signature { font-family: 'Caveat', cursive; font-size: 28px; color: var(--ink); margin-top: 12px; }

.dir-1 .news { display: flex; flex-direction: column; }
.dir-1 .news-item {
  display: grid; grid-template-columns: 80px 120px 1fr 200px; gap: 24px;
  padding: 26px 0; border-top: 1px solid var(--line);
  align-items: baseline;
  transition: padding .35s cubic-bezier(.65,.05,.36,1);
  cursor: pointer;
}
.dir-1 .news-item:hover { padding-left: 18px; }
.dir-1 .news-item .n { font-family:'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-2); }
.dir-1 .news-item .date { font-family:'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-2); }
.dir-1 .news-item h3 { margin:0; font-size: 26px; font-weight: 500; letter-spacing: -0.015em; line-height: 1.1; }
.dir-1 .news-item .tag { font-family:'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-2); text-align: right; }
.dir-1 .news-item:hover h3 { color: var(--amber-deep); }
.dir-1 .news-item:last-child { border-bottom: 1px solid var(--line); }

.dir-1 .contact { padding: 96px 56px 56px; border-top: 1px solid var(--line); }
.dir-1 .contact .big { font-size: 152px; line-height: 0.92; letter-spacing: -0.045em; font-weight: 500; margin: 0; }
.dir-1 .contact .big em { font-style: italic; color: var(--amber-deep); }
.dir-1 .contact .row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; margin-top: 64px; }
.dir-1 .contact .row .col h4 { font-family:'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .08em; color: var(--ink-2); margin: 0 0 10px; text-transform: uppercase; }
.dir-1 .contact .row .col a, .dir-1 .contact .row .col p { font-size: 16px; color: var(--ink); text-decoration: none; display:block; }

.dir-1 footer { padding: 32px 56px; border-top: 1px solid var(--line); display:flex; justify-content: space-between; font-family:'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-2); }
.dir-1 footer .right { display: flex; gap: 18px; }

/* Magnetic CTA wrapper */
.dir-1 .mag { display:inline-block; transition: transform .25s cubic-bezier(.2,.7,.3,1); }
`;

function D1MagneticBtn({ children }) {
  const ref = React.useRef(null);
  const handleMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    el.style.transform = `translate(${x*0.18}px, ${y*0.28}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return (
    <span className="mag" ref={ref} onMouseMove={handleMove} onMouseLeave={reset}>
      {children}
    </span>
  );
}

function D1Scramble({ text, className }) {
  // Subtle hover scramble for the section title numbers.
  const [val, setVal] = React.useState(text);
  const intervalRef = React.useRef(null);
  const chars = '0123456789ABCDEF';
  const run = () => {
    let i = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const out = text.split('').map((c, idx) => idx < i ? c : (c === ' ' ? ' ' : chars[Math.floor(Math.random()*chars.length)])).join('');
      setVal(out);
      i += 0.5;
      if (i >= text.length) { clearInterval(intervalRef.current); setVal(text); }
    }, 35);
  };
  return <span className={className} onMouseEnter={run}>{val}</span>;
}

function Direction1() {
  return (
    <div className="dir dir-1">
      <style>{d1Styles}</style>

      {/* NAV */}
      <div className="nav">
        <div className="logomark">
          <span className="dot"></span>
          <span>Ember Bee Studio</span>
        </div>
        <nav className="navlinks">
          <a href="#">Index</a>
          <a href="#">Pulsebound</a>
          <a href="#">Studio</a>
          <a href="#">Journal</a>
          <a href="#">Contact</a>
        </nav>
        <div className="nav-right">
          <span className="mono">EST. MMXXV</span>
          <span className="mono">◐ AVAILABLE</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="kicker">
          <span className="sw"></span>
          <span className="mono">INDEX —— 01 / STUDIO</span>
          <span className="mono">A SOLO WORKSHOP</span>
          <span className="mono">SINGLE-OPERATOR · COOPERATING WITH MACHINES</span>
        </div>
        <h1>A small studio<br/>making <em>strange,</em><br/>generous games.</h1>
        <div className="lede">
          <p>Ember Bee is a one-person studio designing roguelikes and JRPGs that put the player above the spectacle. We start with a feeling, then build the rules around it.</p>
          <div className="meta">
            <span className="mono">52.5200° N · 13.4050° E</span>
            <span className="mono">SCROLL ↓ FOR INDEX</span>
            <span className="mono" style={{marginTop: 18}}><b>NOW:</b> Pulsebound — preproduction</span>
            <span className="mono"><b>NEXT:</b> Vertical slice · Q4</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <span>Pulsebound</span><span className="star">✦</span>
        <span>A creature-catching JRPG</span><span className="star">✦</span>
        <span>Real-time ATB</span><span className="star">✦</span>
        <span>Hand-drawn battlers</span><span className="star">✦</span>
        <span>In development</span><span className="star">✦</span>
        <span>Pulsebound</span><span className="star">✦</span>
        <span>A creature-catching JRPG</span><span className="star">✦</span>
      </div>

      {/* GAMES */}
      <section className="section">
        <div className="section-head">
          <div className="num"><D1Scramble text="02 / GAMES" /></div>
          <h2>Now playing in the workshop.</h2>
          <div className="meta">01 / 01 PROJECTS</div>
        </div>

        <div className="game-card">
          <div className="ph art">
            <span className="tag">IN DEVELOPMENT</span>
            <div className="ph-label">— PULSEBOUND · KEY ART PLACEHOLDER ·</div>
            <div className="reveal">Hover to peek behind the curtain — a glimpse of the overworld and a battler stand-off.</div>
          </div>
          <div className="game-info">
            <div>
              <div className="title">Pulsebound.</div>
              <div className="subtitle">JRPG · CREATURE CATCHER · REAL-TIME ATB</div>
              <p>An ATB-driven creature catcher about timing, trust, and the music between turns. Think Slay-the-Spire economy, Chrono Trigger pacing, and a roster that grows by what they remember of you.</p>
              <D1MagneticBtn><button className="btn">Read the design notes <span className="arrow">→</span></button></D1MagneticBtn>
            </div>
            <div className="specs">
              <div className="row"><b>Genre</b><span>JRPG / Roguelite</span></div>
              <div className="row"><b>Combat</b><span>Real-time ATB</span></div>
              <div className="row"><b>Platforms</b><span>PC · Mac</span></div>
              <div className="row"><b>Engine</b><span>Custom · C++ / SDL</span></div>
              <div className="row"><b>Status</b><span>Preproduction</span></div>
              <div className="row"><b>Target</b><span>2027</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="section-head">
          <div className="num"><D1Scramble text="03 / STUDIO" /></div>
          <h2>One person, one bench, one bee.</h2>
          <div className="meta">SOLO · SINCE 2025</div>
        </div>
        <div className="about">
          <div>
            <p className="quote">I build the games <span className="amber">I wished existed</span> when I was eleven — strange little worlds with generous rules and characters who remember.</p>
            <p className="bio">Ember Bee is a one-person studio operating out of a small apartment with one keyboard and one extremely opinionated cat. Design, code, art, and audio under one roof — sometimes that means slower, but it always means whole.</p>
            <div className="signature">— sam · founder</div>
          </div>
          <div className="ph who">
            <div className="ph-label">— DESK PHOTO ·</div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="section">
        <div className="section-head">
          <div className="num"><D1Scramble text="04 / JOURNAL" /></div>
          <h2>Devlog &amp; field notes.</h2>
          <div className="meta">12 ENTRIES · RSS ↗</div>
        </div>
        <div className="news">
          {[
            ['012','2026 · 05 · 09','How an ATB clock changed the game','PULSEBOUND'],
            ['011','2026 · 04 · 22','Animating a roster of 48 creatures (alone)','PROCESS'],
            ['010','2026 · 04 · 03','On generosity in roguelikes','ESSAY'],
            ['009','2026 · 03 · 11','The first six months: what a solo studio costs','STUDIO'],
            ['008','2026 · 02 · 18','Building a custom dialogue engine from scratch','PROCESS'],
          ].map(([n,d,t,tag]) => (
            <div className="news-item" key={n}>
              <span className="n">{n}</span>
              <span className="date">{d}</span>
              <h3>{t}</h3>
              <span className="tag">{tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <div className="section-head" style={{marginBottom: 32}}>
          <div className="num">05 / CONTACT</div>
          <h2 style={{visibility:'hidden'}}>placeholder</h2>
          <div className="meta">REPLIES WITHIN 48H</div>
        </div>
        <h2 className="big">Say hi — <em>I read everything.</em></h2>
        <div className="row">
          <div className="col">
            <h4>Email</h4>
            <a href="#">hello@emberbee.studio</a>
            <a href="#">press@emberbee.studio</a>
          </div>
          <div className="col">
            <h4>Around</h4>
            <a href="#">@emberbee · Bluesky</a>
            <a href="#">@emberbee · YouTube</a>
            <a href="#">github.com/emberbee</a>
          </div>
          <div className="col">
            <h4>Newsletter</h4>
            <p style={{color:'var(--ink-2)', fontSize:14, lineHeight:1.45, marginTop:0}}>A short note every fortnight — devlog highlights, no fluff.</p>
            <div style={{display:'flex', marginTop:14, borderBottom:'1px solid var(--ink)'}}>
              <input placeholder="your email" style={{flex:1, border:0, padding:'10px 0', background:'transparent', fontSize:15, color:'var(--ink)', outline:'none'}}/>
              <D1MagneticBtn><button className="btn" style={{padding:'10px 14px'}}>Subscribe <span className="arrow">→</span></button></D1MagneticBtn>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>© Ember Bee Studio · 2026</span>
        <div className="right">
          <span>Berlin → World</span>
          <span>v0.4 · Site</span>
          <span>Made with too much coffee</span>
        </div>
      </footer>
    </div>
  );
}

window.Direction1 = Direction1;
window.D1_W = D1_W; window.D1_H = D1_H;
