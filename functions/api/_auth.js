const enc=new TextEncoder();
function b64u(buf){return btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function unb64u(s){s=s.replace(/-/g,"+").replace(/_/g,"/"); while(s.length%4)s+="="; return Uint8Array.from(atob(s),c=>c.charCodeAt(0));}
async function key(env){return crypto.subtle.importKey("raw",enc.encode(env.ADMIN_SESSION_SECRET),{name:"HMAC",hash:"SHA-256"},false,["sign","verify"]);}
export async function signSession(env,email){
  const payload=b64u(enc.encode(JSON.stringify({email,exp:Date.now()+1000*60*60*12})));
  const sig=b64u(await crypto.subtle.sign("HMAC",await key(env),enc.encode(payload)));
  return payload+"."+sig;
}
export async function verifySession(env,token){
  if(!token||!env.ADMIN_SESSION_SECRET) return false;
  const p=token.split("."); if(p.length!==2) return false;
  try{
    if(!(await crypto.subtle.verify("HMAC",await key(env),unb64u(p[1]),enc.encode(p[0])))) return false;
    const data=JSON.parse(new TextDecoder().decode(unb64u(p[0])));
    return data.exp>Date.now() && data.email===env.ADMIN_EMAIL;
  }catch{return false;}
}
export function cookie(token){return `ft_admin=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`;}
export function getToken(request){const m=(request.headers.get("Cookie")||"").match(/(?:^|;\\s*)ft_admin=([^;]+)/);return m?.[1]||"";}
