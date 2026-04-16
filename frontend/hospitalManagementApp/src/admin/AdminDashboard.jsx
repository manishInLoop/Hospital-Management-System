import { adminAPI } from '@/api'
import { PageHeader, Spinner, StatCard } from '@/components/ui'
import { CalendarDays, CheckCircle2, Clock, Stethoscope, UserCheck, Users, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminAPI.getStats()
      .then(r => setStats(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your hospital system"
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Doctors"   value={stats?.totalDoctors}   icon={Stethoscope}  color="blue"   sub={`${stats?.activeDoctors} active`} />
        <StatCard label="Total Patients"  value={stats?.totalPatients}  icon={Users}        color="purple" sub={`${stats?.activePatients} active`} />
        <StatCard label="Total Appointments" value={stats?.totalAppointments} icon={CalendarDays} color="teal" />
        <StatCard label="Pending"         value={stats?.pendingAppointments} icon={Clock}    color="amber" />
      </div>

      {/* Appointment breakdown */}
      <div className="card p-6">
        <h2 className="font-display font-semibold text-slate-700 mb-5">Appointment Status Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
            <CheckCircle2 size={20} className="text-green-600" />
            <div>
              <p className="text-xl font-bold text-green-700">{stats?.confirmedAppointments}</p>
              <p className="text-xs text-green-600">Confirmed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
            <XCircle size={20} className="text-red-600" />
            <div>
              <p className="text-xl font-bold text-red-700">{stats?.cancelledAppointments}</p>
              <p className="text-xs text-red-600">Cancelled</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <UserCheck size={20} className="text-blue-600" />
            <div>
              <p className="text-xl font-bold text-blue-700">{stats?.completedAppointments}</p>
              <p className="text-xs text-blue-600">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}