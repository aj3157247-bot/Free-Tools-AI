/* FreeTools AI — shared menu + English/Persian language switcher */
(function () {
  'use strict';
  var KEY = 'ft_lang';

  /* ---------- data ---------- */
  var TOOLS = [
    { en: 'PDF to Word', fa: 'PDF به ورد', path: '/tools/pdf-to-word/', e: '📄' },
    { en: 'PDF to Text', fa: 'PDF به متن', path: '/tools/pdf-to-text/', e: '📝' },
    { en: 'PDF to JPG', fa: 'PDF به JPG', path: '/tools/pdf-to-jpg/', e: '🖼️' },
    { en: 'PDF Compressor', fa: 'فشرده‌ساز PDF', path: '/tools/pdf-compressor/', e: '🗜️' },
    { en: 'JPG to PDF', fa: 'JPG به PDF', path: '/tools/jpg-to-pdf/', e: '📑' },
    { en: 'HEIC to JPG', fa: 'HEIC به JPG', path: '/tools/heic-to-jpg/', e: '🍎' },
    { en: 'Image Converter', fa: 'مبدل تصویر', path: '/tools/image-converter/', e: '🔄' },
    { en: 'Image Compressor', fa: 'فشرده‌ساز تصویر', path: '/tools/image-compressor/', e: '📦' },
    { en: 'Image Resizer', fa: 'تغییر اندازه تصویر', path: '/tools/image-resizer/', e: '↔️' },
    { en: 'Image to Text', fa: 'تصویر به متن', path: '/tools/image-to-text/', e: '🔤' },
    { en: 'OCR', fa: 'تشخیص متن (OCR)', path: '/tools/ocr/', e: '🔎' },
    { en: 'Remove Background', fa: 'حذف پس‌زمینه', path: '/tools/remove-background/', e: '✂️' },
    { en: 'QR Code Generator', fa: 'ساخت کد QR', path: '/tools/qr-code-generator/', e: '▣' }
  ];
    { en: 'PNG to JPG', fa: 'PNG به JPG', path: '/tools/png-to-jpg/', e: '🖼️' },
    { en: 'JPG to PNG', fa: 'JPG به PNG', path: '/tools/jpg-to-png/', e: '🖼️' },
    { en: 'JPG to WebP', fa: 'JPG به WebP', path: '/tools/jpg-to-webp/', e: '⚡' },
    { en: 'PNG to WebP', fa: 'PNG به WebP', path: '/tools/png-to-webp/', e: '⚡' },
    { en: 'WebP to JPG', fa: 'WebP به JPG', path: '/tools/webp-to-jpg/', e: '🔄' },
    { en: 'WebP to PNG', fa: 'WebP به PNG', path: '/tools/webp-to-png/', e: '🔄' },
    { en: 'Image Cropper', fa: 'برش تصویر', path: '/tools/image-cropper/', e: '✂️' },
    { en: 'Image Metadata Remover', fa: 'حذف متادیتای تصویر', path: '/tools/image-metadata-remover/', e: '🧹' },
    { en: 'Merge PDF', fa: 'ادغام PDF', path: '/tools/merge-pdf/', e: '📚' },
  var AIT = [
    { en: 'AI Summarizer', fa: 'خلاصه‌ساز هوشمند', path: '/ai/summarizer/', e: '🧠' },
    { en: 'AI Translator', fa: 'مترجم هوشمند', path: '/ai/translator/', e: '🌍' },
    { en: 'AI Rewriter', fa: 'بازنویس هوشمند', path: '/ai/rewriter/', e: '✍️' },
    { en: 'AI Chat', fa: 'گفت‌وگوی هوشمند', path: '/ai/chat/', e: '💬' }
  ];

  var UI = {
    en: { home: 'Home', tools: 'Tools', ai: 'AI Tools', more: 'More', all: 'All tools', how: 'How it works', privacy: 'Privacy', menu: 'Menu', close: 'Close', lang: 'Language' },
    fa: { home: 'خانه', tools: 'ابزارها', ai: 'ابزارهای هوش مصنوعی', more: 'بیشتر', all: 'همه ابزارها', how: 'نحوه کار', privacy: 'حریم خصوصی', menu: 'منو', close: 'بستن', lang: 'زبان' }
  };

  /* English -> Persian dictionary (exact text match) */
  var D = {
    'Tools': 'ابزارها',
    '← All tools': '→ همه ابزارها',
    'FREE ONLINE TOOL': 'ابزار آنلاین رایگان',
    'Ask questions, brainstorm or get help with everyday tasks.': 'سؤال بپرسید، ایده‌پردازی کنید یا برای کارهای روزمره کمک بگیرید.',
    'Run AI': 'اجرای هوش مصنوعی',
    'Your result appears here.': 'نتیجه اینجا نمایش داده می‌شود.',
    'AI calls are sent through your Cloudflare Worker. Never put an API key in frontend code.': 'درخواست‌های هوش مصنوعی از طریق سرور امن ارسال می‌شوند. هرگز کلید API را در کد سمت کاربر قرار ندهید.',
    'Free tools for everyone.': 'ابزارهای رایگان برای همه.',
    'Rewrite text to be clearer, more natural or more professional.': 'متن را روان‌تر، طبیعی‌تر یا حرفه‌ای‌تر بازنویسی کنید.',
    'Summarize long text into clear key points.': 'متن‌های طولانی را به نکات کلیدی روشن خلاصه کنید.',
    'Translate text naturally while preserving meaning and formatting.': 'متن را طبیعی ترجمه کنید؛ معنا و قالب‌بندی حفظ می‌شود.',
    'How it works': 'نحوه کار',
    '⚡ FREE • FAST • PRIVACY-FIRST': '⚡ رایگان • سریع • حریم خصوصی',
    'Everyday tools.': 'ابزارهای روزمره.',
    'One simple place.': 'در یک جای ساده.',
    'Convert, compress, resize, extract text and use practical AI tools without creating an account.': 'تبدیل، فشرده‌سازی، تغییر اندازه، استخراج متن و استفاده از ابزارهای کاربردی هوش مصنوعی، بدون نیاز به ساخت حساب.',
    'POPULAR': 'محبوب',
    'Tools people need': 'ابزارهایی که مردم نیاز دارند',
    'View all →': 'مشاهده همه ←',
    'Turn PDF text into editable DOCX.': 'متن PDF را به فایل DOCX قابل ویرایش تبدیل کنید.',
    'Create transparent PNG images.': 'تصاویر PNG با پس‌زمینه شفاف بسازید.',
    'Convert iPhone photos to JPG.': 'عکس‌های آیفون را به JPG تبدیل کنید.',
    'Reduce image file size.': 'حجم فایل تصویر را کاهش دهید.',
    'Extract text with OCR.': 'متن را با OCR استخراج کنید.',
    'Make PDFs from images.': 'از تصاویر، PDF بسازید.',
    'Export PDF pages as images.': 'صفحه‌های PDF را به صورت تصویر ذخیره کنید.',
    'Create QR codes instantly.': 'کد QR را فوری بسازید.',
    'Resize to exact dimensions.': 'تغییر اندازه به ابعاد دقیق.',
    'JPG, PNG and WebP.': 'JPG، PNG و WebP.',
    'Optimize image-heavy PDFs.': 'PDFهای پرتصویر را بهینه کنید.',
    'Read text from images.': 'متن را از تصاویر بخوانید.',
    'AI WORKSPACE': 'فضای هوش مصنوعی',
    'Useful AI, not hype': 'هوش مصنوعی مفید، نه تبلیغاتی',
    'Summarize long text.': 'متن‌های طولانی را خلاصه کنید.',
    'Translate naturally.': 'طبیعی ترجمه کنید.',
    'Rewrite text clearly.': 'متن را روان بازنویسی کنید.',
    'Ask and brainstorm.': 'بپرسید و ایده‌پردازی کنید.',
    'Simple by design': 'ساده طراحی شده',
    'Choose a tool': 'یک ابزار انتخاب کنید',
    'Find the exact task.': 'کار مورد نظر را پیدا کنید.',
    'Process your file': 'فایل خود را پردازش کنید',
    'Browser tools keep files local.': 'ابزارهای مرورگری فایل‌ها را روی دستگاه شما نگه می‌دارند.',
    'Download': 'دانلود',
    'Get your result immediately.': 'نتیجه را فوراً دریافت کنید.',
    'Free online utilities for everyone.': 'ابزارهای آنلاین رایگان برای همه.',
    'All tools': 'همه ابزارها',
    'Privacy': 'حریم خصوصی',
    'Fast free online tools for PDF, images, OCR, QR codes and AI. No signup required for basic tools.': 'ابزارهای آنلاین رایگان و سریع برای PDF، تصویر، OCR، کد QR و هوش مصنوعی. برای ابزارهای پایه نیازی به ثبت‌نام نیست.',
    'Browser tools process files locally whenever possible. AI features send the text you submit to an AI provider. Do not submit sensitive information.': 'ابزارهای مرورگری تا حد امکان فایل‌ها را روی دستگاه شما پردازش می‌کنند. قابلیت‌های هوش مصنوعی متنی را که ارسال می‌کنید به یک ارائه‌دهنده هوش مصنوعی می‌فرستند. اطلاعات حساس ارسال نکنید.',
    'Convert HEIC/HEIF iPhone photos to JPG directly in your browser.': 'عکس‌های HEIC/HEIF آیفون را مستقیماً در مرورگر به JPG تبدیل کنید.',
    'Drop a HEIC / HEIF photo': 'یک عکس HEIC / HEIF را اینجا رها کنید',
    'or tap to choose': 'یا برای انتخاب لمس کنید',
    'Your file is processed in the browser with a HEIC decoder.': 'فایل شما در مرورگر با رمزگشای HEIC پردازش می‌شود.',
    'Compress JPG, PNG and WebP images locally.': 'تصاویر JPG، PNG و WebP را روی دستگاه خود فشرده کنید.',
    'Drop an image': 'یک تصویر را اینجا رها کنید',
    'Quality': 'کیفیت',
    'Convert JPG, PNG and WebP images in your browser.': 'تصاویر JPG، PNG و WebP را در مرورگر تبدیل کنید.',
    'Format': 'فرمت',
    'Resize an image to exact width and height in pixels.': 'اندازه تصویر را با عرض و ارتفاع دقیق (پیکسل) تغییر دهید.',
    'Resize': 'تغییر اندازه',
    'Extract text from photos and screenshots with browser-based OCR.': 'متن را از عکس‌ها و اسکرین‌شات‌ها با OCR مرورگری استخراج کنید.',
    'English': 'انگلیسی',
    'Persian': 'فارسی',
    'Arabic': 'عربی',
    'Run OCR': 'اجرای OCR',
    'LIBRARY': 'کتابخانه',
    'Browse free PDF, image, OCR and utility tools.': 'ابزارهای رایگان PDF، تصویر، OCR و ابزارهای کاربردی را مرور کنید.',
    'Convert an image into a downloadable PDF.': 'یک تصویر را به PDF قابل دانلود تبدیل کنید.',
    'Drop an image or tap to choose': 'یک تصویر را رها کنید یا برای انتخاب لمس کنید',
    'This lightweight version uses a simple PDF wrapper. For multi-image PDFs, connect the production PDF engine.': 'این نسخه سبک از یک پوشش ساده PDF استفاده می‌کند. برای PDF چندتصویری، موتور PDF نسخه نهایی را متصل کنید.',
    'Convert JPG and PNG images into a PDF in your browser.': 'تصاویر JPG و PNG را در مرورگر به PDF تبدیل کنید.',
    'Recognize text from images with browser-based Tesseract OCR.': 'متن را از تصاویر با OCR مرورگری Tesseract تشخیص دهید.',
    'Compress image-heavy PDFs by rebuilding pages at a lower image quality.': 'PDFهای پرتصویر را با بازسازی صفحه‌ها در کیفیت تصویر پایین‌تر فشرده کنید.',
    'Drop a PDF': 'یک فایل PDF را اینجا رها کنید',
    'This method is intended for image-heavy PDFs and may reduce image quality.': 'این روش برای PDFهای پرتصویر است و ممکن است کیفیت تصویر را کم کند.',
    'Convert every PDF page to a JPG image in your browser.': 'هر صفحه PDF را در مرورگر به تصویر JPG تبدیل کنید.',
    'Extract selectable text from PDF files locally.': 'متن قابل انتخاب را از فایل‌های PDF روی دستگاه خود استخراج کنید.',
    'Extract selectable PDF text and create a real editable DOCX in your browser.': 'متن قابل انتخاب PDF را استخراج کنید و در مرورگر یک فایل DOCX واقعی و قابل ویرایش بسازید.',
    'For scanned PDFs with no selectable text, use OCR first.': 'برای PDFهای اسکن‌شده که متن قابل انتخاب ندارند، ابتدا از OCR استفاده کنید.',
    'Create a downloadable QR code from any URL or text.': 'از هر آدرس یا متن، یک کد QR قابل دانلود بسازید.',
    'Generate QR': 'ساخت QR',
    'Create a QR code from any URL or text.': 'از هر آدرس یا متن، یک کد QR بسازید.',
    'Generate': 'ساخت',
    'Create and download QR codes for free.': 'کدهای QR را رایگان بسازید و دانلود کنید.',
    'Remove image backgrounds and download a transparent PNG.': 'پس‌زمینه تصویر را حذف کنید و PNG شفاف دانلود کنید.',
    'The API key stays on the Cloudflare Worker. Configure REMOVE_BG_API_KEY on the Worker before using this tool.': 'کلید API روی سرور امن نگهداری می‌شود.',
    'Open / save QR': 'باز کردن / ذخیره QR',
    /* page titles */
    'FreeTools AI — Free Online Tools for PDF, Images & AI': 'FreeTools AI — ابزارهای آنلاین رایگان برای PDF، تصویر و هوش مصنوعی',
    'JPG to PDF — Convert Images to PDF Free': 'JPG به PDF — تبدیل رایگان تصویر به PDF',
    'QR Code Generator — Free Online': 'ساخت کد QR — آنلاین و رایگان',
    'OCR — Image to Text': 'OCR — تصویر به متن',
    'Image to Text — OCR': 'تصویر به متن — OCR',
    'All Free Online Tools': 'همه ابزارهای آنلاین رایگان',
    'All tools ': 'همه ابزارها',
    /* attributes */
    'Enter your text or request…': 'متن یا درخواست خود را وارد کنید…',
    'Search PDF, JPG, OCR, QR...': 'جست‌وجوی PDF، JPG، OCR، QR...',
    'Width': 'عرض',
    'Height': 'ارتفاع',
    /* runtime messages */
    'Enter text first.': 'ابتدا متن را وارد کنید.',
    'Thinking…': 'در حال پردازش…',
    'Converting HEIC…': 'در حال تبدیل HEIC…',
    'Could not decode this HEIC file in the browser.': 'این فایل HEIC در مرورگر قابل رمزگشایی نبود.',
    'Compressing…': 'در حال فشرده‌سازی…',
    'Converting…': 'در حال تبدیل…',
    'Choose an image first.': 'ابتدا یک تصویر انتخاب کنید.',
    'Image selected.': 'تصویر انتخاب شد.',
    'Starting OCR…': 'شروع OCR…',
    'OCR complete.': 'OCR کامل شد.',
    'Rendering…': 'در حال ساخت…',
    'Extracting…': 'در حال استخراج…',
    'Done.': 'انجام شد.',
    'No selectable text found.': 'متن قابل انتخابی پیدا نشد.',
    'Reading PDF…': 'در حال خواندن PDF…',
    'No selectable text found. Use OCR for scanned PDFs.': 'متن قابل انتخابی پیدا نشد. برای PDFهای اسکن‌شده از OCR استفاده کنید.',
    'Enter text or a URL.': 'یک متن یا آدرس وارد کنید.',
    'Convert to Word': 'تبدیل به ورد',
    'Convert to JPG': 'تبدیل به JPG',
    'Compress': 'فشرده‌سازی',
    'Convert': 'تبدیل',
    'Compress PDF': 'فشرده‌سازی PDF',
    'Extract Text': 'استخراج متن',
    'Drop images': 'تصاویر را اینجا رها کنید',
    'Convert to PDF': 'تبدیل به PDF',
    'Images are combined into one PDF in the order you select them.': 'تصاویر به ترتیبی که انتخاب می‌کنید در یک PDF ترکیب می‌شوند.',
    'Selected:': 'فایل انتخاب‌شده:',
    'Network error. Check your connection or turn off your VPN, then try again.': 'خطای شبکه. اتصال اینترنت را بررسی کنید یا VPN را خاموش کنید و دوباره تلاش کنید.',
    'Download QR PNG': 'دانلود QR (PNG)',
    'Removing background…': 'در حال حذف پس‌زمینه…',
    'AI request failed': 'درخواست هوش مصنوعی ناموفق بود.',
    'Too many requests. Try again in a minute.': 'درخواست‌ها زیاد است. یک دقیقه بعد دوباره تلاش کنید.',
    'Image is too large. Maximum 12 MB.': 'حجم تصویر زیاد است. حداکثر ۱۲ مگابایت.',
    'No image file was uploaded.': 'هیچ تصویری ارسال نشد.',
    'No response.': 'پاسخی دریافت نشد.'
  };
  TOOLS.concat(AIT).forEach(function (t) { D[t.en] = t.fa; });

  var RULES = [
    [/^Original: (.+) → New: (.+)$/, function (m) { return 'اصلی: ' + m[1] + ' ← جدید: ' + m[2]; }],
    [/^Original: (.+) → (.+)$/, function (m) { return 'اصلی: ' + m[1] + ' ← ' + m[2]; }],
    [/^Original: (.+)$/, function (m) { return 'اصلی: ' + m[1]; }],
    [/^Selected: (.+)$/, function (m) { return 'فایل انتخاب‌شده: ' + m[1]; }],
    [/^Download (.+)$/, function (m) { return 'دانلود \u2068' + m[1] + '\u2069'; }],
    [/^OCR (\d+%)$/, function (m) { return 'OCR ' + m[1]; }],
    [/^Background-removal API is not configured or failed: (.*)$/, function (m) { return 'سرویس حذف پس‌زمینه تنظیم نشده یا با خطا مواجه شد: \u2068' + m[1] + '\u2069'; }],
    [/^Could not remove the background: (.*)$/, function (m) { return 'حذف پس‌زمینه انجام نشد: \u2068' + m[1] + '\u2069'; }]
  ];

  /* ---------- state ---------- */
  function readLang() {
    try { var s = localStorage.getItem(KEY); if (s === 'fa' || s === 'en') return s; } catch (e) {}
    return /^fa/i.test(navigator.language || '') ? 'fa' : 'en';
  }
  var lang = readLang();

  /* ---------- translation ---------- */
  function tr(s) {
    var m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var core = m[2];
    if (!core) return s;
    var r = D[core];
    if (r === undefined) {
      var p = core.match(/^([^\p{L}\p{N}]+)([\s\S]+)$/u);
      if (p && D[p[2]] !== undefined) r = p[1] + D[p[2]];
    }
    if (r === undefined) {
      for (var i = 0; i < RULES.length; i++) {
        var mm = core.match(RULES[i][0]);
        if (mm) { r = RULES[i][1](mm); break; }
      }
    }
    if (r === undefined) {
      var t = core.match(/^(.+) \| FreeTools AI$/);
      if (t && D[t[1]] !== undefined) r = D[t[1]] + ' | FreeTools AI';
    }
    return r === undefined ? s : m[1] + r + m[3];
  }

  var orig = new WeakMap();      // text node -> original text
  var origAttr = new WeakMap();  // element -> {attr: original}
  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  var observer = null;

  function skipText(n) {
    var e = n.parentElement;
    if (!e) return true;
    if (/^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT|TITLE)$/.test(e.tagName)) return true;
    return !!e.closest('.logo,.brand,[data-notr]');
  }
  function setText(n) {
    if (skipText(n)) return;
    var o = orig.get(n);
    if (o === undefined) { o = n.data; orig.set(n, o); }
    var v = lang === 'fa' ? tr(o) : o;
    if (n.data !== v) n.data = v;
  }
  function setAttrs(el) {
    if (el.closest && el.closest('[data-notr]')) return;
    var store = origAttr.get(el);
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      if (!store) { store = {}; origAttr.set(el, store); }
      if (store[a] === undefined) store[a] = el.getAttribute(a);
      var v = lang === 'fa' ? tr(store[a]) : store[a];
      if (el.getAttribute(a) !== v) el.setAttribute(a, v);
    });
  }
  function walk(root) {
    if (root.nodeType === 3) { setText(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) setText(n);
    var base = root.nodeType === 9 ? root.documentElement : root;
    if (base.matches && base.matches('[placeholder],[title],[aria-label],[alt]')) setAttrs(base);
    base.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(setAttrs);
  }

  var origTitle = null, origDesc = null;
  function applyHead() {
    if (origTitle === null) origTitle = document.title;
    document.title = lang === 'fa' ? tr(origTitle) : origTitle;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      if (origDesc === null) origDesc = meta.getAttribute('content') || '';
      meta.setAttribute('content', lang === 'fa' ? tr(origDesc) : origDesc);
    }
  }

  function observe() {
    if (!observer) {
      observer = new MutationObserver(function (recs) {
        observer.disconnect();
        recs.forEach(function (r) {
          if (r.type === 'characterData') { orig.set(r.target, r.target.data); setText(r.target); }
          else r.addedNodes.forEach(function (n) { walk(n); });
        });
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      });
    }
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ---------- styles ---------- */
  function injectCSS() {
    var css = [
      '.nav>nav{display:none!important}',
      '.ftActions{display:flex;align-items:center;gap:10px;direction:ltr}',
      '.ftBtn{display:inline-flex;align-items:center;justify-content:center;height:42px;min-width:42px;padding:0 12px;border:1px solid #e5e7eb;background:#fff;color:#101828;border-radius:12px;font:inherit;font-weight:800;font-size:14px;cursor:pointer}',
      '.ftBtn:hover{border-color:#6d4aff;color:#6d4aff}',
      '.ftBtn svg{display:block}',
      '#ftMenu{position:fixed;inset:0;z-index:1000;visibility:hidden}',
      '#ftMenu.open{visibility:visible}',
      '#ftMenu .ftOverlay{position:absolute;inset:0;background:rgba(16,24,40,.45);opacity:0;transition:opacity .22s}',
      '#ftMenu.open .ftOverlay{opacity:1}',
      '#ftMenu .ftPanel{position:absolute;top:0;right:0;bottom:0;width:min(88vw,350px);background:#fff;box-shadow:-20px 0 50px rgba(16,24,40,.18);transform:translateX(100%);transition:transform .25s ease;display:flex;flex-direction:column;overflow:hidden}',
      '#ftMenu.open .ftPanel{transform:none}',
      '#ftMenu .ftHead{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #e5e7eb;direction:ltr}',
      '#ftMenu .ftHead b{font-size:18px;font-weight:950;letter-spacing:-.5px;color:#101828}',
      '#ftMenu .ftHead b span{color:#6d4aff}',
      '#ftMenu .ftBody{overflow-y:auto;padding:8px 10px 24px;-webkit-overflow-scrolling:touch}',
      '#ftMenu h4{margin:18px 10px 6px;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#6d4aff;font-weight:950}',
      '#ftMenu a.ftLink{display:flex;align-items:center;gap:12px;padding:12px 10px;border-radius:12px;color:#101828;text-decoration:none;font-weight:700;font-size:15.5px}',
      '#ftMenu a.ftLink:hover,#ftMenu a.ftLink.cur{background:#f3f0ff;color:#5736d8}',
      '#ftMenu a.ftLink i{font-style:normal;width:26px;text-align:center;font-size:19px}',
      '#ftMenu .ftLangRow{display:flex;gap:8px;margin:6px 10px}',
      '#ftMenu .ftLangRow button{flex:1;height:44px;border-radius:12px;border:1px solid #e5e7eb;background:#fff;font:inherit;font-weight:800;cursor:pointer;color:#101828}',
      '#ftMenu .ftLangRow button.on{background:#6d4aff;border-color:#6d4aff;color:#fff}',
      'body.ftLock{overflow:hidden}',
      'textarea,.aiOutput{unicode-bidi:plaintext}',
      /* Persian / RTL */
      'html[dir=rtl] body{font-family:Vazirmatn,Inter,system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif}',
      'html[dir=rtl] *{letter-spacing:0!important}',
      'html[dir=rtl] .hero h1{line-height:1.3}',
      'html[dir=rtl] .toolHead h1,html[dir=rtl] .sectionTitle h2{line-height:1.35}',
      'html[dir=rtl] .download{margin:12px 0 0 8px}',
      'html[dir=rtl] #ftMenu .ftPanel{direction:rtl}',
      'html[dir=rtl] #ftMenu .ftHead{direction:ltr}',
      'html[dir=rtl] .eyebrow,html[dir=rtl] .toolEyebrow{letter-spacing:0}'
    ].join('\n');
    var st = document.createElement('style');
    st.id = 'ftStyle';
    st.textContent = css;
    document.head.appendChild(st);
  }
  function loadFont() {
    if (document.getElementById('ftFont')) return;
    var l = document.createElement('link');
    l.id = 'ftFont';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;800;900&display=swap';
    document.head.appendChild(l);
  }

  /* ---------- menu ---------- */
  var menuEl = null, btnEl = null, langBtnEl = null;

  function curPath() { return location.pathname.replace(/index\.html$/, ''); }

  function link(href, emoji, text) {
    var cur = href.split('#')[0] === curPath() && href.indexOf('#') < 0 ? ' cur' : '';
    return '<a class="ftLink' + cur + '" href="' + href + '"><i>' + emoji + '</i><span>' + text + '</span></a>';
  }

  function buildMenu() {
    var u = UI[lang], fa = lang === 'fa';
    var html = '<div class="ftOverlay"></div><div class="ftPanel" role="dialog" aria-modal="true" aria-label="' + u.menu + '">' +
      '<div class="ftHead"><b>FreeTools<span>AI</span></b>' +
      '<button class="ftBtn" id="ftClose" aria-label="' + u.close + '" data-notr>✕</button></div>' +
      '<div class="ftBody">' +
      link('/', '🏠', u.home) +
      '<h4>' + u.tools + '</h4>' +
      TOOLS.map(function (t) { return link(t.path, t.e, fa ? t.fa : t.en); }).join('') +
      '<h4>' + u.ai + '</h4>' +
      AIT.map(function (t) { return link(t.path, t.e, fa ? t.fa : t.en); }).join('') +
      '<h4>' + u.more + '</h4>' +
      link('/tools/', '🧰', u.all) +
      link('/#how', '💡', u.how) +
      link('/privacy/', '🔒', u.privacy) +
      '<h4>' + u.lang + '</h4>' +
      '<div class="ftLangRow" data-notr>' +
      '<button data-l="en" class="' + (!fa ? 'on' : '') + '">English</button>' +
      '<button data-l="fa" class="' + (fa ? 'on' : '') + '">فارسی</button></div>' +
      '</div></div>';
    menuEl.innerHTML = html;
    menuEl.querySelector('.ftOverlay').onclick = closeMenu;
    menuEl.querySelector('#ftClose').onclick = closeMenu;
    menuEl.querySelectorAll('a.ftLink').forEach(function (a) { a.addEventListener('click', closeMenu); });
    menuEl.querySelectorAll('.ftLangRow button').forEach(function (b) {
      b.onclick = function () { setLang(b.getAttribute('data-l')); };
    });
  }
  function openMenu() { menuEl.classList.add('open'); document.body.classList.add('ftLock'); btnEl.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { menuEl.classList.remove('open'); document.body.classList.remove('ftLock'); btnEl.setAttribute('aria-expanded', 'false'); }

  function setupHeader() {
    var header = document.querySelector('header.nav, header.top');
    var wrap = document.createElement('div');
    wrap.className = 'ftActions';
    langBtnEl = document.createElement('button');
    langBtnEl.className = 'ftBtn';
    langBtnEl.setAttribute('data-notr', '');
    langBtnEl.onclick = function () { setLang(lang === 'fa' ? 'en' : 'fa'); };
    btnEl = document.createElement('button');
    btnEl.className = 'ftBtn';
    btnEl.id = 'ftMenuBtn';
    btnEl.setAttribute('aria-haspopup', 'true');
    btnEl.setAttribute('aria-expanded', 'false');
    btnEl.setAttribute('data-notr', '');
    btnEl.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    btnEl.onclick = openMenu;
    wrap.appendChild(langBtnEl);
    wrap.appendChild(btnEl);

    if (header) {
      header.querySelectorAll('.menu').forEach(function (m) { m.remove(); });
      header.appendChild(wrap);
    } else {
      wrap.style.cssText = 'position:fixed;top:12px;right:12px;z-index:50';
      document.body.appendChild(wrap);
    }
    menuEl = document.createElement('div');
    menuEl.id = 'ftMenu';
    document.body.appendChild(menuEl);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- language switch ---------- */
  function applyLang() {
    var de = document.documentElement;
    de.lang = lang;
    de.dir = lang === 'fa' ? 'rtl' : 'ltr';
    if (lang === 'fa') loadFont();
    if (observer) observer.disconnect();
    walk(document);
    applyHead();
    buildMenu();
    if (langBtnEl) { langBtnEl.textContent = lang === 'fa' ? 'EN' : 'فارسی'; langBtnEl.setAttribute('aria-label', UI[lang].lang); }
    if (btnEl) btnEl.setAttribute('aria-label', UI[lang].menu);
    if (document.body) observe();
  }
  function setLang(l) {
    lang = l === 'fa' ? 'fa' : 'en';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    applyLang();
  }

  /* ---------- public API (used by app.js search) ---------- */
  window.FT = {
    tools: TOOLS.map(function (t) { return { en: t.en, fa: t.fa, path: t.path, emoji: t.e }; }),
    lang: function () { return lang; },
    tr: tr,
    setLang: setLang
  };

  function init() {
    injectCSS();
    setupHeader();
    applyLang();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
