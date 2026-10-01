import { CheckCircle2, XCircle } from 'lucide-react'

export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${t.type === 'error' ? 'bg-red-500' : 'bg-ink'}`}
        >
          {t.type === 'error' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
          {t.message}
        </div>
      ))}
    </div>
  )
}