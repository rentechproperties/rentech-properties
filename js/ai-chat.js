/* ============================================
   RENTECH PROPERTIES - AI-CHAT.JS
   Premium AI Assistant with Gold & Emerald Branding
   Version: 2.0
   ============================================ */

// ==========================================
// AI CHAT CONFIGURATION
// ==========================================

const AI_CONFIG = {
  botName: 'Rentech AI',
  botEmoji: '🤖',
  greeting: "👋 **Karibu!** I'm Rentech's AI assistant. I can help you find verified properties in Nairobi, answer questions about renting, or connect you with landlords.\n\nWhat are you looking for today?",
  quickReplies: ['🏠 Find a Home', '📋 List Property', '⭐ How It Works', '💬 WhatsApp Us'],
  colors: {
    primary: 'var(--emerald)',
    accent: 'var(--gold)',
    text: 'var(--text)',
    muted: 'var(--muted)'
  }
};

// ==========================================
// AI RESPONSES DATABASE
// ==========================================

const aiResponses = {
  // Property search related
  find: {
    keywords: ['find', 'search', 'looking', 'want', 'need', 'rent', 'apartment', 'house', 'home', 'property', 'available'],
    response: (input) => {
      const { PROPERTIES } = window.RentechProperties || {};
      if (!PROPERTIES || PROPERTIES.length === 0) {
        return "🔍 Let me help you find a property! Tell me your preferred area (like Kilimani, Westlands, Kasarani) and budget, and I'll find matches for you.";
      }
      
      // Try to extract area from input
      const areas = ['kilimani', 'westlands', 'kasarani', 'south b', 'south c', 'karen', 'lavington', 'eastleigh', 'langata', 'embakasi', 'ruaka', 'parklands', 'upperhill'];
      let matchedArea = null;
      
      for (const area of areas) {
        if (input.toLowerCase().includes(area)) {
          matchedArea = area;
          break;
        }
      }
      
      // Extract budget
      const budgetMatch = input.match(/(\d+)\s*k?/gi);
      let maxBudget = null;
      if (budgetMatch) {
        const numbers = budgetMatch.map(m => parseInt(m.replace(/[^0-9]/g, '')));
        maxBudget = Math.max(...numbers);
        // If they said something like "50k", convert to 50000
        if (input.toLowerCase().includes('k') && maxBudget < 1000) {
          maxBudget = maxBudget * 1000;
        }
      }
      
      let matching = [...PROPERTIES];
      
      if (matchedArea) {
        matching = matching.filter(p => 
          p.area.toLowerCase().includes(matchedArea)
        );
      }
      
      if (maxBudget) {
        matching = matching.filter(p => p.price <= maxBudget);
      }
      
      if (matching.length > 0) {
        const top3 = matching.slice(0, 3);
        let response = `🔍 **I found ${matching.length} properties** ${matchedArea ? `in **${matchedArea.charAt(0).toUpperCase() + matchedArea.slice(1)}**` : ''} ${maxBudget ? `under **KSh ${maxBudget.toLocaleString()}**` : ''}:\n\n`;
        
        top3.forEach((p, i) => {
          response += `${i + 1}. **${p.title}**\n`;
          response += `   📍 ${p.area} · 🛏️ ${p.beds} bed · 🚿 ${p.baths} bath\n`;
          response += `   💰 **KSh ${p.price.toLocaleString()}**/month\n`;
          if (p.badge === 'Featured') response += `   ⭐ Featured\n`;
          response += '\n';
        });
        
        response += `Would you like to [view all ${matchedArea ? matchedArea : ''} properties](properties.html${matchedArea ? `?area=${matchedArea.charAt(0).toUpperCase() + matchedArea.slice(1)}` : ''}) or schedule a viewing?`;
        return response;
      }
      
      // No matches found
      let response = "🤔 I couldn't find exact matches, but here's what's available:\n\n";
      response += "• **Under 15K**: Kasarani, Embakasi, Eastleigh\n";
      response += "• **15K-30K**: South B/C, Ruaka, Ngong Road\n";
      response += "• **30K-60K**: Kilimani, Westlands, Lang'ata\n";
      response += "• **Over 60K**: Karen, Lavington, Runda\n\n";
      response += "What budget range works for you?";
      
      return response;
    }
  },
  
  // Area specific
  areas: {
    keywords: ['kilimani', 'westlands', 'kasarani', 'south b', 'south c', 'langata', 'lavington', 
               'karen', 'eastleigh', 'embakasi', 'ruaka', 'parklands', 'upperhill', 'hurlingham',
               'ngong', 'runda', 'muthaiga', 'gigiri', 'ridgeways', 'dagoretti'],
    response: (input) => {
      const { PROPERTIES } = window.RentechProperties || {};
      
      // Find which area was mentioned
      let matchedArea = null;
      const areas = aiResponses.areas.keywords;
      
      for (const area of areas) {
        if (input.toLowerCase().includes(area)) {
          matchedArea = area;
          break;
        }
      }
      
      if (!matchedArea) return "📍 Which area in Nairobi are you interested in? I can tell you about properties in Kilimani, Westlands, Kasarani, Karen, and more!";
      
      const capitalizedArea = matchedArea.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      if (PROPERTIES) {
        const areaProperties = PROPERTIES.filter(p => 
          p.area.toLowerCase().includes(matchedArea.toLowerCase())
        );
        
        if (areaProperties.length > 0) {
          const prices = areaProperties.map(p => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
          
          let response = `📍 **${capitalizedArea}**\n\n`;
          response += `We have **${areaProperties.length} verified properties** in this area.\n\n`;
          response += `💰 **Price Range:** KSh ${minPrice.toLocaleString()} - KSh ${maxPrice.toLocaleString()}/month\n`;
          response += `📊 **Average Rent:** KSh ${avgPrice.toLocaleString()}/month\n\n`;
          
          // Show sample properties
          const samples = areaProperties.slice(0, 2);
          response += `**Sample listings:**\n`;
          samples.forEach(p => {
            response += `• **${p.title}** - KSh ${p.price.toLocaleString()}/month (${p.beds} bed)\n`;
          });
          response += '\n';
          
          response += `[🔍 Browse all ${capitalizedArea} properties](properties.html?area=${capitalizedArea})`;
          return response;
        }
      }
      
      return `📍 We're actively listing properties in ${capitalizedArea}! Would you like to [browse available options](properties.html?area=${capitalizedArea}) or tell me more about what you're looking for?`;
    }
  },
  
  // Price/Budget related
  budget: {
    keywords: ['price', 'budget', 'cost', 'much', 'cheap', 'affordable', 'expensive', 'ksh', 'money', 'rent'],
    response: (input) => {
      // Try to extract specific budget
      const budgetMatch = input.match(/(\d+)\s*k?/gi);
      if (budgetMatch) {
        const numbers = budgetMatch.map(m => parseInt(m.replace(/[^0-9]/g, '')));
        const budget = Math.max(...numbers);
        const budgetK = budget > 1000 ? budget : budget * 1000;
        
        // Suggest areas based on budget
        let suggestions = '';
        if (budgetK < 15000) {
          suggestions = 'Kasarani, Eastleigh, Embakasi, South C';
        } else if (budgetK < 30000) {
          suggestions = 'South B, Ruaka, Ngong Road, Lang\'ata';
        } else if (budgetK < 60000) {
          suggestions = 'Kilimani, Westlands, Lavington, Parklands';
        } else {
          suggestions = 'Karen, Runda, Muthaiga, Gigiri';
        }
        
        return `💰 With a budget of **KSh ${budgetK.toLocaleString()}/month**, I recommend looking in:\n\n**${suggestions}**\n\nWould you like me to show you available properties in any of these areas?`;
      }
      
      return "💰 Our properties range from **KSh 8,000/month** (bedsitters) to **KSh 180,000/month** (luxury homes).\n\nWhat's your monthly budget? I'll suggest the best areas for you.";
    }
  },
  
  // Listing property
  list: {
    keywords: ['list', 'landlord', 'sell', 'rent out', 'my property', 'submit', 'advertise', 'post'],
    response: () => {
      return "🏠 **List Your Property Free!**\n\n" +
             "✓ **AI-optimized description** - we write it for you\n" +
             "✓ **Pre-qualified tenants** - only serious leads\n" +
             "✓ **5% commission** - only when tenant moves in\n" +
             "✓ **Free listing** - zero upfront cost\n\n" +
             "The process takes just **10 minutes**:\n" +
             "1. Submit property details & photos\n" +
             "2. We verify your documents\n" +
             "3. Your listing goes live with ✓ Verified badge\n" +
             "4. Receive tenant inquiries directly on WhatsApp\n\n" +
             "✨ **Special offer:** First 3 months premium placement included!\n\n" +
             "[📋 Start Listing Now →](list-property.html)";
    }
  },
  
  // Verification/Safety
  verification: {
    keywords: ['verify', 'verified', 'safe', 'scam', 'legit', 'trust', 'real', 'authentic', 'security', 'protect'],
    response: () => {
      return "🛡️ **Your Safety is Our Priority**\n\n" +
             "Every listing on Rentech goes through a rigorous verification process:\n\n" +
             "✅ **Landlord ID Verification** - National ID checked\n" +
             "✅ **Title Deed/Lease** - Document verification\n" +
             "✅ **Physical Inspection** - We visit every property\n" +
             "✅ **AI Scam Detection** - Automated fraud checking\n\n" +
             "**Zero Tolerance Policy:**\n" +
             "If you encounter any suspicious listing, report it immediately on WhatsApp, and we'll remove it within **2 hours**.\n\n" +
             "We've maintained **0 scam agents** on our platform since 2025. 🎉";
    }
  },
  
  // WhatsApp/Contact
  contact: {
    keywords: ['whatsapp', 'contact', 'call', 'phone', 'reach', 'talk', 'speak', 'message', 'support', 'help'],
    response: () => {
      const waNumber = '254723783337';
      const waMessage = encodeURIComponent('Hello Rentech! I need assistance with finding a property.');
      
      return "💬 **Get in Touch**\n\n" +
             "**WhatsApp Business** (Fastest response)\n" +
             `[📱 +254 723 783 337](https://wa.me/${waNumber}?text=${waMessage})\n\n` +
             "**Phone**\n" +
             "📞 +254 723 783 337\n\n" +
             "**Email**\n" +
             "✉️ rentechproperties.ke@gmail.com\n\n" +
             "**Office Hours**\n" +
             "Monday - Friday: 8AM - 6PM\n" +
             "Saturday: 9AM - 1PM\n" +
             "Sunday: Closed\n\n" +
             "Our team typically responds within **30 minutes** during business hours! ⚡";
    }
  },
  
  // Property types
  types: {
    keywords: ['bedsitter', 'studio', '1br', '2br', '3br', '4br', 'maisonette', 'bedroom', 'bdrm', 'type'],
    response: (input) => {
      const { PROPERTIES } = window.RentechProperties || {};
      
      let type = null;
      let typeDisplay = null;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('bedsitter')) { type = 'Bedsitter'; typeDisplay = 'Bedsitter'; }
      else if (lowerInput.includes('studio')) { type = 'Studio'; typeDisplay = 'Studio'; }
      else if (lowerInput.includes('1br') || lowerInput.includes('1 bed')) { type = '1BR'; typeDisplay = '1 Bedroom'; }
      else if (lowerInput.includes('2br') || lowerInput.includes('2 bed')) { type = '2BR'; typeDisplay = '2 Bedroom'; }
      else if (lowerInput.includes('3br') || lowerInput.includes('3 bed')) { type = '3BR'; typeDisplay = '3 Bedroom'; }
      else if (lowerInput.includes('4br') || lowerInput.includes('4 bed')) { type = '4BR+'; typeDisplay = '4+ Bedroom'; }
      else if (lowerInput.includes('maisonette')) { type = 'Maisonette'; typeDisplay = 'Maisonette'; }
      
      if (type && PROPERTIES) {
        const matching = PROPERTIES.filter(p => p.type === type);
        if (matching.length > 0) {
          const prices = matching.map(p => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          
          let response = `🏢 **${typeDisplay} Properties**\n\n`;
          response += `We have **${matching.length} verified ${typeDisplay}** properties available.\n\n`;
          response += `💰 **Price Range:** KSh ${minPrice.toLocaleString()} - KSh ${maxPrice.toLocaleString()}/month\n`;
          response += `📊 **Average Rent:** KSh ${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString()}/month\n\n`;
          
          // Show popular areas
          const areas = [...new Set(matching.map(p => p.area))];
          response += `📍 **Popular areas:** ${areas.slice(0, 5).join(', ')}\n\n`;
          
          response += `[🔍 Browse all ${typeDisplay} properties](properties.html?type=${type})`;
          return response;
        }
      }
      
      return "🏢 **Property Types Available:**\n\n" +
             "• **Bedsitters** - KSh 8,000 - 15,000/month\n" +
             "• **Studios** - KSh 18,000 - 35,000/month\n" +
             "• **1 Bedroom** - KSh 20,000 - 45,000/month\n" +
             "• **2 Bedroom** - KSh 25,000 - 70,000/month\n" +
             "• **3 Bedroom** - KSh 40,000 - 120,000/month\n" +
             "• **4 Bedroom+** - KSh 80,000 - 250,000/month\n" +
             "• **Maisonettes** - KSh 60,000 - 180,000/month\n\n" +
             "What type are you interested in?";
    }
  },
  
  // How it works
  howItWorks: {
    keywords: ['how', 'work', 'process', 'steps', 'start', 'begin', 'guide', 'instructions'],
    response: () => {
      return "📋 **How Rentech Works**\n\n" +
             "**For Tenants (Free!):**\n" +
             "1️⃣ **Browse** - Search verified properties by area, price, type\n" +
             "2️⃣ **Contact** - Message landlord directly on WhatsApp\n" +
             "3️⃣ **Tour** - Schedule in-person or virtual viewing\n" +
             "4️⃣ **Apply** - Digital application, M-Pesa deposit\n" +
             "5️⃣ **Move In** - Commission charged to landlord only\n\n" +
             "**For Landlords:**\n" +
             "1️⃣ **List** - Submit property details & photos (10 mins)\n" +
             "2️⃣ **Verify** - We check ID & title deed (24-48 hrs)\n" +
             "3️⃣ **Publish** - Listing goes live with ✓ Verified badge\n" +
             "4️⃣ **Receive** - Pre-qualified tenants via WhatsApp\n" +
             "5️⃣ **Get Paid** - 5% commission only on successful move-in\n\n" +
             "✨ **Zero upfront costs for landlords!**";
    }
  },
  
  // Pricing/Commission
  pricing: {
    keywords: ['commission', 'fee', 'charge', 'cost', 'price', 'payment', 'pay', 'mpesa', 'deposit'],
    response: () => {
      return "💰 **Rentech Pricing**\n\n" +
             "**For Tenants:**\n" +
             "✅ **100% Free** - No viewing fees, no application fees, no hidden charges\n\n" +
             "**For Landlords:**\n" +
             "✅ **Free Listing** - Zero upfront cost\n" +
             "✅ **5% Commission** - Only when tenant moves in\n" +
             "✅ **No Tenant = No Payment** - Guaranteed\n\n" +
             "**Payment Methods:**\n" +
             "• 💳 M-Pesa (instant, secure)\n" +
             "• 🏦 Bank Transfer\n\n" +
             "All payments are traceable and confirmed via SMS notification to both parties.";
    }
  },
  
  // Greeting
  greeting: {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'jambo', 'sasa', 'habari', 'mambo', 'vipi'],
    response: () => {
      const hour = new Date().getHours();
      let timeGreeting = '';
      
      if (hour < 12) timeGreeting = 'Good morning';
      else if (hour < 18) timeGreeting = 'Good afternoon';
      else timeGreeting = 'Good evening';
      
      return `${timeGreeting}! 👋 **Karibu to Rentech** - Nairobi's most trusted rental platform.\n\nI'm your AI assistant and I can help you with:\n\n` +
             "• 🔍 Finding verified properties in any area\n" +
             "• 📋 Listing your property for free\n" +
             "• 💡 Understanding how Rentech works\n" +
             "• 📊 Getting area guides and pricing info\n" +
             "• 🛡️ Learning about our verification process\n\n" +
             "What would you like to know?";
    }
  },
  
  // Thanks
  thanks: {
    keywords: ['thank', 'thanks', 'asante', 'appreciate', 'grateful'],
    response: () => {
      const responses = [
        "You're most welcome! 😊 Is there anything else I can help you with today?",
        "Happy to help! 🙌 Let me know if you need anything else.",
        "Karibu sana! 😊 Feel free to ask if you have more questions.",
        "You're welcome! Remember, we're here 24/7 to assist you. 💚"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },
  
  // Goodbye
  goodbye: {
    keywords: ['bye', 'goodbye', 'later', 'see you', 'exit', 'quit', 'night', 'ttyl'],
    response: () => {
      return "Goodbye! 👋 I hope you find your perfect home soon.\n\n" +
             "Come back anytime for help, and don't forget to check our [new listings](properties.html) - we add verified properties daily!\n\n" +
             "Kwaheri! 🌟";
    }
  },
  
  // Help
  help: {
    keywords: ['help', 'what can you do', 'capabilities', 'features', 'options'],
    response: () => {
      return "🤖 **I can help you with:**\n\n" +
             "🔍 **Find Properties** - \"Show me 2BR in Kilimani under 50K\"\n" +
             "📍 **Area Info** - \"Tell me about Westlands rentals\"\n" +
             "💰 **Budget Advice** - \"What can I get for 30K?\"\n" +
             "🏠 **List Property** - \"How do I list my apartment?\"\n" +
             "🛡️ **Verification** - \"How do you verify landlords?\"\n" +
             "📊 **Market Info** - \"Average rent in Kasarani\"\n" +
             "💬 **Contact** - \"Chat with your team\"\n\n" +
             "Just type your question naturally, and I'll help!";
    }
  }
};

// ==========================================
// CHAT HISTORY
// ==========================================

let chatHistory = [];
const MAX_HISTORY = 50;

/**
 * Add message to history
 * @param {string} text - Message text
 * @param {string} type - 'user' or 'bot'
 */
function addToHistory(text, type) {
  chatHistory.push({ text, type, timestamp: new Date() });
  
  // Keep history manageable
  if (chatHistory.length > MAX_HISTORY) {
    chatHistory = chatHistory.slice(-MAX_HISTORY);
  }
  
  // Optional: Save to localStorage for persistence
  try {
    localStorage.setItem('rentech_chat_history', JSON.stringify(chatHistory.slice(-10)));
  } catch (e) {
    // Ignore storage errors
  }
}

// ==========================================
// CHAT FUNCTIONS
// ==========================================

/**
 * Process user input and get AI response
 * @param {string} input - User input
 * @returns {string} AI response
 */
function getAIResponse(input) {
  const lowerInput = input.toLowerCase().trim();
  
  // Check each response category
  for (const [category, data] of Object.entries(aiResponses)) {
    for (const keyword of data.keywords) {
      if (lowerInput.includes(keyword)) {
        return data.response(input);
      }
    }
  }
  
  // Check for numbers (potential budget)
  const numberMatch = lowerInput.match(/\d+/g);
  if (numberMatch) {
    return aiResponses.budget.response(input);
  }
  
  // Default fallback response
  return "🤔 I want to make sure I understand correctly.\n\n" +
         "You can ask me things like:\n" +
         "• \"Find 2BR apartments in Kilimani\"\n" +
         "• \"What's the average rent in Westlands?\"\n" +
         "• \"How do I list my property?\"\n" +
         "• \"Tell me about Rentech\"\n" +
         "• \"Help me find something under 30K\"\n\n" +
         "Or just type 'help' to see all my capabilities!";
}

/**
 * Render a message in the chat
 * @param {string} text - Message text
 * @param {string} type - 'user' or 'bot'
 * @param {boolean} save - Whether to save to history
 */
function renderMessage(text, type, save = true) {
  const messagesContainer = document.getElementById('ai-chat-messages');
  if (!messagesContainer) return;
  
  // Process markdown-like links
  let processedText = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" target="_blank" class="chat-link" style="color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold);">$1</a>'
  );
  
  // Process bold text
  processedText = processedText.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--gold);">$1</strong>');
  
  // Process bullet points
  processedText = processedText.replace(/•/g, '•');
  
  // Process newlines
  processedText = processedText.replace(/\n/g, '<br>');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${type}`;
  messageDiv.style.marginBottom = '12px';
  messageDiv.style.padding = '10px 14px';
  messageDiv.style.borderRadius = '18px';
  messageDiv.style.maxWidth = '85%';
  messageDiv.style.wordWrap = 'break-word';
  
  if (type === 'user') {
    messageDiv.style.background = 'var(--emerald)';
    messageDiv.style.color = 'white';
    messageDiv.style.alignSelf = 'flex-end';
    messageDiv.style.marginLeft = 'auto';
    messageDiv.style.borderBottomRightRadius = '4px';
  } else {
    messageDiv.style.background = 'var(--card)';
    messageDiv.style.color = 'var(--text)';
    messageDiv.style.alignSelf = 'flex-start';
    messageDiv.style.border = '1px solid var(--border)';
    messageDiv.style.borderBottomLeftRadius = '4px';
  }
  
  messageDiv.innerHTML = processedText;
  
  messagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Save to history
  if (save) {
    addToHistory(text, type);
  }
}

/**
 * Send a message
 * @param {string} text - Message text (optional)
 */
function sendMessage(text) {
  const input = document.getElementById('ai-chat-input');
  const message = text || input?.value?.trim();
  
  if (!message) return;
  
  // Render user message
  renderMessage(message, 'user');
  
  // Clear input
  if (input) input.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Get and render bot response with delay
  setTimeout(() => {
    hideTypingIndicator();
    const response = getAIResponse(message);
    renderMessage(response, 'bot');
  }, 600 + Math.random() * 400); // Random delay for natural feel
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return;
  
  const indicator = document.createElement('div');
  indicator.id = 'ai-typing-indicator';
  indicator.className = 'ai-message bot';
  indicator.style.padding = '12px 16px';
  indicator.style.background = 'var(--card)';
  indicator.style.border = '1px solid var(--border)';
  indicator.style.borderRadius = '18px';
  indicator.style.borderBottomLeftRadius = '4px';
  indicator.style.alignSelf = 'flex-start';
  indicator.style.maxWidth = '60px';
  
  indicator.innerHTML = '<span style="opacity:0.7">🤖</span> <span style="opacity:0.7">●</span><span style="opacity:0.7;animation-delay:0.2s">●</span><span style="opacity:0.7;animation-delay:0.4s">●</span>';
  
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
  const indicator = document.getElementById('ai-typing-indicator');
  if (indicator) indicator.remove();
}

/**
 * Toggle chat panel visibility
 */
function toggleChatPanel() {
  const panel = document.getElementById('ai-chat-panel');
  const trigger = document.querySelector('.ai-chat-trigger');
  
  if (panel) {
    panel.classList.toggle('open');
    
    // Show greeting if opening for first time
    if (panel.classList.contains('open')) {
      const messages = document.getElementById('ai-chat-messages');
      if (messages && messages.children.length === 0) {
        renderMessage(AI_CONFIG.greeting, 'bot');
      }
    }
  }
}

/**
 * Handle quick reply click
 * @param {string} text - Quick reply text
 */
function handleQuickReply(text) {
  // Map quick replies to natural language
  const quickReplyMap = {
    '🏠 Find a Home': 'I want to find a rental home in Nairobi',
    '📋 List Property': 'I want to list my property for rent',
    '⭐ How It Works': 'How does Rentech work?',
    '💬 WhatsApp Us': 'I want to talk to your team on WhatsApp'
  };
  
  sendMessage(quickReplyMap[text] || text);
}

/**
 * Initialize quick replies
 */
function initQuickReplies() {
  const container = document.querySelector('.ai-quick-replies');
  if (!container) return;
  
  container.innerHTML = AI_CONFIG.quickReplies.map(reply => `
    <button class="ai-quick-reply" onclick="handleQuickReply('${reply}')" 
            style="background: var(--card); border: 1px solid var(--border); color: var(--text); 
                   padding: 8px 12px; border-radius: 50px; font-size: 0.8rem; cursor: pointer;
                   transition: all 0.2s ease; margin: 4px;"
            onmouseover="this.style.borderColor='var(--gold)'; this.style.color='var(--gold)';"
            onmouseout="this.style.borderColor='var(--border)'; this.style.color='var(--text)';">
      ${reply}
    </button>
  `).join('');
}

/**
 * Load chat history from localStorage
 */
function loadChatHistory() {
  try {
    const saved = localStorage.getItem('rentech_chat_history');
    if (saved) {
      const history = JSON.parse(saved);
      history.forEach(item => {
        renderMessage(item.text, item.type, false);
      });
    }
  } catch (e) {
    // Ignore errors
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize AI chat widget
 */
function initAIChat() {
  // Setup toggle button
  const triggerBtn = document.querySelector('.ai-chat-trigger, .ai-fab, [onclick*="toggleChat"]');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', toggleChatPanel);
  }
  
  // Setup close button
  const closeBtn = document.querySelector('.ai-chat-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleChatPanel);
  }
  
  // Setup input
  const input = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  if (sendBtn) {
    sendBtn.addEventListener('click', () => sendMessage());
  }
  
  // Initialize quick replies
  initQuickReplies();
  
  // Load chat history
  loadChatHistory();
  
  console.log('🤖 Rentech AI Chat initialized with Gold & Emerald branding');
}

// Make functions globally available
window.RentechAIChat = {
  sendMessage,
  toggleChatPanel,
  getAIResponse,
  handleQuickReply
};

// Also attach to window for onclick handlers
window.sendMessage = sendMessage;
window.toggleChatPanel = toggleChatPanel;
window.handleQuickReply = handleQuickReply;

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAIChat);
} else {
  initAIChat();
}