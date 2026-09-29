import ProductCard from '../../../components/ProductCard'
import Button from '../../../components/Button'
import { useCart } from '../../../context/CartContext'
import { products } from '../../../data/products'

export default function Wishlist() {
  const { addItem } = useCart()
  const wishlisted = products.slice(0, 4)
  return (
    <>
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {wishlisted.map((p) => (
          <div key={p.id} className="space-y-2">
            <ProductCard product={p} />
            <Button variant="outline" full onClick={() => addItem(p, p.sizes[0], 1)}>Move to cart</Button>
          </div>
        ))}
      </div>
    </>
  )
}