import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Chapter.css'

/** Pinned visual chapter. Subtle image scale + caption fade, scrubbed on scroll. */
export function Chapter() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 60rem)', () => {
        gsap.fromTo(
          '.chapter__img',
          { scale: 1.12 },
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
          '.chapter__caption',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 40%',
              end: 'top 5%',
              scrub: true,
            },
          },
        )
      })
      // Mobile: gentler scale only.
      mm.add('(max-width: 59.99rem)', () => {
        gsap.fromTo(
          '.chapter__img',
          { scale: 1.06 },
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
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="chapter" aria-labelledby="chapter-title">
      <div className="chapter__sticky">
        <img
          className="chapter__img"
          src={assetUrl('prospect-bodywork.webp')}
          srcSet={`${assetUrl('prospect-bodywork-768.webp')} 768w, ${assetUrl('prospect-bodywork.webp')} 1800w`}
          sizes="100vw"
          width={1800}
          height={1348}
          alt="Concept imagery: a gloved hand wiping the hood of a black car under striped inspection lights in a brick garage."
          loading="lazy"
          decoding="async"
        />
        <div className="chapter__shade" aria-hidden="true" />
        <div className="chapter__caption container">
          <p className="eyebrow">Under the lamp</p>
          <h2 id="chapter-title">Look properly. Then talk.</h2>
          <p>
            Inspection light shows what a glance misses. The same habit applies under the hood:
            check it fully, then explain it simply.
          </p>
        </div>
      </div>
    </section>
  )
}
