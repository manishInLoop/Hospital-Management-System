import { useAuth } from '@/context/AuthContext'
import {
  CalendarDays,
  Clock,
  LayoutDashboard,
  LogOut, Menu,
  Stethoscope,
  Users
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const navConfig = {
  admin: [
    { to: '/admin/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/doctors',      icon: Stethoscope,     label: 'Doctors' },
    { to: '/admin/patients',     icon: Users,           label: 'Patients' },
    { to: '/admin/appointments', icon: CalendarDays,    label: 'Appointments' },
  ],
  doctor: [
    { to: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/doctor/schedule',  icon: Clock,           label: 'My Schedule' },
  ],
  patient: [
    { to: '/patient/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/patient/book',      icon: CalendarDays,    label: 'Book Appointment' },
  ],
}

const roleColors = {
  admin:   'from-primary-700 to-primary-900',
  doctor:  'from-teal-700 to-teal-900',
  patient: 'from-violet-700 to-violet-900',
}

const roleBadge = {
  admin:   'Admin',
  doctor:  'Doctor',
  patient: 'Patient',
}

export default function Layout({ role }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const links = navConfig[role] || []

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?')
    if (!confirmed) return

    logout()
    navigate('/home')
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`flex flex-col h-full bg-gradient-to-b ${roleColors[role]} text-white`}>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Stethoscope size={20} />
          </div>
          <div>
            <p className="font-display font-semibold text-base leading-tight">HMS</p>
            <p className="text-xs text-white/50">Hospital System</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-semibold text-sm">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{roleBadge[role]}</span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
              ${isActive
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'}`
            }>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all">
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 flex-shrink-0 flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 flex flex-col"><Sidebar mobile /></div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-slate-100">
          <button onClick={() => setOpen(true)} className="text-slate-500 hover:text-slate-700">
            <Menu size={22} />
          </button>
          <span className="font-display font-semibold text-slate-800">HMS</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}