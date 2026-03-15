// ============================================
// RENTECH PROPERTIES - MAIN JAVASCRIPT
// All core functionality in one file
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initThemeToggle();
    initCounters();
    initFaqAccordion();
    renderProperties();
    initAIMatch();
    initMobileMenu();
});

// ============================================
// PROPERTIES DATA
// ============================================
const PROPERTIES = [
    {
        id: 1,
        title: "Modern 2BR Apartment",
        area: "Kilimani",
        price: 65000,
        beds: 2,
        baths: 1,
        size: 85,
        type: "2BR",
        furnished: true,
        badge: "Featured",
        status: "Available Now",
        emoji: "🏢",
        amenities: ["Security", "Parking", "Generator", "CCTV"],
        desc: "Spacious 2-bedroom in heart of Kilimani. Walking distance to Yaya Centre.",
        img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
    },
    {
        id: 2,
        title: "Executive Studio",
        area: "Westlands",
        price: 35000,
        beds: 1,
        baths: 1,
        size: 45,
        type: "Studio",
        furnished: true,
        badge: "New",
        status: "Available Now",
        emoji: "🏙️",
        amenities: ["Borehole", "Security", "Lift", "CCTV"],
        desc: "Well-maintained studio with city views. Near Sarit Centre.",
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"
    },
    {
        id: 3,
        title: "Affordable Bedsitter",
        area: "Kasarani",
        price: 12000,
        beds: 1,
        baths: 1,
        size: 25,
        type: "Bedsitter",
        furnished: false,
        badge: "",
        status: "Available Now",
        emoji: "🏠",
        amenities: ["Parking", "Borehole"],
        desc: "Clean bedsitter near Kasarani Stadium. Reliable water.",
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
    },
    {
        id: 4,
        title: "3BR Family Maisonette",
        area: "Lang'ata",
        price: 85000,
        beds: 3,
        baths: 2,
        size: 140,
        type: "Maisonette",
        furnished: false,
        badge: "Featured",
        status: "Available Now",
        emoji: "🏡",
        amenities: ["DSQ", "Security", "Parking", "Generator"],
        desc: "Spacious 3-bedroom maisonette with DSQ. Quiet estate.",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
    },
    {
        id: 5,
        title: "1BR South B Apartment",
        area: "South B",
        price: 28000,
        beds: 1,
        baths: 1,
        size: 55,
        type: "1BR",
        furnished: false,
        badge: "New",
        status: "Available Now",
        emoji: "🏢",
        amenities: ["Lift", "Security", "Parking"],
        desc: "Newly renovated 1-bedroom. Easy CBD access.",
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80"
    },
    {
        id: 6,
        title: "Luxury Furnished Studio",
        area: "Lavington",
        price: 55000,
        beds: 1,
        baths: 1,
        size: 50,
        type: "Studio",
        furnished: true,
        badge: "",
        status: "Available Now",
        emoji: "✨",
        amenities: ["Pool", "Gym", "Security", "Parking", "CCTV"],
        desc: "Executive studio in Lavington. Shared pool, gym.",
        img: "https://images.unsplash.com/photo-1630699144339-420f59b4747a?w=600&q=80"
    }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatKSh(amount) {
    return 'KSh ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function waLink(message) {
    return 'https://wa.me/254723783337?text=' + encodeURIComponent(message);
}

// ============================================
// RENDER PROPERTIES
// ============================================
function renderProperties() {
    const grid = document.getElementById('prop-grid');
    if (!grid) return;
    
    let html = '';
    PROPERTIES.forEach(p => {
        const waMsg = `Hi! I'm interested in ${p.title} in ${p.area} at ${formatKSh(p.price)}/month. Is it still available?`;
        
        html += `
            <div class="property-card">
                <div class="property-image">
                    <img src="${p.img}" alt="${p.title}" loading="lazy">
                    <div class="property-badges">
                        <span class="badge verified">✓ Verified</span>
                        ${p.badge ? '<span class="badge featured">⭐ ' + p.badge + '</span>' : ''}
                    </div>
                </div>
                <div class="property-content">
                    <div class="property-location">📍 ${p.area}</div>
                    <h3 class="property-title">${p.title}</h3>
                    <div class="property-price">${formatKSh(p.price)}<em>/month</em></div>
                    <div class="property-specs">
                        <span>🛏️ ${p.beds} Bed${p.beds > 1 ? 's' : ''}</span>
                        <span>🚿 ${p.baths} Bath</span>
                    </div>
                    <div class="property-actions">
                        <a href="property-detail.html?id=${p.id}" class="btn-details">View Details</a>
                        <a href="${waLink(waMsg)}" target="_blank" class="btn-wa">💬 WhatsApp</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
function initNavigation() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ============================================
// SCROLL EFFECTS (Back to top button)
// ============================================
function initScrollEffects() {
    const stbtn = document.getElementById('stbtn');
    if (!stbtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            stbtn.classList.add('visible');
        } else {
            stbtn.classList.remove('visible');
        }
    });
}

// ============================================
// THEME TOGGLE (Dark/Light mode)
// ============================================
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('rt_theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeBtn.textContent = '☀️';
    }
    
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-mode');
        const isLight = document.documentElement.classList.contains('light-mode');
        themeBtn.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('rt_theme', isLight ? 'light' : 'dark');
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = text;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
        }
    }, 30);
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFaqAccordion() {
    // Make toggleFaq available globally
    window.toggleFaq = function(header) {
        const item = header.closest('.faq-item');
        const body = item.querySelector('.faq-body');
        const icon = header.querySelector('.faq-icon');
        const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';
        
        // Close all others
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.faq-body').style.maxHeight = '0';
                otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
            }
        });
        
        if (isOpen) {
            body.style.maxHeight = '0';
            icon.style.transform = 'rotate(0deg)';
        } else {
            body.style.maxHeight = body.scrollHeight + 'px';
            icon.style.transform = 'rotate(45deg)';
        }
    };
}

// ============================================
// AI MATCH BUTTON
// ============================================
function initAIMatch() {
    const aiBtn = document.getElementById('ai-match-btn');
    if (!aiBtn) return;
    
    aiBtn.addEventListener('click', function() {
        const budget = document.getElementById('match-budget')?.value || 'Not specified';
        const area = document.getElementById('match-area')?.value || 'Any';
        const beds = document.getElementById('match-beds')?.value || 'Any';
        const moveIn = document.getElementById('match-movein')?.value || 'Anytime';
        
        const message = `*NEW AI MATCH REQUEST* 🤖%0A%0A📍 *Area:* ${area}%0A💰 *Budget:* ${budget}%0A🛏️ *Beds:* ${beds}%0A📅 *Move-in:* ${moveIn}%0A%0APlease send me matching properties!`;
        
        window.open(`https://wa.me/254723783337?text=${message}`, '_blank');
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const ham = document.getElementById('ham');
    const mob = document.getElementById('mob-menu');
    
    if (!ham || !mob) return;
    
    ham.addEventListener('click', () => {
        const open = mob.classList.toggle('open');
        if (open) {
            ham.children[0].style.transform = 'rotate(45deg) translate(5px,5px)';
            ham.children[1].style.opacity = '0';
            ham.children[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
        } else {
            ham.children[0].style.transform = '';
            ham.children[1].style.opacity = '';
            ham.children[2].style.transform = '';
        }
    });
    
    // Close menu when clicking a link
    mob.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mob.classList.remove('open');
            ham.children[0].style.transform = '';
            ham.children[1].style.opacity = '';
            ham.children[2].style.transform = '';
        });
    });
}

