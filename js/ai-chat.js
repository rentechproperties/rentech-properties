// js/ai-chat.js
const botResponses = {
    "commission": "Rentech charges a flat 5% of the first month's rent once a tenant moves in. No listing fees!",
    "viewing": "Viewings are free for verified listings. Would you like to schedule one for Kilimani or Westlands?",
    "deposit": "Most Nairobi landlords require 1 month rent + 1 month deposit, but check the listing details for specifics.",
    "default": "I'm the Rentech AI. I can help with locations, pricing, or listing your home. Type 'List' to start!"
};

window.toggleChat = function() {
    const panel = document.getElementById('chat-panel');
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
};

window.sendMsg = function() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    if(!input.value) return;

    box.innerHTML += `<p style="text-align:right;"><b>You:</b> ${input.value}</p>`;
    
    const reply = botResponses[Object.keys(botResponses).find(k => input.value.toLowerCase().includes(k))] || botResponses["default"];
    
    setTimeout(() => {
        box.innerHTML += `<p style="color:var(--emerald);"><b>Rentech AI:</b> ${reply}</p>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
    
    input.value = '';
};