import { adminAPI, appointmentAPI } from '@/api'
import { Badge, Empty, PageHeader, Spinner } from '@/components/ui'
import { CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading]           = useState(true)
  const [updating, setUpdating]         = useState(null)

  // Load all appointments by fetching all doctors then their schedules
  // Simpler: fetch appointments per patient; for admin we load by fetching all patients
  // Best approach: get all patients → get each one's appointments
  const load = async () => {
    setLoading(true)
    try {
      const patientsRes = await adminAPI.getPatients()
      const patients    = patientsRes.data
      const allAppts    = []
      await Promise.all(
        patients.map(async (p) => {
          try {
            const r = await appointmentAPI.getPatientAppts(p.id)
            allAppts.push(...r.data)
          } catch {}
        })
      )
      // Sort by date desc
      allAppts.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
      setAppointments(allAppts)
    } catch {
      toast.error('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleStatusChange = async (id, status) => {
    setUpdating(id)
    try {
      await appointmentAPI.updateStatus(id, status)
      toast.success(`Status updated to ${status}`)
      setAppointments(prev =>
        prev.map(a => a.id === id ? { ...a, status } : a)
      )
    } catch {
      toast.error('Failed to update status')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Appointments" subtitle="Manage all hospital appointments" />

      {loading ? <Spinner /> : appointments.length === 0 ? <Empty message="No appointments found" /> : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Patient','Doctor','Date & Time','Reason','Status','Update Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {appointments.map(appt => (
                  <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{appt.patientName}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      Dr. {appt.doctorName}
                      <p className="text-xs text-slate-400">{appt.doctorSpecialization?.replace('_',' ')}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CalendarDays size={13} className="text-slate-400" />
                        {appt.appointmentDate}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{appt.timeSlot}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-500 max-w-40 truncate">{appt.reasonForVisit}</td>
                    <td className="px-4 py-3"><Badge status={appt.status} /></td>
                    <td className="px-4 py-3">
                      <select
                        value={appt.status}
                        disabled={updating === appt.id}
                        onChange={e => handleStatusChange(appt.id, e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600
                                   focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}