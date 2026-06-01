# Divya Hiren Savla Portfolio

Premium AI-engineer themed personal portfolio for Divya Hiren Savla, built with React, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- HTML metadata for SEO

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview the production build:

   ```bash
   npm run preview
   ```

## Deployment

The project is configured for free deployment on Vercel and Netlify.

For a step-by-step publish guide, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Vercel

- Connect the repository to Vercel.
- Use the default build command: `npm run build`.
- Use the output directory: `dist`.
- The included [vercel.json](vercel.json) provides SPA routing and security headers.

### Netlify

- Connect the repository to Netlify.
- The included [netlify.toml](netlify.toml) sets the build command and redirect rules.

## Editing the Portfolio Later

- Update personal links and contact details in [src/App.jsx](src/App.jsx).
- Update the SEO metadata and social tags in [index.html](index.html).
- Update project references or content cards in [src/App.jsx](src/App.jsx).
- Replace the resume file or the download link in the hero section if needed.

## Notes

- Project demo links currently point to public reference sites similar to the showcased work.
- To publish publicly, connect the repository to a free host such as Vercel and let it build from the `main` branch.
