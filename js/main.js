/* Destination 35 — motion and interactions */
(function () {
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rtl = () => document.documentElement.dir === 'rtl';
  const lang = () => window.D35_LANG || 'en';

  /* ---------- smooth scroll */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToY = (y, immediate) => (lenis ? lenis.scrollTo(y, { immediate, duration: 1.6 }) : window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }));
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    scrollToY(t.getBoundingClientRect().top + window.scrollY + (t.id === 'locations' || t.id === 'menu' ? 2 : 0));
    history.replaceState(null, '', a.getAttribute('href'));
  }));

  /* ---------- nav */
  const nav = $('#nav');
  ScrollTrigger.create({ trigger: '#story', start: 'top 72px', onEnter: () => nav.classList.add('is-solid'), onLeaveBack: () => nav.classList.remove('is-solid') });
  $$('.nav__links a').forEach(a => {
    const sec = $(a.getAttribute('href'));
    ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: s => a.classList.toggle('is-on', s.isActive) });
  });

  /* ---------- loading screen: the logo fills with gold while fonts and the hero photograph load */
  const loader = $('#loader');
  function whenReady(cb) {
    if (!loader) { cb(); return; }
    document.documentElement.classList.add('is-loading');
    if (lenis) lenis.stop();
    const pct = $('#loaderPct'), cupImg = $('#coin img');
    const jobs = [
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),
      new Promise(r => { if (cupImg.complete) r(); else { cupImg.addEventListener('load', r); cupImg.addEventListener('error', r); } })
    ];
    if (document.readyState !== 'complete') jobs.push(new Promise(r => window.addEventListener('load', r, { once: true })));
    let done = 0;
    jobs.forEach(j => Promise.resolve(j).then(() => done++, () => done++));
    const t0 = performance.now(), MIN = reduce ? 300 : 1900, MAX = 6000;
    let shown = 0, finished = false;
    const level = $('#ldLevel');
    const setLevel = v => {
      loader.style.setProperty('--pn', (v / 100).toFixed(3));
      if (level) level.setAttribute('transform', 'translate(0 ' + (212 - v / 100 * 126).toFixed(1) + ')');
      loader.classList.toggle('is-pouring', v > 0.5 && v < 97);
    };
    function finish() {
      if (finished) return; finished = true;
      gsap.ticker.remove(tick);
      pct.textContent = '100'; setLevel(100);
      loader.classList.add('is-ready');
      const open = () => { document.documentElement.classList.remove('is-loading'); if (lenis) lenis.start(); };
      const out = () => loader.remove();
      if (reduce) {
        gsap.set('.loader__msg-a', { opacity: 0 }); gsap.set('.loader__msg-b', { opacity: 1 });
        gsap.to(loader, { opacity: 0, duration: 0.25, delay: 0.7, onComplete: out }); open(); cb(); return;
      }
      gsap.timeline()
        .to('.loader__msg-a', { y: -12, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
        .fromTo('.loader__msg-b', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.25)
        .fromTo('.loader__cup', { scale: 1 }, { scale: 1.05, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1, transformOrigin: '50% 90%' }, 0.1)
        .to('.loader__body', { y: -24, opacity: 0, duration: 0.4, ease: 'power2.in' }, 1.35)
        .add(open, 1.55)
        .to('.loader__cols i', { scaleY: 0, duration: 0.85, ease: 'power4.inOut', stagger: 0.07, onComplete: out }, 1.6)
        .add(cb, 1.95);
    }
    function tick() {
      const el = performance.now() - t0;
      const real = el > MAX ? 1 : done / jobs.length;
      const target = Math.min(real, el / MIN) * 100;
      shown += (target - shown) * 0.1; if (target - shown < 0.5) shown = target;
      pct.textContent = String(Math.round(shown)).padStart(2, '0');
      setLevel(shown);
      if (shown >= 100) finish();
    }
    gsap.ticker.add(tick);
    setTimeout(finish, MAX + 1500);   // never leave the page behind the loader
  }

  /* ---------- hero: the cup */
  const coin = $('#coin'), drop = $('#cupDrop'), shadow = $('#coinShadow'), glow = $('#heroGlow'), title = $('#heroTitle'), navMark = $('#navMark'), beansEl = $('#beans');
  // the hero object is the brand's own cup (a cut-out photograph, 713 x 981)
  const CUP_RATIO = 713 / 981;
  let coinD = 200, cupH = 275, landed = false;   // coinD is the cup's width: the room the headline makes for it
  const gapOpen = () => coinD * 1.08 + 'px';
  function sizeCoin() {
    cupH = Math.round(Math.min(title.offsetHeight * 1.22, window.innerHeight * 0.52, (window.innerWidth * 0.3) / CUP_RATIO));
    coinD = Math.round(cupH * CUP_RATIO);
    coin.style.setProperty('--d', coinD + 'px');
    shadow.style.setProperty('--d', coinD + 'px');
    glow.style.setProperty('--d', coinD + 'px');
  }
  sizeCoin();

  // coffee beans drifting at the edges of the screen, at three depths: [left %, top %, size px, turn deg, depth]
  const BEANS = [[6, 22, 54, -20, 2], [7, 82, 96, 35, 3], [26, 90, 40, 10, 1], [90, 18, 60, 25, 2], [93, 84, 112, -30, 3],
    [72, 90, 38, 60, 1], [95, 48, 44, -10, 1], [3, 46, 36, 80, 1], [62, 9, 34, -50, 1], [36, 11, 30, 20, 1]];
  const BEAN = '<svg viewBox="0 0 60 80"><ellipse cx="30" cy="40" rx="25" ry="37" fill="#6b4226"/><ellipse cx="20" cy="27" rx="7" ry="14" fill="#96643c" opacity=".55"/><path d="M31 5c-13 17 12 27 0 35s11 22-1 35" stroke="#2e1a0d" stroke-width="5" fill="none" stroke-linecap="round"/></svg>';
  beansEl.innerHTML = BEANS.map((b, i) => `<span class="bean bean--d${b[4]}" style="left:${b[0]}%;top:${b[1]}%;--sz:${b[2]}px;--r:${b[3]}deg;--dur:${7 + (i % 4) * 1.7}s;--dly:${-i * 1.3}s"><i>${BEAN}</i></span>`).join('');

  // the headline is split into letters (words in Arabic and in the script line, so joined letters stay joined)
  function splitHero() {
    const ar = lang() === 'ar';
    const parts = $$('.hl__a, .hl__b', title);
    title.setAttribute('aria-label', parts.map(p => p.textContent.trim()).join(' '));
    parts.forEach(p => {
      const text = p.textContent.trim();
      const byWord = ar || p.parentElement.classList.contains('hl--script');
      const units = byWord ? text.split(/\s+/) : [...text];
      p.setAttribute('aria-hidden', 'true');
      p.innerHTML = units.map(u => (u === ' ' ? ' ' : `<span class="ch">${u}</span>`)).join(byWord ? ' ' : '');
    });
    return $$('.ch', title);
  }
  function enterHero() {
    const chars = splitHero();
    if (reduce) return;
    gsap.from(chars, { yPercent: 55, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.028 });
  }

  // the opening: plays once, after the loading screen. The cup tumbles in and lands between the words by itself.
  function introHero() {
    enterHero();
    const settle = () => { landed = true; drop.classList.add('is-landed'); };
    if (reduce || window.scrollY > 40) {
      gsap.set(drop, { opacity: 1 }); gsap.set(title, { '--gap': gapOpen() });
      gsap.set(shadow, { opacity: 0.6, scaleX: 1, scaleY: 0.22 }); gsap.set(glow, { opacity: 1 });
      settle(); return;
    }
    const vh = window.innerHeight;
    gsap.from('.hero__meta', { opacity: 0, y: 12, duration: 0.9, delay: 0.5 });
    gsap.set(drop, { y: -vh * 0.9, rotation: -420, opacity: 1, transformOrigin: '50% 50%' });
    gsap.set(shadow, { opacity: 0, scaleX: 2.2, scaleY: 0.5 });
    gsap.timeline({ delay: 0.3, onComplete: settle })
      .to(drop, { y: 0, duration: 1.15, ease: 'power2.in' }, 0)
      .to(drop, { rotation: 0, duration: 1.15, ease: 'power1.out' }, 0)
      .to(shadow, { opacity: 0.6, scaleX: 1, scaleY: 0.22, duration: 1.15, ease: 'power2.in' }, 0)
      .to(title, { '--gap': gapOpen(), duration: 0.9, ease: 'power3.out' }, 0.45)
      .set(drop, { transformOrigin: '50% 100%' }, 1.15)
      .to(drop, { scaleY: 0.92, scaleX: 1.06, duration: 0.12, ease: 'power2.out' }, 1.15)
      .to(drop, { scaleY: 1, scaleX: 1, duration: 0.7, ease: 'elastic.out(1, 0.45)' }, 1.27)
      .to(glow, { opacity: 1, duration: 1.1, ease: 'power2.out' }, 1.1)
      .fromTo('.bean', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.8)', stagger: { each: 0.05, from: 'random' } }, 0.9)
      .fromTo('.hero__cta > *, .hero__hint', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 1.3);
  }

  /* ---------- hero background: a quiet field of gold dots with a slow wave and a soft glow near the pointer */
  (function heroBackground() {
    const cv = $('#heroBg'); if (!cv) return;
    const ctx = cv.getContext('2d');
    const GAP = 34;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const t0 = performance.now();
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      ptr.x += (ptr.tx - ptr.x) * 0.08; ptr.y += (ptr.ty - ptr.y) * 0.08;
      const ox = (w % GAP) / 2, oy = (h % GAP) / 2;
      for (let y = oy; y < h; y += GAP) {
        for (let x = ox; x < w; x += GAP) {
          const wave = 0.5 + 0.5 * Math.sin(x * 0.006 + y * 0.011 + t * 0.55);
          const swell = 0.5 + 0.5 * Math.sin(x * 0.013 - y * 0.004 - t * 0.32);
          const dx = x - ptr.x, dy = y - ptr.y;
          const near = Math.exp(-(dx * dx + dy * dy) / 26000);
          const a = 0.09 + 0.28 * wave * swell + 0.6 * near;
          const r = 1 + 0.5 * wave * swell + 1.6 * near;
          ctx.fillStyle = `rgba(217,181,46,${a.toFixed(3)})`;
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
        }
      }
    }
    function size() {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    }
    function loop(now) { draw((now - t0) / 1000); raf = requestAnimationFrame(loop); }
    function run() { cancelAnimationFrame(raf); if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(loop); }
    size();
    new IntersectionObserver(es => { visible = es[0].isIntersecting; run(); }).observe(cv);
    document.addEventListener('visibilitychange', run);
    window.addEventListener('resize', size);
    window.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top; }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { ptr.tx = ptr.ty = -9999; });
    run();
  })();

  // the scroll part: the cup rocks, the beans drift up at their own speeds, then the cup spins into the logo in the bar
  let heroTl;
  function buildHero() {
    if (heroTl) { heroTl.scrollTrigger && heroTl.scrollTrigger.kill(); heroTl.kill(); }
    sizeCoin();
    gsap.set(shadow, { y: cupH * 0.47 });
    if (landed) gsap.set(title, { '--gap': gapOpen() });
    if (reduce) { nav.classList.add('has-mark'); return; }
    const vh = window.innerHeight;
    const target = () => {
      const r = navMark.getBoundingClientRect();
      return { x: r.left + r.width / 2 - window.innerWidth / 2, y: r.top + r.height / 2 - vh / 2, s: (r.height * 1.2) / cupH };
    };
    gsap.set(coin, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, transformOrigin: '50% 50%' });
    gsap.set('.bean', { y: 0 });
    heroTl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#top', start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true,
        onUpdate: st => nav.classList.toggle('has-mark', st.progress > 0.985),
        onLeave: () => nav.classList.add('has-mark')
      }
    });
    heroTl
      .to('.hero__hint', { opacity: 0, duration: 0.8 }, 0.2)
      .to('.bean', { y: i => -BEANS[i][4] * vh * 0.2, rotation: i => (i % 2 ? 1 : -1) * (30 + BEANS[i][4] * 14), duration: 10 }, 0)
      // it rocks, like a cup set down on a counter
      .to(coin, { rotation: -8, scale: 1.05, duration: 1.2, ease: 'sine.inOut' }, 0)
      .to(coin, { rotation: 6, duration: 1.4, ease: 'sine.inOut' }, 1.2)
      .to(coin, { rotation: 0, scale: 1, duration: 1, ease: 'sine.inOut' }, 2.6)
      .to(glow, { scale: 1.3, duration: 3.6 }, 0)
      // home: one spin into the logo in the bar
      .to(coin, { x: () => target().x, y: () => target().y, scale: () => target().s, rotation: 360, duration: 4.4, ease: 'power2.inOut' }, 4.6)
      .to([shadow, glow], { opacity: 0, duration: 1 }, 4.6)
      .fromTo(title, { '--gap': gapOpen }, { '--gap': '0px', duration: 2.6, ease: 'power2.inOut', immediateRender: false }, 4.9)
      .to('.hero__cta', { opacity: 0, y: 20, duration: 1.2 }, 5.2)
      .to('.hero__meta', { opacity: 0.35, duration: 2 }, 6)
      .to(coin, { opacity: 0, duration: 0.25 }, 9.75);
  }
  buildHero();
  whenReady(introHero);

  /* ---------- story: statement lights up word by word */
  const statement = $('#statement');
  let stTrig;
  function buildStatement() {
    if (stTrig) stTrig.kill();
    const words = statement.textContent.trim().split(/\s+/);
    const hot = lang() === 'ar' ? ['استثنائية', 'الشغف'] : ['exceptional', 'passion'];
    statement.innerHTML = words.map(w => `<span class="w${hot.some(h => w.includes(h)) ? ' gold' : ''}">${w}</span>`).join(' ');
    const spans = $$('.w', statement);
    if (reduce) { spans.forEach(s => s.classList.add('on')); return; }
    stTrig = ScrollTrigger.create({
      trigger: statement, start: 'top 82%', end: 'bottom 48%', scrub: true,
      onUpdate: s => { const n = Math.round(s.progress * spans.length); spans.forEach((el, i) => el.classList.toggle('on', i < n)); }
    });
  }
  buildStatement();

  /* reveals */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.25 });
  $$('[data-reveal]').forEach(el => io.observe(el));
  if (!reduce) $$('[data-par]').forEach(el => gsap.to(el, { yPercent: +el.dataset.par, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }));

  /* counters */
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, plain = el.hasAttribute('data-plain');
    if (reduce) return;
    const o = { v: plain ? end - 40 : 0 };
    el.textContent = Math.round(o.v);
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
  });

  /* ---------- menu: sideways rail */
  const rail = $('#menuRail'), bar = $('#menuBar');
  let railTween;
  function buildMenu() {
    if (!rail) return;
    if (railTween) { railTween.scrollTrigger && railTween.scrollTrigger.kill(); railTween.kill(); }
    gsap.set(rail, { x: 0 });
    const dist = () => (rail.scrollWidth - window.innerWidth) * (rtl() ? 1 : -1);
    railTween = gsap.to(rail, {
      x: dist, ease: 'none',
      scrollTrigger: {
        trigger: '#menu', start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 0.5, invalidateOnRefresh: true,
        onUpdate: s => {
          bar.style.transform = `scaleX(${s.progress})`;
          if (reduce) return;
          const pos = s.progress * 2; // 0..2 across three panels
          $$('.dish', rail).forEach((d, i) => {
            const off = (i - pos) * (rtl() ? -1 : 1);
            const b = $('.cut--b', d), c = $('.cut--c', d), a = $('.cut--a', d);
            a.style.transform = `rotate(${off * -5}deg)`;
            b.style.transform = `translateX(${off * 90}px) rotate(${off * 8}deg)`;
            c.style.transform = `translateX(${off * 170}px) rotate(${off * -10}deg)`;
          });
        }
      }
    });
  }
  buildMenu();

  /* ---------- signature products: the scroll turns the wheel */
  if (window.D35_Sig && D35_Sig.section && !reduce) {
    ScrollTrigger.create({ trigger: D35_Sig.section, start: 'top top', end: 'bottom bottom', scrub: 0.6, onUpdate: st => D35_Sig.turn(st.progress) });
  }

  /* ---------- map */
  const B = window.D35_BRANCHES;
  const cardsEl = $('#locCards'), dotsEl = $('#locDots'), coordsEl = $('#locCoords'), locSec = $('#locations');
  let cards = [], dots = [], current = -1;
  const fmt = (v, pos, neg) => `${Math.abs(v).toFixed(4)}° ${v >= 0 ? pos : neg}`;
  function buildCards() {
    const L = lang(), ui = window.D35_UI[L];
    cardsEl.innerHTML = B.map((b, i) => `
      <article class="card" data-i="${i}" aria-hidden="true">
        <div class="card__top"><b>${String(i + 1).padStart(2, '0')} / ${String(B.length).padStart(2, '0')}</b><span class="card__chip">${b[L].type}</span></div>
        <div class="card__name"><h3>${b[L].name}</h3><p>${b[L].text}</p></div>
        <div class="card__ph"><img src="${b.img}" alt="${b[L].alt}" loading="lazy"></div>
        <div class="card__foot">
          <div class="card__year"><small>${ui.since}</small><b>${b.year}</b></div>
          <a class="card__go" href="https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}" target="_blank" rel="noopener" tabindex="-1">${ui.go} ↗</a>
        </div>
      </article>`).join('');
    dotsEl.innerHTML = B.map((b, i) => `<li><button type="button" data-i="${i}"><span>${b[L].name}</span></button></li>`).join('');
    cards = $$('.card', cardsEl); dots = $$('button', dotsEl);
    dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));
    setActive(current, true);
  }
  function setActive(i) {
    current = i;
    cards.forEach((c, k) => {
      c.classList.toggle('is-on', k === i);
      c.classList.toggle('is-past', k < i);
      c.setAttribute('aria-hidden', k === i ? 'false' : 'true');
      const a = $('a', c); if (a) a.tabIndex = k === i ? 0 : -1;
    });
    dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
    coordsEl.textContent = i >= 0 ? `${fmt(B[i].lat, 'N', 'S')}  ${fmt(B[i].lng, 'E', 'W')}` : '';
  }
  function goTo(i) {
    const top = locSec.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + D35_Map.progressFor(i) * (locSec.offsetHeight - window.innerHeight));
  }
  buildCards();

  let mapStarted = false;
  function startMap() {
    if (mapStarted) return; mapStarted = true;
    D35_Map.init({ container: 'map', intro: $('#locIntro'), go: goTo, onActive: setActive });
  }
  // load the map shortly before it is needed
  ScrollTrigger.create({ trigger: locSec, start: 'top 250%', once: true, onEnter: startMap });
  ScrollTrigger.create({
    trigger: locSec, start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 0.7,
    onUpdate: s => { startMap(); D35_Map.render(s.progress); }
  });

  /* ---------- ways to visit: each branch name flies the map to that branch */
  $$('[data-go]').forEach(btn => btn.addEventListener('click', () => goTo(+btn.dataset.go)));
  if (!reduce) {
    gsap.from('.model', { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '.models', start: 'top 82%', once: true } });
    gsap.from('.drink__art img', { yPercent: 14, rotation: -10, ease: 'none', scrollTrigger: { trigger: '.drink', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- language change: rebuild what depends on text or direction */
  window.addEventListener('d35:lang', () => {
    enterHero();
    buildStatement();
    buildCards();
    if (mapStarted) { D35_Map.buildMarkers(); D35_Map.rerender(); }
    requestAnimationFrame(() => { buildHero(); buildMenu(); ScrollTrigger.refresh(); });
  });

  let rz;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { buildHero(); ScrollTrigger.refresh(); }, 200); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { buildHero(); ScrollTrigger.refresh(); });
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
