# ease-io-code-exercise

A [Next.js](https://nextjs.org) application (App Router) for the Ease.io code exercise.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended; Next.js 16 expects a current LTS release)
- [Yarn](https://yarnpkg.com/) (this repo uses a `yarn.lock`)

## Setup

1. Clone the repository and open the project directory.

2. **Environment variables:** This app talks to the Hugging Face API via `lib/huggingface.ts` and requires **`HUGGING_FACE_TOKEN`** at runtime. Use a **read** token from your [Hugging Face account settings](https://huggingface.co/settings/tokens) (create a token with at least read access).

   For **local development**, add a `.env.local` file in the project root (Next.js loads it automatically). You can start from `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

   Then set `HUGGING_FACE_TOKEN` in `.env.local` to your token. Do not commit `.env.local`; it is for your machine only.

3. Install dependencies:

   ```bash
   yarn install
   ```

4. **End-to-end tests (Playwright):** install browser binaries once on your machine:

   ```bash
   yarn playwright install
   ```

## Run the project

**Development** (hot reload, default [http://localhost:3000](http://localhost:3000)):

```bash
yarn dev
```

**Production build and serve:**

```bash
yarn build
yarn start
```

## Run tests

The suite lives under `tests/` and uses [Playwright](https://playwright.dev/). The config starts the app with `next start`, so you need a **production build** before tests can run.

```bash
yarn build
yarn playwright test
```

Playwright will start the server on port 3000 when needed. If you already have the app running on that port, it may reuse it (see `reuseExistingServer` in `playwright.config.ts`).

After a run, open the HTML report if you need more detail:

```bash
yarn playwright show-report
```
