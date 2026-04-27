import { useAuth } from '@/context/AuthContext'
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Stethoscope } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await login(form.email, form.password)
      toast.success('Welcome back!')
      if (data.role === 'ROLE_ADMIN')        navigate('/admin/dashboard')
      else if (data.role === 'ROLE_DOCTOR')  navigate('/doctor/dashboard')
      else                                   navigate('/patient/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen from-violet-600 via-white-600 to-primary-700 flex items-center justify-center px-4 relative overflow-hidden">
  
  {/* Background blobs */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
  </div>

  <div className="w-full max-w-md relative animate-fade-in">

    {/* Back link */}
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-violet-600/70 hover:text-violet-600 text-sm mb-6 transition-colors"
    >
      <ArrowLeft size={16} />
      Back to home
    </Link>

    {/* Card */}
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-700 px-8 py-8 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Stethoscope size={32} />
        </div>
        <h1 className="text-2xl font-bold">HMS Portal</h1>
        <p className="text-primary-200 text-sm mt-1">
          Hospital Management System
        </p>
      </div>

      {/* Form */}
      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="label" htmlFor="email">
              Email address
            </label>
           <div className="relative">
  <Mail
    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
    size={16}
  />
  <input
    id="email"
    type="email"
    className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="you@hospital.com"
    value={form.email}
    onChange={(e) =>
      setForm((f) => ({ ...f, email: e.target.value }))
    }
    required
  />
</div>
          </div>

          {/* Password */}
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

              <input
                id="password"
                type={showPw ? "text" : "password"}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />

              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2 flex items-center justify-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          New patient?{" "}
          <Link
            to="/register"
            className="text-primary-600 font-medium hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>
  )
}