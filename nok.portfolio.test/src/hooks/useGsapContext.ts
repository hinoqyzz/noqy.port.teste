import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { RefObject } from 'react'

export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: () => void,
) {
  const setupRef = useRef(setup)

  useLayoutEffect(() => {
    setupRef.current = setup
  })

  useLayoutEffect(() => {
    const element = scope.current
    if (!element) return
    const context = gsap.context(() => {
      setupRef.current()
    }, element)
    return () => context.revert()
  }, [scope])
}
