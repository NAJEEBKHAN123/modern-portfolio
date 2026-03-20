import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { experiences } from '../data/experience'
import { FiMapPin, FiExternalLink } from 'react-icons/fi'

export default function Experience() {
  const { dark } = useTheme()
  const bg = dark ? '#0d1117' : '#f9fafb'
  const cardBg = dark ? '#161b22' : '#ffffff'
  const cardBorder = dark ? '#30363d' : '#e5e7eb'
  const titleColor = dark ? '#e6edf3' : '#111827'
  const textColor = dark ? '#8b949e' : '#6b7280'
  const lineColor = dark ? '#21262d' : '#e5e7eb'

  return (
    <section id="experience" style={{ padding: '6rem 0', backgroundColor: bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-code)', fontSize: '1.875rem', fontWeight: 600, color: titleColor, marginBottom: '0.5rem' }}>
            Professional <span style={{ color: '#00b4d8' }}>Experience</span>
          </h2>
          <div style={{ width: 48, height: 2, backgroundColor: '#00b4d8' }} />
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div className="timeline-line" style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 1, backgroundColor: lineColor }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp, i) => (
              <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="exp-row" style={{ position: 'relative' }}>
                <div className="exp-logo" style={{ position: 'absolute', left: 0, top: 0, width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(0,180,216,0.25)', backgroundColor: dark ? '#161b22' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={exp.logo} alt={exp.company} style={{ width: 32, height: 32, objectFit: 'contain', filter: dark ? 'brightness(0.9)' : 'none' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ borderRadius: '0.75rem', border: `1px solid ${cardBorder}`, backgroundColor: cardBg, padding: '1.5rem', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,180,216,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = cardBorder}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-code)', fontWeight: 600, fontSize: '1rem', color: titleColor, marginBottom: '0.375rem' }}>
                        {exp.role} <span style={{ color: '#00b4d8' }}>@ {exp.company}</span>
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: textColor }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiMapPin size={11} />{exp.location}</span>
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#00b4d8', textDecoration: 'none' }}><FiExternalLink size={11} />{exp.url.replace(/https?:\/\/www?\./, '')}</a>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', padding: '0.2rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${cardBorder}`, color: textColor, whiteSpace: 'nowrap' }}>{exp.period}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: textColor, marginBottom: '1rem' }}>{exp.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {exp.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .exp-row{padding-left:0}.exp-logo{display:none!important}.timeline-line{display:none!important}
        @media(min-width:768px){.exp-row{padding-left:5rem}.exp-logo{display:flex!important}.timeline-line{display:block!important}}
      `}</style>
    </section>
  )
}