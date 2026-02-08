# Parasar Makwana — Portfolio (Angular 20)

Personal portfolio single-page app built with Angular. Content is managed via translations in `src/assets/i18n/` (EN/ES/FR/JA/GU).

## Contact
- **Email**: `parasarmakwana18@gmail.com`
- **LinkedIn**: `https://www.linkedin.com/in/parasar-makwana/`
- **Phone**: `+91 8160648748`

Contact links are centralized in `src/app/config/social-links.ts`.

## Prerequisites
- Node.js + npm

Angular CLI is optional (this repo uses the local CLI).

## Install
```bash
npm install
```

## Run (development)
```bash
npm start
```
Then open `http://localhost:4200`.

## Build (production)
```bash
npm run build-portfolio
```
Output: `dist/parasar-makwana-portfolio/`

Note: production is configured with a **relative base href** (`./`) so assets work on subpaths (e.g., GitHub Pages) as well as root domains.

## Deploy (GitHub Pages)
```bash
npm run deploy
```
If you use a custom domain, set it in `CNAME` (and the deploy script will copy it into the build output).

## Attribution (design inspiration)
This portfolio is inspired by Brittany Chiang’s work (design inspiration). See her repo: `https://github.com/bchiang7/v4`.