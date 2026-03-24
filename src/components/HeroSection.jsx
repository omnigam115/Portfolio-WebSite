// HeroSection.jsx — Full-screen 3D intro with typing animation + social links
import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import HeroScene3D from './HeroScene3D'

const ROLES = [
  'AI Developer',
  'Full Stack Developer',
  'Python Developer',
  'Problem Solver',
]

function TypingText() {
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const cur = ROLES[roleIdx]
    if (!deleting && displayed.length < cur.length) {
      const t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 75)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === cur.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length - 1)), 40)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
  }, [displayed, deleting, roleIdx])

  return <span className="neon-text-blue font-orbitron typing-cursor">{displayed}</span>
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene3D />
        </Suspense>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-dark-900 via-dark-900/75 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-900/50 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">
        <div className="max-w-2xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-strong mb-8 border border-green-400/20"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#00ff88]" />
            <span className="font-mono text-xs text-green-400 tracking-[0.3em]">AVAILABLE FOR HIRE</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="font-orbitron font-black leading-none mb-4"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)' }}
          >
            <span className="text-white">OM</span>
            <br />
            <span className="gradient-text">NIGAM</span>
          </motion.h1>

          {/* Dynamic role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-rajdhani text-2xl md:text-3xl font-semibold mb-6 min-h-[2.5rem]"
          >
            <TypingText />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="font-rajdhani text-lg text-white/55 mb-10 max-w-lg leading-relaxed"
          >
            Building{' '}
            <span className="text-cyan-400 font-semibold">Intelligent Systems</span> &amp;{' '}
            <span className="text-purple-400 font-semibold">Interactive Experiences</span>
            {' '}— B.Tech CSE @ Lovely Professional University.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" data-hover
              className="group relative px-8 py-4 rounded-full font-orbitron font-bold text-sm tracking-wider overflow-hidden text-white"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)' }}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 holo-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#contact" data-hover
              className="px-8 py-4 rounded-full font-orbitron font-bold text-sm tracking-wider text-cyan-400 glass-strong border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300"
            >
              Let's Connect
            </a>
            <a href="/Om_Nigam_CV.pdf" data-hover download
              className="flex items-center gap-2 px-6 py-4 rounded-full font-rajdhani font-semibold text-sm tracking-wider text-white/50 glass hover:text-white/80 hover:bg-white/5 transition-all duration-300 border border-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </motion.div>

          {/* Social strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-8 mt-14"
          >
            {[
              { label: 'GitHub',   href: 'https://github.com/omnigam115',           badge: 'GH' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-nigam/',    badge: 'in' },
              { label: 'Email',    href: 'mailto:omnigam115@gmail.com',              badge: '@' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-hover
                className="group flex items-center gap-2.5 text-white/35 hover:text-cyan-400 transition-all duration-200 font-mono text-xs"
              >
                <span className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs border border-white/10 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all">
                  {s.badge}
                </span>
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-white/25 tracking-[0.4em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
