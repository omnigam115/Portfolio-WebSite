// ParticleBackground.jsx — Canvas-based galaxy particle system
import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const PARTICLE_COUNT = 160
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.5 + 0.3,
      vx:   (Math.random() - 0.5) * 0.3,
      vy:   (Math.random() - 0.5) * 0.3,
      // Hue ranges: cyan ~190, purple ~270, pink ~330
      hue:  [190, 270, 330][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.6 + 0.2,
    }))

    // Mouse parallax
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        // Gentle mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          p.x += (dx / dist) * 0.5
          p.y += (dy / dist) * 0.5
        }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw glowing dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grd.addColorStop(0,   `hsla(${p.hue}, 100%, 70%, ${p.alpha})`)
        grd.addColorStop(0.5, `hsla(${p.hue}, 100%, 60%, ${p.alpha * 0.4})`)
        grd.addColorStop(1,   `hsla(${p.hue}, 100%, 50%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      })

      // Draw connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            const alpha = (1 - dist / 90) * 0.12
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
