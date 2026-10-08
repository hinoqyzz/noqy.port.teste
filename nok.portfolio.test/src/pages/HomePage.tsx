import { useEffect } from 'react'
import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { WorkIndex } from '../sections/WorkIndex'
import { Process } from '../sections/Process'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { meta as siteMeta } from '../data/content'

export function HomePage() {
  useEffect(() => {
    document.title = siteMeta.title

    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta) {
      descMeta.setAttribute('content', siteMeta.description)
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', siteMeta.title)
    }

    const ogDescMeta = document.querySelector('meta[property="og:description"]')
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', siteMeta.description)
    }

    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', siteMeta.title)
    }

    const twitterDescMeta = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescMeta) {
      twitterDescMeta.setAttribute('content', siteMeta.description)
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
