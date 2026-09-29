import { Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function OrderPlaced() {
  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-stone-line p-8">
      <h1 className="text-2xl font-bold">Order #SA-102394</h1>
      <p className="text-muted">Status: Confirmed · You can cancel until it ships.</p>
      <div className="flex flex-wrap gap-3">
        <Link to="/order/tracking"><Button>Track order</Button></Link>
        <Button variant="outline">Cancel order</Button>
        <Link to="/support"><Button variant="outline">Need help</Button></Link>
      </div>
    </div>
  )
}