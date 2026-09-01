import { business } from '../lib/business'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta container">
        <p className="eyebrow">Ready when you are</p>
        <h2 className="footer__title">
          Bring it to
          <br />
          4th Avenue.
        </h2>
        <div className="footer__actions">
          <a className="btn btn--oxide btn--lg" href={business.phone.href}>
            Call {business.phone.display}
          </a>
          <a className="btn btn--ghost-dark btn--lg" href="#estimate">
            Request an estimate
          </a>
        </div>
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
