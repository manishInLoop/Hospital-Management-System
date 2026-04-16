import { appointmentAPI } from '@/api'
import { Badge, Empty, PageHeader, Spinner } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { CalendarDays, Clock, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DoctorDashboard() {
  const { user }              = useAuth()
  const [appts, setAppts]     = useState([])
  const [loading, setLoading] = useState(true)
  const today                 = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const doctorId = user?.userId
    if (!doctorId) { setLoading(false); return }
    appointmentAPI.getDoctorSchedule(doctorId, today)
      .then(r => setAppts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={`${greeting}, Doctor`}
        subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-3xl font-display font-bold text-slate-800">{appts.length}</p>
          <p className="text-sm text-slate-500 mt-1">Today's appointments</p>
        </div>
        <div className="card p-5">
          <p className="text-3xl font-display font-bold text-amber-600">{appts.filter(a => a.status === 'PENDING').length}</p>
          <p className="text-sm text-slate-500 mt-1">Pending</p>
        </div>
        <div className="card p-5">
          <p className="text-3xl font-display font-bold text-green-600">{appts.filter(a => a.status === 'CONFIRMED').length}</p>
          <p className="text-sm text-slate-500 mt-1">Confirmed</p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <CalendarDays size={18} className="text-primary-500" /> Today's Schedule
        </h2>
        {loading ? <Spinner /> : appts.length === 0 ? <Empty message="No appointments today" /> : (
          <div className="space-y-3">
            {appts.map(a => (
              <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="w-16 text-center shrink-0">
                  <Clock size={13} className="text-slate-400 mx-auto mb-0.5" />
                  <p className="text-sm font-semibold text-slate-700">{a.timeSlot?.slice(0, 5)}</p>
                </div>
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                  <UserRound size={15} className="text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800">{a.patientName}</p>
                  <p className="text-xs text-slate-500 truncate">{a.reasonForVisit}</p>
                </div>
                <Badge status={a.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}