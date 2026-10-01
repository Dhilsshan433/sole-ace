import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import api from '../../api/axios'

const colors = { Pending: 'bg-amber-100 text-amber-700', Approved: 'bg-green-100 text-green-700', Flagged: 'bg-red-100 text-red-700' }

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => api.get('/reviews').then((res) => setReviews(res.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const setStatus = async (id, status) => {
    await api.patch(`/reviews/${id}/status`, { status })
    load()
  }
  const removeReview = async (id) => {
    await api.delete(`/reviews/${id}`)
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reviews</h1>
      {loading && <p className="text-muted">Loading…</p>}
      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Product</th><th className="p-4">Rating</th><th className="p-4">Comment</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id} className="border-t border-stone-line align-top">
                  <td className="p-4 font-medium">{r.product?.name}<br /><span className="text-xs text-muted">by {r.user?.name}</span></td>
                  <td className="p-4 text-accent">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</td>
                  <td className="p-4 max-w-xs text-muted">{r.text}</td>
                  <td className="p-4"><span className={`rounded-md px-2 py-1 text-xs font-semibold ${colors[r.status]}`}>{r.status}</span></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="dark" onClick={() => setStatus(r._id, 'Approved')}>Approve</Button>
                      <Button variant="outline" onClick={() => removeReview(r._id)}>Remove</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted">No reviews yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}