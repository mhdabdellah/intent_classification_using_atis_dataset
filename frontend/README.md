# Frontend (Next.js)

This frontend is a Next.js app that connects to the backend API running on `http://127.0.0.1:6000`.

## Local setup

1. Open a terminal in `frontend`
2. Install dependencies:

```bash
pnpm install
```

3. Create an environment file if needed:

```bash
cp .env .env.local
```

4. Run the frontend:

```bash
pnpm dev
```

## Environment variable

The app expects:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:6000
```

If you change `.env` or `.env.local`, restart the Next.js development server.

## How to use

- Start the backend (`backend/app.py`) first
- Start the frontend
- Open the app at `http://localhost:3000`
- The frontend will call `/api/health`, `/api/predict`, and `/api/predict-batch` on the backend
