import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { MouseEvent } from 'react'
import { contact, cta } from '../data/social'
import { isRealHref } from '../data/content'
import type { ContactItem } from '../data/content'
import { Button } from '../components/Button/Button'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { useMagnetic } from '../hooks/useMagnetic'
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
          <SectionLabel index="06" name="Contato" />
          <h2 className="cta__title" id="cta-title" data-drift-root>
            <span className="drift" data-drift>
              <span className="mask">
                <span className="mask__in">Tem um</span>
              </span>
              <span className="mask">
                <span className="mask__in">projeto?</span>
              </span>
              <span className="mask cta__shift">
                <span className="mask__in">
                  Vamos <strong>fazer</strong>.
                </span>
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
            <p className="mono">Direto</p>
          </div>
          <ul className="sheet__list">
            {contact.map((item) => (
              <li key={item.id}>
                <ContactRow item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ item }: { item: ContactItem }) {
  const real = isRealHref(item.href)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  useMagnetic(linkRef, { enabled: real, max: 6, pull: 0.12, within: true })
  useMagnetic(rowRef, { enabled: !real, max: 6, pull: 0.12, within: true })

  const inner = (
    <>
      <span className="sheet__label">{item.label}</span>
      <span className="sheet__value press">{item.value}</span>
      <span className="sheet__arrow" aria-hidden="true">
        <svg className="arrow" viewBox="0 0 24 24" focusable="false">
          <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </span>
      <span className="sheet__hoverline" aria-hidden="true" />
    </>
  )

  if (real) {
    return (
      <a
        ref={linkRef}
        className="sheet__row"
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    )
  }

  return (
    <div ref={rowRef} className="sheet__row">
      {inner}
    </div>
  )
}
