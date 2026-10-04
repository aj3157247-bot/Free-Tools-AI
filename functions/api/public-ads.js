function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"public, max-age=30"}})}
export async function onRequestGet(context){
 const {env}=context;if(!env.DB)return json({ads:[]},200);
 const now=Math.floor(Date.now()/1000);
 try{
  const rows=(await env.DB.prepare(`SELECT id,title,description,image_url,target_url,placement FROM ads WHERE status='active' AND (start_at=0 OR start_at<=?) AND (end_at=0 OR end_at>=?) ORDER BY id DESC LIMIT 20`).bind(now,now).all()).results||[];
  return json({ads:rows});
 }catch{return json({ads:[]},200)}
}
