function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}})}
const buckets=new Map(),WINDOW=60000,MAX=10;
function allowed(req){const now=Date.now(),key=req.headers.get("CF-Connecting-IP")||"unknown",b=buckets.get(key);if(!b||now-b.start>=WINDOW){buckets.set(key,{start:now,count:1});return true}b.count++;return b.count<=MAX}
export async function onRequestPost({request,env}){
 if(!allowed(request))return json({error:"Too many requests. Try again in a minute."},429);
 if(!env.REMOVE_BG_API_KEY)return json({error:"REMOVE_BG_API_KEY is not configured."},500);
 const ct=request.headers.get("content-type")||"";
 if(!ct.toLowerCase().includes("multipart/form-data"))return json({error:"Use multipart/form-data with image_file."},400);
 const incoming=await request.formData(),file=incoming.get("image_file")||incoming.get("file");
 if(!(file instanceof File))return json({error:"No image file was uploaded."},400);
 if(file.size>12*1024*1024)return json({error:"Image is too large. Maximum 12 MB."},413);
 const bytes=await file.arrayBuffer();
 const safeFile=new Blob([bytes],{type:file.type||"application/octet-stream"});
 const form=new FormData();form.append("image_file",safeFile,file.name||"image");form.append("size","auto");form.append("format","png");
 const r=await fetch("https://api.remove.bg/v1.0/removebg",{method:"POST",headers:{"X-Api-Key":env.REMOVE_BG_API_KEY},body:form});
 if(!r.ok){const raw=await r.text();return json({error:"Remove.bg request failed.",detail:raw.slice(0,2000)},r.status)}
 const h=new Headers({"content-type":"image/png","cache-control":"no-store","content-disposition":'inline; filename="background-removed.png"'});
 return new Response(r.body,{status:200,headers:h});
}
export async function onRequestOptions(){return new Response(null,{status:204,headers:{"access-control-allow-origin":"*","access-control-allow-methods":"POST,OPTIONS","access-control-allow-headers":"Content-Type"}})}
export async function onRequestGet(){return json({ok:true,service:"FreeTools Remove Background API"})}
