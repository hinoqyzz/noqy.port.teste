import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { portraits, profile, skills } from '../data/content'
import { Picture } from '../components/Picture/Picture'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'
import { DURATION, EASE, DISTANCE, PROFILE, TRIGGER } from '../motion'

gsap.registerPlugin(useGSAP)

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const frame = scope.querySelector<HTMLElement>('.about__photo')
      if (!frame) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
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

      mm.add(PROFILE.mobile, () => {
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

      mm.add(PROFILE.desktop, () => {
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
    },
    { scope: root },
  )

  return (
    <section className="section about about--inverse" id="sobre" ref={root} aria-labelledby="about-title">
      <div className="shell">
        <div className="about__grid">
          <figure className="about__figure">
            <p className="about__vert mono">{profile.given}</p>
            <div className="frame about__photo" data-drift-root>
              <div className="frame__parallax" data-drift>
                <Picture
                  src={portraits.about.src}
                  width={portraits.about.width}
                  height={portraits.about.height}
                  alt={portraits.about.alt}
                  sizes="(max-width: 960px) 100vw, 38vw"
                />
              </div>
            </div>
            <figcaption className="about__caption mono">{profile.given}</figcaption>
          </figure>
          <div className="about__copy">
            <SectionLabel index="05" name="Sobre" />
            <TextReveal
              as="h2"
              id="about-title"
              text="Sobre"
              className="section__title"
              mode="mask"
              drift
            />
            <p className="about__text">{profile.about}</p>
            <p className="about__since mono">{profile.since}</p>
            <ul className="skills">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
