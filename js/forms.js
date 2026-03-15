/* ============================================
   RENTECH PROPERTIES - FORMS.JS
   Multi-step form logic with validation
   Brand Colors: Emerald (#10B981) & Gold (#FFD700)
   ============================================ */

// ==========================================
// FORM STATE
// ==========================================

const formState = {
  currentStep: 1,
  totalSteps: 4,
  formData: {
    fullName: '',
    phone: '',
    email: '',
    userType: 'landlord',
    area: '',
    estate: '',
    matatuStop: '',
    propertyType: '',
    rent: '',
    deposit: 1,
    availableFrom: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    furnished: 'no',
    amenities: [],
    description: '',
    idDocument: null,
    titleDeed: null,
    photos: [],
    commissionAgreed: false
  },
  errors: {}
};

// ==========================================
// VALIDATION RULES
// ==========================================

const validationRules = {
  fullName: {
    required: true,
    minLength: 2,
    message: 'Please enter your full name (at least 2 characters)'
  },
  phone: {
    required: true,
    pattern: /^(07|01)\d{8}$|^\+254(7|1)\d{8}$|^254(7|1)\d{8}$/,
    message: 'Please enter a valid Kenyan phone number (e.g., 0712 345 678)'
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  area: {
    required: true,
    message: 'Please select a location/area'
  },
  estate: {
    required: true,
    minLength: 3,
    message: 'Please enter the specific estate name'
  },
  propertyType: {
    required: true,
    message: 'Please select a property type'
  },
  rent: {
    required: true,
    min: 1000,
    message: 'Please enter a valid monthly rent (minimum KSh 1,000)'
  },
  bedrooms: {
    required: true,
    min: 1,
    message: 'Please enter the number of bedrooms'
  },
  bathrooms: {
    required: true,
    min: 1,
    message: 'Please enter the number of bathrooms'
  },
  idDocument: {
    required: true,
    message: 'Please upload your National ID'
  },
  titleDeed: {
    required: true,
    message: 'Please upload your Title Deed or Lease Agreement'
  },
  photos: {
    required: true,
    minCount: 1,
    message: 'Please upload at least 1 property photo'
  },
  commissionAgreed: {
    required: true,
    message: 'You must agree to the commission policy to continue'
  }
};

// ==========================================
// VALIDATION FUNCTIONS
// ==========================================

function validateField(fieldName) {
  const rules = validationRules[fieldName];
  if (!rules) return true;
  
  const value = formState.formData[fieldName];
  let isValid = true;
  let errorMessage = '';
  
  // Required check
  if (rules.required) {
    if (value === null || value === undefined || value === '' || 
        (Array.isArray(value) && value.length === 0)) {
      isValid = false;
      errorMessage = rules.message;
    }
  }
  
  // Skip other validations if required fails
  if (!isValid) {
    formState.errors[fieldName] = errorMessage;
    return false;
  }
  
  // Min length
  if (rules.minLength && typeof value === 'string') {
    if (value.length < rules.minLength) {
      isValid = false;
      errorMessage = rules.message;
    }
  }
  
  // Pattern match
  if (rules.pattern && value) {
    const cleanValue = String(value).replace(/[\s-]/g, '');
    if (!rules.pattern.test(cleanValue)) {
      isValid = false;
      errorMessage = rules.message;
    }
  }
  
  // Min value
  if (rules.min !== undefined && value) {
    if (Number(value) < rules.min) {
      isValid = false;
      errorMessage = rules.message;
    }
  }
  
  // Min count (for arrays)
  if (rules.minCount && Array.isArray(value)) {
    if (value.length < rules.minCount) {
      isValid = false;
      errorMessage = rules.message;
    }
  }
  
  // Update errors
  if (isValid) {
    delete formState.errors[fieldName];
  } else {
    formState.errors[fieldName] = errorMessage;
  }
  
  return isValid;
}

function validateStep(step) {
  let isValid = true;
  
  switch (step) {
    case 1:
      if (!validateField('fullName')) isValid = false;
      if (!validateField('phone')) isValid = false;
      if (formState.formData.email && !validateField('email')) isValid = false;
      break;
    case 2:
      if (!validateField('area')) isValid = false;
      if (!validateField('estate')) isValid = false;
      if (!validateField('propertyType')) isValid = false;
      if (!validateField('rent')) isValid = false;
      if (!validateField('bedrooms')) isValid = false;
      if (!validateField('bathrooms')) isValid = false;
      break;
    case 3:
      if (!validateField('idDocument')) isValid = false;
      if (!validateField('titleDeed')) isValid = false;
      if (!validateField('photos')) isValid = false;
      break;
    case 4:
      if (!validateField('commissionAgreed')) isValid = false;
      break;
  }
  
  return isValid;
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  if (!field) return;
  
  field.classList.add('error');
  field.style.borderColor = '#EF4444';
  
  const existingError = field.closest('.form-group')?.querySelector('.form-error');
  if (existingError) existingError.remove();
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.style.color = '#EF4444';
  errorDiv.style.fontSize = '0.8rem';
  errorDiv.style.marginTop = '4px';
  errorDiv.textContent = message;
  
  const parent = field.closest('.form-group');
  if (parent) parent.appendChild(errorDiv);
}

function clearFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  if (!field) return;
  
  field.classList.remove('error');
  field.style.borderColor = '';
  
  const existingError = field.closest('.form-group')?.querySelector('.form-error');
  if (existingError) existingError.remove();
}

