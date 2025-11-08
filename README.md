
## Getting Started
- npm i next@latest react react-dom typescript tailwindcss postcss autoprefixer lucide-react
- npx tailwindcss init -p (ensure globals.css has Tailwind base/components/utilities)-/ 3) Start hacking: `npm run dev`
- Future: wire up auth, events CRUD, recommendation API, and ticket discounts using computeBubblePoints.

# 🌐 Bubble — Pop Your Bubble.

**Bubble** is a social discovery web app that encourages university students to *meet people outside their course*.  
It recommends events **outside your major** and **comfort zone**, rewarding you with **Bubble Points** when you show up.

> Opposites attract: Art meets STEM, Business meets Theatre — and more.

---

## ✨ Features

### 🧭 Discover & Attend
- Browse curated events that *oppose* your field of study.
- Filter by distance (`local`, `nearby`, `city-away`).
- Earn **Bubble Points** for going outside your comfort zone — use them to discount paid tickets.

### 🧑‍🎓 Organise & Submit Events
- Create and preview events directly in the browser.
- Each event dynamically calculates Bubble Points based on:
  - Distance from your location
  - Whether it’s outside your major
- Data is saved locally (demo mode).

### 🔄 Authentication (Demo)
- Dynamic **Sign In / Sign Up** system with the same clean Bubble styling.
- Stores user profile locally (name, email, and major).
- Easily toggle between Sign In and Sign Up modes on a single page.

### 💡 UX & UI
- Cohesive **blue gradient theme** across all components.
- Fully responsive layout using **Tailwind CSS** and **Lucide React icons**.
- Gradient-backed “widgets” unify the aesthetic.
- Soft hover lifts, rounded cards, and consistent typography for a welcoming student vibe.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js (App Router)** | Framework for pages, routing, and server rendering |
| **React** | Component-driven UI |
| **TypeScript** | Type safety and cleaner code |
| **Tailwind CSS** | Fast, responsive styling |
| **Lucide React** | Icon set (e.g. Sparkles, Mail, Lock) |
| **LocalStorage** | Demo data persistence (profile, events) |

---

## TO DO

- Login and Signup redirects to the profile page
- profile page displays: 
    - bubble points
    - previously attended events
    - discounts available
    - profile picture
    - RSVP'd Events

- Event page.tsx needs filtering settings
- Images for Events (image scaling/sizing)
- Organizer event submission actually works

