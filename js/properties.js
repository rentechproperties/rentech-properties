// ═══════════════════════════════════════════════════════
// RENTECH PROPERTIES — properties.js  v2.0
// All property data, card builder, filter & sort engine
// ═══════════════════════════════════════════════════════

const PROPERTIES = [
  { id:1, title:'Modern 2BR Apartment', area:'Kilimani', price:65000, beds:2, baths:1, size:85, type:'2BR', furnished:true, badge:'Featured', status:'Available Now', emoji:'🏢', amenities:['Security','Parking','Generator','CCTV'], desc:'Spacious 2-bedroom in heart of Kilimani. Walking distance to Yaya Centre. All-day water, backup generator, 24hr security.', matatu:'Near Yaya Centre stage' },
  { id:2, title:'Executive Studio', area:'Westlands', price:35000, beds:1, baths:1, size:45, type:'Studio', furnished:true, badge:'New', status:'Available Now', emoji:'🏙️', amenities:['Borehole','Security','Lift','CCTV'], desc:'Well-maintained studio with stunning city views. Near Sarit Centre, major banks and restaurants. Lift access.', matatu:'Near Westlands stage' },
  { id:3, title:'Affordable Bedsitter', area:'Kasarani', price:12000, beds:1, baths:1, size:25, type:'Bedsitter', furnished:false, badge:'', status:'Available Now', emoji:'🏠', amenities:['Parking','Borehole'], desc:'Clean bedsitter near Kasarani Stadium. Reliable borehole water. Ideal for students and young professionals.', matatu:'Near Kasarani stage' },
  { id:4, title:'3BR Family Maisonette', area:"Lang'ata", price:85000, beds:3, baths:2, size:140, type:'Maisonette', furnished:false, badge:'Featured', status:'Available Now', emoji:'🏡', amenities:['DSQ','Security','Parking','Generator'], desc:"Spacious 3-bedroom maisonette with DSQ. Quiet estate, great schools nearby. Perfect for families.", matatu:"Near Lang'ata road" },
  { id:5, title:'1BR South B Apartment', area:'South B', price:28000, beds:1, baths:1, size:55, type:'1BR', furnished:false, badge:'New', status:'Available Now', emoji:'🏢', amenities:['Lift','Security','Parking'], desc:'Newly renovated 1-bedroom. Easy CBD access via Mombasa Road. Modern fittings, lift access, 24hr security.', matatu:'Mombasa Road stage' },
  { id:6, title:'Luxury Furnished Studio', area:'Lavington', price:55000, beds:1, baths:1, size:50, type:'Studio', furnished:true, badge:'', status:'Available Now', emoji:'✨', amenities:['Pool','Gym','Security','Parking','CCTV'], desc:'Executive studio in Lavington. Shared pool, gym, 24hr security. Perfect for expats and diplomats.', matatu:'Lavington Mall stage' },
  { id:7, title:'Budget Bedsitter', area:'Eastleigh', price:8000, beds:1, baths:1, size:20, type:'Bedsitter', furnished:false, badge:'', status:'Available Now', emoji:'🏠', amenities:['Security','Borehole'], desc:'Affordable, clean bedsitter in Eastleigh. Close to city centre. Good transport connections.', matatu:'Eastleigh 1st Avenue' },
  { id:8, title:'Premium 3BR Apartment', area:'Westlands', price:120000, beds:3, baths:2, size:165, type:'3BR', furnished:true, badge:'Featured', status:'Available Now', emoji:'🌟', amenities:['Pool','Gym','Security','Parking','Generator','Lift'], desc:'Ultra-modern 3-bedroom. Rooftop pool, gym, stunning city views. The best Westlands has to offer.', matatu:'Westlands roundabout' },
  { id:9, title:'New 2BR Kasarani', area:'Kasarani', price:22000, beds:2, baths:1, size:70, type:'2BR', furnished:false, badge:'New', status:'Available Now', emoji:'🏗️', amenities:['Parking','Borehole','Security'], desc:'Newly completed 2-bedroom. Tiled throughout, reliable borehole water. Great value in Kasarani.', matatu:'Kasarani stadium stage' },
  { id:10, title:'Garden View 1BR', area:'Karen', price:75000, beds:1, baths:1, size:65, type:'1BR', furnished:true, badge:'', status:'Available Now', emoji:'🌿', amenities:['Garden','Security','Parking','Borehole'], desc:'Serene 1-bedroom with private garden in Karen. Peace and tranquility within Nairobi.', matatu:'Karen shopping centre' },
  { id:11, title:'Studio Near South C', area:'South C', price:18000, beds:1, baths:1, size:35, type:'Studio', furnished:false, badge:'New', status:'Available Now', emoji:'🏙️', amenities:['Security','Borehole','Parking'], desc:'Modern studio in South C. Close to Nairobi CBD and Industrial Area. Easy commute.', matatu:'South C stage' },
  { id:12, title:'4BR Executive Home', area:'Karen', price:180000, beds:4, baths:3, size:250, type:'4BR+', furnished:true, badge:'Featured', status:'Available Now', emoji:'🏰', amenities:['Pool','Garden','DSQ','Security','Generator','Gym'], desc:'Luxurious 4-bedroom Karen home with pool, DSQ, lush garden. Executive living at its finest.', matatu:'Hardy stage Karen' },
  { id:13, title:'Cozy 1BR Parklands', area:'Parklands', price:32000, beds:1, baths:1, size:50, type:'1BR', furnished:true, badge:'New', status:'Available Now', emoji:'🌳', amenities:['Security','Parking','Borehole','Lift'], desc:'Furnished 1-bedroom in quiet Parklands. Walking distance to Aga Khan Hospital. Safe neighbourhood.', matatu:'Parklands stage' },
  { id:14, title:'Modern Bedsitter Kilimani', area:'Kilimani', price:20000, beds:1, baths:1, size:30, type:'Bedsitter', furnished:true, badge:'', status:'Available Now', emoji:'🏢', amenities:['Security','CCTV','Borehole'], desc:'Modern furnished bedsitter in Kilimani. Walking distance to Yaya Centre. All-day water, 24hr security.', matatu:'Yaya Centre stage' },
  { id:15, title:'Spacious 2BR Lavington', area:'Lavington', price:72000, beds:2, baths:2, size:100, type:'2BR', furnished:false, badge:'Featured', status:'Available Now', emoji:'🏡', amenities:['Security','Parking','Garden','Borehole','CCTV'], desc:'Spacious 2-bedroom with 2 bathrooms in quiet Lavington estate. Private garden, 24hr security.', matatu:'Lavington Mall stage' }
];

