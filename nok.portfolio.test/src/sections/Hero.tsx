import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Picture } from '../components/Picture/Picture'
import { portraits, profile } from '../data/content'
import { EASE, PROFILE } from '../motion/config'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeSpeed = useRef(1)

  useGSAP(
    () => {
      const hero = root.current
      if (!hero) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.hero__portrait', { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 })
        gsap.set('.hero__value, .hero__status', { opacity: 1, y: 0 })
        gsap.set('.hero__marquee-track', { x: 0 })
      })

      mm.add(PROFILE.mobile, () => {
        gsap.set('.hero__portrait', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05 })
        gsap.set('.hero__value, .hero__status', { opacity: 0, y: 16 })

        const tl = gsap.timeline({ defaults: { ease: EASE.out } })
        tl.to('.hero__portrait', {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.0,
          ease: EASE.inOut,
        }, 0.1)
          .to('.hero__value', { opacity: 1, y: 0, duration: 0.6 }, 0.5)
          .to('.hero__status', { opacity: 1, y: 0, duration: 0.4 }, 0.6)

        gsap.to('.hero__marquee-track', {
          xPercent: -50,
          duration: 20,
          ease: 'none',
          repeat: -1,
        })

        gsap.to('.hero__portrait img', {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      })

      mm.add(PROFILE.desktop, () => {
        gsap.set('.hero__portrait', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 })
        gsap.set('.hero__value, .hero__status', { opacity: 0, y: 16 })
        gsap.set('.hero__marquee-track', { yPercent: 100 })

        const tl = gsap.timeline({ defaults: { ease: EASE.out } })
        tl.to('.hero__portrait', {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.0,
          ease: EASE.inOut,
        }, 0.1)
          .to('.hero__marquee-track', {
            yPercent: 0,
            duration: 0.9,
            ease: EASE.out,
          }, 0.3)
          .to('.hero__value', { opacity: 1, y: 0, duration: 0.6 }, 0.5)
          .to('.hero__status', { opacity: 1, y: 0, duration: 0.5 }, 0.6)

        const marqueeTrack = hero.querySelector('.hero__marquee-track') as HTMLElement
        if (marqueeTrack) {
          const baseSpeed = 50
          let xPos = 0
          let direction = -1

          ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            onUpdate: (self) => {
              const velocity = self.getVelocity()
              marqueeSpeed.current = 1 + Math.abs(velocity) / 1000
              if (velocity > 0) direction = 1
              else if (velocity < 0) direction = -1
            },
          })

          const animate = () => {
            xPos += direction * baseSpeed * marqueeSpeed.current * 0.016
            const trackWidth = marqueeTrack.scrollWidth / 2
            if (Math.abs(xPos) >= trackWidth) {
              xPos = 0
            }
            marqueeTrack.style.transform = `translateX(${xPos}px)`
            requestAnimationFrame(animate)
          }
          animate()
        }

        gsap.to('.hero__portrait img', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="hero" id="intro" ref={root} aria-labelledby="hero-title">
      <div className="hero__grid shell">
        <div className="hero__content">
          <span className="hero__arrow" aria-hidden="true">↘</span>
          <p className="hero__value body-l">
            <span className="text-secondary">{profile.shortBio}</span>
          </p>
          <p className="hero__status label">
            <span className="hero__dot" aria-hidden="true" />
            {profile.availability}{profile.location ? ` · ${profile.location}` : ''}
          </p>
          <a href="#contato" className="hero__contact-link">
            Começar um projeto <span aria-hidden="true">↗</span>
          </a>
        </div>

        <figure className="hero__portrait-wrap">
          <div className="hero__portrait">
            <Picture
              src={portraits.hero.src}
              width={portraits.hero.width}
              height={portraits.hero.height}
              alt={portraits.hero.alt}
              sizes="(max-width: 760px) 100vw, 42vw"
              priority
            />
          </div>
        </figure>
      </div>
      <div className="hero__marquee" aria-hidden="true" ref={marqueeRef}>
        <div className="hero__marquee-track">
          <span className="hero__name display-xl">{profile.name} —&nbsp;</span>
          <span className="hero__name display-xl">{profile.name} —&nbsp;</span>
          <span className="hero__name display-xl">{profile.name} —&nbsp;</span>
          <span className="hero__name display-xl">{profile.name} —&nbsp;</span>
          <span className="hero__name display-xl">{profile.name} —&nbsp;</span>
          <span className="hero__name display-xl">{profile.name} —&nbsp;</span>
        </div>
      </div>
      <h1 id="hero-title" className="sr-only">{profile.name}</h1>
    </section>
  )
}
