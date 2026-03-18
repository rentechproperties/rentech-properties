/* =========================================
   RENTECH PROPERTIES — properties.js v2.0
   Nairobi's #1 AI Property Platform
   ========================================= */

let allProperties = [];
let filtered = [];
let currentSort = 'featured';
let currentView = 'grid';

// ── INIT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadProperties();
  bindFilters();
  applyURLParams();
  renderCount();
});

// ── LOAD DATA ─────────────────────────────
async function loadProperties() {
  showSkeletons();
  try {
    const res = await fetch('data/properties.json');
    if (!res.ok) throw new Error('Network error');
    allProperties = await res.json();
    filtered = [...allProperties];
    renderCards(filtered);
  } catch (e) {
    showError();
  }
}

// ── SKELETON LOADERS ──────────────────────
function showSkeletons() {
  const grid = document.getElementById('propertiesGrid');
  if (!grid) return;
  grid.innerHTML = Array(6).fill(0).map(() => `
    <div class="property-card skeleton">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line w80"></div>
        <div class="skeleton-line w50"></div>
        <div class="skeleton-line w60"></div>
      </div>
    </div>`).join('');
}

function showError() {
  const grid = document.getElementById('propertiesGrid');
  if (!grid) return;
  grid.innerHTML = `
    <div class="error-state" style="grid-column:1/-1;text-align:center;padding:3rem">
      <div style="font-size:3rem;margin-bottom:1rem">😔</div>
      <h3>Couldn't load properties</h3>
      <p style="color:var(--text-muted);margin-bottom:1.5rem">Check your connection and try again</p>
      <button onclick="loadProperties()" class="btn-primary">↺ Try Again</button>
    </div>`;
}

// ── RENDER CARDS ──────────────────────────
function renderCards(props) {
  const grid = document.getElementById('propertiesGrid');
  const count = document.getElementById('resultCount');
  if (!grid) return;

  if (count) count.textContent = props.length;

  if (!props.length) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1;text-align:center;padding:3rem">
        <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
        <h3>No properties found</h3>
        <p style="color:var(--text-muted);margin-bottom:1.5rem">Try adjusting your filters</p>
        <button onclick="resetFilters()" class="btn-secondary">Reset Filters</button>
      </div>`;
    return;
  }

  const sorted = sortProps(props);
  grid.innerHTML = sorted.map(p => buildCard(p)).join('');
}

function buildCard(p) {
  const amenityIcons = { 'Parking': '🚗', '24hr Security': '🛡️', 'Borehole Water': '💧', 'Furnished': '🛋️', 'Gym': '💪', 'Balcony': '🌇', 'Garden': '🌿' };
  const waMsg = encodeURIComponent(`Hi Rentech! I'm interested in: ${p.title} in ${p.area} at KSh ${p.price.toLocaleString()}/mo. Property ID: ${p.id}. Can I arrange a viewing?`);
  const daysSince = Math.floor((new Date() - new Date(p.postedDate)) / 86400000);
  const badge = daysSince <= 3 ? '<span class="badge badge-new">🆕 NEW</span>' : p.featured ? '<span class="badge badge-featured">⭐ FEATURED</span>' : '';

  return `
    <div class="property-card" onclick="goToDetail('${p.id}')">
      <div class="card-img-wrap">
        <img src="${p.images[0]}" alt="${p.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'">
        <div class="card-badges">${badge}<span class="badge badge-verified">✓ Verified</span></div>
        <div class="card-type">${p.type}</div>
      </div>
      <div class="card-body">
        <div class="card-price">KSh ${p.price.toLocaleString()}<span>/mo</span></div>
        <h3 class="card-title">${p.title}</h3>
        <div class="card-location">📍 ${p.area}, Nairobi</div>
        <div class="card-meta">
          <span>🛏 ${p.bedrooms} Bed</span>
          <span>🚿 ${p.bathrooms} Bath</span>
          ${p.furnished ? '<span>🛋️ Furnished</span>' : ''}
        </div>
        <div class="card-amenities">
          ${p.amenities.slice(0,3).map(a => `<span class="amenity-tag">${amenityIcons[a]||'✓'} ${a}</span>`).join('')}
        </div>
        <div class="card-footer">
          <div class="card-views">👁 ${p.views} views</div>
          <a href="https://wa.me/${p.landlord.phone}?text=${waMsg}" 
             class="btn-whatsapp" onclick="event.stopPropagation()">
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>`;
}

