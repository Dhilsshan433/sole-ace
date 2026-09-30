import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import api from '../../../api/axios'

const colors = { Processing: 'bg-amber-100 text-amber-700', Shipped: 'bg-blue-100 text-blue-700', Delivered: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700' }

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.get('/orders/mine').then((res) => setOrders(res.data)).finally(() => setLoading(false)) }, [])

  return (
    <>
      <h1 className="text-3xl font-bold">My orders</h1>
      {loading && <p className="text-muted">Loading…</p>}
      {!loading && orders.length === 0 && <p className="text-muted">You haven't placed any orders yet.</p>}
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-stone-line bg-white p-5">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-stone-soft" />
            <div className="flex-1 min-w-[160px]">
              <p className="font-semibold">#{o._id.slice(-8).toUpperCase()}</p>
              <p className="text-sm text-muted">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} · {o.items.length} item{o.items.length > 1 ? 's' : ''}</p>
            </div>
            <span className="font-semibold">₹{o.total.toLocaleString('en-IN')}</span>
            <span className={`rounded-md px-2 py-1 text-xs font-semibold ${colors[o.status]}`}>{o.status}</span>
            <Link to={`/profile/orders/${o._id}`}><Button variant="outline">View details</Button></Link>
          </div>
        ))}
      </div>
    </>
  )
}