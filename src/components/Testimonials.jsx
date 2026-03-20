import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { testimonials } from '../data/testimonials'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Testimonials() {
  const { dark } = useTheme()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className={`section-heading font-code ${dark ? 'text-white' : 'text-gray-900'}`}>
            What <span className="text-primary">Clients</span> Say
          </h2>
        </motion.div>

        <div className={`relative card p-8 md:p-10 ${
          dark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'
        }`}>
          <div className="text-primary font-code text-5xl leading-none mb-4 opacity-30">"</div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.35 }}
            >
              <p className={`text-base leading-relaxed mb-6 italic ${
                dark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {current.quote}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className={`font-code font-medium text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>
                    — {current.name}
                  </p>
                  <p className={`font-code text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {current.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === index ? 'bg-primary w-5' : dark ? 'bg-dark-border' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className={`p-2 rounded-lg border transition-colors ${
                  dark
                    ? 'border-dark-border hover:border-primary/50 text-gray-400 hover:text-primary'
                    : 'border-light-border hover:border-primary/50 text-gray-500 hover:text-primary'
                }`}
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className={`p-2 rounded-lg border transition-colors ${
                  dark
                    ? 'border-dark-border hover:border-primary/50 text-gray-400 hover:text-primary'
                    : 'border-light-border hover:border-primary/50 text-gray-500 hover:text-primary'
                }`}
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}