import { services } from '../data/services'
import { Picture } from '../components/Picture/Picture'
import { SectionLabel } from '../components/SectionLabel/SectionLabel'
import { TextReveal } from '../components/TextReveal/TextReveal'

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="section__head">
          <SectionLabel index="02" name="Serviços" />
        </div>
        <TextReveal
          as="h2"
          id="services-title"
          text={'O que\nfaço'}
          className="section__title"
          mode="lines"
          drift
        />
        <div className="services__list">
          {services.map((service) => (
            <article className="service" key={service.index}>
              <div className="service__main">
                <p className="service__no">{service.index}</p>
                <h3 className="service__title" data-drift-root>
                  <span className="drift" data-drift>
                    {service.title}
                  </span>
                </h3>
                <p className="service__desc">{service.description}</p>
              </div>
              <div className="service__visual">
                <Picture
                  src={service.image.src}
                  width={service.image.width}
                  height={service.image.height}
                  alt={service.image.alt}
                  sizes="260px"
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
