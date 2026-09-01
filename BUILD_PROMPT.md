# Prospect Auto premium concept build

Implement a complete, production-quality, static React website in this repository. Do not commit, push, create releases, or change GitHub settings. The parent agent will verify and handle Git operations.

## Outcome

Create a visually exceptional independent concept site for Prospect Auto Repair & Service in Brooklyn. It should feel like a $5,000 bespoke studio build while remaining credible and useful for a neighborhood repair business. The goal is to demonstrate a substantially better conversion experience than the current live site, not to produce an art experiment that hides basic business information.

## Critical truth and ethics constraints

- This is an unsolicited independent concept preview, not the official business website.
- Include a discreet but visible footer line: `Independent concept preview by mikebatts.net — not the official Prospect Auto website.` Link `mikebatts.net` to `https://mikebatts.net/`.
- Add `<meta name="robots" content="noindex,nofollow,noarchive">` and an equivalent `robots.txt` disallowing all crawlers.
- Do not invent certifications, guarantees, prices, partnerships, testimonials, staff names, or years in business.
- Do not create a working data-submission endpoint. A visually complete estimate form may behave as a demo and show a local confirmation noting that integration is available at launch. Do not send or store data.
- Use the real facts below, current as of 2026-09-01.

## Verified business facts

- Name: Prospect Auto Repair & Service
- Address: 628 4th Avenue, Brooklyn, NY 11215
- Phone: +1 (718) 788-7683
- Email: Prospectautorepair628@yahoo.com
- Hours: Monday–Friday 8:00 AM–6:00 PM; Saturday 8:00 AM–3:00 PM; Sunday closed
- Google snapshot: 4.7 stars, 269 reviews. Display this as `4.7 on Google · 269 reviews` with language that makes clear it is a current snapshot, not a guaranteed permanent count.
- Publicly described services: automotive diagnostics, brakes, tires and wheel alignment, oil changes and preventive maintenance, air conditioning, automotive electrical service, factory-scheduled maintenance.
- The shop serves both domestic and import vehicles and speaks Spanish.

## Art direction

Concept: `Brooklyn precision garage`.

Use warm ivory, lacquer black, graphite, oxidized red, brushed-metal neutrals, thin rules, precise typography, restrained grain, and editorial automotive photography. It should feel like a union of an independent Brooklyn garage, a European automotive magazine, and a high-end industrial design studio. Avoid neon racing aesthetics, generic dark SaaS styling, fake HUDs, excessive rounded cards, purple gradients, and cookie-cutter sections.

Typography: Cabinet Grotesk or a visually close open/licensable alternative for display, paired with a refined readable body face. Do not use Inter, Arial, Roboto, Space Grotesk, or default system typography as the primary face. Self-host only if licensing is unambiguous; otherwise load a suitable Google Font with graceful fallback.

The repository already contains three original Higgsfield-generated, web-optimized assets:

- `public/assets/prospect-hero.webp` — ultra-wide garage/car hero with left negative space
- `public/assets/prospect-brakes.webp` — brake/measurement detail
- `public/assets/prospect-bodywork.webp` — inspection-light/bodywork detail

Use these prominently and do not replace them with remote stock URLs. Add explicit width/height or aspect-ratio treatment, meaningful alt text that identifies them as concept imagery, and correct eager/lazy loading behavior. The source PNGs live in `source-assets/`; add that directory to `.gitignore` and never ship it.

## Deterministic taste selection

The parent agent ran the required seeded selection using prompt length 602:

```text
hero: Artistic Asymmetry
type: Cabinet Grotesk
components: Infinite Marquee, Feedback/Testimonial Carousel, Horizontal Accordions
motions: Card Stacking, Scrubbing Text Reveals
```

Follow those selections. Do not substitute a generic centered hero.

## Required information architecture using AIDA

### Navigation

A premium minimal split navigation. The wordmark must be text/CSS, not a fake logo. Include anchored links for Services, Standards, Reviews, Visit. Provide an always-legible high-contrast `Call the shop` action. Mobile navigation must be fully accessible and keyboard operable.

### Attention: asymmetric hero

