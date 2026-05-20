/* ===== ELITE ZONE — COMMUNITY.JS ===== */

const SAMPLE_POSTS = [
  {
    id: 1, author: 'Arjun Singh', initials: 'AS', color: 'var(--plasma)',
    time: '2 hours ago', room: 'general', pinned: true,
    content: '🚀 Welcome to Elite Zone Community! This is your space to ask doubts, share knowledge, and grow together. Drop a hello below! 👇',
    likes: 48, comments: 12, liked: false
  },
  {
    id: 2, author: 'Priya Sharma', initials: 'PS', color: 'var(--neon)',
    time: '4 hours ago', room: 'general',
    content: 'Just completed the DSA batch! The Dynamic Programming section was 🔥. Pro tip — solve LeetCode problems ALONGSIDE the videos, not after. Game changer!',
    likes: 31, comments: 8, liked: false
  },
  {
    id: 3, author: 'Rahul Kumar', initials: 'RK', color: 'var(--gold)',
    time: '6 hours ago', room: 'doubt',
    content: 'Can someone explain the difference between HashMap and TreeMap in Java? I know HashMap is O(1) for get/put but when should I use TreeMap?',
    code: `// HashMap - unordered, O(1) avg
HashMap<String, Integer> map = new HashMap<>();

// TreeMap - sorted, O(log n)
TreeMap<String, Integer> treeMap = new TreeMap<>();
// Use TreeMap when you need sorted keys!`,
    likes: 14, comments: 19, liked: false
  },
  {
    id: 4, author: 'Sneha Gupta', initials: 'SG', color: 'var(--mint)',
    time: '8 hours ago', room: 'projects',
    content: 'Built my first full-stack project using the MERN stack batch content! It\'s a Student Result Management System. GitHub link in profile. Feedback welcome! 🎉',
    likes: 67, comments: 23, liked: false
  },
  {
    id: 5, author: 'Vikram Patel', initials: 'VP', color: 'var(--pulse)',
    time: '1 day ago', room: 'placement',
    content: 'Interview prep tip: Don\'t just memorize solutions. Understand WHY the algorithm works. Interviewers always ask "why did you choose this approach?" Be ready!',
    likes: 89, comments: 34, liked: false
  },
  {
    id: 6, author: 'Anita Rao', initials: 'AR', color: '#06ffa5',
    time: '1 day ago', room: 'doubt',
    content: 'Quick Python tip: Use list comprehension instead of loops for cleaner code!',
    code: `# Slow & verbose
squares = []
for i in range(10):
    squares.append(i**2)

# Fast & Pythonic ✨
squares = [i**2 for i in range(10)]`,
    likes: 52, comments: 7, liked: false
  }
];

let currentRoom = 'general';
let posts = JSON.parse(localStorage.getItem('ez_posts') || 'null') || SAMPLE_POSTS;

document.addEventListener('DOMContentLoaded', () => {
  renderFeed();
  setupRooms();
  setupPostCreator();
  renderOnlineUsers();
  setInterval(updateTimestamps, 60000);
});

function renderFeed() {
  const feed = document.getElementById('comm-feed');
  if (!feed) return;

  const filtered = currentRoom === 'general'
    ? posts
    : posts.filter(p => p.room === currentRoom);

  if (!filtered.length) {
    feed.innerHTML = `
      <div style="text-align:center;padding:4rem 2rem;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:1rem;">💬</div>
        <h3 style="font-family:var(--font-display);margin-bottom:0.5rem;color:var(--text-secondary);">No posts yet</h3>
        <p style="font-size:0.875rem;">Be the first to start a conversation!</p>
      </div>`;
    return;
  }

  feed.innerHTML = filtered.map(p => `
    <div class="post-card" id="post-${p.id}">
      <div class="post-header">
        <div class="post-avatar" style="background:${p.color}20;border:1px solid ${p.color}50;color:${p.color};">${p.initials}</div>
        <div class="post-meta-info">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <span class="post-author">${p.author}</span>
            ${p.pinned ? '<span style="font-size:0.72rem;color:var(--gold);">📌 Pinned</span>' : ''}
          </div>
          <div class="post-timestamp">${p.time} · #${p.room}</div>
        </div>
        <button onclick="reportPost(${p.id})" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;padding:0.25rem;">⋯</button>
      </div>
      <div class="post-content">${p.content}</div>
      ${p.code ? `<pre class="post-code">${escapeHtml(p.code)}</pre>` : ''}
      <div class="post-footer">
        <button class="post-action ${p.liked ? 'liked' : ''}" onclick="likePost(${p.id})">
          ${p.liked ? '❤️' : '🤍'} <span>${p.likes}</span>
        </button>
        <button class="post-action" onclick="focusReply(${p.id})">
          💬 <span>${p.comments}</span>
        </button>
        <button class="post-action" onclick="sharePost(${p.id})">
          📤 Share
        </button>
        <button class="post-action" onclick="bookmarkPost(${p.id})" style="margin-left:auto;">
          🔖
        </button>
      </div>
    </div>
  `).join('');
}

