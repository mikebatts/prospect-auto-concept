import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Story.css'

/**
 * The signature chapter. Desktop: a pinned stage, three scrubbed beats
 * (take a look, explain, your call) using only transform, opacity and clip-path.
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

        // Beat 1: the working bay settles into focus.
        tl.fromTo('.story__img--workshop', { scale: 1.16 }, { scale: 1, duration: 0.36 }, 0)
          .fromTo(
            '.story__cap--1 .story__cap-inner',
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.09 },
            0.03,
          )
          .to('.story__cap--1 .story__cap-inner', { opacity: 0, y: -20, duration: 0.07 }, 0.3)

          // Beat 2: a wipe from the right brings in the alignment rack; the bay recedes and dims.
          .fromTo(
            '.story__frame--alignment',
            { clipPath: 'inset(0 0 0 100%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 0.22 },
            0.38,
          )
          .fromTo('.story__img--alignment', { scale: 1.14 }, { scale: 1, duration: 0.4 }, 0.38)
          .to('.story__img--workshop', { scale: 0.94, opacity: 0.15, duration: 0.24 }, 0.38)
          .fromTo(
            '.story__cap--2 .story__cap-inner',
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.09 },
            0.6,
          )
          .to('.story__cap--2 .story__cap-inner', { opacity: 0, y: -20, duration: 0.06 }, 0.8)

          // Beat 3: the rack frame clips to its left half; the closing statement takes the right.
          .to('.story__frame--alignment', { clipPath: 'inset(0 50% 0 0%)', duration: 0.1 }, 0.86)
          .to('.story__img--alignment', { scale: 1.06, duration: 0.14 }, 0.86)
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
        We take a look, explain what we found, and let you decide what happens next.
      </h2>

      <div className="story__stage">
        <figure className="story__frame story__frame--workshop">
          <img
            className="story__img story__img--workshop"
            src={assetUrl('prospect-workshop.webp')}
            srcSet={`${assetUrl('prospect-workshop-1024.webp')} 1024w, ${assetUrl('prospect-workshop.webp')} 2400w`}
            sizes="100vw"
            width={2400}
            height={1350}
            alt="Concept imagery: a long working auto-repair bay inspired by Prospect Auto’s shop, with blue lifts, a red wall stripe, yellow ramps and everyday vehicles."
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="story__cap story__cap--1">
          <div className="story__cap-inner">
            <p className="kicker kicker--oxide">Take a look</p>
            <h3>We check the car before we quote the work.</h3>
            <p>
              From a state inspection to a warning light or a steering pull, the first step is
              finding the actual problem.
            </p>
          </div>
        </div>

        <figure className="story__frame story__frame--alignment">
          <img
            className="story__img story__img--alignment"
            src={assetUrl('prospect-alignment.webp')}
            srcSet={`${assetUrl('prospect-alignment-768.webp')} 768w, ${assetUrl('prospect-alignment.webp')} 1800w`}
            sizes="100vw"
            width={1800}
            height={1348}
            alt="Concept imagery: a gray sedan on a yellow wheel-alignment rack inside a compact neighborhood repair shop with blue equipment."
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="story__cap story__cap--2">
          <div className="story__cap-inner">
            <p className="kicker kicker--oxide">Explain</p>
            <h3>We tell you what we found.</h3>
            <p>
              What needs attention now, what can wait, and what the repair involves. In English or
              Spanish, whichever you prefer.
            </p>
          </div>
        </div>

        <div className="story__cap story__cap--3">
          <div className="story__cap-inner">
            <p className="kicker kicker--oxide">Your call</p>
            <h3>You decide what happens next.</h3>
            <p>
              Approve what makes sense for you. We’ll do the work and tell you what to keep an eye
              on.
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
