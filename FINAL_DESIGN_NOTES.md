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

- H1 container: `.hero__title { max-width: 14em }` inside the full container (88rem). At 1440px the H1 renders at 92.16px with a 1290px measure. After the customer-language pass, each sentence in “Know what needs fixing. Know what can wait.” is its own block line. The H1 renders as 2 lines at 1440px and 390px; at 320px, each sentence wraps naturally within its own block without horizontal overflow.
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

Client-specific copy pass on the final cinematic branch. No visual-system, structural, imagery, or motion changes. Section ids (`#standards`, `#schedule`) are unchanged so existing anchors still resolve.

## Customer-language copy pass (September 1, 2026)

Second copy pass, based on the customer-language audit (Google review corpus, Brooklyn mechanic discussions, competitor and homepage-guidance research). Goal: read like a trusted 4th Avenue shop, not an agency campaign. Visual system, imagery, motion, section order and ids are unchanged. Small CSS additions only: a support line under the services heading, a narrow-phone size step for the mobile call bar, and sentence-preserving mobile headline wrapping.

### Strategy

- **Hero.** Kicker `Auto repair on 4th Avenue, Brooklyn`. H1 `Know what needs fixing. Know what can wait.` Body names the services people search for (inspections, brakes, diagnostics, tires, maintenance, A/C, electrical) and states that findings are explained before any work begins. Primary CTA is now the phone number (`Call (718) 788-7683`); secondary is `Request an appointment`. The proof line under the hero reads `4.7 on Google · 269 reviews · Mon–Sat · Se habla español`, with the rating linked to the Google listing, plus the street address linked to directions. Full hours remain in the Visit section, the footer and the mobile menu.
- **Services.** Heading `Start with the problem.` with a support line `Choose the closest match. If you're not sure, call the shop.` The six rows and symptom lines are unchanged except one tidy (`Mileage service due, or overdue.`). Row hover label and accessible name now say `request an appointment`.
- **How it works.** The three beats are `Inspect` (`We check the car first.` with the rotor-measurement example), `Explain` (`We explain what we find before any work begins.` — what needs fixing now, what can wait, and why, in English or Spanish) and `Repair` (`Then we talk through the repair.` — the customer decides what gets done now; the shop does the work and says what to watch for next). The hidden section heading carries the full sentence: `How it works: we check the car, explain what we find, and then talk through the repair.` No turnaround, warranty or pricing promise is made.
- **Reviews and location.** Heading `4.7 stars from 269 Google reviews.` rendered from the business data. The snapshot note is shorter and still points to the live figure. The shop fact drops the sentence-fragment stack and keeps the attributed 30+ years line.
- **Specials.** `Ask about current specials.` The body states that no offer is published on this preview. The button shows the number.
- **Appointments.** Kicker `Appointments`, heading `Request an appointment.`, lede: `Tell us the vehicle, what it's doing, and how to reach you. We'll follow up during business hours. Need help sooner? Call the shop.` Success panel opens with `Thanks, {name}.` The "not sure" select option reads `Not sure, I'll describe it below`. The demonstration disclaimer, validation messages, focus management and non-submitting behavior are unchanged.
- **CTA consistency.** Every link to the form reads `Request an appointment` (hero, chapter, nav, footer, mobile call bar, index rows). Every phone action shows the number (`Call (718) 788-7683`) in the hero, nav, mobile menu, specials, call bar and form. The nav call button's redundant `aria-label` was removed so its accessible name matches the visible text. The form submit remains `Send request`.
- **Metadata.** The meta description now leads with inspections to match the hero. The Open Graph description carries the new H1. Title, canonical, `noindex,nofollow,noarchive`, and OG image/alt are unchanged.

### Lines removed as agency- or AI-sounding

`A straight answer before the wrench turns.` · `Hear it, feel it, or see it on the dash? It is probably on this list.` · `A brake job starts with a number.` · `Look closely. Explain plainly.` · `What needs attention now. What can wait. What comes next.` · `See what Brooklyn drivers say before you call.` · `Offers change through the year. Ask when you call.` · `Tell the shop what the car is doing.`

### Facts used and their sources

Name, address, phone, email, hours, domestic/import, `Se habla español`, and the six service areas come from `src/lib/business.ts`. The 4.7 rating and 269-review count are the September 1, 2026 Google snapshot and are still labeled as such. "Inspections" in the hero body follows the customer-language audit, where inspection is the most-mentioned review topic; it is not added as a seventh service row. The 30+ years line is presented only as the shop's own published claim. The page makes no claim about honesty, fairness or "no upsells" in the first person, and no claim about certifications, warranties, turnaround, same-day service, free estimates, prices, financing, ownership, years in business, parts sourcing, or promotions. It quotes no third-party review text.

### Verification

Commands run in this worktree after the pass, all exiting 0: `npm run format`, `npm run typecheck`, `npm run lint`, `npm run build`. There is no test suite in the project.

Headless Chrome (agent-browser) against `vite preview` of the built output:

| Viewport | Result                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1440x900 | H1 92.16px, 2 lines; nav links and `Call (718) 788-7683` fit without overflow; chapter captions at 1 / 2 / 2 lines; `scrollWidth` 1440     |
| 390x844  | H1 2 lines with one sentence per line; hero proof line wraps to two rows of two; call bar shows both labels on one line; `scrollWidth` 390 |
| 360x780  | Call bar labels fit after the narrow-phone size step; `scrollWidth` 360                                                                    |
| 320x780  | Each H1 sentence wraps within its own block; call bar labels fit; `scrollWidth` 320                                                        |
