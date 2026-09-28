import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-paper p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-stone-soft"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}