// ─── src/components/layout/Navbar.jsx ─────────────────────────────────────────
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Stethoscope, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const navigate                = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { href: '#home',     label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about',    label: 'About' },
    { href: '#contact',  label: 'Contact' },
  ]

  const scrollTo = (id) => {
    setOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-primary-700 transition-colors">
            <Stethoscope size={20} className="text-white" />
          </div>
          <div className="text-left">
            <p className="font-display font-bold text-slate-900 leading-none text-lg">MediCare</p>
            <p className="text-xs text-slate-500 leading-none mt-0.5">Hospital Management</p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <button key={href} onClick={() => scrollTo(href)}
              className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
              {label}
            </button>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors px-3 py-2">
            Sign in
          </Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-5">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-slate-600" onClick={() => setOpen(p => !p)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map(({ href, label }) => (
            <button key={href} onClick={() => scrollTo(href)}
              className="block w-full text-left text-sm font-medium text-slate-700 py-2 hover:text-primary-600">
              {label}
            </button>
          ))}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <Link to="/login" className="btn-secondary flex-1 text-sm py-2">Sign in</Link>
            <Link to="/register" className="btn-primary flex-1 text-sm py-2">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  )
}