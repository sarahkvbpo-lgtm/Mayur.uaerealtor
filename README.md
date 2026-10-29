# Mayur | UAE Luxury Real Estate

A buildless, mobile-friendly starter for Mayur's property brand. Dark green, ivory and gold; local skyline artwork; no packages, paid assets or build tools required.

## File plan

| File | Edit this for |
| --- | --- |
| `index.html` | Homepage wording, five services, areas, FAQs and form fields |
| `settings.js` | Verified email, international phone and WhatsApp number |
| `styles.css` | Colours (variables at top), spacing and responsive layouts |
| `script.js` | Mobile menu and enquiry preparation/copy/email behavior |
| `assets/skyline.svg` | Original illustrative skyline; replace with licensed photography if preferred |
| `assets/mark.svg` | M favicon |
| `.nojekyll` | Serve the files directly on GitHub Pages |
| `README.md` | This mobile editing and launch guide |

## Edit from your phone

1. Open this repository on GitHub in your mobile browser. After merging the starter pull request, select `main`.
2. Tap `settings.js`, then the pencil icon (it may be inside the file's `…` menu).
3. Add your business email between the quotes. Add WhatsApp digits with country code, without `+` or spaces. For `phone`, use international format starting with `+`. Keep quotes, commas and braces intact.
4. Tap **Commit changes**, describe the change and commit to a branch for review, or `main` for a direct edit.
5. To change copy, open `index.html`, use your browser's Find in page to find the sentence, then edit only the text between HTML tags.
6. Change colours at the top of `styles.css`. You do not need to edit `script.js` for routine updates.

## Contact behavior — read before launch

The form validates name, email, brief and consent. It prepares a visible enquiry with a copy button. With a valid email in `settings.js`, it also creates an **Open email app** link with the enquiry prefilled. The visitor must review and send it themselves. Preparing an enquiry never means it was delivered.

Contact values are intentionally blank until confirmed. With blank email, visitors can copy the enquiry but cannot send it directly from the site. Do not launch for lead generation until your real contact information is added and tested. Direct phone and WhatsApp links appear only after configuration.

No backend, inbox, CRM, database, automatic email, cookies, analytics or browser storage is included. No form data is transmitted by this site. Email/WhatsApp providers process information when the visitor chooses to use them. For automatic lead capture later, add a vetted form endpoint and update the privacy wording and success/error behavior.

## Deploy with GitHub Pages

After the pull request is merged:

1. Repository → **Settings** (on a phone, scroll the repository tabs or use **…**).
2. **Pages** → **Build and deployment** → **Source: Deploy from a branch**.
3. Choose **main**, folder **/(root)** → **Save**.
4. Wait for GitHub's Pages deployment and use the URL shown there.

Expected address, once deployment succeeds: `https://sarahkvbpo-lgtm.github.io/Mayur.uaerealtor/`. This is an expected address, not a verified live deployment. Relative assets and links support this repository subpath.

Reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Deploy with Vercel

1. Vercel dashboard → **Add New…** → **Project** → import `sarahkvbpo-lgtm/Mayur.uaerealtor`.
2. Use the **main** branch and repository root. Set **Framework Preset: Other**.
3. No build or install command is needed. If overriding Output Directory, use `.` (the repository root).
4. Select **Deploy**. Use the URL returned by Vercel; no deployment has been created by this starter.
5. Future commits to the connected production branch will trigger deployments. Changes on other branches may create previews.

Reference: https://vercel.com/docs/builds/configure-a-build

## Before public launch

- Configure verified contact details and complete a real enquiry on your phone: prepare → email app → send → confirm receipt.
- Confirm that the public name, services and business representation are accurate. Add the applicable brokerage, licence/registration and advertising information before advertising properties.
- Community sections are inspiration, not available listings. No prices, returns, testimonials or credentials have been invented.
- Mortgage content offers introductions, not lending approval or financial advice.
- Confirm the privacy wording matches any tools you add. Do not put private keys, customer data or identity documents in this public repository.
- Check menu, keyboard focus, every service link, form errors, copy fallback and direct-contact links at mobile and desktop widths.

## Local preview

Open `index.html` directly, or run `python3 -m http.server 8000` inside this folder and visit `http://localhost:8000`. Clipboard access can depend on browser permissions; a manual selection fallback is included.

## Verification in the implementation session

JavaScript syntax and structural link/asset checks passed. Enquiry generation, configured/unconfigured email handling, clipboard behavior, service selection and mobile-menu state were checked with a simulated DOM. No visual browser QA or real email delivery test was performed. Hosting was not enabled.
