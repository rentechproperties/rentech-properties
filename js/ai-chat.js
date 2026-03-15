// ============================================
// RENTECH PROPERTIES - AI CHATBOT
// Standalone chatbot functionality
// ============================================

// Chat state
let chatOpen = false;
let conversationHistory = [];

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initChatWidget();
});

// ============================================
// INITIALIZE CHAT WIDGET
// ============================================
function initChatWidget() {
    // Add welcome message
    setTimeout(() => {
        const chatBody = document.getElementById('chatBody');
        if (chatBody && chatBody.children.length === 0) {
            addBotMessage("Hello! 👋 Welcome to Rentech Properties. How can I help you find your perfect home today?");
        }
    }, 1000);
}

// ============================================
// TOGGLE CHAT WIDGET
// ============================================
function toggleChat() {
    const panel = document.getElementById('chatPanel');
    if (!panel) return;
    
    chatOpen = !chatOpen;
    panel.classList.toggle('open', chatOpen);
    
    if (chatOpen) {
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    }
}

// ============================================
// ADD MESSAGES
// ============================================
function addUserMessage(text) {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-message user';
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    conversationHistory.push({ role: 'user', content: text });
}

function addBotMessage(text) {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-message bot';
    msgDiv.innerHTML = '<strong>Assistant</strong><br>' + text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    conversationHistory.push({ role: 'bot', content: text });
}

// ============================================
// QUICK REPLY HANDLER
// ============================================
function chatAnswer(type) {
    const responses = {
        properties: "We have properties across Nairobi:\n• Kilimani: 2BR from 65K\n• Westlands: Studios from 35K\n• Kasarani: Bedsitters from 12K\n• Karen: Luxury homes from 75K\n\nWhich area interests you?",
        areas: "We cover all Nairobi:\n📍 Kilimani • Westlands • Kasarani\n📍 South B/C • Lang'ata • Lavington\n📍 Karen • Eastleigh • Embakasi\n📍 Ruaka • Parklands • Runda\n\nBrowse all at rentech.co.ke/properties.html",
        contact: "📞 +254 723 783 337\n📧 rentechproperties.ke@gmail.com\n💬 WhatsApp: wa.me/254723783337\n📍 Nairobi City, Kenya\n\nWe're available 24/7!",
        list: "To list your property:\n1. Click 'List Property Free'\n2. Fill the 4-step form\n3. Get verified in 24hrs\n4. Receive qualified tenants\n\nZero upfront cost! Only 5% on move-in."
    };
    
    addBotMessage(responses[type] || "How can I help you today?");
}

// ============================================
// SEND CHAT MESSAGE
// ============================================
function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const msg = input.value.trim();
    if (!msg) return;
    
    addUserMessage(msg);
    input.value = '';
    
    // Generate response
    setTimeout(() => {
        const response = generateResponse(msg);
        addBotMessage(response);
    }, 800);
}

