import { gsap, useGSAP } from './lib/gsap'
import { useReducedMotion } from './lib/useReducedMotion'
import { SkipLink } from './components/SkipLink'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { ServiceAccordion } from './components/ServiceAccordion'
import { Inspection } from './components/Inspection'
import { Chapter } from './components/Chapter'
import { Proof } from './components/Proof'
import { Estimate } from './components/Estimate'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
  const reduced = useReducedMotion()

  // One page-load choreography: masthead, data strip, Plate A opening from a
  // slit, then the margin column. The H1 is the LCP element and is deliberately
  // left out so it renders immediately.
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
          gsap.set('[data-load]', { clearProps: 'all' })
          gsap.set('.hero__img', { clearProps: 'all' })
        },
      })
      tl.fromTo('.mast__row', { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.hero__strip', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .fromTo(
          '.hero__field',
          { opacity: 1, clipPath: 'inset(50% 0 50% 0)' },
          { clipPath: 'inset(0% 0 0% 0)', duration: 1.1, ease: 'power3.inOut' },
          0.25,
        )
        .fromTo(
          '.hero__img',
          { scale: 1.08 },
          { scale: 1, duration: 1.6, ease: 'power2.out' },
          0.25,
        )
        .fromTo(
          ['.hero__copy', '.hero__actions', '.hero__facts'],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          0.55,
        )
    },
    { dependencies: [reduced] },
  )

  return (
    <>
      <SkipLink />
      <Nav />

      <main id="main">
        <Hero />
        <Marquee />

        {/* Interest */}
        <section className="section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="head">
              <div>
                <p className="tech head__kicker">Service ledger</p>
                <h2 id="services-title">What the shop does, in plain terms.</h2>
              </div>
              <p className="head__lede">
                Diagnostics, brakes, tires and alignment, oil changes and preventive maintenance,
                air conditioning, electrical, and factory-scheduled service. Domestic and import,
                under one roof.
              </p>
            </div>
            <ServiceAccordion />
          </div>
        </section>

        {/* Desire */}
        <Inspection />
        <Chapter />

        <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
          <div className="container">
            <div className="head">
              <div>
                <p className="tech head__kicker">Reviews</p>
                <h2 id="reviews-title">The neighborhood already keeps score.</h2>
              </div>
              <p className="head__lede">
                The rating below is a snapshot from Google. The rest is what a visit should make
                obvious, written plainly, not quoted.
              </p>
            </div>
            <Proof />
          </div>
        </section>

        {/* Action */}
        <section className="section action" id="visit" aria-labelledby="visit-title">
          <div className="container action__grid">
            <Visit />
            <Estimate />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
