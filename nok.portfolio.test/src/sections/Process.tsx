import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../data/services'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'
import { useGsapContext } from '../hooks/useGsapContext'

export function Process() {
  const root = useRef<HTMLElement>(null)
  const [step, setStep] = useState(processSteps[0]?.index ?? '01')

  useGsapContext(root, () => {
    const scope = root.current
    if (!scope) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bar = scope.querySelector<HTMLElement>('.process__line-bar')

    if (bar && !reduced) {
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
            scrub: 0.45,
          },
        },
      )
    }

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
  })

  return (
    <section className="section process" id="process" ref={root} aria-labelledby="process-title">
      <div className="shell">
        <div className="section__head">
          <SectionLabel index="04" name="Process" />
          <p className="process__label mono">STEP_{step}</p>
        </div>
        <TextReveal as="h2" id="process-title" text={'How I\nwork'} className="section__title" mode="lines" />
        <p className="draft">[PLACEHOLDER]</p>
        <div className="process__list">
          <div className="process__line" aria-hidden="true">
            <span className="process__line-bar" />
          </div>
          <ol>
            {processSteps.map((item) => (
              <li className="step" key={item.index} data-step={item.index}>
                <span className="step__no">{item.index}</span>
                <h3 className="step__title">{item.title}</h3>
                <p className="step__desc">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
