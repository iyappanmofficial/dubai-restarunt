/* ── Scroll Nav ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Scroll Reveal ── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

/* ── Menu Category Toggle (data-attribute driven, no inline onclick) ── */
const catBtns = document.querySelectorAll('.cat-btn');
const catPanels = {
  mandi:  document.getElementById('cat-mandi'),
  drinks: document.getElementById('cat-drinks'),
};

// Guard: only proceed if both panels exist
if (catPanels.mandi && catPanels.drinks) {
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;

      // Update active button
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide panels
      Object.entries(catPanels).forEach(([key, panel]) => {
        panel.style.display = key === cat ? (key === 'mandi' ? 'grid' : 'grid') : 'none';
      });

      // Re-trigger reveals for newly visible cards
      const activePanel = catPanels[cat];
      if (activePanel) {
        activePanel.querySelectorAll('.reveal:not(.on)').forEach((el, i) => {
          setTimeout(() => el.classList.add('on'), i * 80);
        });
      }
    });
  });
}

/* ── 3-D Mouse Parallax on Hero Frame (scoped to hero section) ── */
const frame = document.querySelector('.hero-img-frame');
const heroSection = document.querySelector('.hero');

if (frame && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = frame.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    frame.style.transform = `rotateY(${-6 + dx * 8}deg) rotateX(${2 - dy * 4}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    frame.style.transform = 'rotateY(-6deg) rotateX(2deg)';
  });
}

/* ── Mobile Hamburger Menu ── */
const hamburger   = document.getElementById('nav-hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-menu-close');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close menu when a link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}
