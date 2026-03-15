/* ============================================
   RENTECH PROPERTIES - MAIN.JS
   ============================================ */

// Scroll to top button visibility
window.addEventListener('scroll', () => {
    const stbtn = document.getElementById('stbtn');
    if (stbtn) {
        if (window.scrollY > 300) {
            stbtn.classList.add('visible');
        } else {
            stbtn.classList.remove('visible');
        }
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Rentech Properties loaded');
});