function displayStepErrors() {
  Object.keys(formState.errors).forEach(fieldName => {
    if (formState.errors[fieldName]) {
      showFieldError(fieldName, formState.errors[fieldName]);
    }
  });
}

// ==========================================
// STEP NAVIGATION
// ==========================================

function showStep(step) {
  document.querySelectorAll('.form-step').forEach(s => {
    s.classList.remove('active');
  });
  
  const targetStep = document.querySelector(`.form-step[data-step="${step}"]`);
  if (targetStep) {
    targetStep.classList.add('active');
  }
  
  updateProgressBar(step);
  
  formState.currentStep = step;
  
  updateStepLabels(step);
}

function updateStepLabels(currentStep) {
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    const stepNum = index + 1;
    const label = step.querySelector('.progress-step-label');
    
    if (label) {
      if (stepNum < currentStep) {
        label.style.color = 'var(--gold)';
      } else if (stepNum === currentStep) {
        label.style.color = 'var(--emerald)';
      } else {
        label.style.color = 'var(--dim)';
      }
    }
  });
}

function updateProgressBar(currentStep) {
  const progressBar = document.querySelector('.progress-bar-fill');
  if (progressBar) {
    const percentage = (currentStep / formState.totalSteps) * 100;
    progressBar.style.width = `${percentage}%`;
  }
  
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    const stepNum = index + 1;
    step.classList.remove('active', 'completed');
    
    if (stepNum < currentStep) {
      step.classList.add('completed');
    } else if (stepNum === currentStep) {
      step.classList.add('active');
    }
  });
}

function nextStep() {
  if (!validateStep(formState.currentStep)) {
    displayStepErrors();
    return;
  }
  
  if (formState.currentStep < formState.totalSteps) {
    showStep(formState.currentStep + 1);
  }
}

function prevStep() {
  if (formState.currentStep > 1) {
    showStep(formState.currentStep - 1);
  }
}

// ==========================================
// FORM DATA COLLECTION
// ==========================================

function collectFormData() {
  document.querySelectorAll('.form-step.active input[type="text"], .form-step.active input[type="email"], .form-step.active input[type="number"], .form-step.active input[type="tel"], .form-step.active input[type="date"]').forEach(input => {
    if (input.name && formState.formData.hasOwnProperty(input.name)) {
      formState.formData[input.name] = input.value;
    }
  });
  
  document.querySelectorAll('.form-step.active select').forEach(select => {
    if (select.name && formState.formData.hasOwnProperty(select.name)) {
      formState.formData[select.name] = select.value;
    }
  });
  
  document.querySelectorAll('.form-step.active textarea').forEach(textarea => {
    if (textarea.name && formState.formData.hasOwnProperty(textarea.name)) {
      formState.formData[textarea.name] = textarea.value;
    }
  });
  
  saveFormDataToSession();
}

function setFormField(field, value) {
  if (formState.formData.hasOwnProperty(field)) {
    formState.formData[field] = value;
    saveFormDataToSession();
  }
}

// ==========================================
// AI DESCRIPTION GENERATOR
// ==========================================

