import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Story.css'

/**
 * The signature chapter. Desktop: a pinned stage, three scrubbed beats
 * (inspect, explain, repair) using only transform, opacity and clip-path.
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
        How it works: we check the car, explain what we find, and then talk through the repair.
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
            <p className="kicker kicker--oxide">Inspect</p>
            <h3>We check the car first.</h3>
            <p>
              On a brake job, that means measuring rotor thickness and pad life instead of guessing
              from the noise.
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
            <p className="kicker kicker--oxide">Explain</p>
            <h3>We explain what we find before any work begins.</h3>
            <p>
              What needs fixing now, what can wait, and why. In English or Spanish, whichever you
              prefer.
            </p>
          </div>
        </div>

        <div className="story__cap story__cap--3">
          <div className="story__cap-inner">
            <p className="kicker kicker--oxide">Repair</p>
            <h3>Then we talk through the repair.</h3>
            <p>
              You decide what gets done now. We do the work and tell you what to watch for next.
            </p>
            <a className="btn btn--lg story__cta" href="#schedule">
              Request an appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
