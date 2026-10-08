import { createContext, useContext } from 'react'

export type SiteState = {
  scrollTo: (target: string) => void
  active: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export const SiteContext = createContext<SiteState | null>(null)

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used within SmoothScroll')
  }
  return context
}
