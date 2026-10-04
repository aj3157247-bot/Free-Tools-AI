import {verifySession,getToken} from "./_auth.js";
function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","access-control-allow-origin":"*"}})}
function clean(v,n=1000){return String(v??"").trim().slice(0,n)}
function bodyFrom(b){return {title:clean(b.title,160),description:clean(b.description,500),image_url:clean(b.image_url,1500),target_url:clean(b.target_url,1500),placement:clean(b.placement,30)||"top",status:clean(b.status,20)||"draft",start_at:Number(b.start_at)||0,end_at:Number(b.end_at)||0}}
function valid(a){return a.title&&a.target_url&&/^https?:\/\//i.test(a.target_url)&&(!a.image_url||/^https?:\/\//i.test(a.image_url))}
async function auth(context){return verifySession(context.env,getToken(context.request))}
export async function onRequest(context){
 const {request,env}=context;
 if(!env.DB)return json({error:"Analytics database is not connected. Add a D1 binding named DB."},503);
 if(request.method==="OPTIONS")return json({ok:true});
 const url=new URL(request.url); const id=Number(url.searchParams.get("id")||0);
 try{
  if(request.method==="GET"){
   if(!(await auth(context)))return json({error:"Unauthorized."},401);
   const rows=(await env.DB.prepare("SELECT * FROM ads ORDER BY created_at DESC").all()).results||[];
   return json({ok:true,ads:rows});
  }
  if(!(await auth(context)))return json({error:"Unauthorized."},401);
  if(request.method==="POST"){
   let b;try{b=await request.json()}catch{return json({error:"Invalid JSON."},400)}
   const a=bodyFrom(b); if(!["top","home","tools","bottom"].includes(a.placement))a.placement="top"; if(!["draft","active","paused"].includes(a.status))a.status="draft"; if(!valid(a))return json({error:"Title, destination URL, and valid URLs are required."},400);
   const now=Math.floor(Date.now()/1000);
   const r=await env.DB.prepare(`INSERT INTO ads (title,description,image_url,target_url,placement,status,start_at,end_at,impressions,clicks,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,0,0,?,?)`).bind(a.title,a.description,a.image_url,a.target_url,a.placement,a.status,a.start_at,a.end_at,now,now).run();
   return json({ok:true,id:r.meta?.last_row_id||null});
  }
  if(request.method==="PATCH"){
   if(!id)return json({error:"Missing ad id."},400);
   let b;try{b=await request.json()}catch{return json({error:"Invalid JSON."},400)}
   const a=bodyFrom(b); if(!["top","home","tools","bottom"].includes(a.placement))a.placement="top"; if(!["draft","active","paused"].includes(a.status))a.status="draft"; if(!valid(a))return json({error:"Title, destination URL, and valid URLs are required."},400);
   const now=Math.floor(Date.now()/1000);
   await env.DB.prepare(`UPDATE ads SET title=?,description=?,image_url=?,target_url=?,placement=?,status=?,start_at=?,end_at=?,updated_at=? WHERE id=?`).bind(a.title,a.description,a.image_url,a.target_url,a.placement,a.status,a.start_at,a.end_at,now,id).run();
   return json({ok:true});
  }
  if(request.method==="DELETE"){
   if(!id)return json({error:"Missing ad id."},400);
   await env.DB.prepare("DELETE FROM ads WHERE id=?").bind(id).run(); return json({ok:true});
  }
  return json({error:"Method not allowed."},405);
 }catch(e){return json({error:e?.message||"Ads operation failed."},500)}
}
