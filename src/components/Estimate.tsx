import { useId, useState, type FormEvent } from 'react'
import { business } from '../lib/business'
import './Estimate.css'

const serviceOptions = [
  'Diagnostics / warning light',
  'Brakes',
  'Tires & wheel alignment',
  'Oil change & preventive maintenance',
  'Factory-scheduled maintenance',
  'Air conditioning',
  'Electrical',
  'Not sure — describe below',
]

/**
 * Demo estimate form. Submission is intercepted locally and nothing is sent
 * or stored anywhere. Delivery would be wired up at launch.
 */
export function Estimate() {
  const id = useId()
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="estimate" id="estimate">
      <div className="estimate__intro">
        <p className="eyebrow eyebrow--oxide">Request an estimate</p>
        <h3>Tell us what the car is doing.</h3>
        <p>
          A few details now means a quicker, more accurate conversation when you call or come by. Se
          habla español.
        </p>
      </div>

      <form className="estimate__form" onSubmit={onSubmit} aria-describedby={`${id}-demo`}>
        <p id={`${id}-demo`} className="estimate__demo">
          Demo form. Nothing you type here is sent or stored.
        </p>

        <div className="estimate__row">
          <div className="field">
            <label htmlFor={`${id}-name`}>Name</label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Alex Rivera…"
              required
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-contact`}>Phone or email</label>
            <input
              id={`${id}-contact`}
              name="contact"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="(718) 555-0100 or alex@example.com…"
              required
            />
          </div>
        </div>

        <div className="estimate__row">
          <div className="field">
            <label htmlFor={`${id}-vehicle`}>Vehicle</label>
            <input
              id={`${id}-vehicle`}
              name="vehicle"
              type="text"
              autoComplete="off"
              placeholder="2018 Honda Civic…"
              required
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-service`}>Service</label>
            <select id={`${id}-service`} name="service" defaultValue="" autoComplete="off" required>
              <option value="" disabled>
                Choose one…
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor={`${id}-note`}>What's going on?</label>
          <textarea
            id={`${id}-note`}
            name="note"
            rows={4}
            autoComplete="off"
            placeholder="Squeal when braking, mostly first thing in the morning…"
          />
        </div>

        <div className="estimate__actions">
          <button type="submit" className="btn btn--oxide btn--lg">
            Send request
          </button>
          <a className="estimate__alt" href={business.phone.href}>
            or call {business.phone.display}
          </a>
        </div>

        <p className="estimate__status" role="status" aria-live="polite">
          {sent ? 'Preview received locally — form delivery would be connected at launch.' : ''}
        </p>
      </form>
    </div>
  )
}
