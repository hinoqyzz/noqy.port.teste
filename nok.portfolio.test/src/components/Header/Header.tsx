import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile, cta, navigation } from '../../data/content'
import { useMagnetic } from '../../hooks/useMagnetic'
import { DURATION, EASE, PROFILE } from '../../motion'

gsap.registerPlugin(useGSAP)

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const floatBtnRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showFloatBtn, setShowFloatBtn] = useState(false)
  const [floatReady, setFloatReady] = useState(false)
  const [headerParked, setHeaderParked] = useState(false)
  const [holdHeaderFocus, setHoldHeaderFocus] = useState(false)
  const openedBy = useRef<'header' | 'float'>('header')
  const restoreFocus = useRef(false)
  const headerAwayTweenReady = useRef(false)
  const pastHeroRef = useRef(false)
  const pendingFocus = useRef<'float' | 'header' | null>(null)
  const lastHeaderEl = useRef<HTMLElement | null>(null)
  const chromeTimers = useRef({ float: 0, header: 0, hold: 0 })
  const location = useLocation()
  const navigate = useNavigate()

  const openMenu = (source: 'header' | 'float') => {
    openedBy.current = source
    setMenuOpen(true)
  }

  const closeMenu = () => {
    restoreFocus.current = true
    setMenuOpen(false)
  }

  useGSAP(
    () => {
      const header = headerRef.current
      if (!header) return

      const reducedMotion = () =>
        window.matchMedia(PROFILE.reduced).matches ||
        document.documentElement.classList.contains('reduced-motion')

      const clearHeaderTransform = () => {
        gsap.set(header, { clearProps: 'transform' })
      }

      const noteHeaderControl = (node: Element | null) => {
        if (!(node instanceof HTMLElement) || !header.contains(node)) return
        const focusable = node.closest<HTMLElement>('a, button')
        if (!focusable || !header.contains(focusable)) return
        lastHeaderEl.current = focusable
      }

      const onFocusIn = (event: FocusEvent) => {
        noteHeaderControl(event.target as Element | null)
      }
      header.addEventListener('focusin', onFocusIn)

      const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 20)
        const hero = document.getElementById('intro')
        const pastHero = hero ? hero.getBoundingClientRect().bottom < 100 : window.scrollY > 80
        if (pastHero === pastHeroRef.current) return
        pastHeroRef.current = pastHero

        window.clearTimeout(chromeTimers.current.float)
        window.cancelAnimationFrame(chromeTimers.current.header)
        window.cancelAnimationFrame(chromeTimers.current.hold)

        if (pastHero) {
          const hadFocus = header.contains(document.activeElement)
          if (hadFocus) {
            noteHeaderControl(document.activeElement)
            pendingFocus.current = 'float'
            setHoldHeaderFocus(true)
          }
          setShowFloatBtn(true)
          setHeaderParked(true)
          const delay = reducedMotion() ? 0 : DURATION.header * 1000
          chromeTimers.current.float = window.setTimeout(() => {
            if (!pastHeroRef.current) return
            setFloatReady(true)
            if (pendingFocus.current === 'float') {
              chromeTimers.current.hold = requestAnimationFrame(() => {
                setHoldHeaderFocus(false)
              })
            }
          }, delay)
        } else {
          if (document.activeElement === floatBtnRef.current) {
            pendingFocus.current = 'header'
          }
          setHoldHeaderFocus(false)
          setShowFloatBtn(false)
          setFloatReady(false)
          const unpark = () => setHeaderParked(false)
          if (reducedMotion()) {
            unpark()
          } else {
            chromeTimers.current.header = requestAnimationFrame(() => {
              chromeTimers.current.header = requestAnimationFrame(unpark)
            })
          }
        }
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set(header, { opacity: 1, clearProps: 'transform' })
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        gsap.fromTo(
          header,
          { yPercent: -110 },
          {
            yPercent: 0,
            duration: DURATION.header,
            delay: 0.5,
            ease: EASE.out,
            immediateRender: true,
            force3D: false,
            onComplete: clearHeaderTransform,
          },
        )
      })

      return () => {
        header.removeEventListener('focusin', onFocusIn)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        window.clearTimeout(chromeTimers.current.float)
        window.cancelAnimationFrame(chromeTimers.current.header)
        window.cancelAnimationFrame(chromeTimers.current.hold)
      }
    },
    { scope: headerRef },
  )

  const headerAway = headerParked || menuOpen
  const floatOn = floatReady || menuOpen
  const headerA11yOff = menuOpen || (headerParked && floatOn && !holdHeaderFocus)
  const headerLeaving = headerParked && !headerA11yOff && !menuOpen

  useGSAP(
    () => {
      const header = headerRef.current
      if (!header) return
      if (!headerAwayTweenReady.current) {
        headerAwayTweenReady.current = true
        if (!headerAway) return
      }
      const mm = gsap.matchMedia()
      mm.add(PROFILE.reduced, () => {
        if (headerAway) gsap.set(header, { yPercent: -110 })
        else gsap.set(header, { clearProps: 'transform' })
      })
      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        gsap.to(header, {
          yPercent: headerAway ? -110 : 0,
          duration: DURATION.header,
          ease: EASE.out,
          overwrite: 'auto',
          force3D: false,
          onComplete: () => {
            if (!headerAway) gsap.set(header, { clearProps: 'transform' })
          },
        })
      })
    },
    { scope: headerRef, dependencies: [headerAway] },
  )

  useGSAP(
    () => {
      if (!menuOpen || !overlayRef.current) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.overlay__link', { yPercent: 0, opacity: 1 })
        overlayRef.current?.querySelector('a')?.focus()
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        gsap.fromTo(
          '.overlay__link',
          { yPercent: 36, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: EASE.out,
          },
        )
        overlayRef.current?.querySelector('a')?.focus()
      })
    },
    { scope: overlayRef, dependencies: [menuOpen] },
  )

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }
      if (event.key !== 'Tab') return
      const links = overlayRef.current
        ? Array.from(overlayRef.current.querySelectorAll<HTMLElement>('a'))
        : []
      const closeBtn = floatBtnRef.current
      const nodes = [closeBtn, ...links].filter(
        (node): node is HTMLElement => Boolean(node),
      )
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
  }, [menuOpen])

  const focusMenuOpener = useCallback((preferFloat: boolean) => {
    if (preferFloat && floatOn) {
      floatBtnRef.current?.focus()
      return
    }
    const stored = lastHeaderEl.current
    if (stored && headerRef.current?.contains(stored)) {
      const style = getComputedStyle(stored)
      if (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        stored.getClientRects().length > 0
      ) {
        stored.focus()
        return
      }
    }
    const headerMenu = buttonRef.current
    const headerCta = headerRef.current?.querySelector<HTMLElement>('.header__cta')
    const menuVisible = Boolean(headerMenu && headerMenu.getClientRects().length > 0)
    const target = menuVisible ? headerMenu : headerCta
    target?.focus()
  }, [floatOn])

  useEffect(() => {
    if (menuOpen || !restoreFocus.current) return
    restoreFocus.current = false
    requestAnimationFrame(() => {
      focusMenuOpener(openedBy.current === 'float')
    })
  }, [menuOpen, showFloatBtn, focusMenuOpener])

  useLayoutEffect(() => {
    if (menuOpen) return
    if (floatOn && pendingFocus.current === 'float') {
      pendingFocus.current = null
      floatBtnRef.current?.focus()
      return
    }
    if (!headerAway && pendingFocus.current === 'header') {
      pendingFocus.current = null
      focusMenuOpener(false)
    }
  }, [floatOn, headerAway, menuOpen, focusMenuOpener])

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setMenuOpen(false)

    if (href.startsWith('/#')) {
      const hash = href.replace('/#', '#')
      if (location.pathname !== '/') {
        navigate('/' + hash)
      } else {
        const el = document.querySelector(hash)
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header
        className={`header${headerA11yOff ? ' is-away' : ''}${headerLeaving ? ' is-leaving' : ''}`}
        ref={headerRef}
        {...(headerA11yOff ? { inert: true as const, 'aria-hidden': true as const } : {})}
      >
        <div className="header__inner shell">
          <Link to="/" className="header__brand" aria-label="Ir para o topo">
            <KothLogo className="header__logo" />
            <span>{profile.name}</span>
          </Link>

          <nav className="header__nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <NavLink
                key={item.id}
                href={item.href}
                onClick={(event) => onNavigate(event, item.href)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__end">
            <CtaButton href={cta.href} onClick={(event) => onNavigate(event, cta.href)}>
              {cta.label}
            </CtaButton>
            <button
              ref={buttonRef}
              className={`header__menu ${headerA11yOff ? 'is-hidden' : ''}`}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              tabIndex={headerA11yOff ? -1 : 0}
              onClick={() => (menuOpen ? closeMenu() : openMenu('header'))}
              {...(headerA11yOff
                ? { inert: true as const, 'aria-hidden': true as const }
                : {})}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <button
        ref={floatBtnRef}
        className={`menu-float ${floatOn ? 'is-visible' : ''}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        tabIndex={floatOn ? 0 : -1}
        onClick={() => (menuOpen ? closeMenu() : openMenu('float'))}
        {...(!floatOn
          ? { inert: true as const, 'aria-hidden': true as const }
          : {})}
      >
        {menuOpen ? 'Fechar' : 'Menu'}
      </button>

      {menuOpen && (
        <div
          className="overlay"
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav aria-label="Navegação principal">
            {navigation.map((item) => (
              <a
                key={item.id}
                className="overlay__link"
                href={item.href}
                onClick={(event) => onNavigate(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={cta.href}
            className="overlay__cta"
            onClick={(event) => onNavigate(event, cta.href)}
          >
            {cta.label}
          </a>
        </div>
      )}
    </>
  )
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: ReactNode
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref, { max: 6, pull: 0.28, radius: 72 })
  return (
    <a ref={ref} className="header__link" href={href} onClick={onClick}>
      {children}
    </a>
  )
}

function CtaButton({
  href,
  children,
  onClick,
}: {
  href: string
  children: ReactNode
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref, { max: 6, pull: 0.22, radius: 80 })
  return (
    <a ref={ref} className="header__cta" href={href} onClick={onClick}>
      {children}
    </a>
  )
}

function KothLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 397 542"
      fill="currentColor"
      role="img"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M35.8 533.5C34.5 532.8 34.0 529.1 33.5 517.3C33.4 513.8 33.0 506.9 32.6 501.9C32.3 496.9 31.9 490.3 31.8 487.1C31.6 484.0 31.3 479.6 31.1 477.4C30.9 475.2 30.6 470.7 30.5 467.3C30.3 463.9 30.1 458.7 29.9 455.8C29.7 452.8 29.3 447.2 29.1 443.2C28.9 439.3 28.5 433.1 28.2 429.4C28.0 425.7 27.6 420.0 27.5 416.9C27.4 413.7 27.1 408.6 26.9 405.5C26.7 402.4 26.3 396.8 26.1 393.0C25.9 389.2 25.6 383.6 25.4 380.6C24.8 372.0 24.5 368.3 24.2 362.0C24.1 358.8 23.7 353.1 23.5 349.5C23.2 345.9 22.9 340.3 22.8 337.1C22.6 334.0 22.3 328.6 22.0 325.1C21.7 321.7 21.3 316.6 21.1 313.8C20.9 310.9 20.6 307.1 20.4 305.1C20.2 303.2 19.9 300.0 19.7 297.9C19.6 295.8 19.3 292.0 19.0 289.5C18.8 287.0 18.4 283.1 18.3 281.0C18.1 278.9 17.7 274.4 17.4 271.1C17.1 267.8 16.7 264.0 16.6 262.6C16.6 261.2 16.3 258.8 16.1 257.1C15.9 255.5 15.6 251.8 15.4 248.9C15.2 246.0 14.7 241.2 14.4 238.1C14.1 235.1 13.7 231.4 13.6 230.0C13.5 228.6 13.3 226.0 13.1 224.3C12.9 222.6 12.5 218.5 12.2 215.3C12.0 212.0 11.5 207.5 11.3 205.2C11.0 203.0 10.7 200.1 10.6 198.8C10.5 197.4 10.3 194.5 10.0 192.2C8.0 175.1 7.7 155.9 9.4 146.6C11.7 133.3 18.3 123.6 27.9 119.4C29.0 118.9 33.7 117.3 38.4 115.7C52.7 111.1 68.3 104.9 93.5 94.2C105.5 89.2 104.9 88.8 106.5 102.5C106.6 103.8 107.0 106.8 107.4 109.1C108.5 117.2 109.0 120.9 109.5 125.3C109.8 127.8 110.2 131.4 110.5 133.3C110.7 135.3 111.1 138.1 111.2 139.5C111.4 140.9 111.7 144.1 112.0 146.5C112.3 148.9 112.6 152.3 112.7 154.0C112.9 155.7 113.2 159.0 113.5 161.4C114.0 166.1 115.1 178.1 115.5 184.4C116.4 197.1 115.8 196.9 127.4 189.0C196.3 141.8 250.2 84.8 294.9 11.6C297.7 7.2 299.4 6.8 300.5 10.6C300.6 11.0 301.0 12.6 301.5 14.0C304.0 22.7 307.0 35.9 308.4 44.8C309.0 48.5 309.3 50.9 310.6 62.8C312.8 81.9 312.6 104.3 310.1 117.5C304.0 150.2 291.8 173.9 268.5 198.7C262.8 204.7 262.8 204.7 268.8 207.1C289.4 215.4 302.8 228.7 309.6 247.6C312.0 254.3 314.7 266.5 315.8 274.9C315.9 276.1 316.2 277.8 316.4 278.7C316.6 279.6 316.8 281.6 317.0 283.0C317.1 284.4 317.5 287.8 317.9 290.5C318.2 293.2 318.6 296.6 318.7 298.1C318.9 299.6 319.2 301.8 319.4 302.9C319.6 304.0 319.9 306.1 320.0 307.6C320.5 312.5 321.7 323.5 322.4 328.2C322.9 332.5 323.4 336.2 324.4 345.9C324.6 347.8 325.0 351.3 325.4 353.6C325.7 356.0 326.0 358.7 326.1 359.6C326.3 361.5 327.6 372.9 328.0 376.0C332.3 409.4 351.8 444.6 384.1 477.5C391.5 485.0 391.5 484.9 383.2 487.2C372.8 490.1 357.2 493.6 349.3 494.7C347.4 495.0 345.0 495.4 344.0 495.6C328.8 498.6 302.6 499.1 288.2 496.7C265.4 493.0 249.6 483.5 240.3 468.0C232.4 454.9 212.1 402.7 197.5 358.2C193.6 346.4 194.3 346.9 185.1 349.1C182.4 349.7 178.8 350.5 177.2 350.8C175.7 351.2 171.1 352.2 167.0 353.1C162.9 354.0 156.6 355.4 153.0 356.2C142.6 358.5 143.4 357.2 144.6 370.5C146.4 390.2 146.7 413.1 145.5 427.9C144.6 437.8 143.7 447.2 143.4 448.9C143.2 450.0 142.9 452.2 142.6 453.9C141.0 467.3 140.5 468.9 137.0 473.1C116.2 498.3 86.5 518.6 55.8 528.7C43.7 532.6 37.3 534.2 35.8 533.5Z"
      />
    </svg>
  )
}