function likePost(id) {
  if (!requireAuth()) return;
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  savePosts();
  renderFeed();
}

function sharePost(id) {
  Toast.show('Link copied to clipboard! 🔗', 'success');
}

function bookmarkPost(id) {
  Toast.show('Post bookmarked! 🔖', 'success');
}

function reportPost(id) {
  Toast.show('Post reported. Our team will review it.', 'info');
}

function focusReply(id) {
  const textarea = document.getElementById('post-text');
  if (textarea) {
    textarea.value = '';
    textarea.placeholder = `Replying to post #${id}...`;
    textarea.focus();
    textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function setupPostCreator() {
  const btn = document.getElementById('post-submit');
  const textarea = document.getElementById('post-text');
  if (!btn || !textarea) return;

  btn.addEventListener('click', () => {
    if (!requireAuth()) return;
    const content = textarea.value.trim();
    if (!content) { Toast.show('Write something to post!', 'error'); return; }
    if (content.length < 10) { Toast.show('Post too short. Write at least 10 characters.', 'error'); return; }

    const user = Auth.getUser();
    const newPost = {
      id: Date.now(),
      author: user.name,
      initials: user.initials || user.name.slice(0,2).toUpperCase(),
      color: 'var(--plasma-light)',
      time: 'just now',
      room: currentRoom === 'general' ? 'general' : currentRoom,
      content,
      likes: 0, comments: 0, liked: false
    };

    posts.unshift(newPost);
    savePosts();
    textarea.value = '';
    textarea.placeholder = "Share your thoughts, ask a doubt, or help someone...";
    renderFeed();
    Toast.show('Posted successfully! 🎉', 'success');
  });

  // Code snippet tool
  document.querySelectorAll('.post-tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!requireAuth()) return;
      const action = btn.getAttribute('data-action');
      if (action === 'code') {
        const snippet = prompt('Paste your code:');
        if (snippet) textarea.value += '\n```\n' + snippet + '\n```';
      } else if (action === 'image') {
        Toast.show('Image upload coming soon!', 'info');
      } else if (action === 'link') {
        const url = prompt('Enter URL:');
        if (url) textarea.value += ' ' + url;
      }
    });
  });
}

function setupRooms() {
  document.querySelectorAll('.room-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.room-item').forEach(r => r.classList.remove('active'));
      item.classList.add('active');
      currentRoom = item.getAttribute('data-room');
      const heading = document.getElementById('room-heading');
      if (heading) heading.textContent = item.querySelector('span')?.textContent || 'All Posts';
      renderFeed();
    });
  });
}

function renderOnlineUsers() {
  const container = document.getElementById('online-users');
  if (!container) return;

  const users = [
    { name: 'Arjun Singh', batch: 'DSA', color: 'var(--plasma)', initials: 'AS' },
    { name: 'Priya Sharma', batch: 'React JS', color: 'var(--neon)', initials: 'PS' },
    { name: 'Rahul Kumar', batch: 'Java', color: 'var(--gold)', initials: 'RK' },
    { name: 'Sneha Gupta', batch: 'Python', color: 'var(--mint)', initials: 'SG' },
    { name: 'Vikram Patel', batch: 'Placement', color: 'var(--pulse)', initials: 'VP' },
  ];

  container.innerHTML = users.map(u => `
    <div class="online-user">
      <div class="online-avatar" style="background:${u.color}20;color:${u.color};border:1px solid ${u.color}40;">
        ${u.initials}
        <div class="online-dot"></div>
      </div>
      <div>
        <div class="online-user-name">${u.name}</div>
        <div class="online-user-batch">📚 ${u.batch}</div>
      </div>
    </div>
  `).join('');
}

