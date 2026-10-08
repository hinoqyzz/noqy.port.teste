import { useEffect } from 'react'
import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { WorkIndex } from '../sections/WorkIndex'
import { Process } from '../sections/Process'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { getHomeMeta } from '../data/content'
import { applyDocumentMeta } from '../lib/documentMeta'

export function HomePage() {
  useEffect(() => {
    applyDocumentMeta(getHomeMeta())
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
