type Props = {
  index: string
  name: string
}

export function SectionLabel({ index, name }: Props) {
  return (
    <p className="slabel">
      <span>{index}</span>
      <span className="slabel__sep" aria-hidden="true">
        /
      </span>
      <span>{name}</span>
    </p>
  )
}
