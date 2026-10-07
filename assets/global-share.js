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

    /* Localized Home links: expose every language from the Home area too. */
    function fixHomeLabel(){
      var labels={ar:'الصفحة الرئيسية',fa:'خانه',es:'Inicio',hi:'होम',de:'Startseite'};
      var label=labels[c]||'Home';
      document.querySelectorAll('.intlActions a.secondaryBtn, main .secondaryBtn, a.secondaryBtn[href="/"]').forEach(function(el){
        if(el.dataset.ftHomeLangs==='1') return;
        el.dataset.ftHomeLangs='1';
        el.href='/';
        el.textContent='🌐 '+label+' / Languages ▾';
        el.setAttribute('aria-label',label+' - choose language');
        el.addEventListener('click',function(e){
          e.preventDefault();
          var old=document.querySelector('.ftHomeLangMenu');
          if(old) old.remove();
          var menu=document.createElement('div');
          menu.className='ftHomeLangMenu';
          langs.forEach(function(l){
            var a=document.createElement('a');
            a.href=l.p;
            a.textContent=l.n+(l.c===c?' ✓':'');
            menu.appendChild(a);
          });
          el.parentNode.style.position='relative';
          el.parentNode.appendChild(menu);
          setTimeout(function(){
            document.addEventListener('click',function close(ev){
              if(!menu.contains(ev.target) && ev.target!==el){menu.remove();document.removeEventListener('click',close);}
            });
          },0);
        });
      });
      if(!document.getElementById('ftHomeLangStyle')){
        var st=document.createElement('style'); st.id='ftHomeLangStyle';
        st.textContent='.ftHomeLangMenu{position:absolute;z-index:1000;left:50%;transform:translateX(-50%);top:calc(100% + 8px);width:min(330px,calc(100vw - 40px));display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:10px;background:#fff;border:1px solid #e5e7ef;border-radius:16px;box-shadow:0 16px 40px rgba(20,25,60,.14)}.ftHomeLangMenu a{padding:10px 12px;border:1px solid #eceef4;border-radius:10px;background:#fafbff;text-align:center;font-weight:700;color:inherit;text-decoration:none}.ftHomeLangMenu a:hover{background:#f1f2ff}@media(max-width:520px){.ftHomeLangMenu{width:min(300px,calc(100vw - 28px));grid-template-columns:1fr 1fr}}';
        document.head.appendChild(st);
      }
    }
    fixHomeLabel();
    setTimeout(fixHomeLabel,100);
    setTimeout(fixHomeLabel,500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();