/* ============================================
   RENTECH PROPERTIES - MAIN LISTINGS RENDERER
   Fixed version that actually renders cards
   Brand Colors: Emerald (#10B981) & Gold (#FFD700)
   ============================================ */

// Global variables
let allProperties = [];
let filteredProperties = [];
let currentPage = 1;
const propertiesPerPage = 12;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Properties.js loaded - FIXED VERSION');
    
    // Load properties from JSON
    loadProperties();
    
    // Initialize filters
    initFilters();
    
    // Check for URL parameters
    handleURLParams();
});

// Load properties from JSON file
async function loadProperties() {
    try {
        // Show loading skeletons
        showLoadingSkeletons();
        
        // Fetch properties from JSON
        const response = await fetch('/data/properties.json');
        if (!response.ok) {
            throw new Error('Failed to load properties');
        }
        
        const data = await response.json();
        allProperties = data.properties;
        
        // Apply any filters from URL
        applyURLFilters();
        
        // Render properties
        renderProperties();
        
        // Update counts
        updatePropertyCounts();
        
        // Hide loading skeletons
        hideLoadingSkeletons();
        
    } catch (error) {
        console.error('Error loading properties:', error);
        showErrorMessage('Failed to load properties. Please refresh the page.');
    }
}

// Show loading skeletons
function showLoadingSkeletons() {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    let skeletons = '';
    for (let i = 0; i < 6; i++) {
        skeletons += `
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>
        `;
    }
    
    grid.innerHTML = `<div class="loading-skeleton">${skeletons}</div>`;
}

// Hide loading skeletons
function hideLoadingSkeletons() {
    // Skeletons will be replaced by renderProperties
}

// Show error message
function showErrorMessage(message) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    grid.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button onclick="loadProperties()" class="btn btn-primary">Try Again</button>
        </div>
    `;
}

// Render properties to grid
function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    if (filteredProperties.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-home"></i>
                <h3>No Properties Found</h3>
                <p>Try adjusting your filters or check back later for new listings.</p>
                <button onclick="resetFilters()" class="btn btn-primary">Reset Filters</button>
            </div>
        `;
        return;
    }
    
    // Calculate pagination
    const start = (currentPage - 1) * propertiesPerPage;
    const end = start + propertiesPerPage;
    const paginatedProperties = filteredProperties.slice(start, end);
    
    // Generate HTML
    let html = '';
    paginatedProperties.forEach(property => {
        html += generatePropertyCard(property);
    });
    
    grid.innerHTML = html;
    
    // Render pagination
    renderPagination();
    
    // Attach event listeners to cards
    attachCardListeners();
}

// Generate single property card HTML
function generatePropertyCard(property) {
    // Format price with commas
    const formattedPrice = property.price.toLocaleString();
    
    // Generate tags HTML
    let tagsHTML = '';
    if (property.verified) {
        tagsHTML += '<span class="tag verified"><i class="fas fa-check-circle"></i> Verified</span>';
    }
    if (property.featured) {
        tagsHTML += '<span class="tag featured"><i class="fas fa-star"></i> Featured</span>';
    }
    if (property.isNew) {
        tagsHTML += '<span class="tag new"><i class="fas fa-bolt"></i> New</span>';
    }
    
    // Generate features HTML
    let featuresHTML = `
        <span><i class="fas fa-bed"></i> ${property.bedrooms} Bed</span>
        <span><i class="fas fa-bath"></i> ${property.bathrooms} Bath</span>
    `;
    
    if (property.parking) {
        featuresHTML += `<span><i class="fas fa-car"></i> Parking</span>`;
    }
    
    // Generate WhatsApp link with pre-filled message
    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in ${property.title} in ${property.location} (KSh ${formattedPrice}/month). Is it still available?`
    );
    const whatsappLink = `https://wa.me/${property.whatsapp || '254100403629'}?text=${whatsappMessage}`;
    
    return `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
                <div class="property-tags">
                    ${tagsHTML}
                </div>
                <button class="save-property" onclick="toggleSaveProperty('${property.id}')">
                    <i class="${isPropertySaved(property.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            
            <div class="property-info">
                <div class="property-price">KSh ${formattedPrice}<span>/month</span></div>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                
                <div class="property-features">
                    ${featuresHTML}
                </div>
                
                <div class="property-actions">
                    <a href="/property-detail.html?id=${property.id}" class="btn-details">
                        <i class="fas fa-eye"></i> View Details
                    </a>
                    <a href="${whatsappLink}" target="_blank" class="btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
                
                <div class="property-meta">
                    <span><i class="fas fa-clock"></i> Listed ${timeAgo(property.listedDate)}</span>
                    <span><i class="fas fa-eye"></i> ${property.views} views</span>
                </div>
            </div>
        </div>
    `;
}

