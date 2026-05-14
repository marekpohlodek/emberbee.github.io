// Direction 3 · "Field Notes" — Handcrafted devlog
// Bricolage Grotesque + Caveat (handwriting). Notebook + tape + marquee
// bee-strip. Hand-drawn annotation hovers (circled, underlined).

const D3_W = 1280;
const D3_H = 3980;

const d3Styles = `
.dir-3 {
  --ink: #1f242b;
  --ink-2: #3b424c;
  --paper: #eceef1;
  --paper-2: #e2e5ea;
  --line: rgba(31,36,43,0.16);
  --rust: oklch(0.62 0.16 35);
  --rust-deep: oklch(0.50 0.16 32);
  --honey: oklch(0.80 0.13 78);
  width: ${D3_W}px;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-feature-settings: 'ss01' 1;
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
}
/* paper grain */
.dir-3::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background-image: radial-gradient(rgba(31,36,43,0.04) 1px, transparent 1px);
  background-size: 4px 4px;
  z-index: 0; mix-blend-mode: multiply;
}
.dir-3 > * { position: relative; z-index: 1; }
.dir-3 .hand { font-family: 'Caveat', cursive; letter-spacing: 0; }
.dir-3 .mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0; }

.dir-3 .nav {
  display:flex; align-items: center; gap: 24px; padding: 28px 48px;
  border-bottom: 1px dashed var(--line);
}
.dir-3 .nav .logo { display:flex; align-items:center; gap: 10px; font-weight: 700; font-size: 17px; }
.dir-3 .nav .logo .bee {
  width: 26px; height: 26px; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, var(--honey) 0 38%, var(--ink) 39% 42%, var(--honey) 43% 60%, var(--ink) 61% 64%, var(--honey) 65% 100%);
  position: relative;
}
.dir-3 .nav .logo .bee::after {
  content:''; position:absolute; left: -6px; top: 4px; width: 12px; height: 8px;
  background: rgba(255,255,255,0.85); border-radius: 50%;
  transform: rotate(-20deg);
}
.dir-3 .nav .links { display:flex; gap: 24px; margin-left: auto; font-size: 15px; font-weight: 500; }
.dir-3 .nav .links a { color: var(--ink); text-decoration: none; position: relative; padding: 4px 2px; }
.dir-3 .nav .links a:hover { color: var(--rust-deep); }
.dir-3 .nav .links a:hover::after {
  content:''; position:absolute; left: -2px; right: -2px; bottom: -2px; height: 10px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 10' preserveAspectRatio='none'><path d='M0 6 Q 12 1 25 5 T 50 5 T 75 5 T 100 5' fill='none' stroke='%23c64a26' stroke-width='2' stroke-linecap='round'/></svg>") repeat-x;
  background-size: 100px 10px;
}
.dir-3 .nav .right { font-family: 'Caveat', cursive; font-size: 22px; color: var(--ink-2); transform: rotate(-2deg); }

.dir-3 .hero { padding: 80px 48px 48px; position: relative; }
.dir-3 .hero .kicker { font-family: 'Caveat', cursive; font-size: 28px; color: var(--rust-deep); transform: rotate(-1.5deg); margin-bottom: 24px; display:inline-block; }
.dir-3 .hero .kicker::before { content: '↳ '; }
.dir-3 .hero h1 {
  margin: 0 0 32px; font-size: 132px; line-height: 0.95; letter-spacing: -0.035em; font-weight: 600;
  max-width: 1100px;
}
.dir-3 .hero h1 .annotated {
  position: relative; display: inline-block; color: var(--ink);
}
.dir-3 .hero h1 .annotated::after {
  content:''; position:absolute; left: -8px; right: -8px; top: -6px; bottom: -6px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100' preserveAspectRatio='none'><path d='M30 50 Q10 12 150 8 Q295 5 285 50 Q295 95 150 92 Q10 95 30 50 Z' fill='none' stroke='%23c64a26' stroke-width='3' stroke-linecap='round'/></svg>") no-repeat center / 100% 100%;
  pointer-events: none;
}
.dir-3 .hero h1 em { font-style: italic; font-weight: 500; }
.dir-3 .hero .lede { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; margin-top: 40px; align-items: end; }
.dir-3 .hero .lede p { font-size: 20px; line-height: 1.45; color: var(--ink); margin: 0; max-width: 540px; }
.dir-3 .hero .lede .arrow { font-family: 'Caveat', cursive; font-size: 22px; color: var(--rust-deep); transform: rotate(-2deg); }

/* taped polaroid card in hero */
.dir-3 .hero .polaroid {
  position: absolute; right: 60px; top: 110px;
  width: 220px; padding: 12px 12px 36px; background: #fff;
  box-shadow: 0 12px 28px rgba(31,36,43,0.18), 0 2px 6px rgba(31,36,43,0.12);
  transform: rotate(4deg);
}
.dir-3 .hero .polaroid .ph { height: 220px; --ph-a: #d2d6db; --ph-b: #bfc4ca; }
.dir-3 .hero .polaroid .caption { font-family:'Caveat', cursive; font-size: 22px; color: var(--ink); text-align: center; margin-top: 8px; }
.dir-3 .hero .polaroid .tape {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%) rotate(-3deg);
  width: 90px; height: 22px; background: rgba(255, 220, 130, 0.55);
  border: 1px dashed rgba(31,36,43,0.18);
}

/* marquee bee strip */
.dir-3 .marquee {
  background: var(--ink); color: var(--paper);
  padding: 18px 0; overflow: hidden; white-space: nowrap;
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: 500;
  border-top: 1px dashed var(--line); border-bottom: 1px dashed var(--line);
}
.dir-3 .marquee span { display:inline-block; padding: 0 24px; }
.dir-3 .marquee .honey { color: var(--honey); }
.dir-3 .marquee .bee {
  display:inline-block; vertical-align: middle; width: 22px; height: 14px; border-radius: 7px;
  background: linear-gradient(90deg, var(--honey) 0 30%, var(--ink-2) 30% 38%, var(--honey) 38% 60%, var(--ink-2) 60% 68%, var(--honey) 68% 100%);
  margin: 0 8px; border: 1.5px solid var(--paper);
}

.dir-3 .section { padding: 80px 48px 24px; border-top: 1px dashed var(--line); }
.dir-3 .section-head { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: end; margin-bottom: 48px; }
.dir-3 .section-head .tag { font-family: 'Caveat', cursive; font-size: 30px; color: var(--rust-deep); transform: rotate(-2deg); }
.dir-3 .section-head h2 { margin:0; font-size: 64px; font-weight: 600; letter-spacing: -0.025em; line-height: 1; }
.dir-3 .section-head .meta { font-family:'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-2); text-align: right; letter-spacing: .06em; text-transform: uppercase; }

.dir-3 .game-card {
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: start;
  padding-bottom: 32px;
  position: relative;
}
.dir-3 .game-card .art-wrap {
  position: relative; padding: 18px 18px 56px; background: #fff;
  box-shadow: 0 18px 36px rgba(31,36,43,0.16), 0 3px 8px rgba(31,36,43,0.10);
  transform: rotate(-1.5deg);
}
.dir-3 .game-card .art-wrap .tape {
  position:absolute; top: -14px; width: 110px; height: 24px;
  background: rgba(255, 220, 130, 0.55); border: 1px dashed rgba(31,36,43,0.18);
}
.dir-3 .game-card .art-wrap .tape.l { left: 16px; transform: rotate(-6deg); }
.dir-3 .game-card .art-wrap .tape.r { right: 16px; transform: rotate(5deg); }
.dir-3 .game-card .ph { height: 440px; --ph-a:#d2d6db; --ph-b:#bfc4ca; }
.dir-3 .game-card .caption { font-family:'Caveat', cursive; font-size: 24px; text-align: center; margin-top: 14px; }
.dir-3 .game-card .stamp {
  position:absolute; bottom: 8px; right: 14px;
  border: 2px solid var(--rust); color: var(--rust);
  padding: 6px 10px; transform: rotate(-8deg);
  font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .1em;
  text-transform: uppercase; background: transparent;
}

.dir-3 .game-info { padding: 20px 0 0; }
.dir-3 .game-info .title { font-size: 96px; line-height: 0.92; font-weight: 700; letter-spacing: -0.03em; margin: 0 0 6px; }
.dir-3 .game-info .title em { font-style: italic; font-weight: 500; color: var(--rust-deep); }
.dir-3 .game-info .sub { font-family: 'Caveat', cursive; font-size: 26px; color: var(--ink-2); margin-bottom: 22px; transform: rotate(-1deg); display: inline-block; }
.dir-3 .game-info p { font-size: 17px; line-height: 1.5; margin: 0 0 16px; max-width: 460px; }
.dir-3 .game-info .features { display:flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.dir-3 .game-info .features li { list-style: none; padding: 6px 12px; border: 1.5px solid var(--ink); border-radius: 30px; font-size: 14px; background: var(--paper); }
.dir-3 .game-info .features li:nth-child(2n) { transform: rotate(-1deg); }
.dir-3 .game-info .features li:nth-child(3n) { transform: rotate(1.5deg); }

.dir-3 .btn {
  display:inline-flex; align-items:center; gap: 10px; padding: 14px 22px;
  background: var(--ink); color: var(--paper); font-size: 15px; font-weight: 500;
  border: 0; cursor: pointer; border-radius: 999px; transition: transform .25s, background .2s;
  margin-top: 20px;
}
.dir-3 .btn:hover { background: var(--rust-deep); transform: translateY(-2px) rotate(-1deg); }

.dir-3 .about { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: start; }
.dir-3 .about .col-l p.quote {
  font-size: 36px; line-height: 1.18; letter-spacing: -0.02em; font-weight: 500; margin: 0 0 20px;
}
.dir-3 .about .col-l p.quote .annotated {
  position: relative; display: inline-block;
}
.dir-3 .about .col-l p.quote .annotated::after {
  content:''; position:absolute; left: -2px; right: -2px; bottom: -6px; height: 12px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 12' preserveAspectRatio='none'><path d='M2 8 Q 50 2 100 7 T 198 6' fill='none' stroke='%23c64a26' stroke-width='2.5' stroke-linecap='round'/></svg>") no-repeat center / 100% 100%;
}
.dir-3 .about .bio { font-size: 16px; line-height: 1.6; color: var(--ink-2); max-width: 480px; }
.dir-3 .about .signature { font-family:'Caveat', cursive; font-size: 36px; color: var(--ink); margin-top: 18px; transform: rotate(-2deg); display:inline-block; }

.dir-3 .stickers { display: flex; flex-direction: column; gap: 18px; }
.dir-3 .sticker {
  background: #fff; padding: 18px 22px; border: 1px dashed var(--line);
  box-shadow: 0 10px 24px rgba(31,36,43,0.10);
  position: relative;
}
.dir-3 .sticker.honey { background: #fff7d8; transform: rotate(-1deg); }
.dir-3 .sticker.fog { background: var(--paper-2); transform: rotate(1.2deg); }
.dir-3 .sticker .h { font-family: 'Caveat', cursive; font-size: 26px; color: var(--rust-deep); margin-bottom: 8px; }
.dir-3 .sticker p { margin: 0; font-size: 15px; line-height: 1.5; }
.dir-3 .sticker .pin { position:absolute; top: 10px; right: 14px; width: 12px; height: 12px; border-radius: 50%; background: var(--rust); box-shadow: 0 2px 4px rgba(31,36,43,0.3); }

.dir-3 .news { display:flex; flex-direction: column; gap: 0; }
.dir-3 .news-item {
  display: grid; grid-template-columns: 120px 1fr 200px; gap: 24px; align-items: baseline;
  padding: 22px 6px; border-top: 1px dashed var(--line);
  cursor: pointer; position: relative;
}
.dir-3 .news-item:last-child { border-bottom: 1px dashed var(--line); }
.dir-3 .news-item .date { font-family:'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-2); }
.dir-3 .news-item h3 { margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.15; position: relative; display: inline-block; }
.dir-3 .news-item h3::after {
  content:''; position: absolute; left: -2px; right: -2px; bottom: -4px; height: 10px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 10' preserveAspectRatio='none'><path d='M2 6 Q 50 1 100 5 T 198 5' fill='none' stroke='%23c64a26' stroke-width='2.5' stroke-linecap='round'/></svg>") no-repeat center / 100% 100%;
  opacity: 0; transition: opacity .25s;
}
.dir-3 .news-item:hover h3::after { opacity: 1; }
.dir-3 .news-item .tag { font-family: 'Caveat', cursive; font-size: 22px; color: var(--rust-deep); text-align: right; transform: rotate(-2deg); }

.dir-3 .contact .big { font-size: 124px; line-height: 0.95; font-weight: 700; letter-spacing: -0.035em; margin: 0; }
.dir-3 .contact .big em { font-style: italic; font-weight: 500; color: var(--rust-deep); }
.dir-3 .contact .big .annotated { position: relative; display: inline-block; }
.dir-3 .contact .big .annotated::after {
  content:''; position:absolute; left: -6px; right: -6px; bottom: 8px; height: 18px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 18' preserveAspectRatio='none'><path d='M2 12 Q 80 2 150 10 T 298 10' fill='none' stroke='%23c64a26' stroke-width='3' stroke-linecap='round'/></svg>") no-repeat center / 100% 100%;
}
.dir-3 .contact .row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; margin-top: 56px; }
.dir-3 .contact .col h4 { font-family: 'Caveat', cursive; font-size: 28px; color: var(--rust-deep); margin: 0 0 8px; transform: rotate(-1deg); display:inline-block; }
.dir-3 .contact .col a, .dir-3 .contact .col p { display:block; font-size: 16px; color: var(--ink); text-decoration: none; margin: 4px 0; }

.dir-3 footer {
  padding: 28px 48px; border-top: 1px dashed var(--line);
  display:flex; justify-content: space-between; font-family:'JetBrains Mono', monospace;
  font-size: 11px; color: var(--ink-2); letter-spacing: .06em; text-transform: uppercase;
}
.dir-3 footer .right { display:flex; gap: 16px; }
`;

