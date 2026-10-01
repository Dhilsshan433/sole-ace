import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

const colors = { Open: 'bg-amber-100 text-amber-700', Resolved: 'bg-green-100 text-green-700' }

export default function Support() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.get('/support').then((res) => setTickets(res.data)).finally(() => setLoading(false)) }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support tickets</h1>
      {loading && <p className="text-muted">Loading…</p>}
      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Ticket</th><th className="p-4">Customer</th><th className="p-4">Subject</th><th className="p-4">Status</th><th className="p-4"></th></tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t._id} className="border-t border-stone-line">
                  <td className="p-4 font-medium">#{t._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-muted">{t.user?.name}<br /><span className="text-xs">{t.user?.email}</span></td>
                  <td className="p-4">{t.subject}</td>
                  <td className="p-4"><span className={`rounded-md px-2 py-1 text-xs font-semibold ${colors[t.status]}`}>{t.status}</span></td>
                  <td className="p-4"><Link to={`/admin/support/${t._id}`} className="text-sm font-semibold text-accent">View ticket</Link></td>
                </tr>
              ))}
              {tickets.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted">No tickets yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}