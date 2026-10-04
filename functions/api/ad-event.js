function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","access-control-allow-origin":"*"}})}
export async function onRequest(context){
 const {request,env}=context;if(request.method!=="POST")return json({error:"Method not allowed."},405);if(!env.DB)return json({ok:false},200);
 let b;try{b=await request.json()}catch{return json({ok:false},200)} const id=Number(b.id||0);const type=String(b.type||"");if(!id||!(type==="impression"||type==="click"))return json({ok:false},200);
 try{await env.DB.prepare(type==="click"?"UPDATE ads SET clicks=clicks+1 WHERE id=?":"UPDATE ads SET impressions=impressions+1 WHERE id=?").bind(id).run();return json({ok:true})}catch{return json({ok:false},200)}
}
