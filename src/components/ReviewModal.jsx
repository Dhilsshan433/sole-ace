import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'

export default function ReviewModal({ open, onClose, initial, onSubmit, title }) {
  const [rating, setRating] = useState(initial?.rating || 5)
  const [text, setText] = useState(initial?.text || '')

  const submit = () => {
    onSubmit({ rating, text })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex gap-1 text-3xl">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setRating(n)} className={n <= rating ? 'text-accent' : 'text-stone-line'}>
            ★
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your experience with this product…"
        rows={4}
        className="w-full rounded-xl border border-stone-line px-4 py-3 text-sm outline-none focus:border-ink"
      />
      <Button full className="mt-2" onClick={submit} disabled={!text.trim()}>Submit review</Button>
    </Modal>
  )
}