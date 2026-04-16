import { adminAPI } from '@/api'
import { Empty, Modal, PageHeader, Spinner } from '@/components/ui'
import { Plus, Stethoscope, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SPECIALIZATIONS = [
  'GENERAL_PRACTICE','CARDIOLOGY','NEUROLOGY','ORTHOPEDICS',
  'PEDIATRICS','DERMATOLOGY','PSYCHIATRY','ONCOLOGY','RADIOLOGY','SURGERY'
]

const emptyForm = {
  firstName:'', lastName:'', email:'', password:'',
  phone:'', specialization:'', licenseNumber:'', experienceYears:'', department:''
}

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState(false)
  const [form, setForm]       = useState(emptyForm)
  const [saving, setSaving]   = useState(false)

  const load = () => {
    setLoading(true)
    adminAPI.getDoctors()
      .then(r => setDoctors(r.data))
      .catch(() => toast.error('Failed to load doctors'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await adminAPI.registerDoctor({ ...form, experienceYears: Number(form.experienceYears) })
      toast.success('Doctor registered successfully!')
      setModal(false)
      setForm(emptyForm)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to register doctor')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Deactivate Dr. ${name}?`)) return
    try {
      await adminAPI.deleteDoctor(id)
      toast.success('Doctor deactivated')
      load()
    } catch { toast.error('Failed to deactivate') }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Doctors"
        subtitle="Manage hospital doctors"
        action={
          <button onClick={() => setModal(true)} className="btn-primary">
            <Plus size={16} /> Add Doctor
          </button>
        }
      />

      {loading ? <Spinner /> : doctors.length === 0 ? <Empty message="No doctors found" /> : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Doctor','Specialization','License','Department','Experience','Status',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {doctors.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Stethoscope size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Dr. {doc.firstName} {doc.lastName}</p>
                          <p className="text-xs text-slate-400">{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{doc.specialization?.replace('_',' ')}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{doc.licenseNumber}</td>
                    <td className="px-4 py-3 text-slate-500">{doc.department || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{doc.experienceYears ? `${doc.experienceYears} yrs` : '—'}</td>
                    <td className="px-4 py-3">
                      <span className={doc.active ? 'badge-confirmed' : 'badge-cancelled'}>
                        {doc.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(doc.id, `${doc.firstName} ${doc.lastName}`)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Register New Doctor">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">First name</label><input className="input" value={form.firstName} onChange={set('firstName')} required /></div>
            <div><label className="label">Last name</label><input className="input" value={form.lastName} onChange={set('lastName')} required /></div>
          </div>
          <div><label className="label">Email</label><input type="email" className="input" value={form.email} onChange={set('email')} required /></div>
          <div><label className="label">Password</label><input type="password" className="input" value={form.password} onChange={set('password')} required minLength={8} /></div>
          <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={set('phone')} /></div>
          <div>
            <label className="label">Specialization</label>
            <select className="input" value={form.specialization} onChange={set('specialization')} required>
              <option value="">Select specialization</option>
              {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">License number</label><input className="input" value={form.licenseNumber} onChange={set('licenseNumber')} required /></div>
            <div><label className="label">Experience (yrs)</label><input type="number" min="0" className="input" value={form.experienceYears} onChange={set('experienceYears')} /></div>
          </div>
          <div><label className="label">Department</label><input className="input" value={form.department} onChange={set('department')} /></div>
          <button type="submit" disabled={saving} className="btn-primary w-full mt-2">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Register Doctor'}
          </button>
        </form>
      </Modal>
    </div>
  )
}