// ============================================
// GENERATE AI RESPONSE
// ============================================
function generateResponse(input) {
    const lowercaseInput = input.toLowerCase();
    
    // Greetings
    if (lowercaseInput.match(/\b(hello|hi|hey|howdy)\b/)) {
        return "Hello! 👋 Welcome to Rentech Properties. Looking for a home or want to list your property?";
    }
    
    // Property search
    if (lowercaseInput.includes('find') || lowercaseInput.includes('looking for') || lowercaseInput.includes('search')) {
        return getPropertyMatchResponse(lowercaseInput);
    }
    
    // Area-specific
    const areas = ['kilimani', 'westlands', 'kasarani', 'south b', 'south c', 'eastleigh', 'langata', 'lavington', 'karen', 'embakasi', 'ruaka'];
    for (const area of areas) {
        if (lowercaseInput.includes(area)) {
            return `We have several properties in ${area}. You can view them here: https://rentech-properties.vercel.app/properties.html?area=${encodeURIComponent(area)}. Would you like me to suggest some based on your budget?`;
        }
    }
    
    // Price/Affordability
    if (lowercaseInput.includes('price') || lowercaseInput.includes('afford') || lowercaseInput.includes('budget') || lowercaseInput.includes('cost') || lowercaseInput.includes('rent')) {
        return "Our properties range from KSh 8,000 (bedsitters) to KSh 180,000+ (luxury homes). Suggested areas by budget:\n• Under 15K: Kasarani, Eastleigh\n• 15K-30K: South B, Ruaka\n• 30K-60K: Kilimani, Westlands\n• Over 60K: Karen, Lavington";
    }
    
    // List property
    if (lowercaseInput.includes('list') || lowercaseInput.includes('landlord') || lowercaseInput.includes('submit')) {
        return "To list your property, visit https://rentech-properties.vercel.app/list-property.html. It's free to list! We only charge 5% commission when your tenant moves in.";
    }
    
    // Verification/Safety
    if (lowercaseInput.includes('verify') || lowercaseInput.includes('scam') || lowercaseInput.includes('safe') || lowercaseInput.includes('trust')) {
        return "Rentech verifies every landlord by checking their National ID and property title deed. We also conduct physical inspections before listings go live. Our AI scam detection runs 24/7.";
    }
    
    // Contact
    if (lowercaseInput.includes('whatsapp') || lowercaseInput.includes('contact') || lowercaseInput.includes('call') || lowercaseInput.includes('phone')) {
        return "You can reach us on WhatsApp at +254 723 783 337 (click the green button on the bottom right). Our email is rentechproperties.ke@gmail.com, and we're based in Nairobi City, Kenya.";
    }
    
    // Property types
    if (lowercaseInput.includes('bedsitter')) {
        return "We have bedsitters in Kasarani (KSh 8K-15K), Eastleigh (KSh 8K-12K), and South C (KSh 12K-18K). Check them out at https://rentech-properties.vercel.app/properties.html?type=Bedsitter";
    }
    if (lowercaseInput.includes('studio')) {
        return "Studios are available in Westlands (KSh 25K-45K), Kilimani (KSh 30K-50K), and Lavington (KSh 40K-60K). View all at https://rentech-properties.vercel.app/properties.html?type=Studio";
    }
    if (lowercaseInput.includes('1br') || lowercaseInput.includes('1 bedroom')) {
        return "1-bedroom apartments are available in South B (KSh 25K-35K), Kilimani (KSh 40K-65K), and Kasarani (KSh 15K-25K). Browse at https://rentech-properties.vercel.app/properties.html?type=1BR";
    }
    if (lowercaseInput.includes('2br') || lowercaseInput.includes('2 bedroom')) {
        return "2-bedroom homes are in Kilimani (KSh 50K-80K), Westlands (KSh 60K-100K), and Lang'ata (KSh 40K-70K). See all at https://rentech-properties.vercel.app/properties.html?type=2BR";
    }
    
    // How it works
    if (lowercaseInput.includes('how it works') || lowercaseInput.includes('how does')) {
        return "For tenants: Search verified listings → Contact landlord via WhatsApp → Schedule viewing → Move in! For landlords: List free → We verify your documents → Get qualified tenants → Pay 5% only on move-in.";
    }
    
    // Default response
    return "I didn't quite get that. Try asking me about:\n• Finding properties in specific areas\n• Rental prices\n• How to list your property\n• Verification and safety\n\nOr click one of the quick reply buttons below!";
}

// ============================================
// GET PROPERTY MATCH RESPONSE
// ============================================
function getPropertyMatchResponse(input) {
    // Try to extract area
    const areas = ['kilimani', 'westlands', 'kasarani', 'south b', 'south c', 'eastleigh', 'langata', 'lavington', 'karen', 'embakasi', 'ruaka'];
    let matchedArea = null;
    
    for (const area of areas) {
        if (input.includes(area)) {
            matchedArea = area;
            break;
        }
    }
    
    // Try to extract budget
    const budgetMatch = input.match(/(\d+)\s*k/);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) * 1000 : null;
    
    // Build response
    let response = "I found some properties that might interest you:\n\n";
    
    // Use global PROPERTIES if available
    if (typeof PROPERTIES_DB !== 'undefined') {
        let matches = [...PROPERTIES_DB];
        
        if (matchedArea) {
            matches = matches.filter(p => p.area.toLowerCase().includes(matchedArea));
        }
        if (budget) {
            matches = matches.filter(p => p.price <= budget * 1.2 && p.price >= budget * 0.8);
        }
        
        if (matches.length > 0) {
            const selected = matches.slice(0, 3);
            selected.forEach(p => {
                response += `• ${p.title} in ${p.area}: KSh ${p.price.toLocaleString()}/month (${p.beds} bed, ${p.baths} bath)\n`;
            });
            response += `\nView all at https://rentech-properties.vercel.app/properties.html${matchedArea ? '?area=' + matchedArea : ''}`;
        } else {
            response = "I couldn't find exact matches. Try adjusting your criteria or browse all properties at https://rentech-properties.vercel.app/properties.html";
        }
    } else {
        response = "You can browse all our verified properties at https://rentech-properties.vercel.app/properties.html";
    }
    
    return response;
}

// Make functions globally available
window.toggleChat = toggleChat;
window.chatAnswer = chatAnswer;
window.sendChat = sendChat;