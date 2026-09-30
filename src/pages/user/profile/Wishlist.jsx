import { useEffect, useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import Button from '../../../components/Button'
import { useCart } from '../../../context/CartContext'
import api from '../../../api/axios'

export default function Wishlist() {
  const { addItem } = useCart()
  const [items, setItems] = useState([])

  useEffect(() => { api.get('/users/wishlist').then((res) => setItems(res.data)) }, [])

  const moveToCart = (p) => {
    addItem({ id: p._id, name: p.name, price: p.price, image: p.images[0] }, p.variants[0]?.size, 1)
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Wishlist</h1>
      {items.length === 0 && <p className="text-muted">Nothing in your wishlist yet.</p>}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {items.map((p) => (
          <div key={p._id} className="space-y-2">
            <ProductCard product={p} />
            <Button variant="outline" full onClick={() => moveToCart(p)}>Move to cart</Button>
          </div>
        ))}
      </div>
    </>
  )
}