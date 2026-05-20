# ⚡ ELITE ZONE — Premium BCA Learning Platform

> India's Most Premium Coding Ecosystem for BCA Students

---

## 📁 Project Structure

```
elite-zone/
├── index.html          → Home Page
├── batches.html        → All 20 Batches Listing
├── batch-detail.html   → Individual Batch Page
├── dashboard.html      → Student Dashboard
├── community.html      → Community & Discussion
├── admin.html          → Admin Panel
│
├── css/
│   ├── style.css       → Global Design System (vars, nav, footer, modals)
│   ├── home.css        → Home Page Styles
│   ├── batches.css     → Batch Listing Styles
│   ├── batch-detail.css → Batch Detail + Video Player
│   ├── dashboard.css   → Dashboard + Leaderboard + Badges
│   └── community-admin.css → Community + Admin Panel
│
└── js/
    ├── main.js         → Core: Auth, Registration, Toast, BATCHES data
    ├── home.js         → Home page logic
    ├── batches.js      → Batch filter, search, sort
    ├── batch-detail.js → Video player, notes, DPP, tests, roadmap
    ├── dashboard.js    → Dashboard rendering
    └── community-admin.js → Community posts + Admin panel
```

---

## 🚀 How to Run

1. **Extract** the ZIP file
2. **Open** `index.html` in any modern browser
3. No server needed — pure HTML/CSS/JS with localStorage

---

## 🔐 Credentials

### Student
- Register with any email and password (min 6 chars)
- All fields required: name, semester, roll no., reg. no., college, phone, email, password

### Admin
- **Email:** `admin@elitezone.in`
- **Password:** `admin123`

---

## 📋 Features Overview

### ✅ Registration System
- Popup modal on first visit
- Cannot close without completing registration
- Saves user data to localStorage
- Auto-fill initials & avatar

### ✅ Authentication
- Student & Admin roles
- Persistent login via localStorage
- User menu with avatar

### ✅ Home Page
- Animated hero with floating cards
- Stats counters with animation
- 8 batch preview cards
- Feature cards, gamification, testimonials, CTA

### ✅ Batches Page (20 Batches)
- Search, filter by level/tag, sort
- Cards with stats (videos, notes, DPPs, tests)

### ✅ Batch Detail Page
- Tabbed layout: Videos / Notes / DPP / Tests / Roadmap / Resources
- Video popup modal with YouTube embed
- Mark lectures as complete (+10 XP)
- Progress tracking & auto-save
- Downloadable notes (simulated)
- DPP list with difficulty
- Test cards with lock system
- Career roadmap phases
- Sticky sidebar with enroll button

### ✅ Student Dashboard
- Profile with XP level bar
- Stats: enrolled, videos, XP, streak
- Streak tracker (7-day week view)
- Enrolled batches with progress bars
- Leaderboard (top 5 students)
- Badges (locked/unlocked)
- Notifications
- Sidebar navigation sections

### ✅ Community
- Discussion rooms (general, doubt, projects, placement, etc.)
- Post creator with code/image/link tools
- Like, share, bookmark, reply actions
- Online users panel
- Top helpers leaderboard
- Community stats

### ✅ Admin Panel
- Stats overview
- Full student table with actions
- 20 batch manager (edit/upload per batch)
- Content upload form (Video/Note/DPP/Test)
- YouTube URL video adder
- Announcement sender
- Analytics with bar charts
- Platform settings

### ✅ Gamification
- XP system (+10 per video, more for tests)
- Streak tracking
- Badges (8 types, locked/unlocked)
- Leaderboard

### ✅ UI/UX
- Dark premium theme (void/deep navy)
- Glassmorphism cards
- Plasma/neon/pulse accent colors
- Syne display font + DM Sans body
- JetBrains Mono for code
- Smooth animations & transitions
- Scroll reveal effects
- Confetti on registration
- Toast notifications
- Mobile-responsive with bottom nav
- Noise texture overlay

---

## 🎨 Design System Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--void` | `#02020a` | Page background |
| `--deep` | `#070712` | Sidebar/cards |
| `--plasma` | `#6c3fff` | Primary brand purple |
| `--neon` | `#00e5ff` | Accent cyan |
| `--pulse` | `#ff3cac` | Admin/highlight pink |
| `--gold` | `#ffd166` | XP/streak golden |
| `--mint` | `#06ffa5` | Success/completed green |

---

## 📱 Mobile Support

- Responsive at all breakpoints
- Bottom navigation bar (Home, Batches, Community, Dashboard, Profile)
- Touch-optimized interactions
- Mobile video player support

---

## 🔧 Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage:** localStorage (all data persisted)
- **Fonts:** Google Fonts (Syne, DM Sans, JetBrains Mono)
- **Video:** YouTube iframe embed
- **Deployment:** GitHub Pages compatible (static)

---

## 👨‍💻 Developer Credit

Built with ❤️ for LND College BCA Students  
**Developer:** Vishal Kumar  
**Platform:** Elite Zone — BCA Study Material Website

---

## 📄 License

Educational use only. All rights reserved © 2024 Elite Zone.
