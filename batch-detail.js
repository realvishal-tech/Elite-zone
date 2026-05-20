/* ===== ELITE ZONE — BATCH-DETAIL.JS ===== */

let currentBatch = null;
let currentVideoIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('batch');

  if (!slug) { window.location.href = 'batches.html'; return; }

  currentBatch = getBatch(slug);
  if (!currentBatch) { window.location.href = 'batches.html'; return; }

  document.title = `${currentBatch.name} — Elite Zone`;

  renderBatchDetail();
  setupTabs();
  checkEnrollment();
});

function renderBatchDetail() {
  const b = currentBatch;
  const mentorName = getMentorName(b.id);

  // BREADCRUMB
  setEl('batch-breadcrumb-name', b.name);

  // HERO
  setEl('batch-emoji', b.emoji);
  setEl('batch-title', b.name);
  setEl('batch-mentor-name', mentorName);
  setEl('batch-desc', b.desc);
  setEl('batch-level', b.level);
  setEl('batch-duration', b.duration);
  setEl('batch-video-count', b.videos + ' Videos');
  setEl('batch-notes-count', b.notes + ' Notes');
  setEl('batch-dpp-count', b.dpp + ' DPPs');
  setEl('batch-tests-count', b.tests + ' Tests');

  // Sidebar
  setEl('sidebar-batch-emoji', b.emoji);
  const bg = document.getElementById('sidebar-batch-bg');
  if (bg) bg.style.background = `linear-gradient(135deg,${b.c1},${b.c2})`;
  const heroBg = document.getElementById('batch-hero-bg-el');
  if (heroBg) heroBg.style.background = `radial-gradient(ellipse 60% 80% at 20% 50%, ${b.c1}25 0%, transparent 70%)`;

  // RENDER VIDEO LIST
  renderVideos();
  // RENDER NOTES
  renderNotes();
  // RENDER DPP
  renderDPP();
  // RENDER TESTS
  renderTests();
  // RENDER ROADMAP
  renderRoadmap();
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function getMentorName(id) {
  const mentors = {1:'Rajesh Kumar',2:'Priya Sharma',3:'Amit Singh',4:'Neha Gupta',5:'Rohit Verma',
    6:'Ankit Tiwari',7:'Sanya Patel',8:'Varun Mehta',9:'Pooja Yadav',10:'Arjun Reddy',
    11:'Deepika Joshi',12:'Karan Malhotra',13:'Ravi Shankar',14:'Sneha Agarwal',15:'Mohit Sharma',
    16:'Ishaan Kapoor',17:'Tanvi Gupta',18:'Aditya Kumar',19:'Shivani Rao',20:'Rahul Nair'};
  return mentors[id] || 'Expert Mentor';
}

function getVideoTopics(batchId) {
  const topicsMap = {
    1: ['Introduction to C','Variables & Data Types','Operators','Control Flow','Functions','Arrays','Pointers','Strings','Structures','File I/O','Dynamic Memory','Preprocessors','Recursion','Linked Lists','Sorting Algorithms'],
    2: ['C++ Basics','OOP Concepts','Classes & Objects','Inheritance','Polymorphism','Templates','STL Vectors','STL Maps','Iterators','Algorithms','Smart Pointers','Move Semantics','Lambda Functions','Exceptions','Projects'],
    3: ['Java Basics','Variables & Types','OOP in Java','Inheritance','Interfaces','Collections','Generics','Exception Handling','Multithreading','JDBC','Spring Basics','Maven','JUnit Testing','Design Patterns','Mini Project'],
    6: ['Arrays & Strings','Linked Lists','Stacks & Queues','Trees','Binary Search Trees','Graphs','Hash Tables','Sorting Algorithms','Searching','Dynamic Programming','Greedy Algorithms','Backtracking','Divide & Conquer','Graph Algorithms','Competitive Practice'],
    7: ['HTML Basics','Semantic HTML','CSS Fundamentals','Flexbox','CSS Grid','Responsive Design','JavaScript DOM','Events','Fetch API','Bootstrap','Tailwind CSS','SCSS','Projects','Deployment','Performance'],
  };
  return topicsMap[batchId] || Array.from({length: Math.min(currentBatch.videos, 20)}, (_, i) => `Lecture ${i+1}: ${currentBatch.name} Concepts`);
}

function renderVideos() {
  const container = document.getElementById('video-list');
  if (!container) return;
  const topics = getVideoTopics(currentBatch.id);
  const user = Auth.getUser();
  const progress = user?.progress?.[currentBatch.slug] || {};
  const durations = ['8:30','12:45','15:20','10:55','20:10','18:35','9:15','14:40','22:00','17:25','11:50','13:30','16:10','19:00','8:45','23:15','12:00','10:20','15:00','11:30'];

  container.innerHTML = topics.map((topic, i) => {
    const done = progress[i] === 'done';
    const dur = durations[i % durations.length];
    return `
      <div class="video-item ${done ? 'completed' : ''}" onclick="openVideoModal(${i}, '${topic.replace(/'/g,"\\'")}')">
        <div class="video-thumb" style="background:linear-gradient(135deg,${currentBatch.c1},${currentBatch.c2})">
          <div class="video-num">${String(i+1).padStart(2,'0')}</div>
          ▶
        </div>
        <div class="video-info">
          <div class="video-title">${topic}</div>
          <div class="video-meta">
            <span>🕒 ${dur}</span>
            <span>${done ? '✅ Completed' : '⭕ Not watched'}</span>
          </div>
        </div>
        <div class="video-status">
          ${done ? '<span class="done">✅</span>' : '<span class="play-btn">▶</span>'}
        </div>
      </div>
    `;
  }).join('');
}

function openVideoModal(index, title) {
  if (!requireAuth()) return;
  currentVideoIndex = index;
  const existing = document.getElementById('video-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'video-modal'; modal.id = 'video-modal';

  // Using YouTube embed (sample educational video)
  const ytIds = ['dQw4w9WgXcQ','C7RgFVCpkHo','rfscVS0vtbw','zOjov-2OZ0E','HXV3zeQKqGY'];
  const ytId = ytIds[index % ytIds.length];

  modal.innerHTML = `
    <div class="video-modal-inner">
      <div class="video-modal-header">
        <div>
          <div class="video-modal-title">Lecture ${index+1}: ${title}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem;">${currentBatch.name}</div>
        </div>
        <button class="video-close" onclick="closeVideoModal()">✕</button>
      </div>
      <div class="video-player-area">
        <iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1"
          allowfullscreen allow="autoplay; encrypted-media" style="width:100%;height:100%;border:none;aspect-ratio:16/9;"></iframe>
      </div>
      <div class="video-modal-footer">
        <div style="display:flex;gap:0.75rem;align-items:center;">
          <button class="btn btn-glass btn-sm" onclick="prevVideo()" ${index===0?'disabled':''}>⬅ Prev</button>
          <button class="btn btn-glass btn-sm" onclick="nextVideo()">Next ➡</button>
        </div>
        <button class="btn btn-primary btn-sm" onclick="markDone(${index})">✅ Mark Complete</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) closeVideoModal(); });
}

function closeVideoModal() {
  document.getElementById('video-modal')?.remove();
}

function prevVideo() {
  if (currentVideoIndex > 0) {
    const topics = getVideoTopics(currentBatch.id);
    openVideoModal(currentVideoIndex - 1, topics[currentVideoIndex - 1]);
  }
}

function nextVideo() {
  const topics = getVideoTopics(currentBatch.id);
  if (currentVideoIndex < topics.length - 1) {
    openVideoModal(currentVideoIndex + 1, topics[currentVideoIndex + 1]);
  }
}

function markDone(index) {
  if (!requireAuth()) return;
  const user = Auth.getUser();
  if (!user.progress) user.progress = {};
  if (!user.progress[currentBatch.slug]) user.progress[currentBatch.slug] = {};
  user.progress[currentBatch.slug][index] = 'done';
  storage.set('user', user);

  // Update XP
  user.xp = (user.xp || 0) + 10;
  storage.set('user', user);

  Toast.show('Lecture completed! +10 XP 🎉', 'success');
  renderVideos();
  updateProgress();
}

function updateProgress() {
  const user = Auth.getUser();
  const progress = user?.progress?.[currentBatch.slug] || {};
  const topics = getVideoTopics(currentBatch.id);
  const done = Object.values(progress).filter(v => v === 'done').length;
  const pct = Math.round((done / topics.length) * 100);

  const fill = document.getElementById('batch-progress-fill');
  const label = document.getElementById('batch-progress-label');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${pct}% Complete`;
}

function renderNotes() {
  const container = document.getElementById('notes-grid');
  if (!container) return;
  const noteNames = ['Chapter 1 - Introduction','Chapter 2 - Core Concepts','Chapter 3 - Advanced Topics',
    'Chapter 4 - Practice Problems','Quick Reference Cheat Sheet','Interview Questions Sheet',
    'Project Guidelines','Revision Notes'];

  container.innerHTML = noteNames.slice(0, currentBatch.notes > 8 ? 8 : currentBatch.notes).map((name, i) => `
    <div class="note-card">
      <div class="note-icon">📄</div>
      <div class="note-name">${name}</div>
      <div class="note-size">${(Math.random()*3+0.5).toFixed(1)} MB · PDF</div>
      <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;" onclick="downloadNote('${name}')">⬇ Download</button>
    </div>
  `).join('');
}

function downloadNote(name) {
  if (!requireAuth()) return;
  Toast.show(`Downloading "${name}"... 📥`, 'success');
}

function renderDPP() {
  const container = document.getElementById('dpp-list');
  if (!container) return;
  const difficulties = ['easy','medium','hard'];
  const topics = getVideoTopics(currentBatch.id);

  container.innerHTML = topics.slice(0, Math.min(10, currentBatch.dpp)).map((topic, i) => {
    const diff = difficulties[i % 3];
    return `
      <div class="dpp-item">
        <div class="dpp-num">${String(i+1).padStart(2,'0')}</div>
        <div class="dpp-info">
          <div class="dpp-title">DPP ${i+1} — ${topic.split(':')[0] || topic}</div>
          <div class="dpp-meta">📝 ${5 + (i%5)*2} Questions · Due: Anytime</div>
        </div>
        <span class="dpp-difficulty ${diff}">${diff.charAt(0).toUpperCase()+diff.slice(1)}</span>
        <button class="btn btn-glass btn-sm" onclick="openDPP(${i+1})">Open</button>
      </div>
    `;
  }).join('');
}

function openDPP(num) {
  if (!requireAuth()) return;
  Toast.show(`DPP ${num} opened! Practice well 💪`, 'info');
}

function renderTests() {
  const container = document.getElementById('tests-list');
  if (!container) return;

  const tests = Array.from({length: Math.min(currentBatch.tests, 5)}, (_, i) => ({
    name: `Test ${i+1} — ${['Unit Test', 'Mid Term', 'Weekly Test', 'Practice Test', 'Final Mock'][i] || 'Test'}`,
    questions: 20 + i*5,
    time: 30 + i*10,
    status: i === 0 ? 'available' : i < 3 ? 'locked' : 'available'
  }));

  container.innerHTML = tests.map((t, i) => `
    <div class="test-card">
      <div class="test-header">
        <div>
          <div class="test-title">${t.name}</div>
          <div class="test-meta">
            <span>❓ ${t.questions} Questions</span>
            <span>⏱ ${t.time} Minutes</span>
            <span>🎯 MCQ + Coding</span>
          </div>
        </div>
        <span class="badge badge-${t.status==='available'?'mint':'plasma'}">${t.status === 'available' ? 'Available' : '🔒 Locked'}</span>
      </div>
      ${t.status === 'available' ? `
        <button class="btn btn-primary btn-sm" onclick="startTest(${i+1})">🚀 Start Test</button>
      ` : `
        <p style="font-size:0.8rem;color:var(--text-muted);">Complete previous tests to unlock</p>
      `}
    </div>
  `).join('');
}

function startTest(num) {
  if (!requireAuth()) return;
  Toast.show(`Test ${num} starting... Get ready! ⚡`, 'info');
}

function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  if (!container) return;
  const stages = [
    { phase: 'Phase 1', title: 'Foundation', desc: 'Learn core concepts and syntax', icon: '🎯', color: 'var(--neon)' },
    { phase: 'Phase 2', title: 'Core Skills', desc: 'Build practical programming skills', icon: '⚡', color: 'var(--plasma-light)' },
    { phase: 'Phase 3', title: 'Advanced Topics', desc: 'Master advanced concepts and patterns', icon: '🚀', color: 'var(--pulse)' },
    { phase: 'Phase 4', title: 'Projects', desc: 'Build real-world projects for portfolio', icon: '🏆', color: 'var(--gold)' },
  ];

  container.innerHTML = stages.map((s, i) => `
    <div style="display:flex;gap:1.25rem;align-items:flex-start;${i<stages.length-1?'margin-bottom:1.5rem;':''}">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">
        <div style="width:44px;height:44px;border-radius:12px;background:${s.color}20;border:2px solid ${s.color};
          display:flex;align-items:center;justify-content:center;font-size:1.2rem;">${s.icon}</div>
        ${i<stages.length-1?`<div style="width:2px;height:40px;background:linear-gradient(${s.color},${stages[i+1].color});margin:8px 0;opacity:0.3;"></div>`:''}
      </div>
      <div style="flex:1;padding-top:0.6rem;">
        <div style="font-size:0.7rem;color:${s.color};font-family:var(--font-mono);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.2rem;">${s.phase}</div>
        <div style="font-family:var(--font-display);font-weight:700;margin-bottom:0.3rem;">${s.title}</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);">${s.desc}</div>
      </div>
    </div>
  `).join('');
}

function checkEnrollment() {
  const user = Auth.getUser();
  const enrolled = user?.enrolled?.includes(currentBatch.id);
  const btn = document.getElementById('enroll-btn');
  if (btn) {
    if (enrolled) {
      btn.textContent = '✅ Already Enrolled';
      btn.style.background = 'rgba(6,255,165,0.15)';
      btn.style.border = '1px solid rgba(6,255,165,0.3)';
      btn.style.color = 'var(--mint)';
    } else {
      btn.textContent = '🚀 Enroll for Free';
    }
  }
  updateProgress();
}

function setupTabs() {
  document.querySelectorAll('.batch-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.batch-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
    });
  });
}

window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.prevVideo = prevVideo;
window.nextVideo = nextVideo;
window.markDone = markDone;
window.downloadNote = downloadNote;
window.openDPP = openDPP;
window.startTest = startTest;
