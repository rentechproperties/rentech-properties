<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Details - RENTECH</title>
    <meta name="description" content="View detailed property information, photos, amenities, and contact the landlord directly.">
    
    <!-- OpenGraph / Social Media -->
    <meta property="og:title" content="Property Details - RENTECH">
    <meta property="og:description" content="View detailed property information and contact the landlord directly.">
    <meta property="og:image" content="https://rentech-properties.vercel.app/assets/og-image.jpg">
    <meta property="og:url" content="https://rentech-properties.vercel.app/property-detail.html">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon-32x32.png">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/css/styles.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Maps API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <img src="/assets/logo.png" alt="RENTECH Logo" height="40">
                <span class="logo-text">RENTECH</span>
            </div>
            
            <div class="nav-toggle" id="navToggle">
                <i class="fas fa-bars"></i>
            </div>
            
            <ul class="nav-links" id="navLinks">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/properties.html">Properties</a></li>
                <li><a href="/list-property.html">List Property</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/contact.html">Contact</a></li>
                <li class="theme-toggle-container">
                    <button id="themeToggle" class="theme-toggle">
                        <i class="fas fa-moon"></i>
                        <i class="fas fa-sun"></i>
                    </button>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Loading Spinner -->
    <div id="loading-spinner" class="loading-spinner" style="display: none;">
        <div class="spinner"></div>
        <p>Loading property details...</p>
    </div>

    <!-- Property Detail Main Content -->
    <main class="property-detail-main">
        <div class="container">
            <!-- Property Header -->
            <div class="property-header">
                <div class="property-header-left">
                    <h1 id="property-title">Loading...</h1>
                    <div class="property-meta-top">
                        <span class="property-location" id="property-location">
                            <i class="fas fa-map-marker-alt"></i> Loading...
                        </span>
                        <span class="property-id">ID: <span id="property-id">Loading...</span></span>
                    </div>
                </div>
                <div class="property-header-right">
                    <div class="property-price" id="property-price">
                        KSh 0<span>/month</span>
                    </div>
                    <div class="property-actions-top">
                        <button class="btn-share" id="share-property">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                        <button class="btn-save" id="save-property">
                            <i class="far fa-heart"></i> Save
                        </button>
                        <button class="btn-report" id="report-property">
                            <i class="fas fa-flag"></i> Report
                        </button>
                    </div>
                </div>
            </div>

            <!-- Image Gallery -->
            <div class="property-gallery">
                <div class="main-image">
                    <img id="main-property-image" src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" alt="Property">
                    <button class="gallery-expand" onclick="openGallery()">
                        <i class="fas fa-expand"></i> View All Photos
                    </button>
                </div>
                <div class="image-thumbnails" id="image-thumbnails">
                    <!-- Thumbnails will be loaded dynamically -->
                </div>
            </div>

            <!-- Property Details Grid -->
            <div class="property-details-grid">
                <!-- Left Column -->
                <div class="details-left">
                    <!-- Key Features -->
                    <div class="key-features">
                        <div class="feature-item">
                            <i class="fas fa-bed"></i>
                            <span class="feature-label">Bedrooms</span>
                            <span class="feature-value" id="property-beds">-</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-bath"></i>
                            <span class="feature-label">Bathrooms</span>
                            <span class="feature-value" id="property-baths">-</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-vector-square"></i>
                            <span class="feature-label">Size</span>
                            <span class="feature-value" id="property-size">-</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-car"></i>
                            <span class="feature-label">Parking</span>
                            <span class="feature-value" id="property-parking">-</span>
                        </div>
                    </div>

                    <!-- Verification Badges -->
                    <div class="verification-section">
                        <h3>Verification Status</h3>
                        <div class="verification-badges" id="verification-badges">
                            <!-- Badges will be loaded dynamically -->
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="description-section">
                        <h3>About This Property</h3>
                        <p id="property-description">Loading description...</p>
                    </div>

                    <!-- Amenities -->
                    <div class="amenities-section">
                        <h3>Amenities & Features</h3>
                        <div class="amenities-grid" id="amenities-list">
                            <!-- Amenities will be loaded dynamically -->
                        </div>
                    </div>

                    <!-- Tabs (Overview, Map, Nearby) -->
                    <div class="property-tabs">
                        <div class="tab-headers">
                            <button class="tab-btn active" data-tab="overview">Overview</button>
                            <button class="tab-btn" data-tab="map">Map & Location</button>
                            <button class="tab-btn" data-tab="nearby">Nearby Places</button>
                        </div>
                        
                        <div class="tab-content">
                            <div class="tab-pane active" id="overview">
                                <h4>Property Overview</h4>
                                <ul class="overview-list">
                                    <li><i class="fas fa-check-circle"></i> Verified Property</li>
                                    <li><i class="fas fa-check-circle"></i> Direct Landlord</li>
                                    <li><i class="fas fa-check-circle"></i> No Agent Fees</li>
                                    <li><i class="fas fa-check-circle"></i> Immediate Move-in Available</li>
                                </ul>
                            </div>
                            
                            <div class="tab-pane" id="map">
                                <div id="property-map" class="property-map" style="height: 300px;">
                                    <!-- Map will be loaded dynamically -->
                                </div>
                                <p class="map-note">*Exact location shared after inquiry</p>
                            </div>
                            
                            <div class="tab-pane" id="nearby">
                                <div class="nearby-grid">
                                    <div class="nearby-category">
                                        <h5><i class="fas fa-school"></i> Schools</h5>
                                        <ul id="nearby-schools">
                                            <li>Loading...</li>
                                        </ul>
                                    </div>
                                    <div class="nearby-category">
                                        <h5><i class="fas fa-bus"></i> Transport</h5>
                                        <ul id="nearby-transport">
                                            <li>Loading...</li>
                                        </ul>
                                    </div>
                                    <div class="nearby-category">
                                        <h5><i class="fas fa-shopping-cart"></i> Shopping</h5>
                                        <ul id="nearby-shopping">
                                            <li>Loading...</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Contact Section -->
                <div class="details-right">
                    <div class="contact-card">
                        <h3>Contact Landlord</h3>
                        
                        <div class="landlord-info">
                            <div class="landlord-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="landlord-details">
                                <h4 id="landlord-name">Verified Landlord</h4>
                                <p id="landlord-phone">+254 XXX XXX XXX</p>
                                <p class="landlord-meta">
                                    <span><i class="fas fa-calendar"></i> Member since <span id="landlord-member-since">2025</span></span>
                                    <span><i class="fas fa-clock"></i> Response: <span id="landlord-response-rate">< 1 hour</span></span>
                                </p>
                            </div>
                        </div>
                        
                        <div class="contact-actions">
                            <a href="#" id="whatsapp-landlord" class="btn-whatsapp-large" target="_blank">
                                <i class="fab fa-whatsapp"></i>
                                WhatsApp Landlord
                            </a>
                            
                            <a href="#" id="call-landlord" class="btn-call">
                                <i class="fas fa-phone"></i>
                                Call Landlord
                            </a>
                            
                            <button class="btn-schedule" id="schedule-viewing">
                                <i class="fas fa-calendar-check"></i>
                                Schedule Viewing
                            </button>
                        </div>
                        
                        <div class="safety-note">
                            <i class="fas fa-shield-alt"></i>
                            <p>Always inspect the property in person before making any payment. RENTECH verifies all landlords, but please stay vigilant.</p>
                        </div>
                    </div>
                    
                    <!-- Similar Properties -->
                    <div class="related-properties">
                        <h4>Similar Properties</h4>
                        <div id="related-properties" class="related-grid">
                            <!-- Related properties will be loaded dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Gallery Modal -->
    <div id="gallery-modal" class="modal">
        <div class="modal-content gallery-content">
            <span class="close-gallery">&times;</span>
            <div class="gallery-container">
                <div class="gallery-images" id="gallery-images">
                    <!-- Gallery images will be loaded dynamically -->
                </div>
            </div>
        </div>
    </div>

    <!-- Schedule Viewing Modal -->
    <div id="schedule-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Schedule a Viewing</h3>
                <span class="close" onclick="closeScheduleModal()">&times;</span>
            </div>
            
            <div class="modal-body">
                <div class="property-summary">
                    <h4 id="modal-property-title">Property Title</h4>
                    <p id="modal-property-price">KSh 0/month</p>
                </div>
                
                <form id="scheduleForm" onsubmit="event.preventDefault(); submitViewingSchedule();">
                    <div class="form-group">
                        <label for="viewing-date">Preferred Date</label>
                        <input type="date" id="viewing-date" required min="2026-03-18">
                    </div>
                    
                    <div class="form-group">
                        <label for="viewing-time">Preferred Time</label>
                        <select id="viewing-time" required>
                            <option value="">Select time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="viewer-name">Your Full Name</label>
                        <input type="text" id="viewer-name" required placeholder="Enter your full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="viewer-phone">Your Phone Number</label>
                        <input type="tel" id="viewer-phone" required placeholder="07XX XXX XXX">
                    </div>
                    
                    <div class="form-group">
                        <label for="viewer-notes">Additional Notes (Optional)</label>
                        <textarea id="viewer-notes" rows="3" placeholder="Any questions or special requests?"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        <i class="fab fa-whatsapp"></i> Send via WhatsApp
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Report Property Modal -->
    <div id="report-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Report This Listing</h3>
                <span class="close" onclick="closeReportModal()">&times;</span>
            </div>
            
            <div class="modal-body">
                <p>Help us keep RENTECH safe. Let us know why you're reporting this listing.</p>
                
                <form id="reportForm" onsubmit="event.preventDefault(); submitReport();">
                    <div class="form-group">
                        <label for="report-reason">Reason for Report</label>
                        <select id="report-reason" required>
                            <option value="">Select a reason</option>
                            <option value="scam">Suspected scam</option>
                            <option value="fake">Fake listing</option>
                            <option value="wrong">Wrong information</option>
                            <option value="sold">Already rented/sold</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="report-details">Additional Details</label>
                        <textarea id="report-details" rows="4" placeholder="Please provide any additional information..."></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">Submit Report</button>
                </form>
                
                <p class="report-note">Our team will review this listing within 24 hours.</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <img src="/assets/logo.png" alt="RENTECH" height="40">
                    <p>Kenya's first AI-powered verified property marketplace. No agents, no scams, just direct connections.</p>
                    
                    <div class="social-links">
                        <a href="https://wa.me/254100403629" target="_blank"><i class="fab fa-whatsapp"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-tiktok"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-x-twitter"></i></a>
                    </div>
                </div>
                
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/properties.html">Browse Properties</a></li>
                        <li><a href="/list-property.html">List Your Property</a></li>
                        <li><a href="/about.html">About Us</a></li>
                        <li><a href="/contact.html">Contact</a></li>
                        <li><a href="/faq.html">FAQ</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Locations</h4>
                    <ul>
                        <li><a href="/locations/kilimani.html">Kilimani</a></li>
                        <li><a href="/locations/westlands.html">Westlands</a></li>
                        <li><a href="/locations/kileleshwa.html">Kileleshwa</a></li>
                        <li><a href="/locations/lavington.html">Lavington</a></li>
                        <li><a href="/locations/karen.html">Karen</a></li>
                        <li><a href="/locations/south-b.html">South B</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="/terms.html">Terms of Service</a></li>
                        <li><a href="/privacy.html">Privacy Policy</a></li>
                        <li><a href="/cookies.html">Cookie Policy</a></li>
                        <li><a href="/disclaimer.html">Disclaimer</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><i class="fas fa-phone"></i> +254 100 403629</li>
                        <li><i class="fas fa-envelope"></i> hello@rentech.co.ke</li>
                        <li><i class="fas fa-map-marker-alt"></i> Nairobi, Kenya</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2026 RENTECH. All rights reserved. Proudly Kenyan 🇰🇪</p>
            </div>
        </div>
    </footer>

    <!-- Floating Action Buttons -->
    <div class="fab-container">
        <a href="https://wa.me/254100403629" class="fab wa-float" target="_blank" title="Chat on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
        
        <button class="fab ai-fab" onclick="openAIChat()" title="Ask Rentech AI">
            <i class="fas fa-robot"></i>
        </button>
        
        <button class="fab scroll-top" id="scrollTop" title="Scroll to top">
            <i class="fas fa-arrow-up"></i>
        </button>
    </div>

    <!-- JavaScript -->
    <script src="/js/main.js"></script>
    <script src="/js/properties.js"></script>
    <script src="/js/property-detail.js"></script>
    <script src="/js/chat.js"></script>
</body>
</html>