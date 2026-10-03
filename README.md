# FreeTools — Cloudflare Pages Worker API

Copy the `functions` folder and `wrangler.toml` into the ROOT of the same GitHub repository that deploys `free-tools-ai.pages.dev`.

## Cloudflare Secrets

Dashboard → Workers & Pages → free-tools-ai → Settings → Variables and Secrets → Add.

Create these as **Secret / Encrypt**:

- `OPENAI_API_KEY` = your OpenAI API key
- `REMOVE_BG_API_KEY` = your remove.bg API key

Do not put either key in browser JavaScript or GitHub.

## Endpoints

- `GET /api/health`
- `POST /api/ai`
- `POST /api/remove-background`

The frontend should call `/api/ai` and `/api/remove-background` on the same domain. If the current frontend has `AI_ENDPOINT`, set it to `/api/ai`.

### AI body

```json
{"prompt":"Summarize this text: ...","system":"Be concise."}
```

### Remove background

Send `multipart/form-data` with `image_file`.

## Deploy

Commit/push to `main`; Cloudflare Pages will deploy the Pages Functions automatically.

No separate Worker URL is required.

Supabase is not required for these APIs. Add it later for accounts, history, favorites, usage records, subscriptions, or storage.

The included rate limiter is lightweight. For large public traffic, add Turnstile and a durable rate-limit design before exposing expensive endpoints without limits.
