import {signSession,cookie} from "./_auth.js";
function json(d,s=200,h={}){return new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...h}});}
export async function onRequest(context){
 const {request,env}=context;
 if(request.method!=="POST") return json({error:"Method not allowed."},405);
 if(!env.ADMIN_EMAIL||!env.ADMIN_PASSWORD||!env.ADMIN_SESSION_SECRET) return json({error:"Admin secrets are not configured in Cloudflare."},503);
 let b;try{b=await request.json();}catch{return json({error:"Invalid JSON."},400);}
 if(String(b.email||"").trim().toLowerCase()!==String(env.ADMIN_EMAIL).trim().toLowerCase() || String(b.password||"")!==String(env.ADMIN_PASSWORD))
   return json({error:"Invalid email or password."},401);
 const token=await signSession(env,env.ADMIN_EMAIL);
 return new Response(JSON.stringify({ok:true}),{status:200,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","Set-Cookie":cookie(token)}});
}
