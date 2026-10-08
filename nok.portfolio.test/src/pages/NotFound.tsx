import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { profile } from '../data/content'
import { Footer } from '../sections/Footer'

export function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada — Adryan Miguel'
  }, [])

  return (
    <>
      <section className="not-found">
        <div className="shell">
          <p className="not-found__code mono">404</p>
          <h1 className="not-found__title display-l">Página não encontrada</h1>
          <p className="not-found__text body-l">
            O endereço que você tentou acessar não existe ou foi movido.
          </p>
          <Link to="/" className="not-found__link">
            ← Voltar para {profile.name}
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
