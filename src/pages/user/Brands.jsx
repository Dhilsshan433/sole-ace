const brands = [
  { name: 'Nimbus', desc: 'Running and everyday sneakers', count: '42 products' },
  { name: 'Stride', desc: 'Street style and casual wear', count: '36 products' },
  { name: 'Oak & Co', desc: 'Formal shoes and boots', count: '28 products' },
]

export default function Brands() {
  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-ink p-12 text-center text-white">
        <p className="text-xs font-semibold text-accent">OUR BRANDS</p>
        <h1 className="mt-2 text-4xl font-bold">Shoes from brands you trust</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {brands.map((b) => (
          <div key={b.name} className="rounded-2xl border border-stone-line bg-white p-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-stone-soft text-xl font-bold">{b.name[0]}</div>
            <h2 className="text-lg font-semibold">{b.name}</h2>
            <p className="text-sm text-muted">{b.desc}</p>
            <p className="mt-1 text-xs font-semibold text-accent">{b.count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}