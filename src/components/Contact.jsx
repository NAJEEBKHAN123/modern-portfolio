import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { SiUpwork } from 'react-icons/si'

const socials = [
  { icon: <FiGithub size={18} />, href: 'https://github.com/', label: 'GitHub' },
  { icon: <FiLinkedin size={18} />, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: <FiTwitter size={18} />, href: 'https://twitter.com/', label: 'Twitter' },
  { icon: <SiUpwork size={18} />, href: 'https://upwork.com/', label: 'Upwork' },
]

export default function Contact() {
  const { dark } = useTheme()
  const bg = dark ? '#0a0f1a' : '#f3f4f6'
  const iconBorder = dark ? '#21262d' : '#e5e7eb'
  const iconColor = dark ? '#8b949e' : '#6b7280'
  const titleColor = dark ? '#e6edf3' : '#111827'
  const textColor = dark ? '#8b949e' : '#6b7280'

  return (
    <section id="contact" style={{ padding: '6rem 0', backgroundColor: bg }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: 9999, border: '1px solid rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.07)', marginBottom: '2rem' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#22c55e', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: '#22c55e' }}>Available for select freelance opportunities</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-code)', fontSize: '2.25rem', fontWeight: 600, color: titleColor, marginBottom: '1rem' }}>
            Get In <span style={{ color: '#00b4d8' }}>Touch</span>
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: textColor, maxWidth: '28rem', margin: '0 auto 2.5rem' }}>
            Whether you have a project in mind, a question, or just want to say hi — my inbox is always open.
          </p>
          <a href="mailto:hello@tamalsen.dev" className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <FiMail size={15} /> Say Hello
          </a>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{ padding: '0.75rem', borderRadius: '0.75rem', border: `1px solid ${iconBorder}`, color: iconColor, display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = iconBorder; e.currentTarget.style.color = iconColor; e.currentTarget.style.transform = 'translateY(0)' }}
              >{s.icon}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}