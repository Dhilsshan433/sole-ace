import { Link, useParams } from 'react-router-dom'
import Button from '../../../components/Button'

export default function OrderDetails() {
  const { id } = useParams()
  return (
    <>
      <Link to="/profile/orders" className="text-sm font-semibold text-accent">← My orders</Link>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order #{id}</h1>
        <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Shipped</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-stone-line bg-white p-5">
            <h2 className="mb-3 font-semibold">Items</h2>
            {[['Air Runner 90', 'Size 9 · Black · Qty 1', '₹5,999'], ['Street Low', 'Size 8 · White · Qty 1', '₹4,299']].map(([n, m, p]) => (
              <div key={n} className="flex items-center gap-3 border-b border-stone-line py-3 last:border-0">
                <div className="h-14 w-14 rounded-lg bg-stone-soft" />
                <div className="flex-1"><p className="text-sm font-semibold">{n}</p><p className="text-xs text-muted">{m}</p></div>
                <span className="text-sm font-semibold">{p}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-stone-line bg-white p-5">
            <h2 className="mb-1 font-semibold">Delivery address</h2>
            <p className="text-sm text-muted">Alex Morgan, 12 Lake View Road, Tiruvalla, Kerala 689101</p>
          </div>
        </div>
        <div className="h-fit space-y-3 rounded-2xl border border-stone-line bg-white p-5">
          <h2 className="font-semibold">Order summary</h2>
          <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span>₹10,298</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted">Discount</span><span>−₹500</span></div>
          <div className="flex justify-between border-t border-stone-line pt-2 font-semibold"><span>Total</span><span>₹9,798</span></div>
          <Link to="/order/tracking"><Button full>Track order</Button></Link>
          <Button full variant="outline">Cancel order</Button>
          <Button full variant="outline">Return items</Button>
        </div>
      </div>
    </>
  )
}