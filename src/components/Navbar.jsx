import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { useTheme } from '../context/ThemeContext'
import { HiSun, HiMoon, HiBars3, HiXMark } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: 'hero', label: '// home', num: '01' },
  { to: 'expertise', label: '// expertise', num: '02' },
  { to: 'work', label: '// work', num: '03' },
  { to: 'experience', label: '// experience', num: '04' },
  { to: 'contact', label: '// contact', num: '05' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On dark hero sections (top of page) always show dark nav
  const isHeroSection = !scrolled
  const navBg = scrolled
    ? dark ? 'rgba(13,13,13,0.95)' : 'rgba(255,255,255,0.95)'
    : 'transparent'
  const textColor = (isHeroSection || dark) ? 'rgba(255,255,255,0.7)' : '#6b7280'
  const logoColor = (isHeroSection || dark) ? '#00b4d8' : '#00b4d8'
  const logoSecondary = (isHeroSection || dark) ? '#ffffff' : '#111827'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: navBg,
      borderBottom: scrolled ? (dark ? '1px solid #2a2a2a' : '1px solid #e5e5e5') : 'none',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.4s ease',
      boxShadow: scrolled && !dark ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
    }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo - matches "TamalSen._" style */}
        <a href="/" style={{ fontFamily: 'var(--font-code)', fontSize: '1.15rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{ color: logoColor }}>Najeeb</span>
          <span style={{ color: logoSecondary }}>Ullah</span>
          <span style={{ color: logoColor }}>.</span>
          <span style={{ color: logoColor, animation: 'blink 1s step-end infinite' }}>_</span>
        </a>

        {/* Desktop nav - with numbers above like original */}
        <ul className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.to} style={{ position: 'relative' }}>
              <Link
                to={link.to} smooth duration={500} offset={-80} spy activeClass="nav-link-active"
                style={{ fontFamily: 'var(--font-code)', fontSize: '0.875rem', color: textColor, cursor: 'pointer', transition: 'color 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00b4d8'}
                onMouseLeave={e => { if (!e.currentTarget.classList.contains('nav-link-active')) e.currentTarget.style.color = textColor }}
              >
                <span style={{ fontSize: '0.6rem', color: 'rgba(0,180,216,0.6)', letterSpacing: '0.05em' }}>{link.num}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={toggle} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', background: 'transparent', color: (isHeroSection || dark) ? '#d1d5db' : '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '1rem' }} aria-label="Toggle theme">
            {dark ? <HiSun size={18} /> : <HiMoon size={18} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', background: 'transparent', color: (isHeroSection || dark) ? '#d1d5db' : '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {menuOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: dark ? '#0d0d0d' : '#ffffff', overflow: 'hidden' }}>
            <ul style={{ padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', margin: 0 }}>
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} smooth duration={500} offset={-80} onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: 'var(--font-code)', fontSize: '0.875rem', color: dark ? '#9ca3af' : '#6b7280', cursor: 'pointer' }}>
                    <span style={{ color: 'rgba(0,180,216,0.6)', fontSize: '0.65rem', marginRight: '0.5rem' }}>{link.num}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-hamburger { display: none !important; }
        .nav-link-active { color: #00b4d8 !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </header>
  )
}