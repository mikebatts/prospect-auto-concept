import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Process.css'

const steps = [
  {
    n: '01',
    title: 'Diagnose',
    lede: 'Start with the symptom, not the sales sheet.',
    body: 'Warning light, noise, pull, smell — the visit begins with what you noticed. Scan data and hands-on testing on domestic and import vehicles, then a plain-language read on what is actually going on.',
  },
  {
    n: '02',
    title: 'Decide',
    lede: 'What it needs now. What can wait. What each path involves.',
    body: 'Options laid out plainly, in English or Spanish, so the decision stays yours. No pressure to do everything today; no surprises about what was left for later.',
  },
  {
    n: '03',
    title: 'Drive',
    lede: 'Pick it up knowing what comes next.',
    body: 'The work that was done, the service intervals ahead, and what to watch for. Preventive maintenance on the factory schedule keeps small things small.',
  },
]

/** Card-stacking chapter. Cards stick as you scroll; GSAP scrubs the covered
    card's scale and tone. Reduced motion = static stack. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const cards = Array.from(ref.current?.querySelectorAll<HTMLElement>('.process__card') ?? [])
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card, {
          scale: 0.94,
          filter: 'brightness(0.82)',
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top top+=140',
            scrub: true,
          },
        })
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <div ref={ref} className={`process${reduced ? ' is-static' : ''}`}>
      <ol className="process__list">
        {steps.map((s) => (
          <li className="process__slot" key={s.n}>
            <article className="process__card" aria-labelledby={`process-${s.n}`}>
              <div className="process__card-head">
                <span className="process__num">{s.n}</span>
                <h3 id={`process-${s.n}`}>{s.title}</h3>
              </div>
              <div className="process__card-body">
                <p className="process__lede">{s.lede}</p>
                <p>{s.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}
