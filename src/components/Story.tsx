import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Story.css'

const chapters = [
  {
    n: 1,
    label: 'Take a look',
    title: 'We check the car before we quote the work.',
    body: 'From a state inspection to a warning light or a steering pull, the first step is finding the actual problem.',
    img: {
      src: 'prospect-workshop.webp',
      srcSet: 'prospect-workshop-1024.webp 1024w, prospect-workshop.webp 2400w',
      width: 2400,
      height: 1350,
      alt: 'Concept imagery: a long working auto-repair bay inspired by Prospect Auto’s shop, with blue lifts, a red wall stripe, yellow ramps and everyday vehicles.',
    },
  },
  {
    n: 2,
    label: 'Explain',
    title: 'We tell you what we found.',
    body: 'What needs attention now, what can wait, and what the repair involves. In English or Spanish, whichever you prefer.',
    img: {
      src: 'prospect-alignment.webp',
      srcSet: 'prospect-alignment-768.webp 768w, prospect-alignment.webp 1800w',
      width: 1800,
      height: 1348,
      alt: 'Concept imagery: a gray sedan on a yellow wheel-alignment rack inside a compact neighborhood repair shop with blue equipment.',
    },
  },
  {
    n: 3,
    label: 'Your call',
    title: 'You decide what happens next.',
    body: 'Approve what makes sense for you. We’ll do the work and tell you what to keep an eye on.',
    img: {
      src: 'prospect-alignment.webp',
      srcSet: 'prospect-alignment-768.webp 768w, prospect-alignment.webp 1800w',
      width: 1800,
      height: 1348,
      alt: 'Concept imagery: the alignment rack’s yellow ramps, a blue lift post and an orange service machine along the shop’s left wall.',
    },
  },
] as const

/** Turns "file.webp 1024w, file2.webp 2400w" into a srcset with resolved asset URLs. */
function srcSet(list: string) {
  return list
    .split(',')
    .map((entry) => {
      const [file = '', descriptor = ''] = entry.trim().split(' ')
      return `${assetUrl(file)} ${descriptor}`
    })
    .join(', ')
}

/**
 * The signature chapter: take a look, explain, your call.
 *
 * Desktop with motion: one pinned stage, three scrubbed beats using only
 * transform, opacity and clip-path.
 *
 * Phones and tablets with motion: three full-height film chapters. Each is
 * sticky, so the next one slides up and covers it, while the covered image
 * scales down and dims (Image Scale & Fade tied to scroll).
 *
 * Reduced motion: three static chapters in reading order.
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
        tl.fromTo('.story__img--1', { scale: 1.16 }, { scale: 1, duration: 0.36 }, 0)
          .fromTo(
            '.story__cap--1',
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.09 },
            0.03,
          )
          .to('.story__cap--1', { opacity: 0, y: -20, duration: 0.07 }, 0.3)

          // Beat 2: a wipe from the right brings in the alignment rack; the bay recedes and dims.
          .fromTo(
            '.story__frame--2',
            { clipPath: 'inset(0 0 0 100%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 0.22 },
            0.38,
          )
          .fromTo('.story__img--2', { scale: 1.14 }, { scale: 1, duration: 0.4 }, 0.38)
          .to('.story__img--1', { scale: 0.94, opacity: 0.15, duration: 0.24 }, 0.38)
          .fromTo(
            '.story__cap--2',
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.09 },
            0.6,
          )
          .to('.story__cap--2', { opacity: 0, y: -20, duration: 0.06 }, 0.8)

          // Beat 3: the rack's left half (a different crop) takes the left; the closing statement takes the right.
          .fromTo('.story__frame--3', { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.86)
          .fromTo('.story__img--3', { scale: 1.1 }, { scale: 1, duration: 0.14 }, 0.86)
          .to('.story__img--2', { opacity: 0.12, duration: 0.1 }, 0.86)
          .fromTo(
            '.story__cap--3',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.08 },
            0.9,
          )
          .to({}, { duration: 0.02 }, 0.98)
      })

      mm.add('(max-width: 59.99rem)', () => {
        const stage = ref.current?.querySelector<HTMLElement>('.story__stage')
        const items = gsap.utils.toArray<HTMLElement>('.story__chapter', ref.current)
        if (!stage || items.length === 0) return

        // Chapters are sticky, so their own boxes move; triggers are computed
        // from the stage (never sticky) plus the in-flow heights of the
        // chapters before each one. Recomputed on every refresh.
        const top = () => stage.getBoundingClientRect().top + window.scrollY
        const before = (i: number) => items.slice(0, i).reduce((s, el) => s + el.offsetHeight, 0)
        const vh = () => window.innerHeight

        items.forEach((chapter, i) => {
          const img = chapter.querySelector<HTMLElement>('.story__img')
          const cap = chapter.querySelector<HTMLElement>('.story__cap')
          if (!img || !cap) return

          // Entering: the image settles from a slight zoom and the copy rises.
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: () => top() + before(i) - vh(),
                end: () => top() + before(i),
                scrub: true,
              },
            },
          )
          gsap.fromTo(
            cap,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: () => top() + before(i) - vh() * 0.55,
                end: () => top() + before(i) - vh() * 0.1,
                scrub: true,
              },
            },
          )

          // Being covered: the chapter underneath recedes and dims as the next slides over.
          const next = items[i + 1]
          if (next) {
            gsap.to(img, {
              scale: 1.08,
              yPercent: -6,
              opacity: 0.3,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: () => top() + before(i + 1) - vh(),
                end: () => top() + before(i + 1),
                scrub: true,
              },
            })
          }
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
        {chapters.map((c) => (
          <article
            key={c.n}
            className={`story__chapter story__chapter--${c.n}`}
            aria-labelledby={`story-h-${c.n}`}
          >
            <figure className={`story__frame story__frame--${c.n}`}>
              <img
                className={`story__img story__img--${c.n}`}
                src={assetUrl(c.img.src)}
                srcSet={srcSet(c.img.srcSet)}
                sizes="100vw"
                width={c.img.width}
                height={c.img.height}
                alt={c.img.alt}
                loading={c.n === 2 ? 'eager' : 'lazy'}
                fetchPriority={c.n === 2 ? 'low' : undefined}
                decoding="async"
              />
            </figure>

            <div className={`story__cap story__cap--${c.n}`}>
              <div className="story__cap-inner">
                <p className="kicker kicker--oxide">{c.label}</p>
                <h3 id={`story-h-${c.n}`}>{c.title}</h3>
                <p>{c.body}</p>
                {c.n === 3 && (
                  <a className="btn btn--lg story__cta" href="#schedule">
                    Request service
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
