# Final design notes — Prospect Auto, "Brooklyn night shift"

Independent concept preview. Not the official Prospect Auto website.

<design_plan>

1. Python RNG execution (deterministic; seed = character count of `FINAL_BUILD_PROMPT.md`)

```text
$ python3 -c "import random; n=7794; random.seed(n); ..."
chars=7794 seed=7794
hero:       Editorial Split
font:       Cabinet Grotesk
components: ['Horizontal Accordions', 'Infinite Marquee', 'Feedback/Testimonial Carousel']
motion:     ['Card Stacking', 'Image Scale & Fade Scroll']
```

Applied selection after the user's art-direction overrides (overrides win over randomness):

| Slot       | RNG result                                        | Final                                                                                  | Why                                                                                                    |
| ---------- | ------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Hero       | Editorial Split                                   | Cinematic Center                                                                       | Brief mandates a cinematic center hero that stays recognizably related to Version A.                   |
| Type       | Cabinet Grotesk                                   | Cabinet Grotesk 500/700/800 + Newsreader 400/500 + italic                              | RNG and brief agree. Both faces already load from the existing local `fonts.css`.                      |
| Components | Horizontal Accordions, Infinite Marquee, Carousel | None of the three. One editorial service index (typographic list + art-directed crop). | Brief removes the marquee, accordion, and carousel feeling. The page is a story, not a component demo. |
| GSAP       | Card Stacking, Image Scale & Fade Scroll          | Scroll Pinning + Image Scale & Fade Scroll                                             | Brief requires exactly one pinned/scrubbed chapter; Card Stacking is replaced by Scroll Pinning.       |

2. AIDA check

- Navigation: persistent minimal split bar (wordmark / links / call action). Compact mobile drawer.
- Attention: full-viewport cinematic hero, centered headline, `Request service` + `Call the shop`, practical trust line (address, hours, phone, Se habla español).
- Interest: editorial service index. Six typographic rows cover every verified category. A tall, masked crop of the garage image with slow parallax sits beside the list on desktop.
- Desire: one pinned, scrubbed chapter using the brake and bodywork images full-bleed. Measure, look and explain, then the split composition with the closing statement and CTA.
- Proof: quiet reputation and location section. Google snapshot (dated), address, hours, phone, Se habla español, business-published experience claim.
- Action: specials strip (no invented discount) followed by the schedule-service area: validated demo form + direct telephone link. Quiet footer with disclaimer.

3. Hero math verification

- H1 container: `.hero__title { max-width: 14em }` inside the full container (88rem). At 1440px the H1 renders at 92.16px with a 1290px measure. Measured in headless Chrome: 2 lines at 1440px, 2 lines at 820px, 3 lines at 390px. Re-measured after the copy pass with the new H1 ("A straight answer before the wrench turns."): 2 lines at 1440, 960 and 820; 3 lines at 390 and 360.
- No stamp icons, pills, badges, or raw stats in the hero. The trust line is plain display-face text with hairline separators.

4. Bento density verification

No bento grid is used in the final composition (removed by brief). The service index is a single list of six rows; on desktop the section is a two-column grid (`minmax(0, 5fr) minmax(0, 7fr)`) with the crop on the left and the list on the right. There is no cell to leave empty.

5. Label sweep and button check

- No "SECTION 01" / "QUESTION 05" / numbered meta-labels anywhere. The old `01` indices in the bento, accordion, process cards, and mobile menu are gone. Small labels are lowercase italic Newsreader.
- Buttons: ivory on lacquer (`#f3eee4` on `#0f0e0c`, about 17.6:1) and lacquer on ivory. The oxide button uses `#a6402f` with ivory text (about 5.4:1). Ghost buttons on dark use ivory text and a 1px ivory hairline. Small oxide text uses the lifted `#d0725f` (about 5.9:1 on lacquer).

</design_plan>

## Direction

