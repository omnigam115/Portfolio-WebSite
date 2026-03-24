// Footer.jsx — Glowing footer with all real social links
import { motion } from 'framer-motion'

const NAV = ['Home', 'About', 'Projects', 'Skills', 'Certifications', 'Contact']
const NAV_HREFS = ['#hero', '#about', '#projects', '#skills', '#certifications', '#contact']

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(123,47,247,0.2))', border: '1px solid rgba(0,212,255,0.3)' }}>
              <span className="font-orbitron font-black text-sm gradient-text-blue">ON</span>
            </div>
            <div>
              <p className="font-orbitron font-bold text-white/80 text-sm">OM NIGAM</p>
              <p className="font-mono text-xs text-white/30">AI & Full Stack Developer · LPU CSE</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV.map((l, i) => (
              <a key={l} href={NAV_HREFS[i]} data-hover
                className="font-rajdhani text-sm text-white/40 hover:text-cyan-400 transition-colors tracking-wider">
                {l}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: 'GH', href: 'https://github.com/omnigam115',           color: '#ffffff', title: 'GitHub' },
              { icon: 'in', href: 'https://www.linkedin.com/in/om-nigam/',    color: '#0077b5', title: 'LinkedIn' },
              { icon: '@',  href: 'mailto:omnigam115@gmail.com',              color: '#00d4ff', title: 'Email' },
              { icon: '☎', href: 'tel:+919918841427',                        color: '#7b2ff7', title: 'Phone' },
            ].map(s => (
              <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" data-hover title={s.title}
                className="w-9 h-9 rounded-full glass flex items-center justify-center font-orbitron text-xs transition-all duration-300 hover:scale-110"
                style={{ color: s.color, border: `1px solid ${s.color}30` }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Education bar */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-white/20">
              © {new Date().getFullYear()} Om Nigam · B.Tech CSE @ Lovely Professional University, Punjab · CGPA 6.84
            </p>
            <p className="font-mono text-xs text-cyan-400/30">
              "Building Intelligent Systems & Interactive Experiences"
            </p>
          </div>
          <p className="font-mono text-xs text-white/10 text-center mt-2">
            Built with React · Three.js · Framer Motion · Tailwind CSS · Vite
          </p>
        </div>
      </div>
    </footer>
  )
}
