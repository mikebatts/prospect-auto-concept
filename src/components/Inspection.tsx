import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Inspection.css'

const entries = [
  {
    n: '1',
    title: 'Diagnose',
    lede: 'Start with the symptom, not the sales sheet.',
    body: 'Warning light, noise, pull, smell: the visit begins with what you noticed. Scan data and hands-on testing on domestic and import vehicles, then a plain-language read on what is actually going on.',
  },
  {
    n: '2',
    title: 'Decide',
    lede: 'What it needs now. What can wait. What each path involves.',
    body: 'Options laid out plainly, in English or Spanish, so the decision stays yours. No pressure to do everything today, and no surprises about what was left for later.',
  },
  {
    n: '3',
    title: 'Drive',
    lede: 'Pick it up knowing what comes next.',
    body: 'The work that was done, the service intervals ahead, and what to watch for. Preventive maintenance on the factory schedule keeps small things small.',
  },
]

/**
 * Pinned inspection ledger. On desktop the statement and Plate B pin on the
 * left while the three entries scroll past on the right and tick in one by
 * one. Mobile is unpinned with simple enter reveals. Reduced motion renders
 * every entry ticked and static.
 */
export function Inspection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const root = ref.current
      if (!root) return
      const left = root.querySelector<HTMLElement>('.insp__left')
      const list = root.querySelector<HTMLElement>('.insp__entries')
      const rows = Array.from(root.querySelectorAll<HTMLElement>('.insp__entry'))
      if (!left || !list) return

      const mm = gsap.matchMedia()

      // Plate B opens from a hairline slit as the section arrives.
      gsap.fromTo(
        '.insp__field',
        { clipPath: 'inset(48% 0 48% 0)' },
        {
          clipPath: 'inset(0% 0 0% 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            end: 'top 25%',
            scrub: true,
          },
        },
      )

      mm.add('(min-width: 60rem)', () => {
        const mast = document.querySelector<HTMLElement>('.mast')
        ScrollTrigger.create({
          trigger: left,
          pin: left,
          pinSpacing: false,
          start: () => `top ${(mast?.offsetHeight ?? 76) + 32}px`,
          endTrigger: list,
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        })

        rows.forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 72%',
              end: 'top 38%',
              scrub: true,
            },
          })
          tl.fromTo(
            row,
            { '--tick': 0.34, x: 28 },
            { '--tick': 1, x: 0, ease: 'none', duration: 1 },
            0,
          ).fromTo(
            row.querySelector('.insp__check-path'),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, ease: 'none', duration: 0.5 },
            0.45,
          )
        })
      })

      // Mobile: each entry ticks in once as it enters; no scrub, no pin.
      mm.add('(max-width: 59.99rem)', () => {
        rows.forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          })
          tl.fromTo(
            row,
            { '--tick': 0.34, y: 18 },
            { '--tick': 1, y: 0, ease: 'power2.out', duration: 0.7 },
            0,
          ).fromTo(
            row.querySelector('.insp__check-path'),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, ease: 'power2.out', duration: 0.5 },
            0.25,
          )
        })
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section
      ref={ref}
      className={`insp${reduced ? ' is-static' : ''}`}
      id="standards"
      aria-labelledby="standards-title"
    >
      <div className="container insp__grid">
        <div className="insp__left-cell">
          <div className="insp__left">
            <p className="tech head__kicker">Standards</p>
            <h2 id="standards-title">Every visit should leave you knowing three things.</h2>
            <p className="insp__lede">
              What the car needs, what can wait, and what comes next, explained before the work
              begins.
            </p>
            <figure className="insp__plate">
              <div className="insp__field">
                <figcaption className="insp__label tech">
                  <span className="insp__label-key">Plate B</span>
                  <span>Rotor measured with a caliper gauge</span>
                  <span className="insp__label-note">Concept imagery</span>
                </figcaption>
                <div className="insp__img-wrap">
                  <img
                    src={assetUrl('prospect-brakes.webp')}
                    srcSet={`${assetUrl('prospect-brakes-768.webp')} 768w, ${assetUrl('prospect-brakes.webp')} 1800w`}
                    sizes="(min-width: 60rem) 36vw, 100vw"
                    width={1800}
                    height={1200}
                    alt="Concept imagery: gloved hands measuring a brake rotor with a caliper gauge."
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="reg reg--tl" aria-hidden="true" />
                <span className="reg reg--tr" aria-hidden="true" />
                <span className="reg reg--bl" aria-hidden="true" />
                <span className="reg reg--br" aria-hidden="true" />
              </div>
            </figure>
          </div>
        </div>

        <ol className="insp__entries">
          {entries.map((e) => (
            <li className="insp__entry" key={e.n}>
              <span className="insp__no" aria-hidden="true">
                {e.n}
              </span>
              <div className="insp__entry-head">
                <h3>
                  <span className="visually-hidden">Step {e.n}: </span>
                  {e.title}
                </h3>
                <svg
                  className="insp__check"
                  viewBox="0 0 32 32"
                  width="32"
                  height="32"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    className="insp__check-path"
                    d="M9 16.5l5 5L23.5 11"
                    fill="none"
                    stroke="var(--oxide)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                  />
                </svg>
              </div>
              <p className="insp__entry-lede">{e.lede}</p>
              <p className="insp__entry-body">{e.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
