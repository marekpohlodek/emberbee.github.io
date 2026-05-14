/* ==========================================================================
   Ember Bee Studio — site.js
   Custom cursor, magnetic CTAs, scramble, reveal-on-scroll, marquee duplication,
   sticky-nav compact state, mobile menu.
   ========================================================================== */

(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Custom cursor ----------
     Lightweight: a single small dot tracking the pointer 1:1 (no easing /
     no rAF lerp — the laggy "weight" was that lerp). Hover state expands a
     soft halo around the same anchor point. Position is committed inside the
     pointermove handler with a single transform write per event. */
  function initCursor() {
    if (!isFinePointer || prefersReduced) return;
    document.documentElement.classList.add('has-cursor');

    const dot   = document.createElement('div'); dot.className = 'cursor-dot';
    const label = document.createElement('div'); label.className = 'cursor-label';
    document.body.append(dot, label);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    // Initial off-screen until first move
    dot.style.opacity = 0;

    window.addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      // No smoothing — the dot is exactly under the pointer.
      dot.style.transform   = `translate3d(${mx}px, ${my}px, 0)`;
      label.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (dot.style.opacity === '0') dot.style.opacity = 1;
    }, { passive: true });

    // Hover state classes
    const setHover = (on) => dot.classList.toggle('hover', on);
    const setText  = (on) => dot.classList.toggle('text', on);

    document.addEventListener('mouseover', (e) => {
      const t = e.target;
      if (t.closest('[data-cursor-label]')) {
        label.textContent = t.closest('[data-cursor-label]').dataset.cursorLabel;
        label.classList.add('visible');
        setHover(true);
      } else if (t.closest('a, button, [role="button"], .game-card, .news-item, .marquee')) {
        setHover(true);
      } else if (t.matches('input, textarea, p, h1, h2, h3, h4, h5, h6, li, code')) {
        setText(true);
      }
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target;
      if (t.closest('[data-cursor-label]')) {
        label.classList.remove('visible');
        setHover(false);
      } else if (t.closest('a, button, [role="button"], .game-card, .news-item, .marquee')) {
        setHover(false);
      } else if (t.matches('input, textarea, p, h1, h2, h3, h4, h5, h6, li, code')) {
        setText(false);
      }
    });

    document.addEventListener('mouseleave', () => { dot.style.opacity = 0; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = 1; });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!isFinePointer || prefersReduced) return;
    $$('[data-mag]').forEach((el) => {
      const strengthX = parseFloat(el.dataset.magX || '0.22');
      const strengthY = parseFloat(el.dataset.magY || '0.30');
      const box = () => el.getBoundingClientRect();
      let raf = 0;
      el.addEventListener('pointermove', (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = box();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${x * strengthX}px, ${y * strengthY}px)`;
        });
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ---------- Scramble effect ---------- */
  const SCRAMBLE_CHARS = '0123456789ABCDEF!@#$%&*<>/\\';

  function scrambleEl(el, opts = {}) {
    const text = el.dataset.text || el.textContent;
    el.dataset.text = text;
    const speed = opts.speed || 35;
    const step  = opts.step  || 0.55;
    let i = 0;
    if (el._scrambleTimer) clearInterval(el._scrambleTimer);
    el._scrambleTimer = setInterval(() => {
      const out = text.split('').map((c, idx) => {
        if (idx < Math.floor(i)) return c;
        if (c === ' ' || c === '·' || c === '—' || c === '/') return c;
        return SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }).join('');
      el.textContent = out;
      i += step;
      if (i >= text.length) {
        clearInterval(el._scrambleTimer);
        el.textContent = text;
      }
    }, speed);
  }

  function initScramble() {
    $$('[data-scramble]').forEach((el) => {
      // hover trigger
      el.addEventListener('pointerenter', () => scrambleEl(el));
      // also run once on first scroll into view
    });
    // On-load scramble for [data-scramble-once]
    $$('[data-scramble-once]').forEach((el) => {
      const text = el.textContent;
      el.dataset.text = text;
      // small delay so user notices
      setTimeout(() => scrambleEl(el, { speed: 32, step: 0.7 }), 350);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    if (prefersReduced) {
      $$('.reveal, .reveal-stagger, .split-word').forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    $$('.reveal, .reveal-stagger, .split-word').forEach(el => io.observe(el));
  }

  /* ---------- Split words for headline reveal ---------- */
  function initSplitWords() {
    $$('[data-split]').forEach((el) => {
      const text = el.textContent;
      el.textContent = '';
      const tokens = text.split(/(\s+)/);
      tokens.forEach((tok) => {
        if (/^\s+$/.test(tok)) {
          el.appendChild(document.createTextNode(' '));
        } else {
          const span = document.createElement('span');
          span.className = 'split-word';
          const inner = document.createElement('span');
          inner.className = 'inner';
          inner.textContent = tok;
          span.appendChild(inner);
          el.appendChild(span);
        }
      });
    });
  }

  /* ---------- Sticky nav compact state ---------- */
  function initStickyNav() {
    const nav = $('.site-header');
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle('compact', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const btn = $('.menu-btn');
    const header = $('.site-header');
    if (!btn || !header) return;
    btn.addEventListener('click', () => {
      const open = header.dataset.menu === 'open';
      header.dataset.menu = open ? 'closed' : 'open';
      btn.setAttribute('aria-expanded', String(!open));
    });
    // close on link click
    $$('.menu-panel a').forEach((a) => a.addEventListener('click', () => {
      header.dataset.menu = 'closed';
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Marquee ----------
     JS-driven scroll. Hover no longer pauses it. Click-and-drag lets the
     user flick the strip; a strong flick lights it up ("fiery" easter egg)
     while velocity remains well above the base drift. */
  function initMarquee() {
    $$('.marquee').forEach((m) => {
      const track = m.querySelector('.marquee-track');
      if (!track || track.dataset.init) return;
      track.dataset.init = '1';

      // Duplicate inner HTML enough times to span >2× viewport width.
      const original = track.innerHTML;
      let html = original;
      while (m.clientWidth > 0 && track.scrollWidth < m.clientWidth * 2.4) {
        html += original;
        track.innerHTML = html;
      }
      if (track.children.length < 4) track.innerHTML = original + original;

      if (prefersReduced) return; // skip motion entirely

      const BASE_SPEED = -60;          // px/s baseline drift (negative = leftward)
      const FIERY_ON   = Math.abs(BASE_SPEED) * 4.5;
      const FIERY_OFF  = Math.abs(BASE_SPEED) * 2.0;
      const RETURN_RATE = 0.9;         // how quickly velocity eases back to base (per second)
      const MAX_FLING  = 4200;         // cap fling velocity

      let x = 0;
      let vx = BASE_SPEED;
      let halfWidth = track.scrollWidth / 2;
      const recalc = () => { halfWidth = track.scrollWidth / 2; };
      window.addEventListener('resize', recalc);

      // Drag state
      let dragging = false;
      let dragId = -1;
      let lastDragX = 0;
      let lastDragTime = 0;
      let dragStartX = 0;
      let dragVelocity = 0;     // smoothed instantaneous velocity during drag

      let last = performance.now();
      function tick(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;

        if (!dragging) {
          // Exponential ease back to BASE_SPEED
          const k = 1 - Math.exp(-RETURN_RATE * dt);
          vx += (BASE_SPEED - vx) * k;
          x  += vx * dt;
        }

        // Wrap by halfWidth so the duplicated half re-enters seamlessly
        if (halfWidth > 0) {
          while (x <= -halfWidth) x += halfWidth;
          while (x > 0)           x -= halfWidth;
        }
        track.style.transform = `translate3d(${x}px, 0, 0)`;

        // Fiery state — hysteresis around base speed
        const speed = Math.abs(vx);
        if (!m.classList.contains('fiery') && speed > FIERY_ON) {
          m.classList.add('fiery');
        } else if (m.classList.contains('fiery') && speed < FIERY_OFF) {
          m.classList.remove('fiery');
        }

        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      // ---- Drag / flick ----
      m.addEventListener('pointerdown', (e) => {
        // Ignore right/middle clicks
        if (e.button !== undefined && e.button !== 0) return;
        dragging = true;
        dragId = e.pointerId;
        try { m.setPointerCapture(e.pointerId); } catch (_) {}
        dragStartX = lastDragX = e.clientX;
        lastDragTime = performance.now();
        dragVelocity = 0;
        vx = 0;
      });
      m.addEventListener('pointermove', (e) => {
        if (!dragging || e.pointerId !== dragId) return;
        const now = performance.now();
        const dx = e.clientX - lastDragX;
        const dt = (now - lastDragTime) / 1000;
        if (dt > 0) {
          // Smoothed velocity — weighted blend so a brief stutter doesn't kill the fling.
          dragVelocity = dragVelocity * 0.35 + (dx / dt) * 0.65;
        }
        x += dx;
        lastDragX = e.clientX;
        lastDragTime = now;
      });
      function endDrag(e) {
        if (!dragging || (e.pointerId !== undefined && e.pointerId !== dragId)) return;
        dragging = false;
        try { m.releasePointerCapture(dragId); } catch (_) {}
        const totalDx = e.clientX - dragStartX;
        // Significant flick: large velocity AND user actually moved a bit.
        if (Math.abs(dragVelocity) > 250 && Math.abs(totalDx) > 6) {
          vx = Math.max(-MAX_FLING, Math.min(MAX_FLING, dragVelocity));
        } else {
          vx = BASE_SPEED;
        }
        dragVelocity = 0;
      }
      m.addEventListener('pointerup', endDrag);
      m.addEventListener('pointercancel', endDrag);
      // Block link/image drag inside the strip
      m.addEventListener('dragstart', (e) => e.preventDefault());
    });
  }

  /* ---------- Live clock ---------- */
  function initClock() {
    const el = $('[data-clock]');
    if (!el) return;
    const tz = el.dataset.tz || 'Europe/Berlin';
    const tick = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
      el.textContent = fmt.format(d) + ' ' + (el.dataset.label || 'BLN');
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Smooth anchor scroll w/ nav offset ---------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length < 2) return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    initSplitWords();
    initReveal();
    initStickyNav();
    initMenu();
    initMarquee();
    initClock();
    initAnchors();
    initMagnetic();
    initScramble();
    initCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Marquees handle their own resize recalc internally now.
})();
