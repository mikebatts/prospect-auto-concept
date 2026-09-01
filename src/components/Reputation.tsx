import { business } from '../lib/business'
import './Reputation.css'

/** Quiet, high-trust proof: the dated Google snapshot and the practical facts. No quote cards. */
export function Reputation() {
  const fill = `${(Number(business.google.rating) / 5) * 100}%`

  return (
    <section className="rep section" id="visit" aria-labelledby="visit-title">
      <div className="container">
        <div className="rep__head">
          <p className="kicker" data-reveal>
            Reputation and location
          </p>
          <h2 id="visit-title" data-reveal>
            The neighborhood already keeps score.
          </h2>
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
              Research snapshot taken {business.google.snapshotDate}. Ratings and counts change as
              reviews post; the live figure is on Google.
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
                  Domestic and import vehicles under one roof. The shop's own site states that its
                  mechanics have 30+ years of experience.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
