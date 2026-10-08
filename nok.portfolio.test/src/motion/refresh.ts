import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Centralized ScrollTrigger refresh strategy.
 * Waits for fonts and images before refreshing, with safety timeout.
 */

let refreshScheduled = false
let refreshTimeout: ReturnType<typeof setTimeout> | null = null

const DEBOUNCE_MS = 50
const SAFETY_MS = 2500

function doRefresh() {
  refreshScheduled = false
  ScrollTrigger.refresh()
}

export function scheduleRefresh() {
  if (refreshScheduled) return
  refreshScheduled = true

  if (refreshTimeout) {
    clearTimeout(refreshTimeout)
  }

  refreshTimeout = setTimeout(doRefresh, DEBOUNCE_MS)
}

export function initRefreshStrategy() {
  if (typeof window === 'undefined') return

  let fontsLoaded = false
  let windowLoaded = false

  const tryRefresh = () => {
    if (fontsLoaded && windowLoaded) {
      scheduleRefresh()
    }
  }

  document.fonts.ready
    .then(() => {
      fontsLoaded = true
      tryRefresh()
    })
    .catch(() => {
      fontsLoaded = true
      tryRefresh()
    })

  if (document.readyState === 'complete') {
    windowLoaded = true
    tryRefresh()
  } else {
    window.addEventListener(
      'load',
      () => {
        windowLoaded = true
        tryRefresh()
      },
      { once: true },
    )
  }

  setTimeout(() => {
    if (!fontsLoaded || !windowLoaded) {
      fontsLoaded = true
      windowLoaded = true
      scheduleRefresh()
    }
  }, SAFETY_MS)
}

export function cleanupTriggers(triggers: ScrollTrigger[]) {
  triggers.forEach((trigger) => {
    if (trigger && typeof trigger.kill === 'function') {
      trigger.kill()
    }
  })
}
