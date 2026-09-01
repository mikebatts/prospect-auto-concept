import { assetUrl } from '../lib/business'
import './ServiceBento.css'

export function ServiceBento() {
  return (
    <div className="bento">
      {/* A — brakes image, 7 columns × 2 rows */}
      <article className="bento__card bento__card--a">
        <div className="bento__media">
          <img
            src={assetUrl('prospect-brakes.webp')}
            srcSet={`${assetUrl('prospect-brakes-768.webp')} 768w, ${assetUrl('prospect-brakes.webp')} 1800w`}
            sizes="(min-width: 60rem) 58vw, 100vw"
            width={1800}
            height={1200}
            alt="Concept imagery: gloved hands measuring a brake rotor with a caliper gauge."
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="bento__body">
          <p className="bento__index">01</p>
          <h3>Brakes, measured — not guessed.</h3>
          <p>
            Pads, rotors, calipers, and fluid, with the measurements that tell you how much life is
            left. Pulsing, squeal, or a soft pedal: bring it in.
          </p>
        </div>
      </article>

      {/* B — typographic, 5 columns */}
      <article className="bento__card bento__card--b">
        <p className="bento__index">02</p>
        <h3 className="bento__display">
          Diagnostics
          <br />
          <em>first.</em>
        </h3>
        <p>
          A scan tool reads codes. A technician finds causes. Check-engine lights, warning lamps,
          noises, and drivability complaints start here.
        </p>
      </article>

      {/* C — tires & alignment, 5 columns */}
      <article className="bento__card bento__card--c">
        <p className="bento__index">03</p>
        <h3>Tires &amp; wheel alignment</h3>
        <p>
          Alignment, mounting, balancing, rotation. Uneven wear and a steering pull usually point
          back here.
        </p>
      </article>

      {/* D — maintenance band, 12 columns */}
      <article className="bento__card bento__card--d">
        <div className="bento__band-head">
          <p className="bento__index">04</p>
          <h3>Maintenance, A/C, electrical</h3>
        </div>
        <dl className="bento__band-list">
          <div>
            <dt>Oil &amp; preventive maintenance</dt>
            <dd>
              Oil and filter, fluids, belts, and the factory-scheduled services in your manual.
            </dd>
          </div>
          <div>
            <dt>Air conditioning</dt>
            <dd>
              Weak airflow or warm air. Inspection, leak checks, recharge or repair as needed.
            </dd>
          </div>
          <div>
            <dt>Electrical</dt>
            <dd>Batteries, alternators, starters, lighting, wiring, and intermittent faults.</dd>
          </div>
        </dl>
      </article>
    </div>
  )
}