function generateAIDescription() {
  const type = formState.formData.propertyType || 'property';
  const area = formState.formData.area || 'Nairobi';
  const estate = formState.formData.estate || '';
  const rent = formState.formData.rent || '0';
  const beds = formState.formData.bedrooms || '1';
  const baths = formState.formData.bathrooms || '1';
  const size = formState.formData.size || '';
  const furnished = formState.formData.furnished;
  const amenities = formState.formData.amenities;
  const availableFrom = formState.formData.availableFrom;
  
  let audience = 'working professionals';
  if (type === 'Bedsitter' || type === 'Studio') {
    audience = 'young professionals and students';
  } else if (parseInt(beds) >= 3) {
    audience = 'families seeking spacious living';
  }
  
  let amenitiesText = '';
  if (amenities.length > 0) {
    amenitiesText = `Features include ${amenities.slice(0, 4).join(', ')}.`;
  }
  
  let availabilityText = 'Available immediately';
  if (availableFrom) {
    const date = new Date(availableFrom);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    availabilityText = `Available from ${date.toLocaleDateString('en-KE', options)}`;
  }
  
  const description = `Modern ${type.toLowerCase()} located in ${estate ? estate + ', ' : ''}${area}, Nairobi. This ${beds}-bedroom, ${baths}-bathroom ${type.toLowerCase()} is perfect for ${audience} seeking secure, convenient living. ${amenitiesText} ${furnished === 'yes' ? 'Comes fully furnished with modern amenities.' : furnished === 'partial' ? 'Partially furnished with essential fittings.' : 'Unfurnished, ready for your personal touch.'} ${availabilityText}. Rent: KSh ${parseInt(rent).toLocaleString()}/month. Contact Rentech Properties for a viewing.`;
  
  const descField = document.querySelector('textarea[name="description"]');
  if (descField) {
    descField.value = description;
    formState.formData.description = description;
    saveFormDataToSession();
    
    descField.style.borderColor = 'var(--gold)';
    setTimeout(() => {
      descField.style.borderColor = '';
    }, 1000);
  }
}

// ==========================================
// FILE HANDLING
// ==========================================

function handleFileUpload(field, files) {
  if (!files || files.length === 0) return;
  
  if (field === 'photos') {
    const maxPhotos = 5;
    const currentPhotos = formState.formData.photos || [];
    
    Array.from(files).slice(0, maxPhotos - currentPhotos.length).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          currentPhotos.push({
            name: file.name,
            data: e.target.result,
            size: file.size
          });
          formState.formData.photos = currentPhotos;
          updatePhotoPreview();
          saveFormDataToSession();
        };
        reader.readAsDataURL(file);
      }
    });
  } else {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formState.formData[field] = {
          name: file.name,
          data: e.target.result,
          size: file.size
        };
        updateFilePreview(field);
        saveFormDataToSession();
      };
      reader.readAsDataURL(file);
    }
  }
}

function updatePhotoPreview() {
  const previewContainer = document.querySelector('.photo-previews');
  if (!previewContainer) return;
  
  if (formState.formData.photos.length === 0) {
    previewContainer.innerHTML = '';
    return;
  }
  
  previewContainer.innerHTML = formState.formData.photos.map((photo, index) => {
    return `
    <div class="photo-preview" style="position: relative; width: 80px; height: 80px; border-radius: 8px; overflow: hidden; border: 2px solid var(--gold);">
      <img src="${photo.data}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
      <button type="button" onclick="removePhoto(${index})" style="position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; background: #EF4444; color: white; border: none; border-radius: 50%; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;">×</button>
    </div>
  `}).join('');
  
  const uploadText = document.querySelector('.upload-area p');
  if (uploadText) {
    uploadText.innerHTML = `${formState.formData.photos.length} photo(s) selected. <span style="color: var(--gold);">Click to add more</span>`;
  }
}

