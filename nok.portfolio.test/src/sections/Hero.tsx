import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Picture } from '../components/Picture/Picture'
import { portraits, profile } from '../data/content'
import {
  DURATION,
  EASE,
  DISTANCE,
  STAGGER,
  PROFILE,
  TRIGGER,
  HERO_OFFSET,
} from '../motion/config'

gsap.registerPlugin(useGSAP)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const hero = root.current
      if (!hero) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.hero__rule', { scaleX: 1 })
        gsap.set('.hero__kicker span', { y: 0, opacity: 1 })
        gsap.set('.hero__adryan .mask__in', { yPercent: 0 })
        gsap.set('.hero__miguel .mask__in', { yPercent: 0 })
        gsap.set('.hero__photo', { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set('.hero__meta > *', { y: 0, opacity: 1 })

        gsap.fromTo(
          '.hero__rule, .hero__kicker span, .hero__adryan .mask__in, .hero__miguel .mask__in, .hero__photo, .hero__meta > *',
          { opacity: 0 },
          {
            opacity: 1,
            duration: DURATION.reduced.fade,
            ease: EASE.reduced,
            stagger: 0.05,
            delay: 0.1,
          },
        )
      })

      mm.add(PROFILE.mobile, () => {
        gsap.set('.hero__rule', { scaleX: 0, transformOrigin: 'left center' })
        gsap.set('.hero__kicker span', { y: DISTANCE.kickerSlide, opacity: 0 })
        gsap.set('.hero__adryan .mask__in', { yPercent: DISTANCE.maskSlide })
        gsap.set('.hero__miguel .mask__in', { yPercent: DISTANCE.maskSlide })
        gsap.set('.hero__photo', { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set('.hero__meta > *', { y: DISTANCE.metaSlide, opacity: 0 })

        const timeline = gsap.timeline({ defaults: { ease: EASE.out } })
        timeline
          .to('.hero__rule', { scaleX: 1, duration: DURATION.hero.rule * 0.9 }, HERO_OFFSET.rule)
          .to(
            '.hero__kicker span',
            { y: 0, opacity: 1, duration: DURATION.hero.kicker * 0.85, stagger: STAGGER.kicker },
            HERO_OFFSET.kicker,
          )
          .to('.hero__adryan .mask__in', { yPercent: 0, duration: DURATION.hero.title * 0.85 }, HERO_OFFSET.adryan)
          .to('.hero__miguel .mask__in', { yPercent: 0, duration: DURATION.hero.title * 0.85 }, HERO_OFFSET.miguel)
          .to(
            '.hero__photo',
            { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.hero.photo * 0.9, ease: EASE.inOut },
            HERO_OFFSET.photo,
          )
          .to(
            '.hero__meta > *',
            { y: 0, opacity: 1, duration: DURATION.hero.meta, stagger: STAGGER.meta },
            HERO_OFFSET.meta,
          )
      })

      mm.add(PROFILE.desktop, () => {
        gsap.set('.hero__rule', { scaleX: 0, transformOrigin: 'left center' })
        gsap.set('.hero__kicker span', { y: DISTANCE.kickerSlide, opacity: 0 })
        gsap.set('.hero__adryan .mask__in', { yPercent: DISTANCE.maskSlide })
        gsap.set('.hero__miguel .mask__in', { yPercent: DISTANCE.maskSlide })
        gsap.set('.hero__photo', { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set('.hero__meta > *', { y: DISTANCE.metaSlide, opacity: 0 })

        const timeline = gsap.timeline({ defaults: { ease: EASE.out } })
        timeline
          .to('.hero__rule', { scaleX: 1, duration: DURATION.hero.rule }, HERO_OFFSET.rule)
          .to(
            '.hero__kicker span',
            { y: 0, opacity: 1, duration: DURATION.hero.kicker, stagger: STAGGER.kicker },
            HERO_OFFSET.kicker,
          )
          .to('.hero__adryan .mask__in', { yPercent: 0, duration: DURATION.hero.title }, HERO_OFFSET.adryan)
          .to('.hero__miguel .mask__in', { yPercent: 0, duration: DURATION.hero.title }, HERO_OFFSET.miguel)
          .to(
            '.hero__photo',
            { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.hero.photo, ease: EASE.inOut },
            HERO_OFFSET.photo,
          )
          .to(
            '.hero__meta > *',
            { y: 0, opacity: 1, duration: DURATION.hero.meta, stagger: STAGGER.meta },
            HERO_OFFSET.meta,
          )

        const drift = () => ({
          trigger: hero,
          ...TRIGGER.parallax,
        })

        gsap.to('.hero__adryan', {
          xPercent: -DISTANCE.parallax.desktop,
          ease: EASE.parallax,
          force3D: true,
          scrollTrigger: drift(),
        })
        gsap.to('.hero__miguel', {
          xPercent: DISTANCE.parallax.desktop,
          ease: EASE.parallax,
          force3D: true,
          scrollTrigger: drift(),
        })
        gsap.fromTo(
          '.hero__photo img',
          { yPercent: 0 },
          {
            yPercent: -DISTANCE.parallax.desktop,
            ease: EASE.parallax,
            force3D: true,
            scrollTrigger: drift(),
          },
        )
        gsap.to('.hero__kicker', {
          opacity: 0,
          y: -12,
          ease: EASE.parallax,
          scrollTrigger: { ...drift(), end: '42% top' },
        })
      })
    },
    { scope: root },
  )

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
