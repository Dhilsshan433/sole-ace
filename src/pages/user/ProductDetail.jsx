import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Button from '../../components/Button'
import ProductCard from '../../components/ProductCard'
import { useProduct } from '../../hooks/useProduct'
import { useCart } from '../../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, related, loading } = useProduct(id)
  const { addItem } = useCart()
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)

  if (loading) return <p>Loading…</p>
  if (!product) return <p>Product not found.</p>

  const sizes = [...new Set(product.variants.map((v) => v.size))].sort((a, b) => a - b)
  const activeSize = size ?? sizes[0]

  const handleAdd = () => {
    addItem({ id: product._id, name: product.name, price: product.price, image: product.images[0] }, activeSize, qty)
    navigate('/cart')
  }

  return (
    <div className="space-y-12">
      <p className="text-sm text-muted">Home / Shop / {product.category?.name} / {product.name}</p>
      <div className="grid gap-14 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-stone-soft">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-5">
          <p className="text-sm text-muted">{product.brand?.name}</p>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-sm">★ {product.rating} · {product.reviewCount} reviews</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
            {product.oldPrice && <span className="text-muted line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>}
          </div>
          <p className="text-muted">{product.description}</p>

          <div>
            <p className="mb-2 text-sm font-semibold">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c) => <span key={c} className="h-7 w-7 rounded-full border border-stone-line" style={{ background: c }} />)}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium ${activeSize === s ? 'bg-ink text-white' : 'border border-stone-line'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 rounded-xl border border-stone-line px-4 py-3">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <Button full onClick={handleAdd}>Add to cart</Button>
            <Button variant="outline"><Heart size={18} /></Button>
          </div>

          <div className="rounded-xl bg-stone-soft p-4 text-sm">
            <p className="font-semibold">Free delivery in 3–5 days</p>
            <p className="text-muted">7-day easy returns · Cash on delivery available</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-5 text-2xl font-bold">You may also like</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}