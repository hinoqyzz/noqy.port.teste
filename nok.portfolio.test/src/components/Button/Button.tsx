import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { MouseEvent } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  href: string
  children: string
  className?: string
  magnetic?: boolean
  direction?: 'right' | 'up'
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function Button({
  href,
  children,
  className = '',
  magnetic = false,
  direction = 'right',
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mobile = useIsMobile(980)
  const reduced = useReducedMotion()

  useEffect(() => {
    const link = ref.current
    if (!magnetic || mobile || reduced || !link) return

    const onMove = (event: PointerEvent) => {
      const rect = link.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      if (Math.hypot(dx, dy) < 140) {
        gsap.to(link, { x: dx * 0.12, y: dy * 0.16, duration: 0.35, ease: 'power3.out' })
      } else {
        gsap.to(link, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' })
      }
    }

    const reset = () => {
      gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' })
    }

    window.addEventListener('pointermove', onMove)
    link.addEventListener('pointerleave', reset)
    return () => {
      window.removeEventListener('pointermove', onMove)
      link.removeEventListener('pointerleave', reset)
      gsap.killTweensOf(link)
    }
  }, [magnetic, mobile, reduced])

  const path = direction === 'up' ? 'M12 19V5M7 10l5-5 5 5' : 'M4 12h15M13 6l6 6-6 6'

  return (
    <a ref={ref} className={`elink ${className}`.trim()} href={href} onClick={onClick}>
      <span className="elink__inner">
        <span className="elink__text">{children}</span>
        <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={path} fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </span>
      <span className="elink__line" aria-hidden="true" />
    </a>
  )
}
