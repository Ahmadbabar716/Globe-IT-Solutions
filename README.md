# Globe IT Solutions — Course Registration App

A full-stack Next.js 14 (App Router) + Tailwind CSS + Turso/libSQL web application for managing course registrations at Globe IT Solutions.

---

## Why Turso Instead of Local SQLite

> **Important note for deployment:**
>
> This project uses **Turso** (a hosted libSQL / SQLite-compatible database) instead of a plain local `.db` file.
>
> **Why?** Vercel's production filesystem is **ephemeral and read-only** — any local `.db` file would be completely reset to zero on every new deployment, wiping all registrations. Turso uses the exact same SQLite syntax and the same Prisma workflow (migrations, `prisma studio`, schema), but the database lives in Turso's persistent cloud infrastructure. Registrations are **never lost** on redeploy.

---

## Local Development Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your Turso credentials and admin password (see the Turso Setup section below).

### 3. Push the database schema

```bash
npx prisma db push
```

> This applies the schema to your Turso database. You do **not** need to run `prisma migrate dev` — use `db push` for Turso/libSQL.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the registration page.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

---

## Turso Database Setup

### 1. Install the Turso CLI

```bash
# macOS / Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (via scoop)
scoop bucket add turso https://github.com/tursodatabase/scoop-bucket.git
scoop install turso
```

### 2. Log in to Turso

```bash
turso auth login
```

### 3. Create a new database

```bash
turso db create globe-it-solutions
```

### 4. Get the database URL

```bash
turso db show --url globe-it-solutions
# Output: libsql://globe-it-solutions-your-org.turso.io
```

Copy this value → paste into `DATABASE_URL` in `.env.local`.

### 5. Create an auth token

```bash
turso db tokens create globe-it-solutions
# Output: eyJ...long-token-string
```

Copy this value → paste into `DATABASE_AUTH_TOKEN` in `.env.local`.

### 6. Push the schema to Turso

```bash
npx prisma db push
```

---

## Vercel Deployment

> **You will connect Vercel manually.** Do not push to GitHub yet until you've set up the environment variables.

### Steps

1. Push this repo to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/globe-it-solutions.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo.

3. **Before deploying**, go to **Settings → Environment Variables** in your Vercel project and add:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | Your Turso database URL (`libsql://...`) |
   | `DATABASE_AUTH_TOKEN` | Your Turso auth token |
   | `ADMIN_PASSWORD` | A strong password for the admin dashboard |

4. Click **Deploy**.

---

## Pages

| Route | Description |
|---|---|
| `/` | Public registration page |
| `/admin` | Password-protected admin dashboard |

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/register` | `POST` | Submit a new registration |
| `/api/admin/login` | `POST` | Admin login (sets HttpOnly cookie) |
| `/api/admin/logout` | `POST` | Admin logout (clears cookie) |
| `/api/admin/registrations` | `GET` | Fetch all registrations |
| `/api/admin/registrations` | `PATCH` | Update a registration status |
| `/api/admin/export-pdf` | `GET` | Download all registrations as PDF |

## Data Retention Policy

**Registrations are NEVER automatically deleted.**

There are no cron jobs, no auto-cleanup routines, and no cascade deletes in this codebase. All data persists permanently in Turso. The only way to remove a registration would be to explicitly add a delete button in the admin dashboard (which is not included by default).

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Turso (libSQL / SQLite-compatible, hosted)
- **ORM**: Prisma with `@prisma/adapter-libsql` driver adapter
- **PDF Generation**: jsPDF + jspdf-autotable (server-side)
- **Auth**: Simple HttpOnly session cookie (no external auth library)
