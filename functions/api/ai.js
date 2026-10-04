function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}

const MODEL = "@cf/zai-org/glm-4.7-flash";
const buckets = new Map();

function allowed(request) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  const windowMs = 60_000;
  const max = 20;
  const current = buckets.get(ip);

  if (!current || now - current.startedAt >= windowMs) {
    buckets.set(ip, { startedAt: now, count: 1 });
    return true;
  }

  if (current.count >= max) return false;
  current.count += 1;
  return true;
}

function extractText(result) {
  if (typeof result === "string") return result;
  if (typeof result?.response === "string") return result.response;
  if (typeof result?.text === "string") return result.text;

  const content = result?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => typeof item === "string" ? item : item?.text || "")
      .join("")
      .trim();
  }

  return "";
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return json({ ok: true });
  }

  if (request.method === "GET") {
    return json({
      ok: true,
      service: "FreeTools AI API",
      provider: "Cloudflare Workers AI",
      model: MODEL
    });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (!allowed(request)) {
    return json({ error: "Too many requests. Please wait a moment." }, 429);
  }

  if (!env.AI || typeof env.AI.run !== "function") {
    return json({
      error:
        'Cloudflare Workers AI is not connected yet. In Cloudflare Pages go to Settings → Functions → Bindings → Add → Workers AI, set Variable name to "AI", save, then redeploy.'
    }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON request." }, 400);
  }

  const prompt = String(body?.prompt || "").trim();
  const system = String(body?.system || "").trim();

  if (!prompt) {
    return json({ error: "Please enter a prompt." }, 400);
  }

  if (prompt.length > 12000) {
    return json({ error: "Prompt is too long." }, 413);
  }

  try {
    const messages = [];

    if (system) {
      messages.push({
        role: "system",
        content: system.slice(0, 4000)
      });
    }

    messages.push({
      role: "user",
      content: prompt
    });

    const result = await env.AI.run(MODEL, {
      messages,
      max_tokens: 1200,
      temperature: 0.7
    });

    const text = extractText(result);

    if (!text) {
      return json({
        error: "The AI model returned an empty response. Please try again."
      }, 502);
    }

    return json({
      ok: true,
      text,
      model: MODEL
    });
  } catch (error) {
    return json({
      error: error?.message || "Cloudflare Workers AI request failed."
    }, 502);
  }
}
