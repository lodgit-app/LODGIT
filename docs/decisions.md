# LODGIT decisions log

Big decisions and why we made them. Newest at the bottom.
Format: date, the decision, then why.

## 2026-10-27: The app is called LODGIT

## 2026-10-29: One repo for web, phone and shared code (monorepo)
- Tools: pnpm workspaces and Turborepo
- Why: web and phone share the same labels and money rules, so they can never disagree. One command (`pnpm dev`) runs everything

## 2026-10-29: Node 26 and pnpm for everyone
- Why: same versions on every laptop avoids "it works on mine" problems. The version is saved in `.nvmrc`

## 2026-10-29: Money is saved in pence as whole numbers
- £120.00 is saved as `12000`
- Why: decimals cause rounding mistakes in computers (0.1 + 0.2 is not exactly 0.3). Whole numbers are always exact

## 2026-10-29: All times are saved in UTC
- Why: one time zone for everything avoids bugs when the clocks change. The apps convert to local time on screen

## 2026-10-29: One checkout for solo and group bookings
- A solo booking is just a booking with 1 payer
- Why: one system to build and test instead of two

## 2026-10-29: Group bookings: the organiser picks, friends just pay
- No voting. The organiser picks the place and books it
- Friends get a payment link from the organiser (shared however they like, for example WhatsApp)
- Friends need no account. They don't chat or review
- Why: keeps the star feature focused on split payments, which is the hard and impressive part

## 2026-10-29: Split payment rules
- The cost is split equally. The organiser covers any leftover pennies (£100 for 3 is £33.34, £33.33, £33.33)
- Money is held, not taken, until everyone has paid. Then all cards are charged
- Group bookings hold the dates for 48 hours. If time runs out, every hold is released
- Why: nobody pays for a stay that doesn't happen, and nobody else can book the dates while the group pays

## 2026-10-29: Solo bookings hold the dates for about 15 minutes at checkout
- Why: stops two people paying for the same dates at the same time

## 2026-10-29: Only the organiser can message the host and leave a review
- Why: the organiser is the host's one point of contact. Fewer chats to manage

## 2026-10-29: Simple branch names
- Format: `your-name/what-you're-doing`, for example `afeez/project-setup`
- Why: easy to remember, and you can see whose branch it is at a glance

## 2026-11-08: Shared labels are written with Zod
- Each drawer's shape is written once in `packages/shared/src/schemas.ts`
- Why: Zod checks real data while the app runs, and gives us the TypeScript types for free. One source of truth for web, phone and backend