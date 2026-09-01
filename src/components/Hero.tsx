import { assetUrl, business } from '../lib/business'
import './Hero.css'

/**
 * Light editorial hero. The headline runs ultra-wide across the sheet; the car
 * sits below it as Plate A, a black photographic field that bleeds off the left
 * edge, with an oversized outlined wordmark cropped behind the plate's foot.
 */
export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__sheet">
        <p className="hero__strip" data-load>
          <span className="hero__strip-item">Brooklyn, NY 11215</span>
          <span className="hero__strip-item">Domestic &amp; import</span>
          <span className="hero__strip-item">Se habla español</span>
          <span className="hero__strip-item hero__strip-item--end">Mon–Fri 8–6 · Sat 8–3</span>
        </p>

        <h1 id="hero-title" className="hero__title">
          Brooklyn drives better when the work is <em>done right.</em>
        </h1>

        <div className="hero__aperture">
          <figure className="hero__plate">
            <div className="hero__field" data-load>
              <figcaption className="hero__label tech">
                <span className="hero__label-key">Plate A</span>
                <span>Service bay, 4th Avenue</span>
                <span className="hero__label-note">Concept imagery</span>
              </figcaption>
              <div className="hero__img-wrap">
                <img
                  className="hero__img"
                  src={assetUrl('prospect-hero.webp')}
                  srcSet={`${assetUrl('prospect-hero-1024.webp')} 1024w, ${assetUrl('prospect-hero.webp')} 2560w`}
                  sizes="(min-width: 60rem) 62vw, 100vw"
                  width={2560}
                  height={1099}
                  alt="Concept imagery: a dark sedan parked in a warmly lit brick service bay, tools hung on the back wall."
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <span className="reg reg--tl" aria-hidden="true" />
              <span className="reg reg--tr" aria-hidden="true" />
              <span className="reg reg--bl" aria-hidden="true" />
              <span className="reg reg--br" aria-hidden="true" />
            </div>
            <p className="hero__ghost" aria-hidden="true">
              Prospect
            </p>
          </figure>

          <div className="hero__margin">
            <p className="hero__copy" data-load>
              Clear diagnostics, precise repairs, and straight answers from a neighborhood shop on
              4th Avenue. Domestic and import, in English or Spanish.
            </p>
            <div className="hero__actions" data-load>
              <a className="btn btn--lg" href="#estimate">
                Request an estimate
              </a>
              <a className="btn btn--outline btn--lg" href={business.phone.href}>
                Call {business.phone.display}
              </a>
            </div>
            <dl className="hero__facts" data-load>
              <div>
                <dt className="tech">Address</dt>
                <dd>
                  <a href={business.google.directionsUrl} target="_blank" rel="noopener noreferrer">
                    {business.address.street}, {business.address.city}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="tech">Hours</dt>
                <dd>Mon–Fri 8–6 · Sat 8–3 · Sun closed</dd>
              </div>
              <div>
                <dt className="tech">Service</dt>
                <dd>Diagnostics, brakes, tires, maintenance, A/C, electrical</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
