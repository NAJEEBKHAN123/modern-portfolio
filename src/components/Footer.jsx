import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { dark } = useTheme()

  return (
    <footer className={`py-8 border-t text-center ${
      dark ? 'border-dark-border text-gray-500' : 'border-light-border text-gray-400'
    }`}>
      <p className="font-code text-xs">
        © {new Date().getFullYear()}. Made with passion by{' '}
        <span className="text-primary">Najeeb Ullah</span>
        {' '}— All rights reserved.
      </p>
    </footer>
  )
}