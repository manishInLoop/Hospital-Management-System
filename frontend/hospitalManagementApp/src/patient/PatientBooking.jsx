import { appointmentAPI, doctorAPI } from '@/api'
import { PageHeader, Spinner } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { CalendarDays, CheckCircle2, Clock, Stethoscope } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const TIME_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00'
]

export default function PatientBooking() {
  const { user }              = useAuth()
  const navigate              = useNavigate()
  const location              = useLocation()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ doctorId: '', appointmentDate: '', timeSlot: '', reasonForVisit: '' })

  // Check if this is a follow-up appointment
  const isFollowUp = location.state?.followUp
  const followUpData = location.state

  useEffect(() => {
    doctorAPI.getAll()
      .then(r => setDoctors(r.data))
      .catch(() => toast.error('Failed to load doctors'))
      .finally(() => setLoading(false))

    // Pre-fill form for follow-up appointments
    if (isFollowUp && followUpData) {
      setForm({
        doctorId: followUpData.doctorId?.toString() || '',
        appointmentDate: '',
        timeSlot: '',
        reasonForVisit: followUpData.reason || ''
      })
    }
  }, [isFollowUp, followUpData])

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))
  const selectedDoctor = doctors.find(d => d.id === Number(form.doctorId))

  // patientId comes from the JWT response stored in user.userId
  const patientId = user?.userId

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!patientId) return toast.error('Session expired. Please login again.')
    if (!form.timeSlot) return toast.error('Please select a time slot.')
    setSaving(true)
    try {
      await appointmentAPI.book({
        doctorId:        Number(form.doctorId),
        patientId:       patientId,
        appointmentDate: form.appointmentDate,
        timeSlot:        form.timeSlot + ':00',
        reasonForVisit:  form.reasonForVisit,
      })
      setSuccess(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'This slot is already taken. Please choose another.')
    } finally {
      setSaving(false)
    }
  }

  if (success) return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
        <CheckCircle2 size={40} className="text-green-500" />
      </div>
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-2">
        {isFollowUp ? 'Follow-up Appointment Booked!' : 'Appointment Booked!'}
      </h2>
      <p className="text-slate-500 mb-1">Your appointment has been submitted successfully.</p>
      <p className="text-slate-400 text-sm mb-6">The doctor's office will confirm shortly.</p>
      <div className="card p-5 text-left w-full max-w-sm mb-6">
        <p className="text-sm text-slate-500 mb-1">Doctor</p>
        <p className="font-semibold text-slate-800 mb-3">Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}</p>
        <p className="text-sm text-slate-500 mb-1">Date & Time</p>
        <p className="font-semibold text-slate-800">{form.appointmentDate} at {form.timeSlot}</p>
        {isFollowUp && (
          <p className="text-xs text-blue-600 mt-2 font-medium">Follow-up appointment</p>
        )}
      </div>
      <div className="flex gap-3">
        <button onClick={() => navigate('/patient/dashboard')} className="btn-primary">View My Appointments</button>
        <button onClick={() => { setSuccess(false); setForm({ doctorId:'', appointmentDate:'', timeSlot:'', reasonForVisit:'' }) }}
          className="btn-secondary">Book Another</button>
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in max-w-2xl">
      <PageHeader
        title={isFollowUp ? "Schedule Follow-up" : "Book Appointment"}
        subtitle={isFollowUp ? "Schedule a follow-up appointment with your doctor" : "Choose a doctor and schedule your visit"}
      />
      {loading ? <Spinner /> : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="card p-6">
            <h3 className="font-display font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Select a Doctor
            </h3>
            {isFollowUp && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Follow-up with your previous doctor</p>
              </div>
            )}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {doctors.map(doc => (
                <label key={doc.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150
                    ${form.doctorId == doc.id ? 'border-primary-500 bg-primary-50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name="doctor" value={doc.id}
                    checked={form.doctorId == doc.id} onChange={set('doctorId')} className="sr-only" required />
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Stethoscope size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">Dr. {doc.firstName} {doc.lastName}</p>
                    <p className="text-xs text-slate-500">{doc.specialization?.replace(/_/g,' ')}{doc.department ? ` · ${doc.department}` : ''}</p>
                  </div>
                  {doc.experienceYears && <span className="text-xs text-slate-400">{doc.experienceYears} yrs</span>}
                </label>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-display font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              Choose Date & Time
            </h3>
            <div className="mb-4">
              <label className="label flex items-center gap-1.5"><CalendarDays size={13} /> Appointment date</label>
              <input type="date" className="input" value={form.appointmentDate}
                min={new Date().toISOString().split('T')[0]} onChange={set('appointmentDate')} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Clock size={13} /> Available time slots</label>
              <div className="grid grid-cols-5 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button key={slot} type="button" onClick={() => setForm(f => ({ ...f, timeSlot: slot }))}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all
                      ${form.timeSlot === slot ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-display font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              Reason for Visit
            </h3>
            <textarea className="input resize-none" rows={3}
              placeholder="Describe your symptoms or reason for the visit..."
              value={form.reasonForVisit} onChange={set('reasonForVisit')} required maxLength={500} />
            <p className="text-xs text-slate-400 mt-1 text-right">{form.reasonForVisit.length}/500</p>
          </div>

          <button type="submit" disabled={saving || !form.timeSlot} className="btn-primary w-full py-3 text-base">
            {saving ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (isFollowUp ? 'Schedule Follow-up' : 'Confirm Booking')}
          </button>
        </form>
      )}
    </div>
  )
}