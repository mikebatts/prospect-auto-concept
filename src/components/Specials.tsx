import { useRef } from 'react'
import { assetUrl, business } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import { PhoneGlyph } from './Nav'
import { Rise } from './Rise'
import './Specials.css'

/**
 * Conversion chapter for a verified service. The shop is a New York State
 * inspection station (it is on the sign), so the chapter asks one question
 * and offers the two real ways to answer it. No walk-in, wait-time,
 * availability, price or promotion claims.
 */
export function Specials() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // The sign frame drifts a few percent as the chapter passes: the same
  // settle-and-drift the other frames use, at the quiet end of the range.
  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '.inspect__img',
        { yPercent: -4, scale: 1.06 },
        {
          yPercent: 4,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
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
    <section ref={ref} className="inspect" aria-labelledby="inspect-title">
      <figure className="inspect__media" aria-hidden="true">
        {/* The real sign: the storefront cropped to "N.Y.S INSPECTION" and the open bay. */}
        <picture>
          <source
            media="(orientation: portrait)"
            srcSet={`${assetUrl('prospect-storefront-mobile-960.webp')} 960w, ${assetUrl('prospect-storefront-mobile.webp')} 1744w`}
            sizes="100vw"
            width={1744}
            height={2336}
          />
          <img
            className="inspect__img"
            src={assetUrl('prospect-storefront-desktop.webp')}
            srcSet={`${assetUrl('prospect-storefront-desktop-1440.webp')} 1440w, ${assetUrl('prospect-storefront-desktop.webp')} 2688w`}
            sizes="(min-width: 60rem) 50vw, 100vw"
            width={2688}
            height={1520}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </figure>

      <div className="inspect__body">
        <div className="inspect__inner">
          <p className="kicker inspect__kicker" data-reveal>
            New York State inspections
          </p>
          <Rise as="h2" id="inspect-title">
            Due for an inspection?
          </Rise>
          <p className="inspect__copy" data-reveal>
            Call the shop or request a time online.
          </p>
          <div className="inspect__actions" data-reveal>
            <a className="btn btn--lg" href={business.phone.href}>
              <PhoneGlyph />
              Call the shop
            </a>
            <a className="link inspect__link" href="#schedule">
              Request service
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
