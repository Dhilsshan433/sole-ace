import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'

export default function ProductCard({ product }) {
  const { _id, name, brand, price, oldPrice, rating, images } = product
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-soft">
        <Link to={`/product/${_id}`}>
          <img src={images?.[0]} alt={name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        </Link>
        <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:text-accent"><Heart size={16} /></button>
      </div>
      <div className="mt-3">
        <p className="text-xs text-muted">{brand?.name}</p>
        <Link to={`/product/${_id}`} className="font-semibold hover:text-accent">{name}</Link>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">₹{price.toLocaleString('en-IN')}</span>
            {oldPrice && <span className="text-xs text-muted line-through">₹{oldPrice.toLocaleString('en-IN')}</span>}
          </div>
          <span className="flex items-center gap-1 text-xs"><Star size={12} className="fill-accent text-accent" />{rating}</span>
        </div>
      </div>
    </div>
  )
}