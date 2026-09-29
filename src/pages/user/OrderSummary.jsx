import { Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function OrderSummary() {
  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-stone-line p-8 text-center">
      <h1 className="text-2xl font-bold">Thank you for your order</h1>
      <p className="text-muted">Your order is confirmed and will be delivered soon.</p>
      <Link to="/order/tracking"><Button full>Track order</Button></Link>
      <Button full variant="outline">Download invoice</Button>
    </div>
  )
}