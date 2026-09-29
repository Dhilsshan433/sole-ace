import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { useCart } from '../../context/CartContext'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <div className="h-20 w-20 rounded-full bg-stone-soft" />
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted">Looks like you have not added any shoes yet.</p>
        <Link to="/shop"><Button>Start shopping</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Your shopping cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.productId + i.size} className="flex items-center gap-4 rounded-2xl border border-stone-line p-4">
              <img src={i.image} alt={i.name} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{i.name}</p>
                <p className="text-sm text-muted">Size {i.size}</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-stone-line px-3 py-2">
                <button onClick={() => updateQty(i.productId, i.size, i.qty - 1)}>−</button>
                <span>{i.qty}</span>
                <button onClick={() => updateQty(i.productId, i.size, i.qty + 1)}>+</button>
              </div>
              <span className="font-semibold">₹{(i.price * i.qty).toLocaleString('en-IN')}</span>
              <button onClick={() => removeItem(i.productId, i.size)} className="text-sm font-medium text-red-500">Remove</button>
            </div>
          ))}
        </div>
        <div className="h-fit space-y-4 rounded-2xl border border-stone-line p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted">Shipping</span><span>Free</span></div>
          <div className="border-t border-stone-line pt-3 flex justify-between font-semibold"><span>Total</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          <Button full onClick={() => navigate('/checkout')}>Proceed to checkout</Button>
        </div>
      </div>
    </div>
  )
}