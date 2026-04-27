import { Mail, MessageSquare, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { inquiryAPI } from '../api'
import { Empty, PageHeader, Spinner } from '../components/ui'

const STATUS_COLORS = {
  NEW: { bg: '#fef3c7', text: '#92400e', label: 'New' },
  READ: { bg: '#dbeafe', text: '#1e40af', label: 'Read' },
  REPLIED: { bg: '#dcfce7', text: '#166534', label: 'Replied' },
}

const STATUSES = ['NEW', 'READ', 'REPLIED']

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)

  // LOAD DATA
  const load = async () => {
    setLoading(true)
    try {
      const res = await inquiryAPI.getAll()
      // Transform status from object {name: "NEW", ordinal: 0} to string "NEW"
      const transformed = res.data.map(inq => ({
        ...inq,
        status: inq.status?.name || inq.status
      }))
      setInquiries(transformed)
    } catch {
      toast.error('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // UPDATE STATUS (FIXED LIKE APPOINTMENTS)
  const handleStatusChange = async (id, status) => {
    setUpdating(id)
    try {
      await inquiryAPI.updateStatus(id, status)

      // ✅ manual UI update (IMPORTANT FIX)
      setInquiries(prev =>
        prev.map(i => i.id === id ? { ...i, status } : i)
      )

      toast.success(`Status updated to ${status}`)
    } catch (err) {
      console.error('Failed to update status:', err)
      toast.error('Failed to update status')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Inquiries"
        subtitle="Messages from contact form"
        action={
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}>
            <MessageSquare size={15} />
            {inquiries.filter(i => i.status === 'NEW').length} new
          </div>
        }
      />

      {loading ? (
        <Spinner />
      ) : inquiries.length === 0 ? (
        <Empty message="No inquiries found" />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEADER */}
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Name', 'Email', 'Phone', 'Message', 'Status', 'Update Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-slate-50">
                {inquiries.map(inq => {
                  const s = STATUS_COLORS[inq.status] || STATUS_COLORS.NEW

                  return (
                    <tr key={inq.id} className="hover:bg-slate-50 transition-colors">

                      {/* NAME */}
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {inq.name}
                      </td>

                      {/* EMAIL */}
                      <td className="px-4 py-3 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail size={13} />
                          {inq.email}
                        </div>
                      </td>

                      {/* PHONE */}
                      <td className="px-4 py-3 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Phone size={13} />
                          {inq.phone}
                        </div>
                      </td>

                      {/* MESSAGE */}
                      <td className="px-4 py-3 text-slate-500 max-w-xs truncate">
                        {inq.message}
                      </td>

                      {/* STATUS BADGE */}
                      <td className="px-4 py-3">
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {s.label}
                        </span>
                      </td>

                      {/* UPDATE STATUS */}
                      <td className="px-4 py-3">
                        <select
                          value={inq.status}
                          disabled={updating === inq.id}
                          onChange={e => handleStatusChange(inq.id, e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600
                                     focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                    </tr>
                  )
                })}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  )
}