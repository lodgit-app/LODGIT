# LODGIT

A short-stay booking app for web, iOS and Android. Book with friends, split the cost and search stays by vibe or photo with AI.

> Portfolio project, in progress. Payments use Stripe test mode only, so no real money is involved.

## Team

| Name | Role |
| --- | --- |
| Afeez | Backend and AI: database, logins, payments, split payments, AI search |
| Bugs | Website and design: the website, Figma designs, map, host dashboard |
| Abu | Phone app: iPhone and Android app, chat, notifications, Apple Pay and Google Pay |

## Tech

- **Website:** Next.js
- **Phone app:** Expo (React Native)
- **Database, logins and photos:** Supabase
- **Payments:** Stripe (test mode)
- **Error tracking:** Sentry
- **Project tools:** pnpm workspaces, Turborepo, TypeScript, Zod and Vitest

## Project layout

```
LODGIT/
├── apps/
│   ├── web/          Website (Bugs)
│   └── mobile/       Phone app (Abu)
├── packages/
│   └── shared/       Shared labels and money rules, used by web and phone
├── supabase/         Database files (coming next)
└── docs/
    └── decisions.md  Big decisions and why we made them
```

## Getting started

### 1. Install these once

- [Git](https://git-scm.com)
- [Node.js 26 LTS](https://nodejs.org)
- pnpm: run `npm install -g pnpm`
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (only needed for database work)

### 2. Download the project

```bash
git clone https://github.com/lodgit-app/LODGIT.git
cd LODGIT
pnpm install
```

### 3. Check it works

```bash
pnpm typecheck
pnpm test
```

Both should pass with no errors.

### 4. Add your keys

Copy `.env.example`, rename the copy to `.env` and fill in the values. Ask Afeez for them. Never put real keys in `.env.example`, and never paste them in the group chat.

**Key names in the apps:** public keys need a prefix so the app is allowed to read them.

| Where | Prefix | Example |
| --- | --- | --- |
| Website | `NEXT_PUBLIC_` | `NEXT_PUBLIC_SUPABASE_URL` |
| Phone app | `EXPO_PUBLIC_` | `EXPO_PUBLIC_SUPABASE_URL` |

Only the publishable keys and Sentry DSNs get a prefix. Keys marked **SERVER ONLY** never go in website or phone code.

## Using the shared labels

The labels from the database plan live in `packages/shared`. Use them in the website and phone app like this:

```ts
import { listingSchema, formatPence, type Listing } from "@lodgit/shared";

formatPence(12000); // "£120.00"
```

Need a label that isn't there? Ask Afeez first, so web and phone always match the database.

## How we work

1. Pick a job from the board and move it to Doing
2. Make a branch named `your-name/what-you're-doing`, for example `bugs/home-page`
3. Commit often with a clear note
4. Open a pull request with screenshots
5. A teammate checks it within 24 hours
6. The automatic checks must pass (green ✓)
7. Merge it and delete the branch

Nobody changes `main` directly.

## Golden rules

- Money is saved in pence as whole numbers. £120 is `12000`
- All times are saved in UTC
- Database changes only through migration files
- Use pnpm, not npm, inside the project