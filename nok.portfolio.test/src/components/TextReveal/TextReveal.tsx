import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

type Tag = 'h2' | 'h3' | 'p' | 'span'

type Props = {
  as?: Tag
  text: string
  className?: string
  mode?: 'mask' | 'words' | 'lines'
  id?: string
  drift?: boolean
}

export function TextReveal({ as = 'p', text, className, mode = 'mask', id, drift = false }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = element.querySelectorAll<HTMLElement>('.mask__in')
    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: mode === 'words' ? 0.045 : 0.07,
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, element)

    return () => context.revert()
  }, [mode, text])

  const inner = renderInner(text, mode)
  const body = drift ? (
    <span className="drift" data-drift>
      {inner}
    </span>
  ) : (
    inner
  )
  const setRef = (node: HTMLElement | null) => {
    ref.current = node
  }
  const driftRoot = drift ? '' : undefined

  if (as === 'h2') {
    return (
      <h2 ref={setRef} id={id} className={className} data-drift-root={driftRoot}>
        {body}
      </h2>
    )
  }
  if (as === 'h3') {
    return (
      <h3 ref={setRef} id={id} className={className} data-drift-root={driftRoot}>
        {body}
      </h3>
    )
  }
  if (as === 'span') {
    return (
      <span ref={setRef} id={id} className={className} data-drift-root={driftRoot}>
        {body}
      </span>
    )
  }
  return (
    <p ref={setRef} id={id} className={className} data-drift-root={driftRoot}>
      {body}
    </p>
  )
}

function renderInner(text: string, mode: 'mask' | 'words' | 'lines') {
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
