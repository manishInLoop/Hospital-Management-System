// ─── src/components/layout/Footer.jsx ─────────────────────────────────────────
import { Stethoscope, Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Stethoscope size={20} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg leading-none">MediCare</p>
                <p className="text-xs text-slate-500 mt-0.5">Hospital Management</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing compassionate, world-class healthcare to our community since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home','Services','About Us','Contact','Patient Portal'].map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {['General Practice','Cardiology','Neurology','Orthopedics','Pediatrics','Emergency Care'].map(s => (
                <li key={s}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-primary-400 mt-0.5 flex-shrink-0" />
                Maharajgunj, Kathmandu, Nepal
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={15} className="text-primary-400 flex-shrink-0" />
                +977 01-4XXXXXX
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={15} className="text-primary-400 flex-shrink-0" />
                info@medicare.com.np
              </li>
            </ul>
            <div className="mt-5">
              <Link to="/register"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700
                           text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2025 MediCare Hospital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}