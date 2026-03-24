// AchievementsSection.jsx — Real achievements from CV
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'Top AI Project — LPU',
    sub: '3rd Semester Award',
    color: '#f7df1e',
    desc: 'Selected among the top projects in the Artificial Intelligence course during the 3rd semester at Lovely Professional University.',
  },
  {
    icon: '⚔️',
    title: 'Hackathon Participant',
    sub: 'Apna College & Coding Blocks',
    color: '#00d4ff',
    desc: 'Participated in major national hackathons hosted by Apna College and Coding Blocks, building innovative tech solutions under tight deadlines.',
  },
  {
    icon: '💯',
    title: 'DSA Excellence',
    sub: 'Scored 90%+ in all evaluations',
    color: '#00ff88',
    desc: 'Completed advanced coding challenges in Data Structures & Algorithms, C++, and Python, consistently scoring above 90% in all evaluations.',
  },
  {
    icon: '🤖',
    title: 'NOVA AI Built',
    sub: 'Advanced Python AI Assistant',
    color: '#7b2ff7',
    desc: 'Engineered a production-grade AI assistant with voice commands, image generation, Groq & Hugging Face API integrations, and async execution.',
  },
  {
    icon: '📊',
    title: 'AlgoSort Visualizer',
    sub: 'Interactive Learning Tool',
    color: '#ff006e',
    desc: 'Built an interactive sorting algorithm visualizer with real-time animated bar representations, live metrics, and adjustable controls.',
  },
  {
    icon: '☁️',
    title: 'Cloud Deployed',
    sub: 'Google Cloud & Azure',
    color: '#4285f4',
    desc: 'Successfully deployed applications on Google Cloud and Microsoft Azure, gaining hands-on experience with cloud infrastructure and CI/CD pipelines.',
  },
]

const STATS = [
  { num: 9,   suffix: '+', label: 'GitHub Repos',        color: '#f05032' },
  { num: 90,  suffix: '%', label: 'DSA Challenge Score',  color: '#00ff88' },
  { num: 4,   suffix: '+', label: 'Certifications',       color: '#7b2ff7' },
  { num: 2,   suffix: '+', label: 'Hackathons',           color: '#00d4ff' },
]

function CountUp({ target, suffix, color, active }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 35)
    return () => clearInterval(timer)
  }, [active, target])

  return (
    <span className="font-orbitron font-black text-4xl" style={{ color }}>
      {count}{suffix}
    </span>
  )
}

export default function AchievementsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="relative py-32 z-10">
      <div className="absolute right-0 top-1/2 w-[400px] h-[400px] rounded-full bg-yellow-500/4 blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs text-cyan-400 tracking-[0.4em] mb-4">MILESTONES</p>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl gradient-text">Achievements</h2>
        </motion.div>

        {/* Stats counter row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center neon-border"
            >
              <CountUp target={s.num} suffix={s.suffix} color={s.color} active={inView} />
              <p className="font-rajdhani text-sm text-white/40 mt-2 tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200 }}
              className="glass rounded-3xl p-6 group hover:scale-105 transition-transform duration-300"
              style={{ borderColor: a.color + '20' }}
              data-hover
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
                style={{ background: `radial-gradient(circle, ${a.color}25 0%, ${a.color}05 100%)`, border: `1px solid ${a.color}40`, boxShadow: `0 0 20px ${a.color}20` }}>
                {a.icon}
              </div>
              <h3 className="font-orbitron font-bold text-sm text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {a.title}
              </h3>
              <p className="font-mono text-xs mb-3" style={{ color: a.color }}>{a.sub}</p>
              <p className="font-rajdhani text-sm text-white/45 leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
