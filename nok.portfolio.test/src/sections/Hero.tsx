import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { portraits, profile } from '../data/content'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const hero = root.current
    if (!hero) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .fromTo(
          '.hero__rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.55, transformOrigin: 'left center' },
          0.05,
        )
        .fromTo(
          '.hero__kicker span',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
          0.12,
        )
        .fromTo('.hero__adryan .mask__in', { yPercent: 112 }, { yPercent: 0, duration: 0.85 }, 0.22)
        .fromTo('.hero__miguel .mask__in', { yPercent: 112 }, { yPercent: 0, duration: 0.85 }, 0.4)
        .fromTo(
          '.hero__photo',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'power3.inOut' },
          0.48,
        )
        .fromTo(
          '.hero__meta > *',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
          0.86,
        )

      const motion = gsap.matchMedia()
      motion.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const drift = () => ({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        })
        gsap.to('.hero__adryan', { xPercent: -6, ease: 'none', scrollTrigger: drift() })
        gsap.to('.hero__miguel', { xPercent: 7, ease: 'none', scrollTrigger: drift() })
        gsap.to('.hero__photo img', {
          scale: 1.03,
          ease: 'none',
          scrollTrigger: drift(),
        })
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
          <img
            src={portraits.hero.src}
            width={portraits.hero.width}
            height={portraits.hero.height}
            alt={portraits.hero.alt}
            fetchPriority="high"
            decoding="async"
          />
          <span className="hero__shade" aria-hidden="true" />
          <figcaption className="hero__caption mono">Portrait / 01</figcaption>
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
