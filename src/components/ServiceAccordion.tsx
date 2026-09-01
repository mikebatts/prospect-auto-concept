import { useId, useRef, useState, type KeyboardEvent } from 'react'
import './ServiceAccordion.css'

const items = [
  {
    key: 'diagnostics',
    title: 'Diagnostics',
    body: 'Check-engine lights, warning lamps, noises, and drivability complaints. Scan-tool readout plus hands-on testing, so the fix targets the cause rather than the code.',
  },
  {
    key: 'brakes',
    title: 'Brakes',
    body: 'Pads, rotors, calipers, fluid, and the measurements that show how much life is left. Pulsing, squeal, or a soft pedal are worth a look sooner rather than later.',
  },
  {
    key: 'tires',
    title: 'Tires & alignment',
    body: 'Wheel alignment, tire mounting and balancing, rotation, and pressure checks. Uneven wear and a steering pull usually point back here.',
  },
  {
    key: 'maintenance',
    title: 'Oil & maintenance',
    body: "Oil and filter changes, fluids, filters, belts, and the factory-scheduled services listed in your owner's manual — kept on schedule so small things stay small.",
  },
  {
    key: 'ac',
    title: 'Air conditioning',
    body: 'Weak airflow, warm air, or odd smells. A/C system inspection, leak checks, and recharge or component repair as needed.',
  },
  {
    key: 'electrical',
    title: 'Electrical',
    body: 'Batteries, alternators, starters, wiring faults, lighting, and the intermittent problems that are hard to pin down.',
  },
]

export function ServiceAccordion() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])

  // Arrow-key navigation between headers, in addition to Tab.
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
    <div className="hacc">
      {items.map((item, i) => {
        const open = i === active
        const headerId = `${baseId}-h-${item.key}`
        const panelId = `${baseId}-p-${item.key}`
        return (
          <div className={`hacc__item${open ? ' is-open' : ''}`} key={item.key}>
            <h3 className="hacc__heading">
              <button
                ref={(el) => {
                  buttonsRef.current[i] = el
                }}
                type="button"
                id={headerId}
                className="hacc__trigger"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="hacc__num">0{i + 1}</span>
                <span className="hacc__title">{item.title}</span>
                <span className="hacc__plus" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="hacc__panel"
              hidden={!open}
            >
              <div className="hacc__panel-inner">
                <p>{item.body}</p>
                <a className="hacc__link" href="#estimate">
                  Request an estimate
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
