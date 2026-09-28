export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium">{label}</span>}
      <input
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-ink ${error ? 'border-red-500' : 'border-stone-line'} ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
}