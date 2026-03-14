// js/properties.js

const properties = [
  {id:1, title:"Modern 2BR Apartment", area:"Kilimani", price:65000, beds:2, baths:1, size:85, type:"2BR", furnished:true, badge:"Featured", status:"Available Now", emoji:"🏢", amenities:["Security","Parking","Generator","CCTV"], desc:"Spacious 2-bedroom in heart of Kilimani. Walking distance to Yaya Centre. All-day water, backup generator."},
  {id:2, title:"Executive Studio", area:"Westlands", price:35000, beds:1, baths:1, size:45, type:"Studio", furnished:true, badge:"New", status:"Available Now", emoji:"🏙️", amenities:["Borehole","Security","Lift","CCTV"], desc:"Well-maintained studio with city views. Near Sarit Centre and major banks."},
  {id:3, title:"Affordable Bedsitter", area:"Kasarani", price:12000, beds:1, baths:1, size:25, type:"Bedsitter", furnished:false, badge:"", status:"Available Now", emoji:"🏠", amenities:["Parking","Borehole"], desc:"Clean bedsitter near Kasarani Stadium. Reliable water. Ideal for students."},
  {id:4, title:"3BR Family Maisonette", area:"Lang’ata", price:85000, beds:3, baths:2, size:140, type:"Maisonette", furnished:false, badge:"Featured", status:"Available Now", emoji:"🏡", amenities:["DSQ","Security","Parking","Generator"], desc:"Spacious 3-bedroom maisonette with DSQ. Quiet estate, great schools nearby."},
  {id:5, title:"1BR South B Apartment", area:"South B", price:28000, beds:1, baths:1, size:55, type:"1BR", furnished:false, badge:"New", status:"Available Now", emoji:"🏢", amenities:["Lift","Security","Parking"], desc:"Newly renovated 1-bedroom. Easy CBD access via Mombasa Road."},
  {id:6, title:"Luxury Furnished Studio", area:"Lavington", price:55000, beds:1, baths:1, size:50, type:"Studio", furnished:true, badge:"", status:"Available Now", emoji:"✨", amenities:["Pool","Gym","Security","Parking","CCTV"], desc:"Executive studio in Lavington. Shared pool, gym, 24hr security. Perfect for expats."},
  {id:7, title:"Budget Bedsitter", area:"Eastleigh", price:8000, beds:1, baths:1, size:20, type:"Bedsitter", furnished:false, badge:"", status:"Available Now", emoji:"🏠", amenities:["Security","Borehole"], desc:"Affordable, clean bedsitter in Eastleigh. Close to city centre. Good transport."},
  {id:8, title:"Premium 3BR Apartment", area:"Westlands", price:120000, beds:3, baths:2, size:165, type:"3BR", furnished:true, badge:"Featured", status:"Available Now", emoji:"🌟", amenities:["Pool","Gym","Security","Parking","Generator","Lift"], desc:"Ultra-modern 3-bedroom. Rooftop pool, gym, stunning views. Best in Westlands."},
  {id:9, title:"New 2BR Kasarani", area:"Kasarani", price:22000, beds:2, baths:1, size:70, type:"2BR", furnished:false, badge:"New", status:"Available Now", emoji:"🏗️", amenities:["Parking","Borehole","Security"], desc:"Newly completed 2-bedroom. Tiled throughout, reliable water supply."},
  {id:10, title:"Garden View 1BR", area:"Karen", price:75000, beds:1, baths:1, size:65, type:"1BR", furnished:true, badge:"", status:"Available Now", emoji:"🌿", amenities:["Garden","Security","Parking","Borehole"], desc:"Serene 1-bedroom with private garden in Karen. Peace within Nairobi."},
  {id:11, title:"Studio Near South C", area:"South C", price:18000, beds:1, baths:1, size:35, type:"Studio", furnished:false, badge:"New", status:"Available Now", emoji:"🏙️", amenities:["Security","Borehole","Parking"], desc:"Modern studio in South C. Close to Nairobi CBD and Industrial Area."},
  {id:12, title:"4BR Executive Home", area:"Karen", price:180000, beds:4, baths:3, size:250, type:"4BR+", furnished:true, badge:"Featured", status:"Available Now", emoji:"🏰", amenities:["Pool","Garden","DSQ","Security","Generator","Gym"], desc:"Luxurious 4-bedroom Karen home with pool, DSQ, lush garden. Executive living."}
];

