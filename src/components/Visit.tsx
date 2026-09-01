import { business } from '../lib/business'
import './Visit.css'

export function Visit() {
  return (
    <div className="visit">
      <p className="tech head__kicker">Visit the shop</p>
      <h2 className="visit__title" id="visit-title">
        On 4th Avenue,
        <br />
        six days a week.
      </h2>

      <dl className="visit__facts">
        <div className="visit__fact">
          <dt className="tech">Address</dt>
          <dd>
            <a
              href={business.google.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="visit__big"
            >
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </a>
            <a
              className="rlink"
              href={business.google.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions on Google Maps
              <span aria-hidden="true"> ↗</span>
            </a>
          </dd>
        </div>

        <div className="visit__fact">
          <dt className="tech">Phone</dt>
          <dd>
            <a className="visit__big" href={business.phone.href}>
              {business.phone.display}
            </a>
            <span className="visit__sub">Se habla español</span>
          </dd>
        </div>

        <div className="visit__fact">
          <dt className="tech">Email</dt>
          <dd>
            <a className="rlink visit__email" href={business.email.href}>
              {business.email.display}
            </a>
          </dd>
        </div>

        <div className="visit__fact visit__fact--hours">
          <dt className="tech">Hours</dt>
          <dd>
            <table className="visit__hours">
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
      </dl>
    </div>
  )
}
