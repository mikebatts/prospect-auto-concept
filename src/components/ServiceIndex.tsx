import { useRef } from 'react'
import { assetUrl, services, type ServiceKey } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './ServiceIndex.css'

type Props = {
  onPick: (key: ServiceKey) => void
}

/**
 * Services chapter. The working bay opens the chapter as a full-bleed field
 * with the question set over it. The six services follow as one horizontal
 * sequence: a touch-first scroll-snap reel on phones and tablets, a six-panel
 * expanding strip on desktop. Every panel is a real link to the appointment
 * form with that service preselected.
 */
export function ServiceIndex({ onPick }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Image Scale & Fade: the bay settles from a slight zoom as the opener
  // enters, then drifts up as the reel takes over. Transform only.
  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '.index__img',
        { scale: 1.12, yPercent: -4 },
        {
          scale: 1,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: '.index__opener',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="index" id="services" aria-labelledby="services-title">
      <div className="index__opener">
        <figure className="index__media" aria-hidden="true">
          <img
            className="index__img"
            src={assetUrl('prospect-workshop.webp')}
            srcSet={`${assetUrl('prospect-workshop-1024.webp')} 1024w, ${assetUrl('prospect-workshop.webp')} 2400w`}
            sizes="100vw"
            width={2400}
            height={1350}
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
          <h2 id="services-title" data-reveal>
            What can we help with?
          </h2>
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
