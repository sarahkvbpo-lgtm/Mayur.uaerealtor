# Mayur UAE Realtor

A private, mobile-friendly UAE real estate homepage. Built on the existing sarahkvbpo-lgtm/Mayur.uaerealtor repository with React, Vinext and the Sites Cloudflare runtime.

## Edit from a phone

1. Open this repository in the GitHub mobile app or mobile browser.
2. Open `content/site.json`, then use the pencil / Edit button.
3. Change text inside quotation marks. Keep commas and brackets intact. The brand, hero, services, neighbourhoods, form choices and FAQ are all here.
4. Commit to your working branch. Request a private deployment in ChatGPT to publish the updated source to this Site. A GitHub commit alone does not update Sites.

Page layout and interactions: `app/page.tsx`. Colours and spacing: `app/globals.css` (the colour variables are at the top). Local photographs: `public/images/`.

## Enquiries

The three-step form validates details, asks for enquiry-specific consent, shows a review, and sends to `/api/enquiries`. Valid submissions are stored in the Site's D1 `enquiries` table; stable request IDs prevent duplicate retry submissions. Success is shown only after the database acknowledges the write. Errors retain the form so it can be retried. There is no public endpoint for reading leads.

Read enquiries through **Sites → this Site → Settings → Database → enquiries**, or ask ChatGPT to read this Site's enquiry records. The private preview is limited to its owner. Email notifications and WhatsApp delivery are not configured; the site makes no delivery or response-time promise. Add verified business contact details and any required business disclosures before approving a public launch.

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

Desktop navigation and a complete Sell enquiry were tested in the browser. At a 390px frame width, the mobile menu, section navigation, rental preference transfer, phone validation, privacy dialog and a complete Rent enquiry passed. Both saved records were verified in the local database. The production build, strict TypeScript check and whitespace check passed. No real client data was used for QA.
