import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import api from '../../api/axios'

const colors = { Processing: 'bg-amber-100 text-amber-700', Shipped: 'bg-blue-100 text-blue-700', Delivered: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700' }

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.get('/orders').then((res) => setOrders(res.data)).finally(() => setLoading(false)) }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      {loading && <p className="text-muted">Loading…</p>}
      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t border-stone-line">
                  <td className="p-4 font-medium">#{o._id.slice(-8).toUpperCase()}</td>
                  <td className="p-4 text-muted">{o.user?.name}<br /><span className="text-xs">{o.user?.email}</span></td>
                  <td className="p-4 text-muted">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td className="p-4">₹{o.total.toLocaleString('en-IN')}</td>
                  <td className="p-4"><span className={`rounded-md px-2 py-1 text-xs font-semibold ${colors[o.status]}`}>{o.status}</span></td>
                  <td className="p-4"><Link to={`/admin/orders/${o._id}`}><Button variant="outline">View details</Button></Link></td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-muted">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}