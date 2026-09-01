# Prospect Auto — Version B design notes

Direction: **Brooklyn inspection ledger.**

The whole page is treated as one printed inspection sheet. Daylight ivory paper is the
dominant surface. Hairline rules divide the sheet into ruled fields, registration marks sit in
the corners of every photographic plate, and the three Higgsfield images are used as black-field
plates with figure captions rather than as background washes. Cabinet Grotesk carries all the
technical apparatus (masthead, ledger rows, captions, buttons). Newsreader carries the
editorial voice, including the two-line hero headline, which is the single biggest visual
departure from Version A's grotesk-on-dark hero.

References in mind: 1970s European service manuals (ruled fields, figure references, dense but
calm), a contemporary independent magazine (huge serif headline, plate captions, generous
margins), and a well-run neighborhood workshop (plain copy, exact facts, no theatre).

## Pre-flight design plan

```
# seed = len(FABLE_ALT_PROMPT.md) = 4239
random.seed(4239)
hero        -> random.choice(["Cinematic Center","Artistic Asymmetry","Editorial Split"])  = "Cinematic Center"
              (overridden by the brief: light editorial split with an image aperture)
type        -> "Cabinet Grotesk" (mandated) + Newsreader for editorial voice
components  -> ["Horizontal Accordions" (recomposed as a ledger split), "Infinite Marquee"
                (recomposed as a ruled tape), "Feedback Carousel" (kept as review signals)]
gsap        -> ["Scroll Pinning (GSAP Split)", "Image Scale & Fade" (recomposed as clip-path mask reveals)]
```

- **AIDA:** masthead → hero (Attention) → tape + service ledger (Interest) → pinned inspection
  ledger + plate C aperture + Google snapshot (Desire) → visit + estimate + black CTA field
  (Action).
- **Hero math:** H1 spans the full 88rem container in Newsreader at
  `clamp(3.5rem, 7.4vw, 7.6rem)` on desktop and `clamp(2.2rem, 9.5vw, 5.5rem)` below 60rem.
  Measured in the production build: two lines at 1440 wide (208px tall at 104px line height),
  three lines at 390 wide. No badges, no pills, no stats in the hero.
- **Grid density:** the service ledger is a 12-column ruled grid (5 + 7 on desktop) with the
  open panel spanning the full row stack, so there is no dead cell. The inspection ledger is
  a pinned 5 + 7 split. Nothing is a floating card.
- **Labels:** no "SECTION 01". The only indices are plate letters (A, B, C) that captions
  cross-reference, and the ordered 1 to 3 steps of the visit, which is a real sequence.
- **Buttons:** lacquer on paper, paper on lacquer, oxide only for the primary call action.
  Every button is at least 44px tall.

## What changes against Version A

| Area       | Version A                                         | Version B                                                                                                             |
| ---------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Navigation | Translucent centered bar, light-on-dark at top    | Opaque paper masthead ruled into cells: stacked wordmark, hairline-divided index, phone text, lacquer call tab        |
| Hero       | Dark full-bleed garage wash, grotesk H1           | Ivory sheet, serif two-line H1, black plate A bleeding off the left edge, outlined "Prospect" cropped behind its foot |
| Marquee    | Wide ivory ticker                                 | Narrow ruled tape with registration ticks, same pause control                                                         |
| Services   | Dense bento + horizontal slice accordion          | Ledger split: index column of service rows on the left, one ruled detail field on the right                           |
| Standards  | Scrubbed word reveal + stacking dark cards        | Pinned inspection ledger: pinned statement + plate B (brakes) on the left, three entries tick in on the right         |
| Chapter    | Pinned full-bleed bodywork image, scale on scroll | Plate C aperture: bodywork opens from a hairline slit via clip-path, caption in the paper margin                      |
| Reviews    | Two-cell panel, ivory-2 rating block              | Ruled ledger: giant 4.7 numeral and star rule on the left, signals as ruled entries on the right                      |
| Estimate   | Dark panel with boxed inputs                      | Paper form with underline-only fields, like a sheet you fill in by hand                                               |
| Footer     | Ivory CTA                                         | Black field: oversized paper wordmark cropped by the viewport, call and estimate actions, disclaimer bar              |

## Motion story (GSAP + ScrollTrigger)

1. **Load:** masthead rule draws, plate A opens from a horizontal slit, caption and copy rise.
   The H1 stays static so it remains the LCP element.
2. **Inspection ledger (pinned):** on desktop the statement and plate B column pins below the
   masthead while the three entries scroll past on the right; plate B opens from a slit as the
   section arrives, and each entry is scrubbed from graphite to lacquer with an oxide check
   stroke drawing in. On mobile nothing pins and each entry ticks in once as it enters.
3. **Plate C aperture:** scrubbed clip-path from `inset(46% 0)` to `inset(0)` plus a subtle
   scale settle.
4. **Reduced motion:** every sequence renders its final state statically. Pins are never
   created. `useGSAP` scopes and `revertOnUpdate` clean everything on unmount.

## Preserved from Version A

Business facts, phone/maps/email links, hours, Google snapshot wording and date, noindex meta
and robots.txt, concept disclaimer, non-submitting demo form with its local status message,
skip link, drawer focus trap and inert handling, accordion arrow-key navigation, marquee pause
control and reduced-motion fallback, carousel pause-on-hover/focus and live region.
