import ProductCard from '../../components/ProductCard'
import { products } from '../../data/products'

export default function Deals() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-ink p-12 text-center text-white">
        <p className="text-xs font-semibold text-accent">LIMITED TIME</p>
        <h1 className="mt-2 text-4xl font-bold">Exclusive deals & offers</h1>
        <p className="mt-2 text-white/60">Up to 40% off on selected sneakers, running shoes and boots.</p>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {products.filter((p) => p.oldPrice).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}