import { useRef } from 'react'
import { isRealHref, projectSeal, type Media, type Project } from '../../data/content'
import { useMagnetic } from '../../hooks/useMagnetic'
import { Picture } from '../Picture/Picture'

type Props = {
  project: Project
}

export function ProjectItem({ project }: Props) {
  const ref = useRef<HTMLElement>(null)
  const full = project.layout === 'full'
  useMagnetic(ref, { max: 8, pull: 0.06, within: true })

  return (
    <article
      ref={ref}
      className={`project project--${project.layout}`}
      data-cursor={project.cursor}
      data-index={project.index}
      id={`project-${project.index}`}
    >
      <div className="project__media">
        <Frame media={project.cover} sizes={coverSizes(project.layout)} />
        {project.secondary ? (
          <Frame
            media={project.secondary}
            sizes={secondarySizes(project.layout)}
            secondary
            portrait={full}
          />
        ) : null}
      </div>
      <div className="project__body">
        <p className="project__index mono">{project.index}</p>
        <h3 className="project__name">
          <span className="press">{project.name}</span>
        </h3>
        <div className="project__meta mono">
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span className="project__extra">{project.id}</span>
        </div>
        <p className="project__seal mono">{projectSeal}</p>
        <p className="project__desc">{project.description}</p>
        {project.url && isRealHref(project.url) ? <p className="project__url">{project.url}</p> : null}
        <span className="project__line" aria-hidden="true" />
      </div>
    </article>
  )
}

function coverSizes(layout: Project['layout']) {
  if (layout === 'full') return '(max-width: 960px) 100vw, 46vw'
  if (layout === 'split') return '(max-width: 960px) 100vw, 36vw'
  if (layout === 'right') return '(max-width: 960px) 100vw, 34vw'
  return '(max-width: 960px) 100vw, 40vw'
}

function secondarySizes(layout: Project['layout']) {
  if (layout === 'full') return '(max-width: 960px) 68vw, 240px'
  if (layout === 'split') return '(max-width: 960px) 100vw, 28vw'
  return '(max-width: 960px) 100vw, 440px'
}

function Frame({
  media,
  sizes,
  secondary = false,
  portrait = false,
}: {
  media: Media
  sizes: string
  secondary?: boolean
  portrait?: boolean
}) {
  const plate = ['plate', secondary ? 'plate--secondary' : '', portrait ? 'plate--portrait' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={plate} data-drift-root>
      <div className="plate__shift" data-drift>
        <div className="frame frame--plate" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
          <Picture
            src={media.src}
            width={media.width}
            height={media.height}
            alt={media.alt}
            sizes={sizes}
          />
        </div>
      </div>
    </div>
  )
}
