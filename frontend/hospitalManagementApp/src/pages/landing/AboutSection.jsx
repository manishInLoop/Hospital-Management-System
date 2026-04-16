// ─── src/pages/landing/AboutSection.jsx ──────────────────────────────────────
import { CheckCircle2 } from 'lucide-react'

const highlights = [
  'Over 80 experienced, board-certified doctors across specializations',
  'State-of-the-art diagnostic equipment and surgical facilities',
  'Patient-centered care with personalized treatment plans',
  'Seamless digital appointment booking and medical records',
  'Accredited by the Nepal Medical Council and ISO 9001:2015',
]

const team = [
  { name: 'Dr. Anil Sharma',    role: 'Chief of Cardiology',    exp: '22 yrs' },
  { name: 'Dr. Priya Shrestha', role: 'Head of Neurology',      exp: '18 yrs' },
  { name: 'Dr. Rajan Thapa',    role: 'Orthopedic Surgeon',     exp: '15 yrs' },
  { name: 'Dr. Sita Karki',     role: 'Pediatric Specialist',   exp: '12 yrs' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top: text + highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left */}
          <div className="animate-fade-in">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 mb-3">
              About Us
            </span>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-5 leading-tight">
              Committed to Excellence<br />in Patient Care
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Founded in 1998, MediCare Hospital has grown to become one of Nepal's leading
              multi-specialty hospitals. We combine decades of clinical expertise with
              cutting-edge technology to deliver outcomes that transform lives.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Our team of over 80 specialists is united by a single mission — to provide
              every patient with compassionate, evidence-based care in a welcoming environment.
            </p>

            <ul className="space-y-3">
              {highlights.map(h => (
                <li key={h} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={17} className="text-primary-500 shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — visual stats */}
          <div className="grid grid-cols-2 gap-5 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            {[
              { value: '25+', label: 'Years of Service',     color: 'bg-primary-600', text: 'text-white' },
              { value: '80+', label: 'Expert Doctors',       color: 'bg-white',       text: 'text-slate-900' },
              { value: '50K+',label: 'Patients Treated',     color: 'bg-white',       text: 'text-slate-900' },
              { value: '99%', label: 'Patient Satisfaction', color: 'bg-teal-600',    text: 'text-white' },
            ].map(({ value, label, color, text }) => (
              <div key={label}
                className={`${color} rounded-2xl p-8 flex flex-col justify-center shadow-sm
                            border border-slate-100 hover:scale-105 transition-transform duration-200`}>
                <p className={`font-display text-4xl font-bold ${text} leading-none mb-2`}>{value}</p>
                <p className={`text-sm font-medium ${text === 'text-white' ? 'text-white/70' : 'text-slate-500'}`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 mb-3">
              Meet the Team
            </span>
            <h3 className="font-display text-3xl font-bold text-slate-900">Our Lead Physicians</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, exp }, i) => (
              <div key={name}
                className="bg-white rounded-2xl border border-slate-100 p-6 text-center
                           hover:shadow-md hover:border-primary-100 transition-all duration-200
                           animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}>
                {/* Avatar */}
                <div className="w-16 h-16 bg-linear-to-br from-primary-100 to-primary-200 rounded-2xl
                                flex items-center justify-center mx-auto mb-4 text-2xl">
                  👨‍⚕️
                </div>
                <p className="font-display font-semibold text-slate-800 text-sm mb-1">{name}</p>
                <p className="text-xs text-primary-600 font-medium mb-2">{role}</p>
                <span className="inline-block text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                  {exp} experience
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}