import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { productId, name, price, image, size, qty }

  const addItem = (product, size, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.size === size)
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, image: product.image, size, qty }]
    })
  }

  const updateQty = (productId, size, qty) => {
    setItems((prev) => prev.map((i) => (i.productId === productId && i.size === size ? { ...i, qty: Math.max(1, qty) } : i)))
  }

  const removeItem = (productId, size) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }

  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)