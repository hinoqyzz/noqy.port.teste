import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteContext } from '../../hooks/useSite'
import type { ReactNode } from 'react'

const SECTION_IDS = ['intro', 'services', 'work', 'process', 'about', 'contact']

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('intro')
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let instance: Lenis | null = null
    const onTick = (time: number) => {
      instance?.raf(time * 1000)
    }

    if (!reduced) {
      instance = new Lenis({
        lerp: 0.11,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        syncTouch: false,
      })
      instance.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)
      lenisRef.current = instance

      const hash = window.location.hash
      if (hash) {
        requestAnimationFrame(() => {
          instance?.scrollTo(hash, { immediate: true })
        })
      }
    }

    const triggers = SECTION_IDS.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) setActive(id)
        },
      }),
    )

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts.ready.then(refresh).catch(() => undefined)

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      window.removeEventListener('load', refresh)
      if (instance) {
        gsap.ticker.remove(onTick)
        instance.destroy()
      }
      lenisRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    const instance = lenisRef.current
    if (menuOpen) instance?.stop()
    else instance?.start()
  }, [menuOpen])

  const scrollTo = useCallback((target: string) => {
    setMenuOpen(false)
    const instance = lenisRef.current
    if (instance) {
      instance.scrollTo(target, { offset: 0, duration: 1.05 })
      return
    }
    document.querySelector(target)?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [])

  const value = useMemo(
    () => ({ scrollTo, active, menuOpen, setMenuOpen }),
    [scrollTo, active, menuOpen],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}
