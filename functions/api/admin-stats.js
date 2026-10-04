import {verifySession,getToken} from "./_auth.js";
function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});}
export async function onRequest(context){
 const {request,env}=context;
 if(!(await verifySession(env,getToken(request)))) return json({error:"Unauthorized."},401);
 if(!env.DB) return json({error:"Analytics database is not connected."},503);
 try{
  const q=async(sql,...args)=>(await env.DB.prepare(sql).bind(...args).all()).results||[];
  const now=Math.floor(Date.now()/1000), day=86400;
  const [tot,today,week,month,online,topPages,topEvents,countries,devices,ai,downloads]=await Promise.all([
   q("SELECT COUNT(*) count, COUNT(DISTINCT sid) users FROM pageviews"),
   q("SELECT COUNT(*) views, COUNT(DISTINCT sid) users FROM pageviews WHERE created_at>=?",now-day),
   q("SELECT COUNT(*) views, COUNT(DISTINCT sid) users FROM pageviews WHERE created_at>=?",now-7*day),
   q("SELECT COUNT(*) views, COUNT(DISTINCT sid) users FROM pageviews WHERE created_at>=?",now-30*day),
   q("SELECT COUNT(*) count FROM sessions WHERE last_seen>=?",now-120),
   q("SELECT path,COUNT(*) count FROM pageviews GROUP BY path ORDER BY count DESC LIMIT 10"),
   q("SELECT target,COUNT(*) count FROM events WHERE event='click' GROUP BY target ORDER BY count DESC LIMIT 10"),
   q("SELECT country,COUNT(DISTINCT sid) count FROM pageviews GROUP BY country ORDER BY count DESC LIMIT 10"),
   q("SELECT device,COUNT(DISTINCT sid) count FROM pageviews GROUP BY device ORDER BY count DESC"),
   q("SELECT COUNT(*) count FROM pageviews WHERE path LIKE '/ai/%'"),
   q("SELECT COUNT(*) count FROM events WHERE target LIKE '/downloads/%'")
  ]);
  const daily=await q("SELECT date(datetime(created_at,'unixepoch')) day,COUNT(*) views,COUNT(DISTINCT sid) users FROM pageviews WHERE created_at>=? GROUP BY day ORDER BY day",now-30*day);
  return json({ok:true,total:tot[0]||{},today:today[0]||{},week:week[0]||{},month:month[0]||{},online:online[0]?.count||0,topPages,topEvents,countries,devices,ai:ai[0]?.count||0,downloads:downloads[0]?.count||0,daily});
 }catch(e){return json({error:e?.message||"Analytics query failed."},500);}
}
