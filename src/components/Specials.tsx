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
            Specials
          </p>
          <h2 id="specials-title" data-reveal>
            Ask about current specials.
          </h2>
          <p className="specials__copy">
            No offer is published on this preview. Call the shop to ask what’s available.
          </p>
        </div>
        <a className="btn btn--ghost btn--lg" href={business.phone.href}>
          Call {business.phone.display}
        </a>
      </div>
    </aside>
  )
}
