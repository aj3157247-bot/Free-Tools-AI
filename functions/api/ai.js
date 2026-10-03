function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

const buckets = new Map(), WINDOW = 60000, MAX = 20;
function allowed(req) {
  const now = Date.now(), key = req.headers.get("CF-Connecting-IP") || "unknown", b = buckets.get(key);
  if (!b || now - b.start >= WINDOW) { buckets.set(key, { start: now, count: 1 }); return true; }
  b.count++;
  return b.count <= MAX;
}

export async function onRequestPost({ request, env }) {
  if (!allowed(request)) return json({ error: "Too many requests. Try again in a minute." }, 429);
  if (!env.OPENAI_API_KEY) return json({ error: "OPENAI_API_KEY is not configured." }, 500);

  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON body." }, 400); }

  const prompt = body && body.prompt;
  const system = body && body.system;
  if (!prompt || typeof prompt !== "string" || prompt.length > 30000)
    return json({ error: "Prompt is missing or too long." }, 400);

  try {
    const payload = { model: env.AI_MODEL || "gpt-5.6-mini", input: prompt };
    if (system && typeof system === "string") payload.instructions = system.slice(0, 4000);

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + env.OPENAI_API_KEY
      },
      body: JSON.stringify(payload)
    });
    const d = await r.json();
    if (!r.ok) return json({ error: (d.error && d.error.message) || "AI provider error" }, r.status);

    let text = d.output_text || "";
    if (!text && Array.isArray(d.output)) {
      text = d.output
        .flatMap(o => o.content || [])
        .filter(c => c.type === "output_text")
        .map(c => c.text)
        .join("\n");
    }
    return json({ text });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

export async function onRequestGet() {
  return json({ ok: true, service: "FreeTools AI API" });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST,OPTIONS",
      "access-control-allow-headers": "Content-Type"
    }
  });
}
