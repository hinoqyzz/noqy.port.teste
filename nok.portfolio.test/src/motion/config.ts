/**
 * Central motion configuration — single source of truth for all animation tokens.
 *
 * INTENSITY adjusts overall animation strength. 1.0 = default, 1.5 = stronger.
 * Tune this to match the upcoming design direction.
 */
export const INTENSITY = 1.35

// ───────────────────────────────────────────────────────────────────
// Durations (seconds)
// ───────────────────────────────────────────────────────────────────
export const DURATION = {
  intro: {
    hold: 0.45 * INTENSITY,
    wipe: 0.68 * INTENSITY,
  },
  hero: {
    rule: 0.6 * INTENSITY,
    kicker: 0.45 * INTENSITY,
    title: 0.95 * INTENSITY,
    photo: 1.05 * INTENSITY,
    meta: 0.5 * INTENSITY,
  },
  reveal: {
    mask: 0.95 * INTENSITY,
    line: 0.85 * INTENSITY,
    image: 1.1 * INTENSITY,
  },
  header: 0.6 * INTENSITY,
  overlay: 0.5 * INTENSITY,
  veil: {
    cover: 0.48 * INTENSITY,
    reveal: 0.55 * INTENSITY,
    edge: 0.35 * INTENSITY,
    mark: 0.38 * INTENSITY,
  },
  reduced: {
    fade: 0.35,
    short: 0.25,
  },
} as const

// ───────────────────────────────────────────────────────────────────
// Easings
// ───────────────────────────────────────────────────────────────────
export const EASE = {
  out: 'power4.out',
  inOut: 'power3.inOut',
  reveal: 'power4.out',
  smooth: 'power2.inOut',
  parallax: 'none',
  reduced: 'power2.out',
} as const

// ───────────────────────────────────────────────────────────────────
// Distances & Transforms (percentages/pixels)
// ───────────────────────────────────────────────────────────────────
export const DISTANCE = {
  maskSlide: 115,
  kickerSlide: 14,
  metaSlide: 18,
  headerSlide: 115,
  overlaySlide: 40,
  parallax: {
    desktop: 10,
    mobile: 5,
  },
  imageReveal: {
    desktop: 14,
    mobile: 8,
  },
} as const

// ───────────────────────────────────────────────────────────────────
// Staggers (seconds)
// ───────────────────────────────────────────────────────────────────
export const STAGGER = {
  word: 0.05 * INTENSITY,
  line: 0.08 * INTENSITY,
  kicker: 0.055 * INTENSITY,
  meta: 0.07 * INTENSITY,
  overlay: 0.055 * INTENSITY,
} as const

// ───────────────────────────────────────────────────────────────────
// Scrub & Lenis
// ───────────────────────────────────────────────────────────────────
export const SCROLL = {
  scrub: 0.7,
  lenis: {
    lerp: 0.12,
    wheelMultiplier: 0.95,
  },
} as const

// ───────────────────────────────────────────────────────────────────
// Breakpoints & Media Queries
// ───────────────────────────────────────────────────────────────────
export const BREAKPOINT = {
  desktop: 901,
  mobile: 760,
} as const

export const MEDIA = {
  desktop: `(min-width: ${BREAKPOINT.desktop}px)`,
  mobile: `(max-width: ${BREAKPOINT.mobile}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  noReducedMotion: '(prefers-reduced-motion: no-preference)',
  finePointer: '(pointer: fine)',
} as const

// Combined queries for GSAP matchMedia
export const PROFILE = {
  desktop: `${MEDIA.desktop} and ${MEDIA.noReducedMotion}`,
  mobile: `(max-width: ${BREAKPOINT.desktop - 1}px) and ${MEDIA.noReducedMotion}`,
  reduced: MEDIA.reducedMotion,
  all: 'all',
} as const

// ───────────────────────────────────────────────────────────────────
// ScrollTrigger Defaults
// ───────────────────────────────────────────────────────────────────
export const TRIGGER = {
  reveal: {
    start: 'top 86%',
    toggleActions: 'play none none none',
  },
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: SCROLL.scrub,
    invalidateOnRefresh: true,
  },
  progress: {
    start: 0,
    end: 'max',
  },
} as const

// ───────────────────────────────────────────────────────────────────
// Hero-specific Offsets (for timeline positioning)
// ───────────────────────────────────────────────────────────────────
export const HERO_OFFSET = {
  rule: DURATION.intro.hold + 0.05,
  kicker: DURATION.intro.hold + 0.14,
  adryan: DURATION.intro.hold + 0.24,
  miguel: DURATION.intro.hold + 0.42,
  photo: DURATION.intro.hold + 0.52,
  meta: DURATION.intro.hold + 0.9,
} as const
