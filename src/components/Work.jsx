import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { projects, categories } from '../data/projects'
import { FiExternalLink } from 'react-icons/fi'

export default function Work() {
  const { dark } = useTheme()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const featured = projects.find((p) => p.featured)

  return (
    <section id="work" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className={`section-heading font-code ${dark ? 'text-white' : 'text-gray-900'}`}>
            My <span className="text-primary">Work</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mt-2 mb-6" />
          <p className={`max-w-2xl text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Deployed scalable travel, event and telemedicine web and hybrid mobile apps using React SPA and PWA.
            Collaborated in 140+ projects with 50+ clients all around the world.
          </p>
        </motion.div>

        {/* Featured project banner */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`mb-10 rounded-xl overflow-hidden border relative group ${
              dark ? 'border-dark-border' : 'border-light-border'
            }`}
          >
            <div className="relative h-56 md:h-72 overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="font-code text-xs text-primary mb-2 block">// Featured Project</span>
                <h3 className="font-code text-xl font-semibold text-white mb-3">
                  {featured.title}
                </h3>
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-xs"
                >
                  View Project <FiExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`font-code text-xs px-4 py-2 rounded border transition-all duration-200 ${
                activeFilter === cat.key
                  ? 'bg-primary text-white border-primary'
                  : dark
                  ? 'border-dark-border text-gray-400 hover:border-primary/50 hover:text-primary'
                  : 'border-light-border text-gray-500 hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat.key !== 'all' && <span className="text-primary mr-1">/</span>}
              {cat.label}
              <span className={`ml-1.5 text-[10px] ${activeFilter === cat.key ? 'text-white/70' : 'text-primary/60'}`}>
                {String(cat.count).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`card overflow-hidden group ${
                  dark
                    ? 'bg-dark-card border-dark-border hover:border-primary/40'
                    : 'bg-white border-light-border hover:border-primary/30 shadow-sm'
                }`}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 btn-primary flex items-center gap-2 text-xs"
                    >
                      Show Project <FiExternalLink size={13} />
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`font-code text-sm font-medium leading-snug ${
                    dark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {project.title}
                  </h3>
                  <span className="font-code text-xs text-primary/70 mt-1 block">
                    {categories.find(c => c.key === project.category)?.label || 'Web Development'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}