function goToDetail(id) {
  window.location.href = `property-detail.html?id=${id}`;
}

// ── SORT ──────────────────────────────────
function sortProps(props) {
  const sorted = [...props];
  switch(currentSort) {
    case 'featured': return sorted.sort((a,b) => b.featured - a.featured || b.views - a.views);
    case 'newest': return sorted.sort((a,b) => new Date(b.postedDate) - new Date(a.postedDate));
    case 'price-asc': return sorted.sort((a,b) => a.price - b.price);
    case 'price-desc': return sorted.sort((a,b) => b.price - a.price);
    default: return sorted;
  }
}

document.addEventListener('change', e => {
  if (e.target.id === 'sortSelect') {
    currentSort = e.target.value;
    renderCards(filtered);
  }
});

// ── FILTERS ───────────────────────────────
function bindFilters() {
  const priceSlider = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('priceDisplay');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', () => {
      priceDisplay.textContent = `KSh ${parseInt(priceSlider.value).toLocaleString()}`;
      applyFilters();
    });
  }

  ['areaFilter','typeFilter','bedroomsFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  document.querySelectorAll('.amenity-check').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(applyFilters, 300));
  }

  // View toggles
  document.querySelectorAll('.view-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      currentView = btn.dataset.view;
      document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('propertiesGrid');
      if (grid) grid.className = currentView === 'list' ? 'properties-list' : 'properties-grid';
    });
  });
}

function applyFilters() {
  const area = document.getElementById('areaFilter')?.value || '';
  const type = document.getElementById('typeFilter')?.value || '';
  const beds = document.getElementById('bedroomsFilter')?.value || '';
  const maxPrice = parseInt(document.getElementById('priceRange')?.value) || 300000;
  const search = document.getElementById('searchInput')?.value?.toLowerCase() || '';
  const checkedAmenities = [...document.querySelectorAll('.amenity-check:checked')].map(c => c.value);

  filtered = allProperties.filter(p => {
    if (area && p.area !== area) return false;
    if (type && p.type !== type) return false;
    if (beds) {
      if (beds === '4+') { if (p.bedrooms < 4) return false; }
      else if (p.bedrooms !== parseInt(beds)) return false;
    }
    if (p.price > maxPrice) return false;
    if (search && !p.title.toLowerCase().includes(search) && !p.area.toLowerCase().includes(search) && !p.description.toLowerCase().includes(search)) return false;
    if (checkedAmenities.length) {
      const hasAll = checkedAmenities.every(a => p.amenities.includes(a));
      if (!hasAll) return false;
    }
    return true;
  });

  renderCards(filtered);
}

function applyURLParams() {
  const params = new URLSearchParams(window.location.search);
  const area = params.get('area');
  const type = params.get('type');
  if (area) {
    const el = document.getElementById('areaFilter');
    if (el) { el.value = area; }
  }
  if (type) {
    const el = document.getElementById('typeFilter');
    if (el) { el.value = type; }
  }
  if (area || type) applyFilters();
}

function resetFilters() {
  ['areaFilter','typeFilter','bedroomsFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const priceRange = document.getElementById('priceRange');
  if (priceRange) { priceRange.value = 300000; }
  const priceDisplay = document.getElementById('priceDisplay');
  if (priceDisplay) priceDisplay.textContent = 'KSh 300,000';
  document.querySelectorAll('.amenity-check').forEach(cb => cb.checked = false);
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  filtered = [...allProperties];
  renderCards(filtered);
}

function renderCount() {
  const live = document.getElementById('liveCount');
  if (live) live.textContent = allProperties.length;
}

// ── UTILS ─────────────────────────────────
function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}