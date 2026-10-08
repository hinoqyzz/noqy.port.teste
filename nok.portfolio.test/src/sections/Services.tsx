import { services } from '../data/services'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="section__head">
          <SectionLabel index="02" name="Services" />
          <p className="draft">[PLACEHOLDER]</p>
        </div>
        <TextReveal
          as="h2"
          id="services-title"
          text={'What\nI do'}
          className="section__title"
          mode="lines"
        />
        <div className="services__list">
          {services.map((service) => (
            <article className="service" key={service.index}>
              <div className="service__main">
                <p className="service__no">{service.index}</p>
                <h3 className="service__title">{service.title}</h3>
                <p className="service__desc">{service.description}</p>
              </div>
              <div className="service__visual">
                <img
                  src={service.image.src}
                  width={service.image.width}
                  height={service.image.height}
                  alt={service.image.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="service__rule" aria-hidden="true">
                <span />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
