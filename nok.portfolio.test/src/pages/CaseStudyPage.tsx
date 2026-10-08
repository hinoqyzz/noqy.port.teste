import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getNextProject, getCaseMeta } from '../data/content'
import { applyDocumentMeta } from '../lib/documentMeta'
import { Picture } from '../components/Picture/Picture'
import { Footer } from '../sections/Footer'
import { NotFound } from './NotFound'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const nextProject = slug ? getNextProject(slug) : undefined

  useEffect(() => {
    if (!project) return
    applyDocumentMeta(getCaseMeta(project))
  }, [project])

  if (!project) {
    return <NotFound />
  }

  return (
    <>
      <article className="case-study">
        {/* Cover */}
        <header className="case-study__header">
          <div className="case-study__cover">
            <Picture
              src={project.cover.src}
              width={project.cover.width}
              height={project.cover.height}
              alt={project.cover.alt}
              sizes="100vw"
              priority
            />
          </div>
          <div className="shell">
            <div className="case-study__intro">
              <h1 className="case-study__title display-l">{project.name}</h1>
              <dl className="case-study__meta">
                <div>
                  <dt>Tipo</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt>Ano</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt>Papel</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{project.stack.join(', ')}</dd>
                </div>
              </dl>
              <p className="case-study__badge mono">Estudo conceitual</p>
            </div>
          </div>
        </header>

        {/* Challenge */}
        <section className="case-study__section">
          <div className="shell">
            <h2 className="case-study__h2">Desafio</h2>
            <p className="case-study__text body-l">{project.challenge}</p>
          </div>
        </section>

        {/* Direction */}
        <section className="case-study__section">
          <div className="shell">
            <h2 className="case-study__h2">Direção</h2>
            <div className="case-study__direction">
              <div className="case-study__colors">
                <span className="mono">Paleta</span>
                <div className="color-chips">
                  {project.direction.colors.map((color) => (
                    <span
                      key={color}
                      className="color-chip"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              <div className="case-study__fonts">
                <span className="mono">Tipografia</span>
                <p>{project.direction.fonts.join(' · ')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Screens */}
        <section className="case-study__section case-study__screens">
          <div className="shell">
            <div className="case-study__gallery">
              <figure className="case-study__detail">
                <Picture
                  src={project.detail.src}
                  width={project.detail.width}
                  height={project.detail.height}
                  alt={project.detail.alt}
                  sizes="(max-width: 960px) 100vw, 50vw"
                />
              </figure>
              <figure className="case-study__brand">
                <Picture
                  src={project.brand.src}
                  width={project.brand.width}
                  height={project.brand.height}
                  alt={project.brand.alt}
                  sizes="(max-width: 960px) 100vw, 40vw"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Next Project */}
        {nextProject && (
          <nav className="case-study__next">
            <div className="shell">
              <span className="mono">Próximo projeto</span>
              <Link to={`/trabalhos/${nextProject.slug}`} className="case-study__next-link">
                <span className="index-title">{nextProject.name}</span>
                <span className="arrow-icon" aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>
        )}
      </article>

      <Footer />
    </>
  )
}
