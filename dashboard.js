/* ===== ELITE ZONE — DASHBOARD.JS ===== */

document.addEventListener('DOMContentLoaded', () => {
  if (!requireAuth()) return;
  const user = Auth.getUser();

  renderProfile(user);
  renderGreeting(user);
  renderStats(user);
  renderEnrolledBatches(user);
  renderStreak(user);
  renderLeaderboard(user);
  renderBadges(user);
  setupDashNav();
});

function renderProfile(user) {
  const avatar = document.getElementById('dash-avatar');
  const name = document.getElementById('dash-name');
  const roll = document.getElementById('dash-roll');
  const xpVal = document.getElementById('dash-xp-val');
  const xpBar = document.getElementById('dash-xp-bar');

  if (avatar) { avatar.textContent = user.initials || user.name.slice(0,2).toUpperCase(); }
  if (name) name.textContent = user.name;
  if (roll) roll.textContent = user.roll || 'BCA Student';

  const xp = user.xp || 0;
  const level = Math.floor(xp / 100) + 1;
  const nextXP = level * 100;
  const pct = ((xp % 100) / 100) * 100;

  if (xpVal) xpVal.textContent = `${xp} XP · Level ${level}`;
  if (xpBar) xpBar.style.width = pct + '%';
}

function renderGreeting(user) {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening';
  const el = document.getElementById('dash-greeting');
  const dateEl = document.getElementById('dash-date');
  if (el) el.innerHTML = `${greet}, <span>${user.name.split(' ')[0]}</span> 👋`;
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-IN', { weekday:'long',year:'numeric',month:'long',day:'numeric' });
}

function renderStats(user) {
  const enrolled = (user.enrolled || []).length;
  const allProgress = user.progress || {};
  let totalDone = 0;
  let totalVideos = 0;
  Object.keys(allProgress).forEach(slug => {
    const b = getBatch(slug);
    if (b) {
      totalDone += Object.values(allProgress[slug]).filter(v => v === 'done').length;
      totalVideos += b.videos;
    }
  });
  const pct = totalVideos ? Math.round((totalDone/totalVideos)*100) : 0;

  setStatCard('stat-enrolled', enrolled, enrolled > 0 ? 'up' : '');
  setStatCard('stat-videos', totalDone, totalDone > 0 ? 'up' : '');
  setStatCard('stat-xp', user.xp || 0, 'up');
  setStatCard('stat-streak', user.streak || 3, 'up');
}

