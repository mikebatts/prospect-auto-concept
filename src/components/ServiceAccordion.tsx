import { useId, useRef, useState, type KeyboardEvent } from 'react'
import './ServiceAccordion.css'

const items = [
  {
    key: 'diagnostics',
    title: 'Diagnostics',
    hint: 'Warning lights, noises',
    lede: 'A scan tool reads codes. A technician finds causes.',
    body: 'Check-engine lights, warning lamps, noises, and drivability complaints. Scan-tool readout plus hands-on testing, so the fix targets the cause rather than the code.',
  },
  {
    key: 'brakes',
    title: 'Brakes',
    hint: 'Pads, rotors, fluid',
    lede: 'Measured, not guessed.',
    body: 'Pads, rotors, calipers, fluid, and the measurements that show how much life is left. Pulsing, squeal, or a soft pedal are worth a look sooner rather than later.',
  },
  {
    key: 'tires',
    title: 'Tires & alignment',
    hint: 'Wear, pull, balance',
    lede: 'Uneven wear and a steering pull usually point back here.',
    body: 'Wheel alignment, tire mounting and balancing, rotation, and pressure checks, on domestic and import vehicles alike.',
  },
  {
    key: 'maintenance',
    title: 'Oil & maintenance',
    hint: 'Factory schedule',
    lede: 'Kept on schedule so small things stay small.',
    body: "Oil and filter changes, fluids, filters, belts, and the factory-scheduled services listed in your owner's manual.",
  },
  {
    key: 'ac',
    title: 'Air conditioning',
    hint: 'Weak or warm air',
    lede: 'Inspection first, then recharge or repair as needed.',
    body: 'Weak airflow, warm air, or odd smells. A/C system inspection, leak checks, and recharge or component repair as needed.',
  },
  {
    key: 'electrical',
    title: 'Electrical',
    hint: 'Battery, starter, wiring',
    lede: 'The intermittent problems that are hard to pin down.',
    body: 'Batteries, alternators, starters, wiring faults, lighting, and the faults that only show up some of the time.',
  },
]

/**
 * Service ledger. Desktop: an index column of service rows on the left and
 * one ruled detail field on the right. Mobile: a stacked accordion. Same
 * disclosure semantics and arrow-key navigation in both layouts.
 */
export function ServiceAccordion() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = items.length
    let next: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = n - 1
    if (next !== null) {
      e.preventDefault()
      buttonsRef.current[next]?.focus()
      setActive(next)
    }
  }

  return (
    <div className="svc">
      {items.map((item, i) => {
        const open = i === active
        const headerId = `${baseId}-h-${item.key}`
        const panelId = `${baseId}-p-${item.key}`
        return (
          <div className={`svc__item${open ? ' is-open' : ''}`} key={item.key}>
            <h3 className="svc__heading">
              <button
                ref={(el) => {
                  buttonsRef.current[i] = el
                }}
                type="button"
                id={headerId}
                className="svc__trigger"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="svc__title">{item.title}</span>
                <span className="svc__hint tech">{item.hint}</span>
                <span className="svc__mark" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="svc__panel"
              hidden={!open}
            >
              <div className="svc__panel-inner">
                <p className="svc__panel-kicker tech">{item.title}</p>
                <p className="svc__panel-lede">{item.lede}</p>
                <p className="svc__panel-body">{item.body}</p>
                <a className="rlink" href="#estimate">
                  Request an estimate for this
                  <span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
