import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../../components/Button'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [payment, setPayment] = useState('upi')
  const [placing, setPlacing] = useState(false)

  const defaultAddress = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0]

  const placeOrder = async () => {
    if (!defaultAddress) return
    setPlacing(true)
    try {
      const payload = {
        items: items.map((i) => ({
          product: i.productId,
          name: i.name,
          image: i.image,
          price: i.price,
          size: i.size,
          qty: i.qty,
        })),
        address: {
          fullName: defaultAddress.fullName,
          phone: defaultAddress.phone,
          line1: defaultAddress.line1,
          city: defaultAddress.city,
          state: defaultAddress.state,
          pincode: defaultAddress.pincode,
        },
        paymentMethod: payment,
      }
      await api.post('/orders', payload)
      clearCart()
      navigate('/order/success')
    } catch (err) {
      navigate('/order/failed')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-stone-line p-6">
            <h2 className="mb-3 font-semibold">1. Delivery address</h2>
            {defaultAddress ? (
              <label className="flex items-start gap-3 rounded-xl border border-accent bg-orange-50 p-4">
                <input type="radio" checked readOnly className="mt-1" />
                <span>
                  <b>{defaultAddress.fullName} · {defaultAddress.label}</b>
                  <br />
                  <span className="text-sm text-muted">
                    {defaultAddress.line1}, {defaultAddress.city}, {defaultAddress.state} {defaultAddress.pincode}
                  </span>
                </span>
              </label>
            ) : (
              <p className="text-sm text-muted">No saved address yet — add one to continue.</p>
            )}
            <Button variant="outline" className="mt-3" onClick={() => navigate('/profile/addresses')}>
              {defaultAddress ? 'Add new address' : 'Add an address'}
            </Button>
          </section>

          <section className="rounded-2xl border border-stone-line p-6">
            <h2 className="mb-3 font-semibold">2. Payment method</h2>
            {[
              ['upi', 'UPI', 'Pay with any UPI app'],
              ['card', 'Credit / Debit card', 'Visa, Mastercard, RuPay'],
              ['cod', 'Cash on delivery', 'Pay when it arrives'],
            ].map(([val, label, sub]) => (
              <label
                key={val}
                className={`mb-2 flex items-start gap-3 rounded-xl border p-4 ${payment === val ? 'border-accent bg-orange-50' : 'border-stone-line'}`}
              >
                <input type="radio" checked={payment === val} onChange={() => setPayment(val)} className="mt-1" />
                <span>
                  <b>{label}</b>
                  <br />
                  <span className="text-sm text-muted">{sub}</span>
                </span>
              </label>
            ))}
          </section>
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-stone-line p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Subtotal ({items.length} items)</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between border-t border-stone-line pt-3 font-semibold">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <Button full onClick={placeOrder} disabled={placing || items.length === 0 || !defaultAddress}>
            {placing ? 'Placing order…' : 'Place order'}
          </Button>
        </div>
      </div>
    </div>
  )
}