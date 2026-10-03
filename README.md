# FreeTools AI v2 — GitHub / Cloudflare Ready

This version replaces the visual-only prototype with real browser tools and a secure Worker API layer.

## Real browser tools
- JPG / PNG / WebP converter
- Image compressor
- Image resizer
- HEIC / HEIF → JPG
- JPG/PNG → PDF
- PDF → JPG
- PDF → Text
- PDF → editable DOCX (selectable-text PDFs)
- OCR / Image → Text (English, Persian, Arabic)
- QR Code generator

## API tools
- AI Summarizer
- AI Translator
- AI Rewriter
- AI Chat
- Remove Background via Remove.bg

## Cloudflare Pages settings
Production branch: `main`
Framework preset: `None`
Build command: `exit 0`
Build output directory: `/`
Root directory: empty

## API — easiest setup with your current Cloudflare Pages project
This ZIP includes **Pages Functions** at `functions/api/ai.js` and `functions/api/remove-background.js`. Cloudflare Pages can deploy these alongside the static site, so the frontend can keep calling `/api/ai` and `/api/remove-background` on the same domain.

In Cloudflare Pages → Settings → Environment variables, add:
- `OPENAI_API_KEY`
- `REMOVE_BG_API_KEY`
- optional `AI_MODEL` (defaults to `gpt-5.6-mini`)

The old standalone Worker is also included under `cloudflare-worker/` if you later want a separate API service.

### Important
Do NOT put API keys in `index.html`, `app.js`, or any frontend JavaScript. Keep them as Cloudflare secrets/environment variables.

## Supabase
Not required for launch. Add later for accounts, saved history, favorites, usage records, subscriptions and cloud storage.

## SEO
The project has separate intent pages. After deployment, replace relative canonical URLs with the final domain, add the domain to Google Search Console, and submit `/sitemap.xml`. Avoid thin doorway pages; each SEO page should contain useful, unique content.

## External libraries
Browser tools use pinned jsDelivr versions. For long-term scale, vendor/test the dependencies inside the repository.
