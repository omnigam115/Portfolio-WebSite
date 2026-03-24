// CertificationsSection.jsx — Certifications with View Certificate buttons
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── UPDATE pdfFile to match your actual filenames in public/certifications/ ──
const CERTS = [
  {
    title: 'Java Programming',
    issuer: 'iamNeo — Lovely Professional University',
    date: 'May 2025',
    icon: '☕',
    color: '#f89820',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    desc: "Comprehensive Java programming certification covering OOP principles, data structures, and advanced Java concepts through LPU's iamNeo platform.",
    badge: 'University',
    pdfFile: 'lpu-java-cert.pdf',          // → public/certifications/lpu-java-cert.pdf
  },
  {
    title: 'Data Structures & Algorithms',
    issuer: 'iamNeo — Lovely Professional University',
    date: 'Dec 2024',
    icon: '🧮',
    color: '#7b2ff7',
    gradient: 'from-purple-600/20 to-pink-500/20',
    desc: 'In-depth DSA certification covering arrays, trees, graphs, sorting, searching, and dynamic programming. Achieved 90%+ in all challenge evaluations.',
    badge: 'University',
    pdfFile: 'lpu-dsa-cert.pdf',           // → public/certifications/lpu-dsa-cert.pdf
  },
  {
    title: 'Python for Data Science, AI & Dev',
    issuer: 'Coursera',
    date: 'Feb 2024',
    icon: '🐍',
    color: '#00d4ff',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    desc: 'Advanced Python programming for AI/ML workflows, data processing, visualization, and automation — core to building NOVA AI Assistant.',
    badge: 'Professional',
    pdfFile: 'coursera-python-cert.pdf',   // → public/certifications/coursera-python-cert.pdf
  },
  {
    title: 'Digital Skills: Social Media',
    issuer: 'Accenture / FutureLearn',
    date: 'Mar 2026',
    icon: '📱',
    color: '#a100ff',
    gradient: 'from-purple-600/20 to-violet-500/20',
    desc: 'Accenture-certified course covering social media for business — brand promotion, campaign objectives, target audience identification, content creation, and performance measurement. Scored 90% overall.',
    badge: 'Accenture',
    pdfFile: 'accenture-cert.pdf',         // → public/certifications/accenture-cert.pdf
  },
  // ── ADD MORE CERTS BELOW ──────────────────────────────────────────────────
  // {
  //   title: 'Your Certificate Name',
  //   issuer: 'Platform / Organization',
  //   date: 'Month Year',
  //   icon: '🏅',
  //   color: '#00ff88',
  //   gradient: 'from-emerald-500/20 to-green-500/20',
  //   desc: 'Short description.',
  //   badge: 'Coursera',
  //   pdfFile: 'your-cert.pdf',
  // },
]

export default function CertificationsSection() {
  const ref           = useRef(null)
  const inView        = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(null)

  // Opens the PDF in a new browser tab
  const openCert = (pdfFile) => {
    window.open(`/certifications/${pdfFile}`, '_blank')
  }

  return (
    <section id="certifications" className="relative py-32 z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/4 blur-[120px] rounded-full pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs text-cyan-400 tracking-[0.4em] mb-4">CREDENTIALS</p>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl gradient-text">Certifications</h2>
          <p className="font-mono text-sm text-white/30 mt-3">
            Click <span className="text-cyan-400">View Certificate</span> on any card to open the PDF
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative glass rounded-3xl p-6 flex flex-col transition-all duration-500 ${
                hovered === i
                  ? 'scale-105'
                  : hovered !== null
                  ? 'scale-95 opacity-60'
                  : ''
              }`}
              style={{
                background: hovered === i
                  ? `linear-gradient(135deg, ${cert.color}15, transparent)`
                  : undefined,
                borderColor: hovered === i
                  ? cert.color + '40'
                  : 'rgba(255,255,255,0.07)',
                boxShadow: hovered === i
                  ? `0 20px 60px ${cert.color}25, 0 0 30px ${cert.color}15`
                  : undefined,
              }}
            >
              {/* Badge top-right */}
              <span
                className="absolute top-4 right-4 px-2 py-0.5 rounded-full font-mono text-xs"
                style={{
                  background: cert.color + '20',
                  color: cert.color,
                  border: `1px solid ${cert.color}30`,
                }}
              >
                {cert.badge}
              </span>

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl mb-5 flex items-center justify-center text-3xl bg-gradient-to-br ${cert.gradient} border flex-shrink-0`}
                style={{ borderColor: cert.color + '30' }}
              >
                {cert.icon}
              </div>

              {/* Title */}
              <h3
                className="font-orbitron font-bold text-sm text-white mb-2 leading-snug"
                style={{ color: hovered === i ? '#67e8f9' : undefined }}
              >
                {cert.title}
              </h3>

              {/* Issuer + date */}
              <p className="font-mono text-xs mb-3" style={{ color: cert.color }}>
                {cert.issuer} • {cert.date}
              </p>

              {/* Description — grows to fill card */}
              <p className="font-rajdhani text-sm text-white/45 leading-relaxed flex-1 mb-5">
                {cert.desc}
              </p>

              {/* ── VIEW CERTIFICATE BUTTON ── */}
              <button
                onClick={() => openCert(cert.pdfFile)}
                className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs tracking-wider
                           flex items-center justify-center gap-2
                           transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}25, ${cert.color}10)`,
                  border: `1px solid ${cert.color}50`,
                  color: cert.color,
                  boxShadow: hovered === i ? `0 0 20px ${cert.color}30` : 'none',
                }}
              >
                {/* PDF icon */}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Certificate
              </button>

              {/* Shimmer on hover */}
              {hovered === i && (
                <div className="absolute inset-0 rounded-3xl holo-shimmer opacity-20 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}