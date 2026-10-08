import { useRef } from 'react'
import type { Media, Project } from '../../data/content'
import { useMagnetic } from '../../hooks/useMagnetic'
import { Picture } from '../Picture/Picture'

type Props = {
  project: Project
}

export function ProjectItem({ project }: Props) {
  const ref = useRef<HTMLElement>(null)
  const split = project.layout === 'split'
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
        {split && project.secondary ? (
          <Frame media={project.secondary} sizes="(max-width: 960px) 100vw, 22vw" />
        ) : null}
        {full && project.secondary ? (
          <Frame media={project.secondary} sizes="(max-width: 960px) 86vw, 18vw" portrait />
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
        <p className="project__desc">{project.description}</p>
        <p className="project__url">{project.url}</p>
        {!split && !full && project.secondary ? (
          <div className="project__aside">
            <Frame media={project.secondary} sizes="(max-width: 960px) 70vw, 220px" />
          </div>
        ) : null}
        <span className="project__line" aria-hidden="true" />
      </div>
    </article>
  )
}

function coverSizes(layout: Project['layout']) {
  if (layout === 'full') return '(max-width: 960px) 100vw, 46vw'
  if (layout === 'right') return '(max-width: 960px) 100vw, 34vw'
  return '(max-width: 960px) 100vw, 40vw'
}

function Frame({
  media,
  sizes,
  portrait = false,
}: {
  media: Media
  sizes: string
  portrait?: boolean
}) {
  return (
    <div className={portrait ? 'frame frame--portrait' : 'frame'} data-drift-root>
      <div className="frame__parallax" data-drift>
        <Picture
          src={media.src}
          width={media.width}
          height={media.height}
          alt={media.alt}
          sizes={sizes}
        />
      </div>
      <div className="frame__shade" aria-hidden="true" />
    </div>
  )
}
