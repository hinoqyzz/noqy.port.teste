import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { processSteps } from '../data/services'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'
import { PROFILE, SCROLL } from '../motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Process() {
  const root = useRef<HTMLElement>(null)
  const [step, setStep] = useState(processSteps[0]?.index ?? '01')

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const bar = scope.querySelector<HTMLElement>('.process__line-bar')
      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        if (bar) gsap.set(bar, { scaleY: 1 })
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.process__list',
                start: 'top 70%',
                end: 'bottom 65%',
                scrub: SCROLL.scrub,
              },
            },
          )
        }
      })

      scope.querySelectorAll<HTMLElement>('.step').forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 62%',
          end: 'bottom 38%',
          onToggle: (self) => {
            item.classList.toggle('is-active', self.isActive)
            if (self.isActive && item.dataset.step) setStep(item.dataset.step)
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      className="section process"
      id="process"
      ref={root}
      aria-labelledby="process-title"
    >
      <div className="shell">
        <div className="section__head">
          <SectionLabel index="04" name="Processo" />
          <p className="process__label mono">ETAPA_{step}</p>
        </div>
        <TextReveal
          as="h2"
          id="process-title"
          text={'Como\ntrabalho'}
          className="section__title"
          mode="lines"
          drift
        />
        <div className="process__list">
          <div className="process__line" aria-hidden="true">
            <span className="process__line-bar" />
          </div>
          <ol>
            {processSteps.map((item) => (
              <li className="step" key={item.index} data-step={item.index}>
                <span className="step__no">{item.index}</span>
                <h3 className="step__title" data-drift-root>
                  <span className="drift" data-drift>
                    {item.title}
                  </span>
                </h3>
                <p className="step__desc">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
