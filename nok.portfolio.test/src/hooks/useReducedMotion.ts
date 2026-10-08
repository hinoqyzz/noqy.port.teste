import { useEffect, useState } from 'react'

function query() {
  return window.matchMedia('(prefers-reduced-motion: reduce)')
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? query().matches : false,
  )

  useEffect(() => {
    const media = query()
    const update = () => {
      setReduced(media.matches)
      document.documentElement.classList.toggle('reduced-motion', media.matches)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}
