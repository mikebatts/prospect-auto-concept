import { useEffect, useRef, useState } from 'react'
import { assetUrl, business } from '../lib/business'
import { useReducedMotion } from '../lib/useReducedMotion'
import { Rise } from './Rise'
import './Reputation.css'

/**
 * Short excerpts from public Google reviews of the shop. Text is quoted as
 * written (one all-caps word normalised for tone). No dates are shown because
 * none were captured with the snapshot.
 */
const voices = [
  {
    name: 'Jennifer Abbott',
    quote:
      'We have been bringing our car here for so long the staff has seen our children grow up!',
  },
  {
    name: 'Todd Simon',
    quote:
      'They made a couple very reasonable recommendations for routine maintenance items, but did not give me a hard sell at all.',
  },
  {
    name: 'Omar Swity',
    quote: 'Fair pricing, clear explanations, and quality work done right the first time.',
  },
] as const

/** Reputation and visit: verified customer voices, the dated Google snapshot, and the practical facts. */
export function Reputation() {
  const fill = `${(Number(business.google.rating) / 5) * 100}%`
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const last = voices.length - 1

  // Follow native swipes so the controls and marker stay in step.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const items = Array.from(track.children) as HTMLElement[]
    const onScroll = () => {
      const x = track.scrollLeft
      let nearest = 0
      let best = Infinity
      items.forEach((li, i) => {
        const d = Math.abs(li.offsetLeft - x)
        if (d < best) {
          best = d
          nearest = i
        }
      })
      setIndex(nearest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const go = (to: number) => {
    const track = trackRef.current
    if (!track) return
    const target = Math.min(last, Math.max(0, to))
    const li = track.children[target] as HTMLElement | undefined
    if (!li) return
    track.scrollTo({ left: li.offsetLeft, behavior: reduced ? 'auto' : 'smooth' })
    setIndex(target)
  }

  return (
    <section className="rep section" id="visit" aria-labelledby="visit-title">
      <div className="container">
        <div className="rep__head">
          <p className="kicker" data-reveal>
            Reviews, address and hours
          </p>
          <Rise as="h2" id="visit-title">
            {/* The aperture is aria-hidden; the accessible name is the sentence alone. */}
            {'Fair prices. Clear explanations.'}
            <span className="rep__aperture" aria-hidden="true">
              <img
                src={assetUrl('prospect-storefront-desktop-1440.webp')}
                width={1440}
                height={814}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
            {'Work done right.'}
          </Rise>
        </div>

        <div
          className="voices"
          role="region"
          aria-roledescription="carousel"
          aria-label="What customers say on Google"
        >
          <div className="voices__bar">
            <a
              className="link"
              href={business.google.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read all {business.google.reviewCount} reviews on Google
            </a>
            <div className="voices__controls">
              <ol className="voices__marker" aria-hidden="true">
                {voices.map((v, i) => (
                  <li key={v.name} className={i === index ? 'is-on' : undefined} />
                ))}
              </ol>
              <button
                type="button"
                className="voices__btn"
                aria-label="Previous review"
                aria-disabled={index === 0}
                onClick={() => go(index - 1)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M20 12H5m6-7-7 7 7 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="voices__btn"
                aria-label="Next review"
                aria-disabled={index === last}
                onClick={() => go(index + 1)}
              >
                <svg
                  width="18"
                  height="18"
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
              </button>
            </div>
          </div>

          <ul className="voices__track" role="list" ref={trackRef}>
            {voices.map((v, i) => (
              <li
                key={v.name}
                className={`voices__item${i === index ? ' is-on' : ''}`}
                aria-roledescription="slide"
                aria-label={`Review ${i + 1} of ${voices.length}`}
              >
                <figure className="voices__figure">
                  <blockquote className="voices__quote">
                    <p>{v.quote}</p>
                  </blockquote>
                  <figcaption className="voices__cite">
                    <cite>{v.name}</cite> · Google review
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="rep__grid">
          <div className="rep__rating">
            <p className="rep__score">
              <span className="rep__num">{business.google.rating}</span>
              <span className="rep__stars" aria-hidden="true">
                <span className="rep__stars-base">★★★★★</span>
                <span className="rep__stars-fill" style={{ width: fill }}>
                  ★★★★★
                </span>
              </span>
            </p>
            <p className="rep__line">
              {business.google.rating} on Google · {business.google.reviewCount} reviews
            </p>
            <p className="rep__note">
              Snapshot from {business.google.snapshotDate}. The live figure is on Google and changes
              as new reviews post.
            </p>
            <a
              className="link"
              href={business.google.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the reviews on Google
            </a>
          </div>

          <dl className="rep__facts">
            <div className="rep__fact">
              <dt>Address</dt>
              <dd>
                <a
                  className="rep__big"
                  href={business.google.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state} {business.address.zip}
                </a>
                <span className="rep__sub">{business.neighborhood}</span>
                <a
                  className="link"
                  href={business.google.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directions on Google Maps
                </a>
              </dd>
            </div>

            <div className="rep__fact">
              <dt>Phone</dt>
              <dd>
                <a className="rep__big" href={business.phone.href}>
                  {business.phone.display}
                </a>
                <span className="rep__sub" lang="es">
                  Se habla español
                </span>
              </dd>
            </div>

            <div className="rep__fact">
              <dt>Hours</dt>
              <dd>
                <table className="rep__hours">
                  <caption className="visually-hidden">Weekly opening hours</caption>
                  <tbody>
                    {business.hours.map((h) => (
                      <tr key={h.days}>
                        <th scope="row">{h.days}</th>
                        <td>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>

            <div className="rep__fact">
              <dt>The shop</dt>
              <dd>
                <p className="rep__prose">
                  Domestic and import vehicles. The shop’s own website lists mechanics with 30+
                  years of experience.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
