/* FreeTools AI — centralized Share + language selector for localized home pages */
(function(){
  'use strict';
  if(window.__FTLocalizedUI) return;
  window.__FTLocalizedUI=true;

  var langs=[
    {c:'en',n:'English',p:'/'},
    {c:'fa',n:'فارسی',p:'/fa/'},
    {c:'es',n:'Español',p:'/es/'},
    {c:'ar',n:'العربية',p:'/ar/'},
    {c:'hi',n:'हिन्दी',p:'/hi/'},
    {c:'de',n:'Deutsch',p:'/de/'}
  ];
  var c=(location.pathname.split('/')[1]||'en');
  if(!langs.some(function(x){return x.c===c;})) c='en';

  function share(){
    var data={title:document.title||'FreeTools AI',
      text:(document.querySelector('meta[name="description"]')||{}).content||'FreeTools AI',
      url:location.href};
    if(navigator.share){navigator.share(data).catch(function(){});return;}
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(location.href).then(function(){notice(c==='fa'?'لینک کپی شد':c==='ar'?'تم نسخ الرابط':'Link copied');}).catch(function(){});
    }
  }
  function notice(msg){
    var n=document.createElement('div'); n.textContent=msg;
    n.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;padding:10px 16px;border-radius:999px;background:#111827;color:#fff;font:600 14px system-ui,sans-serif';
    document.body.appendChild(n);setTimeout(function(){n.remove();},1600);
  }
  function init(){
    var header=document.querySelector('.intlHeader');
    if(!header) return;

    var actions=document.createElement('div');
    actions.className='ftIntlActions';
    actions.innerHTML='<button type="button" class="ftIntlBtn" id="ftIntlShare">↗ '+(c==='fa'?'اشتراک‌گذاری':c==='ar'?'مشاركة':c==='es'?'Compartir':c==='hi'?'साझा करें':c==='de'?'Teilen':'Share')+'</button>'+
      '<button type="button" class="ftIntlBtn" id="ftIntlLang">🌐 '+c.toUpperCase()+' ▾</button>';
    header.appendChild(actions);

    var menu=document.createElement('div');menu.className='ftIntlMenu';
    langs.forEach(function(l){
      var b=document.createElement('button');b.type='button';b.textContent=l.n+(l.c===c?' ✓':'');
      b.addEventListener('click',function(){location.href=l.p;});
      menu.appendChild(b);
    });
    actions.appendChild(menu);
    document.getElementById('ftIntlShare').addEventListener('click',share);
    document.getElementById('ftIntlLang').addEventListener('click',function(e){e.stopPropagation();menu.classList.toggle('open');});
    document.addEventListener('click',function(e){if(!actions.contains(e.target))menu.classList.remove('open');});

    /* Fix the visible home link in every localized page; no metadata is changed. */
    var home=header.parentElement.querySelector('.secondaryBtn');
    if(home){
      var labels={
        ar:'English / الصفحة الرئيسية',
        fa:'English / خانه',
        es:'English / Inicio',
        hi:'English / होम',
        de:'English / Startseite'
      };
      home.textContent=labels[c]||'English / Home';
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();