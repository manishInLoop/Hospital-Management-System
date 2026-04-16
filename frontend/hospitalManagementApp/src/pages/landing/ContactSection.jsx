// ─── src/pages/landing/ContactSection.jsx ─────────────────────────────────────
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactSection() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      toast.success('Message sent! We will contact you shortly.')
      setForm({ name: '', email: '', phone: '', message: '' })
      setSending(false)
    }, 1000)
  }

  const info = [
    { icon: MapPin, label: 'Address',       value: 'Maharajgunj, Kathmandu, Nepal' },
    { icon: Phone,  label: 'Phone',         value: '+977 01-4XXXXXX' },
    { icon: Mail,   label: 'Email',         value: 'info@medicare.com.np' },
    { icon: Clock,  label: 'Working Hours', value: 'Sun–Fri: 8am – 6pm · Emergency: 24/7' },
  ]

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 mb-3">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Contact Us</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Have questions or need to schedule an appointment? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — info + map placeholder */}
          <div>
            <div className="space-y-5 mb-8">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center
                                  border border-primary-100 shrink-0">
                    <Icon size={17} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm text-slate-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 h-52 bg-slate-100
                            flex items-center justify-center text-slate-400">
              <div className="text-center">
                <MapPin size={28} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium">Maharajgunj, Kathmandu</p>
                <p className="text-xs text-slate-400 mt-1">Embed Google Maps here</p>
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8">
            <h3 className="font-display font-semibold text-slate-800 mb-6 text-lg">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Full name</label>
                  <input className="input bg-white" placeholder="Ram Sharma"
                    value={form.name} onChange={set('name')} required />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input className="input bg-white" placeholder="+977..."
                    value={form.phone} onChange={set('phone')} />
                </div>
              </div>
              <div>
                <label className="label">Email address</label>
                <input type="email" className="input bg-white" placeholder="you@example.com"
                  value={form.email} onChange={set('email')} required />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea className="input bg-white resize-none" rows={4}
                  placeholder="How can we help you?"
                  value={form.message} onChange={set('message')} required />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full py-3">
                {sending
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}