function formatKSh(number) {
  return "KSh " + number.toLocaleString();
}

function buildCard(prop) {
  const savedProps = JSON.parse(localStorage.getItem('rentech_saved') || '[]');
  const isSaved = savedProps.includes(prop.id) ? 'saved' : '';
  const heartIcon = savedProps.includes(prop.id) ? '❤️' : '🤍';
  // Function to generate a Google Maps link for Nairobi locations
function getMapUrl(area, estate) {
    const query = encodeURIComponent(`${estate}, ${area}, Nairobi, Kenya`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// Function to generate a dynamic QR Code (using a free API)
// This lets users scan a flyer or screen to get the WhatsApp link immediately
function getQRCode(propertyId) {
    const url = `https://rentech.co.ke/property/${propertyId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`;
}
  let badgeHtml = '';
  if(prop.badge) badgeHtml += `<span class="badge ${prop.badge.toLowerCase()}">${prop.badge === 'Featured' ? '⭐' : '🆕'} ${prop.badge}</span>`;
  badgeHtml += `<span class="badge">✓ Verified</span>`;

  const amenitiesHtml = prop.amenities.slice(0, 4).map(a => `<span class="amenity-pill">${a}</span>`).join('');
  
  const waMsg = encodeURIComponent(`I'm interested in ${prop.title} in ${prop.area} at KSh ${prop.price}/month. Can you arrange a viewing?`);
  const waLink = `https://wa.me/254723783337?text=${waMsg}`;

  return `
    <article class="property-card fade-up">
      <div class="card-img">
        ${prop.emoji}
        <div class="card-badges">${badgeHtml}</div>
        <button class="card-save ${isSaved}" onclick="toggleSave(${prop.id}, this)">${heartIcon}</button>
      </div>
      <div class="card-content">
        <div class="card-meta">📍 ${prop.area} · ${prop.furnished ? 'Furnished' : 'Unfurnished'}</div>
        <h3 class="card-title">${prop.title}</h3>
        <div class="card-price">${formatKSh(prop.price)} <span style="font-size:0.8rem; color:var(--muted); font-weight:400">/ month</span></div>
        <div class="card-specs">
          <span>🛏️ ${prop.beds} Beds</span>
          <span>🚿 ${prop.baths} Bath</span>
          <span>📐 ${prop.size}m²</span>
        </div>
        <div class="card-amenities">${amenitiesHtml}</div>
        <div class="card-actions">
          <a href="properties.html?id=${prop.id}" class="btn btn-outline" style="padding:8px; font-size:0.9rem">📋 Details</a>
          <a href="${waLink}" target="_blank" class="btn btn-emerald" style="padding:8px; font-size:0.9rem">💬 WhatsApp</a>
        </div>
      </div>
      <div class="verified-strip">✓ ID Verified · ✓ Inspected</div>
    </article>
  `;
}

function toggleSave(id, btnElement) {
  let saved = JSON.parse(localStorage.getItem('rentech_saved') || '[]');
  if (saved.includes(id)) {
    saved = saved.filter(item => item !== id);
    btnElement.classList.remove('saved');
    btnElement.innerText = '🤍';
  } else {
    saved.push(id);
    btnElement.classList.add('saved');
    btnElement.innerText = '❤️';
  }
  localStorage.setItem('rentech_saved', JSON.stringify(saved));
}

// Global expose
window.properties = properties;
window.buildCard = buildCard;
window.toggleSave = toggleSave;