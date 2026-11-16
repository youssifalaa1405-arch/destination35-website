/* Destination 35 — scroll-driven branch map (MapLibre GL + OpenFreeMap tiles) */
window.D35_Map = (function () {
  const B = window.D35_BRANCHES;
  const GOLD = '#d9b52e';
  const OVERVIEW = { lng: 50.004, lat: 26.556 };
  const HOLD_IN = 0.7;          // intro hold, in beats
  const HOLD_OUT = 0.35;        // final hold
  const TRAVEL = 0.68;          // share of a beat spent moving; the rest rests on the branch
  const SEG = B.map(b => (b.world ? 1.5 : 1));
  const TOTAL = HOLD_IN + SEG.reduce((a, b) => a + b, 0) + HOLD_OUT;

  let map, ready = false, last = 0, active = -2;
  const markers = [];
  let plane = null;   // the airplane marker that flies the long leg
  const els = {};
  let onActive = () => {};

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const isMobile = () => window.innerWidth <= 860;
  const isRTL = () => document.documentElement.dir === 'rtl';

  function style() {
    const road = (id, classes, color, w, minzoom, opacity = 1) => ({
      id, type: 'line', source: 'ofm', 'source-layer': 'transportation', minzoom,
      filter: ['all', ['==', ['geometry-type'], 'LineString'], ['in', ['get', 'class'], ['literal', classes]]],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': color, 'line-opacity': opacity, 'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 6, w[0], 12, w[1], 16, w[2]] }
    });
    return {
      version: 8,
      glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
      sources: { ofm: { type: 'vector', url: 'https://tiles.openfreemap.org/planet' } },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#1b1c1d' } },
        { id: 'residential', type: 'fill', source: 'ofm', 'source-layer': 'landuse', minzoom: 10,
          filter: ['in', ['get', 'class'], ['literal', ['residential', 'commercial', 'retail', 'industrial']]],
          paint: { 'fill-color': '#202122', 'fill-opacity': 0.9 } },
        { id: 'green', type: 'fill', source: 'ofm', 'source-layer': 'landcover', minzoom: 9,
          filter: ['in', ['get', 'class'], ['literal', ['grass', 'wood', 'farmland']]],
          paint: { 'fill-color': '#1d201c', 'fill-opacity': 0.8 } },
        { id: 'water', type: 'fill', source: 'ofm', 'source-layer': 'water', paint: { 'fill-color': '#0d0e10' } },
        { id: 'shore', type: 'line', source: 'ofm', 'source-layer': 'water',
          paint: { 'line-color': GOLD, 'line-opacity': ['interpolate', ['linear'], ['zoom'], 2, 0.18, 9, 0.4, 14, 0.5], 'line-width': ['interpolate', ['linear'], ['zoom'], 2, 0.4, 12, 1, 16, 1.6] } },
        road('minor', ['minor', 'service', 'track'], '#2b2c2e', [0, 0.4, 5], 12),
        road('mid', ['secondary', 'tertiary'], '#3b3a35', [0.2, 0.9, 9], 9),
        road('major-case', ['motorway', 'trunk', 'primary'], '#141415', [0.6, 3.2, 20], 5),
        road('major', ['motorway', 'trunk', 'primary'], '#8a7424', [0.3, 1.5, 13], 5, 0.95),
        { id: 'bld', type: 'fill', source: 'ofm', 'source-layer': 'building', minzoom: 13.5,
          paint: { 'fill-color': '#27282a', 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 13.5, 0, 14.5, 0.9] } },
        { id: 'place', type: 'symbol', source: 'ofm', 'source-layer': 'place', minzoom: 3, maxzoom: 15,
          filter: ['in', ['get', 'class'], ['literal', ['city', 'town', 'suburb', 'island', 'country']]],
          layout: {
            'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name:latin'], ''],
            'text-font': ['Noto Sans Regular'],
            'text-transform': 'uppercase', 'text-letter-spacing': 0.22,
            'text-size': ['match', ['get', 'class'], 'country', 12, 'city', 12, 'town', 11, 10],
            'text-max-width': 7
          },
          paint: { 'text-color': '#8f8b82', 'text-halo-color': '#141415', 'text-halo-width': 1.2, 'text-opacity': 0.9 } }
      ]
    };
  }

  /* curved line between two points */
  function arc(a, b, bend, n = 56) {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const c = [(a[0] + b[0]) / 2 - dy * bend, (a[1] + b[1]) / 2 + dx * bend];
    const out = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      out.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]);
    }
    return out;
  }
  const ROUTES = B.map((b, i) => (i === 0 ? null : arc([B[i - 1].lng, B[i - 1].lat], [b.lng, b.lat], b.world ? -0.12 : (i % 2 ? 0.16 : -0.16))));

  function overviewZoom() { return isMobile() ? 10.4 : 11.55; }
  function branchZoom() { return isMobile() ? 14.1 : 14.7; }

  function keyframe(i) {
    if (i < 0) return { lng: OVERVIEW.lng, lat: OVERVIEW.lat, zoom: overviewZoom(), pitch: 0, bearing: 0, pad: 0 };
    const b = B[i];
    if (b.world) return { lng: b.lng, lat: b.lat, zoom: isMobile() ? 8.6 : 9.6, pitch: 0, bearing: 0, pad: 1 };
    return { lng: b.lng, lat: b.lat, zoom: branchZoom(), pitch: 52, bearing: b.bearing, pad: 1 };
  }

  /* progress (0..1) -> { seg, t } where seg i travels from keyframe i-1 to keyframe i */
  function locate(p) {
    let u = p * TOTAL - HOLD_IN;
    if (u <= 0) return { seg: 0, t: 0, intro: clamp(1 + u / HOLD_IN) };
    for (let i = 0; i < SEG.length; i++) {
      if (u <= SEG[i]) return { seg: i, t: clamp(u / (SEG[i] * TRAVEL)), intro: 0 };
      u -= SEG[i];
    }
    return { seg: SEG.length - 1, t: 1, intro: 0 };
  }
  /* progress at which branch i is at rest */
  function progressFor(i) {
    let u = HOLD_IN;
    for (let k = 0; k < i; k++) u += SEG[k];
    u += SEG[i] * (TRAVEL + (1 - TRAVEL) * 0.5);
    return u / TOTAL;
  }

  function padding(w) {
    if (isMobile()) return { top: 70 * w, bottom: Math.min(window.innerHeight * 0.46, 400) * w, left: 0, right: 0 };
    const card = Math.min(420, window.innerWidth * 0.38) + 40;
    return isRTL() ? { top: 0, bottom: 0, left: 0, right: card * w } : { top: 0, bottom: 0, left: card * w, right: 0 };
  }

  function render(p) {
    last = p;
    if (!ready) return;
    const { seg, t, intro } = locate(p);
    const a = keyframe(seg - 1), b = keyframe(seg);
    const e = ease(t);
    let lng, lat, zoom, routeT = e, air = null;
    if (B[seg].world) {
      // lift off, cross the world along the route, land: the camera follows the airplane
      const up = ease(clamp(t / 0.34)), across = ease(clamp((t - 0.16) / 0.66)), down = ease(clamp((t - 0.66) / 0.34));
      const pts = ROUTES[seg], f = across * (pts.length - 1), i0 = Math.min(pts.length - 2, Math.floor(f)), k = f - i0;
      lng = lerp(pts[i0][0], pts[i0 + 1][0], k); lat = lerp(pts[i0][1], pts[i0 + 1][1], k);
      zoom = lerp(lerp(a.zoom, 1.9, up), b.zoom, down);
      routeT = across;
      air = { at: [lng, lat], from: pts[i0], to: pts[i0 + 1], across };
    } else {
      lng = lerp(a.lng, b.lng, e); lat = lerp(a.lat, b.lat, e);
      const dip = seg === 0 ? 0 : 1.7;
      zoom = lerp(a.zoom, b.zoom, e) - Math.sin(Math.PI * e) * dip;
    }
    map.jumpTo({
      center: [lng, lat], zoom,
      pitch: lerp(a.pitch, b.pitch, e), bearing: lerp(a.bearing, b.bearing, e),
      padding: padding(lerp(a.pad, b.pad, e))
    });

    // route: finished legs + the leg being drawn
    const feats = [];
    for (let i = 1; i <= seg; i++) {
      const pts = ROUTES[i];
      const n = i < seg ? pts.length : Math.max(2, Math.round(pts.length * routeT));
      const line = pts.slice(0, n);
      if (i === seg && air) { line.length = Math.max(1, Math.floor(air.across * (pts.length - 1)) + 1); line.push(air.at); }
      feats.push({ type: 'Feature', properties: { cur: i === seg ? 1 : 0 }, geometry: { type: 'LineString', coordinates: line } });
    }
    map.getSource('route').setData({ type: 'FeatureCollection', features: feats });

    // the airplane: sits at the head of the route, pointing along it, only while in the air
    if (plane) {
      if (air && air.across > 0.001 && air.across < 0.999) {
        const p1 = map.project(air.from), p2 = map.project(air.to);
        const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        const vis = Math.min(clamp(air.across / 0.06), clamp((1 - air.across) / 0.07));
        plane.marker.setLngLat(air.at).setRotation(ang + 90);
        plane.body.style.opacity = vis.toFixed(3); plane.body.style.visibility = 'visible';
        plane.el.style.setProperty('--ps', (0.85 + 0.45 * Math.sin(Math.PI * air.across)).toFixed(3));
      } else {
        plane.body.style.opacity = '0'; plane.body.style.visibility = 'hidden';
      }
    }

    // which card is on
    let idx = -1;
    if (intro <= 0) idx = t > 0.55 ? seg : (t < 0.2 ? seg - 1 : -3);
    if (seg === 0 && t <= 0.55) idx = -1;
    if (idx !== active) {
      active = idx;
      markers.forEach((m, i) => {
        m.el.classList.toggle('is-on', i === idx);
        m.el.classList.toggle('show-label', idx === -1 && !B[i].world);
      });
      onActive(idx);
    }
    if (els.intro) {
      const o = seg === 0 ? clamp(1 - t * 2.4) : 0;
      els.intro.style.opacity = o;
      els.intro.style.transform = `translateY(${(1 - o) * -30}px) scale(${1 + (1 - o) * 0.04})`;
    }
  }

  function buildMarkers() {
    markers.forEach(m => m.marker.remove());
    markers.length = 0;
    const lang = window.D35_LANG || 'en';
    B.forEach((b, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'mk';
      el.setAttribute('aria-label', b[lang].name);
      el.innerHTML = `<span class="mk__pulse"></span><span class="mk__pin"><svg viewBox="239.78 175.77 137.88 145.38" aria-hidden="true"><use href="#pin"/></svg></span><span class="mk__label">${b[lang].name}</span>`;
      el.addEventListener('click', () => els.go && els.go(i));
      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat([b.lng, b.lat]).addTo(map);
      markers.push({ el, marker });
    });
    active = -2;
    if (!plane) {
      const el = document.createElement('div');
      el.className = 'plane';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<span class="plane__body"><svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg></span>';
      const body = el.firstChild;
      body.style.opacity = '0'; body.style.visibility = 'hidden';
      plane = { el, body, marker: new maplibregl.Marker({ element: el, anchor: 'center', rotationAlignment: 'viewport' }).setLngLat([B[0].lng, B[0].lat]).addTo(map) };
    }
  }

  function init(opts) {
    els.intro = opts.intro; els.go = opts.go; onActive = opts.onActive || onActive;
    map = new maplibregl.Map({
      container: opts.container, style: style(),
      center: [OVERVIEW.lng, OVERVIEW.lat], zoom: overviewZoom(),
      interactive: false, attributionControl: false, fadeDuration: 0,
      maxPitch: 60, renderWorldCopies: true
    });
    buildMarkers();
    map.on('load', () => {
      map.addSource('route', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      map.addLayer({ id: 'route-glow', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': GOLD, 'line-width': 9, 'line-blur': 8, 'line-opacity': 0.35 } });
      map.addLayer({ id: 'route', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': GOLD, 'line-width': 2.2, 'line-dasharray': [0.2, 2.2], 'line-opacity': ['case', ['==', ['get', 'cur'], 1], 1, 0.45] } });
      ready = true;
      render(last);
    });
    window.addEventListener('resize', () => { if (ready) { map.resize(); render(last); } });
    return map;
  }

  return { init, render, progressFor, buildMarkers, rerender: () => render(last), get map() { return map; } };
})();
