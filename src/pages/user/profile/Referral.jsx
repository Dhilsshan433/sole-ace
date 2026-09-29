import Button from '../../../components/Button'

export default function Referral() {
  return (
    <>
      <h1 className="text-3xl font-bold">Referral program</h1>
      <div className="space-y-4 rounded-3xl bg-ink p-8 text-white">
        <h2 className="text-3xl font-bold">Refer a friend, earn ₹250</h2>
        <p className="text-white/60">They get ₹250 off their first order. You get ₹250 in your wallet.</p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl bg-white/10 px-5 py-3 font-semibold">ACE-ALEX50</div>
          <Button onClick={() => navigator.clipboard.writeText('ACE-ALEX50')}>Copy code</Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[['Invited', '5'], ['Joined', '3'], ['Earned', '₹750']].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-stone-line bg-white p-5">
            <p className="text-sm text-muted">{l}</p><p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>
    </>
  )
}