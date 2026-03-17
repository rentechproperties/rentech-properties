// ============================================
// RENTECH PROPERTIES - PROPERTY DETAIL JS
// Handles individual property page functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Property detail page loaded');
    
    // Get property ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    // Load property data
    if (propertyId && typeof propertyDatabase !== 'undefined') {
        loadPropertyDetails(propertyId);
    }
    
    // Initialize gallery
    initImageGallery();
    
    // Setup contact buttons
    setupContactButtons();
});

function loadPropertyDetails(id) {
    // Find property in database
    const property = propertyDatabase.find(p => p.id == id);
    
    if (property) {
        // Update page title
        document.title = ${property.title} - RENTECH;
        
        // Populate fields
        document.getElementById('property-title').textContent = property.title;
        document.getElementById('property-price').textContent = KES /month;
        document.getElementById('property-location').textContent = property.location;
        document.getElementById('property-bedrooms').textContent = property.bedrooms;
        document.getElementById('property-bathrooms').textContent = property.bathrooms;
        
        // Set main image
        if (property.images && property.images[0]) {
            document.getElementById('main-image').src = property.images[0];
        }
    }
}

function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.getElementById('main-image').src = this.src;
        });
    });
}

function setupContactButtons() {
    // WhatsApp button
    const waBtn = document.getElementById('whatsapp-contact');
    if (waBtn) {
        waBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = this.dataset.phone || '254700000000';
            const message = encodeURIComponent('Hello, I\'m interested in this property from RENTECH');
            window.open(https://wa.me/?text=, '_blank');
        });
    }
    
    // Call button
    const callBtn = document.getElementById('call-landlord');
    if (callBtn) {
        callBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = this.dataset.phone || '254700000000';
            window.location.href = 	el:;
        });
    }
}

// Floating action button for scroll to top
window.addEventListener('scroll', function() {
    const scrollBtn = document.querySelector('.scroll-top');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
});
