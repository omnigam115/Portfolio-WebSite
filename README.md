# ⚡ Om Nigam — 3D Futuristic Portfolio

A premium, award-worthy 3D developer portfolio built with **React + Vite**, **Three.js / React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Enter the project folder
cd om-nigam-portfolio

# 2. Install all dependencies
npm install

# 3. Start the dev server
npm run dev
# → Opens at http://localhost:5173

# 4. Build for production
npm run build
```

---

## 🌟 Feature Overview

| Feature | Description |
|---|---|
| 🎨 **3D Hero Scene** | React Three Fiber — distortion orb, DNA helix, satellite moons, orbit rings, stars |
| 🌌 **Particle Galaxy** | Canvas particle system with mouse repulsion & connection lines |
| 🤖 **ARIA Voice Assistant** | Claude-powered AI chatbot with Web Speech API voice I/O |
| ✨ **Glassmorphism UI** | Neon glows, backdrop blur, gradient borders throughout |
| 🖱️ **Custom Cursor** | Neon dot + lagged ring, morphs on hover |
| 🔄 **Loading Screen** | Futuristic boot animation with terminal lines |
| 📱 **Fully Responsive** | Mobile + desktop optimized |
| 🎭 **Framer Motion** | Scroll-triggered reveals, spring animations |
| 🪐 **Orbit Skill System** | CSS animated 3-ring orbit for skills |
| 🃏 **3D Project Modals** | Click cards → 3D perspective modal overlay |
| 🏆 **Animated Counters** | Count-up stats for achievements |
| 📧 **Contact Form** | Floating-label form with success state |

---

## 🤖 ARIA Voice Assistant

ARIA is Om's personal AI, powered by Claude. Click the glowing button (bottom-right).

**Capabilities:**
- 🎤 **Voice input** — click mic, speak naturally
- ⌨️ **Text input** — type your question
- 💬 **Quick chips** — "Who is Om?", "Show projects", "Skills?"
- 🔊 **Voice output** — text-to-speech responses

**Sample questions:**
> "Who is Om Nigam?" • "What projects has Om built?" • "What are Om's skills?" • "How can I contact Om?"

**Running locally?** Add your API key:
1. Create `.env` → `VITE_ANTHROPIC_API_KEY=sk-ant-...`
2. In `VoiceAssistant.jsx`, add to headers: `'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY`

---

## 📁 Project Structure

```
om-nigam-portfolio/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx               # Entry point
    ├── App.jsx                # Root — assembles all sections
    ├── index.css              # Global styles, keyframes, utilities
    └── components/
        ├── LoadingScreen.jsx      # Boot animation with progress bar
        ├── CustomCursor.jsx       # Neon dot + lagged ring cursor
        ├── ParticleBackground.jsx # Canvas galaxy (fixed background)
        ├── Navbar.jsx             # Glassmorphic nav with active pill
        ├── HeroSection.jsx        # 3D intro + typing animation
        ├── HeroScene3D.jsx        # Three.js R3F scene
        ├── AboutSection.jsx       # Bio + animated skill bars
        ├── ProjectsSection.jsx    # Cards + 3D modal
        ├── SkillsSection.jsx      # CSS orbit system + tech grid
        ├── CertificationsSection.jsx  # Floating holographic cards
        ├── AchievementsSection.jsx    # Count-up badges
        ├── ContactSection.jsx     # Animated form + social links
        ├── VoiceAssistant.jsx     # 🤖 ARIA AI chatbot (floating)
        ├── Footer.jsx             # Social links footer
        └── SectionDivider.jsx     # Neon separator
```

---

## 🎨 Color System

| Token | Hex | Role |
|---|---|---|
| Neon Blue | `#00d4ff` | Primary accent, borders, glows |
| Neon Purple | `#7b2ff7` | Secondary, gradients |
| Neon Pink | `#ff006e` | Tertiary highlights |
| Neon Green | `#00ff88` | Status, success |
| Dark Base | `#020208` | Background |

---

## 🔧 Customizing Content

All personal data lives inside each section component. To update:

| What | Where |
|---|---|
| Name / Title / Bio | `HeroSection.jsx`, `AboutSection.jsx` |
| Projects | `ProjectsSection.jsx` → `PROJECTS` array |
| Skills | `SkillsSection.jsx` → `TECH_GRID` + `ORBIT_SKILLS` |
| Certifications | `CertificationsSection.jsx` → `CERTS` array |
| Achievements | `AchievementsSection.jsx` → `ACHIEVEMENTS` + `STATS` |
| Contact info | `ContactSection.jsx` → `SOCIALS` array |
| ARIA persona | `VoiceAssistant.jsx` → `SYSTEM_PROMPT` |

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | 18 | UI framework |
| `vite` | 5 | Build tool |
| `three` | 0.160 | 3D engine |
| `@react-three/fiber` | 8 | React renderer for Three.js |
| `@react-three/drei` | 9 | Helpers (Stars, Float, etc.) |
| `framer-motion` | 11 | Animations |
| `tailwindcss` | 3 | Utility CSS |

---

Built with ❤️ for **Om Nigam** · LPU CSE 2nd Year · AI + Full Stack Developer
