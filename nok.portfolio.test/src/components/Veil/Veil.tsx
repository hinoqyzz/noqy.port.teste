import { useImperativeHandle, useRef } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile } from '../../data/content'
import { DURATION, EASE, isReducedMotion } from '../../motion'

gsap.registerPlugin(useGSAP)

export type VeilHandle = {
  cover: () => Promise<void>
  reveal: () => Promise<void>
}

type Props = {
  api: RefObject<VeilHandle | null>
}

export function Veil({ api }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const edge = useRef<HTMLSpanElement>(null)
  const lead = useRef<HTMLSpanElement>(null)
  const mark = useRef<HTMLParagraphElement>(null)
  const intro = useRef<Promise<void>>(Promise.resolve())

  useGSAP(
    () => {
      const rootEl = root.current
      const sheetEl = sheet.current
      const edgeEl = edge.current
      const leadEl = lead.current
      const markEl = mark.current
      if (!rootEl || !sheetEl || !edgeEl || !leadEl || !markEl) return

      if (isReducedMotion()) {
        rootEl.hidden = true
        document.documentElement.classList.remove('is-booting')
        document.documentElement.classList.add('motion-ready')
        return
      }

      document.documentElement.classList.remove('is-booting')
      rootEl.classList.add('is-active')

      let resolveIntro = () => {}
      let settled = false
      const finish = () => {
        if (settled) return
        settled = true
        resolveIntro()
      }
      intro.current = new Promise<void>((resolve) => {
        resolveIntro = resolve
      })

      const timeline = gsap.timeline({
        onComplete: () => {
          timeline.kill()
          gsap.killTweensOf(sheetEl)
          gsap.set(sheetEl, { yPercent: 100 })
          rootEl.classList.remove('is-active')
          document.documentElement.classList.add('intro-done')
          document.documentElement.classList.add('motion-ready')
          finish()
        },
      })
      timeline
        .set(sheetEl, { yPercent: 0 })
        .set(leadEl, { scaleX: 0 })
        .fromTo(
          edgeEl,
          { scaleX: 0 },
          { scaleX: 1, duration: DURATION.veil.edge, ease: EASE.smooth },
          0,
        )
        .fromTo(
          markEl,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: DURATION.veil.mark, ease: EASE.out },
          0.04,
        )
        .to(markEl, { opacity: 0, duration: 0.2, ease: 'power2.in' }, DURATION.intro.hold)
        .to(
          sheetEl,
          { yPercent: -100, duration: DURATION.intro.wipe, ease: EASE.inOut },
          DURATION.intro.hold,
        )
        .set(leadEl, { scaleX: 1 })

      return () => {
        timeline.kill()
        finish()
      }
    },
    { scope: root },
  )

  useImperativeHandle(api, () => ({
    async cover() {
      const rootEl = root.current
      const sheetEl = sheet.current
      if (!rootEl || !sheetEl || isReducedMotion()) return
      await intro.current
      rootEl.hidden = false
      rootEl.classList.add('is-active')
      gsap.killTweensOf(sheetEl)
      await tween(sheetEl, { yPercent: 0, duration: DURATION.veil.cover, ease: EASE.inOut })
    },
    async reveal() {
      const rootEl = root.current
      const sheetEl = sheet.current
      if (!rootEl || !sheetEl || isReducedMotion()) return
      try {
        gsap.killTweensOf(sheetEl)
        await tween(sheetEl, { yPercent: 100, duration: DURATION.veil.reveal, ease: EASE.inOut })
      } finally {
        gsap.killTweensOf(sheetEl)
        gsap.set(sheetEl, { yPercent: 100 })
        rootEl.classList.remove('is-active')
      }
    },
  }))

  return (
    <div className="veil" ref={root} aria-hidden="true">
      <div className="veil__sheet" ref={sheet}>
        <span className="veil__edge veil__edge--lead" ref={lead} />
        <span className="veil__edge veil__edge--trail" ref={edge} />
        <p className="veil__mark mono" ref={mark}>
          <span>AM</span>
          <span>{profile.marks.portfolio}</span>
        </p>
      </div>
    </div>
  )
}

function tween(target: HTMLElement, vars: { yPercent: number; duration: number; ease: string }) {
  return new Promise<void>((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      resolve()
    }
    gsap.to(target, { ...vars, overwrite: 'auto', onComplete: finish })
    window.setTimeout(finish, (vars.duration + 0.4) * 1000)
  })
}
