/* ============================================
   RENTECH PROPERTIES - AI-CHAT.JS
   ============================================ */

// Toggle chat panel
function toggleChat() {
    const panel = document.getElementById('cpanel');
    if (panel) {
        panel.classList.toggle('open');
    }
}

// Close panel if clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('cpanel');
    const fab = document.querySelector('.ai-fab');
    if (panel && panel.classList.contains('open')) {
        if (!panel.contains(e.target) && !fab.contains(e.target)) {
            panel.classList.remove('open');
        }
    }
});

// Quick reply function
window.sc = function(text) {
    const input = document.getElementById('cinp');
    if (input) {
        input.value = text;
        sendMessage();
    }
};

// Send message function
window.sendMessage = function() {
    const input = document.getElementById('cinp');
    const msg = input?.value.trim();
    if (!msg) return;
    
    const msgs = document.getElementById('cmsgs');
    if (!msgs) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg m-user';
    userMsg.textContent = msg;
    msgs.appendChild(userMsg);
    
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;
    
    // Simulate AI response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'msg m-ai';
        
        const lower = msg.toLowerCase();
        if (lower.includes('kilimani')) {
            botMsg.innerHTML = '<b>AI:</b> Kilimani has great 1BR and 2BR apartments from KSh 45,000 to 120,000. Would you like to see available listings?';
        } else if (lower.includes('westlands')) {
            botMsg.innerHTML = '<b>AI:</b> Westlands offers studios and apartments from KSh 35,000 to 150,000. Popular for professionals!';
        } else if (lower.includes('kasarani')) {
            botMsg.innerHTML = '<b>AI:</b> Kasarani has affordable bedsitters from KSh 12,000. Great for students and young professionals!';
        } else if (lower.includes('2br') || lower.includes('2 bed')) {
            botMsg.innerHTML = '<b>AI:</b> 2BR apartments are available in Kilimani (KSh 65K+), Westlands (KSh 75K+), and Lang\'ata (KSh 85K+).';
        } else if (lower.includes('budget') || lower.includes('under')) {
            botMsg.innerHTML = '<b>AI:</b> What\'s your budget? We have options from KSh 8,000 in Eastleigh to KSh 180,000 in Karen.';
        } else {
            botMsg.innerHTML = '<b>AI:</b> I can help you find properties! Try asking: "2BR in Kilimani" or "Budget under 30K"';
        }
        
        msgs.appendChild(botMsg);
        msgs.scrollTop = msgs.scrollHeight;
    }, 600);
};

// Send on enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('cinp');
    const sendBtn = document.getElementById('csend');
    
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
});

// Make functions global
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