// ── HELPERS ─────────────────────────────────────────────────
const WA = '254723783337';
function waLink(msg) { return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`; }
function ksh(n) { return `KSh ${Number(n).toLocaleString('en-KE')}`; }
function getSaved() { try { return JSON.parse(localStorage.getItem('rt_saved')) || []; } catch { return []; } }
function toggleSave(id, btn) {
  let s = getSaved();
  if (s.includes(id)) { s = s.filter(i => i !== id); btn.classList.remove('saved'); }
  else { s.push(id); btn.classList.add('saved'); }
  try { localStorage.setItem('rt_saved', JSON.stringify(s)); } catch {}
}

// ── BUILD CARD ───────────────────────────────────────────────
function buildCard(p) {
  const saved = getSaved().includes(p.id);
  const msg = `I'm interested in ${p.title} in ${p.area} at ${ksh(p.price)}/month. Can you arrange a viewing?`;
  const badges = [
    p.badge === 'Featured' ? '<span class="badge badge-featured">⭐ Featured</span>' : '',
    p.badge === 'New' ? '<span class="badge badge-new">🆕 New</span>' : '',
    '<span class="badge badge-verified">✓ Verified</span>'
  ].filter(Boolean).join('');
  const pills = p.amenities.slice(0, 4).map(a => `<span class="amenity-pill">${a}</span>`).join('');

  return `<article class="property-card fade-up" data-id="${p.id}">
    <div class="card-img" style="cursor:pointer" onclick="location.href='property-detail.html?id=${p.id}'">
      <span>${p.emoji}</span>
      <div class="card-badges">${badges}</div>
      <button class="card-save ${saved ? 'saved' : ''}" onclick="event.stopPropagation();toggleSave(${p.id},this)" title="Save">❤️</button>
    </div>
    <div class="card-content">
      <div class="card-meta">📍 ${p.area} · ${p.furnished ? '🛋️ Furnished' : 'Unfurnished'}</div>
      <h3 class="card-title" style="cursor:pointer" onclick="location.href='property-detail.html?id=${p.id}'">${p.title}</h3>
      <div class="card-price">${ksh(p.price)}<span style="font-size:13px;color:var(--dim);font-weight:400;font-family:'DM Sans',sans-serif"> / month</span></div>
      <div class="card-specs"><span>🛏️ ${p.beds} Bed${p.beds>1?'s':''}</span><span>🚿 ${p.baths} Bath</span><span>📐 ${p.size}m²</span></div>
      <div class="card-amenities">${pills}</div>
      <div style="font-size:12px;color:var(--emerald);font-weight:600;display:flex;align-items:center;gap:6px;margin-bottom:4px">
        <span style="width:6px;height:6px;background:var(--emerald);border-radius:50%;display:inline-block;animation:pulse 2s infinite;flex-shrink:0"></span>
        ${p.status}
      </div>
      <div class="card-actions">
        <a href="property-detail.html?id=${p.id}" class="btn btn-outline" style="font-size:13px;padding:9px 12px">📋 View Details</a>
        <a href="${waLink(msg)}" class="btn btn-emerald" style="font-size:13px;padding:9px 12px;background:var(--wa-green);color:#fff" target="_blank" rel="noopener">💬 WhatsApp</a>
      </div>
    </div>
    <div class="verified-strip">✓ ID Verified · ✓ Physically Inspected</div>
  </article>`;
}

