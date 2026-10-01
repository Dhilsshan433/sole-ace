import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import api from '../../api/axios'

export default function AdminTicketDetails() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [reply, setReply] = useState('')

  const load = () => api.get(`/support/${id}`).then((res) => setTicket(res.data))
  useEffect(() => { load() }, [id])

  const sendReply = async () => {
    if (!reply.trim()) return
    await api.post(`/support/${id}/reply`, { text: reply })
    setReply('')
    load()
  }
  const resolve = async () => {
    await api.patch(`/support/${id}/resolve`)
    load()
  }

  if (!ticket) return <p className="text-muted">Loading…</p>

  return (
    <div className="space-y-6">
      <Link to="/admin/support" className="text-sm font-semibold text-accent">← Support</Link>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ticket #{ticket._id.slice(-6).toUpperCase()}</h1>
        {ticket.status === 'Open' && <Button variant="outline" onClick={resolve}>Mark resolved</Button>}
      </div>
      <div className="space-y-4 rounded-2xl border border-stone-line bg-white p-6">
        <p className="font-semibold">{ticket.user?.name} · {ticket.user?.email}</p>
        <p className="text-sm text-muted">Subject: {ticket.subject}</p>
        <div className="space-y-3 border-t border-stone-line pt-4">
          {ticket.messages.map((m, i) => (
            <div key={i} className={`max-w-md rounded-xl p-3 text-sm ${m.from === 'admin' ? 'ml-auto bg-ink text-white' : 'bg-stone-soft'}`}>
              <p className="mb-1 text-xs opacity-70">{m.from === 'admin' ? 'You' : ticket.user?.name}</p>
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-stone-line pt-4">
          <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply…"
            className="flex-1 rounded-xl border border-stone-line px-4 py-3 text-sm outline-none focus:border-ink" />
          <Button onClick={sendReply}>Send reply</Button>
        </div>
      </div>
    </div>
  )
}