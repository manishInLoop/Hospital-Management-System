import { appointmentAPI } from '@/api'
import { Badge, PageHeader, Spinner } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { CalendarDays, Clock, Plus, RefreshCw, Stethoscope } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PatientDashboard() {
  const { user }              = useAuth()
  const navigate              = useNavigate()
  const [appts, setAppts]     = useState([])
  const [loading, setLoading] = useState(true)
  const [followUpModal, setFollowUpModal] = useState(null)

  useEffect(() => {
    const patientId = user?.userId
    if (!patientId) { setLoading(false); return }
    appointmentAPI.getPatientAppts(patientId)
      .then(r => setAppts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  const statusCounts = {
    total:     appts.length,
    upcoming:  appts.filter(a => new Date(a.appointmentDate) >= new Date() && a.status !== 'CANCELLED').length,
    pending:   appts.filter(a => a.status === 'PENDING').length,
    completed: appts.filter(a => a.status === 'COMPLETED').length,
  }

  const handleFollowUp = (appointment) => {
    // Navigate to booking page with pre-filled doctor
    navigate('/patient/book', {
      state: {
        followUp: true,
        doctorId: appointment.doctorId,
        doctorName: appointment.doctorName,
        reason: `Follow-up appointment - Previous visit: ${new Date(appointment.appointmentDate).toLocaleDateString()}`
      }
    })
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="My Appointments" subtitle="Track and manage your hospital appointments"
        action={
          <button onClick={() => navigate('/patient/book')} className="btn-primary">
            <Plus size={16} /> Book Appointment
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total',     value: statusCounts.total,     color: 'bg-slate-100 text-slate-700' },
          { label: 'Upcoming',  value: statusCounts.upcoming,  color: 'bg-blue-100 text-blue-700' },
          { label: 'Pending',   value: statusCounts.pending,   color: 'bg-amber-100 text-amber-700' },
          { label: 'Completed', value: statusCounts.completed, color: 'bg-green-100 text-green-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`card p-4 ${color}`}>
            <p className="text-2xl font-display font-bold">{value}</p>
            <p className="text-xs font-medium opacity-75 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {loading ? <Spinner /> : appts.length === 0 ? (
        <div className="card p-12 text-center">
          <CalendarDays size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No appointments yet</p>
          <p className="text-slate-400 text-sm mb-4">Book your first appointment with a doctor</p>
          <button onClick={() => navigate('/patient/book')} className="btn-primary mx-auto">
            <Plus size={16} /> Book Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {appts.map((a, i) => (
            <div key={a.id} className="card p-5 flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="shrink-0 w-14 text-center bg-primary-50 rounded-xl p-2.5 border border-primary-100">
                <p className="text-xs text-primary-500 font-medium">{new Date(a.appointmentDate).toLocaleDateString('en-US', { month: 'short' })}</p>
                <p className="text-xl font-bold text-primary-700 leading-tight">{new Date(a.appointmentDate).getDate()}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Stethoscope size={13} className="text-slate-400" />
                      <p className="font-semibold text-slate-800">Dr. {a.doctorName}</p>
                    </div>
                    <p className="text-xs text-slate-400">{a.doctorSpecialization?.replace(/_/g, ' ')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge status={a.status} />
                    {a.status === 'COMPLETED' && (
                      <button
                        onClick={() => handleFollowUp(a)}
                        className="btn-secondary text-xs px-3 py-1 flex items-center gap-1"
                        title="Schedule follow-up"
                      >
                        <RefreshCw size={12} />
                        Follow-up
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-1 mt-1">{a.reasonForVisit}</p>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400">
                  <Clock size={11} /> {a.timeSlot?.slice(0, 5)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}