function updateTimestamps() {
  // Simple timestamp updater
}

function savePosts() {
  localStorage.setItem('ez_posts', JSON.stringify(posts.slice(0, 50)));
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

window.likePost = likePost;
window.sharePost = sharePost;
window.bookmarkPost = bookmarkPost;
window.reportPost = reportPost;
window.focusReply = focusReply;


/* ===== ELITE ZONE — ADMIN.JS ===== */

function initAdmin() {
  if (!Auth.isAdmin()) {
    Toast.show('Admin access required!', 'error');
    setTimeout(() => window.location.href = 'index.html', 1500);
    return;
  }

  renderAdminStats();
  renderUserTable();
  renderBatchManager();
  setupAdminNav();
  renderAnalyticsChart();
}

function renderAdminStats() {
  const users = storage.get('users') || [];
  const enrolled = users.reduce((sum, u) => sum + (u.enrolled || []).length, 0);

  const stats = [
    { icon: '👥', num: users.length || 24, label: 'Total Students', id: 'admin-stat-students' },
    { icon: '📚', num: 20, label: 'Active Batches', id: 'admin-stat-batches' },
    { icon: '🎬', num: enrolled || 156, label: 'Enrollments', id: 'admin-stat-enroll' },
    { icon: '📈', num: '87%', label: 'Completion Rate', id: 'admin-stat-rate' },
  ];

  stats.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) el.textContent = s.num;
  });
}

function renderUserTable() {
  const tbody = document.getElementById('user-table-body');
  if (!tbody) return;

  const users = storage.get('users') || [];
  const fakeUsers = [
    { name: 'Arjun Singh', email: 'arjun@lnd.edu', roll: 'BCA-001', sem: 3, enrolled: 5, xp: 2840, joinDate: '2024-01-15' },
    { name: 'Priya Sharma', email: 'priya@lnd.edu', roll: 'BCA-002', sem: 4, enrolled: 4, xp: 2650, joinDate: '2024-01-18' },
    { name: 'Rahul Kumar', email: 'rahul@lnd.edu', roll: 'BCA-003', sem: 2, enrolled: 3, xp: 1980, joinDate: '2024-02-01' },
    { name: 'Sneha Gupta', email: 'sneha@lnd.edu', roll: 'BCA-004', sem: 5, enrolled: 6, xp: 1750, joinDate: '2024-02-10' },
    { name: 'Vikram Patel', email: 'vikram@lnd.edu', roll: 'BCA-005', sem: 3, enrolled: 2, xp: 1200, joinDate: '2024-03-05' },
    ...users.map(u => ({
      name: u.name, email: u.email, roll: u.roll || '—',
      sem: u.sem || 1, enrolled: (u.enrolled || []).length, xp: u.xp || 0,
      joinDate: u.joinDate ? u.joinDate.slice(0,10) : '—'
    }))
  ];

  tbody.innerHTML = fakeUsers.map((u, i) => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:0.65rem;">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--plasma),var(--neon));
            display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;font-family:var(--font-display);flex-shrink:0;">
            ${u.name.slice(0,2).toUpperCase()}
          </div>
          <div>
            <div style="font-weight:600;font-size:0.875rem;">${u.name}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">${u.email}</div>
          </div>
        </div>
      </td>
      <td><span style="font-family:var(--font-mono);font-size:0.8rem;">${u.roll}</span></td>
      <td><span class="badge badge-plasma">Sem ${u.sem}</span></td>
      <td><span style="color:var(--neon);font-weight:600;">${u.enrolled}</span></td>
      <td><span style="color:var(--gold);font-weight:600;">${u.xp.toLocaleString()} XP</span></td>
      <td><span style="font-size:0.78rem;color:var(--text-muted);">${u.joinDate}</span></td>
      <td>
        <div style="display:flex;gap:0.4rem;">
          <button class="btn btn-glass btn-sm" onclick="viewUser('${u.name}')">👁</button>
          <button class="btn btn-glass btn-sm" onclick="messageUser('${u.name}')">✉️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderBatchManager() {
  const grid = document.getElementById('batch-manager-grid');
  if (!grid) return;

  grid.innerHTML = BATCHES.map(b => `
    <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;
      background:var(--glass);border:1px solid var(--glass-border);border-radius:12px;">
      <div style="width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;
        font-size:1.5rem;background:linear-gradient(135deg,${b.c1},${b.c2});flex-shrink:0;">${b.emoji}</div>
      <div style="flex:1;">
        <div style="font-weight:600;font-size:0.875rem;">${b.name}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);">${b.videos} videos · ${b.level}</div>
      </div>
      <div style="display:flex;gap:0.4rem;">
        <button class="btn btn-glass btn-sm" onclick="adminEditBatch(${b.id})">✏️ Edit</button>
        <button class="btn btn-primary btn-sm" onclick="adminUploadContent(${b.id})">+ Upload</button>
      </div>
    </div>
  `).join('');
}

function setupAdminNav() {
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      if (!section) return;
      document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
      const target = document.getElementById('admin-section-' + section);
      if (target) target.style.display = 'block';
    });
  });
}

