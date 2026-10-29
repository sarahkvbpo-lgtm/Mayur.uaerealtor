# Mayur UAE Realtor

A private, mobile-friendly UAE real estate homepage. Built on the existing sarahkvbpo-lgtm/Mayur.uaerealtor repository with React, Vinext and the Sites Cloudflare runtime.

## Edit from a phone

1. Open this repository in the GitHub mobile app or mobile browser.
2. Open `content/site.json`, then use the pencil / Edit button.
3. Change text inside quotation marks. Keep commas and brackets intact. The brand, tagline, business contact details, social profile links, hero, services, neighbourhoods, form choices and FAQ are all here.
4. Commit to your working branch. Request a private deployment in ChatGPT to publish the updated source to this Site. A GitHub commit alone does not update Sites.

Page layout and interactions: `app/page.tsx`. Colours and spacing: `app/globals.css` (the colour variables are at the top). Local photographs: `public/images/`.

## Enquiries

The three-step form validates contact details, asks for enquiry-specific consent, and shows a review. **Open email app** is a native `mailto:` link addressed to **connect2realtor.56@gmail.com**, with the complete enquiry in its subject and body. The visitor must tap **Send** in their email app. The website never claims an email has been sent or automatically sends mail. A copyable subject and message are available if no email app is configured.

Call Now actions and displayed phone numbers open an accessible on-page call dialog. Its Open phone dialler link uses `tel:+971585672791` with a separate target, so a preview that cannot handle telephone links does not replace the website. Copy number uses the clipboard when available and falls back to selecting the number for manual copying. All phone actions share this flow. The footer displays both the phone number and email address. These details can be changed in `content/site.json`.

New enquiries use the visitor’s email app, with no database submission. The previous D1 table and migration history are retained for historical records; its former submission API has been removed. Historical records can be reviewed through the Site's Settings → Database → enquiries. No public lead-reading endpoint is exposed.

## Development

- Use Node 22.13 or newer and pnpm.
- `pnpm install`
- `pnpm db:generate` after schema changes; do not rewrite applied migrations.
- `pnpm dev`
- `pnpm exec tsc --noEmit`
- Build through the Sites `build-site.mjs` helper, preserving its hosting integration.
- Local D1 migrations: follow the Sites starter instructions with `--config dist/server/wrangler.json --persist-to .wrangler/state` and the generated SQL file.

## Hosting and privacy

`.openai/hosting.json` binds this source to a private Sites project and declares the DB binding. Deployment and access are managed through Sites. Keep the Site private until the owner explicitly approves public access. Search-engine indexing is disabled in metadata; access control is enforced by the hosting platform, not by robots metadata. The GitHub repository itself was already public when this work started; no contact records or secrets are committed to source.

Photos: Unsplash image IDs `photo-1512453979798-5ea266f8880c` (Dubai skyline), `photo-1518684079-3c830dcef090` (Jumeirah coast), and `photo-1512917774080-9991f1c4c750` (architectural inspiration). They illustrate locations and lifestyle, not available property listings. No property prices, returns, testimonials or professional licence credentials have been invented.

## Verification

Initial validation covered desktop and 390px mobile navigation and enquiries. The updated contact flow passed checks for the correct telephone URI, email recipient and encoded enquiry fields, required contact validation, rental preference transfer, and mobile layout. The native email handoff preserved the page and exposed the copy-details fallback in the browser. Strict TypeScript, production build and whitespace checks pass. No phone call was made and no email was sent during testing.

Call fix validation: the embedded mobile call dialog opens without navigation, presents the exact international number and an external dialler target, and provides a selectable copy fallback. Native Phone app opening is device-dependent and is not simulated in browser QA.

## Logo and social contacts

The supplied original logo is stored at public/images/mayur-logo.png. CSS displays the gold mark from the original without changing the asset; the full supplied tagline is rendered as accessible text in the header, footer and advisor section. Call Now actions use a compact, centred icon-and-label layout with at least 44px height.

Social links in content/site.json were read from the owner-provided page https://p2.me-page.org/fa71a63355d4472b85d5cb74dbd65397 and point to WhatsApp, Instagram, Facebook, Threads, X and YouTube profiles. They open in a separate tab with noopener noreferrer. The Connect navigation item leads to the social contact section. Edit a URL in socialLinks to update a destination.

Brand/social validation: mobile and desktop previews show the supplied mark and tagline without horizontal overflow. Contact Call Now measures 124 × 46px on the 390px preview and 132 × 46px on desktop; its call dialog still opens. All six social URLs match anchors on the supplied profile page and open separately. The uploaded logo bytes are preserved exactly.