function Direction3() {
  return (
    <div className="dir dir-3">
      <style>{d3Styles}</style>

      {/* NAV */}
      <div className="nav">
        <div className="logo">
          <span className="bee"></span>
          <span>Ember Bee Studio</span>
        </div>
        <nav className="links">
          <a href="#">home</a>
          <a href="#">pulsebound</a>
          <a href="#">about</a>
          <a href="#">field notes</a>
          <a href="#">say hi</a>
        </nav>
        <div className="right">est. '25 ✿</div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="kicker">hello, little corner of the internet</div>
        <h1>
          a one-person <span className="annotated">workshop</span>{' '}
          making <em>strange,</em><br/>generous little games.
        </h1>
        <div className="lede">
          <p>Ember Bee is me, sam, making roguelikes and JRPGs in a small apartment with a loud cat. Currently building <strong>Pulsebound</strong> — a creature catcher with real-time ATB.</p>
          <div className="arrow">↘ scroll for the workbench</div>
        </div>
        <div className="polaroid">
          <span className="tape"></span>
          <div className="ph">
            <div className="ph-label">— me + cat —</div>
          </div>
          <div className="caption">the team ✿</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <span>Pulsebound</span><span className="bee"></span>
        <span className="honey">a creature catcher</span><span className="bee"></span>
        <span>real-time ATB</span><span className="bee"></span>
        <span className="honey">hand-drawn</span><span className="bee"></span>
        <span>made with love</span><span className="bee"></span>
        <span className="honey">Ember Bee Studio</span><span className="bee"></span>
        <span>Pulsebound</span><span className="bee"></span>
      </div>

      {/* GAMES */}
      <section className="section">
        <div className="section-head">
          <div className="tag">on the workbench →</div>
          <h2>The games.</h2>
          <div className="meta">01 / 01 projects</div>
        </div>

        <div className="game-card">
          <div className="art-wrap">
            <span className="tape l"></span>
            <span className="tape r"></span>
            <div className="ph">
              <div className="ph-label">— pulsebound · key art —</div>
            </div>
            <div className="caption">draft 04 · spring '26</div>
            <span className="stamp">in development</span>
          </div>
          <div className="game-info">
            <h3 className="title">Pulse<em>bound</em>.</h3>
            <div className="sub">a creature-catching JRPG · real-time ATB</div>
            <p>A real-time ATB creature-catcher about timing, trust, and the music between turns. Slay-the-Spire economy, Chrono Trigger pacing, and a roster that grows by what they remember of you.</p>
            <p style={{color:'var(--ink-2)'}}>~48 catchable creatures, six biomes, every fight a little tempo puzzle.</p>
            <ul className="features">
              <li>real-time ATB</li>
              <li>creature catching</li>
              <li>roguelite runs</li>
              <li>hand-drawn pixel art</li>
              <li>solo-made</li>
              <li>PC · Mac</li>
            </ul>
            <button className="btn">wishlist on Steam →</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="section-head">
          <div className="tag">about the bee →</div>
          <h2>One person.<br/>One workbench.</h2>
          <div className="meta">solo since 2025</div>
        </div>

        <div className="about">
          <div className="col-l">
            <p className="quote">I make the games <span className="annotated">I wished existed</span> when I was eleven — generous little worlds with characters who remember.</p>
            <p className="bio">Design, code, pixel art, music, marketing, taxes, and snack-runs — all done from the same desk by the same person. Sometimes that means slower. Always means whole. The cat helps in spirit.</p>
            <div className="signature">— sam, founder &amp; everything-else</div>
          </div>
          <div className="stickers">
            <div className="sticker honey">
              <span className="pin"></span>
              <div className="h">currently</div>
              <p>Prototyping Pulsebound's battler. ATB clock prototype #14 (this time for real).</p>
            </div>
            <div className="sticker">
              <span className="pin"></span>
              <div className="h">stack</div>
              <p>Custom engine in C++ &amp; SDL · Aseprite for art · Reaper for tunes · Obsidian for design.</p>
            </div>
            <div className="sticker fog">
              <span className="pin"></span>
              <div className="h">stats.txt</div>
              <p>14 years of code · 1.2 fulltime · 3,221 cups of coffee · 1 cat (Marbles) · 1 alive plant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="section">
        <div className="section-head">
          <div className="tag">from the notebook →</div>
          <h2>Field notes &amp; devlog.</h2>
          <div className="meta">12 entries · rss ↗</div>
        </div>
        <div className="news">
          {[
            ['2026 · 05 · 09','How an ATB clock changed the whole game','pulsebound ✿'],
            ['2026 · 04 · 22','Animating 48 creatures alone, frame by frame','process'],
            ['2026 · 04 · 03','On generosity in roguelikes','essay'],
            ['2026 · 03 · 11','The first six months: what a solo studio costs','studio'],
            ['2026 · 02 · 18','Building a custom dialogue engine, from scratch','process'],
          ].map(([d, t, tg]) => (
            <div className="news-item" key={t}>
              <span className="date">{d}</span>
              <h3>{t}</h3>
              <span className="tag">↳ {tg}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact">
        <div className="section-head">
          <div className="tag">say hi →</div>
          <h2 style={{visibility:'hidden'}}>placeholder</h2>
          <div className="meta">replies within 48h</div>
        </div>
        <h2 className="big">come <span className="annotated">say hi</span> —<br/>I <em>read everything.</em></h2>
        <div className="row">
          <div className="col">
            <h4>email me</h4>
            <a href="#">hello@emberbee.studio</a>
            <a href="#">press@emberbee.studio</a>
          </div>
          <div className="col">
            <h4>find me around</h4>
            <a href="#">bluesky · @emberbee</a>
            <a href="#">youtube · /emberbee</a>
            <a href="#">github · /emberbee</a>
          </div>
          <div className="col">
            <h4>the field notes letter</h4>
            <p style={{color:'var(--ink-2)', marginBottom: 12}}>A short letter every fortnight — devlog highlights, no fluff.</p>
            <div style={{display:'flex', gap: 10, borderBottom:'1.5px dashed var(--ink)', paddingBottom: 6}}>
              <input placeholder="your@email" style={{flex:1, border:0, background:'transparent', fontFamily:'Caveat, cursive', fontSize: 22, color:'var(--ink)', outline:'none', padding: '4px 0'}}/>
              <button className="btn" style={{padding:'8px 14px', margin: 0, fontSize: 14}}>✿ join</button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>© Ember Bee Studio · 2026</span>
        <div className="right">
          <span>Berlin → World</span>
          <span>made by hand</span>
          <span>v0.4 · site</span>
        </div>
      </footer>
    </div>
  );
}

window.Direction3 = Direction3;
window.D3_W = D3_W; window.D3_H = D3_H;
