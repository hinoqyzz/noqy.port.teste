type Props = {
  src: string
  width: number
  height: number
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

export function Picture({
  src,
  width,
  height,
  alt,
  sizes,
  priority = false,
  className,
}: Props) {
  return (
    <picture className={className}>
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
