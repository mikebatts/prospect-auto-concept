import { useRef } from 'react'
import { assetUrl, business } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import { PhoneGlyph } from './Nav'
import './Hero.css'

/**
 * Cinematic storefront hero. The shop and its sign hold the right of the frame;
 * the type sits in the blue-hour negative space on the left (desktop) or low in
 * the frame beneath the sign (mobile), under a directional dark wash.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Image Scale & Fade: as the hero leaves, the street drifts up and dims.
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
          src={assetUrl('prospect-storefront-hero.webp')}
          srcSet={`${assetUrl('prospect-storefront-hero-1024.webp')} 1024w, ${assetUrl('prospect-storefront-hero.webp')} 2400w`}
          sizes="100vw"
          width={2400}
          height={1030}
          alt="Concept imagery: a blue-hour view of a one-bay red-brick Brooklyn auto shop inspired by Prospect Auto’s storefront, with the garage open and a sedan entering."
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__wash" aria-hidden="true" />
      </div>

      <div className="hero__inner container">
        <p className="hero__kicker" data-load>
          Prospect Auto Repair · {business.address.street}
        </p>

        <h1 id="hero-title" className="hero__title">
          The shop Brooklyn drivers come back to.
        </h1>

        <p className="hero__copy" data-load>
          State inspections, maintenance and repairs—with fair prices, clear explanations and no
          hard sell.
        </p>

        <div className="hero__actions" data-load>
          <a className="btn btn--lg" href={business.phone.href}>
            <PhoneGlyph />
            Call the shop
          </a>
          <a className="btn btn--ghost btn--lg" href="#schedule">
            Request service
          </a>
        </div>
      </div>

      <p className="hero__meta container" data-load>
        <a
          className="hero__meta-item"
          href={business.google.mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {business.google.rating} on Google · {business.google.reviewCount} reviews
        </a>
        <span className="hero__meta-item">Mon–Sat</span>
        <span className="hero__meta-item">
          <span lang="es">Se habla español</span>
        </span>
        <a
          className="hero__meta-item"
          href={business.google.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {business.address.street}, Brooklyn
        </a>
      </p>
    </section>
  )
}