function setStatCard(id, val, change) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function renderEnrolledBatches(user) {
  const grid = document.getElementById('enrolled-grid');
  if (!grid) return;

  const enrolled = (user.enrolled || []).map(id => BATCHES.find(b => b.id === id)).filter(Boolean);

  if (!enrolled.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:1rem;">📚</div>
        <h3 style="font-family:var(--font-display);margin-bottom:0.5rem;">No Batches Yet</h3>
        <p style="font-size:0.875rem;margin-bottom:1.5rem;">Enroll in a batch to start your learning journey</p>
        <a href="batches.html" class="btn btn-primary">Explore Batches 🚀</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = enrolled.map(b => {
    const progress = user.progress?.[b.slug] || {};
    const done = Object.values(progress).filter(v => v === 'done').length;
    const pct = Math.round((done / b.videos) * 100);
    return `
      <a href="${getBatchUrl(b)}" class="enrolled-card">
        <div class="enrolled-thumb">
          <div class="enrolled-thumb-bg" style="background:linear-gradient(135deg,${b.c1},${b.c2});position:absolute;inset:0;"></div>
          <div class="enrolled-thumb-emoji">${b.emoji}</div>
        </div>
        <div class="enrolled-body">
          <div class="enrolled-name">${b.name}</div>
          <div class="enrolled-progress-label">
            <span>Progress</span><span>${pct}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="enrolled-last">🕒 Last watched recently</div>
        </div>
      </a>
    `;
  }).join('');
}

function renderStreak(user) {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  const activeStreak = user.streak || 3;

  const grid = document.getElementById('streak-days');
  const countEl = document.getElementById('streak-count');

  if (countEl) countEl.textContent = activeStreak;

  if (grid) {
    grid.innerHTML = days.map((d, i) => {
      const done = i < todayIdx && i < activeStreak;
      const isToday = i === todayIdx;
      return `
        <div class="streak-day ${done?'done':''} ${isToday?'today':''}">
          <div class="streak-day-name">${d}</div>
          <div class="streak-day-icon">${done ? '🔥' : isToday ? '⭐' : '○'}</div>
        </div>
      `;
    }).join('');
  }
}

function renderLeaderboard(user) {
  const list = document.getElementById('leaderboard-list');
  if (!list) return;

  const fakeStudents = [
    { name: 'Arjun Singh', college: 'LND College', xp: 2840, color: 'var(--plasma)', initials: 'AS' },
    { name: 'Priya Sharma', college: 'LND College', xp: 2650, color: 'var(--neon)', initials: 'PS' },
    { name: user.name || 'You', college: user.college || 'LND College', xp: user.xp || 120, color: 'var(--pulse)', initials: user.initials || 'ME', isYou: true },
    { name: 'Rahul Kumar', college: 'LND College', xp: 1980, color: 'var(--gold)', initials: 'RK' },
    { name: 'Sneha Gupta', college: 'LND College', xp: 1750, color: 'var(--mint)', initials: 'SG' },
  ].sort((a,b) => b.xp - a.xp);

  list.innerHTML = fakeStudents.map((s, i) => `
    <div class="lb-item ${s.isYou ? 'you' : ''}">
      <div class="lb-rank ${i===0?'gold':i===1?'silver':i===2?'bronze':''}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
      <div class="lb-avatar" style="background:${s.color}20;border:1px solid ${s.color}50;color:${s.color};">${s.initials}</div>
      <div class="lb-info">
        <div class="lb-name">${s.name} ${s.isYou ? '<span style="color:var(--plasma-light);font-size:0.72rem;">(You)</span>' : ''}</div>
        <div class="lb-college">${s.college}</div>
      </div>
      <div class="lb-xp">${s.xp.toLocaleString()} XP</div>
    </div>
  `).join('');
}

function renderBadges(user) {
  const grid = document.getElementById('badges-grid');
  if (!grid) return;

  const badges = [
    { icon: '🚀', name: 'First Step', desc: 'Complete first lecture', unlocked: (user.xp||0) > 0 },
    { icon: '🔥', name: 'On Fire', desc: '3-day streak', unlocked: (user.streak||0) >= 3 },
    { icon: '⚡', name: 'Speed Learner', desc: '10 videos watched', unlocked: false },
    { icon: '💎', name: 'Elite Member', desc: 'Enroll in 5 batches', unlocked: (user.enrolled||[]).length >= 5 },
    { icon: '🏆', name: 'Champion', desc: 'Score 90%+ in a test', unlocked: false },
    { icon: '🌟', name: 'Star Student', desc: 'Complete a batch', unlocked: false },
    { icon: '🤝', name: 'Community Hero', desc: 'Help 10 students', unlocked: false },
    { icon: '📚', name: 'Bookworm', desc: 'Download all notes', unlocked: false },
  ];

  grid.innerHTML = badges.map(b => `
    <div class="badge-card ${b.unlocked ? '' : 'locked'}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>
  `).join('');
}

function setupDashNav() {
  document.querySelectorAll('.dash-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      if (section) {
        document.querySelectorAll('.dash-section').forEach(s => s.style.display = 'none');
        document.querySelectorAll('.dash-nav-item').forEach(i => i.classList.remove('active'));
        const target = document.getElementById('section-' + section);
        if (target) { target.style.display = 'block'; item.classList.add('active'); }
      }
    });
  });
}

window.renderProfile = renderProfile;