function updateFilePreview(field) {
  const previewContainer = document.querySelector(`[data-preview="${field}"]`);
  if (!previewContainer) return;
  
  const file = formState.formData[field];
  if (file) {
    previewContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--emerald-dim); border-radius: 8px;">
        <span style="color: var(--emerald);">✓</span>
        <span style="font-size: 0.85rem; color: var(--text);">${file.name}</span>
      </div>
    `;
  }
}

function removePhoto(index) {
  formState.formData.photos.splice(index, 1);
  updatePhotoPreview();
  saveFormDataToSession();
}

function setupDragDrop() {
  const dropZones = document.querySelectorAll('.upload-area');
  
  dropZones.forEach(zone => {
    const input = zone.querySelector('input[type="file"]');
    if (!input) return;
    
    const field = input.name || input.id;
    
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.style.borderColor = 'var(--gold)';
      zone.style.background = 'var(--gold-dim)';
    });
    
    zone.addEventListener('dragleave', () => {
      zone.style.borderColor = '';
      zone.style.background = '';
    });
    
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.style.borderColor = '';
      zone.style.background = '';
      handleFileUpload(field, e.dataTransfer.files);
    });
    
    zone.addEventListener('click', () => {
      input.click();
    });
  });
}

function setupToggleButtons() {
  document.querySelectorAll('.user-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.user-type-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.borderColor = 'var(--border)';
        b.style.color = 'var(--text)';
      });
      
      btn.classList.add('active');
      btn.style.background = 'var(--gold)';
      btn.style.borderColor = 'var(--gold)';
      btn.style.color = 'black';
      
      setFormField('userType', btn.dataset.value);
    });
  });
  
  document.querySelectorAll('.furnished-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.furnished-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.borderColor = 'var(--border)';
        b.style.color = 'var(--text)';
      });
      
      btn.classList.add('active');
      btn.style.background = 'var(--emerald)';
      btn.style.borderColor = 'var(--emerald)';
      btn.style.color = 'white';
      
      setFormField('furnished', btn.dataset.value);
    });
  });
  
  document.querySelectorAll('.deposit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.deposit-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.borderColor = 'var(--border)';
        b.style.color = 'var(--text)';
      });
      
      btn.classList.add('active');
      btn.style.background = 'var(--gold)';
      btn.style.borderColor = 'var(--gold)';
      btn.style.color = 'black';
      
      setFormField('deposit', btn.dataset.value);
    });
  });
  
  document.querySelectorAll('.amenity-checkbox').forEach(checkbox => {
    const wrapper = checkbox.closest('.amenity-wrapper');
    
    checkbox.addEventListener('change', (e) => {
      const value = e.target.value;
      
      if (e.target.checked) {
        if (!formState.formData.amenities.includes(value)) {
          formState.formData.amenities.push(value);
        }
        if (wrapper) {
          wrapper.style.borderColor = 'var(--gold)';
          wrapper.style.background = 'var(--gold-dim)';
        }
      } else {
        formState.formData.amenities = formState.formData.amenities.filter(a => a !== value);
        if (wrapper) {
          wrapper.style.borderColor = 'var(--border)';
          wrapper.style.background = 'transparent';
        }
      }
      saveFormDataToSession();
    });
  });
}

function formatPhoneInput(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.startsWith('0')) {
    value = value.substring(0, 10);
  } else if (value.startsWith('254')) {
    value = '0' + value.substring(3, 12);
  }
  
  if (value.length > 4) {
    value = value.substring(0, 4) + ' ' + value.substring(4);
  }
  if (value.length > 8) {
    value = value.substring(0, 8) + ' ' + value.substring(8);
  }
  
  input.value = value;
  formState.formData.phone = value.replace(/\s/g, '');
}

function generateSummary() {
  const summaryContainer = document.querySelector('.summary-container');
  if (!summaryContainer) return;
  
  const data = formState.formData;
  const title = `${data.propertyType} in ${data.area}`;
  
  summaryContainer.innerHTML = `
    <div class="summary-card" style="background: var(--card); border-radius: var(--radius); padding: 20px; border: 1px solid var(--gold);">
      <h4 style="color: var(--gold); margin-bottom: 16px;">📋 Property Summary</h4>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <p style="color: var(--dim); font-size: 0.8rem; margin-bottom: 4px;">PROPERTY</p>
          <p style="font-weight: 600; margin-bottom: 8px;">${title}</p>
          <p style="color: var(--muted); font-size: 0.9rem;">📍 ${data.area} · ${data.estate}</p>
          ${data.matatuStop ? `<p style="color: var(--muted); font-size: 0.9rem;">🚌 ${data.matatuStop}</p>` : ''}
        </div>
        
        <div>
          <p style="color: var(--dim); font-size: 0.8rem; margin-bottom: 4px;">RENT</p>
          <p style="font-size: 1.3rem; font-weight: 700; color: var(--emerald); margin-bottom: 4px;">KSh ${parseInt(data.rent).toLocaleString()}/mo</p>
          <p style="color: var(--muted); font-size: 0.9rem;">${data.deposit} month(s) deposit</p>
        </div>
      </div>
      
      <div style="border-top: 1px solid var(--border); margin: 16px 0; padding-top: 16px;">
        <p style="color: var(--dim); font-size: 0.8rem; margin-bottom: 8px;">DETAILS</p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <span style="color: var(--text);">🛏️ ${data.bedrooms} Bed</span>
          <span style="color: var(--text);">🚿 ${data.bathrooms} Bath</span>
          ${data.size ? `<span style="color: var(--text);">📐 ${data.size} m²</span>` : ''}
          <span style="color: var(--text);">✨ ${data.furnished === 'yes' ? 'Furnished' : data.furnished === 'partial' ? 'Partially Furnished' : 'Unfurnished'}</span>
        </div>
      </div>
      
      ${data.amenities.length > 0 ? `
        <div style="border-top: 1px solid var(--border); margin: 16px 0; padding-top: 16px;">
          <p style="color: var(--dim); font-size: 0.8rem; margin-bottom: 8px;">AMENITIES</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.amenities.map(a => `<span style="padding: 4px 12px; background: var(--gold-dim); color: var(--gold); border-radius: 50px; font-size: 0.8rem;">${a}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      <div style="border-top: 1px solid var(--border); margin: 16px 0; padding-top: 16px;">
        <p style="color: var(--dim); font-size: 0.8rem; margin-bottom: 8px;">DOCUMENTS</p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <span style="display: flex; align-items: center; gap: 4px; color: ${data.idDocument ? 'var(--emerald)' : 'var(--red)'};">
            ${data.idDocument ? '✓' : '✗'} ID Uploaded
          </span>
          <span style="display: flex; align-items: center; gap: 4px; color: ${data.titleDeed ? 'var(--emerald)' : 'var(--red)'};">
            ${data.titleDeed ? '✓' : '✗'} Title Deed Uploaded
          </span>
          <span style="display: flex; align-items: center; gap: 4px; color: ${data.photos.length > 0 ? 'var(--emerald)' : 'var(--red)'};">
            ${data.photos.length > 0 ? '✓' : '✗'} Photos: ${data.photos.length}
          </span>
        </div>
      </div>
    </div>
  `;
}

function handleSubmit() {
  if (!validateStep(4)) {
    displayStepErrors();
    return;
  }
  
  collectFormData();
  
  saveFormSubmission();
  
  showSuccessScreen();
}

function saveFormSubmission() {
  const submissions = JSON.parse(localStorage.getItem('rentech_submissions') || '[]');
  
  submissions.push({
    id: Date.now(),
    ...formState.formData,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  });
  
  localStorage.setItem('rentech_submissions', JSON.stringify(submissions));
  
  sessionStorage.removeItem('rentech_form_data');
}

function showSuccessScreen() {
  const formCard = document.querySelector('.form-card');
  if (!formCard) return;
  
  formCard.innerHTML = `
    <div class="form-success" style="text-align: center; padding: 40px;">
      <div style="width: 80px; height: 80px; background: var(--emerald-dim); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 2.5rem; animation: successPop 0.5s ease;">
        ✅
      </div>
      <h2 style="margin-bottom: 12px;">Property Submitted!</h2>
      <p style="color: var(--muted); margin-bottom: 32px;">Our team will call you within 2 hours to confirm your listing.</p>
      
      <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 32px; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="width: 32px; height: 32px; background: var(--emerald); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 8px;">✓</div>
          <div style="font-size: 0.85rem;">Submission received</div>
        </div>
        <div style="text-align: center;">
          <div style="width: 32px; height: 32px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; margin: 0 auto 8px; animation: pulse 2s infinite;">⏳</div>
          <div style="font-size: 0.85rem;">Verification (24hrs)</div>
        </div>
        <div style="text-align: center;">
          <div style="width: 32px; height: 32px; background: var(--card); border: 2px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--dim); margin: 0 auto 8px;">⏳</div>
          <div style="font-size: 0.85rem;">Photos reviewed</div>
        </div>
        <div style="text-align: center;">
          <div style="width: 32px; height: 32px; background: var(--card); border: 2px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--dim); margin: 0 auto 8px;">⏳</div>
          <div style="font-size: 0.85rem;">Live!</div>
        </div>
      </div>
      
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="https://wa.me/254723783337?text=Hi%20Rentech!%20I%20just%20submitted%20my%20property%20listing.%20Please%20confirm%20receipt." target="_blank" class="btn btn-whatsapp" style="padding: 14px 28px;">
          💬 Message Us on WhatsApp
        </a>
        <a href="properties.html" class="btn btn-outline" style="padding: 14px 28px;">
          Browse Listings →
        </a>
      </div>
    </div>
  `;
}

function saveFormDataToSession() {
  sessionStorage.setItem('rentech_form_data', JSON.stringify(formState.formData));
}

function loadSavedFormData() {
  const saved = sessionStorage.getItem('rentech_form_data');
  if (!saved) return;
  
  try {
    const data = JSON.parse(saved);
    Object.assign(formState.formData, data);
    
    Object.keys(data).forEach(key => {
      const field = document.querySelector(`[name="${key}"]`);
      if (field && data[key]) {
        if (field.type === 'checkbox') {
          field.checked = data[key];
        } else {
          field.value = data[key];
        }
      }
    });
    
    if (data.furnished) {
      document.querySelectorAll('.furnished-btn').forEach(btn => {
        if (btn.dataset.value === data.furnished) {
          btn.classList.add('active');
          btn.style.background = 'var(--emerald)';
          btn.style.borderColor = 'var(--emerald)';
          btn.style.color = 'white';
        }
      });
    }
    
    if (data.deposit) {
      document.querySelectorAll('.deposit-btn').forEach(btn => {
        if (btn.dataset.value == data.deposit) {
          btn.classList.add('active');
          btn.style.background = 'var(--gold)';
          btn.style.borderColor = 'var(--gold)';
          btn.style.color = 'black';
        }
      });
    }
    
    if (data.userType) {
      document.querySelectorAll('.user-type-btn').forEach(btn => {
        if (btn.dataset.value === data.userType) {
          btn.classList.add('active');
          btn.style.background = 'var(--gold)';
          btn.style.borderColor = 'var(--gold)';
          btn.style.color = 'black';
        }
      });
    }
    
    if (data.amenities && data.amenities.length > 0) {
      document.querySelectorAll('.amenity-checkbox').forEach(cb => {
        if (data.amenities.includes(cb.value)) {
          cb.checked = true;
          const wrapper = cb.closest('.amenity-wrapper');
          if (wrapper) {
            wrapper.style.borderColor = 'var(--gold)';
            wrapper.style.background = 'var(--gold-dim)';
          }
        }
      });
    }
    
    if (data.photos && data.photos.length > 0) {
      updatePhotoPreview();
    }
    
  } catch (e) {
    console.error('Error loading saved form data:', e);
  }
}

function initForms() {
  if (!document.querySelector('.form-step')) return;
  
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const submitButton = document.querySelector('.btn-submit');
  
  nextButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      collectFormData();
      nextStep();
    });
  });
  
  prevButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      prevStep();
    });
  });
  
  if (submitButton) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleSubmit();
    });
  }
  
  setupDragDrop();
  setupToggleButtons();
  
  const phoneInput = document.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => formatPhoneInput(e.target));
  }
  
  const aiBtn = document.querySelector('.btn-ai-generate');
  if (aiBtn) {
    aiBtn.addEventListener('click', (e) => {
      e.preventDefault();
      collectFormData();
      generateAIDescription();
    });
  }
  
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const field = e.target.name;
      handleFileUpload(field, e.target.files);
    });
  });
  
  const commissionCheckbox = document.querySelector('input[name="commissionAgreed"]');
  if (commissionCheckbox) {
    commissionCheckbox.addEventListener('change', (e) => {
      formState.formData.commissionAgreed = e.target.checked;
      
      const submitBtn = document.querySelector('.btn-submit');
      if (submitBtn) {
        submitBtn.disabled = !e.target.checked;
        submitBtn.style.opacity = e.target.checked ? '1' : '0.5';
      }
    });
  }
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains('active') && mutation.target.dataset.step === '4') {
        setTimeout(generateSummary, 100);
      }
    });
  });
  
  document.querySelectorAll('.form-step').forEach(step => {
    observer.observe(step, { attributes: true, attributeFilter: ['class'] });
  });
  
  showStep(1);
  loadSavedFormData();
  
  console.log('📝 Rentech Forms initialized with Gold + Emerald branding');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForms);
} else {
  initForms();
}

window.RentechForms = {
  formState,
  validateField,
  validateStep,
  showStep,
  nextStep,
  prevStep,
  collectFormData,
  generateAIDescription,
  handleSubmit,
  removePhoto
};

window.removePhoto = function(index) {
  removePhoto(index);
};