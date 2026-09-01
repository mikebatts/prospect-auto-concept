# Final cinematic design pass — Prospect Auto

You are completing the final, highest-bar design pass for an existing React/Vite concept site in this repository. This is a targeted redesign of Version A, not a greenfield rewrite. The user prefers Version A's cinematic garage direction and wants a deeper, more minimal, more visual result that credibly feels like a $10,000 custom local-business website.

Do not commit, push, deploy, modify git configuration, or contact anyone. Work only in this current worktree. Preserve the project stack: React 19, TypeScript, Vite, vanilla CSS, GSAP. Do not add a new framework. You may remove existing components that no longer serve the final composition.

Before editing code, read the entire project and read these design instructions:

- `/Users/michaelbattaglia/.openclaw/agents/main/agent/codex-home/skills/gpt-tasteskill/SKILL.md`
- `/Users/michaelbattaglia/.openclaw/workspace/skills/frontend-design/SKILL.md`
- `/Users/michaelbattaglia/.openclaw/agents/main/agent/codex-home/skills/redesign-skill/SKILL.md`

Create `FINAL_DESIGN_NOTES.md` first. Begin it with the required `<design_plan>` block from the Taste skill. Use a deterministic seed and document the selected direction. The user's art-direction constraints override randomness: cinematic center hero, Cabinet Grotesk + Newsreader or an equally distinctive existing local stack, restrained dark industrial palette, and only two advanced GSAP paradigms. The final design must be minimal, not a showcase of every component in the arsenal.

## Client and conversion reality

Prospect Auto Repairs & Service is at 628 4th Avenue in South Park Slope, Brooklyn. The public phone is (718) 788-7683. Published hours: Monday-Friday 8–6, Saturday 8–3, Sunday closed. The current official site says `Se habla español` and lists wheel alignment, brakes, tires, oil changes, air conditioning, electrical work, computer diagnostics, factory-recommended maintenance, and domestic/import service.

Their current site tries to drive Schedule Service, Service Ticket, Quote, phone calls, and coupons, but it is an unfinished template with weak hierarchy, huge blank areas on desktop, duplicated media and dense tiny content on mobile. The likely visitor arrives from Google Maps on a phone with a concrete repair need. They need to trust the shop, understand that the shop handles their problem, and call or schedule quickly.

The concept may show `4.7 on Google · 269 reviews` as a clearly labeled research snapshot, not an eternal fact. Do not fabricate individual testimonials, guarantees, turnaround times, prices, certifications, warranties, promotions, customer names, or company age. The current site says its mechanics have 30+ years of experience; if used, phrase it precisely as a business-published claim, not the age of the company. Avoid unverified testimonial quotations entirely.

## Art direction: Brooklyn night shift

Version A's hero is the anchor and should remain recognizably related. Keep the full-bleed cinematic garage image, strong wide headline, real phone, hours, address context, and immediate conversion. Refine rather than replace its emotional core.

The rest of Version A becomes too much of a component showcase. Remove or radically simplify the marquee, service bento, long accordion, generic process stack, and carousel feeling. The final page should feel like one authored visual story with fewer, larger chapters.

Use the existing Higgsfield assets as cinematic media, not thumbnails:

- `public/assets/prospect-hero.webp`
- `public/assets/prospect-brakes.webp`
- `public/assets/prospect-bodywork.webp`
- existing responsive variants

Crop and reuse them creatively with CSS masks, art direction, slow parallax, texture, gradients, and split compositions. Do not use remote stock placeholders. Do not imply the generated images are actual photos of Prospect's shop; retain a discreet concept disclaimer in the footer.

The page should be predominantly off-black/charcoal with warm ivory typography and one restrained oxide/red accent. Use grain, warm light, fine rules, cinematic crops, and controlled depth. No glassmorphism, neon, purple, blue gradients, dashboard cards, rounded-card spam, cheap badges, section-number labels, floating stamps, icons for decoration, or generic agency effects.

## Required experience

Build a concise AIDA page:

Attention: a full-viewport cinematic hero with no more than 2–3 headline lines, immediate `Schedule service` and `Call the shop` actions, and visible practical trust information. Desktop and mobile must both feel composed.

Interest: a compact, editorial service index that quickly answers “do they handle my problem?” It should cover the verified service categories without eight separate generic cards.

Desire: one signature GSAP scroll chapter using the brake and bodywork imagery at large scale. The visual sequence should communicate precision, diagnosis, and repair without fake claims. Use one pinned/scrubbed story on desktop and a graceful non-pinned stacked fallback on mobile. Use only transform/opacity/clip-path motion and respect `prefers-reduced-motion`.

Proof: a quiet, high-trust reputation/location section using the Google snapshot, real address, hours, phone, and `Se habla español`. Do not use invented quote cards.

Action: a powerful final schedule-service area with a working, validated demo form and a direct telephone link. Keep the form concise. Show clear success and error states; do not use `alert()`. Make it obvious this is an independent concept preview and the form is a demonstration if it does not submit to a real backend.

Include one elegant, update-ready strip for current specials or seasonal service, but do not invent a discount. It can say that current offers are available by calling the shop or present a neutral `Ask about current service specials` action.

## Interaction and implementation requirements

- Persistent, elegant desktop navigation; compact mobile menu; visible keyboard focus states.
- A persistent mobile call affordance that does not obscure content or the browser safe area.
- Real anchor destinations and telephone/map links; no dead `href="#"` links.
- Semantic landmarks, skip link, descriptive alt text, correct heading order, form labels, and accessible menu behavior.
- Prevent horizontal overflow at every viewport.
- Hero headline must remain 2–3 lines at common desktop widths and no more than 4 lines on 390px mobile.
- Keep motion sophisticated but sparse. One major scroll sequence plus restrained page-load and reveal behavior is enough.
- Performance: responsive WebP sources, explicit image dimensions or aspect ratios, no autoplay video, no unnecessary dependencies, and avoid expensive filters on full-screen animated layers where possible.
- Preserve `noindex,nofollow`, the independent-concept disclaimer, robots exclusions, and the project favicon.
- Set Vite's base path to `/prospect-auto-concept/final/` and update canonical/OG metadata accordingly.
- The site must work from static GitHub Pages under that subpath.

## Quality gates

Run and fix all failures from:

`npm run format`

`npm run typecheck`

`npm run lint`

`npm run build`

Then update `FINAL_DESIGN_NOTES.md` with the completed audit, what was removed from Version A, the intentional visual system, conversion reasoning, motion behavior, responsive behavior, and the exact verification commands/results. Do not claim browser or Lighthouse verification you did not perform; a separate reviewer will do that after your run.

This should feel custom-built for a respected Brooklyn garage: confident, useful, cinematic, and restrained. The expensive quality must come from typography, image direction, spacing, hierarchy, and precision—not from piling on effects.
