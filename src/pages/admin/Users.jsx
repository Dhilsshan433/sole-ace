import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import api from '../../api/axios'

export default function Users() {
  const [users, setUsers] = useState([])

  const load = () => api.get('/users').then((res) => setUsers(res.data))
  useEffect(() => { load() }, [])

  const toggleBlock = async (id) => {
    await api.patch(`/users/${id}/block`)
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-soft text-xs uppercase text-muted">
            <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-stone-line">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 text-muted">{u.email}</td>
                <td className="p-4">
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ${u.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {u.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-4">
                  <Button variant={u.isBlocked ? 'dark' : 'outline'} onClick={() => toggleBlock(u._id)}>
                    {u.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}