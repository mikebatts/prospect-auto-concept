import { gsap } from './gsap'

/**
 * One motion language for the page.
 *
 * Every scroll-driven or entrance tween on the site uses these values so the
 * hero, the service reel, the documentary chapters and the section openers
 * all move with the same weight. Transforms and opacity only; nothing here
 * touches layout properties.
 */
export const EASE = 'power3.out'

export const DUR = {
  /** A photographic frame settling into place. */
  settle: 1.1,
  /** A masked line of type rising into view. */
  rise: 0.95,
  /** Gap between successive lines of a rise. */
  line: 0.09,
  /** Copy lags the image it belongs to by this much. */
  lag: 0.12,
} as const

/** Starting offset for masked type, as a percentage of the line height. */
export const RISE_FROM = 125

/**
 * Groups the inner spans of a masked heading by the rendered line of their
 * mask, in reading order. Line grouping is measured at animation time, so
 * whatever the viewport and fonts have settled on is what gets choreographed.
 */
export function lineGroups(inners: HTMLElement[]): HTMLElement[][] {
  const byTop = new Map<number, HTMLElement[]>()
  for (const el of inners) {
    const mask = el.parentElement ?? el
    const top = Math.round(mask.offsetTop)
    const line = byTop.get(top)
    if (line) line.push(el)
    else byTop.set(top, [el])
  }
  return [...byTop.entries()].sort((a, b) => a[0] - b[0]).map((entry) => entry[1])
}

type RiseOptions = {
  delay?: number
  duration?: number
  stagger?: number
}

/**
 * Masked typography rise: each line rises as a group, lines follow one
 * another in reading order. Returns the timeline so callers can chain.
 */
export function riseLines(inners: HTMLElement[], options: RiseOptions = {}) {
  const { delay = 0, duration = DUR.rise, stagger = DUR.line } = options
  const tl = gsap.timeline({ delay })
  lineGroups(inners).forEach((line, i) => {
    tl.to(line, { yPercent: 0, duration, ease: EASE, overwrite: 'auto' }, i * stagger)
  })
  return tl
}

/**
 * Adds a scrubbed rise to an existing timeline at `at`. Used inside the
 * pinned documentary chapter, where scroll position drives the reveal.
 */
export function riseLinesAt(
  tl: gsap.core.Timeline,
  inners: HTMLElement[],
  at: number,
  duration = 0.07,
  stagger = 0.02,
) {
  lineGroups(inners).forEach((line, i) => {
    tl.to(line, { yPercent: 0, duration }, at + i * stagger)
  })
  return tl
}
