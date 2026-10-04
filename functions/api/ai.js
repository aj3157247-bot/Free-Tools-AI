function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

const buckets = new Map();
const WINDOW = 60_000;
const MAX = 20;

function allowed(request) {
  const now = Date.now();
  const key = request.headers.get("CF-Connecting-IP") || "unknown";
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.start >= WINDOW) {
    buckets.set(key, { start: now, count: 1 });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= MAX;
}

async function readProviderResponse(response) {
  const raw = await response.text();

  if (!raw) {
    return {
      ok: false,
      status: response.status,
      error: "The AI provider returned an empty response."
    };
  }

  try {
    return {
      ok: true,
      status: response.status,
      data: JSON.parse(raw)
    };
  } catch {
    return {
      ok: false,
      status: response.status,
      error: `The AI provider returned a non-JSON response (${response.status}).`
    };
  }
}

export async function onRequestPost({ request, env }) {
  if (!allowed(request)) {
    return json({ error: "Too many requests. Try again in a minute." }, 429);
  }

  if (!env.OPENAI_API_KEY) {
    return json({ error: "OPENAI_API_KEY is not configured." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const prompt = body?.prompt;
  const system = body?.system;

  if (typeof prompt !== "string" || !prompt.trim()) {
    return json({ error: "Prompt is missing." }, 400);
  }

  if (prompt.length > 30_000) {
    return json({ error: "Prompt is too long." }, 400);
  }

  try {
    const payload = {
      model: env.AI_MODEL || "gpt-5.6-mini",
      input: prompt
    };

    if (typeof system === "string" && system.trim()) {
      payload.instructions = system.slice(0, 4_000);
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const provider = await readProviderResponse(response);

    if (!provider.ok) {
      return json({ error: provider.error }, 502);
    }

    const data = provider.data;

    if (!response.ok) {
      return json({
        error: data?.error?.message || "AI provider error."
      }, response.status);
    }

    let text = typeof data?.output_text === "string" ? data.output_text : "";

    if (!text && Array.isArray(data?.output)) {
      text = data.output
        .flatMap(item => Array.isArray(item?.content) ? item.content : [])
        .filter(item => item?.type === "output_text" && typeof item?.text === "string")
        .map(item => item.text)
        .join("\n");
    }

    if (!text.trim()) {
      return json({ error: "The AI provider returned no text." }, 502);
    }

    return json({ text });
  } catch (error) {
    return json({
      error: error?.message || "AI request failed."
    }, 500);
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
