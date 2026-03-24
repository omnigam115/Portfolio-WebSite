// AboutSection.jsx — About me with real CV data + profile photo + education timeline
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Skills from CV ────────────────────────────────────────────────────────
const SKILLS = [
  { name: 'Python',         pct: 88, color: '#00d4ff' },
  { name: 'JavaScript',     pct: 80, color: '#f7df1e' },
  { name: 'C / C++',        pct: 75, color: '#7b2ff7' },
  { name: 'Java',           pct: 70, color: '#f89820' },
  { name: 'React',          pct: 78, color: '#61dafb' },
  { name: 'Node.js',        pct: 72, color: '#00ff88' },
]

// ── Stats ─────────────────────────────────────────────────────────────────
const FACTS = [
  { number: '6.84', label: 'CGPA @ LPU'         },
  { number: '9+',   label: 'GitHub Repos'        },
  { number: '4+',   label: 'Certifications'      },
  { number: '90%+', label: 'DSA Challenge Score' },
]

// ── Education Timeline ────────────────────────────────────────────────────
const EDUCATION = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'Lovely Professional University',
    place:  'Punjab, India',
    year:   'Aug 2023 – Present',
    score:  'CGPA: 6.84',
    icon:   '🎓',
    color:  '#00d4ff',
  },
  {
    degree: 'Intermediate (12th)',
    school: 'Nirmala Convent High School',
    place:  'Renukut, UP',
    year:   'Apr 2021 – Mar 2023',
    score:  'Percentage: 73%',
    icon:   '📘',
    color:  '#7b2ff7',
  },
  {
    degree: 'Matriculation (10th)',
    school: 'Nirmala Convent High School',
    place:  'Renukut, UP',
    year:   'Apr 2019 – Mar 2021',
    score:  'Percentage: 80%',
    icon:   '📗',
    color:  '#00ff88',
  },
]

// ── Tag chips ─────────────────────────────────────────────────────────────
const TAGS = ['LPU — CSE', 'AI Dev', 'Full Stack', 'Open Source', 'Python', 'Node.js']

