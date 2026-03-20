import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Dark mode is DEFAULT (matches tamalsen.dev)
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return true // default dark
    } catch { return true }
  })

  useEffect(() => {
    if (dark) {
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const toggle = () => setDark(d => !d)

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}