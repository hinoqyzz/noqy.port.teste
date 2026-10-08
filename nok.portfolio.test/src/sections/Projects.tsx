import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects } from '../data/projects'
import { ProjectItem } from '../components/ProjectItem/ProjectItem'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'
import { PROFILE, DURATION, EASE, DISTANCE, TRIGGER, scheduleRefresh } from '../motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Projects() {
  const root = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(projects[0]?.index ?? '01')

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 961px)', () => {
        ScrollTrigger.create({
          trigger: '.work__intro',
          start: 'top 108',
          endTrigger: '.work__list',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })
      })

      const items = Array.from(scope.querySelectorAll<HTMLElement>('.project'))

      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 58%',
          end: 'bottom 42%',
          onToggle: (self) => {
            if (!self.isActive) return
            const index = item.dataset.index
            if (index) setCurrent(index)
          },
        })
      })

      mm.add(PROFILE.reduced, () => {
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.frame').forEach((frame) => {
            gsap.set(frame, { clipPath: 'inset(0% 0% 0% 0%)' })
            gsap.fromTo(
              frame,
              { opacity: 0 },
              {
                opacity: 1,
                duration: DURATION.reduced.fade,
                ease: EASE.reduced,
                scrollTrigger: {
                  trigger: frame,
                  start: TRIGGER.reveal.start,
                  toggleActions: TRIGGER.reveal.toggleActions,
                },
              },
            )
          })
        })
      })

      mm.add(PROFILE.mobile, () => {
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.frame').forEach((frame) => {
            gsap.fromTo(
              frame,
              { clipPath: `inset(${DISTANCE.imageReveal.mobile}% 0% ${DISTANCE.imageReveal.mobile}% 0%)` },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: DURATION.reveal.image * 0.9,
                ease: EASE.out,
                scrollTrigger: {
                  trigger: frame,
                  start: TRIGGER.reveal.start,
                  toggleActions: TRIGGER.reveal.toggleActions,
                },
              },
            )
          })
        })
      })

      mm.add(PROFILE.desktop, () => {
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.frame').forEach((frame) => {
            gsap.fromTo(
              frame,
              { clipPath: `inset(${DISTANCE.imageReveal.desktop}% 0% ${DISTANCE.imageReveal.desktop}% 0%)` },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: DURATION.reveal.image,
                ease: EASE.out,
                scrollTrigger: {
                  trigger: frame,
                  start: TRIGGER.reveal.start,
                  toggleActions: TRIGGER.reveal.toggleActions,
                },
              },
            )
          })
        })
      })

      scope.querySelectorAll('img').forEach((image) => {
        if (!image.complete) {
          image.addEventListener('load', () => scheduleRefresh(), { once: true })
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="section work" id="work" ref={root} aria-labelledby="work-title">
      <div className="shell">
        <div className="work__layout">
          <div className="work__intro-col">
            <div className="work__intro">
              <SectionLabel index="03" name="Trabalhos" drift={false} />
              <p className="work__code mono">ÍNDICE_03</p>
              <TextReveal
                as="h2"
                id="work-title"
                text={'Trabalhos\nselecionados'}
                className="section__title work__title"
                mode="lines"
              />
              <p className="work__count mono" aria-live="polite">
                {current}/0{projects.length}
              </p>
            </div>
          </div>
          <div className="work__list">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
