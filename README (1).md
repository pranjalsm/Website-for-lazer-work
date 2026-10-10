# Laser Head Service Kolhapur — Version 1

Responsive React + Vite website for Soujany Mithari, independent fiber laser head service engineer.

## What's included
- Responsive business homepage and service cards
- Call and WhatsApp contact links
- Service areas: Kolhapur, Sangli and Satara
- Supported brand list from the supplied business card
- Video/work gallery placeholders ready to replace with genuine media
- Instagram profile placeholder
- SEO title, description, canonical URL, robots meta and basic ProfessionalService JSON-LD
- Optional Express server starter

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## GitHub: create a develop branch
If the repository already has `master`, run these commands in a local clone:

```bash
git clone https://github.com/pranjalsm/Website-for-lazer-work.git
cd Website-for-lazer-work
git checkout -b develop
```

Copy the contents of this project folder into the repository, then:

```bash
git add .
git commit -m "Build Version 1 laser head service website"
git push -u origin develop
```

If `develop` already exists remotely, use `git fetch origin` and `git checkout -b develop origin/develop` instead.

## Before launch
1. Verify the phone number and email are correct.
2. Replace `YOUR_INSTAGRAM_USERNAME` in `src/App.jsx` with the actual professional Instagram username.
3. Add genuine service photos/videos in `public/media/` and update the gallery items.
4. Confirm exact service capabilities and supported brands/models.
5. Confirm the domain is registered and point its DNS to the chosen host.
6. Update canonical URL if the final domain differs.
7. Deploy the site and submit its sitemap to Google Search Console.

## Notes
- This project does not automatically publish itself to GitHub or deploy to the internet.
- The contact form currently opens WhatsApp with the visitor's message; it does not store data on a server.
- No claim of official authorization from any equipment brand is made.
