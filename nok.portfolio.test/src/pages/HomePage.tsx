import { useEffect } from 'react'
import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { WorkIndex } from '../sections/WorkIndex'
import { Process } from '../sections/Process'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { profile } from '../data/content'

export function HomePage() {
  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', profile.shortBio)
    }
  }, [])

  return (
    <>
      <Hero />
      <Services />
      <WorkIndex />
      <Process />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
