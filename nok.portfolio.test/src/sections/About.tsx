import { useRef } from 'react'
import gsap from 'gsap'
import { portraits, profile, skills } from '../data/content'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'
import { useGsapContext } from '../hooks/useGsapContext'

export function About() {
  const root = useRef<HTMLElement>(null)

  useGsapContext(root, () => {
    const scope = root.current
    if (!scope) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const frame = scope.querySelector<HTMLElement>('.about__photo')
    if (frame) {
      gsap.fromTo(
        frame,
        { clipPath: 'inset(12% 0% 12% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.05,
          ease: 'power4.out',
          scrollTrigger: { trigger: frame, start: 'top 80%', toggleActions: 'play none none none' },
        },
      )
    }

    const motion = gsap.matchMedia()
    motion.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const parallax = scope.querySelector<HTMLElement>('.about__photo .frame__parallax')
      if (!parallax) return
      gsap.fromTo(
        parallax,
        { yPercent: 0 },
        {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
  })

  return (
    <section className="section about" id="about" ref={root} aria-labelledby="about-title">
      <div className="shell">
        <div className="about__grid">
          <figure className="about__figure">
            <p className="about__vert mono">AM / Profile / 05</p>
            <div className="frame about__photo">
              <div className="frame__parallax">
                <img
                  src={portraits.about.src}
                  width={portraits.about.width}
                  height={portraits.about.height}
                  alt={portraits.about.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption className="about__caption mono">Portrait / 05</figcaption>
          </figure>
          <div className="about__copy">
            <SectionLabel index="05" name="About" />
            <TextReveal as="h2" id="about-title" text="About" className="section__title" mode="mask" />
            <p className="about__text">{profile.about}</p>
            <p className="about__since mono">Building digital experiences since {profile.since}</p>
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
