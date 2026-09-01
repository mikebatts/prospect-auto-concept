import { business } from '../lib/business'
import './Specials.css'

/** Update-ready strip for current specials. No discount is invented here;
    offers are available by phone. Swap the copy when a real offer exists. */
export function Specials() {
  return (
    <aside className="specials" aria-labelledby="specials-title">
      <div className="container specials__inner">
        <div className="specials__text">
          <p className="kicker" data-reveal>
            Current specials
          </p>
          <h2 id="specials-title" data-reveal>
            Seasonal service offers change through the year.
          </h2>
          <p className="specials__copy">
            Current offers are available by phone. Nothing on this page is a published discount.
          </p>
        </div>
        <a className="btn btn--ghost btn--lg" href={business.phone.href}>
          Ask about current specials
        </a>
      </div>
    </aside>
  )
}