**Brooklyn night shift.** One location, seen three ways. The garage at night is the hero. A tight crop of the same room (tool wall, lamps, red cabinet, the car's nose) sits beside the service index. The two detail images carry the pinned chapter at full-bleed. Off-black and charcoal surfaces, warm ivory type, one oxide accent, fine rules, grain, warm light. Nothing rounded beyond 2px. No cards, no glass, no gradients that are not light.

Sections, in order:

1. Nav
2. Hero (Attention)
3. Service index (Interest)
4. Pinned chapter: Measure / Look / Then the work (Desire)
5. Reputation and location (Proof)
6. Specials strip
7. Schedule service (Action)
8. Footer

## Audit of Version A (what was wrong, what changed)

| Version A                                                                     | Diagnosis                                                                                      | Final                                                                                                              |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Ivory page with a dark hero, dark process cards, dark action block            | Alternating light/dark sections read as separate templates, not one story.                     | One dark system: lacquer `#0f0e0c`, `#141311`, charcoal `#1a1815`. Sections differ by a step, never by a jump.     |
| Artistic-asymmetry hero, copy stepped into a column, uppercase eyebrow + meta | Composition fought the image; small uppercase labels felt like UI chrome.                      | Cinematic center. Italic serif kicker, 2-line H1, one sentence, two actions, trust line on the floor.              |
| Marquee rail with pause control                                               | Motion for its own sake. Added a widget and a control users never asked for.                   | Removed.                                                                                                           |
| 4-card bento + 6-item horizontal accordion for services                       | Two components saying the same thing. Index numbers `01` to `06`. Dense and generic.           | One editorial index: six rows, symptom lines in italic, every row jumps to the form with the service preselected.  |
| Scrubbed word-by-word statement                                               | A third GSAP paradigm. Over budget.                                                            | Removed. The statement now closes the pinned chapter as plain type.                                                |
| Three stacked process cards (Diagnose / Decide / Drive) with `filter` scrub   | Card stacking is the most common AI scroll effect; used `filter` on animated layers.           | Removed. Its content ("what it needs now, what can wait, what comes next") became the chapter's closing beat.      |
| Bodywork "chapter" as a lone sticky image                                     | Good instinct, thin execution.                                                                 | Expanded into the signature pinned chapter using both detail images.                                               |
| "Review signals" carousel with dots and arrows                                | Carousel mechanics with no customer quotes to carry; felt like a placeholder for testimonials. | Removed. Proof is the dated Google snapshot plus facts, set quietly.                                               |
| Estimate form with no validation; status line only                            | Silent failure on bad input; no success composition.                                           | Validated form with field errors, alert summary, focus management, and a success panel that says it sends nothing. |
| Footer with a giant "Bring it to 4th Avenue" CTA                              | Duplicated the action section directly above it.                                               | Quiet footer: address, contact, links, hours, disclaimer, imagery note.                                            |
| No mobile call affordance beyond the nav button                               | The likeliest visitor is on a phone from Google Maps.                                          | Persistent bottom call bar: appears after the hero, hides over the schedule section and behind the open menu.      |

Removed files: `Marquee`, `ServiceBento`, `ServiceAccordion`, `Statement`, `Process`, `Chapter`, `Proof`, `Estimate`, `Visit`, `App.css`.
Added files: `ServiceIndex`, `Story`, `Reputation`, `Specials`, `Schedule`, `CallBar`.

## Visual system

- **Surfaces**: `--bg #0f0e0c`, `--bg-2 #141311`, `--bg-3 #1a1815`. Body grain at 5.5% opacity, no blend mode.
- **Type**: Cabinet Grotesk 800 for the H1 and chapter titles (tracking -0.035em, line-height 0.96), 700 for section titles and labels. Newsreader for body and for every small label, set lowercase italic instead of tracked uppercase.
- **Accent**: oxide `#a6402f` for the primary form button and the mobile call bar; `#d0725f` for small text and hover states. Nothing else is colored.
- **Rules**: 1px ivory at 14% for structure, 38% for interactive hairlines.
- **Light**: two warm radial gradients (reputation top-right, schedule top-left). No blue, no purple, no glass.
- **Imagery**: hero at 100vw with a radial wash centered on the type; index crop at `object-position: 83% 30%` with a bottom mask; chapter images at 100vw. Every `<img>` has explicit width/height, `srcset` with the 768/1024 variants, and concept-imagery alt text.

## Conversion reasoning

The visitor is on a phone, has a symptom, and wants to know three things: do they handle it, can I trust them, how do I book.

1. Hero answers "who and where" in one glance and gives both actions above the fold. The trust line carries address, hours, phone, and Spanish without a badge.
2. The service index is written as symptoms, not just categories, so the visitor recognizes their own problem. Each row preselects the service in the form.
3. The chapter builds trust through process, not claims: measure, look, explain. Copy avoids turnaround times, guarantees, and prices.
4. Proof is the dated snapshot with a link to the live number, plus the practical facts. The 30+ years line is attributed to the shop's own website.
5. Specials strip stays honest: offers by phone, no invented discount.
6. The schedule section gives the phone number at display size next to the form. The form is short (four required fields, one optional), and both its intro and its success state say it does not send anything.
7. The mobile call bar keeps a one-tap call available for the whole middle of the page.

## Motion

Two GSAP paradigms, plus one page-load and one reveal.

- **Scroll Pinning** (desktop, motion allowed): the chapter section is 340vh tall with a sticky 100svh stage. One scrubbed timeline (`scrub: 0.5`) drives three beats: brakes scale 1.16 to 1 with caption one; clip-path wipe from the right to the bodywork image while the brakes layer scales to 0.94 and fades to 15%; the bodywork frame clips to its left half and the closing statement with `Schedule service` takes the right half. Only transform, opacity, and clip-path are animated.
- **Image Scale & Fade Scroll**: the hero image drifts and scales as it leaves while its text fades; the index crop parallaxes on desktop; chapter frames on mobile settle from 1.1 to 1 as they enter.
- **Page load**: room fades in, nav bar drops in, then kicker, copy, actions, and trust line stagger. The H1 is not animated so it paints as the LCP element.
- **Reveal**: `ScrollTrigger.batch` on `[data-reveal]` (section kickers and titles only), once.
- **Reduced motion**: every `useGSAP` returns early. The chapter switches to the stacked layout, `[data-load]` and `[data-reveal]` are never hidden, and CSS transitions on the call bar are off. `scroll-behavior` falls back to auto.
- Nothing uses `filter` or `backdrop-filter` on animated layers. The nav is solid off-black after 32px of scroll rather than blurred.

## Responsive behavior

- **Desktop (60rem+)**: split nav with the call button; index in two columns with a sticky crop; pinned chapter; reputation and schedule in 5/7 grids; footer in three columns. Call bar hidden.
- **Tablet (48rem to 60rem)**: nav collapses to the drawer; index rows keep the title/detail columns; chapter stacks with 16:10 frames capped at 85vh; call bar visible.
- **Mobile (below 48rem)**: single column throughout; hero actions stack full-width under 30rem; trust line becomes a 2x2 grid; index rows stack; chapter frames are 4:5; call bar with safe-area padding; footer pads for the bar.
- Horizontal overflow: `overflow-x: clip` on html and body, chapter frames clip their scaled images. Measured `scrollWidth === innerWidth` at 1440, 820, and 390.

## Accessibility

Skip link, `header`/`nav`/`main`/`section`/`aside`/`footer` landmarks, one H1 then H2 per section then H3 inside the chapter and success panel. Mobile drawer is a modal dialog with focus trap, Escape, inert background, and scroll lock. Form: labels for every control, `noValidate` with custom messages, `aria-invalid`, `aria-describedby` to the error text, `role="alert"` summary, focus moves to the first invalid field, and the success panel is a labelled `role="group"` that receives focus after it renders (see "Final QA fixes"). Call bar is `inert` while hidden. All in-page links resolve to real ids; phone and map links are real.

## Static hosting

`vite.config.ts` base is `/prospect-auto-concept/final/`. Canonical and OG URLs point to `https://mikebatts.github.io/prospect-auto-concept/final/`. Favicon and hero preload use `%BASE_URL%` so they resolve under the subpath (verified in `dist/index.html`). `noindex,nofollow,noarchive` meta and `robots.txt` disallow are preserved. Footer keeps the independent-concept disclaimer and now also states that imagery is generated concept art and the form sends nothing.

## Verification

Commands run in this worktree, in order, all exiting 0:

```text
npm ci --no-audit --no-fund        added 156 packages
npm run format                      prettier --write .   (formatted, no errors)
npm run typecheck                   tsc -b               (clean)
npm run lint                        eslint .             (clean)
npm run build                       tsc -b && vite build
  dist/index.html                    3.10 kB  gzip 1.15 kB
  dist/assets/index-K4Kr79Z1.css    26.22 kB  gzip 6.52 kB
  dist/assets/gsap-DLGAZTsI.js     121.14 kB  gzip 47.34 kB
  dist/assets/index-Do3EafH7.js    210.72 kB  gzip 65.42 kB
```

Local smoke check performed with `vite preview` and headless Chrome (agent-browser) against the built output at `/prospect-auto-concept/final/`:

- 1440x900: hero H1 = 2 lines at 92.16px; `scrollWidth` 1440; screenshots of hero, index, all three chapter beats, reputation, specials, schedule, footer reviewed.
- 820x1180: hero H1 = 2 lines; `scrollWidth` 820; stacked chapter reviewed.
- 390x844: hero H1 = 3 lines at 41.6px; `scrollWidth` 390; call bar shows after the hero and hides over the schedule section.
- Form: empty submit produced the "4 fields need attention" alert, inline errors, and focus on the Name field; a valid submission rendered the success panel with the call and reset actions.

Not performed: Lighthouse, real-device testing, screen-reader testing, reduced-motion emulation, and cross-browser checks. Those are left for the separate reviewer.

## Final QA fixes

Targeted accessibility and polish pass on `src/components/Schedule.tsx` only. No visual or structural change to any section.

- **Success panel focus**: the panel already had `tabIndex={-1}` but was never focused. It now has a ref, and a `useEffect` keyed to the `sent` state calls `focus()` on it after the swapped view has rendered. No `setTimeout`.
- **Reset focus**: "Start another request" sets a `focusNameOnReset` ref before clearing `sent`; the same effect then focuses the Name input (via a new ref) once the form has re-rendered and clears the flag. Because the flag is only set by the reset handler, the Name field is never autofocused on initial page load, including mobile.
- **Single announcement**: the panel was `role="status" aria-live="polite"` and is now also focused, which would read the result twice on screen readers that announce inserted live regions. The live-region attributes were removed and replaced with `role="group"` plus `aria-labelledby` pointing at the "Noted, {name}." heading, so moving focus is the one announcement and the panel has an accessible name. The `role="alert"` error summary is unchanged.
- **Placeholders**: per the web-interface guideline, example placeholders now end with a real ellipsis. Vehicle: `2018 Honda Civic…` (was `Year, make, model`). Note: `Squeal when braking, mostly in the morning…` (was a full sentence ending in a period).

Commands run in this worktree, in order, all exiting 0:

```text
npm run format      prettier --write .   (no files changed)
npm run typecheck   tsc -b               (clean)
npm run lint        eslint .             (clean)
npm run build       tsc -b && vite build
  dist/index.html                    3.10 kB  gzip 1.15 kB
  dist/assets/index-K4Kr79Z1.css    26.22 kB  gzip 6.52 kB
  dist/assets/gsap-DLGAZTsI.js     121.14 kB  gzip 47.34 kB
  dist/assets/index-B7_brTQM.js    210.95 kB  gzip 65.47 kB
```

Headless Chrome check (agent-browser) against `vite preview` of the built output: on load `document.activeElement` is `body` (no autofocus); after a valid submission the active element is `.schedule__done` with `role="group"`, no `aria-live`, and `aria-labelledby` resolving to "Noted, Ada."; after "Start another request" the active element is the Name input, the service select is cleared, and both placeholders end with `…`. Screen-reader testing with real assistive technology was not performed.

## Copy pass (September 1, 2026)

Client-specific copy and content pass on the final cinematic branch. No visual-system, structural, imagery, or motion changes; no CSS was edited. Section ids (`#standards`, `#schedule`) are unchanged so existing anchors still resolve.

### Strategy

- **Hero.** The generic line "Brooklyn drives better when the work is done right." is replaced with "A straight answer before the wrench turns." The kicker keeps locality (4th Avenue, South Park Slope). The body names the six service areas and domestic/import coverage, then invites the customer to start with what the car is doing and lets the shop take it from there. No process or outcomes are promised.
- **Service index.** The opener now speaks in symptoms ("Hear it, feel it, or see it on the dash?"). The six service rows and their symptom lines were already customer-language and are unchanged. The hover label on each row is now `Request service`.
- **Pinned chapter.** Renamed to "How it works" in the nav, footer and hidden heading. The three beats now read measure → look and explain → then the repair. "Under the lamp, nothing hides." was removed as an overclaim and replaced with "Look closely. Explain plainly." The second beat's body no longer promises to check the whole car; it says the inspection light reveals what a glance can miss and that the next step is made clear in English or Spanish. The closing statement is "What needs attention now. What can wait. What comes next.", followed by "Those three answers make the next step clear. Then the repair."
- **Reputation.** The headline invites the reader to check the reviews ("See what Brooklyn drivers say before you call.") instead of praising the shop. The rating, count and September 1, 2026 snapshot date are unchanged and still labeled as a snapshot with a link to the live figure. The 30+ years line is worked into the shop fact naturally while still attributed ("The shop's own website lists mechanics with 30+ years of experience.").
- **Specials.** Rewritten so nothing implies a current discount: offers change through the year, ask when you call, and the body states that no discount is published on this preview. The button is `Call the shop`.
- **Service request.** The section is labeled `Request service`. The lede states the friction-free path (vehicle, symptom, phone number, then the shop follows up during business hours) and offers the phone as the alternative. The demonstration disclaimer, validation messages, focus management and non-submitting behavior are unchanged. The success panel still says the preview sends nothing and points to the phone.
- **CTA consistency.** Every link to the form reads `Request service` (hero, chapter, nav, footer, mobile call bar, index rows). Every phone link reads `Call the shop` or shows the number. The form's own submit button remains `Send request` because that is the action it performs.
- **Metadata.** The description names the services, domestic/import coverage and `Se habla español`. The Open Graph description carries the new headline. Title, canonical, `noindex,nofollow,noarchive`, and OG image/alt are unchanged.

### Facts used and their sources

Name, address, phone, email, hours, domestic/import, `Se habla español`, and the six service areas come from `src/lib/business.ts`. The 30+ years line is presented only as the shop's own published claim. The Google figure is presented only as a dated snapshot. The page still makes no claim about certifications, warranties, turnaround, same-day service, free estimates, prices, financing, ownership, years in business, parts sourcing, or promotions, and quotes no third-party review text.

### Verification

Commands run in this worktree after the copy pass, all exiting 0: `npm run format:check`, `npm run typecheck`, `npm run lint`, `npm run build`.

Headless Chrome (agent-browser) against `vite preview` of the built output:

| Viewport | H1 size | H1 lines | `scrollWidth` | Notes                                                                                   |
| -------- | ------- | -------- | ------------- | --------------------------------------------------------------------------------------- |
| 1440x900 | 92.16px | 2        | 1440          | Nav links (`Services`, `How it works`, `Visit`, `Request service`) fit without overflow |
| 960x800  | 61.44px | 2        | 960           | Smallest desktop breakpoint; pinned chapter captions at 2 / 1 / 3 lines                 |
| 820x1180 | 52.48px | 2        | 820           | Call bar visible; no overflow                                                           |
| 390x844  | 41.6px  | 3        | 390           | Call bar `Call (718) 788-7683` + `Request service` fit, neither cell clipped            |
| 360x780  | 41.6px  | 3        | 360           | Same; also checked at 320px with no clipping                                            |

Not performed: real-device, screen-reader, reduced-motion emulation and cross-browser checks.
