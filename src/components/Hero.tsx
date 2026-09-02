import { useRef } from 'react'
import { assetUrl, business } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import { PhoneGlyph } from './Nav'
import './Hero.css'

const mobile = {
  src: assetUrl('prospect-storefront-mobile.webp'),
  srcSet: `${assetUrl('prospect-storefront-mobile-640.webp')} 640w, ${assetUrl('prospect-storefront-mobile-960.webp')} 960w, ${assetUrl('prospect-storefront-mobile-1280.webp')} 1280w, ${assetUrl('prospect-storefront-mobile.webp')} 1744w`,
}

const desktop = {
  src: assetUrl('prospect-storefront-desktop.webp'),
  srcSet: `${assetUrl('prospect-storefront-desktop-1440.webp')} 1440w, ${assetUrl('prospect-storefront-desktop.webp')} 2688w`,
}

/**
 * Storefront hero, art-directed by orientation.
 *
 * Portrait (phones, portrait tablets): a sign-to-bay diptych. The 3:4 frame
 * holds the top of the stage with the blue sign and the lit bay uncovered;
 * the headline, copy and actions sit beneath it on the wet street as it
 * fades to lacquer. Nothing is ever laid over the sign or the bay.
 *
 * Landscape (desktop, landscape tablets and phones): the 16:9 frame fills
 * the stage, the shop holds the right, and the type sits in the dark street
 * on the left.
 *
 * The image is the LCP asset: one orientation-correct file is preloaded in
 * index.html and fetched at high priority. The media frame carries no
 * [data-load] gate and is never faded, so it paints at full opacity the
 * moment it decodes; App.tsx gives it a transform-only settle. The H1
 * renders immediately.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // As the hero leaves, the frame drifts and dims: subtle in portrait where
  // the frame is a short panel, a touch deeper in the wide landscape stage.
  // Fine pointers only: on touch devices the frame sits still under native
  // scrolling, so nothing scrubs against Safari's collapsing chrome.
  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()

      mm.add('(orientation: portrait) and (pointer: fine)', () => {
        gsap.to('.hero__img', {
          yPercent: -6,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      mm.add('(orientation: landscape) and (pointer: fine)', () => {
        gsap.to('.hero__img', {
          yPercent: 8,
          scale: 1.05,
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
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media">
        <picture className="hero__picture">
          <source
            media="(orientation: portrait)"
            srcSet={mobile.srcSet}
            sizes="100vw"
            width={1744}
            height={2336}
          />
          <img
            className="hero__img"
            src={desktop.src}
            srcSet={desktop.srcSet}
            sizes="100vw"
            width={2688}
            height={1520}
            alt="Concept imagery: Prospect Auto Repair’s blue-and-white sign over the open one-bay red-brick garage on 4th Avenue at dusk, the N.Y.S. inspection bay lit inside with a sedan on the lift and wet pavement out front."
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
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