// Render pagination
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination">';
    
    // Previous button
    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" 
            ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (
            i === currentPage - 3 || 
            i === currentPage + 3
        ) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage + 1})" 
            ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationHTML += '</div>';
    
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
window.changePage = function(page) {
    currentPage = page;
    renderProperties();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize filters
function initFilters() {
    const filterForm = document.getElementById('filterForm');
    if (!filterForm) return;
    
    // Price range slider
    const priceSlider = document.getElementById('priceSlider');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            const value = this.value.split(',');
            priceMin.value = value[0];
            priceMax.value = value[1];
        });
    }
    
    // Apply filters button
    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    // Reset filters button
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
    
    // Sort select
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applySorting(this.value);
        });
    }
}

// Apply filters
function applyFilters() {
    // Get filter values
    const location = document.getElementById('filterLocation')?.value;
    const minPrice = document.getElementById('priceMin')?.value;
    const maxPrice = document.getElementById('priceMax')?.value;
    const bedrooms = document.getElementById('filterBedrooms')?.value;
    const propertyType = document.getElementById('filterType')?.value;
    const furnished = document.getElementById('filterFurnished')?.checked;
    const parking = document.getElementById('filterParking')?.checked;
    
    // Filter properties
    filteredProperties = allProperties.filter(property => {
        let matches = true;
        
        if (location && property.location.toLowerCase() !== location.toLowerCase()) {
            matches = false;
        }
        
        if (minPrice && property.price < parseInt(minPrice)) {
            matches = false;
        }
        
        if (maxPrice && property.price > parseInt(maxPrice)) {
            matches = false;
        }
        
        if (bedrooms && property.bedrooms < parseInt(bedrooms)) {
            matches = false;
        }
        
        if (propertyType && property.type !== propertyType) {
            matches = false;
        }
        
        if (furnished && !property.furnished) {
            matches = false;
        }
        
        if (parking && !property.parking) {
            matches = false;
        }
        
        return matches;
    });
    
    // Reset to first page
    currentPage = 1;
    
    // Render filtered results
    renderProperties();
    
    // Update URL with filters
    updateURLWithFilters();
}

// Reset filters
window.resetFilters = function() {
    // Reset form fields
    const filterForm = document.getElementById('filterForm');
    if (filterForm) filterForm.reset();
    
    // Reset filtered properties
    filteredProperties = [...allProperties];
    
    // Reset to first page
    currentPage = 1;
    
    // Render all properties
    renderProperties();
    
    // Clear URL params
    window.history.pushState({}, '', '/properties.html');
};

// Apply sorting
function applySorting(sortBy) {
    switch(sortBy) {
        case 'price-low':
            filteredProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProperties.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProperties.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
            break;
        case 'most-viewed':
            filteredProperties.sort((a, b) => b.views - a.views);
            break;
        default:
            // Default sorting (featured first)
            filteredProperties.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    renderProperties();
}

// Handle URL parameters
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for search params
    const location = urlParams.get('location');
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const bedrooms = urlParams.get('bedrooms');
    const type = urlParams.get('type');
    
    // Set form values if present
    if (location) document.getElementById('filterLocation').value = location;
    if (minPrice) document.getElementById('priceMin').value = minPrice;
    if (maxPrice) document.getElementById('priceMax').value = maxPrice;
    if (bedrooms) document.getElementById('filterBedrooms').value = bedrooms;
    if (type) document.getElementById('filterType').value = type;
    
    // Apply filters if any params exist
    if (location || minPrice || maxPrice || bedrooms || type) {
        applyFilters();
    }
}

// Update URL with current filters
function updateURLWithFilters() {
    const params = new URLSearchParams();
    
    const location = document.getElementById('filterLocation')?.value;
    const minPrice = document.getElementById('priceMin')?.value;
    const maxPrice = document.getElementById('priceMax')?.value;
    const bedrooms = document.getElementById('filterBedrooms')?.value;
    const type = document.getElementById('filterType')?.value;
    
    if (location) params.set('location', location);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (type) params.set('type', type);
    
    const url = params.toString() ? `/properties.html?${params.toString()}` : '/properties.html';
    window.history.pushState({}, '', url);
}

// Update property counts
function updatePropertyCounts() {
    const countElement = document.getElementById('propertyCount');
    if (countElement) {
        countElement.textContent = `${filteredProperties.length} properties found`;
    }
}

// Time ago formatter
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

// Save property to localStorage
window.toggleSaveProperty = function(propertyId) {
    let saved = JSON.parse(localStorage.getItem('savedProperties')) || [];
    
    if (saved.includes(propertyId)) {
        saved = saved.filter(id => id !== propertyId);
        showToast('Property removed from saved', 'info');
    } else {
        saved.push(propertyId);
        showToast('Property saved! View in dashboard', 'success');
    }
    
    localStorage.setItem('savedProperties', JSON.stringify(saved));
    renderProperties(); // Re-render to update heart icons
};

// Check if property is saved
function isPropertySaved(propertyId) {
    const saved = JSON.parse(localStorage.getItem('savedProperties')) || [];
    return saved.includes(propertyId);
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Attach event listeners to cards
function attachCardListeners() {
    // Any additional card interactions
}

// Export for use in other files
window.allProperties = allProperties;
window.filteredProperties = filteredProperties;