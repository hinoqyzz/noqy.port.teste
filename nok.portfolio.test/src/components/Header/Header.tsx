import { useEffect, useLayoutEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import gsap from 'gsap'
import { navigation, profile, sectionIndex } from '../../data/content'
import { useSite } from '../../hooks/useSite'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { scrollTo, active, menuOpen, setMenuOpen } = useSite()
  const index = sectionIndex[active] ?? '01'

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.fromTo(
      header,
      { yPercent: -110 },
      { yPercent: 0, duration: 0.55, delay: 1.05, ease: 'power4.out' },
    )
    return () => {
      tween.kill()
    }
  }, [])

  useLayoutEffect(() => {
    if (!menuOpen || !overlayRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      overlayRef.current.querySelector('a')?.focus()
      return
    }
    const context = gsap.context(() => {
      gsap.fromTo(
        '.overlay__link',
        { yPercent: 36, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power4.out' },
      )
    }, overlayRef)
    overlayRef.current.querySelector('a')?.focus()
    return () => context.revert()
  }, [menuOpen])

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
      const nodes = [buttonRef.current, ...links].filter((node): node is HTMLElement => Boolean(node))
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
            <a
              className="brand__name"
              href="#intro"
              onClick={(event) => onNavigate(event, '#intro')}
            >
              {profile.name}
            </a>
            <span className="brand__index">
              {index}/06
            </span>
          </div>
          <nav className="header__nav" aria-label="Seções">
            {navigation.map((item) => (
              <a
                key={item.id}
                className={active === item.id ? 'header__link is-active' : 'header__link'}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                onClick={(event) => onNavigate(event, `#${item.id}`)}
              >
                {item.label}
              </a>
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
              {menuOpen ? 'Close' : 'Index'}
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
          aria-label="Menu"
        >
          <nav aria-label="Seções">
            {navigation.map((item) => (
              <a
                key={item.id}
                className="overlay__link"
                href={`#${item.id}`}
                onClick={(event) => onNavigate(event, `#${item.id}`)}
              >
                <span>{item.label}</span>
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
