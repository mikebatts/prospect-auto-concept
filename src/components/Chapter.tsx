import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Chapter.css'

/**
 * Plate C aperture. The bodywork image opens from a horizontal slit as it
 * scrolls into view, scrubbed, with the caption sitting in the paper margin.
 * Reduced motion renders the plate fully open.
 */
export function Chapter() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '.plate-c__field',
        { clipPath: 'inset(46% 0 46% 0)' },
        {
          clipPath: 'inset(0% 0 0% 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )
      gsap.fromTo(
        '.plate-c__img',
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      gsap.fromTo(
        '.plate-c__caption',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            end: 'top 35%',
            scrub: true,
          },
        },
      )
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="plate-c" aria-labelledby="plate-c-title">
      <div className="container plate-c__grid">
        <div className="plate-c__caption">
          <p className="tech head__kicker">Under the lamp</p>
          <h2 id="plate-c-title">Look properly. Then talk.</h2>
          <p>
            Inspection light shows what a glance misses. The same habit applies under the hood:
            check it fully, then explain it simply.
          </p>
        </div>

        <figure className="plate-c__fig">
          <div className="plate-c__field">
            <figcaption className="plate-c__label tech">
              <span className="plate-c__label-key">Plate C</span>
              <span>Bodywork under inspection light</span>
              <span className="plate-c__label-note">Concept imagery</span>
            </figcaption>
            <div className="plate-c__img-wrap">
              <img
                className="plate-c__img"
                src={assetUrl('prospect-bodywork.webp')}
                srcSet={`${assetUrl('prospect-bodywork-768.webp')} 768w, ${assetUrl('prospect-bodywork.webp')} 1800w`}
                sizes="(min-width: 60rem) 72vw, 100vw"
                width={1800}
                height={1348}
                alt="Concept imagery: a gloved hand wiping the hood of a black car under striped inspection lights in a brick garage."
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="reg reg--bl" aria-hidden="true" />
            <span className="reg reg--br" aria-hidden="true" />
          </div>
        </figure>
      </div>
    </section>
  )
}
