import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { services } from '../data/services'
import { PROFILE, DURATION, EASE, TRIGGER } from '../motion'

gsap.registerPlugin(useGSAP)

export function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.service', { opacity: 1, y: 0 })
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        const rows = scope.querySelectorAll<HTMLElement>('.service')
        rows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.reveal.line,
              ease: EASE.out,
              delay: i * 0.08,
              scrollTrigger: {
                trigger: row,
                start: TRIGGER.reveal.start,
                toggleActions: TRIGGER.reveal.toggleActions,
              },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="section services" id="servicos" ref={root} aria-labelledby="services-title">
      <div className="shell">
        <header className="services__header">
          <p className="mono">02</p>
          <h2 className="services__title display-l" id="services-title">
            O QUE <em className="serif-accent serif-accent--primary">faço</em>
          </h2>
        </header>

        <div className="services__table" role="list">
          {services.map((service) => (
            <article className="service" key={service.index} role="listitem">
              <span className="service__index mono">{service.index}</span>
              <h3 className="service__title h3">{service.title}</h3>
              <p className="service__desc">{service.description}</p>
              <span className="service__line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
