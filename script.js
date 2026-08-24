/* ==========================================================================
   DARSHAN K B - CREATIVE ANIMATED PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initFilterTabs();
  initThemeToggle();
  initMobileMenu();
  initParticleCanvas();
  initPhotoTilt();
});

/* Typing Effect in Hero Title */
const roles = [
  "Engineering Student",
  "Python & Java Developer",
  "Cloud Security Enthusiast",
  "DSA Specialist"
];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;

function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const currentRole = roles[roleIdx];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIdx + 1);
    charIdx++;
  }

  let typeSpeed = isDeleting ? 40 : 90;

  if (!isDeleting && charIdx === currentRole.length) {
    typeSpeed = 2000; // Pause at full word
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(initTypingEffect, typeSpeed);
}

/* Category Filter Tabs for Documents */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const docCards = document.querySelectorAll('.doc-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      docCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Modal Lightbox for Markcards & Certifications */
function openModal(title, subtitle, imgSrc, metaInfo) {
  const modal = document.getElementById('docModal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalSub').textContent = subtitle;
  document.getElementById('modalImg').src = imgSrc;
  document.getElementById('modalMeta').innerHTML = `<i class="fa-solid fa-circle-info"></i> ${metaInfo}`;
  
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('docModal');
  modal.classList.remove('active');
}

/* Close Modal on Overlay Click */
document.getElementById('docModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'docModal') closeModal();
});

/* Light / Dark Theme Switcher */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const icon = toggleBtn?.querySelector('i');

  toggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    if (newTheme === 'light') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  });
}

/* Mobile Drawer Menu */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  hamburgerBtn?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* Interactive Photo Card 3D Tilt Effect */
function initPhotoTilt() {
  const card = document.getElementById('photoCard');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

/* Canvas Particle Animation Background */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
