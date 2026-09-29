import { useNavigate } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import Button from './Button'

export default function StatusCard({ ok, title, subtitle, primary, secondary }) {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-md rounded-3xl border border-stone-line bg-white p-10 text-center">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${ok ? 'bg-green-100' : 'bg-red-100'}`}>
        {ok ? <Check className="text-green-600" size={28} /> : <X className="text-red-500" size={28} />}
      </div>
      <h1 className="mt-5 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
      <div className="mt-6 space-y-3">
        {primary && <Button full onClick={() => navigate(primary.to)}>{primary.label}</Button>}
        {secondary && <Button full variant="outline" onClick={() => navigate(secondary.to)}>{secondary.label}</Button>}
      </div>
    </div>
  )
}