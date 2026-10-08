import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { processSteps } from '../data/content'
import { PROFILE, SCROLL, DURATION, EASE, TRIGGER } from '../motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Process() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.process__progress', { scaleX: 1 })
        gsap.set('.process__step', { opacity: 1, y: 0 })
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        const progressLine = scope.querySelector<HTMLElement>('.process__progress')
        if (progressLine) {
          gsap.fromTo(
            progressLine,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.process__grid',
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: SCROLL.scrub,
              },
            },
          )
        }

        const steps = scope.querySelectorAll<HTMLElement>('.process__step')
        steps.forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.reveal.mask * 0.7,
              ease: EASE.out,
              delay: i * 0.06,
              scrollTrigger: {
                trigger: step,
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
    <section
      className="section process"
      id="processo"
      ref={root}
      aria-labelledby="process-title"
    >
      <div className="shell">
        <header className="process__header">
          <p className="mono">04</p>
          <h2 className="process__title display-l" id="process-title">
            COMO <em className="serif-accent serif-accent--primary">trabalho</em>
          </h2>
        </header>

        <div className="process__track" aria-hidden="true">
          <span className="process__line" />
          <span className="process__progress" />
        </div>

        <ol className="process__grid" role="list">
          {processSteps.map((step) => (
            <li key={step.index} className="process__step">
              <span className="process__index mono">{step.index}</span>
              <h3 className="process__name h3">{step.title}</h3>
              <p className="process__desc">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
