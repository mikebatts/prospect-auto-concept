import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { business } from '../lib/business'
import './Nav.css'

const links = [
  { href: '#services', label: 'Services', note: 'What the shop does' },
  { href: '#standards', label: 'Standards', note: 'How a visit runs' },
  { href: '#reviews', label: 'Reviews', note: 'Google snapshot' },
  { href: '#visit', label: 'Visit', note: 'Address, hours, estimate' },
]

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Masthead: an opaque paper strip ruled into cells. Always dark-on-paper. */
export function Nav() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  // While open the drawer is a modal boundary: Escape closes, body scroll locks,
  // the rest of the page is inert, and Tab cycles between the toggle and the drawer.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const panel = panelRef.current

    const inertTargets = [document.getElementById('main'), document.querySelector('footer')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    )
    const wasInert = inertTargets.map((el) => el.hasAttribute('inert'))
    inertTargets.forEach((el) => el.setAttribute('inert', ''))

    const focusables = () => {
      const inPanel = panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : []
      return toggle ? [toggle, ...inPanel] : inPanel
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      const active = document.activeElement
      const inside = active instanceof HTMLElement && items.includes(active)
      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (!inside || active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      inertTargets.forEach((el, i) => {
        if (!wasInert[i]) el.removeAttribute('inert')
      })
    }
  }, [open, close])

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 60rem)')
    const onChange = () => {
      if (mql.matches) setOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`mast${open ? ' mast--open' : ''}`}>
      <div className="mast__row" data-load>
        <a className="mast__wordmark" href="#top">
          <span className="mast__wordmark-main">Prospect Auto</span>
          <span className="mast__wordmark-sub">Repair &amp; Service · 628 4th Ave, Brooklyn</span>
        </a>

        <nav className="mast__index" aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="mast__estimate" href="#estimate">
          Request an estimate
        </a>

        <a
          className="mast__call"
          href={business.phone.href}
          aria-label={`Call the shop at ${business.phone.display}`}
        >
          <PhoneGlyph />
          <span className="mast__call-long">{business.phone.display}</span>
          <span className="mast__call-short">Call</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="mast__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="mast__toggle-line" />
          <span className="mast__toggle-line" />
          <span className="mast__toggle-word" aria-hidden="true">
            {open ? 'Close' : 'Menu'}
          </span>
        </button>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        className="mast__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="mast__panel-label">{l.label}</span>
                  <span className="mast__panel-note tech">{l.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mast__panel-foot">
          <a className="btn btn--oxide btn--lg" href={business.phone.href}>
            <PhoneGlyph />
            Call {business.phone.display}
          </a>
          <a className="btn btn--outline btn--lg" href="#estimate" onClick={() => setOpen(false)}>
            Request an estimate
          </a>
          <p>
            {business.address.full}
            <br />
            Mon–Fri 8–6 · Sat 8–3 · Sun closed · Se habla español
          </p>
        </div>
      </div>
    </header>
  )
}

function PhoneGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
