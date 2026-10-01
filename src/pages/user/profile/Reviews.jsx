import { useEffect, useState } from 'react'
import ReviewModal from '../../../components/ReviewModal'
import api from '../../../api/axios'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)
  const [del, setDel] = useState(null)

  const load = () => api.get('/reviews/mine').then((res) => setReviews(res.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const saveEdit = async ({ rating, text }) => {
    await api.put(`/reviews/${edit._id}`, { rating, text })
    setEdit(null)
    load()
  }

  const confirmDelete = async () => {
    await api.delete(`/reviews/${del._id}`)
    setDel(null)
    load()
  }

  const statusColor = { Pending: 'text-amber-600', Approved: 'text-green-600', Flagged: 'text-red-500' }

  return (
    <>
      <h1 className="text-3xl font-bold">My reviews</h1>
      {loading && <p className="text-muted">Loading…</p>}
      {!loading && reviews.length === 0 && (
        <p className="text-muted">You haven't written any reviews yet. You can review a product from its order details page once it's delivered.</p>
      )}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r._id} className="flex gap-4 rounded-2xl border border-stone-line bg-white p-5">
            <img src={r.product?.images?.[0]} className="h-16 w-16 shrink-0 rounded-xl bg-stone-soft object-cover" />
            <div className="flex-1">
              <p className="font-semibold">{r.product?.name}</p>
              <p className="text-accent">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
              <p className="text-sm text-muted">{r.text}</p>
              <p className={`mt-1 text-xs font-medium ${statusColor[r.status]}`}>{r.status}</p>
            </div>
            <div className="space-y-2 text-sm font-semibold">
              <button className="block text-accent" onClick={() => setEdit(r)}>Edit</button>
              <button className="block text-red-500" onClick={() => setDel(r)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ReviewModal
        open={!!edit}
        onClose={() => setEdit(null)}
        title="Edit review"
        initial={edit}
        onSubmit={saveEdit}
      />

      {del && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setDel(null)}>
          <div className="w-full max-w-md rounded-3xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold">Delete review?</h3>
            <p className="mt-2 text-sm text-muted">This review will be removed permanently. This action cannot be undone.</p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => setDel(null)} className="flex-1 rounded-xl border border-stone-line py-3 text-sm font-semibold">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 rounded-xl bg-accent py-3 text-sm font-semibold text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}