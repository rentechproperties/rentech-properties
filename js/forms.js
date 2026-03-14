// js/forms.js

document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  const totalSteps = 4;
  
  window.showStep = function(step) {
    if (step > currentStep && !validateStep(currentStep)) return; // prevent moving forward if invalid
    
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';
    currentStep = step;
    updateProgressBar(step);
    
    if (step === 4) populateSummary();
  };

  function updateProgressBar(step) {
    document.querySelectorAll('.step-indicator').forEach((el, index) => {
      if (index + 1 <= step) {
        el.classList.add('text-emerald');
        el.style.borderBottom = '2px solid var(--emerald)';
        el.style.opacity = '1';
      } else {
        el.classList.remove('text-emerald');
        el.style.borderBottom = '2px solid var(--border)';
        el.style.opacity = '0.5';
      }
    });
  }

  function validateStep(step) {
    let isValid = true;
    const currentPanel = document.getElementById(`step-${step}`);
    const requiredInputs = currentPanel.querySelectorAll('input[required], select[required]');
    
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'var(--red)';
      } else {
        input.style.borderColor = 'var(--border)';
      }
    });

    if (step === 1) {
      const phone = document.getElementById('landlord-phone').value;
      if (phone && !/^(07|01|\+254)[0-9]{8,9}$/.test(phone.replace(/\s/g, ''))) {
        isValid = false;
        document.getElementById('landlord-phone').style.borderColor = 'var(--red)';
        alert("Please enter a valid Kenyan phone number.");
      }
    }
    return isValid;
  }

  window.generateAIDescription = function() {
    const area = document.getElementById('prop-area').value || '[Area]';
    const type = document.getElementById('prop-type').value || '[Type]';
    const estate = document.getElementById('prop-estate').value || '[Estate]';
    const rent = document.getElementById('prop-rent').value || '[Rent]';
    
    const descBox = document.getElementById('prop-desc');
    descBox.value = `Modern ${type} located in ${area}, Nairobi. Perfect for professionals seeking secure, convenient living near ${estate}. Features excellent amenities, reliable water, and top-tier security. Available immediately. KSh ${rent}/month. Contact Rentech Properties for a verified viewing.`;
    
    // Animate button
    const btn = document.getElementById('ai-btn');
    btn.innerText = "✨ Generated!";
    btn.classList.add('btn-emerald');
    btn.classList.remove('btn-outline');
    setTimeout(() => {
      btn.innerText = "✨ Generate AI Description";
      btn.classList.remove('btn-emerald');
      btn.classList.add('btn-outline');
    }, 2000);
  };

  function populateSummary() {
    const type = document.getElementById('prop-type').value;
    const area = document.getElementById('prop-area').value;
    const rent = document.getElementById('prop-rent').value;
    const beds = document.getElementById('prop-beds').value || '1';
    
    document.getElementById('sum-title').innerText = `${type} in ${area}`;
    document.getElementById('sum-rent').innerText = `KSh ${Number(rent).toLocaleString()} / month`;
    document.getElementById('sum-specs').innerText = `${beds} Bed(s) · Verified Listing`;
  }

  window.handleSubmit = function(e) {
    e.preventDefault();
    const agreed = document.getElementById('commission-agree').checked;
    if (!agreed) {
      alert("Please agree to the commission policy to submit.");
      return;
    }

    document.getElementById('form-container').style.display = 'none';
    document.getElementById('success-screen').style.display = 'block';
  };

  // Enforce Kenyan Phone format on blur
  const phoneInput = document.getElementById('landlord-phone');
  if(phoneInput) {
    phoneInput.addEventListener('blur', (e) => {
      let val = e.target.value.replace(/\s/g, '');
      if(val.startsWith('0')) val = '+254' + val.substring(1);
      e.target.value = val;
    });
  }
});