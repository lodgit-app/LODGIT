# LODGIT

Team booking app.

## Structure

- `apps/mobile` — Expo phone app
- `apps/web` — Next.js website, coming soon
- `packages/shared` — shared code, coming soon

## Run the phone app

Install Node.js LTS, Git, and Expo Go on each phone. This app uses Expo SDK 58, the current Expo release, so the current Expo Go can open it.

```bash
git clone https://github.com/lodgit-app/LODGIT.git
cd LODGIT/apps/mobile
npm install
npx expo start
```

Scan the QR code with Expo Go. Both phones can scan the same code.

If a phone cannot reach the computer, stop the server and run `npx expo start --tunnel`. If Expo asks you to sign in, use the same account in Expo Go and in the Expo CLI (`npx expo login`).

## Screens

Every file in `apps/mobile/src/app` is a screen. `_layout.tsx` controls how those screens are arranged.
