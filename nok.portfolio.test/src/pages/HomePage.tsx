import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { WorkIndex } from '../sections/WorkIndex'
import { Process } from '../sections/Process'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'

export function HomePage() {
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
