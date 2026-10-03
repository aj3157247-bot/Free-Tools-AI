# FreeTools AI

A global free-tools + AI website starter designed for fast deployment, SEO landing pages, browser-side processing and a secure AI API layer.

## Included tools

- Image Converter — JPG / PNG / WebP
- Image Compressor
- Image Resizer
- Remove Background landing workflow
- PDF to Text
- PDF to Word starter for text PDFs
- JPG to PDF
- QR Code Generator
- AI assistant endpoint

## Recommended deployment

### Option A — Cloudflare Workers / Pages

Cloudflare currently recommends Workers for new applications, while Pages remains available for static deployments. Static HTML can be deployed directly from GitHub. See Cloudflare docs:
https://developers.cloudflare.com/pages/

For the static site:
- Connect this GitHub repository.
- If using Pages for this static version, build command can be empty / `exit 0`.
- Output directory: `/`

For the AI API:
1. Create a Cloudflare Worker from `/cloudflare-worker`.
2. Add secret:
   `wrangler secret put OPENAI_API_KEY`
3. Deploy the Worker.
4. Put the Worker `/ai` URL into `AI_ENDPOINT` in `app.js`.

## Supabase

NOT required for the first launch.

Add Supabase later if you need:
- user accounts
- saved history
- cloud file storage
- usage records
- favorites
- admin dashboard
- subscriptions

## Important production upgrades

Before scaling paid traffic or very high traffic:
- add rate limiting to AI
- add abuse protection / bot protection
- add analytics + Search Console
- add a proper OCR engine for scanned PDFs
- replace the lightweight PDF-to-Word starter with a production PDF/DOCX pipeline
- connect a real background-removal model/API
- add sitemap.xml and robots.txt for the final domain
- add localized SEO pages

The site intentionally keeps the first launch simple: free tools should work without an account wherever possible.
