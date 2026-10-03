const AI_ENDPOINT = ""; // Example: https://your-worker.workers.dev/ai
const $ = s => document.querySelector(s);
async function askAI(prompt){
  if(!AI_ENDPOINT) return "AI endpoint is not configured yet. Deploy the Cloudflare Worker in /cloudflare-worker and put its URL in app.js.";
  const r=await fetch(AI_ENDPOINT,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({prompt})});
  if(!r.ok) throw new Error("AI request failed");
  const d=await r.json(); return d.text || d.output || "No response.";
}
document.addEventListener("DOMContentLoaded",()=>{
 const b=$("#aiBtn"),i=$("#aiInput"),o=$("#aiOut");
 if(b)b.onclick=async()=>{o.textContent="Thinking…";try{o.textContent=await askAI(i.value)}catch(e){o.textContent=e.message}};
});