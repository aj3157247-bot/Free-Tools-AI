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
      '<a class="navAppLink" href="/download/">📱 '+t('Download App','دانلود اپلیکیشن')+'</a>' +
      '<a href="/about/">'+t('About','درباره ما')+'</a>' +
      '</nav>' +
      '<div class="navActions"><button class="langBtn" id="langBtn" type="button">'+(lang === 'fa' ? 'English' : 'فارسی')+'</button><button class="menuBtn" id="menuBtn" type="button" aria-label="Menu">☰</button></div></div>' +
      '<div class="mega" id="toolsPanel"><div class="megaInner"><div class="megaHead"><div><small>'+t('TOOLS','ابزارها')+'</small><h3>'+t('All the tools in one place','همه ابزارها در یکجا')+'</h3></div><a href="/tools/">'+t('View all tools →','مشاهده همه ابزارها ←')+'</a></div><div class="megaGrid">'+tools.map(function(x){return '<a href="'+x[2]+'"><span>'+x[3]+'</span><b>'+t(x[0],x[1])+'</b></a>';}).join('')+'</div></div></div>' +
      '<div class="mega" id="aiPanel"><div class="megaInner"><div class="megaHead"><div><small>AI</small><h3>'+t('Practical AI tools','ابزارهای کاربردی هوش مصنوعی')+'</h3></div></div><div class="megaGrid aiMega">'+ai.map(function(x){return '<a href="'+x[2]+'"><span>'+x[3]+'</span><b>'+t(x[0],x[1])+'</b></a>';}).join('')+'</div></div></div>' +
      '<div class="mobilePanel" id="mobilePanel"><a href="/" data-home-link="1">🏠 '+t('Home','خانه')+'</a><a class="mobileAppLink" href="/download/">📱 '+t('Download App','دانلود اپلیکیشن')+'</a><button data-mobile="tools">🧰 '+t('Tools','ابزارها')+' <span>+</span></button><div class="mobileSub" id="mobileTools">'+tools.map(function(x){return '<a href="'+x[2]+'">'+x[3]+' '+t(x[0],x[1])+'</a>';}).join('')+'</div><button data-mobile="ai">🤖 '+t('AI Tools','ابزارهای هوش مصنوعی')+' <span>+</span></button><div class="mobileSub" id="mobileAi">'+ai.map(function(x){return '<a href="'+x[2]+'">'+x[3]+' '+t(x[0],x[1])+'</a>';}).join('')+'</div><a href="/guides/">📚 '+t('Guides','راهنماها')+'</a><a href="/about/">ℹ️ '+t('About','درباره ما')+'</a><a href="/privacy/">🔒 '+t('Privacy','حریم خصوصی')+'</a><a href="/terms/">📜 '+t('Terms','قوانین')+'</a></div>';
    document.body.prepend(header);
    header.querySelectorAll('[data-home-link]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();window.location.href='/';});});
    header.querySelector('.logo').setAttribute('data-ft-home','1');
    header.querySelectorAll('a[href="/"], a[href^="/#"]').forEach(function(a){a.setAttribute('data-ft-home','1');});

    header.querySelectorAll('.navDrop').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation(); var id=btn.getAttribute('data-panel'); document.querySelectorAll('.mega').forEach(function(p){p.classList.toggle('open',p.id===id && !p.classList.contains('open'));});});});
    document.addEventListener('click', function(e){ if(!e.target.closest('.v6-nav')) document.querySelectorAll('.mega').forEach(function(p){p.classList.remove('open');}); }, {once:true});
    document.getElementById('langBtn').addEventListener('click', function(){try{localStorage.setItem(KEY,lang==='fa'?'en':'fa');}catch(_){} location.reload();});
    document.getElementById('menuBtn').addEventListener('click', function(e){e.preventDefault();e.stopPropagation();document.getElementById('mobilePanel').classList.toggle('open');});
    header.querySelectorAll('[data-mobile]').forEach(function(btn){btn.addEventListener('click',function(){var id=btn.getAttribute('data-mobile')==='tools'?'mobileTools':'mobileAi';var el=document.getElementById(id);el.classList.toggle('open');btn.querySelector('span').textContent=el.classList.contains('open')?'−':'+';});});
  }

  function applyDirection(){ document.documentElement.lang=lang; document.documentElement.dir=lang==='fa'?'rtl':'ltr'; document.body.classList.toggle('rtl',lang==='fa'); }
  function translateHome(){
    if(location.pathname!=='/' && location.pathname!=='/index.html') return;
    var pairs={
      '⚡ FREE • FAST • PRIVACY-FIRST':'⚡ رایگان • سریع • حفظ حریم خصوصی',
      'Everyday tools.':'ابزارهای روزمره.',
      'One beautiful place.':'همه ابزارها در یک جای زیبا.',
      'One simple place.':'همه در یک جای ساده.',
      'Convert, compress, resize, extract text and use practical AI tools — fast, simple and without creating an account.':'تبدیل، فشرده‌سازی، تغییر اندازه، استخراج متن و استفاده از ابزارهای کاربردی هوش مصنوعی؛ سریع، ساده و بدون نیاز به ساخت حساب.',
      'Convert, compress, resize, extract text and use practical AI tools without creating an account.':'تبدیل، فشرده‌سازی، تغییر اندازه، استخراج متن و استفاده از ابزارهای کاربردی هوش مصنوعی؛ بدون نیاز به ساخت حساب.',
      'Search PDF, JPG, OCR, QR...':'جستجوی PDF، JPG، OCR، QR...',
      'POPULAR':'محبوب',
      'Tools people need':'ابزارهایی که واقعاً نیاز دارید',
      'View all →':'مشاهده همه ←',
      'PDF to Word':'PDF به Word','Turn PDF text into editable DOCX.':'تبدیل متن PDF به فایل DOCX قابل ویرایش.',
      'Remove Background':'حذف پس‌زمینه','Create transparent PNG images.':'ساخت تصاویر PNG با پس‌زمینه شفاف.',
      'HEIC to JPG':'HEIC به JPG','Convert iPhone photos to JPG.':'تبدیل عکس‌های آیفون به JPG.',
      'Compress to 50KB':'فشرده‌سازی تا 50KB','Fit images under a 50KB limit.':'کاهش حجم تصویر تا کمتر از 50KB.',
      'Image Compressor':'فشرده‌ساز تصویر','Reduce image file size.':'کاهش حجم فایل تصویر.',
      'Image to Text':'تصویر به متن','Extract text with OCR.':'استخراج متن با OCR.',
      'JPG to PDF':'JPG به PDF','Make PDFs from images.':'ساخت PDF از تصاویر.',
      'PDF to JPG':'PDF به JPG','Export PDF pages as images.':'تبدیل صفحات PDF به تصویر.',
      'QR Code Generator':'ساخت کد QR','Create QR codes instantly.':'ساخت سریع کدهای QR.',
      'Image Resizer':'تغییر اندازه تصویر','Resize to exact dimensions.':'تغییر اندازه به ابعاد دقیق.',
      'Image Converter':'مبدل تصویر','JPG, PNG and WebP.':'JPG، PNG و WebP.',
      'PDF Compressor':'فشرده‌ساز PDF','Optimize image-heavy PDFs.':'بهینه‌سازی PDFهای حجیم و تصویری.',
      'OCR':'تشخیص متن OCR','Read text from images.':'خواندن متن از تصاویر.',
      'AI WORKSPACE':'فضای هوش مصنوعی','Useful AI, not hype':'هوش مصنوعی کاربردی، بدون تبلیغات توخالی',
      'AI Summarizer':'خلاصه‌ساز هوشمند','Summarize long text.':'خلاصه‌سازی متن‌های طولانی.',
      'AI Translator':'مترجم هوشمند','Translate naturally.':'ترجمه روان و طبیعی.',
      'AI Rewriter':'بازنویس هوشمند','Rewrite text clearly.':'بازنویسی واضح و حرفه‌ای متن.',
      'AI Chat':'گفت‌وگوی هوشمند','Ask and brainstorm.':'پرسش، ایده‌پردازی و گفت‌وگو.',
      'FREE GUIDES':'راهنماهای رایگان','How to get better results':'چطور نتیجه بهتری بگیریم',
      'PDF to Word guide':'راهنمای PDF به Word','How to convert PDFs to editable documents.':'چگونه PDF را به سند قابل ویرایش تبدیل کنیم.',
      'Compress images':'فشرده‌سازی تصاویر','Reduce image size while keeping quality.':'کاهش حجم تصویر بدون افت محسوس کیفیت.',
      'Remove an image background':'حذف پس‌زمینه تصویر','Prepare clean transparent PNG results.':'ساخت خروجی PNG شفاف و تمیز.',
      'Image to text guide':'راهنمای تصویر به متن','Tips for better OCR results.':'نکاتی برای گرفتن نتیجه بهتر از OCR.',
      'Free online utilities for everyone.':'ابزارهای آنلاین رایگان برای همه.',
      'All tools':'همه ابزارها','Guides':'راهنماها','Privacy':'حریم خصوصی','About':'درباره ما','Terms':'قوانین',
      'ANDROID APP':'اپلیکیشن اندروید','FreeTools AI on your phone':'FreeTools AI روی گوشی شما',
      'Get faster access to FreeTools AI with our Android app. Free to download and ready to use.':'با اپلیکیشن اندروید FreeTools AI سریع‌تر به ابزارهای ما دسترسی داشته باشید. دانلود رایگان و آماده استفاده است.',
      '⬇️ Download FreeTools AI':'⬇️ دانلود FreeTools AI','Learn more →':'اطلاعات بیشتر ←',
      'AVAILABLE ON MORE PLATFORMS':'در پلتفرم‌های بیشتر در دسترس است','FreeTools AI everywhere':'FreeTools AI همه‌جا همراه شما',
      'Use FreeTools AI on Android today. iPhone and Windows versions are coming soon.':'امروز از FreeTools AI در اندروید استفاده کنید. نسخه‌های آیفون و ویندوز به‌زودی ارائه می‌شوند.',
      'ANDROID':'اندروید','Android App':'اپلیکیشن اندروید','Download APK':'دانلود APK','Download Android App':'دانلود اپلیکیشن اندروید',
      'IPHONE / iOS':'آیفون / iOS','iPhone App':'اپلیکیشن آیفون','The iPhone version is being prepared for the App Store.':'نسخه آیفون در حال آماده‌سازی برای انتشار در App Store است.',
      'WINDOWS':'ویندوز','Windows App':'اپلیکیشن ویندوز','A dedicated Windows version is planned. Until then, you can use the full web version.':'نسخه اختصاصی ویندوز در برنامه توسعه قرار دارد. تا آن زمان می‌توانید از نسخه کامل وب استفاده کنید.',
      'A dedicated Windows version is planned. You can use the web version right now.':'نسخه اختصاصی ویندوز در برنامه توسعه قرار دارد. فعلاً می‌توانید از نسخه وب استفاده کنید.',
      'Coming soon':'به‌زودی','Use Web Version':'استفاده از نسخه وب'
    };
    var reverse={}; Object.keys(pairs).forEach(function(k){reverse[pairs[k]]=k;});
    var map=lang==='fa'?pairs:reverse;
    function replaceText(el){
      if(!el) return;
      var s=el.textContent.trim();
      if(map[s]) el.textContent=map[s];
    }
    document.querySelectorAll('.hero .eyebrow,.hero h1,.hero p,.sectionTitle small,.sectionTitle h2,.sectionTitle>a,.aiSection .sectionTitle small,.aiSection .sectionTitle h2,footer p,footer a').forEach(function(el){
      var s=el.textContent.trim();
      if(!map[s]) return;
      if(el.tagName==='H1' && el.querySelector('em')){
        el.innerHTML=lang==='fa'?'ابزارهای روزمره.<br><em>همه ابزارها در یک جای زیبا.</em>':'Everyday tools.<br><em>One beautiful place.</em>';
      } else el.textContent=map[s];
    });
    document.querySelectorAll('.quickTools b,.cards .card b,.cards .card p,.aiCard b,.aiCard span').forEach(replaceText);
    var search=document.getElementById('toolSearch'); if(search) search.placeholder=lang==='fa'?'جستجوی PDF، JPG، OCR، QR...':'Search PDF, JPG, OCR, QR...';
    document.documentElement.lang=lang; document.documentElement.dir=lang==='fa'?'rtl':'ltr';
  }

  function translateDownloadPage(){
    if(location.pathname!=='/download/' && location.pathname!=='/download/index.html') return;
    var map={
      'FREE • FAST • ANDROID':'رایگان • سریع • اندروید',
      'FreeTools AI App':'اپلیکیشن FreeTools AI',
      'Take your favorite free tools with you. Convert, compress, resize, extract text and use practical AI tools from your Android device.':'ابزارهای رایگان موردعلاقه‌تان را همیشه همراه خود داشته باشید. با گوشی اندرویدی خود تبدیل، فشرده‌سازی، تغییر اندازه، استخراج متن و استفاده از ابزارهای کاربردی هوش مصنوعی را انجام دهید.',
      'Download Android App':'دانلود اپلیکیشن اندروید',
      'APK • Free • Direct download':'APK • رایگان • دانلود مستقیم',
      'Android':'اندروید',
      'Install the app directly on your phone.':'اپلیکیشن را مستقیماً روی گوشی خود نصب کنید.',
      'Free tools':'ابزارهای رایگان',
      'Access PDF, image, OCR and AI tools.':'به ابزارهای PDF، تصویر، OCR و هوش مصنوعی دسترسی داشته باشید.',
      'Fast access':'دسترسی سریع','AVAILABLE ON MORE PLATFORMS':'در پلتفرم‌های بیشتر در دسترس است','FreeTools AI everywhere':'FreeTools AI همه‌جا همراه شما','Use FreeTools AI on Android today. iPhone and Windows versions are coming soon.':'امروز از FreeTools AI در اندروید استفاده کنید. نسخه‌های آیفون و ویندوز به‌زودی ارائه می‌شوند.','ANDROID':'اندروید','Android App':'اپلیکیشن اندروید','Download APK':'دانلود APK','Download Android App':'دانلود اپلیکیشن اندروید','IPHONE / iOS':'آیفون / iOS','iPhone App':'اپلیکیشن آیفون','The iPhone version is being prepared for the App Store.':'نسخه آیفون در حال آماده‌سازی برای انتشار در App Store است.','WINDOWS':'ویندوز','Windows App':'اپلیکیشن ویندوز','A dedicated Windows version is planned. Until then, you can use the full web version.':'نسخه اختصاصی ویندوز در برنامه توسعه قرار دارد. تا آن زمان می‌توانید از نسخه کامل وب استفاده کنید.','A dedicated Windows version is planned. You can use the web version right now.':'نسخه اختصاصی ویندوز در برنامه توسعه قرار دارد. فعلاً می‌توانید از نسخه وب استفاده کنید.','Coming soon':'به‌زودی','Use Web Version':'استفاده از نسخه وب',
      'Open FreeTools AI quickly from your home screen.':'FreeTools AI را سریع از صفحه اصلی گوشی باز کنید.'
    };
    document.querySelectorAll('h1,h2,h3,p,small,b,a,span,div').forEach(function(el){
      if(el.children.length) return;
      var s=el.textContent.trim();
      if(map[s]) el.textContent=map[s];
    });
    document.title=lang==='fa'?'دانلود اپلیکیشن FreeTools AI':'Download FreeTools AI App';
  }


  // Lightweight privacy-friendly analytics: no names, emails, or raw IPs are stored.
  function ftAnalytics(){
    try {
      var sid = localStorage.getItem('ft_analytics_sid');
      if(!sid){ sid = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())+'-'+Math.random()); localStorage.setItem('ft_analytics_sid',sid); }
      var payload={sid:sid,path:location.pathname||'/',title:document.title||'',referrer:document.referrer||'',lang:lang,screen:window.innerWidth+'x'+window.innerHeight};
      fetch('/api/analytics',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),keepalive:true}).catch(function(){});
      window.setInterval(function(){
        fetch('/api/analytics',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({sid:sid,path:location.pathname||'/',heartbeat:true}),keepalive:true}).catch(function(){});
      },60000);
      document.addEventListener('click',function(e){
        var a=e.target.closest && e.target.closest('a');
        if(!a) return;
        var href=a.getAttribute('href')||'';
        if(href.indexOf('/downloads/')===0 || href.indexOf('/download/')===0 || href.indexOf('appstore')>=0 || href.indexOf('windows')>=0){
          fetch('/api/analytics',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({sid:sid,path:location.pathname||'/',event:'click',target:href}),keepalive:true}).catch(function(){});
        }
      },{passive:true});
    } catch(_){}
  }
  function ftAds(){
    if(document.body.classList.contains('ft-ads-loaded')) return;
    document.body.classList.add('ft-ads-loaded');
    var style=document.createElement('style');
    style.textContent='.ftAd{max-width:1180px;margin:16px auto;padding:0 18px}.ftAdBox{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #e6e7f0;border-radius:16px;padding:12px;box-shadow:0 8px 28px rgba(30,25,80,.06);text-decoration:none;color:inherit;overflow:hidden}.ftAdBox:hover{transform:translateY(-1px)}.ftAdImg{width:180px;height:88px;object-fit:cover;border-radius:10px;background:#eef0f7;flex:0 0 auto}.ftAdCopy{min-width:0;flex:1}.ftAdLabel{display:inline-block;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#6b6b78;margin-bottom:4px}.ftAdTitle{font-weight:800;font-size:17px;margin:0 0 4px}.ftAdDesc{font-size:13px;color:#686978;margin:0}.ftAdGo{font-weight:800;font-size:13px;white-space:nowrap}.ftAdBottom{margin-top:28px;margin-bottom:28px}@media(max-width:650px){.ftAd{padding:0 12px}.ftAdBox{gap:11px}.ftAdImg{width:92px;height:70px}.ftAdTitle{font-size:15px}.ftAdDesc{font-size:12px}.ftAdGo{font-size:12px}}';
    document.head.appendChild(style);
    fetch('/api/public-ads',{cache:'no-store'}).then(function(r){return r.json()}).then(function(data){
      var ads=(data&&data.ads)||[]; if(!ads.length) return;
      var home=location.pathname==='/'||location.pathname==='/index.html';
      var tool=location.pathname.indexOf('/tools/')===0||location.pathname.indexOf('/ai/')===0;
      var top=ads.find(function(a){return a.placement==='top'})||ads.find(function(a){return home&&a.placement==='home'})||ads.find(function(a){return tool&&a.placement==='tools'});
      var special=home?ads.find(function(a){return a.placement==='home'&&(!top||a.id!==top.id)}):tool?ads.find(function(a){return a.placement==='tools'&&(!top||a.id!==top.id)}):null;
      var bottom=ads.find(function(a){return a.placement==='bottom'&&(!top||a.id!==top.id)&&(!special||a.id!==special.id)});
      function mount(ad,where,extra){if(!ad)return;var wrap=document.createElement('div');wrap.className='ftAd'+(extra?' ftAdBottom':'');var label=lang==='fa'?'تبلیغ':'Sponsored';wrap.innerHTML='<a class="ftAdBox" href="'+esc(ad.target_url)+'" target="_blank" rel="sponsored noopener noreferrer"><div class="ftAdCopy"><span class="ftAdLabel">'+label+'</span><h3 class="ftAdTitle">'+esc(ad.title)+'</h3>'+(ad.description?'<p class="ftAdDesc">'+esc(ad.description)+'</p>':'')+'</div>'+(ad.image_url?'<img class="ftAdImg" src="'+esc(ad.image_url)+'" alt="">':'')+'<span class="ftAdGo">'+(lang==='fa'?'مشاهده ←':'View →')+'</span></a></div>';
        var node=where(); if(node) node.insertAdjacentElement('afterend',wrap); else document.body.appendChild(wrap);
        try{var seen=sessionStorage.getItem('ft_ad_seen_'+ad.id);if(!seen){sessionStorage.setItem('ft_ad_seen_'+ad.id,'1');fetch('/api/ad-event',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id:ad.id,type:'impression'}),keepalive:true}).catch(function(){})}}catch(_){fetch('/api/ad-event',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id:ad.id,type:'impression'}),keepalive:true}).catch(function(){})}
        var link=wrap.querySelector('a');link.addEventListener('click',function(){fetch('/api/ad-event',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id:ad.id,type:'click'}),keepalive:true}).catch(function(){})});
      }
      mount(top,function(){return document.querySelector('header.nav')||document.body.firstElementChild});
      if(special) mount(special,function(){return document.querySelector('.section')||document.querySelector('main')||document.body.firstElementChild});
      if(bottom) mount(bottom,function(){return document.querySelector('footer')||null},true);
    }).catch(function(){});
  }
  function installHomeNavigation(){
    document.addEventListener('click', function(e){
      var a=e.target.closest && e.target.closest('a');
      if(!a || a.target==='_blank') return;
      var raw=a.getAttribute('href')||'';
      if(raw==='/' || raw==='/#tools' || raw==='/#ai' || a.hasAttribute('data-ft-home')){
        e.preventDefault();
        e.stopImmediatePropagation();
        window.location.href='/';
      }
    }, true);
  }
  applyDirection();
  document.addEventListener('DOMContentLoaded', function(){installHomeNavigation();makeMenu();translateHome();translateDownloadPage();ftAds();ftAnalytics();});
})();
