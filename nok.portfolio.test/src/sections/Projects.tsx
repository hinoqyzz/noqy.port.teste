import { useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { projects } from '../data/projects'
import { ProjectItem } from '../components/ProjectItem/ProjectItem'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'
import { useGsapContext } from '../hooks/useGsapContext'

export function Projects() {
  const root = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(projects[0]?.index ?? '01')

  useGsapContext(root, () => {
    const scope = root.current
    if (!scope) return

    const media = gsap.matchMedia()
    media.add('(min-width: 961px)', () => {
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

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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

      if (reduced) return
      const frame = item.querySelector<HTMLElement>('.project__media .frame')
      if (!frame) return
      gsap.fromTo(
        frame,
        { clipPath: 'inset(10% 0% 10% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: frame, start: 'top 84%', toggleActions: 'play none none none' },
        },
      )
    })

    media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      items.forEach((item) => {
        const parallax = item.querySelector<HTMLElement>('.project__media .frame__parallax')
        if (!parallax) return
        gsap.fromTo(
          parallax,
          { yPercent: 0 },
          {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    })

    scope.querySelectorAll('img').forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
      }
    })
  })

  return (
    <section className="section work" id="work" ref={root} aria-labelledby="work-title">
      <div className="shell">
        <div className="work__layout">
          <div className="work__intro-col">
            <div className="work__intro">
              <SectionLabel index="03" name="Work" />
              <p className="work__code mono">INDEX_03</p>
              <TextReveal
                as="h2"
                id="work-title"
                text={'Selected\nwork'}
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
