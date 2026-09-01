import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Story.css'

/**
 * The signature chapter. Desktop: a pinned stage, three scrubbed beats
 * (measure, look, then the work) using only transform, opacity and clip-path.
 * Mobile and reduced motion: the same content stacked in reading order.
 */
export function Story() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()

      mm.add('(min-width: 60rem)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none', immediateRender: false },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        })

        // Beat 1: the rotor comes into focus.
        tl.fromTo('.story__img--brakes', { scale: 1.16 }, { scale: 1, duration: 0.36 }, 0)
          .fromTo(
            '.story__cap--1 .story__cap-inner',
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.09 },
            0.03,
          )
          .to('.story__cap--1 .story__cap-inner', { opacity: 0, y: -20, duration: 0.07 }, 0.3)

          // Beat 2: the wipe to the inspection lamp; the rotor recedes and dims.
          .fromTo(
            '.story__frame--body',
            { clipPath: 'inset(0 0 0 100%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 0.22 },
            0.38,
          )
          .fromTo('.story__img--body', { scale: 1.14 }, { scale: 1, duration: 0.4 }, 0.38)
          .to('.story__img--brakes', { scale: 0.94, opacity: 0.15, duration: 0.24 }, 0.38)
          .fromTo(
            '.story__cap--2 .story__cap-inner',
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.09 },
            0.6,
          )
          .to('.story__cap--2 .story__cap-inner', { opacity: 0, y: -20, duration: 0.06 }, 0.8)

          // Beat 3: the frame splits; the closing statement takes the right half.
          .to('.story__frame--body', { clipPath: 'inset(0 50% 0 0%)', duration: 0.1 }, 0.86)
          .to('.story__img--body', { scale: 1.06, duration: 0.14 }, 0.86)
          .fromTo(
            '.story__cap--3 .story__cap-inner',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.08 },
            0.9,
          )
          .to({}, { duration: 0.02 }, 0.98)
      })

      // Mobile: stacked frames settle in as they enter (Image Scale & Fade).
      mm.add('(max-width: 59.99rem)', () => {
        gsap.utils.toArray<HTMLElement>('.story__frame').forEach((frame) => {
          gsap.fromTo(
            frame.querySelector('img'),
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                start: 'top bottom',
                end: 'bottom 40%',
                scrub: true,
              },
            },
          )
        })
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section
      ref={ref}
      className={`story${reduced ? ' is-static' : ''}`}
      id="standards"
      aria-labelledby="story-title"
    >
      <h2 id="story-title" className="visually-hidden">
        How the work gets done
      </h2>

      <div className="story__stage">
        <figure className="story__frame story__frame--brakes">
          <img
            className="story__img story__img--brakes"
            src={assetUrl('prospect-brakes.webp')}
            srcSet={`${assetUrl('prospect-brakes-768.webp')} 768w, ${assetUrl('prospect-brakes.webp')} 1800w`}
            sizes="100vw"
            width={1800}
            height={1200}
            alt="Concept imagery: gloved hands measuring a brake rotor with a caliper gauge."
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="story__cap story__cap--1">
          <div className="story__cap-inner">
            <p className="kicker kicker--oxide">Measure</p>
            <h3>A brake job starts with a number.</h3>
            <p>
              Rotor thickness and pad life are read before anything is recommended, so the advice is
              a measurement rather than a hunch.
            </p>
          </div>
        </div>

        <figure className="story__frame story__frame--body">
          <img
            className="story__img story__img--body"
            src={assetUrl('prospect-bodywork.webp')}
            srcSet={`${assetUrl('prospect-bodywork-768.webp')} 768w, ${assetUrl('prospect-bodywork.webp')} 1800w`}
            sizes="100vw"
            width={1800}
            height={1348}
            alt="Concept imagery: a gloved hand wiping the hood of a black car under striped inspection lights in a brick garage."
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="story__cap story__cap--2">
          <div className="story__cap-inner">
            <p className="kicker kicker--oxide">Look</p>
            <h3>Under the lamp, nothing hides.</h3>
            <p>
              Inspection light shows what a glance misses. The same habit applies under the hood:
              check it fully, then explain it simply, in English or Spanish.
            </p>
          </div>
        </div>

        <div className="story__cap story__cap--3">
          <div className="story__cap-inner">
            <p className="kicker kicker--oxide">Then the work</p>
            <h3>What it needs now. What can wait. What comes next.</h3>
            <p>Three answers before the repair begins. Then the repair.</p>
            <a className="btn btn--lg story__cta" href="#schedule">
              Schedule service
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
