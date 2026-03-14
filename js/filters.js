// js/filters.js

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('properties-grid');
  const resultsCount = document.getElementById('results-count');
  
  // Filter Inputs
  const searchInput = document.getElementById('filter-search');
  const areaSelect = document.getElementById('filter-area');
  const priceSlider = document.getElementById('filter-price');
  const priceDisplay = document.getElementById('price-display');
  const sortSelect = document.getElementById('sort-results');
  const resetBtn = document.getElementById('reset-filters');
  
  // State for chips
  let selectedType = 'All';
  let selectedBeds = 'Any';
  
  // Parse URL Parameters (e.g., coming from homepage search)
  function parseURLparams() {
    const params = new URLSearchParams(window.location.search);
    if(params.has('area')) areaSelect.value = params.get('area');
    if(params.has('type')) {
      selectedType = params.get('type');
      updateChips('type-chip', selectedType);
    }
    if(params.has('budget')) {
      priceSlider.value = params.get('budget');
      priceDisplay.innerText = formatKSh(Number(params.get('budget')));
    }
  }

  // Chip selection logic
  window.toggleChip = function(btn, group, value) {
    document.querySelectorAll(`.${group}`).forEach(el => el.classList.remove('active', 'btn-emerald'));
    document.querySelectorAll(`.${group}`).forEach(el => el.classList.add('btn-outline'));
    
    btn.classList.remove('btn-outline');
    btn.classList.add('active', 'btn-emerald');
    
    if (group === 'type-chip') selectedType = value;
    if (group === 'beds-chip') selectedBeds = value;
    
    applyFilters();
  };

  function updateChips(group, value) {
    const btns = document.querySelectorAll(`.${group}`);
    btns.forEach(btn => {
      if(btn.dataset.val === value) {
        btn.classList.remove('btn-outline');
        btn.classList.add('active', 'btn-emerald');
      } else {
        btn.classList.remove('active', 'btn-emerald');
        btn.classList.add('btn-outline');
      }
    });
  }

  // Range Slider live update
  if(priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      priceDisplay.innerText = formatKSh(Number(e.target.value));
    });
    priceSlider.addEventListener('change', applyFilters);
  }

  // Apply all filters and render
  function applyFilters() {
    if(!gridContainer) return;

    const searchTerm = searchInput.value.toLowerCase();
    const area = areaSelect.value;
    const maxPrice = Number(priceSlider.value);
    
    // Gather checked amenities
    const checkedAmenities = Array.from(document.querySelectorAll('.amenity-check:checked')).map(cb => cb.value);

    let filtered = window.properties.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchTerm) || p.area.toLowerCase().includes(searchTerm);
      const matchArea = area === '' || p.area === area;
      const matchType = selectedType === 'All' || p.type === selectedType;
      const matchBeds = selectedBeds === 'Any' || p.beds.toString() === selectedBeds || (selectedBeds === '4+' && p.beds >= 4);
      const matchPrice = p.price <= maxPrice;
      const matchAmenities = checkedAmenities.every(a => p.amenities.includes(a) || (a === 'Furnished' && p.furnished));
      
      return matchSearch && matchArea && matchType && matchBeds && matchPrice && matchAmenities;
    });

    // Sorting
    const sortVal = sortSelect.value;
    if(sortVal === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if(sortVal === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if(sortVal === 'newest') filtered.sort((a, b) => (b.badge === 'New' ? 1 : -1)); // simple proxy for newest
    if(sortVal === 'featured') filtered.sort((a, b) => (b.badge === 'Featured' ? 1 : -1));

    renderGrid(filtered);
  }

  function renderGrid(data) {
    resultsCount.innerText = `Showing ${data.length} properties across Nairobi`;
    
    if (data.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--card); border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
          <h3 class="syne" style="margin-bottom: 8px;">No properties match your filters</h3>
          <p class="text-muted" style="margin-bottom: 24px;">Try adjusting your search or tell our team what you need.</p>
          <a href="https://wa.me/254723783337?text=Hi%20Rentech,%20I%20couldn't%20find%20what%20I'm%20looking%20for." target="_blank" class="btn btn-emerald">💬 Message Us on WhatsApp</a>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = data.map((p, index) => {
      let html = window.buildCard(p);
      return html.replace('fade-up"', `fade-up visible" style="animation: fadeUp 0.4s ease forwards; animation-delay: ${index * 50}ms; opacity:0;"`);
    }).join('');
  }

  // Event Listeners
  if(searchInput) searchInput.addEventListener('input', debounce(applyFilters, 300));
  if(areaSelect) areaSelect.addEventListener('change', applyFilters);
  if(sortSelect) sortSelect.addEventListener('change', applyFilters);
  document.querySelectorAll('.amenity-check').forEach(cb => cb.addEventListener('change', applyFilters));
  
  if(resetBtn) {
    resetBtn.addEventListener('click', () => {
      searchInput.value = '';
      areaSelect.value = '';
      priceSlider.value = 300000;
      priceDisplay.innerText = formatKSh(300000);
      document.querySelectorAll('.amenity-check').forEach(cb => cb.checked = false);
      toggleChip(document.querySelector('.type-chip[data-val="All"]'), 'type-chip', 'All');
      toggleChip(document.querySelector('.beds-chip[data-val="Any"]'), 'beds-chip', 'Any');
      applyFilters();
    });
  }

  // Grid/List View Toggle
  window.setView = function(mode, btn) {
    document.querySelectorAll('.view-btn').forEach(b => b.style.opacity = '0.5');
    btn.style.opacity = '1';
    if(mode === 'list') {
      gridContainer.style.gridTemplateColumns = '1fr';
    } else {
      gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
    }
  };

  // Utility: Debounce
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => { clearTimeout(timeout); func(...args); };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Init
  if(gridContainer) {
    parseURLparams();
    applyFilters();
  }
});