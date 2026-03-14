// js/app.js

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Nav Scroll Effect
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('glass');
      nav.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
      nav.classList.remove('glass');
      nav.style.background = 'transparent';
    }
  });

  // 2. Rotating Hero Headlines
  const headlines = document.querySelectorAll('.rotating-text span');
  let currentHeadline = 0;
  if (headlines.length > 0) {
    setInterval(() => {
      headlines[currentHeadline].classList.remove('active');
      currentHeadline = (currentHeadline + 1) % headlines.length;
      headlines[currentHeadline].classList.add('active');
    }, 3500);
  }

  // 3. Intersection Observer for Fade-Up Animations & Stats
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // If it's a stat counter, trigger counting
        if (entry.target.classList.contains('stat-num') && !entry.target.dataset.counted) {
          animateCounter(entry.target);
          entry.target.dataset.counted = true;
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up, .stat-num').forEach(el => observer.observe(el));

  // 4. Counter Animation
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    const timer = setInterval(() => {
      current += Math.ceil(target / 50);
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.innerText = current + suffix;
    }, stepTime);
  }

  // 5. Render Featured Properties on Homepage
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    const featured = window.properties.filter(p => p.badge === 'Featured').slice(0, 3);
    featuredGrid.innerHTML = featured.map((p, index) => {
      let html = window.buildCard(p);
      // add stagger delay
      return html.replace('fade-up"', `fade-up" style="transition-delay: ${index * 150}ms"`);
    }).join('');
  }

  // 6. Affordability Calculator Logic
  const calcInput = document.getElementById('calc-income');
  const calcSelect = document.getElementById('calc-percent');
  const calcOutput = document.getElementById('calc-output');
  const calcAreas = document.getElementById('calc-areas');

  if (calcInput) {
    const calculateRent = () => {
      const income = parseInt(calcInput.value) || 0;
      const percent = parseInt(calcSelect.value) / 100;
      const budget = income * percent;
      calcOutput.innerText = `KSh ${budget.toLocaleString()}`;
      
      let areas = "";
      if (budget === 0) areas = "Enter income to see areas";
      else if (budget < 15000) areas = "Kasarani, Embakasi, Eastleigh, South C";
      else if (budget < 30000) areas = "South B, Ruaka, Ngong Road, Kasarani";
      else if (budget < 60000) areas = "Kilimani, Westlands, Lang’ata, Lavington";
      else areas = "Karen, Lavington, Westlands, Runda";
      
      calcAreas.innerText = areas;
    };
    calcInput.addEventListener('input', calculateRent);
    calcSelect.addEventListener('change', calculateRent);
  }

});