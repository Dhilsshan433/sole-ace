import StatusCard from '../../components/StatusCard'

export default function OrderFailed() {
  return (
    <div className="flex justify-center py-16">
      <StatusCard title="Payment failed"
        subtitle="We could not process your payment. No money was deducted from your account."
        primary={{ label: 'Retry payment', to: '/checkout' }}
        secondary={{ label: 'Back to cart', to: '/cart' }} />
    </div>
  )
}