import { useRef } from 'react'
import { assetUrl, business } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import { PhoneGlyph } from './Nav'
import './Hero.css'

/** Cinematic center hero. The image is the room; the type sits in its dark wash. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Image Scale & Fade: as the hero leaves, the room drifts up and dims.
  useGSAP(
    () => {
      if (reduced) return
      gsap.to('.hero__img', {
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero__inner', {
        opacity: 0,
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: '40% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media" data-load>
        <img
          className="hero__img"
          src={assetUrl('prospect-hero.webp')}
          srcSet={`${assetUrl('prospect-hero-1024.webp')} 1024w, ${assetUrl('prospect-hero.webp')} 2560w`}
          sizes="100vw"
          width={2560}
          height={1099}
          alt="Concept imagery: a dark sedan parked in a warmly lit brick garage at night, tools hung on the back wall."
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__wash" aria-hidden="true" />
      </div>

      <div className="hero__inner container">
        <p className="hero__kicker" data-load>
          Auto repair &amp; service on 4th Avenue, {business.neighborhood}
        </p>

        <h1 id="hero-title" className="hero__title">
          Brooklyn drives better when the work is done right.
        </h1>

        <p className="hero__copy" data-load>
          Brakes, tires and alignment, diagnostics, maintenance, A/C and electrical for domestic and
          import cars. Looked at properly, explained plainly.
        </p>

        <div className="hero__actions" data-load>
          <a className="btn btn--lg" href="#schedule">
            Schedule service
          </a>
          <a className="btn btn--ghost btn--lg" href={business.phone.href}>
            <PhoneGlyph />
            Call the shop
          </a>
        </div>
      </div>

      <p className="hero__meta container" data-load>
        <a
          className="hero__meta-item"
          href={business.google.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {business.address.street}, Brooklyn
        </a>
        <span className="hero__meta-item">
          {business.hours[0].short} · {business.hours[1].short}
        </span>
        <a className="hero__meta-item" href={business.phone.href}>
          {business.phone.display}
        </a>
        <span className="hero__meta-item">
          <span lang="es">Se habla español</span>
        </span>
      </p>
    </section>
  )
}