// ── RENDER ───────────────────────────────────────────────────
function renderGrid(id, props) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!props.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--dim)">
      <div style="font-size:3rem;margin-bottom:16px">🔍</div>
      <h3 style="font-size:1.3rem;margin-bottom:8px;color:var(--text)">No properties match your filters</h3>
      <p style="margin-bottom:24px">Try adjusting your search or let our team help.</p>
      <a href="${waLink('Hi Rentech! I need help finding a property.')}" class="btn btn-emerald" target="_blank"
         style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:var(--wa-green);color:#fff;border-radius:12px;font-weight:600;text-decoration:none">
        💬 Message Us on WhatsApp
      </a></div>`;
    return;
  }
  el.innerHTML = props.map(buildCard).join('');
  requestAnimationFrame(() => {
    el.querySelectorAll('.fade-up').forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 55));
  });
}

// ── FILTER ENGINE ────────────────────────────────────────────
function filterAndSort(opts = {}) {
  let r = [...PROPERTIES];
  if (opts.text) {
    const q = opts.text.toLowerCase();
    r = r.filter(p => p.title.toLowerCase().includes(q) || p.area.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }
  if (opts.area && opts.area !== 'All') r = r.filter(p => p.area === opts.area);
  if (opts.type && opts.type !== 'All') r = r.filter(p => p.type === opts.type);
  if (opts.maxPrice) r = r.filter(p => p.price <= parseInt(opts.maxPrice));
  if (opts.minPrice) r = r.filter(p => p.price >= parseInt(opts.minPrice));
  if (opts.beds && opts.beds !== 'Any') {
    if (opts.beds === '4+') r = r.filter(p => p.beds >= 4);
    else r = r.filter(p => p.beds === parseInt(opts.beds));
  }
  if (opts.furnished === 'Furnished') r = r.filter(p => p.furnished);
  if (opts.furnished === 'Unfurnished') r = r.filter(p => !p.furnished);
  if (opts.amenities && opts.amenities.length) r = r.filter(p => opts.amenities.every(a => p.amenities.includes(a)));
  switch (opts.sort) {
    case 'price-asc':  r.sort((a, b) => a.price - b.price); break;
    case 'price-desc': r.sort((a, b) => b.price - a.price); break;
    case 'newest': r.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0)); break;
    default: r.sort((a, b) => (b.badge === 'Featured' ? 1 : 0) - (a.badge === 'Featured' ? 1 : 0));
  }
  return r;
}

function getPropertyById(id) { return PROPERTIES.find(p => p.id === parseInt(id)); }
function filterByArea(area) {
  const el = document.getElementById('home-grid') || document.getElementById('featured-grid');
  if (!el) return;
  const r = area === 'All' ? PROPERTIES.slice(0, 9) : PROPERTIES.filter(p => p.area === area);
  renderGrid(el.id, r.length ? r : PROPERTIES.slice(0, 6));
}