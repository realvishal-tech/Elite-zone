/* ===== ELITE ZONE — BATCHES.JS ===== */

let activeFilter = 'all';
let searchQuery = '';
let sortBy = 'default';

document.addEventListener('DOMContentLoaded', () => {
  renderAllBatches();
  setupSearch();
  setupFilters();
  setupSort();
});

function renderAllBatches() {
  const grid = document.getElementById('batches-main-grid');
  const countEl = document.getElementById('batch-count');
  if (!grid) return;

  let filtered = BATCHES.filter(b => {
    const matchFilter = activeFilter === 'all' || b.level.toLowerCase() === activeFilter || b.tags.includes(activeFilter);
    const matchSearch = !searchQuery ||
      b.name.toLowerCase().includes(searchQuery) ||
      b.desc.toLowerCase().includes(searchQuery) ||
      b.tags.some(t => t.includes(searchQuery));
    return matchFilter && matchSearch;
  });

  if (sortBy === 'videos') filtered.sort((a,b) => b.videos - a.videos);
  if (sortBy === 'duration') filtered.sort((a,b) => parseInt(a.duration) - parseInt(b.duration));
  if (sortBy === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));

  if (countEl) countEl.innerHTML = `Showing <span>${filtered.length}</span> batches`;

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No batches found</h3>
        <p>Try adjusting your search or filter to find what you're looking for.</p>
        <button class="btn btn-glass mt-3" onclick="clearFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(b => `
    <a href="${getBatchUrl(b)}" class="batch-card-full" onclick="handleBatchNav(event, '${b.slug}')">
      <div class="bcf-thumb">
        <div class="bcf-thumb-bg" style="background:linear-gradient(135deg,${b.c1},${b.c2});"></div>
        <div class="bcf-thumb-emoji">${b.emoji}</div>
        <div class="bcf-level">
          <span class="badge badge-${b.level==='Beginner'?'mint':b.level==='Intermediate'?'plasma':'pulse'}">${b.level}</span>
        </div>
      </div>
      <div class="bcf-body">
        <div class="bcf-name">${b.name}</div>
        <div class="bcf-mentor">👨‍💻 Expert Mentor · ${b.duration}</div>
        <div class="bcf-desc">${b.desc.slice(0,100)}...</div>
        <div class="bcf-stats">
          <div class="bcf-stat">
            <div class="bcf-stat-num">${b.videos}</div>
            <div class="bcf-stat-label">Videos</div>
          </div>
          <div class="bcf-stat">
            <div class="bcf-stat-num">${b.notes}</div>
            <div class="bcf-stat-label">Notes</div>
          </div>
          <div class="bcf-stat">
            <div class="bcf-stat-num">${b.dpp}</div>
            <div class="bcf-stat-label">DPPs</div>
          </div>
          <div class="bcf-stat">
            <div class="bcf-stat-num">${b.tests}</div>
            <div class="bcf-stat-label">Tests</div>
          </div>
        </div>
        <div class="bcf-footer">
          <span class="bcf-duration">🕒 ${b.duration}</span>
          <span class="badge badge-gold">Free Access</span>
        </div>
      </div>
    </a>
  `).join('');
}

function handleBatchNav(e, slug) {
  if (!Auth.isLoggedIn()) {
    e.preventDefault();
    Registration.showModal();
  }
}

function setupSearch() {
  const input = document.getElementById('batch-search');
  if (!input) return;
  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderAllBatches();
  });
}

function setupFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter');
      renderAllBatches();
    });
  });
}

function setupSort() {
  const select = document.getElementById('sort-select');
  if (!select) return;
  select.addEventListener('change', (e) => { sortBy = e.target.value; renderAllBatches(); });
}

function clearFilters() {
  activeFilter = 'all';
  searchQuery = '';
  sortBy = 'default';
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.filter-tab[data-filter="all"]')?.classList.add('active');
  const input = document.getElementById('batch-search');
  if (input) input.value = '';
  renderAllBatches();
}

window.clearFilters = clearFilters;
