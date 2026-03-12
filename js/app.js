/* ================================================================
   Beautiful Internet v4 — Scroll-Driven Video Landing Page
   Lenis + GSAP + ScrollTrigger
   ================================================================ */

'use strict';

// ─── CONSTANTS ─────────────────────────────────────────────────

// Phase 2: 360 spin (361 frames)
const P2_COUNT  = 361;
const P2_SRC    = (i) => `frames-360/frame_${String(i).padStart(4,'0')}.jpg`;

const TOTAL_FRAMES = P2_COUNT;

// Section canvases: like.mp4 (right) + phone.mp4 (left) — 121 frames each
const LIKE_COUNT  = 121;
const PHONE_COUNT = 121;
const LIKE_SRC    = (i) => `frames-like/frame_${String(i).padStart(4,'0')}.jpg`;
const PHONE_SRC   = (i) => `frames-phone/frame_${String(i).padStart(4,'0')}.jpg`;

// Scroll allocation: 360 spin occupies 0–65%
const P2_START  = 0.00;
const P2_END    = 0.65;

// Pedestal fly-up: 65–68%
const FLY_START = 0.65;
const FLY_END   = 0.68;

// Section A (like frames, right): 68–79% — mirrors s01
const SA_ENTER  = 0.68;
const SA_LEAVE  = 0.79;

// Section B (phone frames, left): 81–91% — mirrors s02
const SB_ENTER  = 0.81;
const SB_LEAVE  = 0.91;

// Hero text reveal keypoints (within 0–65% spin range)
const ETERNAL_IN_START   = 0.04;
const ETERNAL_IN_END     = 0.10;
const MODERN_IN_START    = 0.28;
const MODERN_IN_END      = 0.34;
const BEAUTIFUL_IN_START = 0.52;
const BEAUTIFUL_IN_END   = 0.58;

// Stack fades out near end
const TL_FADE_START = 0.88;
const TL_FADE_END   = 0.95;

// Number of frames to load before unblocking the loader
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
const darkOverlay   = $('dark-overlay');
const scrollCont    = $('scroll-container');
const heroTextStack = $('hero-text-stack');
const tlEternal     = $('tl-eternal');
const tlModern      = $('tl-modern');
const tlBeautiful   = $('tl-beautiful');

// Section canvases
const canvasLike  = $('canvas-like');
const ctxLike     = canvasLike.getContext('2d');
const canvasPhone = $('canvas-phone');
const ctxPhone    = canvasPhone.getContext('2d');

// ─── STATE ──────────────────────────────────────────────────────
const p2Frames    = new Array(P2_COUNT).fill(null);
const likeFrames  = new Array(LIKE_COUNT).fill(null);
const phoneFrames = new Array(PHONE_COUNT).fill(null);

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

