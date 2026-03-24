// SkillsSection.jsx — Real CV skills in orbit + tech grid
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// CV skills: Languages, Backend, Frontend, Databases, Deployment, Tools
const TECH_GRID = [
  // Languages
  { name: 'Python',       icon: '🐍', level: 'Advanced',      pct: 88, color: '#00d4ff',  cat: 'Language'    },
  { name: 'Java',         icon: '☕', level: 'Intermediate',   pct: 70, color: '#f89820',  cat: 'Language'    },
  { name: 'C / C++',      icon: '⚙️', level: 'Intermediate',   pct: 75, color: '#7b2ff7',  cat: 'Language'    },
  { name: 'JavaScript',   icon: '⚡', level: 'Advanced',       pct: 80, color: '#f7df1e',  cat: 'Language'    },
  // Frontend
  { name: 'React',        icon: '⚛️', level: 'Intermediate',   pct: 78, color: '#61dafb',  cat: 'Frontend'    },
  { name: 'Tailwind CSS', icon: '🎨', level: 'Advanced',       pct: 82, color: '#38bdf8',  cat: 'Frontend'    },
  // Backend
  { name: 'Node.js',      icon: '🟢', level: 'Intermediate',   pct: 72, color: '#00ff88',  cat: 'Backend'     },
  { name: 'Express.js',   icon: '🚂', level: 'Intermediate',   pct: 70, color: '#ffffff',  cat: 'Backend'     },
  // Databases
  { name: 'MongoDB',      icon: '🍃', level: 'Intermediate',   pct: 68, color: '#47a248',  cat: 'Database'    },
  { name: 'MySQL',        icon: '🗄️', level: 'Intermediate',   pct: 68, color: '#00758f',  cat: 'Database'    },
  // Deployment
  { name: 'Google Cloud', icon: '☁️', level: 'Beginner',       pct: 55, color: '#4285f4',  cat: 'Deployment'  },
  { name: 'Git & GitHub', icon: '📦', level: 'Advanced',       pct: 85, color: '#f05032',  cat: 'Tools'       },
]

const ORBIT_SKILLS = [
  { name: 'Python',  color: '#00d4ff', ring: 110, speed: 8,  startDeg: 0   },
  { name: 'Node.js', color: '#00ff88', ring: 110, speed: 8,  startDeg: 120 },
  { name: 'Java',    color: '#f89820', ring: 110, speed: 8,  startDeg: 240 },
  { name: 'React',   color: '#61dafb', ring: 160, speed: 14, startDeg: 60  },
  { name: 'C++',     color: '#7b2ff7', ring: 160, speed: 14, startDeg: 180 },
  { name: 'HTML',    color: '#ff4713', ring: 160, speed: 14, startDeg: 300 },
  { name: 'MongoDB', color: '#47a248', ring: 210, speed: 20, startDeg: 30  },
  { name: 'MySQL',   color: '#00758f', ring: 210, speed: 20, startDeg: 150 },
  { name: 'Git',     color: '#f05032', ring: 210, speed: 20, startDeg: 270 },
]

function OrbitSystem() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 480, height: 480 }}>
      <style>{`
        @keyframes orbitNode {
          from { transform: rotate(var(--start-angle)) translateX(var(--radius)) rotate(calc(-1 * var(--start-angle))); }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--start-angle) + 360deg))); }
        }
      `}</style>
      {[110, 160, 210].map(r => (
        <div key={r} className="absolute rounded-full border border-white/5"
          style={{ width: r * 2, height: r * 2 }} />
      ))}
      <div className="absolute w-20 h-20 rounded-full flex items-center justify-center z-10"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.35) 0%, rgba(0,212,255,0.05) 70%)', boxShadow: '0 0 50px rgba(0,212,255,0.4)', border: '1px solid rgba(0,212,255,0.3)' }}>
        <span className="font-orbitron font-black text-sm gradient-text-blue">DEV</span>
      </div>
      {ORBIT_SKILLS.map(s => (
        <div key={s.name} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ '--start-angle': `${s.startDeg}deg`, '--radius': `${s.ring}px`, animation: `orbitNode ${s.speed}s linear infinite` }}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-[10px] font-mono font-bold cursor-default select-none hover:scale-125 transition-transform duration-200"
            style={{ background: `${s.color}18`, border: `1px solid ${s.color}50`, color: s.color, boxShadow: `0 0 14px ${s.color}40` }} data-hover>
            {s.name.length > 4 ? s.name.slice(0, 4) : s.name}
          </div>
        </div>
      ))}
    </div>
  )
}

// Category badge colors
const CAT_COLORS = { Language: '#00d4ff', Frontend: '#61dafb', Backend: '#00ff88', Database: '#47a248', Deployment: '#4285f4', Tools: '#f05032' }

export default function SkillsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-32 z-10">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs text-cyan-400 tracking-[0.4em] mb-4">TECH ARSENAL</p>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl gradient-text-blue">Skills</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center overflow-hidden"
          >
            <OrbitSystem />
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {TECH_GRID.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-3 group hover:scale-105 hover:bg-white/5 transition-all duration-300 cursor-default"
                data-hover
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-rajdhani font-semibold text-sm text-white/90 truncate">{t.name}</p>
                    <div className="flex items-center gap-1.5">
                      <p className="font-mono text-[9px]" style={{ color: t.color }}>{t.level}</p>
                      <span className="font-mono text-[9px] px-1 rounded" style={{ background: CAT_COLORS[t.cat] + '20', color: CAT_COLORS[t.cat] }}>{t.cat}</span>
                    </div>
                  </div>
                </div>
                <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${t.pct}%` } : {}}
                    transition={{ delay: 0.3 + i * 0.04, duration: 1.2 }}
                    className="h-full rounded-full"
                    style={{ background: t.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft skills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 glass rounded-2xl p-6"
          style={{ border: '1px solid rgba(0,212,255,0.1)' }}
        >
          <p className="font-mono text-xs text-white/30 tracking-widest mb-4 text-center">SOFT SKILLS</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Time Management', 'Problem-Solving', 'Leadership', 'Documentation', 'Team Collaboration'].map(s => (
              <span key={s} className="px-4 py-2 rounded-full font-rajdhani text-sm text-white/60 glass border border-white/10 hover:border-cyan-400/30 hover:text-cyan-300 transition-all cursor-default">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
