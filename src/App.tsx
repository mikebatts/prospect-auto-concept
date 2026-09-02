import { useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap'
import { DUR, EASE } from './lib/motion'
import { useReducedMotion } from './lib/useReducedMotion'
import type { ServiceKey } from './lib/business'
import { SkipLink } from './components/SkipLink'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ServiceIndex } from './components/ServiceIndex'
import { Story } from './components/Story'
import { Reputation } from './components/Reputation'
import { Specials } from './components/Specials'
import { Schedule } from './components/Schedule'
import { CallBar } from './components/CallBar'
import { Footer } from './components/Footer'

type Pick = { key: ServiceKey; n: number } | null

export default function App() {
  const reduced = useReducedMotion()
  const [pick, setPick] = useState<Pick>(null)

  // One page-load choreography (frame settles, bar, then the hero's supporting
  // lines) plus one restrained reveal for kickers and ledes. The hero image is
  // the LCP element: it is never faded and carries no [data-load] gate, so it
  // paints at full opacity as soon as it decodes. Its entry is a transform-only
  // scale settle, which does not delay first paint. Headings use the masked
  // rise in Rise.tsx; photographic frames carry their own scrubs.
  useGSAP(
    () => {
      const root = document.documentElement
      if (reduced) {
        root.classList.add('loaded')
        return
      }
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        onComplete: () => {
          root.classList.add('loaded')
          gsap.set('[data-load]', { clearProps: 'opacity,transform' })
          gsap.set('.hero__media', { clearProps: 'transform' })
        },
      })
      tl.fromTo('.hero__media', { scale: 1.04 }, { scale: 1, duration: DUR.settle })
        .fromTo('.nav__bar', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3)
        .fromTo(
          ['.hero__kicker', '.hero__copy', '.hero__actions', '.hero__meta'],
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.45,
        )

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => {
          els.forEach((el) => el.classList.add('is-in'))
          gsap.fromTo(
            els,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.08,
              delay: DUR.lag,
              ease: EASE,
              overwrite: true,
            },
          )
        },
      })
    },
    { dependencies: [reduced], revertOnUpdate: true },
  )

  const onPick = (key: ServiceKey) => setPick((p) => ({ key, n: (p?.n ?? 0) + 1 }))

  return (
    <>
      <SkipLink />
      <Nav />

      <main id="main">
        <Hero />
        <ServiceIndex onPick={onPick} />
        <Story />
        <Reputation />
        <Specials />
        <Schedule pick={pick} />
      </main>

      <Footer />
      <CallBar />
    </>
  )
}
