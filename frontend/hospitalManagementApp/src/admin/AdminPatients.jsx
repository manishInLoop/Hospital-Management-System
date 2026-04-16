import { adminAPI } from '@/api'
import { Empty, PageHeader, Spinner } from '@/components/ui'
import { Trash2, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminPatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading]   = useState(true)

  const load = () => {
    setLoading(true)
    adminAPI.getPatients()
      .then(r => setPatients(r.data))
      .catch(() => toast.error('Failed to load patients'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id, name) => {
    if (!confirm(`Deactivate patient ${name}?`)) return
    try {
      await adminAPI.deletePatient(id)
      toast.success('Patient deactivated')
      load()
    } catch { toast.error('Failed to deactivate') }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Patients" subtitle="Manage registered patients" />

      {loading ? <Spinner /> : patients.length === 0 ? <Empty message="No patients found" /> : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Patient','Contact','Date of Birth','Blood Group','Status',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                          <UserRound size={14} className="text-violet-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{p.firstName} {p.lastName}</p>
                          <p className="text-xs text-slate-400">{p.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{p.phone || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{p.dateOfBirth || '—'}</td>
                    <td className="px-4 py-3">
                      {p.bloodGroup
                        ? <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">{p.bloodGroup}</span>
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={p.active ? 'badge-confirmed' : 'badge-cancelled'}>
                        {p.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(p.id, `${p.firstName} ${p.lastName}`)}
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
    </div>
  )
}