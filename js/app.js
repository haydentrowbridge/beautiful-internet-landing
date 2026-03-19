/* ================================================================
   Beautiful Internet v6 — Scroll-Driven Video Landing Page
   Main canvas: 360-spin
   Section panels: arch (right) + hand (left) — scroll-driven
   Lenis + GSAP + ScrollTrigger
   ================================================================ */

'use strict';

// ─── MAIN CANVAS — 360 spin ─────────────────────────────────────

const P1_COUNT  = 361;
const P1_SRC    = (i) => `frames-360/frame_${String(i).padStart(4,'0')}.jpg`;
const P1_END    = 0.60;

// Pedestal fly-up: 60–63% — must finish before O1 enters at 64%
const FLY_START = 0.60;
const FLY_END   = 0.63;

// ─── SECTION PANEL SEQUENCES ────────────────────────────────────

const P_ARCH_COUNT = 73;
const P_ARCH_SRC   = (i) => `frames-arch/frame_${String(i).padStart(4,'0')}.jpg`;

const P_HAND_COUNT = 73;
const P_HAND_SRC   = (i) => `frames-hand/frame_${String(i).padStart(4,'0')}.jpg`;

// Section A (arch right panel): 64–76% — mirrors s01
const SA_ENTER  = 0.64;
const SA_LEAVE  = 0.76;

// Section B (hand left panel): 80–90% — mirrors s02
const SB_ENTER  = 0.80;
const SB_LEAVE  = 0.90;

const PRELOAD_THRESHOLD = 30;
const IMAGE_SCALE  = 0.94;
const BG_FALLBACK  = '#080808';

// ─── DOM ────────────────────────────────────────────────────────
const $          = (id) => document.getElementById(id);
const loader     = $('loader');
const loaderBar  = $('loader-bar');
const loaderPct  = $('loader-percent');
const canvasWrap    = $('canvas-wrap');
const canvas        = $('canvas');
const ctx           = canvas.getContext('2d');
const scrollCont    = $('scroll-container');
const heroTextStack = $('hero-text-stack');
const sectionImgRight = $('section-img-right');
const sectionImgLeft  = $('section-img-left');

// ─── STATE ──────────────────────────────────────────────────────
const p1Frames   = new Array(P1_COUNT).fill(null);
const archFrames = new Array(P_ARCH_COUNT).fill(null);
const handFrames = new Array(P_HAND_COUNT).fill(null);

let currentFrame = 0;
let sampledBg    = BG_FALLBACK;

/* ================================================================
   CANVAS SETUP
   ================================================================ */

function setupCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const w   = window.innerWidth;
  const h   = window.innerHeight;
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* ================================================================
   PANEL CANVAS SETUP
   ================================================================ */

