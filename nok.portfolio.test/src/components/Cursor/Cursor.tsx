import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MEDIA, BREAKPOINT } from '../../motion'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const desktop = window.matchMedia(`(pointer: fine) and (min-width: ${BREAKPOINT.desktop}px)`)
    const reduced = window.matchMedia(MEDIA.reducedMotion)
    if (!desktop.matches || reduced.matches) return

    document.documentElement.classList.add('has-cursor')
    gsap.set(root, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(root, 'x', { duration: 0.2, ease: 'power3.out' })
    const yTo = gsap.quickTo(root, 'y', { duration: 0.2, ease: 'power3.out' })

    const move = (event: PointerEvent) => {
      document.documentElement.classList.add('cursor-on')
      xTo(event.clientX)
      yTo(event.clientY)
    }

    const over = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const zone = target.closest<HTMLElement>('[data-cursor], a, button')
      const label = zone?.dataset.cursor ?? ''
      root.classList.toggle('is-link', Boolean(zone) && label.length === 0)
      root.classList.toggle('is-view', label.length > 0)
      const labelNode = root.querySelector('.cursor__label')
      if (labelNode) labelNode.textContent = label
    }

    const out = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('[data-cursor], a, button')) return
      const related = event instanceof PointerEvent ? event.relatedTarget : null
      if (related instanceof Element && related.closest('[data-cursor], a, button')) return
      root.classList.remove('is-link', 'is-view')
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)

    return () => {
      document.documentElement.classList.remove('has-cursor', 'cursor-on')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__dot" />
      <span className="cursor__label" />
    </div>
  )
}