function setupSectionCanvases() {
  const dpr     = window.devicePixelRatio || 1;
  const mobile  = window.innerWidth <= 768;
  const w       = mobile ? window.innerWidth : Math.round(window.innerWidth / 2);
  const h       = window.innerHeight;

  canvasLike.width  = w * dpr;
  canvasLike.height = h * dpr;
  canvasLike.style.width  = w + 'px';
  canvasLike.style.height = h + 'px';
  ctxLike.setTransform(dpr, 0, 0, dpr, 0, 0);

  canvasPhone.width  = w * dpr;
  canvasPhone.height = h * dpr;
  canvasPhone.style.width  = w + 'px';
  canvasPhone.style.height = h + 'px';
  ctxPhone.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* ================================================================
   SAMPLE BACKGROUND COLOR
   ================================================================ */

function sampleBgColor(img) {
  try {
    const tmp   = document.createElement('canvas');
    tmp.width   = 4; tmp.height = 4;
    const t     = tmp.getContext('2d');
    t.drawImage(img, 0, 0, 4, 4);
    const d     = t.getImageData(0, 0, 1, 1).data;
    if (d[0] < 30 && d[1] < 30 && d[2] < 30) {
      sampledBg = `rgb(${d[0]},${d[1]},${d[2]})`;
    }
  } catch (e) { /* cross-origin safety */ }
}

/* ================================================================
   DRAW FRAME — cover mode with IMAGE_SCALE padding
   ================================================================ */

function drawFrame(index) {
  const img = p2Frames[index];
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

function drawLikeFrame(index) {
  const img = likeFrames[index];
  if (!img) return;

  const cw    = window.innerWidth <= 768 ? window.innerWidth : Math.round(window.innerWidth / 2);
  const ch    = window.innerHeight;
  const iw    = img.naturalWidth;
  const ih    = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
  const dw    = iw * scale;
  const dh    = ih * scale;
  const dx    = (cw - dw) / 2;
  const dy    = (ch - dh) / 2;

  ctxLike.fillStyle = sampledBg;
  ctxLike.fillRect(0, 0, cw, ch);
  ctxLike.drawImage(img, dx, dy, dw, dh);
}

function drawPhoneFrame(index) {
  const img = phoneFrames[index];
  if (!img) return;

  const cw    = window.innerWidth <= 768 ? window.innerWidth : Math.round(window.innerWidth / 2);
  const ch    = window.innerHeight;
  const iw    = img.naturalWidth;
  const ih    = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
  const dw    = iw * scale;
  const dh    = ih * scale;
  const dx    = (cw - dw) / 2;
  const dy    = (ch - dh) / 2;

  ctxPhone.fillStyle = sampledBg;
  ctxPhone.fillRect(0, 0, cw, ch);
  ctxPhone.drawImage(img, dx, dy, dw, dh);
}

/* ================================================================
   PRELOADER — load 360 frames, unblock after PRELOAD_THRESHOLD
   ================================================================ */

function preloadFrames() {
  return new Promise((resolve) => {
    let done         = 0;
    let unblocked    = false;

    for (let i = 1; i <= P2_COUNT; i++) {
      const img = new Image();
      const idx = i - 1;
      img.onload = () => {
        p2Frames[idx] = img;
        if (idx === 0) { sampleBgColor(img); drawFrame(0); }
        if (idx % 30 === 0) sampleBgColor(img);
        done++;
        const pct = Math.round((done / TOTAL_FRAMES) * 100);
        loaderBar.style.width   = pct + '%';
        loaderPct.textContent   = pct + '%';
        if (!unblocked && done >= PRELOAD_THRESHOLD) {
          unblocked = true;
          resolve();
        }
      };
      img.onerror = () => {
        done++;
        if (!unblocked && done >= PRELOAD_THRESHOLD) {
          unblocked = true;
          resolve();
        }
      };
      img.src = P2_SRC(i);
    }
  });
}

/* Non-blocking background preloads for section canvases */
function preloadLikeFrames() {
  for (let i = 1; i <= LIKE_COUNT; i++) {
    const img = new Image();
    const idx = i - 1;
    img.onload = () => { likeFrames[idx] = img; };
    img.src = LIKE_SRC(i);
  }
}

function preloadPhoneFrames() {
  for (let i = 1; i <= PHONE_COUNT; i++) {
    const img = new Image();
    const idx = i - 1;
    img.onload = () => { phoneFrames[idx] = img; };
    img.src = PHONE_SRC(i);
  }
}

/* ================================================================
   POSITION SECTIONS — absolute within scroll-container
   ================================================================ */

function positionSections() {
  const containerH = scrollCont.offsetHeight;
  const viewH      = window.innerHeight;

  document.querySelectorAll('.scroll-section').forEach((section) => {
    const enter = parseFloat(section.dataset.enter) / 100;
    const leave = parseFloat(section.dataset.leave) / 100;
    const mid   = (enter + leave) / 2;
    section.style.top = (mid * containerH - viewH / 2) + 'px';
  });
}

/* ================================================================
   FRAME ANIMATION — maps scroll progress → frame index
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

      if (p <= P2_END) {
        const t = p / P2_END;
        frameIndex = Math.min(Math.floor(t * P2_COUNT), P2_COUNT - 1);
      } else {
        frameIndex = P2_COUNT - 1;
      }

      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }
    }
  });
}

/* ================================================================
   PEDESTAL FLY-UP — canvas + taglines slide up off screen
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
        const t = (p - FLY_START) / (FLY_END - FLY_START);
        // Smoothstep ease
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
   SECTION CANVAS ANIMATIONS — frame-image scroll-scrub
   ================================================================ */

function initSectionCanvases() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;

      // ── canvas-like (right, like frames — s01 range) ──
      if (p >= SA_ENTER - 0.015 && p <= SA_LEAVE + 0.015) {
        const clampedP = Math.max(0, Math.min(1, (p - SA_ENTER) / (SA_LEAVE - SA_ENTER)));
        const rawOpacity = p < SA_ENTER
          ? (p - (SA_ENTER - 0.015)) / 0.015
          : p > SA_LEAVE
            ? 1 - (p - SA_LEAVE) / 0.015
            : 1;
        canvasLike.style.opacity = Math.max(0, Math.min(1, rawOpacity));

        const idx = Math.min(Math.floor(clampedP * LIKE_COUNT), LIKE_COUNT - 1);
        requestAnimationFrame(() => drawLikeFrame(idx));
      } else {
        canvasLike.style.opacity = '0';
      }

      // ── canvas-phone (left, phone frames — s02 range) ──
      if (p >= SB_ENTER - 0.015 && p <= SB_LEAVE + 0.015) {
        const clampedP = Math.max(0, Math.min(1, (p - SB_ENTER) / (SB_LEAVE - SB_ENTER)));
        const rawOpacity = p < SB_ENTER
          ? (p - (SB_ENTER - 0.015)) / 0.015
          : p > SB_LEAVE
            ? 1 - (p - SB_LEAVE) / 0.015
            : 1;
        canvasPhone.style.opacity = Math.max(0, Math.min(1, rawOpacity));

        const idx = Math.min(Math.floor(clampedP * PHONE_COUNT), PHONE_COUNT - 1);
        requestAnimationFrame(() => drawPhoneFrame(idx));
      } else {
        canvasPhone.style.opacity = '0';
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
    case 'scale-up':
      tl.from(children, {
        scale: 0.92, opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: 'power2.out'
      });
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

        if (!persist && before && state.shown) {
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
   HERO TEXT STACK — staggered scroll-reveal + fade-out near end
   ================================================================ */

function lerp01(p, start, end) {
  if (p <= start) return 0;
  if (p >= end)   return 1;
  return (p - start) / (end - start);
}

function initHeroTextReveal() {
  if (!heroTextStack) return;

  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;

      // Global fade-out near end
      const fadeOut = p >= TL_FADE_START
        ? Math.max(0, 1 - (p - TL_FADE_START) / (TL_FADE_END - TL_FADE_START))
        : 1;

      tlEternal.style.opacity   = lerp01(p, ETERNAL_IN_START,   ETERNAL_IN_END)   * fadeOut;
      tlModern.style.opacity    = lerp01(p, MODERN_IN_START,    MODERN_IN_END)    * fadeOut;
      tlBeautiful.style.opacity = lerp01(p, BEAUTIFUL_IN_START, BEAUTIFUL_IN_END) * fadeOut;
    }
  });
}

/* ================================================================
   RESIZE
   ================================================================ */

function handleResize() {
  setupCanvas();
  setupSectionCanvases();
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
  setupSectionCanvases();

  // Wait until first batch of frames loaded
  await preloadFrames();

  // Brief pause so loader is readable
  await new Promise((r) => setTimeout(r, 300));

  // Hide loader
  loader.classList.add('hidden');

  // Start loading section canvas frames in background (non-blocking)
  preloadLikeFrames();
  preloadPhoneFrames();

  // Lenis smooth scroll
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
  initHeroTextReveal();
  initSectionCanvases();
  initSectionAnimations();

  window.addEventListener('resize', handleResize);
}

init();
