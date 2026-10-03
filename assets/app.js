document.addEventListener('DOMContentLoaded',()=>{
  const i=document.querySelector('#toolSearch');
  if(!i)return;
  const box=document.createElement('div');
  box.style.cssText='position:absolute;left:0;right:0;top:62px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 20px 45px #1018281f;z-index:30;display:none;overflow:hidden;text-align:start';
  i.parentElement.appendChild(box);
  const norm=s=>String(s).toLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک').trim();
  i.oninput=()=>{
    const FT=window.FT||{tools:[],lang:()=>'en'};
    const fa=FT.lang()==='fa',q=norm(i.value);
    const m=FT.tools.filter(x=>norm(x.en+' '+x.fa).includes(q)).slice(0,7);
    box.innerHTML=m.map(x=>`<a href="${x.path}" style="display:block;padding:13px 16px;color:#101828;text-decoration:none;border-bottom:1px solid #f0f1f3;font-weight:700">${x.emoji} ${fa?x.fa:x.en}</a>`).join('');
    box.style.display=q&&m.length?'block':'none';
  };
  i.onblur=()=>setTimeout(()=>box.style.display='none',150);
});
