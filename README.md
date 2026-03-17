# The Ratio Web Application

## Project Overview

This repository contains the production website for The Ratio, a design and construction firm delivering architecture, interior design, and construction services.

The application is a content-rich marketing and lead-generation platform with:

- service pages (architecture, interior design, construction, property development)
- a projects portfolio with animated project detail pages
- editorial/blog and supporting brand pages
- contact flows and analytics integrations

## Tech Stack

Detected from `package.json` and current source:

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for UI animation
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form handling/validation
- [Sanity client](https://www.sanity.io/docs/js-client) for CMS integration
- ESLint (Next.js config)

## Installation

### 1. Clone

```bash
git clone <your-repo-url>
cd Ratio-PMO/ratio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Populate the values needed for your environment.

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

Key directories:

- `app/` - route segments, layouts, and API routes (`app/api/*`)
- `components/` - reusable UI and page composition components
- `lib/` - domain/data/utility modules (projects, seo, analytics, cms, validation)
- `content/` - static/local content sources
- `public/` - static assets (images, videos, icons)
- `styles/` - shared styling entry points
- `sanity/` - Sanity schema/config files

Notable project assets:

- `public/images/projects/` - project galleries used by `/projects` and `/projects/[slug]`
- `lib/projects/data.ts` - canonical project metadata and gallery image mapping

## Development Guidelines

- Reuse existing components and patterns before introducing new abstractions.
- Preserve established visual language: typography, spacing scale, motion timing, and interaction behavior.
- Keep route structure stable (`app/*`) and avoid breaking existing links.
- Maintain TypeScript strictness and run lint/build checks before committing.
- Prefer semantic HTML and accessible interactive controls (labels, ARIA where required, focus states).

## Deployment (Vercel)

Recommended deployment target is Vercel.

1. Connect the repository to a Vercel project.
2. Set all required environment variables in Vercel Project Settings.
3. Use the default Next.js build command:
   - Build: `npm run build`
   - Output: `.next`
4. Deploy from the main branch or preview branches as needed.

For local production verification:

```bash
npm run build
npm run start
```

## Environment Variables

Current variables referenced in the codebase:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID`
- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`
- `GOOGLE_APPS_SCRIPT_WEBHOOK_SECRET`

Use `.env.local.example` as the baseline template.

## Repository Safety Checks

Before shipping or deploying:

- Confirm no secrets/API keys are committed in tracked files.
- Keep `.env*` files ignored (this repo ignores `.env*` and intentionally allows `.env.local.example`).
- Validate `.gitignore` includes local build, cache, and environment artifacts.
- Run:

```bash
npm run lint
npm run build
```

## License

This repository already includes a `LICENSE` file. Review it before external distribution.
