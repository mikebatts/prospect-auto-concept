import { useRef } from 'react'
import { assetUrl, services, type ServiceKey } from '../lib/business'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { DUR, EASE } from '../lib/motion'
import { useReducedMotion } from '../lib/useReducedMotion'
import { Rise } from './Rise'
import './ServiceIndex.css'

type Props = {
  onPick: (key: ServiceKey) => void
}

/**
 * Services chapter. The wide workshop frame opens the chapter as a full-bleed
 * field with the question set over it. The six services follow as one
 * horizontal sequence: a touch-first, edge-to-edge scroll-snap reel on phones
 * and tablets, a six-panel expanding strip on desktop. Every panel is a real
 * link to the appointment form with that service preselected.
 */
export function ServiceIndex({ onPick }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()

      // The bay settles from a slight zoom as the opener enters, then drifts
      // up as the reel takes over. Deeper on desktop, quieter on phones.
      mm.add({ wide: '(min-width: 60rem)', narrow: '(max-width: 59.99rem)' }, (ctx) => {
        const wide = Boolean(ctx.conditions?.wide)
        gsap.fromTo(
          '.index__img',
          { scale: wide ? 1.12 : 1.06, yPercent: wide ? -4 : -2 },
          {
            scale: 1,
            yPercent: wide ? 6 : 3,
            ease: 'none',
            scrollTrigger: {
              trigger: '.index__opener',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // Contact-sheet drift: the six frames slide in from the right in order
      // as the sequence arrives. Runs once; transforms and opacity only.
      const panels = gsap.utils.toArray<HTMLElement>('.index__panel', ref.current)
      gsap.set(panels, { x: 40, opacity: 0 })
      ScrollTrigger.create({
        trigger: '.index__sequence',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(panels, {
            x: 0,
            opacity: 1,
            duration: DUR.settle,
            ease: EASE,
            stagger: 0.07,
            delay: DUR.lag,
            onComplete: () => gsap.set(panels, { clearProps: 'transform,opacity' }),
          })
        },
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="index" id="services" aria-labelledby="services-title">
      <div className="index__opener">
        <figure className="index__media" aria-hidden="true">
          <img
            className="index__img"
            src={assetUrl('prospect-workshop-commissioned.webp')}
            srcSet={`${assetUrl('prospect-workshop-commissioned-1440.webp')} 1440w, ${assetUrl('prospect-workshop-commissioned.webp')} 2688w`}
            sizes="100vw"
            width={2688}
            height={1520}
            alt=""
            loading="eager"
            fetchPriority="low"
            decoding="async"
          />
        </figure>

        <div className="index__head container">
          <p className="kicker" data-reveal>
            Services
          </p>
          <Rise as="h2" id="services-title">
            What can we help with?
          </Rise>
          <p className="index__lede" data-reveal>
            Choose the closest match. If you’re not sure, call the shop.
          </p>
        </div>
      </div>

      <div className="index__sequence">
        <p className="index__hint container" aria-hidden="true">
          <span className="index__hint-touch">Swipe through the six services</span>
          <span className="index__hint-pointer">Six services · domestic and import</span>
        </p>

        <ul className="index__reel" role="list" aria-label="Services">
          {services.map((s) => (
            <li key={s.key} className="index__panel">
              <a className="index__link" href="#schedule" onClick={() => onPick(s.key)}>
                <span className="index__title">{s.title}</span>
                <span className="index__more">
                  <span className="index__detail">{s.detail}</span>
                  <span className="index__symptoms">{s.symptoms}</span>
                </span>
                <span className="index__go">
                  Request service
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4 12h15m-6-7 7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="index__foot container">
          Domestic and import vehicles. <span lang="es">Se habla español.</span>
        </p>
      </div>
    </section>
  )
}
