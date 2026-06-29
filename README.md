# fx·convert — Currency Converter

A lightweight, zero-dependency currency converter that converts Mexican Peso, Dominican Peso, Aruban Florin, Jamaican Dollar, and Turks & Caicos (USD) to US Dollars.

Supports both **live rates** and **historical rates** for any date in the last 12 months.

## Features

- Live exchange rates via [Frankfurter API](https://www.frankfurter.app) (ECB data, free, no key needed)
- Historical rate lookup with a date picker (up to 12 months back)
- Dark mode support
- Mobile responsive
- Zero dependencies — single HTML file

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
```

### Option 2 — GitHub + Vercel dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Leave all settings as default — Vercel auto-detects a static site
5. Click **Deploy**

That's it. No build step, no environment variables needed.

## Local development

Just open `index.html` in a browser — no server required.

Or with a simple local server:

```bash
npx serve .
# or
python3 -m http.server 3000
```

## Currencies supported

| Flag | Currency | Code |
|------|----------|------|
| 🇲🇽 | Mexican Peso | MXN |
| 🇩🇴 | Dominican Peso | DOP |
| 🇦🇼 | Aruban Florin | AWG |
| 🇹🇨 | Turks & Caicos | USD (pegged) |
| 🇯🇲 | Jamaican Dollar | JMD |

## Data source

Rates come from the [Frankfurter API](https://www.frankfurter.app), which publishes European Central Bank reference rates. Free, no API key required. Historical data goes back to 1999.
