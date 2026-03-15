/* ============================================
   RENTECH PROPERTIES - FILTERS.JS
   Premium Filter System for Nairobi Rentals
   Brand Colors: Emerald (#10B981) & Gold (#FFD700)
   ============================================ */

// ==========================================
// STATE MANAGEMENT WITH BRANDING
// ==========================================

const filterState = {
  search: '',
  area: 'all',
  type: 'all',
  minPrice: 0,
  maxPrice: 500000,
  beds: 'any',
  amenities: [],
  status: 'all',
  sortBy: 'featured',
  viewMode: 'grid',
  page: 1,
  perPage: 9
};

// ==========================================
// FILTER FUNCTIONS
// ==========================================

/**
 * Filter properties based on current state
 * @param {Array} properties - Properties to filter
 * @returns {Array} Filtered properties
 */
function filterProperties(properties) {
  return properties.filter(property => {
    // Search filter
    if (filterState.search) {
      const searchLower = filterState.search.toLowerCase();
      const matchesSearch = 
        property.title.toLowerCase().includes(searchLower) ||
        property.area.toLowerCase().includes(searchLower) ||
        (property.desc && property.desc.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }
    
    // Area filter
    if (filterState.area && filterState.area !== 'all') {
      if (property.area.toLowerCase() !== filterState.area.toLowerCase()) {
        return false;
      }
    }
    
    // Type filter
    if (filterState.type && filterState.type !== 'all') {
      if (property.type.toLowerCase() !== filterState.type.toLowerCase()) {
        return false;
      }
    }
    
    // Price range filter
    if (property.price < filterState.minPrice || property.price > filterState.maxPrice) {
      return false;
    }
    
    // Bedrooms filter
    if (filterState.beds && filterState.beds !== 'any') {
      const bedCount = parseInt(filterState.beds);
      if (filterState.beds === '4+') {
        if (property.beds < 4) return false;
      } else {
        if (property.beds !== bedCount) return false;
      }
    }
    
    // Amenities filter
    if (filterState.amenities.length > 0) {
      const hasAllAmenities = filterState.amenities.every(amenity => 
        property.amenities.some(a => a.toLowerCase() === amenity.toLowerCase())
      );
      if (!hasAllAmenities) return false;
    }
    
    // Status filter
    if (filterState.status && filterState.status !== 'all') {
      if (filterState.status === 'featured' && property.badge !== 'Featured') {
        return false;
      }
      if (filterState.status === 'new' && property.badge !== 'New') {
        return false;
      }
      if (filterState.status === 'available' && property.status !== 'Available Now') {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Sort properties based on current state
 * @param {Array} properties - Properties to sort
 * @returns {Array} Sorted properties
 */
function sortProperties(properties) {
  const sorted = [...properties];
  
  switch (filterState.sortBy) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      sorted.sort((a, b) => (b.id - a.id));
      break;
    case 'featured':
    default:
      // Featured first (gold), then new (emerald), then by price
      sorted.sort((a, b) => {
        if (a.badge === 'Featured' && b.badge !== 'Featured') return -1;
        if (a.badge !== 'Featured' && b.badge === 'Featured') return 1;
        if (a.badge === 'New' && b.badge !== 'New') return -1;
        if (a.badge !== 'New' && b.badge === 'New') return 1;
        return b.price - a.price;
      });
      break;
  }
  
  return sorted;
}

/**
 * Paginate properties
 * @param {Array} properties - Properties to paginate
 * @returns {Array} Paginated properties
 */
function paginateProperties(properties) {
  const start = (filterState.page - 1) * filterState.perPage;
  const end = start + filterState.perPage;
  return properties.slice(start, end);
}

// ==========================================
// UI UPDATE FUNCTIONS
// ==========================================

/**
 * Update results count
 * @param {number} count - Total count
 */
function updateResultsCount(count) {
  const countEl = document.getElementById('results-count');
  if (countEl) {
    countEl.textContent = `Showing ${count} ${count === 1 ? 'property' : 'properties'} across Nairobi`;
    countEl.style.color = 'var(--gold)';
  }
}

/**
 * Build active filter pills
 */
function buildActiveFilterPills() {
  const container = document.getElementById('active-filters');
  if (!container) return;
  
  const pills = [];
  
  if (filterState.area && filterState.area !== 'all') {
    pills.push({ label: `📍 ${filterState.area}`, key: 'area', value: filterState.area });
  }
  
  if (filterState.type && filterState.type !== 'all') {
    pills.push({ label: `🏢 ${filterState.type}`, key: 'type', value: filterState.type });
  }
  
  if (filterState.minPrice > 0 || filterState.maxPrice < 500000) {
    const formatPrice = (p) => 'KSh ' + p.toLocaleString();
    const priceLabel = filterState.minPrice > 0 && filterState.maxPrice < 500000
      ? `${formatPrice(filterState.minPrice)} - ${formatPrice(filterState.maxPrice)}`
      : filterState.minPrice > 0
        ? `From ${formatPrice(filterState.minPrice)}`
        : `Up to ${formatPrice(filterState.maxPrice)}`;
    pills.push({ label: `💰 ${priceLabel}`, key: 'price' });
  }
  
  if (filterState.beds && filterState.beds !== 'any') {
    const bedText = filterState.beds === '4+' ? '4+ Bedrooms' : `${filterState.beds} Bedroom${filterState.beds !== '1' ? 's' : ''}`;
    pills.push({ label: `🛏️ ${bedText}`, key: 'beds', value: filterState.beds });
  }
  
  filterState.amenities.forEach(amenity => {
    pills.push({ label: `✨ ${amenity}`, key: 'amenity', value: amenity });
  });
  
  if (filterState.status && filterState.status !== 'all') {
    const statusIcons = { featured: '⭐', new: '🆕', available: '✅' };
    pills.push({ label: `${statusIcons[filterState.status] || '📌'} ${filterState.status}`, key: 'status', value: filterState.status });
  }
  
  if (filterState.search) {
    pills.push({ label: `🔍 "${filterState.search}"`, key: 'search' });
  }
  
  if (pills.length === 0) {
    container.innerHTML = '';
    return;
  }
  
  container.innerHTML = pills.map(pill => `
    <div class="filter-pill">
      <span>${pill.label}</span>
      <span class="remove" onclick="removeFilter('${pill.key}', '${pill.value || ''}')" style="cursor:pointer;">×</span>
    </div>
  `).join('');
}

// ==========================================
// FILTER REMOVAL
// ==========================================

/**
 * Remove a specific filter
 * @param {string} key - Filter key
 * @param {string} value - Filter value (for amenities)
 */
window.removeFilter = function(key, value) {
  switch (key) {
    case 'area':
      filterState.area = 'all';
      const areaSelect = document.getElementById('filter-area');
      if (areaSelect) areaSelect.value = 'all';
      break;
    case 'type':
      filterState.type = 'all';
      document.querySelectorAll('.type-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.val === 'All');
      });
      break;
    case 'price':
      filterState.minPrice = 0;
      filterState.maxPrice = 500000;
      const minInput = document.getElementById('min-price');
      const maxInput = document.getElementById('max-price');
      const slider = document.getElementById('filter-price');
      if (minInput) minInput.value = '';
      if (maxInput) maxInput.value = '';
      if (slider) slider.value = 500000;
      break;
    case 'beds':
      filterState.beds = 'any';
      document.querySelectorAll('.bedroom-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.val === 'Any');
      });
      break;
    case 'amenity':
      filterState.amenities = filterState.amenities.filter(a => a !== value);
      document.querySelectorAll('input[name="amenity"]').forEach(cb => {
        if (cb.value === value) cb.checked = false;
      });
      break;
    case 'status':
      filterState.status = 'all';
      const statusSelect = document.getElementById('filter-status');
      if (statusSelect) statusSelect.value = 'all';
      break;
    case 'search':
      filterState.search = '';
      const searchInput = document.getElementById('filter-search');
      if (searchInput) searchInput.value = '';
      break;
  }
  
  filterState.page = 1;
  applyFilters();
};

// ==========================================
// MAIN APPLY FILTERS FUNCTION
// ==========================================

/**
 * Apply all filters and render results
 */
function applyFilters() {
  // Get properties from window (defined in properties.js)
  const properties = window.RENTECH_PROPERTIES || [];
  const container = document.getElementById('properties-grid');
  
  if (!container) return;
  
  // Filter, sort, paginate
  let results = filterProperties(properties);
  results = sortProperties(results);
  const totalResults = results.length;
  const paginatedResults = paginateProperties(results);
  
  // Update UI
  updateResultsCount(totalResults);
  buildActiveFilterPills();
  
  // Render
  if (paginatedResults.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
        <h3>No properties match your filters</h3>
        <p style="color: var(--dim); margin: 1rem 0;">Try adjusting your search criteria</p>
        <a href="https://wa.me/254723783337?text=Hi%20Rentech!%20I'm%20looking%20for%20a%20property%20but%20couldn't%20find%20what%20I%20need." 
           target="_blank" class="btn btn-primary" style="background: var(--wa-green);">
          💬 Message Us on WhatsApp
        </a>
      </div>
    `;
  } else {
    renderPropertyCards(paginatedResults, container, filterState.viewMode);
  }
  
  // Update load more button
  updateLoadMoreButton(totalResults);
  
  // Update URL
  updateURL();
}

/**
 * Render property cards
 * @param {Array} properties - Properties to render
 * @param {HTMLElement} container - Container element
 * @param {string} viewMode - Grid or list view
 */
function renderPropertyCards(properties, container, viewMode) {
  container.className = viewMode === 'list' ? 'property-list' : 'property-grid';
  
  container.innerHTML = properties.map(property => {
    const badgeHtml = property.badge ? 
      `<span class="badge ${property.badge === 'Featured' ? 'featured' : 'new'}">${property.badge === 'Featured' ? '⭐' : '🆕'} ${property.badge}</span>` : '';
    
    const msg = encodeURIComponent(`Hi! I'm interested in ${property.title} in ${property.area} at KSh ${property.price.toLocaleString()}/month. Is it still available?`);
    
    return `
      <div class="property-card">
        <div class="property-image">
          <img src="${property.img}" alt="${property.title}" loading="lazy">
          <div class="property-badges">
            <span class="badge verified">✓ Verified</span>
            ${badgeHtml}
          </div>
        </div>
        <div class="property-content">
          <div class="property-location">
            📍 ${property.area} · ${property.furnished ? 'Furnished' : 'Unfurnished'}
          </div>
          <h3 class="property-title">${property.title}</h3>
          <div class="property-price">KSh ${property.price.toLocaleString()}<em>/month</em></div>
          <div class="property-specs">
            <span>🛏️ ${property.beds} Bed${property.beds > 1 ? 's' : ''}</span>
            <span>🚿 ${property.baths} Bath</span>
            ${property.size ? `<span>📐 ${property.size}m²</span>` : ''}
          </div>
          ${property.amenities ? `
            <div class="property-amenities">
              ${property.amenities.slice(0, 3).map(a => `<span class="amenity-pill">${a}</span>`).join('')}
            </div>
          ` : ''}
          <div class="property-actions">
            <a href="property-detail.html?id=${property.id}" class="btn-details">View Details</a>
            <a href="https://wa.me/254723783337?text=${msg}" target="_blank" class="btn-wa">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Update load more button visibility
 * @param {number} total - Total results
 */
function updateLoadMoreButton(total) {
  const loadMoreBtn = document.getElementById('load-more');
  if (!loadMoreBtn) return;
  
  const totalPages = Math.ceil(total / filterState.perPage);
  if (filterState.page >= totalPages) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
    const remaining = total - (filterState.page * filterState.perPage);
    loadMoreBtn.textContent = `Load More (${remaining} more)`;
  }
}

/**
 * Update URL with filter state
 */
function updateURL() {
  const params = new URLSearchParams();
  
  if (filterState.area && filterState.area !== 'all') params.set('area', filterState.area);
  if (filterState.type && filterState.type !== 'all') params.set('type', filterState.type);
  if (filterState.minPrice > 0) params.set('minPrice', filterState.minPrice);
  if (filterState.maxPrice < 500000) params.set('maxPrice', filterState.maxPrice);
  if (filterState.beds && filterState.beds !== 'any') params.set('beds', filterState.beds);
  if (filterState.amenities.length > 0) params.set('amenities', filterState.amenities.join(','));
  if (filterState.status && filterState.status !== 'all') params.set('status', filterState.status);
  if (filterState.search) params.set('q', filterState.search);
  
  const newURL = params.toString() 
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;
  
  window.history.replaceState({}, '', newURL);
}

/**
 * Parse URL parameters and set filter state
 */
function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('area')) {
    filterState.area = params.get('area');
    const areaSelect = document.getElementById('filter-area');
    if (areaSelect) areaSelect.value = params.get('area');
  }
  
  if (params.has('type')) {
    filterState.type = params.get('type');
    document.querySelectorAll('.type-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.val === params.get('type'));
    });
  }
  
  if (params.has('minPrice')) {
    filterState.minPrice = parseInt(params.get('minPrice'));
  }
  
  if (params.has('maxPrice')) {
    filterState.maxPrice = parseInt(params.get('maxPrice'));
    const slider = document.getElementById('filter-price');
    if (slider) slider.value = filterState.maxPrice;
  }
  
  if (params.has('beds')) {
    filterState.beds = params.get('beds');
    document.querySelectorAll('.bedroom-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.val === params.get('beds'));
    });
  }
  
  if (params.has('amenities')) {
    filterState.amenities = params.get('amenities').split(',');
    document.querySelectorAll('input[name="amenity"]').forEach(cb => {
      cb.checked = filterState.amenities.includes(cb.value);
    });
  }
  
  if (params.has('status')) {
    filterState.status = params.get('status');
    const statusSelect = document.getElementById('filter-status');
    if (statusSelect) statusSelect.value = params.get('status');
  }
  
  if (params.has('q')) {
    filterState.search = params.get('q');
    const searchInput = document.getElementById('filter-search');
    if (searchInput) searchInput.value = params.get('q');
  }
}

// ==========================================
// EVENT HANDLERS
// ==========================================

/**
 * Initialize filter event handlers
 */
function initFilterHandlers() {
  // Search input
  const searchInput = document.getElementById('filter-search');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      filterState.search = e.target.value;
      filterState.page = 1;
      applyFilters();
    }, 300));
  }
  
  // Area select
  const areaSelect = document.getElementById('filter-area');
  if (areaSelect) {
    areaSelect.addEventListener('change', (e) => {
      filterState.area = e.target.value;
      filterState.page = 1;
      applyFilters();
    });
  }
  
  // Type chips
  document.querySelectorAll('.type-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.type-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterState.type = chip.dataset.val;
      filterState.page = 1;
      applyFilters();
    });
  });
  
  // Price inputs
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const priceSlider = document.getElementById('filter-price');
  const priceDisplay = document.getElementById('price-display');
  
  if (minPriceInput) {
    minPriceInput.addEventListener('input', (e) => {
      filterState.minPrice = parseInt(e.target.value) || 0;
      filterState.page = 1;
      applyFilters();
    });
  }
  
  if (maxPriceInput) {
    maxPriceInput.addEventListener('input', (e) => {
      filterState.maxPrice = parseInt(e.target.value) || 500000;
      filterState.page = 1;
      applyFilters();
    });
  }
  
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      filterState.maxPrice = val;
      priceDisplay.textContent = `KSh ${val.toLocaleString()}`;
      if (maxPriceInput) maxPriceInput.value = val;
    });
    
    priceSlider.addEventListener('change', () => {
      filterState.page = 1;
      applyFilters();
    });
  }
  
  // Bed chips
  document.querySelectorAll('.bedroom-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.bedroom-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterState.beds = chip.dataset.val;
      filterState.page = 1;
      applyFilters();
    });
  });
  
  // Amenity checkboxes
  document.querySelectorAll('input[name="amenity"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!filterState.amenities.includes(e.target.value)) {
          filterState.amenities.push(e.target.value);
        }
      } else {
        filterState.amenities = filterState.amenities.filter(a => a !== e.target.value);
      }
      filterState.page = 1;
      applyFilters();
    });
  });
  
  // Status select
  const statusSelect = document.getElementById('filter-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      filterState.status = e.target.value;
      filterState.page = 1;
      applyFilters();
    });
  }
  
  // Sort select
  const sortSelect = document.getElementById('sort-results');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sortBy = e.target.value;
      applyFilters();
    });
  }
  
  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.viewMode = btn.textContent.includes('⊞') ? 'grid' : 'list';
      
      const container = document.getElementById('properties-grid');
      if (container) {
        container.className = filterState.viewMode === 'list' ? 'property-list' : 'property-grid';
      }
      
      applyFilters();
    });
  });
  
  // Reset filters button
  const resetBtn = document.getElementById('reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }
  
  // Load more button
  const loadMoreBtn = document.getElementById('load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      filterState.page++;
      applyFiltersLoadMore();
    });
  }
}

/**
 * Apply filters and append to existing results (for load more)
 */
function applyFiltersLoadMore() {
  const properties = window.RENTECH_PROPERTIES || [];
  const container = document.getElementById('properties-grid');
  
  if (!container) return;
  
  let results = filterProperties(properties);
  results = sortProperties(results);
  const totalResults = results.length;
  
  // Get all results up to current page
  const allVisibleResults = results.slice(0, filterState.page * filterState.perPage);
  
  updateResultsCount(totalResults);
  buildActiveFilterPills();
  
  renderPropertyCards(allVisibleResults, container, filterState.viewMode);
  updateLoadMoreButton(totalResults);
}

/**
 * Reset all filters
 */
function resetFilters() {
  filterState.search = '';
  filterState.area = 'all';
  filterState.type = 'all';
  filterState.minPrice = 0;
  filterState.maxPrice = 500000;
  filterState.beds = 'any';
  filterState.amenities = [];
  filterState.status = 'all';
  filterState.sortBy = 'featured';
  filterState.page = 1;
  
  // Reset UI elements
  const searchInput = document.getElementById('filter-search');
  if (searchInput) searchInput.value = '';
  
  const areaSelect = document.getElementById('filter-area');
  if (areaSelect) areaSelect.value = 'all';
  
  const statusSelect = document.getElementById('filter-status');
  if (statusSelect) statusSelect.value = 'all';
  
  document.querySelectorAll('.type-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.val === 'All');
  });
  
  document.querySelectorAll('.bedroom-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.val === 'Any');
  });
  
  const minInput = document.getElementById('min-price');
  const maxInput = document.getElementById('max-price');
  const slider = document.getElementById('filter-price');
  const priceDisplay = document.getElementById('price-display');
  
  if (minInput) minInput.value = '';
  if (maxInput) maxInput.value = '';
  if (slider) slider.value = 500000;
  if (priceDisplay) priceDisplay.textContent = 'KSh 500,000';
  
  document.querySelectorAll('input[name="amenity"]').forEach(cb => {
    cb.checked = false;
  });
  
  const sortSelect = document.getElementById('sort-results');
  if (sortSelect) sortSelect.value = 'featured';
  
  applyFilters();
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize filters module
 */
function initFilters() {
  // Make sure properties are loaded
  if (typeof window.RENTECH_PROPERTIES === 'undefined') {
    console.warn('RENTECH_PROPERTIES not found, waiting...');
    setTimeout(initFilters, 100);
    return;
  }
  
  parseURLParams();
  initFilterHandlers();
  applyFilters();
  
  console.log('🔍 Rentech Filters initialized with Gold & Emerald branding');
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFilters);
} else {
  initFilters();
}

// Export for global use
window.RentechFilters = {
  filterState,
  filterProperties,
  sortProperties,
  applyFilters,
  resetFilters,
  removeFilter: window.removeFilter
};