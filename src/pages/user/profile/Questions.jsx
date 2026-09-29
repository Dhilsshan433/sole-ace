const qa = [
  { product: 'Air Runner 90', q: 'Does it fit true to size?', a: 'Yes, it fits true to size. If you have wide feet, go up half a size.', status: 'Answered' },
  { product: 'Oxford Classic', q: 'Is a shoe bag included?', a: 'Waiting for the seller to answer.', status: 'Pending' },
]

export default function Questions() {
  return (
    <>
      <h1 className="text-3xl font-bold">Questions & answers</h1>
      <div className="space-y-4">
        {qa.map((item, i) => (
          <div key={i} className="rounded-2xl border border-stone-line bg-white p-5">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs text-muted">{item.product}</p>
              <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${item.status === 'Answered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{item.status}</span>
            </div>
            <p className="font-semibold">Q: {item.q}</p>
            <p className="text-sm text-muted">A: {item.a}</p>
          </div>
        ))}
      </div>
    </>
  )
}