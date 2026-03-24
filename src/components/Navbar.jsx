// Navbar.jsx — Glassmorphic top navigation
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Home',     href: '#hero'          },
  { label: 'About',    href: '#about'         },
  { label: 'Projects', href: '#projects'      },
  { label: 'Skills',   href: '#skills'        },
  { label: 'Certs',    href: '#certifications'},
  { label: 'Contact',  href: '#contact'       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3" data-hover>
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 opacity-20 group-hover:opacity-40 blur-md transition-opacity" />
            <div className="relative w-10 h-10 rounded-full border border-cyan-400/40 flex items-center justify-center">
              <span className="font-orbitron font-black text-sm gradient-text-blue">ON</span>
            </div>
          </div>
          <span className="font-orbitron font-bold text-white/80 group-hover:text-cyan-400 transition-colors text-sm tracking-widest">
            OM NIGAM
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                data-hover
                onClick={() => setActive(link.label)}
                className={`relative px-4 py-2 font-rajdhani font-semibold text-sm tracking-widest uppercase transition-colors duration-200 ${
                  active === link.label ? 'text-cyan-400' : 'text-white/50 hover:text-white'
                }`}
              >
                {active === link.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-cyan-400/10 border border-cyan-400/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          data-hover
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-orbitron font-bold tracking-wider text-dark-900 bg-gradient-to-r from-cyan-400 to-purple-500 hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(m => !m)}
          data-hover
        >
          <span className={`block w-6 h-0.5 bg-cyan-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cyan-400 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cyan-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden border-t border-white/5"
          >
            {LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => { setMenuOpen(false); setActive(link.label) }}
                className="block px-6 py-3 font-rajdhani font-semibold tracking-widest uppercase text-white/60 hover:text-cyan-400 hover:bg-cyan-400/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
