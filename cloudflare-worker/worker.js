/**
 * FreeTools AI secure Cloudflare Worker.
 * Set an AI provider key as a Worker secret, e.g.:
 * wrangler secret put OPENAI_API_KEY
 *
 * Then set AI_ENDPOINT in /app.js to:
 * https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/ai
 */
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response("", {headers:cors});
    const url = new URL(request.url);
    if (url.pathname !== "/ai" || request.method !== "POST")
      return new Response("Not found", {status:404,headers:cors});

    try {
      const {prompt} = await request.json();
      if (!prompt || prompt.length > 12000)
        return new Response(JSON.stringify({error:"Invalid prompt"}), {status:400,headers:{...cors,"content-type":"application/json"}});

      if (!env.OPENAI_API_KEY)
        return new Response(JSON.stringify({error:"AI provider key is not configured"}), {status:500,headers:{...cors,"content-type":"application/json"}});

      const r = await fetch("https://api.openai.com/v1/responses", {
        method:"POST",
        headers:{
          "content-type":"application/json",
          "authorization":"Bearer "+env.OPENAI_API_KEY
        },
        body:JSON.stringify({
          model: env.AI_MODEL || "gpt-5.6-mini",
          input: prompt
        })
      });
      const data = await r.json();
      if (!r.ok) return new Response(JSON.stringify({error:data.error?.message || "AI provider error"}),{status:r.status,headers:{...cors,"content-type":"application/json"}});
      const text = data.output_text || data.output?.flatMap(x=>x.content||[]).map(x=>x.text||"").join("") || "";
      return new Response(JSON.stringify({text}),{headers:{...cors,"content-type":"application/json"}});
    } catch(e) {
      return new Response(JSON.stringify({error:e.message}),{status:500,headers:{...cors,"content-type":"application/json"}});
    }
  }
};