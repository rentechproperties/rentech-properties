let _allProps = [];
(async function init() {
  try {
    const r = await fetch('data/properties.json');
    if (!r.ok) throw new Error('Failed');
    _allProps = await r.json();
    window._allPropsReady = true;
    applyFilters();
  } catch(e) {
    const grid = document.getElementById('props-grid');
    if (grid) grid.innerHTML = '<div class="no-results"><div class="no-results-icon">😔</div><h3>Could not load properties</h3><p style="color:var(--muted)">Please refresh the page.</p></div>';
  }
})();
function filterAndSort(state) {
  let results = _allProps.filter(p => {
    if (state.text) { const h = (p.title+' '+p.area+' '+p.type+' '+(p.description||'')).toLowerCase(); if (!h.includes(state.text)) return false; }
    if (state.area !== 'All' && p.area !== state.area) return false;
    if (state.type !== 'All' && p.type !== state.type) return false;
    if (p.price > state.maxPrice) return false;
    if (state.beds !== 'Any') { if (state.beds === '4+') { if (p.beds < 4) return false; } else if (p.beds !== parseInt(state.beds)) return false; }
    if (state.furnished !== 'Any') { const f = p.furnished === true; if (state.furnished === 'Furnished' && !f) return false; if (state.furnished === 'Unfurnished' && f) return false; }
    if (state.amenities && state.amenities.length) { if (!state.amenities.every(a => p.amenities && p.amenities.includes(a))) return false; }
    return true;
  });
  switch(state.sort) {
    case 'newest': results.sort((a,b) => new Date(b.postedDate)-new Date(a.postedDate)); break;
    case 'price-asc': results.sort((a,b) => a.price-b.price); break;
    case 'price-desc': results.sort((a,b) => b.price-a.price); break;
    default: results.sort((a,b) => (b.featured?1:0)-(a.featured?1:0)||b.views-a.views);
  }
  return results;
}
function getSaved() { try { return JSON.parse(localStorage.getItem('rt_saved')||'[]'); } catch { return []; } }
function toggleSave(id, btn) { let s = getSaved(); if (s.includes(id)) { s = s.filter(x=>x!==id); btn.classList.remove('saved'); } else { s.push(id); btn.classList.add('saved'); } localStorage.setItem('rt_saved', JSON.stringify(s)); }