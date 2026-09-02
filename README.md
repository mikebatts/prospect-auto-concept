# Prospect Auto concept preview — final cinematic pass

A bespoke, mobile-first website concept for Prospect Auto Repair & Service in Brooklyn. Off-black garage at night, warm ivory type, one oxide accent, and a single pinned scroll chapter built from the concept imagery.

This is an independent, unsolicited concept by [Mike Battaglia](https://mikebatts.net/). It is not the official Prospect Auto website and is intentionally excluded from search indexing. Imagery is generated concept art composed as one coherent shoot around the shop's public visual identity (the blue sign, the one-bay brick facade, the red bay trim, the yellow inspection and alignment signage, blue lifts, red storage); it does not show the actual shop. The five shipped frames live in `public/assets/`; the reference photos and generation sources in `source-assets/` are never built or deployed.

## Stack

- Vite, React 19, and TypeScript
- GSAP, ScrollTrigger, and `@gsap/react`
- Vanilla CSS with Satoshi and Newsreader
- Static GitHub Pages deployment under `/prospect-auto-concept/final/`

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run format
npm run typecheck
npm run lint
npm run build
```

The service-request form is a non-submitting demonstration. It validates locally and does not transmit or store visitor data. See `FINAL_DESIGN_NOTES.md` for the design plan, audit, verification record, and the copy pass that documents every factual claim on the page.