- H1: `Brooklyn drives better when the work is done right.`
- Cap the desktop H1 at two to three lines using an ultra-wide max width equivalent to Tailwind `max-w-6xl` and responsive `clamp()` sizing.
- Supporting copy should be concise and practical: diagnostic clarity, precise repairs, neighborhood service.
- Primary action: `Request an estimate` opens or scrolls to the demo estimate panel.
- Secondary action: `Call (718) 788-7683` uses the real `tel:` link.
- Place text in the hero image's left negative space and allow the vehicle to dominate the lower/right field.
- No hero pills, badges, stamps, raw stat blocks, or noisy floating elements.

### Interest: trust and services

- A restrained continuously moving typographic marquee using phrases such as `Diagnostics`, `Brakes`, `Electrical`, `Alignment`, `Maintenance`, `A/C`.
- A dense twelve-column service bento with `grid-auto-flow:dense`. Use four intentional cards whose spans mathematically occupy complete rows with no dead cell. At least one card should use the brakes image and one should use a strong typographic treatment.
- Include a horizontally expanding service accordion on desktop with a stacked accessible fallback on mobile. Every item must work with keyboard focus and touch; hover must not be the only interaction.
- Copy must remain concrete and plainspoken.

### Desire: standards, process, and proof

- Scrubbed text reveal for a statement about explaining what the car needs, what can wait, and what comes next. Respect `prefers-reduced-motion` by rendering fully visible static text.
- A card-stacking section explaining a believable three-step customer flow: Diagnose, Decide, Drive. Do not claim specific turnaround times or guarantees.
- A tasteful proof module using only the verified Google rating/review snapshot. Do not fabricate review quotations. The selected Feedback/Testimonial Carousel architecture can instead rotate factual trust statements and public-service qualities, explicitly labeled as `What the experience should make clear`, not customer quotes. Alternatively make it a `review signals` carousel without quotation marks or fake names.
- Use the bodywork image as a pinned or scaling visual chapter, with image scale/fade behavior kept subtle.

### Action: estimate, visit, footer

- A major high-contrast conversion chapter with the real phone number, address, hours, email, and Google Maps directions link.
- Include a polished demo estimate form with name, contact, vehicle, service, and note fields. On submit, prevent default and show `Preview received locally — form delivery would be connected at launch.` Do not store anything.
- Include a `Se habla español` note.
- Finish with a large, restrained call-to-action and the independent-concept disclaimer.

## Motion and interaction requirements

- Use real GSAP with `@gsap/react` and `ScrollTrigger` for the card stacking and scrubbed text reveal.
- Register plugins correctly and clean up all contexts/triggers on unmount.
- Ensure all scroll effects degrade correctly on mobile and `prefers-reduced-motion`.
- Clickable cards/images require high-quality hover/touch feedback, but avoid ubiquitous floating transforms.
- Add one coherent page-load choreography. Do not animate every paragraph.
- Prevent horizontal overflow across the entire page.

## Technical requirements

- Use Vite + React + TypeScript.
- The site must be static and deployable to GitHub Pages at `/prospect-auto-concept/`.
- Configure `vite.config.ts` with the correct base path.
- Add a GitHub Actions workflow that builds and deploys to GitHub Pages using the current official Pages actions.
- Use semantic HTML, skip link, visible focus states, labels, ARIA only where necessary, correct heading hierarchy, and color contrast.
- Avoid barrel imports. Import icons directly if using an icon library. Prefer simple inline SVG/CSS where reasonable.
- Defer or dynamically isolate GSAP-heavy client behavior if practical, but do not introduce architectural complexity for its own sake.
- No server, database, analytics, cookies, or external form service.
- Include `robots.txt`, sensible Open Graph metadata, favicon/mark, canonical omitted (because it is a preview), and a useful README.
- Add `.gitignore` including `node_modules`, `dist`, local environment files, and `source-assets/`.
- Keep shipped images under approximately 250 KB each; existing WebP files already meet this target.
- Target a production bundle appropriate for a single-page brochure site. No video or frame-sequence dependency in this pass.

## Quality gates to run

- Install dependencies.
- Run the formatter if configured.
- Run TypeScript/lint checks.
- Run the production build.
- Serve the production build locally and perform a smoke check if feasible.
- Report what changed, exact commands run, and any remaining caveats. Do not claim visual perfection without screenshots; the parent agent will perform browser QA.
