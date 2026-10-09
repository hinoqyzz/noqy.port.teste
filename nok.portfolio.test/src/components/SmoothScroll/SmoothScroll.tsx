import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteContext } from '../../hooks/useSite'
import { Veil } from '../Veil/Veil'
import type { VeilHandle } from '../Veil/Veil'
import { useMotion, initRefreshStrategy, SCROLL } from '../../motion'

const SECTION_IDS = ['intro', 'servicos', 'trabalhos', 'processo', 'sobre', 'contato']

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('intro')
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const veilRef = useRef<VeilHandle | null>(null)
  const activeRef = useRef(active)
  const transitioning = useRef(false)
  const { isReduced } = useMotion()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useLayoutEffect(() => {
    let instance: Lenis | null = null
    const onTick = (time: number) => {
      instance?.raf(time * 1000)
    }

    if (!isReduced) {
      instance = new Lenis({
        lerp: SCROLL.lenis.lerp,
        smoothWheel: true,
        wheelMultiplier: SCROLL.lenis.wheelMultiplier,
        syncTouch: false,
      })
      instance.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)
      lenisRef.current = instance
    }

    const triggers: ScrollTrigger[] = []
    if (isHome) {
      SECTION_IDS.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          triggers.push(
            ScrollTrigger.create({
              trigger: element,
              start: 'top 50%',
              end: 'bottom 50%',
              onToggle: (self) => {
                if (self.isActive) setActive(id)
              },
            }),
          )
        }
      })
    }

    initRefreshStrategy()

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      if (instance) {
        gsap.ticker.remove(onTick)
        instance.destroy()
      }
      lenisRef.current = null
    }
  }, [isReduced, isHome])

  useEffect(() => {
    const hash = location.hash
    if (hash && isHome) {
      requestAnimationFrame(() => {
        const instance = lenisRef.current
        if (instance) {
          instance.scrollTo(hash, { immediate: true, force: true })
        } else {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
      })
    }
  }, [location.hash, isHome])

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    const instance = lenisRef.current
    if (menuOpen) instance?.stop()
    else if (!transitioning.current) instance?.start()
  }, [menuOpen])

  const jump = useCallback((target: string) => {
    const instance = lenisRef.current
    if (instance) {
      instance.scrollTo(target, { offset: 0, immediate: true, force: true })
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    ScrollTrigger.update()
    if (window.location.hash !== target) {
      history.replaceState(null, '', target)
    }
  }, [])

  const scrollTo = useCallback(
    (target: string) => {
      const id = target.replace('#', '')
      if (activeRef.current === id) {
        setMenuOpen(false)
        return
      }

      const veil = veilRef.current
      if (isReduced || !veil || transitioning.current) {
        setMenuOpen(false)
        jump(target)
        return
      }

      transitioning.current = true
      document.documentElement.classList.add('is-transitioning')
      setInert(true)
      lenisRef.current?.stop()

      void veil
        .cover()
        .then(() => {
          setMenuOpen(false)
          jump(target)
          return veil.reveal()
        })
        .finally(() => {
          transitioning.current = false
          document.documentElement.classList.remove('is-transitioning')
          setInert(false)
          lenisRef.current?.start()
          focusSection(target)
        })
    },
    [jump, isReduced],
  )

  const value = useMemo(
    () => ({ scrollTo, active, menuOpen, setMenuOpen }),
    [scrollTo, active, menuOpen],
  )

  return (
    <SiteContext.Provider value={value}>
      <Veil api={veilRef} />
      {children}
    </SiteContext.Provider>
  )
}

function setInert(blocked: boolean) {
  document.querySelectorAll('header, main, footer, .overlay').forEach((node) => {
    if (!(node instanceof HTMLElement)) return
    if (blocked) node.setAttribute('inert', '')
    else node.removeAttribute('inert')
  })
}

function focusSection(target: string) {
  const node = document.querySelector(target)
  if (!(node instanceof HTMLElement)) return
  if (!node.hasAttribute('tabindex')) node.setAttribute('tabindex', '-1')
  node.focus({ preventScroll: true })
}
