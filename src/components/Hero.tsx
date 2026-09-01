import { assetUrl, business } from '../lib/business'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
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
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__grid container">
        <p className="hero__eyebrow" data-load>
          <span>Brooklyn, NY 11215</span>
          <span aria-hidden="true">·</span>
          <span>Domestic &amp; import</span>
        </p>

        <h1 id="hero-title" className="hero__title">
          Brooklyn drives better when the work is done right.
        </h1>

        <div className="hero__aside">
          <p className="hero__copy" data-load>
            Clear diagnostics, precise repairs, and straight answers from a neighborhood shop on 4th
            Avenue.
          </p>
          <div className="hero__actions" data-load>
            <a className="btn btn--ivory btn--lg" href="#estimate">
              Request an estimate
            </a>
            <a className="btn btn--ghost btn--lg" href={business.phone.href}>
              Call {business.phone.display}
            </a>
          </div>
        </div>

        <p className="hero__meta" data-load>
          <span>Mon–Fri 8–6</span>
          <span>Sat 8–3</span>
          <span>Se habla español</span>
        </p>
      </div>
    </section>
  )
}
