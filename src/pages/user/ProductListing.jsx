import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { useProducts } from '../../hooks/useProducts'

const categories = ['Sneakers', 'Running', 'Formal', 'Sandals', 'Boots']
const brands = ['Nimbus', 'Stride', 'Oak & Co']

export default function ProductListing() {
  const [params] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || '')
  const [brand, setBrand] = useState('')
  const { products, loading } = useProducts({ category, brand })

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">Home / Shop</p>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">All shoes</h1>
        <span className="text-sm text-muted">{products.length} products</span>
      </div>
      <div className="flex flex-col gap-10 md:flex-row">
        <aside className="w-full shrink-0 space-y-7 md:w-56">
          <div>
            <h3 className="mb-3 font-semibold">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" checked={category === ''} onChange={() => setCategory('')} /> All</label>
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="radio" checked={category === c} onChange={() => setCategory(c)} /> {c}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Brand</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" checked={brand === ''} onChange={() => setBrand('')} /> All</label>
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input type="radio" checked={brand === b} onChange={() => setBrand(b)} /> {b}
                </label>
              ))}
            </div>
          </div>
        </aside>
        <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3">
          {loading && <p className="col-span-full text-muted">Loading…</p>}
          {!loading && products.map((p) => <ProductCard key={p._id} product={p} />)}
          {!loading && products.length === 0 && <p className="col-span-full text-muted">No products match these filters.</p>}
        </div>
      </div>
    </div>
  )
}