import type { Media, Project } from '../../data/content'

type Props = {
  project: Project
}

export function ProjectItem({ project }: Props) {
  const split = project.layout === 'split'

  return (
    <article
      className={`project project--${project.layout}`}
      data-cursor={project.cursor}
      data-index={project.index}
      id={`project-${project.index}`}
    >
      <div className="project__media">
        <Frame media={project.cover} />
        {split && project.secondary ? <Frame media={project.secondary} /> : null}
      </div>
      <div className="project__body">
        <p className="project__index mono">{project.index}</p>
        <h3 className="project__name">{project.name}</h3>
        <div className="project__meta mono">
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span className="project__extra">{project.id}</span>
        </div>
        <p className="project__desc">{project.description}</p>
        <p className="project__url">{project.url}</p>
        {!split && project.secondary ? (
          <div className="project__aside">
            <Frame media={project.secondary} />
          </div>
        ) : null}
        <span className="project__line" aria-hidden="true" />
      </div>
    </article>
  )
}

function Frame({ media }: { media: Media }) {
  return (
    <div className="frame">
      <div className="frame__parallax">
        <img
          src={media.src}
          width={media.width}
          height={media.height}
          alt={media.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="frame__shade" aria-hidden="true" />
    </div>
  )
}
