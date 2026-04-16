import { appointmentAPI } from '@/api'
import { Badge, Empty, PageHeader, Spinner } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { CalendarDays, Clock, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DoctorSchedule() {
  const { user }              = useAuth()
  const [date, setDate]       = useState(new Date().toISOString().split('T')[0])
  const [appts, setAppts]     = useState([])
  const [loading, setLoading] = useState(false)

  const load = () => {
    const doctorId = user?.userId
    if (!doctorId) return
    setLoading(true)
    appointmentAPI.getDoctorSchedule(doctorId, date)
      .then(r => setAppts(r.data))
      .catch(() => setAppts([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [date, user])

  return (
    <div className="animate-fade-in">
      <PageHeader title="My Schedule" subtitle="View your appointment schedule by date" />

      <div className="card p-4 mb-6 flex flex-wrap items-center gap-4">
        <CalendarDays size={18} className="text-primary-500 shrink-0" />
        <div>
          <label className="text-xs font-medium text-slate-500 block mb-1">Select date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <p className="text-sm text-slate-500 ml-auto">
          {appts.length} appointment{appts.length !== 1 ? 's' : ''} on this day
        </p>
      </div>

      {loading ? <Spinner /> : appts.length === 0 ? <Empty message="No appointments on this date" /> : (
        <div className="space-y-3">
          {appts.map((a, i) => (
            <div key={a.id} className="card p-5 flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="w-20 shrink-0 text-center bg-primary-50 rounded-xl p-3 border border-primary-100">
                <Clock size={14} className="text-primary-500 mx-auto mb-1" />
                <p className="text-sm font-bold text-primary-700">{a.timeSlot?.slice(0, 5)}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <UserRound size={13} className="text-slate-400" />
                      <p className="font-semibold text-slate-800">{a.patientName}</p>
                    </div>
                    <p className="text-sm text-slate-500">{a.reasonForVisit}</p>
                  </div>
                  <Badge status={a.status} />
                </div>
                {a.notes && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">Notes</p>
                    <p className="text-sm text-slate-600">{a.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}