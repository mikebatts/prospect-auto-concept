import { assetUrl, business } from '../lib/business'
import { PhoneGlyph } from './Nav'
import './Specials.css'

/**
 * Conversion chapter for a verified service. This slot used to be a specials
 * strip; the shop is a New York State inspection station (it is on the sign),
 * so the chapter asks one question and offers the two real ways to answer it.
 * No walk-in, wait-time, availability, price or promotion claims.
 */
export function Specials() {
  return (
    <section className="inspect" aria-labelledby="inspect-title">
      <figure className="inspect__media" aria-hidden="true">
        <img
          src={assetUrl('prospect-storefront-hero.webp')}
          srcSet={`${assetUrl('prospect-storefront-hero-1024.webp')} 1024w, ${assetUrl('prospect-storefront-hero.webp')} 2400w`}
          sizes="(min-width: 60rem) 50vw, 100vw"
          width={2400}
          height={1030}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="inspect__body">
        <div className="inspect__inner">
          <p className="kicker inspect__kicker" data-reveal>
            New York State inspections
          </p>
          <h2 id="inspect-title" data-reveal>
            Due for an inspection?
          </h2>
          <p className="inspect__copy">Call the shop or request a time online.</p>
          <div className="inspect__actions">
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
