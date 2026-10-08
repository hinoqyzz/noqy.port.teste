import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { MouseEvent } from 'react'
import { contact, cta } from '../data/social'
import { isRealHref } from '../data/content'
import { Button } from '../components/Button/Button'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { useSite } from '../hooks/useSite'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const { scrollTo } = useSite()
  const destination = isRealHref(cta.href) ? cta.href : '#contact-list'

  useLayoutEffect(() => {
    const section = root.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = section.querySelectorAll<HTMLElement>('.cta__title .mask__in')
    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.95,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.cta__title',
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, section)
    return () => context.revert()
  }, [])

  const onCta = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isRealHref(cta.href)) return
    event.preventDefault()
    scrollTo('#contact-list')
  }

  return (
    <section className="contact" id="contact" ref={root} aria-labelledby="cta-title">
      <div className="cta">
        <div className="shell">
          <SectionLabel index="06" name="Contact" />
          <h2 className="cta__title" id="cta-title">
            <span className="mask">
              <span className="mask__in">Have a project</span>
            </span>
            <span className="mask">
              <span className="mask__in">in mind?</span>
            </span>
            <span className="mask cta__shift">
              <span className="mask__in">
                Let&apos;s <strong>build</strong> it.
              </span>
            </span>
          </h2>
          <div className="cta__actions">
            <Button href={destination} magnetic onClick={onCta}>
              {cta.label}
            </Button>
            <p className="cta__note mono">{cta.note}</p>
          </div>
        </div>
      </div>
      <div className="sheet" id="contact-list">
        <div className="shell">
          <div className="sheet__intro">
            <p className="mono">Direct</p>
            <p className="draft">[PLACEHOLDER]</p>
          </div>
          <ul className="sheet__list">
            {contact.map((item) => {
              const real = isRealHref(item.href)
              const inner = (
                <>
                  <span className="sheet__label">{item.label}</span>
                  <span className="sheet__value">{item.value}</span>
                  <span className="sheet__arrow" aria-hidden="true">
                    <svg className="arrow" viewBox="0 0 24 24" focusable="false">
                      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  </span>
                  <span className="sheet__hoverline" aria-hidden="true" />
                </>
              )
              return (
                <li key={item.id}>
                  {real ? (
                    <a className="sheet__row" href={item.href}>
                      {inner}
                    </a>
                  ) : (
                    <div className="sheet__row">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
