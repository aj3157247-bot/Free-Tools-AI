import {cookie} from "./_auth.js";
export async function onRequest(context){
 return new Response(JSON.stringify({ok:true}),{headers:{"content-type":"application/json","Set-Cookie":"ft_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"}});
}
