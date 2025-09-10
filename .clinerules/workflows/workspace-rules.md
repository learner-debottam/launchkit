# LaunchKit – Comprehensive Workspace Rules

These rules apply globally to all code generation and developer work in this repository.

---

## 1. Project Meta
- **Project Name:** LaunchKit  
- **Tech Stack:** Next.js 14 (App Router), TypeScript (strict mode), Supabase, Stripe, TailwindCSS, Jest + Vitest, Playwright, Docker, GitHub Actions CI/CD  
- **License:** MIT  
- **Package Manager:** pnpm (default; npm optional)  
- Repo structure: Clean, modular, and scalable for multi-file, multi-feature SaaS.

---

## 2. Coding Standards
- TypeScript **strict mode** enforced; use types/interfaces wherever possible.  
- ESLint + Prettier configuration enforced; all generated code must comply.  
- 12-factor app principles followed for environment, configs, logging, and deployment.  
- Use descriptive variable/function names; avoid unused variables.  
- All new code must have **unit tests or integration tests**.  
- Accessibility (a11y) implemented: semantic HTML, keyboard navigation, ARIA labels where needed.  
- Responsive design required; Tailwind classes must support mobile-first.  
- No hard-coded secrets or API keys; `.env.example` must include placeholders.

---

## 3. Project Structure
- **app/** → Next.js App Router pages, layouts, server/client components.  
- **components/** → Reusable UI components.  
- **lib/** → Utilities, Supabase client helpers, Stripe helpers, middleware, logging.  
- **app/api/** → API routes.  
- **tests/** → Unit & integration tests.  
- **e2e/** → Playwright end-to-end tests.  
- **docs/** → Setup guides, troubleshooting, developer guides.  
- **marketing/** → Launch page copy, product assets.  
- **.github/workflows/** → CI/CD pipelines.  

---

## 4. Authentication & Authorization
- Supabase auth (email/password + Google OAuth).  
- RBAC (admin/user) with server-side middleware. Admin-only routes must redirect unauthorized users to `/403`.  
- Secure session cookies; server-side session verification preferred.  
- RLS (Row-Level Security) policies applied: users can access only their data; admins can access all.  
- Include unit tests for auth and middleware; E2E tests for login/signup flows.

---

## 5. Payments & Stripe
- Stripe Checkout for subscription products (monthly/annual).  
- Secure webhook endpoint validating `STRIPE_WEBHOOK_SECRET`.  
- Sync subscription status with Supabase `subscriptions` table.  
- Webhook handlers must include **idempotency handling**.  
- Include unit/integration tests for webhook and subscription logic.  
- Provide sample Stripe CLI commands in docs for setup.  

---

## 6. CI/CD & DevOps
- GitHub Actions for PRs: `lint → test → build`.  
- Main branch deploys to **Vercel** (with service token).  
- Preview deployments for PRs encouraged.  
- Caching node_modules for faster builds.  
- Release automation via semantic-release or similar.  
- Include GitHub secrets placeholders and docs on connecting Vercel.  

---

## 7. Testing
- Unit testing: Jest or Vitest (config in `package.json`).  
- Integration testing: Supertest or similar for API routes.  
- E2E testing: Playwright for auth + Stripe + dashboard flows.  
- CI must run tests automatically.  
- Document how to mock sensitive env variables for CI.  

---

## 8. Docker & Local Dev
- Dockerfile + docker-compose for local dev (Next.js + optional Postgres).  
- Include `.dockerignore`.  
- Makefile recommended: `make dev`, `make up`, `make down`, `make build`.  
- Provide guidance on running Supabase locally vs cloud.  

---

## 9. Observability & Logging
- Structured logging (JSON) for server-side operations.  
- Optional Sentry integration (server + client) with `SENTRY_DSN` placeholder.  
- Log errors without exposing secrets.  
- Include monitoring points for auth errors, Stripe webhooks, and API failures.  

---

## 10. Performance & Caching
- Use edge/ISR caching for public pages.  
- Cache API responses where appropriate (`Cache-Control` headers).  
- Optimize images via Next.js Image component.  
- Add DB indexes for frequently queried tables (`users`, `subscriptions`).  
- Provide minimal Lighthouse/Pagespeed checklist.  

---

## 11. Documentation & Marketing
- `README.md` → setup, run, test, deploy instructions.  
- `docs/SETUP.md` → detailed Supabase + Stripe + env setup.  
- `docs/TROUBLESHOOTING.md` → top 10 common issues & fixes.  
- Landing page / marketing copy in `marketing/` folder (Gumroad/Product Hunt).  
- Include `.env.example` for any new environment variables.  

---

## 12. AI / OpenRouter Usage Rules
- All AI-generated outputs must comply with workspace rules.  
- Output preferred: **git patch** (diff) or JSON with `"files": {...}`.  
- No extra prose before the patch/JSON; optional short bullet points after (≤5).  
- Include tests, Docker updates, and docs for any new feature.  
- Security-critical code (auth, payments, webhooks) must include verification and test instructions.  
- For multi-file changes, generate as a single atomic patch if possible.  

---

## 13. Developer Experience
- Provide VS Code settings (`.vscode/settings.json`) for TypeScript, formatting, linting.  
- `package.json` scripts must include: dev, build, start, lint, test, e2e, format.  
- Encourage local preview: `pnpm dev`, `docker-compose up`.  
- Keep repo clean and organized; commit messages follow Conventional Commits.  
- Update CHANGELOG for new features or bug fixes.  

---

## 14. Security
- Sanitize all inputs, validate API requests.  
- Use parameterized queries or Supabase helpers.  
- Protect secrets, environment variables, and webhooks.  
- CSRF/XSS protections included for all API routes.  
- No logging of sensitive info.  
- Ensure Stripe and Supabase keys always come from `.env`.  

---
