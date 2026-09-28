const styles = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  dark: 'bg-ink text-white hover:bg-black/80',
  outline: 'border border-stone-line text-ink hover:bg-stone-soft',
  ghost: 'text-ink hover:bg-stone-soft',
}

export default function Button({ variant = 'primary', full, className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${full ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}