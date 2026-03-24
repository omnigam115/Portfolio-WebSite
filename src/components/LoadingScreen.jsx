// LoadingScreen.jsx — Futuristic boot-up loader
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  '> Initializing neural interface...',
  '> Loading 3D environment...',
  '> Calibrating holographic display...',
  '> Connecting to AI core...',
  '> System ready. Welcome.',
]

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [lineIdx, setLineIdx]   = useState(0)
  const [visible, setVisible]   = useState(true)

  useEffect(() => {
    // Increment progress bar
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); return 100 }
        return p + 1.2
      })
    }, 28)

    // Show boot lines progressively
    const lineTimer = setInterval(() => {
      setLineIdx(i => {
        if (i >= BOOT_LINES.length - 1) { clearInterval(lineTimer); return i }
        return i + 1
      })
    }, 480)

    // Dismiss after ~3s
    const dismiss = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 600)
    }, 3000)

    return () => { clearInterval(timer); clearInterval(lineTimer); clearTimeout(dismiss) }
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-900"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 scan-line pointer-events-none" />

          {/* Glowing ring */}
          <div className="relative mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-28 h-28 rounded-full border-2 border-transparent"
              style={{
                background: 'linear-gradient(#020208, #020208) padding-box, linear-gradient(135deg, #00d4ff, #7b2ff7) border-box',
                boxShadow: '0 0 40px rgba(0,212,255,0.4)'
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full border-2 border-transparent"
              style={{
                background: 'linear-gradient(#020208, #020208) padding-box, linear-gradient(135deg, #7b2ff7, #ff006e) border-box',
              }}
            />
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-orbitron font-black text-2xl neon-text-blue">ON</span>
            </div>
          </div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-orbitron text-3xl font-black gradient-text mb-2"
          >
            OM NIGAM
          </motion.h1>

          {/* Boot terminal lines */}
          <div className="font-mono text-xs text-cyan-400/60 mb-8 w-72 min-h-[80px]">
            {BOOT_LINES.slice(0, lineIdx + 1).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-1"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-72 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #00d4ff, #7b2ff7)'
              }}
            />
          </div>
          <p className="font-mono text-xs text-white/30 mt-2">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
