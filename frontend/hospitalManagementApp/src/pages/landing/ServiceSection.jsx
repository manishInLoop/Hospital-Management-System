// ─── src/pages/landing/ServicesSection.jsx ────────────────────────────────────
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const services = [
  { emoji: '❤️', title: 'Cardiology',        desc: 'Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.' },
  { emoji: '🧠', title: 'Neurology',         desc: 'Expert treatment for neurological disorders including stroke, epilepsy, and movement disorders.' },
  { emoji: '🦴', title: 'Orthopedics',       desc: 'Advanced bone, joint, and muscle treatments including joint replacement and sports medicine.' },
  { emoji: '👶', title: 'Pediatrics',        desc: 'Specialized healthcare for infants, children, and adolescents from birth through teenage years.' },
  { emoji: '🔬', title: 'Dermatology',       desc: 'Medical and cosmetic care for all skin, hair, and nail conditions by certified dermatologists.' },
  { emoji: '🩺', title: 'General Practice',  desc: 'Primary healthcare for all ages — routine check-ups, preventive care, and chronic disease management.' },
  { emoji: '🫁', title: 'Pulmonology',       desc: 'Diagnosis and treatment of lung conditions including asthma, COPD, and respiratory infections.' },
  { emoji: '🔭', title: 'Radiology',         desc: 'State-of-the-art imaging services including MRI, CT scan, X-ray, and ultrasound diagnostics.' },
]

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState(null)

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index)
  }
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 mb-3">
            What We Offer
          </span>
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
            Our Medical Services
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            From routine check-ups to complex surgeries, our team of specialists
            delivers exceptional care across a wide range of medical disciplines.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ emoji, title, desc }, i) => (
            <div key={title}
              onClick={() => toggleService(i)}
              className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-primary-200
                         hover:shadow-lg hover:shadow-primary-50 transition-all duration-300 cursor-pointer
                         animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="text-3xl mb-4">{emoji}</div>
              <h3 className="font-display font-semibold text-slate-800 mb-2 text-base group-hover:text-primary-600 transition-colors">
                {title}
              </h3>
              <p className={`text-sm text-slate-500 leading-relaxed ${expandedService === i ? '' : 'line-clamp-3'}`}>
                {desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary-600 transition-opacity">
                {expandedService === i ? (
                  <>Show less <ChevronUp size={12} /></>
                ) : (
                  <>Learn more <ChevronDown size={12} /></>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/register"
            className="btn-primary py-3 px-8 text-base inline-flex shadow-md shadow-primary-100">
            Book an Appointment <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}