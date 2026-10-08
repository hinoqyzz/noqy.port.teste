import { useEffect, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { navigation, profile, sectionIndex } from '../../data/content'
import { useMagnetic } from '../../hooks/useMagnetic'
import { useSite } from '../../hooks/useSite'
import { DURATION, EASE, DISTANCE, STAGGER, PROFILE, HERO_OFFSET } from '../../motion'

gsap.registerPlugin(useGSAP)

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { scrollTo, active, menuOpen, setMenuOpen } = useSite()
  const index = sectionIndex[active] ?? '01'

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
        gsap.set(header, { yPercent: 0 })
        gsap.fromTo(
          header,
          { opacity: 0 },
          { opacity: 1, duration: DURATION.reduced.fade, ease: EASE.reduced, delay: 0.15 },
        )
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        gsap.fromTo(
          header,
          { yPercent: -DISTANCE.headerSlide },
          {
            yPercent: 0,
            duration: DURATION.header,
            delay: HERO_OFFSET.rule,
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
          { yPercent: DISTANCE.overlaySlide, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: DURATION.overlay,
            stagger: STAGGER.overlay,
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
  }, [menuOpen, setMenuOpen])

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault()
    scrollTo(target)
  }

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="header__inner">
          <div className="brand">
            <BrandLink onClick={(event) => onNavigate(event, '#intro')}>
              {profile.name}
            </BrandLink>
            <span className="brand__index">{index}/06</span>
          </div>
          <nav className="header__nav" aria-label="Seções">
            {navigation.map((item) => (
              <NavLink
                key={item.id}
                href={`#${item.id}`}
                active={active === item.id}
                onClick={(event) => onNavigate(event, `#${item.id}`)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header__end">
            <div className="header__status">
              <span className="status__dot" aria-hidden="true" />
              <span className="status__label">{profile.availability}</span>
            </div>
            <button
              ref={buttonRef}
              className="header__menu"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Fechar' : 'Índice'}
            </button>
          </div>
        </div>
      </header>
      {menuOpen ? (
        <div
          className="overlay"
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Índice"
        >
          <nav aria-label="Seções">
            {navigation.map((item) => (
              <a
                key={item.id}
                className="overlay__link"
                href={`#${item.id}`}
                onClick={(event) => onNavigate(event, `#${item.id}`)}
              >
                <span className="press">{item.label}</span>
                <span className="overlay__index">{item.index}</span>
              </a>
            ))}
          </nav>
          <p className="overlay__note mono">{profile.availability}</p>
        </div>
      ) : null}
    </>
  )
}

function BrandLink({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref, { max: 6, pull: 0.22, radius: 80 })
  return (
    <a ref={ref} className="brand__name" href="#intro" onClick={onClick}>
      <span className="press">{children}</span>
    </a>
  )
}

function NavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string
  active: boolean
  children: ReactNode
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref, { max: 6, pull: 0.28, radius: 72 })
  return (
    <a
      ref={ref}
      className={active ? 'header__link is-active' : 'header__link'}
      href={href}
      aria-current={active ? 'true' : undefined}
      onClick={onClick}
    >
      <span className="press">{children}</span>
    </a>
  )
}
