/* FreeTools AI — centralized sharing + language switcher
   Loaded centrally by assets/site.js. Does not change canonical URLs, metadata, or content.
*/
(function(){
  'use strict';
  if (window.__FTShareLanguageLoaded) return;
  window.__FTShareLanguageLoaded = true;

  var languages = [
    {code:'en', name:'English', path:'/'},
    {code:'fa', name:'فارسی', path:'/fa/'},
    {code:'es', name:'Español', path:'/es/'},
    {code:'ar', name:'العربية', path:'/ar/'},
    {code:'hi', name:'हिन्दी', path:'/hi/'},
    {code:'de', name:'Deutsch', path:'/de/'}
  ];

  function esc(s){
    return String(s).replace(/[&<>"']/g,function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  function getLang(){
    var p=(location.pathname||'/').split('/')[1];
    for(var i=0;i<languages.length;i++) if(languages[i].code===p) return p;
    try{
      var saved=localStorage.getItem('ft_lang');
      if(saved && languages.some(function(x){return x.code===saved;})) return saved;
    }catch(e){}
    return /^fa/i.test(navigator.language||'') ? 'fa' : 'en';
  }

  var current=getLang();

  function share(){
    var data={
      title:document.title || 'FreeTools AI',
      text:(document.querySelector('meta[name="description"]')||{}).content || 'Free online tools from FreeTools AI',
      url:location.href
    };
    if(navigator.share){
      navigator.share(data).catch(function(){});
      return;
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(location.href).then(function(){showNotice(current==='fa'?'لینک کپی شد':'Link copied');}).catch(function(){fallbackCopy(location.href);});
    }else fallbackCopy(location.href);
  }

  function fallbackCopy(text){
    var ta=document.createElement('textarea');
    ta.value=text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try{document.execCommand('copy'); showNotice(current==='fa'?'لینک کپی شد':'Link copied');}catch(e){}
    ta.remove();
  }

  function showNotice(msg){
    var old=document.getElementById('ftShareNotice'); if(old) old.remove();
    var n=document.createElement('div'); n.id='ftShareNotice'; n.textContent=msg;
    n.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;padding:10px 16px;border-radius:999px;background:#111827;color:#fff;font:600 14px system-ui,sans-serif;box-shadow:0 10px 30px #0003';
    document.body.appendChild(n); setTimeout(function(){n.remove();},1800);
  }

  function goLanguage(code){
    try{localStorage.setItem('ft_lang',code);}catch(e){}
    var target=languages.find(function(x){return x.code===code;});
    if(!target) return;
    /* Only language home pages exist in this release. We intentionally do not
       invent localized tool URLs, which protects SEO and avoids broken pages. */
    if(code==='en') location.href='/';
    else location.href=target.path;
  }

  function inject(){
    if(!document.body) return;
    var actions=document.querySelector('.navActions');
    if(actions && !document.getElementById('ftShareBtn')){
      var b=document.createElement('button');
      b.id='ftShareBtn'; b.className='ftShareBtn'; b.type='button';
      b.setAttribute('aria-label',current==='fa'?'اشتراک‌گذاری این صفحه':'Share this page');
      b.textContent='↗ '+(current==='fa'?'اشتراک‌گذاری':'Share');
      b.addEventListener('click',share);
      actions.insertBefore(b,actions.firstChild);
    }

    if(actions && !document.getElementById('ftLanguageMenu')){
      var wrap=document.createElement('div'); wrap.className='ftLangWrap';
      var btn=document.createElement('button'); btn.id='ftLanguageBtn'; btn.className='ftLanguageBtn';
      btn.type='button'; btn.setAttribute('aria-haspopup','menu'); btn.textContent='🌐 '+current.toUpperCase()+' ▾';
      var menu=document.createElement('div'); menu.id='ftLanguageMenu'; menu.className='ftLanguageMenu';
      languages.forEach(function(l){
        var a=document.createElement('button'); a.type='button'; a.className='ftLangItem';
        a.setAttribute('role','menuitem'); a.textContent=l.name+(l.code===current?' ✓':'');
        a.addEventListener('click',function(){goLanguage(l.code);});
        menu.appendChild(a);
      });
      btn.addEventListener('click',function(e){e.stopPropagation();menu.classList.toggle('open');});
      document.addEventListener('click',function(e){if(!wrap.contains(e.target)) menu.classList.remove('open');});
      wrap.appendChild(btn); wrap.appendChild(menu);
      actions.appendChild(wrap);
    }

    /* On simple international pages without the V6 header, add a compact share row. */
    if(!actions && !document.querySelector('.ftSimpleShare')){
      var main=document.querySelector('main');
      if(main){
        var row=document.createElement('div'); row.className='ftSimpleShare';
        row.innerHTML='<button type="button" class="ftShareBtn">↗ '+(current==='fa'?'اشتراک‌گذاری':'Share')+'</button><div class="ftLangWrap"><button type="button" class="ftLanguageBtn">🌐 '+current.toUpperCase()+' ▾</button><div class="ftLanguageMenu">'+languages.map(function(l){return '<button type="button" class="ftLangItem" data-ft-lang="'+l.code+'">'+esc(l.name)+(l.code===current?' ✓':'')+'</button>';}).join('')+'</div></div>';
        main.insertBefore(row,main.firstChild);
        row.querySelector('.ftShareBtn').addEventListener('click',share);
        row.querySelector('.ftLanguageBtn').addEventListener('click',function(e){e.stopPropagation();row.querySelector('.ftLanguageMenu').classList.toggle('open');});
        row.querySelectorAll('[data-ft-lang]').forEach(function(x){x.addEventListener('click',function(){goLanguage(x.getAttribute('data-ft-lang'));});});
      }
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',inject);
  else inject();
})();