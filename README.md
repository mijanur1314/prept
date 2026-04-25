# Prept

Prept is a full-stack interview marketplace built with Next.js 16. It connects interviewees with experienced interviewers for mock interviews, video calls, scheduling, AI-generated questions, AI feedback reports, and interviewer payouts.

## Features

- Dual-role onboarding for interviewees and interviewers
- Protected dashboard, explore, payout, and call flows with Clerk auth
- Stream-powered video calling and chat
- Credit-based booking system
- AI question generation and AI feedback using Gemini
- Interviewer availability and booking management
- Email notifications with Resend + React Email
- Arcjet-based protection for production traffic

## Tech Stack

- Next.js 16 App Router
- React 19
- Prisma 7 with PostgreSQL
- Clerk authentication
- Stream video/chat
- Google Gemini
- Arcjet
- Tailwind CSS 4
- Shadcn UI

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL database
- Accounts/keys for Clerk, Stream, Gemini, Resend, and Arcjet

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mijanur1314/prept.git
cd prept
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

This repo currently reads environment variables from `.env`.

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://..."

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."

NEXT_PUBLIC_STREAM_API_KEY="..."
STREAM_SECRET_KEY="..."

GEMINI_API_KEY="..."
RESEND_API_KEY="..."

ARCJET_KEY="..."
ARCJET_ENV="development"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_PAYOUT_PASSWORD="change-me"
```

### 4. Set up the database

Generate the Prisma client:

```bash
npx prisma generate
```

Apply the existing schema to your database:

```bash
npx prisma db push
```

If you prefer migrations:

```bash
npx prisma migrate deploy
```

### 5. Start the app

```bash
npm run dev
```

Open the local URL shown in the terminal. It is usually `http://localhost:3000`, but Next.js may choose another port if `3000` is already in use.

## Production Commands

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run lint:

```bash
npm run lint
```

## Environment Variable Notes

- `DATABASE_URL` is required by Prisma and the seed script.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are required for authentication.
- `NEXT_PUBLIC_STREAM_API_KEY` and `STREAM_SECRET_KEY` are required for video calling and call creation.
- `GEMINI_API_KEY` is required for AI question generation and feedback generation.
- `RESEND_API_KEY` is required for email delivery.
- `ARCJET_KEY` enables Arcjet in middleware.
- `ARCJET_ENV=development` is recommended locally so missing client IPs do not break protected routes during development.
- `NEXT_PUBLIC_APP_URL` is used for generated links.
- `ADMIN_PAYOUT_PASSWORD` protects payout review actions.

## Database Model Overview

Core models in Prisma:

- `User`
- `Availability`
- `Booking`
- `Feedback`
- `CreditTransaction`
- `Payout`

The Prisma client is generated into [lib/generated/prisma](/c:/Users/Sk%20Mijanur%20Rahaman/OneDrive/Desktop/prep/lib/generated/prisma), and the adapter-based Prisma setup lives in [lib/prisma.js](/c:/Users/Sk%20Mijanur%20Rahaman/OneDrive/Desktop/prep/lib/prisma.js).

## Project Structure

```text
actions/      Server actions and business logic
app/          Next.js routes, layouts, and API handlers
components/   UI components and route-specific components
emails/       React Email templates
hooks/        Custom hooks
lib/          Shared utilities, Prisma, Arcjet helpers, and app data
prisma/       Prisma schema, migrations, and seed helpers
public/       Static assets
```

## Local Troubleshooting

### Dev server lock error

If you see a message like `Unable to acquire lock at .next/dev/lock`, an old Next.js dev process is still running.

Stop old Node processes and restart:

```powershell
Get-Process node
Stop-Process -Id <PID> -Force
npm run dev
```

If needed, remove the stale lock directory:

```powershell
Remove-Item -Recurse -Force .next\dev
```

### Protected routes crash locally

If protected routes like `/onboarding` or `/explore` fail locally, make sure:

- `ARCJET_ENV="development"` is set in `.env`
- you restarted the server after changing env vars

### Redirects on protected routes

Routes such as `/onboarding`, `/explore`, `/dashboard`, and payout/call pages are protected. If you are not signed in, redirects are expected behavior.

## Seed Script Note

The seed file in [prisma/seed.js](/c:/Users/Sk%20Mijanur%20Rahaman/OneDrive/Desktop/prep/prisma/seed.js) is not a general sample-data seeder. It is a targeted script for attaching feedback to a specific booking after you update the hardcoded booking ID inside the file.

## Deployment Notes

Before deploying:

- configure all required environment variables in your hosting platform
- provision a PostgreSQL database
- run `npm run build` successfully
- verify Clerk, Stream, Gemini, Resend, and Arcjet keys are valid
- ensure `NEXT_PUBLIC_APP_URL` matches your deployed domain

## Author

Built by Mijanur.
