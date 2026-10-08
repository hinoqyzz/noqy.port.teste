import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { profile } from '../data/content'
import { useMagnetic } from '../hooks/useMagnetic'
import { useSite } from '../hooks/useSite'

export function Footer() {
  const { scrollTo } = useSite()
  const topRef = useRef<HTMLAnchorElement>(null)
  const [time, setTime] = useState('')
  useMagnetic(topRef, { max: 8, pull: 0.22, radius: 90 })

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      })
    const update = () => setTime(format())
    update()
    const id = window.setInterval(update, 30000)
    return () => window.clearInterval(id)
  }, [])

  const onTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollTo('#intro')
  }

  return (
    <footer className="footer">
      <div className="shell">
        <p className="footer__index mono">06 / Fim</p>
        <div className="footer__row">
          <p className="footer__name">{profile.name}</p>
          <p className="footer__center mono">{profile.marks.practice}</p>
          <div className="footer__right">
            <a ref={topRef} className="totop" href="#intro" onClick={onTop}>
              <span className="press">
                Voltar ao topo
                <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 19V5M7 10l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              </span>
            </a>
            <p className="mono">© {profile.year}</p>
            <p className="mono">{time ? `Hora ${time}` : 'Hora'}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
