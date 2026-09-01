import { useState } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Marquee.css'

const phrases = [
  'Diagnostics',
  'Brakes',
  'Electrical',
  'Alignment',
  'Maintenance',
  'A/C',
  'Tires',
  'Oil changes',
]

export function Marquee() {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)

  const track = phrases.map((p, i) => (
    <span className="marquee__item" key={`${p}-${i}`}>
      {p}
      <span className="marquee__dot" aria-hidden="true" />
    </span>
  ))

  return (
    <div
      className="marquee"
      role="group"
      aria-label="Services at a glance"
      data-paused={paused || undefined}
    >
      <ul className="marquee__sr">
        {phrases.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="marquee__viewport" aria-hidden="true">
        <div className="marquee__track">
          <div className="marquee__group">{track}</div>
          <div className="marquee__group">{track}</div>
        </div>
      </div>

      {/* Reduced motion renders the list static, so the control has nothing to do. */}
      {!reduced && (
        <button
          type="button"
          className="marquee__control"
          aria-pressed={paused}
          aria-label={paused ? 'Resume motion' : 'Pause motion'}
          onClick={() => setPaused((v) => !v)}
        >
          <span className="marquee__control-glyph" aria-hidden="true">
            {paused ? (
              <svg viewBox="0 0 12 12" width="10" height="10" focusable="false">
                <path d="M2.5 1.5v9L10.5 6z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" width="10" height="10" focusable="false">
                <rect x="2" y="1.5" width="2.6" height="9" fill="currentColor" />
                <rect x="7.4" y="1.5" width="2.6" height="9" fill="currentColor" />
              </svg>
            )}
          </span>
          <span className="marquee__control-label">{paused ? 'Resume' : 'Pause'}</span>
        </button>
      )}
    </div>
  )
}
