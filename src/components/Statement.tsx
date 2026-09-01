import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Statement.css'

const words =
  'Every visit should leave you knowing three things: what the car needs, what can wait, and what comes next.'.split(
    ' ',
  )

/** Scrubbed text reveal. Reduced motion renders fully visible static text. */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '.statement__word',
        { opacity: 0.48 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        },
      )
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <div ref={ref} className="statement container">
      <p className="eyebrow eyebrow--oxide">The standard</p>
      <p className={`statement__text${reduced ? ' is-static' : ''}`}>
        {words.map((w, i) => (
          <span className="statement__word" key={i}>
            {w}{' '}
          </span>
        ))}
      </p>
    </div>
  )
}
