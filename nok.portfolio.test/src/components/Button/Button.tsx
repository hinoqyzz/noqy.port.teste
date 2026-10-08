import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

type Props = {
  href: string
  children: string
  className?: string
  magnetic?: boolean
  direction?: 'right' | 'up'
  variant?: 'underline' | 'round'
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function Button({
  href,
  children,
  className = '',
  magnetic = false,
  direction = 'right',
  variant = 'underline',
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref, { enabled: magnetic, max: 12, pull: 0.16, radius: 140 })

  const path = direction === 'up' ? 'M12 19V5M7 10l5-5 5 5' : 'M4 12h15M13 6l6 6-6 6'

  if (variant === 'round') {
    return (
      <a
        ref={ref}
        className={`btn-round ${className}`.trim()}
        href={href}
        onClick={onClick}
      >
        <span className="btn-round__text">{children}</span>
      </a>
    )
  }

  return (
    <a ref={ref} className={`elink ${className}`.trim()} href={href} onClick={onClick}>
      <span className="elink__inner press">
        <span className="elink__text">{children}</span>
        <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={path} fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </span>
      <span className="elink__line" aria-hidden="true" />
    </a>
  )
}
