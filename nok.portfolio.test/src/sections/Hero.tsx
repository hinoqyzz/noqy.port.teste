import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Picture } from '../components/Picture/Picture'
import { portraits, profile } from '../data/content'
import { DURATION, EASE, PROFILE } from '../motion/config'

gsap.registerPlugin(useGSAP)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const hero = root.current
      if (!hero) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.hero__name .mask__in', { yPercent: 0 })
        gsap.set('.hero__portrait', { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 })
        gsap.set('.hero__value, .hero__status, .header', { opacity: 1, y: 0 })

        gsap.fromTo(
          '.hero__name .mask__in, .hero__portrait, .hero__value, .hero__status',
          { opacity: 0 },
          {
            opacity: 1,
            duration: DURATION.reduced.fade,
            ease: EASE.reduced,
            stagger: 0.05,
          },
        )
      })

      mm.add(PROFILE.mobile, () => {
        gsap.set('.hero__name .mask__in', { yPercent: 110 })
        gsap.set('.hero__portrait', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05 })
        gsap.set('.hero__value, .hero__status', { opacity: 0, y: 16 })

        const tl = gsap.timeline({ defaults: { ease: EASE.out } })
        tl.to('.hero__name .mask__in', { yPercent: 0, duration: 0.75, stagger: 0.06 }, 0.1)
          .to(
            '.hero__portrait',
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.85, ease: EASE.inOut },
            0.2,
          )
          .to('.hero__value', { opacity: 1, y: 0, duration: 0.5 }, 0.5)
          .to('.hero__status', { opacity: 1, y: 0, duration: 0.4 }, 0.6)
      })

      mm.add(PROFILE.desktop, () => {
        gsap.set('.hero__name .mask__in', { yPercent: 110 })
        gsap.set('.hero__portrait', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 })
        gsap.set('.hero__value, .hero__status', { opacity: 0, y: 16 })

        const tl = gsap.timeline({ defaults: { ease: EASE.out } })
        tl.to('.hero__name .mask__in', { yPercent: 0, duration: 0.9, stagger: 0.08 }, 0.1)
          .to(
            '.hero__portrait',
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.0, ease: EASE.inOut },
            0.15,
          )
          .to('.hero__value', { opacity: 1, y: 0, duration: 0.6 }, 0.4)
          .to('.hero__status', { opacity: 1, y: 0, duration: 0.5 }, 0.5)
      })
    },
    { scope: root },
  )

  return (
    <section className="hero" id="intro" ref={root} aria-labelledby="hero-title">
      <div className="hero__grid shell">
        {/* Value proposition - columns 1-6 */}
        <div className="hero__content">
          <p className="hero__value body-l">
            Designer e desenvolvedor front-end. Crio landing pages e interfaces{' '}
            <em className="serif-accent">com movimento</em>, do primeiro rascunho ao código no ar.
          </p>
          <p className="hero__status mono">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability} · {profile.location}
          </p>
        </div>

        {/* Portrait - columns 8-12 */}
        <figure className="hero__portrait-wrap">
          <div className="hero__portrait">
            <Picture
              src={portraits.hero.src}
              width={portraits.hero.width}
              height={portraits.hero.height}
              alt={portraits.hero.alt}
              sizes="(max-width: 760px) 100vw, 42vw"
              priority
              duotone
            />
          </div>
        </figure>

        {/* Name - full width at bottom */}
        <h1 className="hero__name display-xl" id="hero-title">
          <span className="hero__name-line">
            <span className="mask">
              <span className="mask__in">{profile.given}</span>
            </span>
          </span>
          <span className="hero__name-line hero__name-line--slash">
            <span className="mask">
              <span className="mask__in">/</span>
            </span>
          </span>
          <span className="hero__name-line">
            <span className="mask">
              <span className="mask__in">{profile.family}</span>
            </span>
          </span>
        </h1>
      </div>
    </section>
  )
}
