import { useRef, createElement } from 'react'
import type { ElementType, ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { DURATION, EASE, DISTANCE, STAGGER, PROFILE, TRIGGER } from '../../motion'

gsap.registerPlugin(useGSAP)

type Props<T extends ElementType> = {
  as?: T
  text: string
  className?: string
  mode?: 'mask' | 'words' | 'lines'
  id?: string
  drift?: boolean
}

export function TextReveal<T extends ElementType = 'p'>({
  as,
  text,
  className,
  mode = 'mask',
  id,
  drift = false,
}: Props<T>) {
  const ref = useRef<HTMLElement | null>(null)
  const Component = as || 'p'

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      const targets = element.querySelectorAll<HTMLElement>('.mask__in')
      if (!targets.length) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set(targets, { yPercent: 0 })
        gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: DURATION.reduced.fade,
            ease: EASE.reduced,
            stagger: 0.03,
            scrollTrigger: {
              trigger: element,
              start: TRIGGER.reveal.start,
              toggleActions: TRIGGER.reveal.toggleActions,
            },
          },
        )
      })

      mm.add(PROFILE.mobile, () => {
        gsap.fromTo(
          targets,
          { yPercent: DISTANCE.maskSlide },
          {
            yPercent: 0,
            duration: DURATION.reveal.mask * 0.9,
            ease: EASE.reveal,
            stagger: mode === 'words' ? STAGGER.word : STAGGER.line,
            scrollTrigger: {
              trigger: element,
              start: TRIGGER.reveal.start,
              toggleActions: TRIGGER.reveal.toggleActions,
            },
          },
        )
      })

      mm.add(PROFILE.desktop, () => {
        gsap.fromTo(
          targets,
          { yPercent: DISTANCE.maskSlide },
          {
            yPercent: 0,
            duration: DURATION.reveal.mask,
            ease: EASE.reveal,
            stagger: mode === 'words' ? STAGGER.word : STAGGER.line,
            scrollTrigger: {
              trigger: element,
              start: TRIGGER.reveal.start,
              toggleActions: TRIGGER.reveal.toggleActions,
            },
          },
        )
      })
    },
    { scope: ref, dependencies: [mode, text] },
  )

  const inner = renderInner(text, mode)
  const body = drift ? (
    <span className="drift" data-drift>
      {inner}
    </span>
  ) : (
    inner
  )

  const driftRoot = drift ? '' : undefined

  // oxlint-disable-next-line react/refs
  return createElement(Component, { ref, id, className, 'data-drift-root': driftRoot }, body)
}

function renderInner(text: string, mode: 'mask' | 'words' | 'lines'): ReactNode {
  if (mode === 'words') {
    const words = text.split(' ')
    return words.map((word, index) => (
      <span key={`${word}-${index}`}>
        <span className="mask mask--word">
          <span className="mask__in">{word}</span>
        </span>
        {index < words.length - 1 ? ' ' : null}
      </span>
    ))
  }

  if (mode === 'lines') {
    return text.split('\n').map((line, index) => (
      <span className="mask" key={`${index}-${line}`}>
        <span className="mask__in">{line}</span>
      </span>
    ))
  }

  return (
    <span className="mask">
      <span className="mask__in">{text}</span>
    </span>
  )
}
