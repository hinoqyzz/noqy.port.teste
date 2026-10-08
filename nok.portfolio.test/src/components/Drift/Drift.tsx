import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { DESKTOP_MOTION, PARALLAX } from '../../motion/timing'

export function Drift() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add(DESKTOP_MOTION, () => {
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((node) => {
        const root = node.closest<HTMLElement>('[data-drift-root]') ?? node
        gsap.fromTo(
          node,
          { yPercent: 0 },
          {
            yPercent: -PARALLAX,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    })
    return () => media.revert()
  }, [])

  return null
}
