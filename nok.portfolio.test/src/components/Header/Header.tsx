import { useEffect, useRef, useState } from 'react'
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
  const overlayRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useGSAP(
    () => {
      const header = headerRef.current
      if (!header) return

      const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 20)
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set(header, { yPercent: 0, opacity: 1 })
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
          },
        )
      })

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    },
    { scope: headerRef },
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
        setMenuOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const links = overlayRef.current
        ? Array.from(overlayRef.current.querySelectorAll<HTMLElement>('a'))
        : []
      const nodes = [buttonRef.current, ...links].filter(
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
      <header className="header" ref={headerRef}>
        <div className="header__inner shell">
          <Link to="/" className="header__brand">
            {profile.name}
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
            <CtaButton href={cta.href}>{cta.label}</CtaButton>
            <button
              ref={buttonRef}
              className="header__menu"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Fechar' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

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
          <a href={cta.href} className="overlay__cta">
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

function CtaButton({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref, { max: 6, pull: 0.22, radius: 80 })
  return (
    <a ref={ref} className="header__cta" href={href}>
      {children}
    </a>
  )
}
