import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

export default function App() {
  const bar = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const node = bar.current
    if (!node) return
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        node.style.transform = `scaleX(${self.progress})`
      },
    })
    return () => trigger.kill()
  }, [])

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
    </SmoothScroll>
  )
}
