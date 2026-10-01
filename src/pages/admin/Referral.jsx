import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Referral() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.get('/users').then((res) => setUsers(res.data)).finally(() => setLoading(false)) }, [])

  const referrers = users.filter((u) => u.walletBalance > 0)
  const totalPaid = users.reduce((sum, u) => sum + (u.walletBalance || 0), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Referral program</h1>
      <div className="grid grid-cols-3 gap-5">
        <div className="rounded-2xl border border-stone-line bg-white p-5">
          <p className="text-sm text-muted">Customers</p>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="rounded-2xl border border-stone-line bg-white p-5">
          <p className="text-sm text-muted">With wallet balance</p>
          <p className="text-3xl font-bold">{referrers.length}</p>
        </div>
        <div className="rounded-2xl border border-stone-line bg-white p-5">
          <p className="text-sm text-muted">Total in wallets</p>
          <p className="text-3xl font-bold">₹{totalPaid.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {loading && <p className="text-muted">Loading…</p>}
      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Customer</th><th className="p-4">Referral code</th><th className="p-4">Wallet balance</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-stone-line">
                  <td className="p-4 font-medium">{u.name}<br /><span className="text-xs text-muted">{u.email}</span></td>
                  <td className="p-4 text-muted">{u.referralCode || '—'}</td>
                  <td className="p-4">₹{(u.walletBalance || 0).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}