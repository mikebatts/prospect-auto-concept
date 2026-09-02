import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { business } from '../lib/business'
import './Nav.css'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#standards', label: 'How it works' },
  { href: '#visit', label: 'Visit' },
  { href: '#schedule', label: 'Request an appointment' },
]

const SCROLLED_THRESHOLD = 32

function subscribeScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}

function getScrolled() {
  return window.scrollY > SCROLLED_THRESHOLD
}

function getServerScrolled() {
  return false
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Nav() {
  const [open, setOpen] = useState(false)
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled)
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

    // Scroll lock that iOS Safari honours. `overflow: hidden` on the body is
    // not enough there: the page keeps scrolling under the drawer. Pinning the
    // body at the current offset stops it; the offset is restored on close.
    const body = document.body
    const scrollY = window.scrollY
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    document.documentElement.classList.add('menu-open')
    firstLinkRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      document.documentElement.classList.remove('menu-open')
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
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
    <header className={`nav${scrolled || open ? ' nav--solid' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__bar" data-load>
        <a className="nav__wordmark" href="#top">
          <span className="nav__wordmark-main">Prospect Auto</span>
          <span className="nav__wordmark-sub">Repair &amp; Service · Brooklyn</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <a className="btn nav__call" href={business.phone.href}>
            <PhoneGlyph />
            <span>Call {business.phone.display}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__toggle-line" />
            <span className="nav__toggle-line" />
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        className="nav__panel"
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
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__panel-foot">
          <a className="btn btn--oxide btn--lg" href={business.phone.href}>
            <PhoneGlyph />
            Call {business.phone.display}
          </a>
          <p>
            {business.address.full}
            <br />
            {business.hours.map((h) => h.short).join(' · ')}
          </p>
        </div>
      </div>
    </header>
  )
}

export function PhoneGlyph() {
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
