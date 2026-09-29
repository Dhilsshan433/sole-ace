const steps = ['Order placed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered']

export default function OrderTracking() {
  const current = 2 // TODO: comes from the order's real status
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Track order #SA-102394</h1>
      <div className="max-w-md space-y-6 rounded-2xl border border-stone-line p-6">
        {steps.map((s, i) => (
          <div key={s} className="flex gap-4">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${i <= current ? 'bg-accent' : 'bg-stone-soft text-muted'}`}>{i <= current ? '✓' : ''}</div>
            <p className={i <= current ? 'font-semibold' : 'text-muted'}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}