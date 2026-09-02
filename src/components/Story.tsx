import { useRef } from 'react'
import { assetUrl } from '../lib/business'
import { gsap, useGSAP } from '../lib/gsap'
import { RISE_FROM, riseLinesAt } from '../lib/motion'
import { useReducedMotion } from '../lib/useReducedMotion'
import { Rise } from './Rise'
import './Story.css'

const chapters = [
  {
    n: 1,
    label: 'Take a look',
    title: 'We check the car before we quote the work.',
    body: 'From a state inspection to a warning light or a steering pull, the first step is finding the actual problem.',
    img: {
      src: 'prospect-diagnostic-commissioned.webp',
      srcSet:
        'prospect-diagnostic-commissioned-1440.webp 1440w, prospect-diagnostic-commissioned.webp 2336w',
      sizes: '100vw',
      width: 2336,
      height: 1744,
      alt: 'Concept imagery: a mechanic in black gloves reads a handheld diagnostic scanner over an open engine bay, with the shop’s blue lift posts and red block wall behind.',
    },
  },
  {
    n: 2,
    label: 'Explain',
    title: 'We tell you what we found.',
    body: 'What needs attention now, what can wait, and what the repair involves. In English or Spanish, whichever you prefer.',
    img: {
      src: 'prospect-alignment-commissioned.webp',
      srcSet:
        'prospect-alignment-commissioned-960.webp 960w, prospect-alignment-commissioned.webp 1744w',
      sizes: '(min-width: 60rem) 46vw, 100vw',
      width: 1744,
      height: 2336,
      alt: 'Concept imagery: a silver sedan on the yellow wheel-alignment ramps under the “Computerized Wheel Alignment & Balancing” sign, between a blue lift post and red tool chests.',
    },
  },
  {
    n: 3,
    label: 'Your call',
    title: 'You decide what happens next.',
    body: 'Approve what makes sense for you. We’ll do the work and tell you what to keep an eye on.',
    img: {
      src: 'prospect-workshop-commissioned.webp',
      srcSet:
        'prospect-workshop-commissioned-1440.webp 1440w, prospect-workshop-commissioned.webp 2688w',
      sizes: '100vw',
      width: 2688,
      height: 1520,
      alt: 'Concept imagery: the shop’s left wall of red parts shelving and a gray sedan on a blue two-post lift, looking down the bay toward the alignment rack.',
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
 * Desktop with motion: one pinned stage cut like three camera edits. The
 * diagnostic frame settles and its caption rises; the vertical alignment
 * frame wipes in as a right-hand panel while the first frame recedes; then
 * the panel drifts across the sheet to the left and the closing statement
 * takes the right. Transform, opacity and clip-path only.
 *
 * Phones and tablets with motion: three full-height film chapters. Each is
 * sticky, so the next slides up and covers it, while the covered frame
 * recedes, drifts a little and dims.
 *
 * Short viewports and reduced motion: three static chapters in reading order.
 */
export function Story() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      const mm = gsap.matchMedia()
      const inners = (n: number) =>
        gsap.utils.toArray<HTMLElement>(`.story__cap--${n} .rise__i`, ref.current)

      mm.add('(min-width: 60rem) and (min-height: 30.01rem)', () => {
        const kicker = (n: number) => `.story__cap--${n} .kicker`
        const body = (n: number) => `.story__cap--${n} .story__body`
        const stageInner = '.story__cap--3 .story__cap-inner'

        // Every caption piece starts hidden and is brought in on its own beat,
        // so nothing from a later cut is visible or tappable early.
        gsap.set([inners(1), inners(2), inners(3)].flat(), { yPercent: RISE_FROM })
        gsap.set([kicker(1), kicker(2), kicker(3), body(1), body(2), body(3), '.story__cta'], {
          opacity: 0,
          y: 24,
        })
        gsap.set(stageInner, { pointerEvents: 'none' })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        })

        // Cut 1: the diagnostic frame settles, then the caption rises after it.
        tl.fromTo('.story__img--1', { scale: 1.1 }, { scale: 1, duration: 0.4 }, 0).to(
          kicker(1),
          { opacity: 1, y: 0, duration: 0.06 },
          0.03,
        )
        riseLinesAt(tl, inners(1), 0.06)
        tl.to(body(1), { opacity: 1, y: 0, duration: 0.07 }, 0.12)
          .to('.story__cap--1', { opacity: 0, y: -24, duration: 0.06 }, 0.3)

          // Cut 2: the vertical alignment frame wipes in from the right as a
          // panel; the diagnostic frame recedes, drifts left and dims.
          .fromTo(
            '.story__frame--2',
            { clipPath: 'inset(0 0 0 100%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 0.16 },
            0.36,
          )
          .fromTo('.story__img--2', { scale: 1.12 }, { scale: 1, duration: 0.34 }, 0.36)
          .to('.story__img--1', { scale: 0.96, xPercent: -3, opacity: 0.22, duration: 0.2 }, 0.36)
          .to(kicker(2), { opacity: 1, y: 0, duration: 0.06 }, 0.42)
        riseLinesAt(tl, inners(2), 0.45)
        tl.to(body(2), { opacity: 1, y: 0, duration: 0.07 }, 0.51)
          .to('.story__cap--2', { opacity: 0, y: -24, duration: 0.05 }, 0.66)

          // Cut 3: the panel hands off across the sheet to the left column and
          // the closing statement takes the right.
          .to('.story__frame--2', { xPercent: -117.4, duration: 0.18 }, 0.7)
          .to('.story__img--1', { opacity: 0.12, duration: 0.1 }, 0.7)
          .to(kicker(3), { opacity: 1, y: 0, duration: 0.06 }, 0.77)
        riseLinesAt(tl, inners(3), 0.8)
        tl.to(body(3), { opacity: 1, y: 0, duration: 0.07 }, 0.86)
          .to('.story__cta', { opacity: 1, y: 0, duration: 0.06 }, 0.9)
          .set(stageInner, { pointerEvents: 'auto' }, 0.9)
          .to({}, { duration: 0.02 }, 0.98)
      })

      mm.add('(max-width: 59.99rem) and (min-height: 30.01rem)', () => {
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
          const body = chapter.querySelector<HTMLElement>('.story__body')
          const words = inners(i + 1)
          if (!img || !body) return

          // Entering: the frame settles first, then the lines rise, then the body.
          gsap.fromTo(
            img,
            { scale: 1.1 },
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
          if (words.length > 0) {
            gsap.set(words, { yPercent: RISE_FROM })
            const rise = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: stage,
                start: () => top() + before(i) - vh() * 0.62,
                end: () => top() + before(i) - vh() * 0.12,
                scrub: true,
              },
            })
            riseLinesAt(rise, words, 0, 0.5, 0.14)
          }
          gsap.fromTo(
            body,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: () => top() + before(i) - vh() * 0.45,
                end: () => top() + before(i) - vh() * 0.05,
                scrub: true,
              },
            },
          )

          // Being covered: the chapter underneath recedes, drifts and dims as
          // the next one slides over it.
          if (items[i + 1]) {
            gsap.to(img, {
              scale: 1.06,
              xPercent: -4,
              yPercent: -4,
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
                sizes={c.img.sizes}
                width={c.img.width}
                height={c.img.height}
                alt={c.img.alt}
                loading={c.n === 1 ? 'eager' : 'lazy'}
                fetchPriority={c.n === 1 ? 'low' : undefined}
                decoding="async"
              />
            </figure>

            <div className={`story__cap story__cap--${c.n}`}>
              <div className="story__cap-inner">
                <p className="kicker kicker--oxide">{c.label}</p>
                <Rise as="h3" id={`story-h-${c.n}`} manual>
                  {c.title}
                </Rise>
                <p className="story__body">{c.body}</p>
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
