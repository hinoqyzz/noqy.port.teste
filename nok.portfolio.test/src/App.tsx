import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SmoothScroll } from './components/SmoothScroll/SmoothScroll'
import { Header } from './components/Header/Header'
import { Cursor } from './components/Cursor/Cursor'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Projects } from './sections/Projects'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Drift } from './components/Drift/Drift'
import { PROFILE, TRIGGER } from './motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
      <a className="skip" href="#main">
        Pular para o conteúdo
      </a>
      <div className="progress" ref={bar} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <Drift />
    </SmoothScroll>
  )
}
