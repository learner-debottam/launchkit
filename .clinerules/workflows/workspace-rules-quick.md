# LaunchKit – Quick Workspace Rules

**Purpose:** Quick reference for contributors & AI tools to follow standards and output format.

---

## Project Meta
- Name: LaunchKit  
- Stack: Next.js 14 (App Router), TypeScript (strict), Supabase, Stripe, Tailwind, Jest/Vitest, Playwright, Docker, GitHub Actions  
- License: MIT  
- Package Manager: pnpm (default)

---

## Coding Standards
- TypeScript strict mode + interfaces.  
- ESLint + Prettier enforced.  
- 12-factor app principles.  
- Accessibility (a11y) & responsive UI required.  
- No secrets in code; `.env.example` must have placeholders.  

---

## Project Structure
- `app/` → Next.js pages/layouts/components  
- `components/` → Reusable UI  
- `lib/` → Utilities, helpers, middleware  
- `app/api/` → API routes  
- `tests/` → Unit & integration  
- `e2e/` → Playwright tests  
- `docs/` → Setup & troubleshooting  
- `marketing/` → Launch page copy  
- `.github/workflows/` → CI/CD  

---

## Auth & RBAC
- Supabase auth (email + Google).  
- Roles: `admin` / `user`. Admin routes protected.  
- RLS enforced; session cookies secure.  
- Tests required for auth & middleware.  

---

## Payments / Stripe
- Checkout subscriptions (monthly/annual).  
- Secure webhooks (`STRIPE_WEBHOOK_SECRET`) with idempotency.  
- Sync subscriptions to Supabase.  
- Include unit/integration tests.

---

## CI/CD & DevOps
- PR: `lint → test → build`  
- Main branch deploys to Vercel  
- Preview deployments encouraged  
- Cache node_modules for speed  
- Semantic-release for releases  

---

## Testing
- Unit: Jest/Vitest  
- Integration: Supertest  
- E2E: Playwright  
- CI must run tests  
- Mock sensitive env vars in CI  

---

## Docker & Local Dev
- Dockerfile + docker-compose for dev  
- Include `.dockerignore`  
- Makefile recommended (`make dev/up/down/build`)  
- Guidance for local Supabase optional  

---

## Observability & Logging
- Structured logs (JSON)  
- Optional Sentry (`SENTRY_DSN`)  
- Monitor auth errors & webhooks  
- No secrets in logs  

---

## Performance & Caching
- Edge/ISR caching for public pages  
- Cache API responses (`Cache-Control`)  
- Optimize images via Next.js Image  
- DB indexes for `users` & `subscriptions`  

---

## Docs & Marketing
- `README.md` → setup, run, test, deploy  
- `docs/SETUP.md` → Supabase + Stripe + env  
- `docs/TROUBLESHOOTING.md` → top 10 issues & fixes  
- Landing page copy in `marketing/`  
- `.env.example` updated with new vars  

---

## AI / OpenRouter
- Output: **git patch** or JSON (`files:{}`)  
- Include tests, docs, Docker updates  
- Security-critical code must include verification  
- Multi-file changes → single atomic patch  

---

## Developer Experience
- VS Code settings for formatting/linting  
- `package.json` scripts: dev, build, start, lint, test, e2e, format  
- Local preview: `pnpm dev` / `docker-compose up`  
- Clean repo + Conventional Commits  
- Update CHANGELOG  

---

## Security
- Sanitize inputs; validate API requests  
- Parameterized queries / Supabase helpers  
- Protect secrets, env vars, webhooks  
- CSRF/XSS protections  
- No logging secrets  
- Stripe & Supabase keys only from `.env`  

---
