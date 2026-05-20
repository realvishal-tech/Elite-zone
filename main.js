/* ===== ELITE ZONE — MAIN.JS ===== */
'use strict';

// ===== DATA =====
const BATCHES = [
  { id: 1,  name: 'C Programming',         emoji: '🔵', slug: 'c-programming',         level: 'Beginner',     duration: '6 weeks',  videos: 42, notes: 12, dpp: 15, tests: 6,  c1: '#1a237e', c2: '#0d47a1', tags: ['basics','systems'], desc: 'Master the foundation of all programming with C — variables, pointers, arrays, and memory management.' },
  { id: 2,  name: 'C++ Programming',        emoji: '⚡', slug: 'cpp-programming',        level: 'Intermediate', duration: '8 weeks',  videos: 58, notes: 16, dpp: 20, tests: 8,  c1: '#4a148c', c2: '#6a1b9a', tags: ['oop','systems'], desc: 'Deep dive into OOP, STL, templates and modern C++ practices used in competitive programming.' },
  { id: 3,  name: 'Java Mastery',           emoji: '☕', slug: 'java-mastery',           level: 'Intermediate', duration: '10 weeks', videos: 72, notes: 20, dpp: 25, tests: 10, c1: '#b71c1c', c2: '#c62828', tags: ['oop','enterprise'], desc: 'Complete Java from basics to advanced — OOP, collections, multithreading, JDBC and Spring basics.' },
  { id: 4,  name: 'Python Development',     emoji: '🐍', slug: 'python-development',     level: 'Beginner',     duration: '8 weeks',  videos: 65, notes: 18, dpp: 22, tests: 8,  c1: '#1b5e20', c2: '#2e7d32', tags: ['scripting','ai'], desc: 'Learn Python from scratch — data types, functions, OOP, file handling, and libraries for data science.' },
  { id: 5,  name: 'JavaScript Complete',    emoji: '🌐', slug: 'javascript-complete',    level: 'Intermediate', duration: '9 weeks',  videos: 70, notes: 19, dpp: 24, tests: 9,  c1: '#f57f17', c2: '#f9a825', tags: ['web','frontend'], desc: 'Complete JavaScript — ES6+, DOM manipulation, async/await, APIs, and modern JS patterns.' },
  { id: 6,  name: 'DSA',                    emoji: '🧩', slug: 'dsa',                    level: 'Advanced',     duration: '16 weeks', videos: 120,notes: 32, dpp: 60, tests: 15, c1: '#006064', c2: '#00838f', tags: ['algorithms','interview'], desc: 'Master data structures and algorithms — arrays, trees, graphs, DP, and competitive problem solving.' },
  { id: 7,  name: 'Web Development',        emoji: '🕸️', slug: 'web-development',        level: 'Beginner',     duration: '12 weeks', videos: 88, notes: 24, dpp: 30, tests: 10, c1: '#311b92', c2: '#4527a0', tags: ['html','css','js'], desc: 'Full web dev journey — HTML5, CSS3, responsive design, JavaScript and deploying live projects.' },
  { id: 8,  name: 'React JS',               emoji: '⚛️', slug: 'react-js',               level: 'Intermediate', duration: '8 weeks',  videos: 62, notes: 18, dpp: 20, tests: 8,  c1: '#01579b', c2: '#0277bd', tags: ['frontend','library'], desc: 'Build modern UIs with React — components, hooks, state management, React Router, and project builds.' },
  { id: 9,  name: 'Node JS',                emoji: '🟢', slug: 'node-js',                level: 'Intermediate', duration: '7 weeks',  videos: 55, notes: 15, dpp: 18, tests: 7,  c1: '#1b5e20', c2: '#33691e', tags: ['backend','server'], desc: 'Backend development with Node.js — Express, REST APIs, authentication, MongoDB integration.' },
  { id: 10, name: 'Full Stack Development', emoji: '🚀', slug: 'full-stack',             level: 'Advanced',     duration: '20 weeks', videos: 150,notes: 40, dpp: 50, tests: 15, c1: '#3e2723', c2: '#4e342e', tags: ['mern','fullstack'], desc: 'Complete MERN stack — build production-ready full-stack apps with React frontend and Node backend.' },
  { id: 11, name: 'DBMS',                   emoji: '🗄️', slug: 'dbms',                   level: 'Intermediate', duration: '7 weeks',  videos: 52, notes: 15, dpp: 18, tests: 7,  c1: '#004d40', c2: '#00695c', tags: ['database','sql'], desc: 'Database fundamentals — ER diagrams, normalization, SQL queries, transactions, and NoSQL basics.' },
  { id: 12, name: 'Operating System',       emoji: '💻', slug: 'operating-system',       level: 'Intermediate', duration: '8 weeks',  videos: 60, notes: 17, dpp: 20, tests: 8,  c1: '#212121', c2: '#424242', tags: ['cs-core','system'], desc: 'Core OS concepts — processes, threads, memory management, deadlocks, scheduling algorithms.' },
  { id: 13, name: 'Computer Networks',      emoji: '🌍', slug: 'computer-networks',      level: 'Intermediate', duration: '7 weeks',  videos: 54, notes: 16, dpp: 18, tests: 7,  c1: '#0d47a1', c2: '#1565c0', tags: ['networking','protocols'], desc: 'Networking fundamentals — OSI model, TCP/IP, HTTP, DNS, routing algorithms and security basics.' },
  { id: 14, name: 'Software Engineering',   emoji: '⚙️', slug: 'software-engineering',   level: 'Intermediate', duration: '6 weeks',  videos: 45, notes: 14, dpp: 15, tests: 6,  c1: '#37474f', c2: '#455a64', tags: ['sdlc','design'], desc: 'SDLC, design patterns, UML, agile methodology, testing strategies and software project management.' },
  { id: 15, name: 'Android Development',   emoji: '📱', slug: 'android-development',    level: 'Intermediate', duration: '10 weeks', videos: 75, notes: 20, dpp: 25, tests: 8,  c1: '#2e7d32', c2: '#388e3c', tags: ['mobile','kotlin'], desc: 'Build real Android apps with Kotlin — activities, fragments, RecyclerView, Firebase integration.' },
  { id: 16, name: 'Git & GitHub',           emoji: '🐙', slug: 'git-github',             level: 'Beginner',     duration: '3 weeks',  videos: 28, notes: 8,  dpp: 10, tests: 3,  c1: '#1a1a2e', c2: '#16213e', tags: ['tools','versioning'], desc: 'Version control mastery — git commands, branching, merging, pull requests and collaboration workflows.' },
  { id: 17, name: 'AI & Machine Learning',  emoji: '🤖', slug: 'ai-ml',                  level: 'Advanced',     duration: '14 weeks', videos: 98, notes: 28, dpp: 35, tests: 12, c1: '#6a1b9a', c2: '#7b1fa2', tags: ['ai','python','ml'], desc: 'ML fundamentals to advanced — regression, classification, neural networks, scikit-learn, TensorFlow.' },
  { id: 18, name: 'Cyber Security',         emoji: '🛡️', slug: 'cyber-security',         level: 'Advanced',     duration: '10 weeks', videos: 74, notes: 20, dpp: 28, tests: 9,  c1: '#b71c1c', c2: '#d32f2f', tags: ['security','ethical-hacking'], desc: 'Security concepts — ethical hacking, penetration testing, cryptography, network security, OWASP.' },
  { id: 19, name: 'Cloud Computing',        emoji: '☁️', slug: 'cloud-computing',        level: 'Intermediate', duration: '9 weeks',  videos: 68, notes: 18, dpp: 22, tests: 8,  c1: '#006064', c2: '#0097a7', tags: ['aws','cloud','devops'], desc: 'Cloud fundamentals — AWS/GCP services, serverless, containers, Docker, Kubernetes basics, deployment.' },
  { id: 20, name: 'Placement Preparation',  emoji: '🎯', slug: 'placement-prep',         level: 'Advanced',     duration: '8 weeks',  videos: 80, notes: 22, dpp: 40, tests: 15, c1: '#e65100', c2: '#f57c00', tags: ['interview','aptitude'], desc: 'Complete placement prep — aptitude, coding rounds, HR interviews, resume building, mock interviews.' },
];

