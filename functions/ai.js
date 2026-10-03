function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}})}
const buckets=new Map(), WINDOW=60000, MAX=20;
function allowed(req){const now=Date.now(),key=req.headers.get("CF-Connecting-IP")||"unknown",b=buckets.get(key);if(!b||now-b.start>=WINDOW){buckets.set(key,{start:now,count:1});return true}b.count++;return b.count<=MAX}
export async function onRequestPost({request,env}){
 if(!allowed(request))return json({error:"Too many requests. Try again in a minute."},429);
 if(!env.OPENAI_API_KEY)return json({error:"OPENAI_API_KEY is not configured."},500);
 let body;try{body=await request.json()}catch{return json({error:"Invalid JSON body."},400)}
 const prompt=typeof body?.prompt==="string"?body.prompt.trim():"";
 const system=typeof body?.system==="string"?body.system.trim():"";
 if(!prompt)return json({error:"prompt is required."},400);
 if(prompt.length>20000)return json({error:"Prompt is too long. Maximum 20,000 characters."},413);
 const input=[];if(system)input.push({role:"developer",content:system});input.push({role:"user",content:prompt});
 const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{authorization:`Bearer ${env.OPENAI_API_KEY}`,"content-type":"application/json"},body:JSON.stringify({model:"gpt-5",input,store:false})});
 const raw=await r.text();if(!r.ok){let d=raw;try{d=JSON.parse(raw)?.error?.message||raw}catch{}return json({error:"OpenAI request failed.",detail:d},r.status)}
 let data;try{data=JSON.parse(raw)}catch{return json({error:"OpenAI returned invalid JSON."},502)}
 let output=typeof data.output_text==="string"?data.output_text:"";
 if(!output&&Array.isArray(data.output))for(const item of data.output)if(item?.type==="message"&&Array.isArray(item.content))for(const part of item.content)if(typeof part?.text==="string")output+=part.text;
 return json({ok:true,text:output,id:data.id||null});
}
export async function onRequestOptions(){return new Response(null,{status:204,headers:{"access-control-allow-origin":"*","access-control-allow-methods":"POST,OPTIONS","access-control-allow-headers":"Content-Type"}})}
export async function onRequestGet(){return json({ok:true,service:"FreeTools AI API"})}
