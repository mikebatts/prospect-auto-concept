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
            Offers change through the year. Ask when you call.
          </h2>
          <p className="specials__copy">
            No discount is published on this preview. Ask the shop about current offers when you
            call.
          </p>
        </div>
        <a className="btn btn--ghost btn--lg" href={business.phone.href}>
          Call the shop
        </a>
      </div>
    </aside>
  )
}
