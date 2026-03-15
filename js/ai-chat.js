/* ============================================
   RENTECH PROPERTIES - AI-CHAT.JS
   Working AI assistant widget for all pages
   Gold + Emerald Branding
   ============================================ */

(function() {
  'use strict';

  // ==========================================
  // AI CHAT CONFIGURATION
  // ==========================================
  
  const CONFIG = {
    botName: 'Rentech AI',
    greeting: " Habari! I'm Rentech's AI assistant. I can help you find properties, answer questions, or connect you with our team. What are you looking for?",
    quickReplies: [' Find a Home', ' List Property', ' How It Works', ' WhatsApp Us'],
    whatsappNumber: '254723783337',
    colors: {
      primary: '#10B981', // Emerald
      accent: '#FFD700',   // Gold
      dark: '#0F172A',
      card: '#1E293B'
    }
  };

  // ==========================================
  // AI RESPONSES DATABASE
  // ==========================================
  
  const responses = {
    // Property search
    find: {
      keywords: ['find', 'search', 'looking', 'want', 'need', 'rent', 'apartment', 'house', 'home', 'looking for'],
      getResponse: function(input) {
        return " I can help you find the perfect property!\n\n" +
               "Tell me your preferences:\n" +
               " Which area? (Kilimani, Westlands, Karen, etc.)\n" +
               " Budget? (e.g., under 30K)\n" +
               " Bedrooms? (1BR, 2BR, etc.)\n\n" +
               "Or [Browse All Properties](properties.html)";
      }
    },
    
    // Nairobi Areas
    areas: {
      keywords: ['kilimani', 'westlands', 'kasarani', 'south b', 'south c', 'langata', 'lavington', 
                 'karen', 'eastleigh', 'embakasi', 'ruaka', 'parklands', 'upperhill', 'hurlingham',
                 'ngong', 'runda', 'muthaiga', 'gigiri', 'ridgeways', 'dagoretti', 'lang\'ata'],
      getResponse: function(input) {
        const areas = {
          'kilimani': { min: 45000, max: 120000, count: 8 },
          'westlands': { min: 35000, max: 150000, count: 6 },
          'kasarani': { min: 12000, max: 35000, count: 5 },
          'south b': { min: 25000, max: 50000, count: 4 },
          'south c': { min: 18000, max: 45000, count: 4 },
          'karen': { min: 75000, max: 250000, count: 3 },
          'eastleigh': { min: 8000, max: 25000, count: 2 }
        };
        
        const inputLower = input.toLowerCase();
        let matchedArea = null;
        
        for (const [area, data] of Object.entries(areas)) {
          if (inputLower.includes(area)) {
            matchedArea = area;
            break;
          }
        }
        
        if (matchedArea) {
          const data = areas[matchedArea];
          const areaName = matchedArea.charAt(0).toUpperCase() + matchedArea.slice(1);
          return  Great choice!  has + verified properties.\n\n +
                  Price range: KSh  - /month\n\n +
                 [View  Properties](properties.html?area=);
        }
        
        return " Which area interests you? We cover all of Nairobi:\n\n" +
               " Kilimani, Westlands, Lavington\n" +
               " Karen, Runda, Muthaiga\n" +
               " Kasarani, Embakasi, Ruaka\n" +
               " South B, South C, Eastleigh";
      }
    },
    
    // Budget/Price
    budget: {
      keywords: ['price', 'budget', 'cost', 'much', 'cheap', 'affordable', 'expensive', 'ksh', 'money', 'rent', 'under', 'ksh'],
      getResponse: function(input) {
        const budgetMatch = input.match(/(\d+)/);
        
        if (budgetMatch) {
          const budget = parseInt(budgetMatch[1]);
          const actualBudget = budget < 100 ? budget * 1000 : budget;
          
          if (actualBudget < 15000) {
            return  Budget: Under KSh 15,000\n\nGreat options for you:\n Eastleigh - Bedsitters from KSh 8,000\n Kasarani - Bedsitters from KSh 12,000\n Embakasi - Studios from KSh 10,000\n\n[View Budget Properties](properties.html?maxPrice=15000);
          } else if (actualBudget < 30000) {
            return  Budget: KSh 15,000 - 30,000\n\nRecommended areas:\n South B/C - Studios & 1BR\n Ruaka - 1BR apartments\n Ngong Road - Various options\n\n[View Properties](properties.html?maxPrice=30000);
          } else if (actualBudget < 60000) {
            return  Budget: KSh 30,000 - 60,000\n\nGreat areas for you:\n Kilimani - 1BR & 2BR\n Westlands - Studios & 1BR\n Lang'ata - 2BR apartments\n\n[View Properties](properties.html?maxPrice=60000);
          } else {
            return  Budget: Over KSh 60,000\n\nPremium options:\n Karen - Houses & Maisonettes\n Lavington - Luxury apartments\n Runda - Executive homes\n\n[View Premium Properties](properties.html?minPrice=60000);
          }
        }
        
        return " Our properties range from KSh 8,000/month to KSh 250,000/month.\n\n" +
               "What's your budget? Tell me and I'll recommend suitable areas!";
      }
    },
    
    // Listing property
    list: {
      keywords: ['list', 'landlord', 'sell', 'rent out', 'my property', 'submit', 'advertise', 'upload'],
      getResponse: function() {
        return " Great! Listing your property is FREE!\n\n" +
               " AI-optimized description (we write it)\n" +
               " Pre-qualified tenants only\n" +
               " 5% commission only when tenant moves in\n" +
               " Zero upfront cost\n\n" +
               "[List Your Property Now](list-property.html)";
      }
    },
    
    // Verification/Safety
    verification: {
      keywords: ['verify', 'verified', 'safe', 'scam', 'legit', 'trust', 'real', 'authentic', 'scams', 'fake'],
      getResponse: function() {
        return " Your safety is our TOP priority!\n\n" +
               "We verify EVERY listing:\n" +
               " Landlord National ID verified\n" +
               " Title deed/lease checked\n" +
               " Physical property inspection\n" +
               " AI scam detection\n\n" +
               " ZERO TOLERANCE for scams!\n\n" +
               "Report suspicious listings via WhatsApp.";
      }
    },
    
    // WhatsApp/Contact
    contact: {
      keywords: ['whatsapp', 'contact', 'call', 'phone', 'reach', 'talk', 'speak', 'message', 'chat with'],
      getResponse: function() {
        return " We're always available!\n\n" +
               " Phone: +254 723 783 337\n" +
               " Email: rentechproperties.ke@gmail.com\n\n" +
               "[Chat on WhatsApp Now](https://wa.me/254723783337?text=Hello%20Rentech!%20I%20need%20help%20finding%20a%20property)";
      }
    },
    
    // Property types
    types: {
      keywords: ['bedsitter', 'studio', '1br', '2br', '3br', '4br', 'maisonette', 'bedroom', 'bdrm', 'one bedroom', 'two bedroom', 'three bedroom'],
      getResponse: function(input) {
        const inputLower = input.toLowerCase();
        let type = 'property';
        
        if (inputLower.includes('bedsitter')) type = 'Bedsitter';
        else if (inputLower.includes('studio')) type = 'Studio';
        else if (inputLower.includes('1br') || inputLower.includes('one bedroom')) type = '1BR';
        else if (inputLower.includes('2br') || inputLower.includes('two bedroom')) type = '2BR';
        else if (inputLower.includes('3br') || inputLower.includes('three bedroom')) type = '3BR';
        else if (inputLower.includes('4br') || inputLower.includes('four bedroom')) type = '4BR+';
        else if (inputLower.includes('maisonette')) type = 'Maisonette';
        
        const prices = {
          'Bedsitter': { min: 8000, max: 20000 },
          'Studio': { min: 18000, max: 60000 },
          '1BR': { min: 25000, max: 80000 },
          '2BR': { min: 22000, max: 120000 },
          '3BR': { min: 50000, max: 180000 },
          '4BR+': { min: 100000, max: 400000 },
          'Maisonette': { min: 60000, max: 200000 }
        };
        
        if (prices[type]) {
          return   Properties\n\n +
                  Price range: KSh  - /month\n\n +
                 [Browse  Properties](properties.html?type=);
        }
        
        return " What type of property?\n\n" +
               " Bedsitter (KSh 8K-20K)\n" +
               " Studio (KSh 18K-60K)\n" +
               " 1-4 Bedroom apartments\n" +
               " Maisonettes";
      }
    },
    
    // How it works
    howItWorks: {
      keywords: ['how', 'work', 'process', 'steps', 'start', 'begin', 'help'],
      getResponse: function() {
        return " How Rentech Works:\n\n" +
               "**FOR TENANTS:**\n" +
               "1 Browse verified properties\n" +
               "2 Contact landlord via WhatsApp\n" +
               "3 Schedule viewing\n" +
               "4 Move in! (No agent fees)\n\n" +
               "**FOR LANDLORDS:**\n" +
               "1 List property FREE (10 mins)\n" +
               "2 We verify your documents\n" +
               "3 Receive pre-qualified tenants\n" +
               "4 Pay 5% commission on move-in only";
      }
    },
    
    // Greeting
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'jambo', 'sasa', 'habari'],
      getResponse: function() {
        return CONFIG.greeting;
      }
    },
    
    // Thanks
    thanks: {
      keywords: ['thank', 'thanks', 'asante', 'appreciate', 'karibu'],
      getResponse: function() {
        return "You're welcome!  Karibu sana!\n\nIs there anything else I can help you with?";
      }
    },
    
    // Goodbye
    goodbye: {
      keywords: ['bye', 'goodbye', 'later', 'see you', 'exit', 'quit', 'kwaheri'],
      getResponse: function() {
        return "Goodbye!  Kwaheri!\n\nIf you need help finding your perfect home, come back anytime. Karibu tena!";
      }
    }
  };

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  let isOpen = false;
  let messagesContainer = null;
  let inputField = null;

  // ==========================================
  // CORE FUNCTIONS
  // ==========================================
  
  function getAIResponse(input) {
    const inputLower = input.toLowerCase().trim();
    
    // Check each response category
    for (const key in responses) {
      const category = responses[key];
      for (const keyword of category.keywords) {
        if (inputLower.includes(keyword.toLowerCase())) {
          return category.getResponse(input);
        }
      }
    }
    
    // Default fallback
    return " I didn't quite get that.\n\n" +
           "Try asking:\n" +
           " \"Find 2BR in Kilimani\"\n" +
           " \"Budget under 30K\"\n" +
           " \"How do I list my property?\"\n" +
           " \"Show me Westlands apartments\"\n\n" +
           "[ Chat with our team](https://wa.me/254723783337?text=Hello!%20I%20need%20help)";
  }

  function processText(text) {
    // Convert markdown-like syntax to HTML
    let processed = text;
    
    // Links: [text](url)
    processed = processed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="" target="_blank" style="color: #FFD700; text-decoration: underline;"></a>'
    );
    
    // Bold: **text**
    processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #FFD700;"></strong>');
    
    // Newlines
    processed = processed.replace(/\n/g, '<br>');
    
    return processed;
  }

  function addMessage(text, isUser) {
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = 
      padding: 12px 16px;
      border-radius: 18px;
      max-width: 85%;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      
    ;
    messageDiv.innerHTML = isUser ? text : processText(text);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function addTypingIndicator() {
    if (!messagesContainer) return null;
    
    const typingDiv = document.createElement('div');
    typingDiv.style.cssText = 
      padding: 12px 16px;
      background: #1E293B;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      max-width: 60px;
      display: flex;
      gap: 4px;
      border: 1px solid rgba(255,215,0,0.2);
    ;
    typingDiv.innerHTML = 
      <span style="width: 8px; height: 8px; background: #FFD700; border-radius: 50%; animation: typing 1s infinite;"></span>
      <span style="width: 8px; height: 8px; background: #FFD700; border-radius: 50%; animation: typing 1s infinite 0.2s;"></span>
      <span style="width: 8px; height: 8px; background: #FFD700; border-radius: 50%; animation: typing 1s infinite 0.4s;"></span>
    ;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return typingDiv;
  }

  function sendMessage(text) {
    const message = text || (inputField ? inputField.value.trim() : '');
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    
    // Clear input
    if (inputField) inputField.value = '';
    
    // Show typing indicator
    const typing = addTypingIndicator();
    
    // Get and show bot response
    setTimeout(function() {
      if (typing && typing.parentNode) typing.remove();
      const response = getAIResponse(message);
      addMessage(response, false);
    }, 800);
  }

  function toggleChat() {
    const panel = document.getElementById('ai-chat-panel');
    const trigger = document.getElementById('ai-chat-trigger');
    if (!panel) return;
    
    isOpen = !isOpen;
    
    if (isOpen) {
      panel.style.transform = 'translateY(0) scale(1)';
      panel.style.opacity = '1';
      panel.style.visibility = 'visible';
      
      // Show greeting if first time
      if (messagesContainer && messagesContainer.children.length === 0) {
        setTimeout(function() {
          addMessage(CONFIG.greeting, false);
        }, 300);
      }
      
      // Focus input
      if (inputField) setTimeout(() => inputField.focus(), 400);
    } else {
      panel.style.transform = 'translateY(20px) scale(0.95)';
      panel.style.opacity = '0';
      panel.style.visibility = 'hidden';
    }
  }

  function handleQuickReply(text) {
    const replies = {
      ' Find a Home': 'I want to find a rental property in Nairobi',
      ' List Property': 'I want to list my property for rent',
      ' How It Works': 'How does Rentech work?',
      ' WhatsApp Us': 'I want to chat with your team'
    };
    
    sendMessage(replies[text] || text);
  }

  // ==========================================
  // CREATE WIDGET HTML
  // ==========================================
  
  function createWidget() {
    // Check if widget already exists
    if (document.getElementById('ai-chat-trigger')) return;
    
    // Add typing animation CSS
    const style = document.createElement('style');
    style.textContent = 
      @keyframes typing {
        0%, 100% { opacity: 0.3; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-4px); }
      }
      .quick-reply-btn:hover {
        background: rgba(255, 215, 0, 0.2) !important;
        border-color: #FFD700 !important;
        color: #FFD700 !important;
      }
    ;
    document.head.appendChild(style);
    
    // Create trigger button
    const trigger = document.createElement('div');
    trigger.id = 'ai-chat-trigger';
    trigger.style.cssText = 
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9998;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    ;
    trigger.innerHTML = 
      <div id="ai-chat-btn" style="
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #FFD700, #10B981);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(255,215,0,0.3);
        transition: all 0.3s ease;
        border: 2px solid rgba(255,255,255,0.2);
      ">
        <span style="font-size: 30px;"></span>
      </div>
      <span style="
        background: #1E293B;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 11px;
        color: #FFD700;
        font-family: 'DM Sans', sans-serif;
        white-space: nowrap;
        border: 1px solid rgba(255,215,0,0.3);
      ">AI Assistant</span>
    ;
    
    // Create chat panel
    const panel = document.createElement('div');
    panel.id = 'ai-chat-panel';
    panel.style.cssText = 
      position: fixed;
      bottom: 100px;
      left: 24px;
      width: 340px;
      max-width: calc(100vw - 48px);
      height: 500px;
      max-height: calc(100vh - 140px);
      background: #1E293B;
      border: 2px solid #FFD700;
      border-radius: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      font-family: 'DM Sans', sans-serif;
    ;
    panel.innerHTML = 
      <!-- Header -->
      <div style="
        padding: 16px 20px;
        background: linear-gradient(135deg, #FFD700, #10B981);
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="
            width: 36px;
            height: 36px;
            background: #0F172A;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          "></div>
          <div>
            <div style="font-weight: 700; font-size: 16px; color: #0F172A;">Rentech AI</div>
            <div style="font-size: 11px; color: #0F172A; opacity: 0.8; display: flex; align-items: center; gap: 4px;">
              <span style="width: 6px; height: 6px; background: #0F172A; border-radius: 50%;"></span>
              Online
            </div>
          </div>
        </div>
        <button id="ai-chat-close" style="
          width: 32px;
          height: 32px;
          background: rgba(0,0,0,0.1);
          border: none;
          color: #0F172A;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        "></button>
      </div>
      
      <!-- Messages -->
      <div id="ai-chat-messages" style="
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      "></div>
      
      <!-- Quick Replies -->
      <div style="
        padding: 0 16px 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      ">
        <button class="quick-reply-btn" data-text=" Find a Home" style="
          padding: 8px 14px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 20px;
          color: #10B981;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        "> Find a Home</button>
        <button class="quick-reply-btn" data-text=" List Property" style="
          padding: 8px 14px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 20px;
          color: #10B981;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        "> List Property</button>
        <button class="quick-reply-btn" data-text=" How It Works" style="
          padding: 8px 14px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 20px;
          color: #10B981;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        "> How It Works</button>
        <button class="quick-reply-btn" data-text=" WhatsApp Us" style="
          padding: 8px 14px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 20px;
          color: #10B981;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        "> WhatsApp Us</button>
      </div>
      
      <!-- Input -->
      <div style="
        padding: 12px 16px;
        background: #0F172A;
        border-top: 1px solid rgba(255,215,0,0.2);
        display: flex;
        gap: 10px;
      ">
        <input type="text" id="ai-chat-input" placeholder="Ask about properties, areas, prices..." style="
          flex: 1;
          padding: 12px 16px;
          background: #0F172A;
          border: 1px solid rgba(255,215,0,0.3);
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: all 0.2s ease;
        ">
        <button id="ai-send-btn" style="
          padding: 12px 20px;
          background: #FFD700;
          border: none;
          border-radius: 12px;
          color: #0F172A;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        ">Send</button>
      </div>
    ;
    
    // Add to page
    document.body.appendChild(trigger);
    document.body.appendChild(panel);
    
    // Get references
    messagesContainer = document.getElementById('ai-chat-messages');
    inputField = document.getElementById('ai-chat-input');
    
    // Add hover effects
    const btn = document.getElementById('ai-chat-btn');
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 8px 25px rgba(255,215,0,0.5)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(255,215,0,0.3)';
    });
    
    // Event listeners
    trigger.addEventListener('click', toggleChat);
    
    document.getElementById('ai-chat-close').addEventListener('click', toggleChat);
    
    document.getElementById('ai-send-btn').addEventListener('click', function() {
      sendMessage();
    });
    
    inputField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    inputField.addEventListener('focus', function() {
      this.style.borderColor = '#FFD700';
    });
    inputField.addEventListener('blur', function() {
      this.style.borderColor = 'rgba(255,215,0,0.3)';
    });
    
    // Quick reply buttons
    document.querySelectorAll('.quick-reply-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        handleQuickReply(this.getAttribute('data-text'));
      });
    });
    
    console.log(' Rentech AI Chat Widget initialized with Gold + Emerald branding');
  }

  // ==========================================
  // INITIALIZE
  // ==========================================
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

})();
