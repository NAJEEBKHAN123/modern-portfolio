import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const featuredIn = [
  { name: 'Hostinger', url: '#' },
  { name: 'Upwork', url: '#' },
  { name: 'CareerFoundry', url: '#' },
  { name: 'Frontend Mentor', url: '#' },
  { name: 'WeAreDevelopers', url: '#' },
]

const roles = [
  'MERN & PERN STACK DEVELOPER.',
  'MACHINE LEARNING & AI ENTHUSIAST.',
  'DATABASE SYSTEMS & BACKEND DEVELOPER.',
  'FULL STACK WEB DEVELOPER.',
]

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0 })

  // ── Typewriter ──────────────────────────────────────────────
  useEffect(() => {
    const current = roles[roleIndex]
    let timeout
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 50)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 3000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25)
    } else {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  // ── Canvas animation ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ONE-TIME size set — never resize mid-animation
    const setSize = () => {
      const w = canvas.parentElement.offsetWidth || window.innerWidth
      const h = canvas.parentElement.offsetHeight || window.innerHeight
      if (w !== sizeRef.current.w || h !== sizeRef.current.h) {
        canvas.width = w
        canvas.height = h
        sizeRef.current = { w, h }
      }
    }
    setSize()

    // Resize observer — only triggers when container truly changes size
    const ro = new ResizeObserver(() => setSize())
    ro.observe(canvas.parentElement)

    // Shapes — matching the original's copper/steel/dark-blue palette
    const shapes = [
      { xr: 0.72, yr: 0.12, w: 190, h: 300, angle: -18, hue: '#1e3f5c' },
      { xr: 0.63, yr: 0.04, w: 150, h: 220, angle:  22, hue: '#3b2010' },
      { xr: 0.80, yr: 0.22, w: 210, h: 280, angle:  -6, hue: '#0f2840' },
      { xr: 0.60, yr: 0.35, w: 170, h: 230, angle:  32, hue: '#4a2000' },
      { xr: 0.88, yr: 0.06, w: 130, h: 190, angle: -24, hue: '#2a1200' },
      { xr: 0.76, yr: 0.48, w: 145, h: 200, angle:  12, hue: '#152b45' },
    ]

    const drawShape = (s, t) => {
      const W = canvas.width
      const H = canvas.height
      const cx = W * s.xr
      const cy = H * s.yr + Math.sin(t * 0.0008 + s.xr * 10) * 6
      const ang = (s.angle + Math.sin(t * 0.0005 + s.yr * 8) * 2.5) * Math.PI / 180
      const sk = s.w * 0.22

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(ang)

      ctx.beginPath()
      ctx.moveTo(-s.w / 2 + sk, -s.h / 2)
      ctx.lineTo( s.w / 2 + sk, -s.h / 2)
      ctx.lineTo( s.w / 2 - sk,  s.h / 2)
      ctx.lineTo(-s.w / 2 - sk,  s.h / 2)
      ctx.closePath()

      // Face gradient (light top-left → dark bottom-right for 3D look)
      const g = ctx.createLinearGradient(-s.w / 2, -s.h / 2, s.w / 2, s.h / 2)
      g.addColorStop(0,   s.hue + 'ff')
      g.addColorStop(0.45, s.hue + 'bb')
      g.addColorStop(1,   s.hue + '55')
      ctx.fillStyle = g
      ctx.fill()

      // Soft edge highlight
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.restore()
    }

    const drawOrb = (t) => {
      const W = canvas.width
      const H = canvas.height
      const cx = W * 0.70 + Math.sin(t * 0.0007) * 12
      const cy = H * 0.20 + Math.cos(t * 0.0005) * 8

      // Wide warm glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140)
      glow.addColorStop(0,   'rgba(255,150,60,0.30)')
      glow.addColorStop(0.35,'rgba(255,100,20,0.10)')
      glow.addColorStop(1,   'rgba(255,60,0,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 140, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      // Inner orb
      const core = ctx.createRadialGradient(cx - 7, cy - 7, 0, cx, cy, 20)
      core.addColorStop(0,  '#ffd490')
      core.addColorStop(0.4,'#ff8c30')
      core.addColorStop(1,  '#c43800')
      ctx.beginPath()
      ctx.arc(cx, cy, 20, 0, Math.PI * 2)
      ctx.fillStyle = core
      ctx.fill()
    }

    let running = true
    const loop = (ts) => {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Draw back-to-front
      ;[...shapes].reverse().forEach(s => drawShape(s, ts))
      drawOrb(ts)
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, []) // empty deps — runs once, no re-mount flicker

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 40%, #12243a 70%, #0a0f1a 100%)',
    }}>
      {/* Canvas — fills section, no resize flash */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          display: 'block',
        }}
      />

      {/* Subtle dot-grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(0,180,216,0.08) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        padding: '8rem 2rem 5rem',
        width: '100%',
      }}>
        {/* Big name */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: 'clamp(3.5rem, 11vw, 7.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 0.92,
            color: '#ffffff',
            margin: '0 0 1.75rem',
            textTransform: 'uppercase',
          }}
        >
          Najeeb Ullah
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: 'clamp(0.7rem, 1.6vw, 1rem)',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.65)',
            minHeight: '1.8em',
            marginBottom: '2.5rem',
          }}
        >
          {displayed}
          <span style={{ animation: 'blink 1s step-end infinite', color: '#00b4d8' }}>_</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '5rem' }}
        >
          <Link to="work" smooth duration={600} offset={-80}
            style={{ fontFamily: 'var(--font-code)', fontSize: '0.85rem', padding: '0.85rem 2rem', backgroundColor: '#00b4d8', color: '#fff', borderRadius: '0.375rem', cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.25s', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0096c7'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,180,216,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#00b4d8'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >view my work</Link>

          <Link to="contact" smooth duration={600} offset={-80}
            style={{ fontFamily: 'var(--font-code)', fontSize: '0.85rem', padding: '0.85rem 2rem', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '0.375rem', cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.25s', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
          >contact me</Link>
        </motion.div>

        {/* AS FEATURED IN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <p style={{ fontFamily: 'var(--font-code)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem', textAlign: 'center' }}>
            AS FEATURED IN
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' }}>
            {featuredIn.map(brand => (
              <a key={brand.name} href={brand.url}
                style={{ fontFamily: 'var(--font-code)', fontSize: '0.78rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.28)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}
              >{brand.name}</a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
      >
        <div style={{ width: 26, height: 42, border: '1px solid rgba(255,255,255,0.22)', borderRadius: 13, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5px' }}>
          <div style={{ width: 3, height: 7, backgroundColor: '#00b4d8', borderRadius: 2, animation: 'scrollDot 1.6s ease-in-out infinite' }} />
        </div>
      </motion.div>

      <style>{`
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollDot { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(13px);opacity:0} }
      `}</style>
    </section>
  )
}