import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Picture } from '../components/Picture/Picture'
import { portraits, profile } from '../data/content'
import { DESKTOP_MOTION, INTRO_HOLD, PARALLAX } from '../motion/timing'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const hero = root.current
    if (!hero) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.set('.hero__rule', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.hero__kicker span', { y: 12, opacity: 0 })
      gsap.set('.hero__adryan .mask__in', { yPercent: 112 })
      gsap.set('.hero__miguel .mask__in', { yPercent: 112 })
      gsap.set('.hero__photo', { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set('.hero__meta > *', { y: 16, opacity: 0 })

      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .to('.hero__rule', { scaleX: 1, duration: 0.55 }, INTRO_HOLD + 0.05)
        .to('.hero__kicker span', { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 }, INTRO_HOLD + 0.12)
        .to('.hero__adryan .mask__in', { yPercent: 0, duration: 0.85 }, INTRO_HOLD + 0.22)
        .to('.hero__miguel .mask__in', { yPercent: 0, duration: 0.85 }, INTRO_HOLD + 0.4)
        .to(
          '.hero__photo',
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'power3.inOut' },
          INTRO_HOLD + 0.48,
        )
        .to('.hero__meta > *', { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 }, INTRO_HOLD + 0.86)

      const motion = gsap.matchMedia()
      motion.add(DESKTOP_MOTION, () => {
        const drift = () => ({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
        })
        gsap.to('.hero__adryan', { xPercent: -PARALLAX, ease: 'none', force3D: true, scrollTrigger: drift() })
        gsap.to('.hero__miguel', { xPercent: PARALLAX, ease: 'none', force3D: true, scrollTrigger: drift() })
        gsap.fromTo(
          '.hero__photo img',
          { yPercent: 0 },
          { yPercent: -PARALLAX, ease: 'none', force3D: true, scrollTrigger: drift() },
        )
        gsap.to('.hero__kicker', {
          opacity: 0,
          y: -10,
          ease: 'none',
          scrollTrigger: { ...drift(), end: '42% top' },
        })
      })
    }, hero)

    return () => context.revert()
  }, [])

  return (
    <section className="hero" id="intro" ref={root} aria-labelledby="hero-title">
      <div className="hero__top">
        <div className="hero__kicker mono">
          <div className="hero__kicker-group">
            <span>{profile.marks.portfolio}</span>
            <span>{profile.marks.intro}</span>
          </div>
          <span>{profile.marks.practice}</span>
        </div>
        <div className="hero__rule" aria-hidden="true" />
      </div>
      <div className="hero__stage">
        <h1 className="hero__title" id="hero-title">
          <span className="hero__adryan">
            <span className="mask">
              <span className="mask__in">{profile.given}</span>
            </span>
          </span>
          <span className="hero__miguel">
            <span className="mask">
              <span className="mask__in">{profile.family}</span>
            </span>
          </span>
        </h1>
        <figure className="hero__photo">
          <Picture
            src={portraits.hero.src}
            width={portraits.hero.width}
            height={portraits.hero.height}
            alt={portraits.hero.alt}
            sizes="(max-width: 760px) 100vw, 68vw"
            priority
          />
          <span className="hero__shade" aria-hidden="true" />
          <figcaption className="hero__caption mono">Retrato / 01</figcaption>
        </figure>
      </div>
      <div className="hero__bottom hero__meta">
        <div>
          <p className="hero__code mono">
            {profile.marks.code} · {profile.marks.archive}
          </p>
          <p className="hero__bio">{profile.shortBio}</p>
        </div>
        <div className="hero__facts mono">
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
          <span>{profile.disciplines}</span>
        </div>
      </div>
    </section>
  )
}
