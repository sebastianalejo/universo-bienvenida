'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinklePhase: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 4000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.08 + 0.01,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }))
    }

    const spawnParticle = (x: number, y: number) => {
      if (particles.length > 60) return
      const colors = ['rgba(201,169,110,', 'rgba(139,123,181,', 'rgba(255,255,255,']
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: 1,
        color,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (Math.random() < 0.3) spawnParticle(e.clientX, e.clientY)
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Nebula glow blobs
      const blobs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 280, color: '139,123,181' },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 220, color: '201,169,110' },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 200, color: '80,100,180' },
      ]
      blobs.forEach((b) => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `rgba(${b.color},0.06)`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Stars
      t += 0.016
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase)
        const opacity = star.opacity * (0.4 + 0.6 * twinkle)

        // Mouse parallax
        const dx = (mouseRef.current.x - canvas.width / 2) * star.speed * 0.04
        const dy = (mouseRef.current.y - canvas.height / 2) * star.speed * 0.04
        const sx = star.x + dx
        const sy = star.y + dy

        ctx.beginPath()
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity})`
        ctx.fill()

        // Glow for larger stars
        if (star.radius > 1) {
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.radius * 4)
          glow.addColorStop(0, `rgba(201,220,255,${opacity * 0.3})`)
          glow.addColorStop(1, 'transparent')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(sx, sy, star.radius * 4, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Particles
      particles = particles.filter((p) => p.life < p.maxLife)
      particles.forEach((p) => {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.01
        p.opacity = 1 - p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    resize()
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
      id="starfield"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
