import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { MouseEvent } from 'react'
import { contact, cta } from '../data/content'
import { isRealHref } from '../data/content'
import type { ContactItem } from '../data/content'
import { useMagnetic } from '../hooks/useMagnetic'
import { useSite } from '../hooks/useSite'
import { PROFILE, DURATION, EASE, TRIGGER } from '../motion'

gsap.registerPlugin(useGSAP)

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const { scrollTo } = useSite()
  const destination = isRealHref(cta.href) ? cta.href : '#contact-list'

  useMagnetic(btnRef, { max: 24, pull: 0.16, radius: 140 })

  useGSAP(
    () => {
      const section = root.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.cta__title .mask__in', { yPercent: 0 })
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        const targets = section.querySelectorAll<HTMLElement>('.cta__title .mask__in')
        gsap.fromTo(
          targets,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: DURATION.reveal.mask,
            ease: EASE.out,
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.cta__title',
              start: TRIGGER.reveal.start,
              toggleActions: TRIGGER.reveal.toggleActions,
            },
          },
        )
      })
    },
    { scope: root },
  )

  const onCta = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isRealHref(cta.href)) return
    event.preventDefault()
    scrollTo('#contact-list')
  }

  return (
    <section className="contact" id="contato" ref={root} aria-labelledby="cta-title">
      <div className="cta">
        <div className="shell">
          <p className="slabel">06</p>
          <h2 className="cta__title" id="cta-title">
            <span className="mask">
              <span className="mask__in">Tem um</span>
            </span>
            <span className="mask">
              <span className="mask__in">projeto?</span>
            </span>
            <span className="mask cta__shift">
              <span className="mask__in">
                Vamos <em className="text-secondary">tirar do papel</em>.
              </span>
            </span>
          </h2>
          <div className="cta__actions">
            <a
              ref={btnRef}
              className="btn-round-cta"
              href={destination}
              onClick={onCta}
            >
              <span className="btn-round-cta__fill" aria-hidden="true" />
              <span className="btn-round-cta__text">Vamos conversar</span>
            </a>
            <p className="cta__note">{cta.note}</p>
          </div>
        </div>
      </div>
      <div className="sheet" id="contact-list">
        <div className="shell">
          <div className="sheet__intro">
            <p className="slabel">Direto</p>
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
