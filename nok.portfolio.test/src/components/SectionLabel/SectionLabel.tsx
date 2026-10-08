type Props = {
  index: string
  name: string
  drift?: boolean
}

export function SectionLabel({ index, name, drift = true }: Props) {
  const marks = (
    <>
      <span>{index}</span>
      <span className="slabel__sep" aria-hidden="true">
        /
      </span>
      <span>{name}</span>
    </>
  )

  return (
    <p className="slabel" data-drift-root={drift ? '' : undefined}>
      {drift ? (
        <span className="drift drift--row" data-drift>
          {marks}
        </span>
      ) : (
        marks
      )}
    </p>
  )
}
