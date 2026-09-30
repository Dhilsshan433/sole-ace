import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import api from '../../api/axios'

const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled']
const colors = { Processing: 'bg-amber-100 text-amber-700', Shipped: 'bg-blue-100 text-blue-700', Delivered: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700' }

export default function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => { setOrder(res.data); setStatus(res.data.status) })
  }, [id])

  const saveStatus = async () => {
    setSaving(true)
    try {
      const res = await api.patch(`/orders/${id}/status`, { status })
      setOrder(res.data)
    } finally {
      setSaving(false)
    }
  }

  if (!order) return <p className="text-muted">Loading…</p>

  return (
    <div className="space-y-6">
      <Link to="/admin/orders" className="text-sm font-semibold text-accent">← Orders</Link>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order #{order._id.slice(-8).toUpperCase()}</h1>
        <span className={`rounded-md px-3 py-1 text-xs font-semibold ${colors[order.status]}`}>{order.status}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-stone-line bg-white p-5">
            <h2 className="mb-3 font-semibold">Items</h2>
            {order.items.map((i, idx) => (
              <div key={idx} className="flex items-center gap-3 border-b border-stone-line py-3 last:border-0">
                <img src={i.image} className="h-14 w-14 rounded-lg bg-stone-soft object-cover" />
                <div className="flex-1"><p className="text-sm font-semibold">{i.name}</p><p className="text-xs text-muted">Size {i.size} · Qty {i.qty}</p></div>
                <span className="text-sm font-semibold">₹{(i.price * i.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-stone-line bg-white p-5">
            <h2 className="mb-1 font-semibold">Customer</h2>
            <p className="text-sm text-muted">{order.address?.fullName} · {order.address?.phone}</p>
            <p className="text-sm text-muted">{order.address?.line1}, {order.address?.city}, {order.address?.state} {order.address?.pincode}</p>
          </div>
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-stone-line bg-white p-5">
          <h2 className="font-semibold">Update status</h2>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold ${status === s ? 'bg-ink text-white' : 'border border-stone-line'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="border-t border-stone-line pt-3 text-sm text-muted">
            Payment: {order.paymentMethod?.toUpperCase()} · {order.paymentStatus}
          </div>
          <div className="flex justify-between font-semibold"><span>Total</span><span>₹{order.total.toLocaleString('en-IN')}</span></div>
          <Button full onClick={saveStatus} disabled={saving || status === order.status}>
            {saving ? 'Saving…' : 'Save status'}
          </Button>
        </div>
      </div>
    </div>
  )
}