function setupPanelCanvas(panelCanvas) {
  const dpr = window.devicePixelRatio || 1;
  const w   = panelCanvas.offsetWidth;
  const h   = panelCanvas.offsetHeight;
  panelCanvas.width  = w * dpr;
  panelCanvas.height = h * dpr;
  panelCanvas.style.width  = w + 'px';
  panelCanvas.style.height = h + 'px';
  const pCtx = panelCanvas.getContext('2d');
  pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* ================================================================
   SAMPLE BACKGROUND COLOR
   ================================================================ */

function sampleBgColor(img) {
  try {
    const tmp = document.createElement('canvas');
    tmp.width = 4; tmp.height = 4;
    const t   = tmp.getContext('2d');
    t.drawImage(img, 0, 0, 4, 4);
    const d   = t.getImageData(0, 0, 1, 1).data;
    if (d[0] < 30 && d[1] < 30 && d[2] < 30) {
      sampledBg = `rgb(${d[0]},${d[1]},${d[2]})`;
    }
  } catch (e) {}
}

/* ================================================================
   DRAW — main canvas (cover mode)
   ================================================================ */

function drawFrame(index) {
  const img = p1Frames[index];
  if (!img) return;

  const cw    = window.innerWidth;
  const ch    = window.innerHeight;
  const iw    = img.naturalWidth;
  const ih    = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
  const dw    = iw * scale;
  const dh    = ih * scale;
  const dx    = (cw - dw) / 2;
  const dy    = (ch - dh) / 2;

  ctx.fillStyle = sampledBg;
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

/* ================================================================
   REMOVE BLACK BACKGROUND — process once on frame load
   Returns an offscreen canvas with black pixels made transparent
   ================================================================ */

function removeBlackBg(img) {
  const oc  = document.createElement('canvas');
  oc.width  = img.naturalWidth;
  oc.height = img.naturalHeight;
  const c   = oc.getContext('2d');
  c.drawImage(img, 0, 0);
  const d   = c.getImageData(0, 0, oc.width, oc.height);
  const px  = d.data;
  for (let i = 0; i < px.length; i += 4) {
    const brightness = Math.max(px[i], px[i + 1], px[i + 2]);
    if (brightness < 22) {
      px[i + 3] = 0;                                        // fully transparent
    } else if (brightness < 65) {
      px[i + 3] = Math.round((brightness - 22) / 43 * 255); // soft edge fade-in
    }
  }
  c.putImageData(d, 0, 0);
  return oc;
}

/* ================================================================
   DRAW — panel canvas (contain mode, transparent bg)
   ================================================================ */

function drawPanelFrame(panelCanvas, frames, index) {
  const frame = frames[index];
  if (!frame) return;

  const pCtx = panelCanvas.getContext('2d');
  const cw   = panelCanvas.offsetWidth;
  const ch   = panelCanvas.offsetHeight;
  const iw   = frame.width  || frame.naturalWidth;
  const ih   = frame.height || frame.naturalHeight;
  const scale = Math.min(cw / iw, ch / ih);
  const dw   = iw * scale;
  const dh   = ih * scale;
  const dx   = (cw - dw) / 2;
  const dy   = (ch - dh) / 2;

  pCtx.clearRect(0, 0, cw, ch);
  pCtx.drawImage(frame, dx, dy, dw, dh);
}

/* ================================================================
   PRELOADER
   ================================================================ */

function loadSequence(frames, count, srcFn, onProgress, process = false) {
  for (let i = 1; i <= count; i++) {
    const img = new Image();
    const idx = i - 1;
    img.onload  = () => {
      frames[idx] = process ? removeBlackBg(img) : img;
      onProgress && onProgress();
    };
    img.onerror = () => { onProgress && onProgress(); };
    img.src = srcFn(i);
  }
}

function preloadFrames() {
  return new Promise((resolve) => {
    let p1Done    = 0;
    let unblocked = false;
    let totalDone = 0;
    const TOTAL   = P1_COUNT + P_ARCH_COUNT + P_HAND_COUNT;

    const updateBar = () => {
      totalDone++;
      const pct = Math.round((totalDone / TOTAL) * 100);
      loaderBar.style.width  = pct + '%';
      loaderPct.textContent  = pct + '%';
    };

    // P1 — main canvas spin
    for (let i = 1; i <= P1_COUNT; i++) {
      const img = new Image();
      const idx = i - 1;
      img.onload = () => {
        p1Frames[idx] = img;
        if (idx === 0) { sampleBgColor(img); drawFrame(0); }
        if (idx % 30 === 0) sampleBgColor(img);
        p1Done++;
        updateBar();
        if (!unblocked && p1Done >= PRELOAD_THRESHOLD) {
          unblocked = true;
          resolve();
        }
      };
      img.onerror = () => {
        p1Done++;
        updateBar();
        if (!unblocked && p1Done >= PRELOAD_THRESHOLD) {
          unblocked = true;
          resolve();
        }
      };
      img.src = P1_SRC(i);
    }

    // Arch + hand load in parallel immediately, with black bg removed
    loadSequence(archFrames, P_ARCH_COUNT, P_ARCH_SRC, updateBar, true);
    loadSequence(handFrames, P_HAND_COUNT, P_HAND_SRC, updateBar, true);
  });
}

/* ================================================================
   POSITION SECTIONS
   ================================================================ */

function positionSections() {
  // Sections are position:fixed — they stay centered in viewport.
  // Scroll progress controls opacity only; no positional offset needed.
}

/* ================================================================
   MAIN CANVAS FRAME ANIMATION (360 spin)
   ================================================================ */

function initFrameAnimation() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      let frameIndex;

      if (p <= P1_END) {
        const t = p / P1_END;
        frameIndex = Math.min(Math.floor(t * P1_COUNT), P1_COUNT - 1);
      } else {
        frameIndex = P1_COUNT - 1;
      }

      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }
    }
  });
}

/* ================================================================
   PEDESTAL FLY-UP
   ================================================================ */

function initPedestalFlyUp() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;

      if (p <= FLY_START) {
        canvasWrap.style.transform    = 'translateY(0)';
        heroTextStack.style.transform = 'translateY(0)';
      } else if (p <= FLY_END) {
        const t    = (p - FLY_START) / (FLY_END - FLY_START);
        const ease = t * t * (3 - 2 * t);
        canvasWrap.style.transform    = `translateY(${-ease * 110}vh)`;
        heroTextStack.style.transform = `translateY(${-ease * 110}vh)`;
      } else {
        canvasWrap.style.transform    = 'translateY(-110vh)';
        heroTextStack.style.transform = 'translateY(-110vh)';
      }
    }
  });
}

/* ================================================================
   PANEL CANVAS ANIMATIONS (arch right + hand left)
   ================================================================ */

