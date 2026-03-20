import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FaCode, FaReact, FaMobileAlt, FaDatabase } from 'react-icons/fa'
import { SiMongodb } from 'react-icons/si'
import { TbBrain } from 'react-icons/tb'

const expertiseItems = [
  {
    icon: <FaCode size={26} />,
    title: 'Software Development',
    subtitle: 'MERN Stack & Full Stack Engineer',
    description: 'Experienced in building full stack web applications using MongoDB, Express.js, React.js and Node.js with clean architecture.',
    skills: ['JavaScript', 'C++', 'TypeScript', 'Node.js', 'Express.js'],
  },
  {
    icon: <FaReact size={26} />,
    title: 'Frontend Development',
    subtitle: 'React.js & Modern UI',
    description: 'Passionate about UI/UX. Building fast, responsive and beautiful interfaces using React.js with Tailwind CSS.',
    skills: ['React.js', 'HTML', 'CSS', 'Tailwind', 'Framer Motion'],
  },
  {
    icon: <FaDatabase size={26} />,
    title: 'Database Systems',
    subtitle: 'SQL & NoSQL Expert',
    description: 'Skilled in designing and managing relational and non-relational databases for scalable backend systems.',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  },
  {
    icon: <TbBrain size={26} />,
    title: 'AI & Machine Learning',
    subtitle: 'Currently Learning',
    description: 'Actively learning Machine Learning concepts, model training and AI integration into web applications.',
    skills: ['Python', 'ML', 'TensorFlow', 'Data Analysis'],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Expertise() {
  const { dark } = useTheme()

  const bg          = dark ? '#090d13' : '#f9fafb'
  const cardBg      = dark ? '#12171f' : '#ffffff'
  const titleColor  = dark ? '#f0f6fc' : '#111827'
  const textColor   = dark ? '#8b949e' : '#6b7280'
  const periodBg    = dark ? '#1c2333' : 'transparent'

  return (
    <section id="expertise" style={{ padding: '6rem 0', backgroundColor: bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <h2 style={{ fontFamily: 'var(--font-code)', fontSize: '1.875rem', fontWeight: 600, color: titleColor, marginBottom: '0.5rem' }}>
            My <span style={{ color: '#00b4d8' }}>Expertise</span>
          </h2>
          <div style={{ width: 48, height: 2, backgroundColor: '#00b4d8' }} />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="expertise-grid"
        >
          {expertiseItems.map((exp) => (
            <motion.div
              key={exp.title}
              variants={item}
              style={{
                borderRadius: '0.75rem',
                backgroundColor: cardBg,
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
                // THE FIX: strong visible border + inset highlight + deep shadow
                border: dark ? '1px solid #3d444d' : '1px solid #e5e7eb',
                boxShadow: dark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.5)'
                  : '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#00b4d8'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = dark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px #00b4d8, 0 12px 40px rgba(0,180,216,0.12)'
                  : '0 8px 30px rgba(0,180,216,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = dark ? '#3d444d' : '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = dark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.5)'
                  : '0 2px 12px rgba(0,0,0,0.06)'
              }}
            >
              {/* Top cyan accent bar */}
              {dark && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  borderRadius: '0.75rem 0.75rem 0 0',
                  background: 'linear-gradient(90deg, #00b4d8 0%, rgba(0,180,216,0) 70%)',
                }} />
              )}

              {/* Icon */}
              <div style={{ color: '#00b4d8', marginBottom: '1.1rem' }}>
                {exp.icon}
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: 'var(--font-code)', fontWeight: 600, fontSize: '1.05rem', color: titleColor, marginBottom: '0.25rem' }}>
                {exp.title}
              </h3>

              {/* Subtitle */}
              <p style={{ color: '#00b4d8', fontFamily: 'var(--font-code)', fontSize: '0.72rem', marginBottom: '0.85rem', letterSpacing: '0.04em' }}>
                {exp.subtitle}
              </p>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: dark ? '#21262d' : '#f0f0f0', marginBottom: '0.85rem' }} />

              {/* Description */}
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: textColor, marginBottom: '1.1rem' }}>
                {exp.description}
              </p>

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {exp.skills.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '0.375rem',
                    border: dark ? '1px solid #3d444d' : '1px solid rgba(0,180,216,0.3)',
                    color: '#00b4d8',
                    backgroundColor: dark ? 'rgba(0,180,216,0.08)' : 'rgba(0,180,216,0.05)',
                  }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            borderLeft: '3px solid #00b4d8',
            paddingLeft: '1.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            maxWidth: '36rem',
            marginTop: '4rem',
          }}
        >
          <p style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.75, color: dark ? '#d1d5db' : '#4b5563', marginBottom: '0.5rem' }}>
            "Sometimes the best way to solve a problem is to help others."
          </p>
          <cite style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', fontStyle: 'normal', color: dark ? '#6b7280' : '#9ca3af' }}>
            — Uncle Iroh, 'Avatar: The Last Airbender'
          </cite>
        </motion.blockquote>
      </div>

      <style>{`
        .expertise-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .expertise-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .expertise-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  )
}