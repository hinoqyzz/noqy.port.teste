import { useRef, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SmoothScroll } from './components/SmoothScroll/SmoothScroll'
import { Header } from './components/Header/Header'
import { Cursor } from './components/Cursor/Cursor'
import { HomePage } from './pages/HomePage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { Drift } from './components/Drift/Drift'
import { PROFILE, TRIGGER } from './motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])

  return null
}

export default function App() {
  const bar = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const node = bar.current
      if (!node) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        node.style.display = 'none'
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        node.style.display = ''
        ScrollTrigger.create({
          ...TRIGGER.progress,
          onUpdate: (self) => {
            node.style.transform = `scaleX(${self.progress})`
          },
        })
      })
    },
    { scope: bar },
  )

  return (
    <SmoothScroll>
      <ScrollToTop />
      <a className="skip" href="#main">
        Pular para o conteúdo
      </a>
      <div className="progress" ref={bar} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trabalhos/:slug" element={<CaseStudyPage />} />
        </Routes>
      </main>
      <Drift />
    </SmoothScroll>
  )
}