function initPanelAnimations() {
  const archCanvas = $('arch-panel-canvas');
  const handCanvas = $('hand-panel-canvas');

  setupPanelCanvas(archCanvas);
  setupPanelCanvas(handCanvas);

  let lastArchFrame = -1;
  let lastHandFrame = -1;

  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;

      // ── Arch (right panel) — SA range ──
      if (p >= SA_ENTER - 0.015 && p <= SA_LEAVE + 0.015) {
        const raw = p < SA_ENTER
          ? (p - (SA_ENTER - 0.015)) / 0.015
          : p > SA_LEAVE
            ? 1 - (p - SA_LEAVE) / 0.015
            : 1;
        sectionImgRight.style.opacity = Math.max(0, Math.min(1, raw));

        const t = Math.max(0, Math.min(1, (p - SA_ENTER) / (SA_LEAVE - SA_ENTER)));
        const fi = Math.min(Math.floor(t * P_ARCH_COUNT), P_ARCH_COUNT - 1);
        if (fi !== lastArchFrame) {
          lastArchFrame = fi;
          requestAnimationFrame(() => drawPanelFrame(archCanvas, archFrames, fi));
        }
      } else {
        sectionImgRight.style.opacity = '0';
      }

      // ── Hand (left panel) — SB range ──
      if (p >= SB_ENTER - 0.015 && p <= SB_LEAVE + 0.015) {
        const raw = p < SB_ENTER
          ? (p - (SB_ENTER - 0.015)) / 0.015
          : p > SB_LEAVE
            ? 1 - (p - SB_LEAVE) / 0.015
            : 1;
        sectionImgLeft.style.opacity = Math.max(0, Math.min(1, raw));

        const t = Math.max(0, Math.min(1, (p - SB_ENTER) / (SB_LEAVE - SB_ENTER)));
        const fi = Math.min(Math.floor(t * P_HAND_COUNT), P_HAND_COUNT - 1);
        if (fi !== lastHandFrame) {
          lastHandFrame = fi;
          requestAnimationFrame(() => drawPanelFrame(handCanvas, handFrames, fi));
        }
      } else {
        sectionImgLeft.style.opacity = '0';
      }
    }
  });
}

/* ================================================================
   SECTION ANIMATIONS
   ================================================================ */

function buildTimeline(section) {
  const type     = section.dataset.animation;
  const children = [
    ...section.querySelectorAll(
      '.section-label, .tagline-hero, .section-heading, .section-body, ' +
      '.section-note, .section-quote, .section-cite, ' +
      '.framework-item, .stat, .cta-button, .cta-wordmark, ' +
      '.stone-caption, .content-eyebrow, .content-text-inner, .section-sub'
    )
  ];

  const tl = gsap.timeline({ paused: true });

  switch (type) {
    case 'slide-left':
      tl.from(children, { x: -40, opacity: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' });
      break;
    case 'slide-right':
      tl.from(children, { x: 40, opacity: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' });
      break;
    case 'fade-up':
      tl.from(children, { y: 30, opacity: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' });
      break;
    case 'fade-center':
      tl.from(children, { opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' });
      break;
    case 'scale-up':
      tl.from(children, { scale: 0.92, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out' });
      break;
    default:
      tl.from(children, { opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out' });
  }

  return tl;
}

function initSectionAnimations() {
  const sections  = [...document.querySelectorAll('.scroll-section')];
  const timelines = new Map();
  const states    = new Map();

  sections.forEach((s) => {
    timelines.set(s, buildTimeline(s));
    states.set(s, { shown: false, animated: false });
  });

  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: false,
    onUpdate: (self) => {
      const p = self.progress;

      sections.forEach((section) => {
        const enter   = parseFloat(section.dataset.enter) / 100;
        const leave   = parseFloat(section.dataset.leave) / 100;
        const persist = section.dataset.persist === 'true';
        const state   = states.get(section);
        const tl      = timelines.get(section);
        const inRange = p >= enter && p <= leave;
        const before  = p < enter;
        const past    = p > leave;

        if (inRange && !state.shown) {
          gsap.to(section, { opacity: 1, duration: 0.6, ease: 'power2.out', overwrite: true });
          section.classList.add('active');
          state.shown = true;
          if (!state.animated) { tl.play(0); state.animated = true; }
        }

        if (!persist && past && state.shown) {
          gsap.to(section, { opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: true });
          section.classList.remove('active');
          state.shown = false;
        }

        if (before && state.shown) {
          gsap.to(section, { opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: true });
          section.classList.remove('active');
          state.shown    = false;
          state.animated = false;
          tl.pause(0);
        }
      });
    }
  });
}

/* ================================================================
   RESIZE
   ================================================================ */

function handleResize() {
  setupCanvas();
  setupPanelCanvas($('arch-panel-canvas'));
  setupPanelCanvas($('hand-panel-canvas'));
  positionSections();
  drawFrame(currentFrame);
  ScrollTrigger.refresh();
}

/* ================================================================
   INIT
   ================================================================ */

async function init() {
  gsap.registerPlugin(ScrollTrigger);
  setupCanvas();

  await preloadFrames();
  await new Promise((r) => setTimeout(r, 300));

  loader.classList.add('hidden');

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  positionSections();
  drawFrame(0);

  initFrameAnimation();
  initPedestalFlyUp();
  initPanelAnimations();
  initSectionAnimations();

  window.addEventListener('resize', handleResize);

  // Hide header during hero scroll section, show after
  const siteHeader = document.getElementById('site-header');
  if (siteHeader && scrollCont) {
    siteHeader.classList.add('header-hidden');
    ScrollTrigger.create({
      trigger: scrollCont,
      start: 'bottom top',
      onEnter: () => siteHeader.classList.remove('header-hidden'),
      onLeaveBack: () => siteHeader.classList.add('header-hidden'),
    });
  }
}

init();
