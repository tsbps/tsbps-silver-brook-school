# silver-brook-school

## Run

```bash
npm install
npm run dev
```

## Admin dashboard

1. Copy `.env.example` to `.env.local` and set secure values.
2. Start the app and open `http://localhost:3000/admin`.
3. Sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`.
4. Manage:
   - School name, tagline, phone, email, address
   - Logo path (example: `/logo.png`)
   - Theme colors (`paper`, `brand400`, `brand600`, `brand700`)
   - Page visibility (hidden pages return 404)
   - News/events entries

Saved settings are stored in `data/site-config.json`.
