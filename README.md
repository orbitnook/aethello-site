# Aethello marketing site

Independent public website for Aethello. This repository contains only the homepage and early-access registration experience. It has no product authentication or product routes.

## Local development

1. Copy `.env.example` to `.env.local` and add the public Supabase project URL and publishable key.
2. Run `npm install`.
3. Start the site on its dedicated local port:

```bash
npm run dev -- -p 3001
```

The Aethello product can run independently from its sibling repository on port 3000.

## Checks

```bash
npm run lint
npm test
npm run build
```

The shared Supabase project owns the `request_early_access` migration. This app calls that anonymous RPC with the public publishable key and never uses a service-role key.
