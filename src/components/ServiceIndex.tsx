import { useRef } from 'react'
import { assetUrl, services, type ServiceKey } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './ServiceIndex.css'

type Props = {
  onPick: (key: ServiceKey) => void
}

/** Editorial service index: six rows answer "do they handle my problem?" in one glance.
    Each row jumps to the appointment form with that service preselected. */
export function ServiceIndex({ onPick }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Slow parallax on the tool-wall crop, desktop only. Transform-only.
  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 60rem)', () => {
        gsap.fromTo(
          '.index__media img',
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="index section" id="services" aria-labelledby="services-title">
      <div className="container index__grid">
        <div className="index__media" aria-hidden="true">
          <img
            src={assetUrl('prospect-hero.webp')}
            srcSet={`${assetUrl('prospect-hero-1024.webp')} 1024w, ${assetUrl('prospect-hero.webp')} 2560w`}
            sizes="(min-width: 60rem) 34vw, 0px"
            width={2560}
            height={1099}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="index__body">
          <p className="kicker" data-reveal>
            Services
          </p>
          <h2 id="services-title" data-reveal>
            Start with the problem.
          </h2>
          <p className="index__lede" data-reveal>
            Choose the closest match. If you’re not sure, call the shop.
          </p>

          <ul className="index__list">
            {services.map((s) => (
              <li key={s.key} className="index__row">
                <a className="index__link" href="#schedule" onClick={() => onPick(s.key)}>
                  <span className="index__title">{s.title}</span>
                  <span className="index__text">
                    <span className="index__detail">{s.detail}</span>
                    <span className="index__symptoms">{s.symptoms}</span>
                  </span>
                  <span className="index__go" aria-hidden="true">
                    Request an appointment
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="index__foot">
            Domestic and import vehicles. <span lang="es">Se habla español.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
