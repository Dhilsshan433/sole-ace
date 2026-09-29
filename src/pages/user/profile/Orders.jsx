import { Link } from 'react-router-dom'
import Button from '../../../components/Button'

const orders = [
  { id: 'SA-102394', date: '28 Sep 2026', items: '2 items', total: '₹9,798', status: 'Shipped', color: 'bg-blue-100 text-blue-700' },
  { id: 'SA-101877', date: '14 Sep 2026', items: '1 item', total: '₹5,499', status: 'Delivered', color: 'bg-green-100 text-green-700' },
  { id: 'SA-100965', date: '11 Aug 2026', items: '2 items', total: '₹8,298', status: 'Cancelled', color: 'bg-red-100 text-red-700' },
]

export default function Orders() {
  return (
    <>
      <h1 className="text-3xl font-bold">My orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-stone-line bg-white p-5">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-stone-soft" />
            <div className="flex-1 min-w-[160px]">
              <p className="font-semibold">#{o.id}</p>
              <p className="text-sm text-muted">{o.date} · {o.items}</p>
            </div>
            <span className="font-semibold">{o.total}</span>
            <span className={`rounded-md px-2 py-1 text-xs font-semibold ${o.color}`}>{o.status}</span>
            <Link to={`/profile/orders/${o.id}`}><Button variant="outline">View details</Button></Link>
          </div>
        ))}
      </div>
    </>
  )
}