// ===== STORAGE HELPERS =====
const storage = {
  get: (k) => { try { return JSON.parse(localStorage.getItem('ez_' + k)); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem('ez_' + k, JSON.stringify(v)); } catch {} },
  remove: (k) => { localStorage.removeItem('ez_' + k); }
};

// ===== AUTH =====
const Auth = {
  getUser: () => storage.get('user'),
  isLoggedIn: () => !!storage.get('user'),
  isAdmin: () => { const u = storage.get('user'); return u && u.role === 'admin'; },
  login: (data) => { storage.set('user', data); },
  logout: () => { storage.remove('user'); window.location.href = 'index.html'; },
};

// ===== TOAST SYSTEM =====
const Toast = {
  container: null,
  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },
  show(msg, type = 'info', duration = 3500) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${msg}</span>`;
    this.container.appendChild(t);
    setTimeout(() => { t.style.animation = 'slideInRight 0.3s ease reverse'; setTimeout(() => t.remove(), 300); }, duration);
  }
};

// ===== REGISTRATION MODAL =====
const Registration = {
  ADMIN_EMAIL: 'admin@elitezone.in',
  ADMIN_PASS: 'admin123',

  init() {
    if (!Auth.isLoggedIn()) {
      this.showModal();
    } else {
      this.updateNav();
    }
  },

  showModal(isLogin = false) {
    const existing = document.getElementById('reg-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay'; modal.id = 'reg-modal';
    modal.style.zIndex = '9999';

    modal.innerHTML = `
      <div class="modal-box">
        <div style="text-align:center;margin-bottom:2rem;">
          <div class="nav-logo-icon" style="width:52px;height:52px;font-size:1.5rem;margin:0 auto 1rem;">⚡</div>
          <h2 style="font-family:var(--font-display);font-size:1.6rem;font-weight:800;margin-bottom:0.5rem;">${isLogin ? 'Welcome Back' : 'Join Elite Zone'}</h2>
          <p style="color:var(--text-secondary);font-size:0.875rem;">${isLogin ? 'Sign in to continue your learning journey' : 'Create your free account to get started'}</p>
        </div>

        <div id="modal-tabs" style="display:flex;gap:0.25rem;background:var(--glass);border:1px solid var(--glass-border);border-radius:10px;padding:4px;margin-bottom:1.75rem;">
          <button onclick="Registration.switchTab('register')" id="tab-register" class="btn ${!isLogin?'btn-primary':'btn-glass'}" style="flex:1;justify-content:center;border-radius:7px;">Register</button>
          <button onclick="Registration.switchTab('login')" id="tab-login" class="btn ${isLogin?'btn-primary':'btn-glass'}" style="flex:1;justify-content:center;border-radius:7px;">Sign In</button>
        </div>

        <div id="panel-register" style="display:${isLogin?'none':'block'}">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
            <div>
              <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Full Name *</label>
              <input class="input-field" id="reg-name" placeholder="Vishal Kumar" type="text">
            </div>
            <div>
              <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Semester *</label>
              <select class="input-field" id="reg-sem">
                ${[1,2,3,4,5,6].map(s=>`<option value="${s}">Semester ${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
            <div>
              <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Roll Number *</label>
              <input class="input-field" id="reg-roll" placeholder="BCA-2024-001" type="text">
            </div>
            <div>
              <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Registration No. *</label>
              <input class="input-field" id="reg-regno" placeholder="24LND001" type="text">
            </div>
          </div>
          <div style="margin-bottom:1rem;">
            <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">College *</label>
            <input class="input-field" id="reg-college" placeholder="LND College" value="LND College" type="text">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
            <div>
              <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Phone *</label>
              <input class="input-field" id="reg-phone" placeholder="9876543210" type="tel">
            </div>
            <div>
              <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Email *</label>
              <input class="input-field" id="reg-email" placeholder="you@email.com" type="email">
            </div>
          </div>
          <div style="margin-bottom:1.5rem;">
            <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Password *</label>
            <input class="input-field" id="reg-pass" placeholder="Min 6 characters" type="password">
          </div>
          <button class="btn btn-primary" style="width:100%;justify-content:center;padding:0.85rem;" onclick="Registration.register()">
            🚀 Create Account
          </button>
        </div>

        <div id="panel-login" style="display:${isLogin?'block':'none'}">
          <div style="margin-bottom:1rem;">
            <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Email *</label>
            <input class="input-field" id="login-email" placeholder="you@email.com" type="email">
          </div>
          <div style="margin-bottom:1.5rem;">
            <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:0.4rem;">Password *</label>
            <input class="input-field" id="login-pass" placeholder="Your password" type="password">
          </div>
          <button class="btn btn-primary" style="width:100%;justify-content:center;padding:0.85rem;" onclick="Registration.login()">
            ⚡ Sign In
          </button>
          <p style="text-align:center;margin-top:1rem;font-size:0.78rem;color:var(--text-muted);">Admin? Email: admin@elitezone.in | Pass: admin123</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  switchTab(tab) {
    document.getElementById('panel-register').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('panel-login').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('tab-register').className = `btn ${tab==='register'?'btn-primary':'btn-glass'}`;
    document.getElementById('tab-login').className = `btn ${tab==='login'?'btn-primary':'btn-glass'}`;
  },

  register() {
    const name = document.getElementById('reg-name').value.trim();
    const sem = document.getElementById('reg-sem').value;
    const roll = document.getElementById('reg-roll').value.trim();
    const regno = document.getElementById('reg-regno').value.trim();
    const college = document.getElementById('reg-college').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value;

    if (!name || !roll || !regno || !phone || !email || !pass) {
      Toast.show('Please fill all required fields', 'error'); return;
    }
    if (pass.length < 6) { Toast.show('Password must be at least 6 characters', 'error'); return; }

    const user = {
      name, sem, roll, regno, college, phone, email,
      role: 'student', xp: 0, streak: 0,
      enrolled: [], progress: {}, badges: [],
      joinDate: new Date().toISOString(),
      initials: name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
    };

    // Save users list
    const users = storage.get('users') || [];
    if (users.find(u => u.email === email)) {
      Toast.show('Email already registered. Please sign in.', 'error'); return;
    }
    users.push({ ...user, pass });
    storage.set('users', users);
    Auth.login(user);
    document.getElementById('reg-modal').remove();
    this.updateNav();
    Toast.show(`Welcome to Elite Zone, ${name}! 🚀`, 'success');
    this.triggerConfetti();
  },

  login() {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value;

    if (!email || !pass) { Toast.show('Please enter email and password', 'error'); return; }

    // Admin check
    if (email === this.ADMIN_EMAIL && pass === this.ADMIN_PASS) {
      Auth.login({ name: 'Admin', email, role: 'admin', initials: 'AD' });
      document.getElementById('reg-modal').remove();
      this.updateNav();
      Toast.show('Admin login successful!', 'success');
      return;
    }

    const users = storage.get('users') || [];
    const found = users.find(u => u.email === email && u.pass === pass);
    if (!found) { Toast.show('Invalid email or password', 'error'); return; }

    const { pass: _, ...user } = found;
    Auth.login(user);
    document.getElementById('reg-modal').remove();
    this.updateNav();
    Toast.show(`Welcome back, ${user.name}! ⚡`, 'success');
  },

  updateNav() {
    const user = Auth.getUser();
    if (!user) return;
    const nav = document.querySelector('.nav-actions');
    if (!nav) return;

    const existing = nav.querySelector('.nav-avatar');
    if (existing) existing.remove();

    const avatar = document.createElement('div');
    avatar.className = 'nav-avatar';
    avatar.textContent = user.initials || user.name.slice(0,2).toUpperCase();
    avatar.title = user.name;
    avatar.onclick = () => this.showUserMenu(avatar, user);
    nav.insertBefore(avatar, nav.firstChild);

    // Show admin link if admin
    if (user.role === 'admin') {
      const adminLink = document.querySelector('[data-admin-link]');
      if (adminLink) adminLink.style.display = 'inline';
    }
  },

  showUserMenu(anchor, user) {
    const existing = document.getElementById('user-menu');
    if (existing) { existing.remove(); return; }

    const menu = document.createElement('div');
    menu.id = 'user-menu';
    menu.style.cssText = `position:fixed;top:${anchor.getBoundingClientRect().bottom + 8}px;right:1rem;
      background:var(--surface);border:1px solid var(--glass-border);border-radius:14px;
      padding:0.75rem;z-index:9000;min-width:200px;animation:slideDown 0.2s ease;
      box-shadow:0 8px 32px rgba(0,0,0,0.5);`;

    menu.innerHTML = `
      <div style="padding:0.5rem 0.5rem 0.75rem;border-bottom:1px solid var(--glass-border);margin-bottom:0.5rem;">
        <div style="font-family:var(--font-display);font-weight:700;font-size:0.9rem;">${user.name}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);">${user.email}</div>
      </div>
      <a href="dashboard.html" style="display:flex;align-items:center;gap:0.65rem;padding:0.55rem 0.65rem;border-radius:8px;color:var(--text-secondary);text-decoration:none;font-size:0.85rem;transition:all 0.2s;" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''" >📊 Dashboard</a>
      ${user.role === 'admin' ? `<a href="admin.html" style="display:flex;align-items:center;gap:0.65rem;padding:0.55rem 0.65rem;border-radius:8px;color:var(--pulse);text-decoration:none;font-size:0.85rem;transition:all 0.2s;" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">⚙️ Admin Panel</a>` : ''}
      <button onclick="Auth.logout()" style="display:flex;align-items:center;gap:0.65rem;padding:0.55rem 0.65rem;border-radius:8px;color:var(--text-secondary);font-size:0.85rem;width:100%;background:none;border:none;cursor:pointer;transition:all 0.2s;margin-top:0.25rem;" onmouseover="this.style.background='rgba(255,60,172,0.1)';this.style.color='var(--pulse)'" onmouseout="this.style.background='';this.style.color='var(--text-secondary)'">🚪 Sign Out</button>
    `;

    document.body.appendChild(menu);
    setTimeout(() => document.addEventListener('click', function close(e) {
      if (!menu.contains(e.target) && !anchor.contains(e.target)) { menu.remove(); document.removeEventListener('click', close); }
    }), 100);
  },

  triggerConfetti() {
    const colors = ['#6c3fff','#00e5ff','#ff3cac','#ffd166','#06ffa5'];
    for (let i = 0; i < 60; i++) {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;z-index:9999;pointer-events:none;
        width:${Math.random()*8+4}px;height:${Math.random()*8+4}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        border-radius:${Math.random()>0.5?'50%':'2px'};
        left:${Math.random()*100}vw;top:-10px;
        animation:fall ${Math.random()*2+1}s ease-out ${Math.random()*0.5}s forwards;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
    // Inject fall animation once
    if (!document.getElementById('confetti-style')) {
      const s = document.createElement('style');
      s.id = 'confetti-style';
      s.textContent = `@keyframes fall { to { transform: translateY(105vh) rotate(${Math.random()*720}deg); opacity:0; } }`;
      document.head.appendChild(s);
    }
  }
};

// ===== NAV SETUP =====
function setupNav() {
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Mark active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// ===== REQUIRE AUTH GUARD =====
function requireAuth() {
  if (!Auth.isLoggedIn()) {
    Registration.showModal();
    return false;
  }
  return true;
}

// ===== BATCH UTILS =====
function getBatch(slugOrId) {
  return BATCHES.find(b => b.slug === slugOrId || b.id === slugOrId);
}

function getBatchUrl(batch) {
  return `batch-detail.html?batch=${batch.slug}`;
}

function enrollBatch(batchId) {
  if (!requireAuth()) return;
  const user = Auth.getUser();
  if (!user.enrolled) user.enrolled = [];
  if (!user.enrolled.includes(batchId)) {
    user.enrolled.push(batchId);
    storage.set('user', user);
    // Update users list too
    const users = storage.get('users') || [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx > -1) { users[idx].enrolled = user.enrolled; storage.set('users', users); }
    Toast.show('Batch enrolled successfully! 🎉', 'success');
  } else {
    Toast.show('Already enrolled in this batch', 'info');
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  setupNav();
  Registration.init();
  Registration.updateNav();
});

// Expose globally
window.BATCHES = BATCHES;
window.Auth = Auth;
window.Toast = Toast;
window.Registration = Registration;
window.storage = storage;
window.getBatch = getBatch;
window.getBatchUrl = getBatchUrl;
window.enrollBatch = enrollBatch;
window.requireAuth = requireAuth;
