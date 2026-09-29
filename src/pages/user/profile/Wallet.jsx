import { Link } from 'react-router-dom'
import Button from '../../../components/Button'

const tx = [
  ['Referral bonus', '28 Sep 2026', '+₹250', 'text-green-600'],
  ['Order #SA-101877', '14 Sep 2026', '−₹500', 'text-red-500'],
  ['Added via UPI', '02 Sep 2026', '+₹1,000', 'text-green-600'],
]

export default function Wallet() {
  return (
    <>
      <h1 className="text-3xl font-bold">My wallet</h1>
      <div className="space-y-2 rounded-3xl bg-ink p-8 text-white">
        <p className="text-sm text-white/60">Available balance</p>
        <p className="text-5xl font-bold">₹1,250</p>
        <Link to="/profile/wallet/add"><Button>Add money</Button></Link>
      </div>
      <div className="rounded-2xl border border-stone-line bg-white p-5">
        <h2 className="mb-3 font-semibold">Recent transactions</h2>
        {tx.map(([label, date, amt, color]) => (
          <div key={label} className="flex justify-between border-b border-stone-line py-3 last:border-0">
            <div><p className="text-sm font-semibold">{label}</p><p className="text-xs text-muted">{date}</p></div>
            <span className={`font-semibold ${color}`}>{amt}</span>
          </div>
        ))}
      </div>
    </>
  )
}