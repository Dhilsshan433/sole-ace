import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import api from '../../../api/axios'

const colors = { Processing: 'bg-amber-100 text-amber-700', Shipped: 'bg-blue-100 text-blue-700', Delivered: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700' }

export default function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => { api.get(`/orders/${id}`).then((res) => setOrder(res.data)) }, [id])

  const cancelOrder = async () => {
    const res = await api.patch(`/orders/${id}/cancel`)
    setOrder(res.data)
  }

  if (!order) return <p className="text-muted">Loading…</p>
  const canCancel = order.status === 'Processing'

  return (
    <>
      <Link to="/profile/orders" className="text-sm font-semibold text-accent">← My orders</Link>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order #{order._id.slice(-8).toUpperCase()}</h1>
        <span className={`rounded-md px-3 py-1 text-xs font-semibold ${colors[order.status]}`}>{order.status}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
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
            <h2 className="mb-1 font-semibold">Delivery address</h2>
            <p className="text-sm text-muted">{order.address?.fullName}, {order.address?.line1}, {order.address?.city}, {order.address?.state} {order.address?.pincode}</p>
          </div>
        </div>
        <div className="h-fit space-y-3 rounded-2xl border border-stone-line bg-white p-5">
          <h2 className="font-semibold">Order summary</h2>
          <div className="flex justify-between border-t border-stone-line pt-2 font-semibold"><span>Total</span><span>₹{order.total.toLocaleString('en-IN')}</span></div>
          <Link to="/order/tracking"><Button full>Track order</Button></Link>
          {canCancel && <Button full variant="outline" onClick={cancelOrder}>Cancel order</Button>}
        </div>
      </div>
    </>
  )
}