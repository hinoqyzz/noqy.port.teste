import { useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { projects } from '../data/content'
import { Picture } from '../components/Picture/Picture'
import { PROFILE, DURATION, EASE, TRIGGER } from '../motion'

gsap.registerPlugin(useGSAP)

export function WorkIndex() {
  const root = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const mm = gsap.matchMedia()

      mm.add(PROFILE.reduced, () => {
        gsap.set('.work-index__row', { opacity: 1, y: 0 })
      })

      mm.add(`${PROFILE.mobile}, ${PROFILE.desktop}`, () => {
        const rows = scope.querySelectorAll<HTMLElement>('.work-index__row')
        rows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.reveal.mask,
              ease: EASE.out,
              delay: i * 0.06,
              scrollTrigger: {
                trigger: row,
                start: TRIGGER.reveal.start,
                toggleActions: TRIGGER.reveal.toggleActions,
              },
            },
          )
        })
      })
    },
    { scope: root },
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY }
    if (previewRef.current && activeProject) {
      gsap.to(previewRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out',
      })
    }
  }, [activeProject])

  const handleMouseEnter = useCallback((slug: string) => {
    setActiveProject(slug)
    if (previewRef.current) {
      gsap.set(previewRef.current, { x: mousePos.current.x, y: mousePos.current.y })
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: EASE.out,
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActiveProject(null)
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.25,
        ease: EASE.out,
      })
    }
  }, [])

  const activeThumb = activeProject
    ? projects.find((p) => p.slug === activeProject)?.thumb
    : null

  return (
    <section
      className="section work-index"
      id="trabalhos"
      ref={root}
      aria-labelledby="work-title"
      onMouseMove={handleMouseMove}
    >
      <div className="shell">
        <header className="work-index__header">
          <p className="mono">03</p>
          <h2 className="work-index__title display-l" id="work-title">
            TRABALHOS{' '}
            <em className="serif-accent serif-accent--primary">selecionados</em>
          </h2>
          <p className="work-index__note body-l">
            Estudos conceituais criados para mostrar processo, direção e código.
          </p>
        </header>

        <div className="work-index__list" role="list">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/trabalhos/${project.slug}`}
              className={`work-index__row ${activeProject && activeProject !== project.slug ? 'is-dimmed' : ''}`}
              onMouseEnter={() => handleMouseEnter(project.slug)}
              onMouseLeave={handleMouseLeave}
              role="listitem"
            >
              <span className="work-index__name index-title">{project.name}</span>
              <span className="work-index__category">{project.category}</span>
              <span className="work-index__year mono">{project.year}</span>
              <span className="work-index__cta">
                Ver estudo <span aria-hidden="true">→</span>
              </span>
              {/* Mobile thumbnail */}
              <figure className="work-index__thumb">
                <Picture
                  src={project.thumb.src}
                  width={project.thumb.width}
                  height={project.thumb.height}
                  alt={project.thumb.alt}
                  sizes="(max-width: 760px) 100vw, 480px"
                />
              </figure>
            </Link>
          ))}
        </div>

        {/* Desktop cursor-following preview */}
        <div
          ref={previewRef}
          className="work-index__preview"
          aria-hidden="true"
        >
          {activeThumb && (
            <Picture
              src={activeThumb.src}
              width={activeThumb.width}
              height={activeThumb.height}
              alt=""
              sizes="480px"
            />
          )}
        </div>
      </div>
    </section>
  )
}
