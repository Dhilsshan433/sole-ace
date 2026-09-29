import { useState } from 'react'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

const reviews = [
  { id: 1, product: 'Air Runner 90', rating: 5, text: 'Very comfortable from day one. Great cushioning and the fit is spot on.', date: '12 Sep 2026' },
  { id: 2, product: 'Street Low', rating: 4, text: 'Looks clean and light. Runs slightly narrow, so size up if unsure.', date: '30 Aug 2026' },
]

export default function Reviews() {
  const [edit, setEdit] = useState(null)
  const [del, setDel] = useState(null)
  return (
    <>
      <h1 className="text-3xl font-bold">My reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="flex gap-4 rounded-2xl border border-stone-line bg-white p-5">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-stone-soft" />
            <div className="flex-1">
              <p className="font-semibold">{r.product}</p>
              <p className="text-accent">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
              <p className="text-sm text-muted">{r.text}</p>
              <p className="mt-1 text-xs text-muted">{r.date}</p>
            </div>
            <div className="space-y-2 text-sm font-semibold">
              <button className="block text-accent" onClick={() => setEdit(r)}>Edit</button>
              <button className="block text-red-500" onClick={() => setDel(r)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={!!edit} onClose={() => setEdit(null)} title="Edit review">
        <p className="text-sm font-medium">{edit?.product}</p>
        <p className="text-2xl text-accent">★★★★★</p>
        <Input label="Your review" defaultValue={edit?.text} />
        <Button full className="mt-2" onClick={() => setEdit(null)}>Update review</Button>
      </Modal>
      <Modal open={!!del} onClose={() => setDel(null)} title="Delete review?">
        <p className="text-sm text-muted">This review will be removed permanently. This action cannot be undone.</p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" full onClick={() => setDel(null)}>Cancel</Button>
          <Button full onClick={() => setDel(null)}>Delete</Button>
        </div>
      </Modal>
    </>
  )
}