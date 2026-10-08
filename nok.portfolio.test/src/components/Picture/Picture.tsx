import { imageSets } from '../../data/imageSets'

type Props = {
  src: string
  width: number
  height: number
  alt: string
  sizes: string
  priority?: boolean
  className?: string
  duotone?: boolean
}

export function Picture({
  src,
  width,
  height,
  alt,
  sizes,
  priority = false,
  className,
  duotone = false,
}: Props) {
  const set = imageSets[src]

  return (
    <picture className={className}>
      {set ? <source type="image/avif" srcSet={set.avif} sizes={sizes} /> : null}
      {set ? <source type="image/webp" srcSet={set.webp} sizes={sizes} /> : null}
      <img
        src={src}
        srcSet={set?.webp}
        sizes={set ? sizes : undefined}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={duotone ? 'duotone' : undefined}
      />
    </picture>
  )
}
