export default function Spinner({ size = 24, className = '' }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-stone-line border-t-ink ${className}`}
      style={{ width: size, height: size }}
    />
  )
}