import { gsap, useGSAP } from './lib/gsap'
import { useReducedMotion } from './lib/useReducedMotion'
import { SkipLink } from './components/SkipLink'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { ServiceBento } from './components/ServiceBento'
import { ServiceAccordion } from './components/ServiceAccordion'
import { Statement } from './components/Statement'
import { Process } from './components/Process'
import { Chapter } from './components/Chapter'
import { Proof } from './components/Proof'
import { Estimate } from './components/Estimate'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
  const reduced = useReducedMotion()

  // One page-load choreography: hero image, nav, then hero supporting text in order.
  // The H1 is the LCP element and is deliberately left out so it renders immediately.
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
        },
      })
      tl.fromTo(
        '.hero__media',
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.0 },
      )
        .fromTo('.nav__bar', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.45 }, 0.2)
        .fromTo(
          ['.hero__eyebrow', '.hero__copy', '.hero__actions', '.hero__meta'],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
          0.35,
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
            <div className="section-head">
              <div>
                <p className="eyebrow eyebrow--oxide">Services</p>
                <h2 id="services-title">What the shop does, in plain terms.</h2>
              </div>
              <p>
                Diagnostics, brakes, tires and alignment, oil changes and preventive maintenance,
                air conditioning, electrical, and factory-scheduled service. Domestic and import.
              </p>
            </div>
            <ServiceBento />
            <div className="services__accordion">
              <p className="eyebrow">Service by service</p>
              <ServiceAccordion />
            </div>
          </div>
        </section>

        {/* Desire */}
        <section className="standards" id="standards" aria-labelledby="standards-title">
          <Statement />
          <div className="container process-wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow eyebrow--oxide">How a visit goes</p>
                <h2 id="standards-title">Diagnose. Decide. Drive.</h2>
              </div>
              <p>
                Three steps, each one explained before the next begins. No specific turnaround
                promises here — just a clear order of operations.
              </p>
            </div>
            <Process />
          </div>
        </section>

        <Chapter />

        <section className="section" id="reviews" aria-labelledby="reviews-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow eyebrow--oxide">Reviews</p>
                <h2 id="reviews-title">The neighborhood already keeps score.</h2>
              </div>
              <p>
                The rating below is a snapshot from Google. The rest is what a visit should make
                obvious — written plainly, not quoted.
              </p>
            </div>
            <Proof />
          </div>
        </section>

        {/* Action */}
        <section className="section section--dark action" id="visit" aria-labelledby="visit-title">
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
