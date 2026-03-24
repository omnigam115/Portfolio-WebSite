// ProjectsSection.jsx — Real projects from CV + GitHub
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'NOVA — Advanced AI Assistant',
    emoji: '🤖',
    tagline: 'Multifunctional Python AI Assistant',
    period: 'Jun 2024 – Dec 2024',
    description:
      'Engineered a multifunctional Python AI assistant integrating conversational AI, real-time data retrieval, voice commands, and image generation. Features asynchronous task execution, robust API integrations (Groq, Hugging Face), and persistent context management for seamless productivity.',
    tech: ['Python', 'AsyncIO', 'Groq API', 'Hugging Face API', 'JavaScript'],
    github: 'https://github.com/omnigam115',
    color: '#00d4ff',
    gradient: 'from-cyan-500/20 to-blue-600/20',
    features: ['Voice Commands', 'Image Generation', 'Async Execution', 'Real-time Data', 'Context Memory'],
  },
  {
    id: 2,
    title: 'AlgoSort Visualizer',
    emoji: '📊',
    tagline: 'Sorting Algorithm Visualization Tool',
    period: 'Jun 2025 – Aug 2025',
    description:
      'Developed an interactive web-based platform to visualize and compare multiple sorting algorithms through real-time animated bar representations. Features dynamic controls for algorithm selection, adjustable execution speed, live array resizing, and real-time performance metrics (comparisons & swaps).',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/omnigam115',
    color: '#7b2ff7',
    gradient: 'from-purple-600/20 to-pink-500/20',
    features: ['Algorithm Selection', 'Speed Control', 'Array Resizing', 'Perf Metrics', 'Algorithm Explanations'],
  },
  {
    id: 3,
    title: 'Online Movie Ticket Booking',
    emoji: '🎬',
    tagline: 'Full-Stack Ticket Booking Web App',
    period: '2024',
    description:
      'A complete online movie ticket booking website featuring seat selection, show scheduling, booking management and a responsive UI. Demonstrates full-stack skills with clean frontend design and structured backend data management.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/omnigam115/Online-Movie-Ticket-Booking-Website',
    color: '#ff006e',
    gradient: 'from-pink-600/20 to-red-500/20',
    features: ['Seat Selection', 'Show Scheduling', 'Booking Management', 'Responsive UI', 'Movie Listings'],
  },
  {
    id: 4,
    title: '3D Futuristic Portfolio',
    emoji: '🌐',
    tagline: 'This Very Website — Immersive 3D Portfolio',
    period: '2025',
    description:
      "The portfolio you're exploring right now! Built with React, Three.js, and Framer Motion to deliver a fully immersive 3D developer experience, complete with an ARIA AI voice assistant powered by Claude, particle galaxy background, and glassmorphism UI.",
    tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/omnigam115',
    color: '#00ff88',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    features: ['3D Canvas', 'ARIA Voice AI', 'Particle Galaxy', 'Glassmorphism', 'Fully Responsive'],
  },
]

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-dark-900/92 backdrop-blur-2xl" />
      <motion.div
        initial={{ scale: 0.75, rotateX: 20, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.75, rotateX: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        onClick={e => e.stopPropagation()}
        style={{ perspective: '1200px', borderColor: project.color + '30' }}
        className="relative max-w-lg w-full glass rounded-3xl p-8"
      >
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-10" style={{ background: project.color }} />
        <button onClick={onClose} data-hover
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >✕</button>

        <div className="flex items-center gap-4 mb-6 relative">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-3xl flex-shrink-0`}
            style={{ border: `1px solid ${project.color}30` }}>
            {project.emoji}
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-xl text-white mb-1">{project.title}</h3>
            <p className="font-mono text-xs mb-0.5" style={{ color: project.color }}>{project.tagline}</p>
            <p className="font-mono text-xs text-white/25">{project.period}</p>
          </div>
        </div>

        <p className="font-rajdhani text-base text-white/60 leading-relaxed mb-6 relative">{project.description}</p>

        <div className="mb-6 relative">
          <p className="font-mono text-[10px] text-white/25 tracking-widest mb-3">KEY FEATURES</p>
          <div className="flex flex-wrap gap-2">
            {project.features.map(f => (
              <span key={f} className="px-3 py-1 rounded-full text-xs font-mono"
                style={{ background: project.color + '15', color: project.color, border: `1px solid ${project.color}30` }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 relative">
          <p className="font-mono text-[10px] text-white/25 tracking-widest mb-3">TECH STACK</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-mono text-white/50 glass border border-white/10">{t}</span>
            ))}
          </div>
        </div>

        <a href={project.github} target="_blank" rel="noreferrer" data-hover
          className="relative flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-orbitron font-bold text-sm tracking-wider transition-all duration-300 hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)`, border: `1px solid ${project.color}40`, color: project.color }}
        >
          View on GitHub
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-32 z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-600/4 blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs text-cyan-400 tracking-[0.4em] mb-4">MY WORK</p>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl gradient-text">Projects</h2>
          <p className="font-rajdhani text-lg text-white/35 mt-4">Click any card to explore details</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setSelected(p)}
              data-hover
              className="project-card cursor-pointer glass rounded-3xl p-6 group relative overflow-hidden"
              style={{ border: `1px solid ${p.color}18` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, ${p.color}10 0%, transparent 65%)` }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-2xl`}
                    style={{ border: `1px solid ${p.color}25` }}>
                    {p.emoji}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-white/15 group-hover:text-white/40 transition-colors block">0{p.id}</span>
                    <span className="font-mono text-[10px] text-white/20">{p.period}</span>
                  </div>
                </div>

                <h3 className="font-orbitron font-bold text-lg text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {p.title}
                </h3>
                <p className="font-mono text-xs mb-3" style={{ color: p.color }}>{p.tagline}</p>
                <p className="font-rajdhani text-sm text-white/45 leading-relaxed mb-5 line-clamp-2">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-mono text-white/35 glass border border-white/8">{t}</span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-white/25">+{p.tech.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-white/25 group-hover:text-cyan-400 transition-colors">
                  <span>Explore project</span>
                  <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
