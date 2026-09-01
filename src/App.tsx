import { useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap'
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

  // One page-load choreography (room, bar, then the hero's supporting lines),
  // plus one restrained reveal for section openers. The H1 is the LCP element
  // and is left out so it renders immediately.
  useGSAP(
    () => {
      const root = document.documentElement
      if (reduced) {
        root.classList.add('loaded')
        return
      }
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          root.classList.add('loaded')
          gsap.set('[data-load]', { clearProps: 'opacity,transform' })
        },
      })
      tl.fromTo(
        '.hero__media',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2 },
      )
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
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', overwrite: true },
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
