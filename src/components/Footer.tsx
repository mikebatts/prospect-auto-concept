import { business } from '../lib/business'
import './Footer.css'

/** Closing black field: the one large dark surface on the sheet. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__field">
        <div className="container footer__cta">
          <div className="footer__lead">
            <p className="tech footer__kicker">Ready when you are</p>
            <h2 className="footer__title">
              Bring it to
              <br />
              4th Avenue.
            </h2>
          </div>
          <div className="footer__side">
            <div className="footer__actions">
              <a className="btn btn--oxide btn--lg" href={business.phone.href}>
                Call {business.phone.display}
              </a>
              <a className="btn btn--outline-paper btn--lg" href="#estimate">
                Request an estimate
              </a>
            </div>
            <dl className="footer__facts">
              <div>
                <dt className="tech">Address</dt>
                <dd>
                  <a href={business.google.directionsUrl} target="_blank" rel="noopener noreferrer">
                    {business.address.full}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="tech">Hours</dt>
                <dd>Mon–Fri 8–6 · Sat 8–3 · Sun closed</dd>
              </div>
              <div>
                <dt className="tech">Email</dt>
                <dd>
                  <a href={business.email.href}>{business.email.display}</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="footer__ghost" aria-hidden="true">
          Prospect Auto
        </p>
        <span className="reg reg--tl" aria-hidden="true" />
        <span className="reg reg--tr" aria-hidden="true" />
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p className="footer__name">
            {business.name} · {business.address.full}
          </p>
          <p className="footer__disclaimer">
            Independent concept preview by{' '}
            <a href="https://mikebatts.net/" target="_blank" rel="noopener noreferrer">
              mikebatts.net
            </a>{' '}
            — not the official Prospect Auto website.
          </p>
        </div>
      </div>
    </footer>
  )
}
