import { authAPI } from '@/api'
import { ArrowLeft, Eye, EyeOff, Stethoscope } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate    = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    phone: '', dateOfBirth: '', bloodGroup: '',
    emergencyContactName: '', emergencyContactPhone: ''
  })

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authAPI.register(form)
      toast.success('Account created! Please sign in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-violet-800 to-violet-700 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-lg animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-violet-700 px-8 py-6 text-white text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Stethoscope size={24} />
            </div>
            <h1 className="font-display text-xl font-bold">Patient Registration</h1>
            <p className="text-violet-200 text-sm mt-1">Create your free HMS account</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">First name</label><input className="input" placeholder="Ram" value={form.firstName} onChange={set('firstName')} required /></div>
                <div><label className="label">Last name</label><input className="input" placeholder="Sharma" value={form.lastName} onChange={set('lastName')} required /></div>
              </div>
              <div><label className="label">Email address</label><input type="email" className="input" placeholder="ram@example.com" value={form.email} onChange={set('email')} required /></div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} className="input pr-10" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} required minLength={8} />
                  <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Phone</label><input className="input" placeholder="+977..." value={form.phone} onChange={set('phone')} /></div>
                <div><label className="label">Date of birth</label><input type="date" className="input" value={form.dateOfBirth} onChange={set('dateOfBirth')} /></div>
              </div>
              <div>
                <label className="label">Blood group</label>
                <select className="input" value={form.bloodGroup} onChange={set('bloodGroup')}>
                  <option value="">Select blood group</option>
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Emergency contact</label><input className="input" placeholder="Contact name" value={form.emergencyContactName} onChange={set('emergencyContactName')} /></div>
                <div><label className="label">Emergency phone</label><input className="input" placeholder="+977..." value={form.emergencyContactPhone} onChange={set('emergencyContactPhone')} /></div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full" style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
              </button>
            </form>
            <p className="text-center text-sm text-slate-500 mt-4">
              Already have an account? <Link to="/login" className="text-violet-600 font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}