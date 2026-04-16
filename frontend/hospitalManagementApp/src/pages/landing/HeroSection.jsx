import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ArrowRight, ShieldCheck, Clock3, Award } from 'lucide-react'

export default function HeroSection() {
  const { user }  = useAuth()
  const navigate  = useNavigate()

  const handleBooking = () => {
    if (user?.role === 'ROLE_PATIENT') navigate('/patient/book')
    else navigate('/login', { state: { from: '/patient/book', message: 'Please login to book an appointment.' } })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #fff 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)', backgroundSize: '32px 32px', opacity: 0.5 }} />
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: '#dbeafe', filter: 'blur(80px)', opacity: 0.4 }} />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: '#ccfbf1', filter: 'blur(80px)', opacity: 0.3 }} />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-wider"
            style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#3b82f6', animation: 'pulseSoft 2s ease-in-out infinite' }} />
            Trusted Healthcare Since 1998
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)' }}>
            Your Health,<br />
            <span style={{ color: 'var(--color-primary-600)' }}>Our Priority</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
            World-class medical care with compassionate doctors, advanced facilities,
            and seamless appointment booking — all in one place.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button onClick={handleBooking} className="btn-primary py-3 px-7 text-base"
              style={{ boxShadow: '0 8px 24px rgb(37 99 235/0.25)' }}>
              Book an Appointment <ArrowRight size={18} />
            </button>
            <button onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary py-3 px-7 text-base">
              Our Services
            </button>
          </div>

          <div className="flex flex-wrap gap-8">
            {[{ value: '15,000+', label: 'Patients Served' }, { value: '80+', label: 'Expert Doctors' }, { value: '25+', label: 'Specializations' }]
              .map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="relative hidden lg:block" style={{ animation: 'fadeIn 0.5s ease-out 0.2s both' }}>
          <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: '0 25px 60px rgb(0 0 0/0.12)', border: '1px solid #f1f5f9' }}>
            <div className="h-48 flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)' }}>
              <div className="text-center">
                <div className="text-6xl mb-2">🏥</div>
                <p className="font-semibold text-lg" style={{ fontFamily: 'var(--font-display)' }}>MediCare Hospital</p>
                <p className="text-blue-200 text-sm">Excellence in Healthcare</p>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {[
                { icon: ShieldCheck, color: '#16a34a', label: 'Certified Medical Staff',  sub: 'All doctors are board certified' },
                { icon: Clock3,      color: '#2563eb', label: '24/7 Emergency Services', sub: 'Round-the-clock care' },
                { icon: Award,       color: '#d97706', label: 'Award-Winning Facility',  sub: 'Best hospital 2023 & 2024' },
              ].map(({ icon: Icon, color, label, sub }) => (
                <div key={label} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#f8fafc', border: '1px solid #f1f5f9', color }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ boxShadow: '0 8px 24px rgb(0 0 0/0.1)', border: '1px solid #f1f5f9' }}>
            <span className="w-3 h-3 rounded-full" style={{ background: '#22c55e', animation: 'pulseSoft 2s ease-in-out infinite' }} />
            <div>
              <p className="text-xs font-bold text-slate-800">Accepting Patients</p>
              <p className="text-xs text-slate-400">Available today</p>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3"
            style={{ boxShadow: '0 8px 24px rgb(0 0 0/0.1)', border: '1px solid #f1f5f9' }}>
            <p className="text-xs text-slate-400 mb-0.5">Patient Rating</p>
            <div className="flex items-center gap-1.5">
              <span className="text-base" style={{ color: '#f59e0b' }}>★★★★★</span>
              <span className="font-bold text-slate-800 text-sm">4.9</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}