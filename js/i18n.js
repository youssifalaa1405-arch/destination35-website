/* Destination 35 — language switch (English is in the markup; Arabic lives here) */
(function () {
  const AR = {
    'skip': 'تخطَّ إلى المحتوى',
    'nav.story': 'قصتنا', 'nav.menu': 'المنتجات', 'nav.locations': 'الفروع', 'nav.visit': 'زورونا', 'nav.cta': 'اعثر على فرع',
    'hero.m1': 'المملكة العربية السعودية', 'hero.m2': 'القطيف', 'hero.m3': 'قهوة مختصة',
    'hero.l1a': 'قهوة', 'hero.l1b': 'تحبها',
    'hero.l2a': 'وجودة', 'hero.l2b': 'تفخر بها',
    'hero.l3a': 'منذ', 'hero.l3b': '٢٠١٩',
    'hero.hint': 'مرّر للأسفل', 'hero.cta1': 'شاهد المنيو', 'hero.cta2': 'اعثر على فرع',
    'story.eyebrow': 'من نحن؟',
    'story.statement': 'منذ انطلاقة ديستنيشن 35 ونحن نرسم ملامح تجربة قهوة استثنائية تنبع من الشغف بالتفاصيل والجودة.',
    'story.p1': 'بدأت رحلتنا من المنطقة الشرقية في المملكة العربية السعودية، حيث أسسنا حضورنا من خلال خمسة فروع، تشمل فرعين محليين، وفرعين درايف ثرو، وفرع خدمة داخلية، لنكون قريبين من عملائنا بأسلوب عصري يلبي مختلف احتياجاتهم.',
    'story.p2': 'وفي عام 2026 خطونا خطوة نوعية استراتيجية بافتتاح أول فرع دولي لنا في مدينة شيكاغو، لننقل تجربة القهوة السعودية الأصيلة بمفهوم عالمي.',
    'stat.1': 'التأسيس في القطيف', 'stat.2': 'فروع في المنطقة الشرقية', 'stat.3': 'دولتان: السعودية وأمريكا',
    'menu.eyebrow': 'منتجاتنا المميزة',
    'menu.title': 'رواد في ابتكار المنتجات مع التركيز على الذوق والجودة.',
    'menu.c1': 'قهوة ومشروبات', 'menu.c1p': 'قهوة مختصة بمعايير عالية ونكهات متوازنة ومشروبات منعشة.',
    'menu.c2': 'فطور وسندويشات', 'menu.c2p': 'أطباق فطور محضّرة بإتقان لتبدأ يومك بأسلوب مميز.',
    'menu.c3': 'حلويات ومخبوزات', 'menu.c3p': 'حلويات مميزة تُقدَّم بتفاصيل فاخرة وطعم لا يُنسى.',
    'loc.eyebrow': 'تواجدنا محلياً', 'loc.t1': 'خمس وجهات في', 'loc.t2': 'القطيف',
    'sig.eyebrow': 'منتجاتنا المميزة',
    'fm.eyebrow': 'المنيو كاملاً', 'fm.title': 'كل ما نقدّمه.',
    'fm.lede': 'اختر الفرع ثم القسم. الأسعار بالريال السعودي وتختلف من فرع لآخر.',
    'fm.order': 'اطلب واستلم',
    'new.eyebrow': 'مشروب جديد', 'new.title': 'دولسي دي ليتشي بالفستق',
    'new.p': 'دولسي دي ليتشي الغني ممزوج بالفستق: كريمي، بحلاوة الكراميل، وناعم حتى آخر رشفة.',
    'new.cta': 'اعثر على أقرب فرع',
    'vis.eyebrow': 'طرق الزيارة', 'vis.title': 'قهوتك، على طريقتك.',
    'vis.lede': 'اجلس في أحد مقاهينا، أو اطلب من سيارتك عبر الدرايف ثرو، أو خذ كوبك وأنت في المستشفى.',
    'vis.m1': 'الجلسات', 'vis.m1p': 'مقهيان في القطيف للجلوس واللقاء وأخذ وقتك.',
    'vis.m2': 'درايف ثرو', 'vis.m2p': 'اطلب من سيارتك وأكمل طريقك.',
    'vis.m3': 'خذها وامشِ', 'vis.m3p': 'منصة خدمة داخل المستشفى، للموظفين والزوار.',
    'vis.b0': 'شارع القدس', 'vis.b1': 'السي فرونت', 'vis.b2': 'الشاطئ', 'vis.b3': 'الهدلة', 'vis.b4': 'مستشفى القطيف المركزي',
    'foot.t1': 'ارتشف', 'foot.t2': 'شيئاً', 'foot.t3': 'مذهلاً.',
    'foot.cta1': 'اعثر على أقرب فرع', 'foot.cta2': 'راسلنا على واتساب',
    'foot.h1': 'تواصل', 'foot.h2': 'السعودية', 'foot.h3': 'الولايات المتحدة', 'foot.h4': 'تابعنا',
    'foot.ksa': 'خمسة فروع في القطيف، المنطقة الشرقية', 'foot.see': 'شاهد الخريطة',
    'foot.usa': 'شارع 103 غرب، بالوس هيلز، إلينوي', 'foot.rights': 'جميع الحقوق محفوظة.', 'foot.dev': 'تطوير',
    'load.a': 'قهوة مختصة', 'load.b': 'نحضّر قهوتك', 'load.d1': 'وجهتك', 'load.d2': 'هنا.', 'load.c': 'القطيف، السعودية'
  };

  /* Branch data: positions from Google Maps listings (hospital: the hospital itself) */
  window.D35_BRANCHES = [
    { id: 'quds', lng: 50.0143138, lat: 26.5543101, year: 2019, img: 'assets/img/int-5.webp', bearing: -18,
      en: { name: 'Al Quds Street', type: 'Café', text: 'Our first branch, in the heart of Qatif on one of its most important commercial streets.', alt: 'Seating inside a Destination 35 café' },
      ar: { name: 'شارع القدس', type: 'فرع محلي', text: 'فرعنا الأول، يقع في قلب القطيف وفي أحد أهم شوارع القطيف التجارية.', alt: 'جلسات داخل مقهى ديستنيشن 35' } },
    { id: 'seafront', lng: 50.0205223, lat: 26.5852759, year: 2024, img: 'assets/img/int-4.webp', bearing: 24,
      en: { name: 'Sea Front', type: 'Café', text: 'In Qatif’s main leisure district, looking straight onto the corniche.', alt: 'Bright interior of a Destination 35 café' },
      ar: { name: 'السي فرونت', type: 'فرع محلي', text: 'يقع في أهم منطقة سياحية ومطل مباشرة على الكورنيش.', alt: 'الجلسات الداخلية المضيئة في ديستنيشن 35' } },
    { id: 'shati', lng: 50.0424007, lat: 26.5572692, year: 2025, img: 'assets/img/type-drive.webp', bearing: -30,
      en: { name: 'Al Shati', type: 'Drive-thru', text: 'On one of the main roads linking Tarout Island and Qatif.', alt: 'Destination 35 drive-thru kiosk at sunset' },
      ar: { name: 'الشاطئ', type: 'درايف ثرو', text: 'يقع في أحد الشوارع الرئيسية التي تربط جزيرة تاروت والقطيف.', alt: 'كشك درايف ثرو ديستنيشن 35 عند الغروب' } },
    { id: 'hadla', lng: 49.9812655, lat: 26.5638987, year: 2025, img: 'assets/img/story-hands.webp', bearing: 16,
      en: { name: 'Al Hadla', type: 'Drive-thru', text: 'On one of the most important arteries leading out of Qatif.', alt: 'Two guests holding Destination 35 iced drinks' },
      ar: { name: 'الهدلة', type: 'درايف ثرو', text: 'يقع في أحد شرايين مخارج القطيف الأكثر أهمية.', alt: 'ضيفان يحملان مشروبات ديستنيشن 35 المثلجة' } },
    { id: 'hospital', lng: 49.9681995, lat: 26.5240987, year: 2026, img: 'assets/img/type-inhouse.webp', bearing: -12,
      en: { name: 'Qatif Central Hospital', type: 'In-house', text: 'Inside the main public hospital of the Qatif region.', alt: 'Destination 35 in-house service counter' },
      ar: { name: 'مستشفى القطيف المركزي', type: 'خدمة داخلية', text: 'يقع داخل أهم مستشفى عام في منطقة القطيف.', alt: 'منصة الخدمة الداخلية في ديستنيشن 35' } },
    { id: 'chicago', lng: -87.8009, lat: 41.7066, year: 2026, img: 'assets/img/int-2.webp', bearing: 0, world: true,
      en: { name: 'Chicago, USA', type: 'Café', text: 'Our first international branch, taking the Saudi coffee experience to the world.', alt: 'Destination 35 café interior with a city skyline mural' },
      ar: { name: 'شيكاغو، أمريكا', type: 'فرع دولي', text: 'أول فروعنا دولياً، لننقل تجربة ديستنيشن إلى آفاق أوسع.', alt: 'داخل مقهى ديستنيشن 35 مع جدارية لأفق المدينة' } }
  ];
  window.D35_UI = {
    en: { since: 'Since', go: 'Directions', of: 'of' },
    ar: { since: 'منذ', go: 'الاتجاهات', of: 'من' }
  };

  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = {};
  nodes.forEach(n => { EN[n.dataset.i18n] = n.innerHTML; });

  function setLang(lang, silent) {
    const ar = lang === 'ar';
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    nodes.forEach(n => { const k = n.dataset.i18n; n.innerHTML = ar ? (AR[k] ?? EN[k]) : EN[k]; });
    document.querySelectorAll('[data-lang-label]').forEach(n => { n.textContent = ar ? 'EN' : 'العربية'; });
    document.title = ar ? 'ديستنيشن 35 — قهوة مختصة' : 'Destination 35 — Specialty Coffee';
    try { localStorage.setItem('d35-lang', lang); } catch (e) {}
    window.D35_LANG = lang;
    if (!silent) window.dispatchEvent(new CustomEvent('d35:lang', { detail: lang }));
  }

  let start = 'en';
  try { start = localStorage.getItem('d35-lang') || ((navigator.language || '').startsWith('ar') ? 'ar' : 'en'); } catch (e) {}
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'ar' || q === 'en') start = q;
  setLang(start, true);
  window.D35_setLang = setLang;
  document.getElementById('langBtn').addEventListener('click', () => setLang(window.D35_LANG === 'ar' ? 'en' : 'ar'));
})();