// ── Animated skill bar ────────────────────────────────────────────────────
function SkillBar({ name, pct, color, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="font-rajdhani font-semibold text-sm text-white/70 tracking-wider">{name}</span>
        <span className="font-mono text-xs" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay, ease: [0.23, 1, 0.32, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────
export default function AboutSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-32 z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-purple-600/4 blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* ── Section Heading ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs text-cyan-400 tracking-[0.4em] mb-4">ABOUT ME</p>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl gradient-text-blue">Who Am I?</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT — Photo + Bio + Tags + Education ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >

            {/* ── Profile Photo ──────────────────────────────────────────────
                HOW TO ADD YOUR PHOTO:
                  1. Rename your photo to:   om-photo.jpg
                  2. Drop it into:           public/images/om-photo.jpg
                  3. Formats supported:      .jpg  .jpeg  .png  .webp
                  4. Refresh — done!
                To use an online URL instead, change src="..." below.
            ──────────────────────────────────────────────────────────────── */}
            <div className="relative w-52 h-64 mx-auto mb-12 lg:mx-0 animate-float">

              {/* Outer glow */}
              <div
                className="absolute -inset-2 rounded-3xl opacity-60"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(123,47,247,0.3))',
                  filter: 'blur(12px)',
                }}
              />

              {/* Photo box */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800 to-dark-900"
                style={{
                  border: '2px solid rgba(0,212,255,0.4)',
                  boxShadow: '0 0 40px rgba(0,212,255,0.25)',
                }}
              >
                {/* ↓ YOUR PHOTO — drop om-photo.jpg into public/images/ ↓ */}
                <img
                  src="/images/om-photo.jpg"
                  alt="Om Nigam"
                  className="w-full h-full object-contain object-center"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />

                {/* Fallback initials if photo missing */}
                <div
                  className="w-full h-full hidden items-center justify-center font-orbitron font-black text-6xl gradient-text"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(123,47,247,0.08))' }}
                >
                  ON
                </div>

                {/* Shimmer overlay */}
                <div className="absolute inset-0 holo-shimmer opacity-10 pointer-events-none" />
              </div>

              {/* Corner bracket accents */}
              <div className="absolute -top-1 -left-1 w-7 h-7 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl" />
              <div className="absolute -top-1 -right-1 w-7 h-7 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl" />
              <div className="absolute -bottom-1 -left-1 w-7 h-7 border-b-2 border-l-2 border-purple-400 rounded-bl-xl" />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 border-b-2 border-r-2 border-purple-400 rounded-br-xl" />

              {/* Online status dot */}
              <div
                className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-900 z-10"
                style={{ boxShadow: '0 0 10px #00ff88' }}
              />
            </div>

            {/* Name */}
            <h3 className="font-orbitron font-bold text-2xl text-white mb-4">Om Nigam</h3>

            {/* Bio — updated to 3rd year ✅ */}
            <p className="font-rajdhani text-lg text-white/60 leading-relaxed mb-4">
              I'm a <span className="text-cyan-400 font-semibold">3rd year B.Tech CSE student</span> at
              Lovely Professional University (LPU), Punjab, with a passion for building AI-powered
              applications and scalable full-stack systems.
            </p>
            <p className="font-rajdhani text-lg text-white/60 leading-relaxed mb-4">
              From building <span className="text-purple-400 font-semibold">NOVA</span> — an advanced
              Python AI assistant with voice, image generation &amp; async API integrations — to
              crafting interactive algorithm visualizers, I love turning complex ideas into clean,
              impactful software.
            </p>
            <p className="font-rajdhani text-lg text-white/60 leading-relaxed mb-8">
              My stack spans <span className="text-cyan-400 font-semibold">Python, Node.js, React</span>,
              cloud deployments on <span className="text-purple-400 font-semibold">Google Cloud &amp; Azure</span>,
              and databases like MongoDB &amp; MySQL.
            </p>

            {/* Tag chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {TAGS.map(t => (
                <span
                  key={t}
                  className="px-4 py-1.5 rounded-full font-mono text-xs text-cyan-400 glass-strong border border-cyan-400/20 hover:border-cyan-400/50 transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* ── Education Timeline ────────────────────────────────────── */}
            <div>
              <h4 className="font-orbitron font-bold text-xs text-white/40 tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400/40" />
                EDUCATION
                <span className="w-4 h-px bg-cyan-400/40" />
              </h4>

              <div className="space-y-3">
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                    className="flex gap-4 p-4 glass rounded-2xl group hover:scale-[1.02] transition-transform duration-300"
                    style={{ border: `1px solid ${edu.color}20` }}
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        background: edu.color + '15',
                        border: `1px solid ${edu.color}30`,
                        boxShadow: `0 0 12px ${edu.color}15`,
                      }}
                    >
                      {edu.icon}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {edu.degree}
                      </p>
                      <p
                        className="font-rajdhani text-sm font-semibold mt-0.5"
                        style={{ color: edu.color }}
                      >
                        {edu.school}
                      </p>
                      <div className="flex items-center justify-between mt-1.5 flex-wrap gap-1">
                        <p className="font-mono text-xs text-white/30">
                          {edu.place} · {edu.year}
                        </p>
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{
                            background: edu.color + '20',
                            color: edu.color,
                            border: `1px solid ${edu.color}30`,
                          }}
                        >
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* ── End Education ─────────────────────────────────────────── */}

          </motion.div>

          {/* ── RIGHT — Stats + Skill Bars ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {FACTS.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="glass-strong rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300"
                  style={{ boxShadow: '0 0 20px rgba(0,212,255,0.08)' }}
                >
                  <div className="font-orbitron font-black text-3xl gradient-text mb-1">{f.number}</div>
                  <div className="font-rajdhani text-sm text-white/40 tracking-wider">{f.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Skill bars */}
            <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(0,212,255,0.1)' }}>
              <h4 className="font-orbitron font-bold text-xs text-white/40 tracking-widest mb-6 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400/40" />
                SKILL MATRIX
                <span className="w-4 h-px bg-cyan-400/40" />
              </h4>
              {SKILLS.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={0.5 + i * 0.1} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}