function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}})}
const buckets=new Map(),WINDOW=60000,MAX=10;
function allowed(req){const now=Date.now(),key=req.headers.get("CF-Connecting-IP")||"unknown",b=buckets.get(key);if(!b||now-b.start>=WINDOW){buckets.set(key,{start:now,count:1});return true}b.count++;return b.count<=MAX}
function readableRemoveBgError(raw){
  try{
    const j=JSON.parse(raw);
    const e=Array.isArray(j.errors)?j.errors.map(x=>x.title||x.detail||x.code).filter(Boolean).join("; "):j.error||j.message;
    if(e)return e;
  }catch(_){ }
  return String(raw||"Remove.bg could not process the image.").slice(0,1200);
}
export async function onRequestPost({request,env}){
 if(!allowed(request))return json({error:"Too many requests. Try again in a minute."},429);
 if(!env.REMOVE_BG_API_KEY)return json({error:"REMOVE_BG_API_KEY is not configured."},500);
 const ct=request.headers.get("content-type")||"";
 if(!ct.toLowerCase().includes("multipart/form-data"))return json({error:"Use multipart/form-data with image_file."},400);
 let incoming,file;
 try{incoming=await request.formData();file=incoming.get("image_file")||incoming.get("file")}catch(e){return json({error:"The uploaded image could not be read by the server. Please choose the image again."},400)}
 if(!(file instanceof File))return json({error:"No image file was uploaded."},400);
 if(file.size<=0)return json({error:"The selected image is empty. Please choose the image again."},400);
 if(file.size>12*1024*1024)return json({error:"Image is too large. Maximum 12 MB."},413);
 let bytes;
 try{bytes=await file.arrayBuffer()}catch(e){return json({error:"The selected image could not be read. Please choose it again."},400)}
 // Rebuild a genuine File object before forwarding it. This avoids stale/browser
 // file references and makes the multipart payload explicit for Cloudflare Workers.
 const name=String(file.name||"image.jpg").replace(/[^a-zA-Z0-9._-]/g,"_")||"image.jpg";
 const type=String(file.type||"image/jpeg").toLowerCase();
 const safeFile=new File([bytes],name,{type});
 const form=new FormData();form.append("image_file",safeFile);form.append("size","auto");form.append("format","png");
 let r;
 try{r=await fetch("https://api.remove.bg/v1.0/removebg",{method:"POST",headers:{"X-Api-Key":env.REMOVE_BG_API_KEY,"Accept":"image/png"},body:form})}
 catch(e){return json({error:"Could not connect to Remove.bg. Please try again."},502)}
 if(!r.ok){const raw=await r.text();return json({error:readableRemoveBgError(raw),status:r.status},r.status)}
 const h=new Headers({"content-type":"image/png","cache-control":"no-store","content-disposition":'inline; filename="background-removed.png"'});
 return new Response(r.body,{status:200,headers:h});
}
export async function onRequestOptions(){return new Response(null,{status:204,headers:{"access-control-allow-origin":"*","access-control-allow-methods":"POST,OPTIONS","access-control-allow-headers":"Content-Type"}})}
export async function onRequestGet(){return json({ok:true,service:"FreeTools Remove Background API",version:"23"})}
