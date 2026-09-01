import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { business, services, type ServiceKey } from '../lib/business'
import { PhoneGlyph } from './Nav'
import './Schedule.css'

type Pick = { key: ServiceKey; n: number } | null

type Props = {
  pick: Pick
}

type FieldName = 'name' | 'phone' | 'vehicle' | 'service' | 'note'
type Errors = Partial<Record<FieldName, string>>

const NOTE_MAX = 600

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter your name.'
  const digits = values.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Enter a phone number with area code, like (718) 555-0100.'
  }
  if (values.vehicle.trim().length < 3) {
    errors.vehicle = 'Enter the year, make and model, like 2018 Honda Civic.'
  }
  if (!values.service) errors.service = 'Choose the service that fits best.'
  if (values.note.length > NOTE_MAX) {
    errors.note = `Keep the note under ${NOTE_MAX} characters.`
  }
  return errors
}

/**
 * Demo appointment-request form. Validation runs locally; submission is
 * intercepted and nothing is sent or stored. Delivery would be wired at launch.
 */
export function Schedule({ pick }: Props) {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  // Set by `reset` so the Name field is focused only after "Start another
  // request", never on the initial mount (no autofocus on page load).
  const focusNameOnReset = useRef(false)
  const [service, setService] = useState<string>('')
  const [seenPick, setSeenPick] = useState<Pick>(pick)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [sent, setSent] = useState<{ name: string; service: string } | null>(null)

  // Preselect the service chosen in the index. Derived from props during render,
  // so the user's later edits to the select are never overwritten.
  if (pick !== seenPick) {
    setSeenPick(pick)
    if (pick) setService(pick.key)
  }

  const read = (form: HTMLFormElement): Record<FieldName, string> => {
    const data = new FormData(form)
    const get = (k: FieldName) => String(data.get(k) ?? '')
    return {
      name: get('name'),
      phone: get('phone'),
      vehicle: get('vehicle'),
      service,
      note: get('note'),
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const values = read(form)
    const next = validate(values)
    setErrors(next)
    setAttempted(true)
    const first = (Object.keys(next) as FieldName[])[0]
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const label = services.find((s) => s.key === values.service)?.title ?? values.service
    setSent({ name: values.name.trim(), service: label })
  }

  // After a first failed attempt, re-validate live so errors clear as they are fixed.
  const onChange = () => {
    if (!attempted || !formRef.current) return
    setErrors(validate(read(formRef.current)))
  }

  const reset = () => {
    focusNameOnReset.current = true
    setSent(null)
    setErrors({})
    setAttempted(false)
    setService('')
  }

  // Focus management around the success state. Runs after the swapped view has
  // rendered, so the target exists: a valid submission focuses the success
  // panel (its heading is the accessible name, so the result is read once),
  // and "Start another request" returns focus to the Name field.
  useEffect(() => {
    if (sent) {
      doneRef.current?.focus()
      return
    }
    if (focusNameOnReset.current) {
      focusNameOnReset.current = false
      nameRef.current?.focus()
    }
  }, [sent])

  const errorCount = Object.keys(errors).length
  const describedBy = (field: FieldName, extra?: string) =>
    [errors[field] ? `${id}-${field}-err` : null, extra ?? null].filter(Boolean).join(' ') ||
    undefined

  return (
    <section className="schedule section" id="schedule" aria-labelledby="schedule-title">
      <div className="container schedule__grid">
        <div className="schedule__intro">
          <p className="kicker kicker--oxide" data-reveal>
            Appointments
          </p>
          <h2 id="schedule-title" data-reveal>
            Request an appointment.
          </h2>
          <p className="lede">
            Tell us the vehicle, what it’s doing, and how to reach you. We’ll follow up during
            business hours. Need help sooner? Call the shop.
          </p>
          <a className="schedule__phone" href={business.phone.href}>
            <PhoneGlyph />
            {business.phone.display}
          </a>
          <p className="schedule__hours">
            {business.hours.map((h) => h.short).join(' · ')} ·{' '}
            <span lang="es">Se habla español</span>
          </p>
        </div>

        {sent ? (
          <div
            ref={doneRef}
            className="schedule__done"
            role="group"
            aria-labelledby={`${id}-done-title`}
            tabIndex={-1}
          >
            <p className="kicker kicker--oxide">Preview only</p>
            <h3 id={`${id}-done-title`}>Thanks, {sent.name}.</h3>
            <p>
              On the finished site, this {sent.service.toLowerCase()} request would go to the shop
              and you’d hear back during business hours. This preview doesn’t send anything. To
              reach the shop now, call.
            </p>
            <div className="schedule__done-actions">
              <a className="btn btn--oxide btn--lg" href={business.phone.href}>
                <PhoneGlyph />
                Call {business.phone.display}
              </a>
              <button type="button" className="btn btn--ghost btn--lg" onClick={reset}>
                Start another request
              </button>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            className="schedule__form"
            onSubmit={onSubmit}
            onChange={onChange}
            noValidate
            aria-describedby={`${id}-demo`}
          >
            <p id={`${id}-demo`} className="schedule__demo">
              Demonstration form on an independent concept site. Nothing you enter is sent or
              stored.
            </p>

            {attempted && errorCount > 0 && (
              <p className="schedule__summary" role="alert">
                {errorCount === 1
                  ? 'One field needs attention.'
                  : `${errorCount} fields need attention.`}
              </p>
            )}

            <div className="schedule__row">
              <div className={`field${errors.name ? ' is-invalid' : ''}`}>
                <label htmlFor={`${id}-name`}>Name</label>
                <input
                  ref={nameRef}
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy('name')}
                />
                {errors.name && (
                  <p className="field__error" id={`${id}-name-err`}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={`field${errors.phone ? ' is-invalid' : ''}`}>
                <label htmlFor={`${id}-phone`}>Phone</label>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={describedBy('phone')}
                />
                {errors.phone && (
                  <p className="field__error" id={`${id}-phone-err`}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="schedule__row">
              <div className={`field${errors.vehicle ? ' is-invalid' : ''}`}>
                <label htmlFor={`${id}-vehicle`}>Vehicle</label>
                <input
                  id={`${id}-vehicle`}
                  name="vehicle"
                  type="text"
                  autoComplete="off"
                  placeholder="2018 Honda Civic…"
                  required
                  aria-invalid={errors.vehicle ? true : undefined}
                  aria-describedby={describedBy('vehicle')}
                />
                {errors.vehicle && (
                  <p className="field__error" id={`${id}-vehicle-err`}>
                    {errors.vehicle}
                  </p>
                )}
              </div>

              <div className={`field${errors.service ? ' is-invalid' : ''}`}>
                <label htmlFor={`${id}-service`}>Service</label>
                <select
                  id={`${id}-service`}
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                  aria-invalid={errors.service ? true : undefined}
                  aria-describedby={describedBy('service')}
                >
                  <option value="">Choose one</option>
                  {services.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Not sure, I’ll describe it below</option>
                </select>
                {errors.service && (
                  <p className="field__error" id={`${id}-service-err`}>
                    {errors.service}
                  </p>
                )}
              </div>
            </div>

            <div className={`field${errors.note ? ' is-invalid' : ''}`}>
              <label htmlFor={`${id}-note`}>
                What is it doing? <span className="field__optional">Optional</span>
              </label>
              <textarea
                id={`${id}-note`}
                name="note"
                rows={4}
                maxLength={NOTE_MAX + 50}
                autoComplete="off"
                placeholder="Squeal when braking, mostly in the morning…"
                aria-invalid={errors.note ? true : undefined}
                aria-describedby={describedBy('note')}
              />
              {errors.note && (
                <p className="field__error" id={`${id}-note-err`}>
                  {errors.note}
                </p>
              )}
            </div>

            <div className="schedule__actions">
              <button type="submit" className="btn btn--oxide btn--lg">
                Send request
              </button>
              <a className="link" href={business.phone.href}>
                or call {business.phone.display}
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
