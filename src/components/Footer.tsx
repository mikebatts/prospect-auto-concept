import { business } from '../lib/business'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__wordmark">
            Prospect Auto
            <span>Repair &amp; Service</span>
          </p>
          <p className="footer__address">
            <a href={business.google.directionsUrl} target="_blank" rel="noopener noreferrer">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </a>
          </p>
          <p>
            <a href={business.phone.href}>{business.phone.display}</a>
            <br />
            <a className="footer__email" href={business.email.href}>
              {business.email.display}
            </a>
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#standards">How it works</a>
            </li>
            <li>
              <a href="#visit">Visit</a>
            </li>
            <li>
              <a href="#schedule">Request service</a>
            </li>
            <li>
              <a href={business.google.mapsSearchUrl} target="_blank" rel="noopener noreferrer">
                Reviews on Google
              </a>
            </li>
          </ul>
        </nav>

        <dl className="footer__hours">
          {business.hours.map((h) => (
            <div key={h.days}>
              <dt>{h.days}</dt>
              <dd>{h.time}</dd>
            </div>
          ))}
          <div>
            <dt lang="es">Se habla español</dt>
            <dd>Domestic &amp; import</dd>
          </div>
        </dl>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p className="footer__disclaimer">
            Independent concept preview by{' '}
            <a href="https://mikebatts.net/" target="_blank" rel="noopener noreferrer">
              mikebatts.net
            </a>{' '}
            — not the official Prospect Auto website.
          </p>
          <p className="footer__fine">
            Imagery is generated concept art and does not show the actual shop. The schedule form is
            a demonstration and sends nothing.
          </p>
        </div>
      </div>
    </footer>
  )
}