function renderAnalyticsChart() {
  const chart = document.getElementById('analytics-chart');
  if (!chart) return;

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const values = [12, 28, 45, 38, 62, 84, 71];
  const max = Math.max(...values);

  chart.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
      <span style="font-family:var(--font-display);font-weight:700;">Student Enrollment (2024)</span>
      <span class="badge badge-mint">↑ 34% growth</span>
    </div>
    <div class="chart-bars">
      ${values.map((v, i) => `
        <div class="chart-bar" data-val="${v}" style="height:${(v/max)*100}%;opacity:${0.6 + (i/values.length)*0.4};"></div>
      `).join('')}
    </div>
    <div class="chart-labels">
      ${months.map(m => `<div class="chart-label">${m}</div>`).join('')}
    </div>
  `;
}

function adminUploadContent(batchId) {
  const b = getBatch(batchId);
  if (!b) return;
  Toast.show(`Upload panel for "${b.name}" opened`, 'info');
  // Show upload section
  const uploadSection = document.getElementById('admin-section-upload');
  if (uploadSection) {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    uploadSection.style.display = 'block';
    const select = document.getElementById('upload-batch-select');
    if (select) select.value = batchId;
  }
}

function adminEditBatch(batchId) {
  Toast.show('Batch editor coming soon!', 'info');
}

function viewUser(name) { Toast.show(`Viewing profile of ${name}`, 'info'); }
function messageUser(name) { Toast.show(`Message sent to ${name}`, 'success'); }

function sendAnnouncement() {
  const title = document.getElementById('ann-title')?.value.trim();
  const msg = document.getElementById('ann-message')?.value.trim();
  if (!title || !msg) { Toast.show('Fill all announcement fields', 'error'); return; }
  Toast.show('Announcement sent to all students! 📢', 'success');
  if (document.getElementById('ann-title')) document.getElementById('ann-title').value = '';
  if (document.getElementById('ann-message')) document.getElementById('ann-message').value = '';
}

function handleUpload() {
  const type = document.getElementById('upload-type')?.value;
  const batch = document.getElementById('upload-batch-select')?.value;
  const title = document.getElementById('upload-title')?.value;
  if (!type || !batch || !title) { Toast.show('Fill all upload fields', 'error'); return; }
  Toast.show(`${type} uploaded for ${getBatch(parseInt(batch))?.name || 'batch'} ✅`, 'success');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('admin-page')) {
    initAdmin();
  }
});

window.initAdmin = initAdmin;
window.sendAnnouncement = sendAnnouncement;
window.handleUpload = handleUpload;
window.adminUploadContent = adminUploadContent;
window.adminEditBatch = adminEditBatch;
window.viewUser = viewUser;
window.messageUser = messageUser;
