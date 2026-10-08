import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { DISTANCE, EASE, PROFILE, TRIGGER } from '../../motion'

gsap.registerPlugin(useGSAP)

export function Drift() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(PROFILE.mobile, () => {
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((node) => {
        const root = node.closest<HTMLElement>('[data-drift-root]') ?? node
        gsap.fromTo(
          node,
          { yPercent: 0 },
          {
            yPercent: -DISTANCE.parallax.mobile,
            ease: EASE.parallax,
            force3D: true,
            scrollTrigger: {
              trigger: root,
              ...TRIGGER.parallax,
            },
          },
        )
      })
    })

    mm.add(PROFILE.desktop, () => {
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((node) => {
        const root = node.closest<HTMLElement>('[data-drift-root]') ?? node
        gsap.fromTo(
          node,
          { yPercent: 0 },
          {
            yPercent: -DISTANCE.parallax.desktop,
            ease: EASE.parallax,
            force3D: true,
            scrollTrigger: {
              trigger: root,
              ...TRIGGER.parallax,
            },
          },
        )
      })
    })
  }, { scope: ref })

  return <div ref={ref} style={{ display: 'contents' }} aria-hidden="true" />
}
