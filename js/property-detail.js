// js/property-detail.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate QR Code for this specific page
    const currentURL = window.location.href;
    const qrImage = document.getElementById('property-qr');
    
    // Using the free QRServer API
    if (qrImage) {
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentURL)}&bgcolor=ffffff&color=000000&margin=10`;
    }

    // 2. Map Dynamic Interaction
    // In a real app, you would pull the 'q' parameter from your database
    const propertyLocation = "Rhapta Road, Westlands, Nairobi";
    const mapIframe = document.querySelector('.map-container iframe');
    
    // If you don't have an API key yet, you can use the 'Search' embed URL style:
    if (mapIframe && mapIframe.src.includes('YOUR_GOOGLE_MAPS_API_KEY')) {
        mapIframe.src = `https://www.google.com/maps?q=${encodeURIComponent(propertyLocation)}&output=embed`;
    }

    // 3. Simple Gallery Switcher
    const mainImg = document.querySelector('.gallery-grid > img');
    const sideImgs = document.querySelectorAll('.side-imgs img');

    sideImgs.forEach(img => {
        img.addEventListener('click', () => {
            const tempSrc = mainImg.src;
            mainImg.src = img.src;
            img.src = tempSrc;
            
            // Add a little snap animation
            mainImg.style.animation = 'none';
            mainImg.offsetHeight; // trigger reflow
            mainImg.style.animation = 'fadeUp 0.3s ease';
        });
    });
});