import StatusCard from '../../components/StatusCard'

export default function OrderSuccess() {
  return (
    <div className="flex justify-center py-16">
      <StatusCard ok title="Order placed successfully"
        subtitle="Order #SA-102394 is confirmed. We sent the details to your email."
        primary={{ label: 'View order', to: '/order/summary' }}
        secondary={{ label: 'Continue shopping', to: '/' }} />
    </div>
  )
}