import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Dashboard() {
  const [stats, setStats] = useState({ orders: 0, users: 0, revenue: 0 })

  useEffect(() => {
    Promise.all([api.get('/orders'), api.get('/users')]).then(([ordersRes, usersRes]) => {
      const orders = ordersRes.data
      const revenue = orders.reduce((sum, o) => sum + o.total, 0)
      setStats({ orders: orders.length, users: usersRes.data.length, revenue })
    })
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5">
        <div className="rounded-2xl border border-stone-line bg-white p-5">
          <p className="text-sm text-muted">Revenue</p>
          <p className="text-3xl font-bold">₹{stats.revenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="rounded-2xl border border-stone-line bg-white p-5">
          <p className="text-sm text-muted">Orders</p>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>
        <div className="rounded-2xl border border-stone-line bg-white p-5">
          <p className="text-sm text-muted">Customers</p>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
      </div>
    </div>
  )
}