import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 760) {
  const query = `(max-width: ${breakpoint}px)`
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return mobile
}
