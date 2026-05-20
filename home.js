/* ===== ELITE ZONE — HOME.JS ===== */

document.addEventListener('DOMContentLoaded', () => {
  renderBatchPreview();
  initCounters();
  initScrollReveal();
});

function renderBatchPreview() {
  const grid = document.getElementById('batches-preview-grid');
  if (!grid) return;

  // Show first 8 batches
  const preview = BATCHES.slice(0, 8);

  grid.innerHTML = preview.map(b => `
    <a href="${getBatchUrl(b)}" class="batch-card" onclick="handleBatchClick(event, '${b.slug}')">
      <div class="batch-thumb">
        <div class="batch-thumb-bg" style="background:linear-gradient(135deg,${b.c1},${b.c2});position:absolute;inset:0;"></div>
        <div class="batch-thumb-emoji">${b.emoji}</div>
      </div>
      <div class="batch-info">
        <div class="batch-meta">
          <span class="badge badge-${b.level==='Beginner'?'mint':b.level==='Intermediate'?'plasma':'pulse'}">${b.level}</span>
          <span class="badge badge-neon">${b.duration}</span>
        </div>
        <div class="batch-name">${b.name}</div>
        <div class="batch-desc">${b.desc.slice(0, 75)}...</div>
        <div class="batch-footer">
          <span class="batch-videos">📹 ${b.videos} Videos</span>
          <span class="badge badge-gold">Free</span>
        </div>
      </div>
    </a>
  `).join('');
}

function handleBatchClick(e, slug) {
  if (!Auth.isLoggedIn()) {
    e.preventDefault();
    Registration.showModal();
  }
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const step = 30;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, step);
}

function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s var(--ease-smooth); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.feature-card, .game-card, .testimonial-card, .batch-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
