import { useRef, useState } from 'react'

export default function OtpInput({ length = 6, onChange }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const refs = useRef([])

  const update = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...values]; next[i] = val; setValues(next)
    onChange?.(next.join(''))
    if (val && i < length - 1) refs.current[i + 1]?.focus()
  }
  const onKeyDown = (i, e) => { if (e.key === 'Backspace' && !values[i] && i > 0) refs.current[i - 1]?.focus() }

  return (
    <div className="flex justify-center gap-3">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={v}
          onChange={(e) => update(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          maxLength={1}
          inputMode="numeric"
          className="h-14 w-12 rounded-xl border border-stone-line text-center text-lg font-semibold outline-none focus:border-ink"
        />
      ))}
    </div>
  )
}