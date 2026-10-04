/* FreeTools AI V6 — clean global navigation + English/Persian UI */
(function () {
  'use strict';
  var KEY = 'ft_lang';
  var lang = (function () {
    try { var x = localStorage.getItem(KEY); if (x === 'fa' || x === 'en') return x; } catch (_) {}
    return /^fa/i.test(navigator.language || '') ? 'fa' : 'en';
  })();

  var tools = [
    ['PDF to Word','PDF به Word','/tools/pdf-to-word/','📄'],['PDF to Text','PDF به متن','/tools/pdf-to-text/','📝'],['PDF to JPG','PDF به JPG','/tools/pdf-to-jpg/','🖼️'],['PDF Compressor','فشرده‌ساز PDF','/tools/pdf-compressor/','🗜️'],['JPG to PDF','JPG به PDF','/tools/jpg-to-pdf/','📑'],['Merge PDF','ادغام PDF','/tools/merge-pdf/','📚'],
    ['HEIC to JPG','HEIC به JPG','/tools/heic-to-jpg/','🍎'],['Image Converter','مبدل تصویر','/tools/image-converter/','🔄'],['Image Compressor','فشرده‌ساز تصویر','/tools/image-compressor/','📦'],['Image Resizer','تغییر اندازه تصویر','/tools/image-resizer/','↔️'],['Image to Text','تصویر به متن','/tools/image-to-text/','🔤'],['OCR','تشخیص متن OCR','/tools/ocr/','🔎'],
    ['Remove Background','حذف پس‌زمینه','/tools/remove-background/','✂️'],['QR Code Generator','ساخت کد QR','/tools/qr-code-generator/','▣'],['PNG to JPG','PNG به JPG','/tools/png-to-jpg/','🖼️'],['JPG to PNG','JPG به PNG','/tools/jpg-to-png/','🖼️'],['JPG to WebP','JPG به WebP','/tools/jpg-to-webp/','⚡'],['PNG to WebP','PNG به WebP','/tools/png-to-webp/','⚡'],['WebP to JPG','WebP به JPG','/tools/webp-to-jpg/','🔄'],['WebP to PNG','WebP به PNG','/tools/webp-to-png/','🔄'],['Image Cropper','برش تصویر','/tools/image-cropper/','✂️'],['Image Metadata Remover','حذف متادیتای تصویر','/tools/image-metadata-remover/','🧹'],['Compress Image to 50KB','فشرده‌سازی تصویر تا 50KB','/tools/compress-image-to-50kb/','🎯'],['Compress Image to 100KB','فشرده‌سازی تصویر تا 100KB','/tools/compress-image-to-100kb/','🎯'],['Compress Image to 200KB','فشرده‌سازی تصویر تا 200KB','/tools/compress-image-to-200kb/','🎯']
  ];
  var ai = [['AI Summarizer','خلاصه‌ساز هوشمند','/ai/summarizer/','🧠'],['AI Translator','مترجم هوشمند','/ai/translator/','🌍'],['AI Rewriter','بازنویس هوشمند','/ai/rewriter/','✍️'],['AI Chat','گفت‌وگوی هوشمند','/ai/chat/','💬']];
  var guides = [['PDF to Word Guide','راهنمای PDF به Word','/guides/pdf-to-word-online-free/'],['Compress Images Guide','راهنمای فشرده‌سازی تصویر','/guides/compress-image-without-losing-quality/'],['Remove Background Guide','راهنمای حذف پس‌زمینه','/guides/remove-image-background/'],['OCR Guide','راهنمای OCR','/guides/ocr-image-to-text/'],['Compress PDF Guide','راهنمای فشرده‌سازی PDF','/guides/compress-pdf/'],['HEIC to JPG Guide','راهنمای HEIC به JPG','/guides/convert-heic-to-jpg/']];

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }
  function t(en, fa) { return lang === 'fa' ? fa : en; }

  function makeMenu() {
    var old = document.querySelector('header.nav');
    if (old) old.remove();
    var header = document.createElement('header');
    header.className = 'nav v6-nav';
    header.innerHTML = '<div class="navInner"><a class="logo" href="/" aria-label="FreeTools AI">FreeTools<span>AI</span></a>' +
      '<nav class="desktopNav" aria-label="Main navigation">' +
      '<a href="/">'+t('Home','خانه')+'</a>' +
      '<button class="navDrop" type="button" data-panel="toolsPanel">'+t('Tools','ابزارها')+' <span>⌄</span></button>' +
      '<button class="navDrop" type="button" data-panel="aiPanel">'+t('AI','هوش مصنوعی')+' <span>⌄</span></button>' +
      '<a href="/guides/">'+t('Guides','راهنماها')+'</a>' +
      '<a href="/about/">'+t('About','درباره ما')+'</a>' +
      '</nav>' +
      '<div class="navActions"><button class="langBtn" id="langBtn" type="button">'+(lang === 'fa' ? 'English' : 'فارسی')+'</button><button class="menuBtn" id="menuBtn" type="button" aria-label="Menu">☰</button></div></div>' +
      '<div class="mega" id="toolsPanel"><div class="megaInner"><div class="megaHead"><div><small>'+t('TOOLS','ابزارها')+'</small><h3>'+t('All the tools in one place','همه ابزارها در یکجا')+'</h3></div><a href="/tools/">'+t('View all tools →','مشاهده همه ابزارها ←')+'</a></div><div class="megaGrid">'+tools.map(function(x){return '<a href="'+x[2]+'"><span>'+x[3]+'</span><b>'+t(x[0],x[1])+'</b></a>';}).join('')+'</div></div></div>' +
      '<div class="mega" id="aiPanel"><div class="megaInner"><div class="megaHead"><div><small>AI</small><h3>'+t('Practical AI tools','ابزارهای کاربردی هوش مصنوعی')+'</h3></div></div><div class="megaGrid aiMega">'+ai.map(function(x){return '<a href="'+x[2]+'"><span>'+x[3]+'</span><b>'+t(x[0],x[1])+'</b></a>';}).join('')+'</div></div></div>' +
      '<div class="mobilePanel" id="mobilePanel"><a href="/">🏠 '+t('Home','خانه')+'</a><button data-mobile="tools">🧰 '+t('Tools','ابزارها')+' <span>+</span></button><div class="mobileSub" id="mobileTools">'+tools.map(function(x){return '<a href="'+x[2]+'">'+x[3]+' '+t(x[0],x[1])+'</a>';}).join('')+'</div><button data-mobile="ai">🤖 '+t('AI Tools','ابزارهای هوش مصنوعی')+' <span>+</span></button><div class="mobileSub" id="mobileAi">'+ai.map(function(x){return '<a href="'+x[2]+'">'+x[3]+' '+t(x[0],x[1])+'</a>';}).join('')+'</div><a href="/guides/">📚 '+t('Guides','راهنماها')+'</a><a href="/about/">ℹ️ '+t('About','درباره ما')+'</a><a href="/privacy/">🔒 '+t('Privacy','حریم خصوصی')+'</a><a href="/terms/">📜 '+t('Terms','قوانین')+'</a></div>';
    document.body.prepend(header);

    header.querySelectorAll('.navDrop').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation(); var id=btn.getAttribute('data-panel'); document.querySelectorAll('.mega').forEach(function(p){p.classList.toggle('open',p.id===id && !p.classList.contains('open'));});});});
    document.addEventListener('click', function(e){ if(!e.target.closest('.v6-nav')) document.querySelectorAll('.mega').forEach(function(p){p.classList.remove('open');}); }, {once:true});
    document.getElementById('langBtn').addEventListener('click', function(){try{localStorage.setItem(KEY,lang==='fa'?'en':'fa');}catch(_){} location.reload();});
    document.getElementById('menuBtn').addEventListener('click', function(){document.getElementById('mobilePanel').classList.toggle('open');});
    header.querySelectorAll('[data-mobile]').forEach(function(btn){btn.addEventListener('click',function(){var id=btn.getAttribute('data-mobile')==='tools'?'mobileTools':'mobileAi';var el=document.getElementById(id);el.classList.toggle('open');btn.querySelector('span').textContent=el.classList.contains('open')?'−':'+';});});
  }

  function applyDirection(){ document.documentElement.lang=lang; document.documentElement.dir=lang==='fa'?'rtl':'ltr'; document.body.classList.toggle('rtl',lang==='fa'); }
  function translateHome(){
    if(location.pathname!=='/' && location.pathname!=='/index.html') return;
    var map={
      '⚡ FREE • FAST • PRIVACY-FIRST':'⚡ رایگان • سریع • حفظ حریم خصوصی',
      'Everyday tools.':'ابزارهای روزمره.', 'One simple place.':'همه در یک جای ساده.',
      'Convert, compress, resize, extract text and use practical AI tools without creating an account.':'تبدیل، فشرده‌سازی، تغییر اندازه، استخراج متن و استفاده از ابزارهای کاربردی هوش مصنوعی؛ بدون نیاز به ساخت حساب.',
      'Tools people need':'ابزارهایی که واقعاً نیاز دارید','POPULAR':'محبوب','Useful AI, not hype':'هوش مصنوعی کاربردی، بدون تبلیغات اضافی','AI WORKSPACE':'فضای هوش مصنوعی','FREE GUIDES':'راهنماهای رایگان','How to get better results':'چطور نتیجه بهتری بگیریم','Simple by design':'ساده و کاربردی','Choose a tool':'یک ابزار انتخاب کنید','Process your file':'فایل خود را پردازش کنید','Download':'دانلود','View all →':'مشاهده همه ←'
    };
    document.querySelectorAll('h1,h2,h3,p,small,b,a,span,button').forEach(function(el){if(el.children.length) return; var s=el.textContent.trim(); if(map[s]) el.textContent=map[s];});
    var search=document.getElementById('toolSearch'); if(search) search.placeholder=lang==='fa'?'جستجوی PDF، JPG، OCR، QR و...':'Search PDF, JPG, OCR, QR...';
  }

  applyDirection();
  document.addEventListener('DOMContentLoaded', function(){makeMenu();translateHome();});
})();
