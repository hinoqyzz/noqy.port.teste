import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { useMotion, BREAKPOINT } from '../motion'

type Options = {
  enabled?: boolean
  max?: number
  pull?: number
  radius?: number
  within?: boolean
}

export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { enabled = true, max = 8, pull = 0.2, radius = 110, within = false }: Options = {},
) {
  const { isReduced, isMobile } = useMotion()
  const coarse =
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: ${BREAKPOINT.desktop - 1}px)`).matches

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled || isReduced || isMobile || coarse) return

    const xTo = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      if (!within && Math.hypot(dx, dy) > radius) {
        xTo(0)
        yTo(0)
        return
      }
      xTo(clamp(dx * pull, -max, max))
      yTo(clamp(dy * pull, -max, max))
    }

    const reset = () => {
      xTo(0)
      yTo(0)
    }

    if (within) node.addEventListener('pointermove', onMove, { passive: true })
    else window.addEventListener('pointermove', onMove, { passive: true })
    node.addEventListener('pointerleave', reset)
    return () => {
      node.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', reset)
      gsap.killTweensOf(node)
      gsap.set(node, { clearProps: 'x,y' })
    }
  }, [coarse, enabled, isReduced, isMobile, max, pull, radius, ref, within])
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}
