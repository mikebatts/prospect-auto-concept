import { useEffect, useId, useRef, useState } from 'react'
import { business } from '../lib/business'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Proof.css'

/* Not customer quotes. Factual trust statements built only from the
   publicly described services and the verified business facts. */
const signals = [
  {
    k: 'Plain language',
    text: 'Diagnostics explained as causes and options, not a parts list.',
  },
  {
    k: 'One roof',
    text: 'Domestic and import vehicles, serviced at the same 4th Avenue shop.',
  },
  {
    k: 'Two languages',
    text: 'Se habla español. Service in Spanish or English, start to finish.',
  },
  {
    k: 'On schedule',
    text: 'Factory-scheduled maintenance and preventive care that keeps small things small.',
  },
  {
    k: 'Six days',
    text: 'Open Monday through Saturday for the neighborhood, closed Sunday.',
  },
]

const INTERVAL = 5200

export function Proof() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const liveId = useId()
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (reduced || paused) return
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % signals.length), INTERVAL)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [reduced, paused])

  const go = (n: number) => setIndex(((n % signals.length) + signals.length) % signals.length)
  const current = signals[index] ?? signals[0]!

  return (
    <div className="proof">
      <div className="proof__rating">
        <p className="eyebrow">Google snapshot</p>
        <p className="proof__score">
          <span className="proof__num">{business.google.rating}</span>
          <span className="proof__stars" aria-hidden="true">
            ★★★★★
          </span>
        </p>
        <p className="proof__line">
          {business.google.rating} on Google · {business.google.reviewCount} reviews
        </p>
        <p className="proof__note">
          Snapshot taken {business.google.snapshotDate}. Ratings and counts change as new reviews
          post; the live number is on Google.
        </p>
        <a
          className="proof__maps"
          href={business.google.mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the reviews on Google
          <span aria-hidden="true"> ↗</span>
        </a>
      </div>

      <section
        className="proof__carousel"
        aria-roledescription="carousel"
        aria-label="Review signals"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <p className="eyebrow eyebrow--oxide">What the experience should make clear</p>
        <div className="proof__stage" id={liveId} aria-live="polite" aria-atomic="true">
          <p className="proof__signal-key">{current.k}</p>
          <p className="proof__signal-text" key={index}>
            {current.text}
          </p>
        </div>
        <div className="proof__controls">
          <div className="proof__dots" role="group" aria-label="Choose a signal">
            {signals.map((s, i) => (
              <button
                key={s.k}
                type="button"
                className={`proof__dot${i === index ? ' is-active' : ''}`}
                aria-label={`Signal ${i + 1} of ${signals.length}: ${s.k}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="proof__arrows">
            <button
              type="button"
              className="proof__arrow"
              onClick={() => go(index - 1)}
              aria-label="Previous signal"
            >
              ←
            </button>
            <span className="proof__count" aria-hidden="true">
              {index + 1} / {signals.length}
            </span>
            <button
              type="button"
              className="proof__arrow"
              onClick={() => go(index + 1)}
              aria-label="Next signal"
            >
              →
            </button>
          </div>
        </div>
        <p className="proof__disclaimer">
          Not customer quotes. Statements describe publicly listed services and shop facts only.
        </p>
      </section>
    </div>
  )
}
