import { Children, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { RISE_FROM, riseLines } from '../lib/motion'
import { useReducedMotion } from '../lib/useReducedMotion'
import './Rise.css'

type Tag = 'h1' | 'h2' | 'h3' | 'p'

type Props = {
  as?: Tag
  id?: string
  className?: string
  children: ReactNode
  /**
   * When true the component only renders the masked structure and leaves
   * the animation to its parent (the pinned chapter scrubs its own captions).
   */
  manual?: boolean
  start?: string
}

/**
 * Masked typography rise for major section introductions.
 *
 * Words are wrapped in overflow-hidden masks at render time, so React owns
 * the structure and nothing is split in the DOM afterwards. At animation
 * time the words are grouped by their rendered line and each line rises as
 * one group. Screen readers get the plain sentence; the masked words are
 * hidden from the accessibility tree so nothing is read word by word.
 *
 * Reduced motion renders plain text and never animates.
 */
export function Rise({
  as = 'h2',
  id,
  className,
  children,
  manual = false,
  start = 'top 85%',
}: Props) {
  // Union of the four tags; each is a heading or paragraph element at runtime.
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || manual || !ref.current) return
      const inners = gsap.utils.toArray<HTMLElement>('.rise__i', ref.current)
      if (inners.length === 0) return
      gsap.set(inners, { yPercent: RISE_FROM })
      ScrollTrigger.create({
        trigger: ref.current,
        start,
        once: true,
        onEnter: () => {
          riseLines(inners).eventCallback('onComplete', () =>
            gsap.set(inners, { clearProps: 'transform' }),
          )
        },
      })
    },
    { scope: ref, dependencies: [reduced, manual, start], revertOnUpdate: true },
  )

  const Tag = as

  if (reduced) {
    return (
      <Tag id={id} className={className} ref={ref}>
        {children}
      </Tag>
    )
  }

  const parts = Children.toArray(children)
  const text = parts
    .filter((part): part is string => typeof part === 'string')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ')

  const nodes: ReactNode[] = []
  parts.forEach((part, pi) => {
    if (typeof part === 'string' || typeof part === 'number') {
      String(part)
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word, wi) => {
          nodes.push(
            <span key={`${pi}-${wi}`} className="rise__w">
              <span className="rise__i">{word}</span>
            </span>,
            ' ',
          )
        })
      return
    }
    nodes.push(
      <span key={`node-${pi}`} className="rise__w">
        <span className="rise__i">{part}</span>
      </span>,
      ' ',
    )
  })

  return (
    <Tag id={id} className={className ? `rise ${className}` : 'rise'} ref={ref} data-rise="">
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" className="rise__t">
        {nodes}
      </span>
    </Tag>
  )
}
