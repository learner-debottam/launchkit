# LaunchKit with Supabase Auth

## Setup Instructions

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Run tests**:
```bash
# Unit tests
npm test

# E2E tests
npx playwright test
```

## Features Implemented

- Email/password authentication
- Google OAuth integration
- Protected routes with middleware
- Session management
- Row-level security policies
- Unit and E2E test coverage

## Project Structure

```
├── app/                   # Next.js app router
│   ├── (auth)/            # Auth routes
│   ├── (dashboard)/       # Protected routes  
│   └── auth/              # Auth callback/logout
├── lib/supabase/          # Supabase client helpers
├── supabase/migrations/   # Database schema
├── tests/                 # Unit tests
└── e2e/                   # E2E tests
```

See [SECURITY.md](./SECURITY.md) for security best practices.
