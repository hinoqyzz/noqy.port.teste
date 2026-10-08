import { useEffect, useSyncExternalStore, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MEDIA } from './config'

gsap.registerPlugin(ScrollTrigger)

// ───────────────────────────────────────────────────────────────────
// Motion State Store
// ───────────────────────────────────────────────────────────────────

type MotionProfile = 'desktop' | 'mobile' | 'reduced'

interface MotionState {
  profile: MotionProfile
  isReduced: boolean
  isDesktop: boolean
  isMobile: boolean
  isReady: boolean
}

let state: MotionState = {
  profile: 'desktop',
  isReduced: false,
  isDesktop: true,
  isMobile: false,
  isReady: false,
}

const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((fn) => fn())
}

function updateState(partial: Partial<MotionState>) {
  state = { ...state, ...partial }
  notifyListeners()
}

function computeProfile(): MotionProfile {
  if (typeof window === 'undefined') return 'desktop'
  const reduced = window.matchMedia(MEDIA.reducedMotion).matches
  if (reduced) return 'reduced'
  const desktop = window.matchMedia(MEDIA.desktop).matches
  return desktop ? 'desktop' : 'mobile'
}

function syncProfileState() {
  const profile = computeProfile()
  const isReduced = profile === 'reduced'
  const isDesktop = profile === 'desktop'
  const isMobile = profile === 'mobile'

  document.documentElement.classList.toggle('reduced-motion', isReduced)
  document.documentElement.classList.toggle('is-desktop', isDesktop)
  document.documentElement.classList.toggle('is-mobile', isMobile)

  updateState({ profile, isReduced, isDesktop, isMobile })
}

// ───────────────────────────────────────────────────────────────────
// Boot & Readiness
// ───────────────────────────────────────────────────────────────────

let booted = false
const READY_TIMEOUT = 150
const SAFETY_TIMEOUT = 3000

function bootMotion() {
  if (booted || typeof window === 'undefined') return
  booted = true

  syncProfileState()

  const reducedQuery = window.matchMedia(MEDIA.reducedMotion)
  const desktopQuery = window.matchMedia(MEDIA.desktop)

  const onChange = () => syncProfileState()
  reducedQuery.addEventListener('change', onChange)
  desktopQuery.addEventListener('change', onChange)

  requestAnimationFrame(() => {
    setTimeout(() => {
      document.documentElement.classList.add('motion-ready')
      document.documentElement.classList.remove('is-booting')
      updateState({ isReady: true })
    }, READY_TIMEOUT)
  })

  setTimeout(() => {
    if (!state.isReady) {
      document.documentElement.classList.add('motion-ready')
      document.documentElement.classList.remove('is-booting')
      updateState({ isReady: true })
    }
  }, SAFETY_TIMEOUT)
}

// ───────────────────────────────────────────────────────────────────
// React Hook
// ───────────────────────────────────────────────────────────────────

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function getSnapshot() {
  return state
}

function getServerSnapshot(): MotionState {
  return {
    profile: 'desktop',
    isReduced: false,
    isDesktop: true,
    isMobile: false,
    isReady: false,
  }
}

export function useMotion() {
  useEffect(() => {
    bootMotion()
  }, [])

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const withMotion = useCallback(
    <T>(fullValue: T, reducedValue: T): T => {
      return snapshot.isReduced ? reducedValue : fullValue
    },
    [snapshot.isReduced],
  )

  return {
    ...snapshot,
    withMotion,
  }
}

// ───────────────────────────────────────────────────────────────────
// Imperative API for non-React contexts
// ───────────────────────────────────────────────────────────────────

export function getMotionState() {
  if (!booted) {
    bootMotion()
  }
  return state
}

export function isReducedMotion() {
  return getMotionState().isReduced
}

export function isMotionReady() {
  return getMotionState().isReady
}
