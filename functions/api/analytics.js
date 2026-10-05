const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};

function json(data, status=200){ return new Response(JSON.stringify(data), {status, headers:JSON_HEADERS}); }
function esc(v){ return String(v ?? "").slice(0,500); }

export async function onRequest(context){
  const {request, env} = context;
  if(request.method==="OPTIONS") return json({ok:true});
  if(request.method!=="POST") return json({error:"Method not allowed."},405);
  if(!env.DB) return json({error:"Analytics database is not connected. Add a D1 binding named DB."},503);

  let b; try{ b=await request.json(); }catch{return json({error:"Invalid JSON."},400);}
  const sid=esc(b.sid); if(!sid) return json({error:"Missing session."},400);
  const path=esc(b.path||"/").slice(0,300);
  const ua=request.headers.get("User-Agent")||"";
  const device=/Mobile|Android|iPhone|iPad/i.test(ua) ? (/iPad|Tablet/i.test(ua)?"tablet":"mobile") : "desktop";
  const country=esc(request.headers.get("CF-IPCountry")||"Unknown").slice(0,20);
  const now=Math.floor(Date.now()/1000);
  const isTrackablePage = path === "/" || (!path.startsWith("/api/") && path !== "/manifest.json" && path !== "/favicon.ico" && path !== "/robots.txt" && path !== "/sitemap.xml" && !/\.[a-z0-9]{1,12}$/i.test(path));

  try{
    await env.DB.prepare(`INSERT INTO sessions (sid,first_seen,last_seen,country,device) VALUES (?,?,?,?,?)
      ON CONFLICT(sid) DO UPDATE SET last_seen=excluded.last_seen,country=excluded.country,device=excluded.device`)
      .bind(sid,now,now,country,device).run();

    if(!b.heartbeat && isTrackablePage){
      await env.DB.prepare(`INSERT INTO pageviews (sid,path,title,referrer,lang,country,device,created_at) VALUES (?,?,?,?,?,?,?,?)`)
        .bind(sid,path,esc(b.title),esc(b.referrer).slice(0,1000),esc(b.lang).slice(0,10),country,device,now).run();
    }
    if(b.event){
      await env.DB.prepare(`INSERT INTO events (sid,event,target,path,created_at) VALUES (?,?,?,?,?)`)
        .bind(sid,esc(b.event).slice(0,80),esc(b.target).slice(0,500),path,now).run();
    }
    return json({ok:true});
  }catch(e){ return json({error:e?.message||"Analytics error."},500); }
}