// ============================================
// LOADER ANIMATION
// ============================================
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('gone');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 800);
        }
    }, 2800);
});

// ============================================
// CHATBOT FUNCTIONS (Global)
// ============================================
window.toggleChat = function() {
    const panel = document.getElementById('chatPanel');
    if (panel) panel.classList.toggle('open');
};

const chatAnswers = {
    properties: "We have properties across Nairobi:\n• Kilimani: 2BR from 65K\n• Westlands: Studios from 35K\n• Kasarani: Bedsitters from 12K\n• Karen: Luxury homes from 75K\n\nWhich area interests you?",
    areas: "We cover all Nairobi:\n📍 Kilimani • Westlands • Kasarani\n📍 South B/C • Lang'ata • Lavington\n📍 Karen • Eastleigh • Embakasi\n📍 Ruaka • Parklands • Runda",
    contact: "📞 +254 723 783 337\n📧 rentechproperties.ke@gmail.com\n💬 WhatsApp: wa.me/254723783337\n📍 Nairobi City, Kenya",
    list: "To list your property:\n1. Click 'List Property Free'\n2. Fill the 4-step form\n3. Get verified in 24hrs\n4. Receive qualified tenants\n\nZero upfront cost! Only 5% on move-in."
};

window.chatAnswer = function(type) {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-message bot';
    msgDiv.innerHTML = '<strong>Assistant</strong><br>' + (chatAnswers[type] || "How can I help you?");
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
};

window.sendChat = function() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const msg = input.value.trim();
    if (!msg) return;
    
    const chatBody = document.getElementById('chatBody');
    
    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'ai-message user';
    userDiv.textContent = msg;
    chatBody.appendChild(userDiv);
    input.value = '';
    
    // Auto response
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'ai-message bot';
        let response = "Thanks for your message! Our team will respond shortly. For urgent help, WhatsApp +254 723 783 337";
        
        const lowerMsg = msg.toLowerCase();
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            response = "Hello! 👋 Welcome to Rentech Properties. Looking for a home or want to list your property?";
        } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('rent')) {
            response = "Our properties range from KSh 8,000 (bedsitters) to KSh 180,000+ (luxury homes). Use our Rent Calculator to find your budget!";
        } else if (lowerMsg.includes('kilimani') || lowerMsg.includes('westlands') || lowerMsg.includes('karen')) {
            response = "We have several properties in that area! Visit rentech.co.ke/properties.html to see available listings.";
        }
        
        botDiv.innerHTML = '<strong>Assistant</strong><br>' + response;
        chatBody.appendChild(botDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
};