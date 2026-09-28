import { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import ProductCard from '../../components/ProductCard'

const demo = { id: 1, name: 'Air Runner 90', brand: 'Nimbus', price: 5999, oldPrice: 7499, rating: 4.6, image: 'https://placehold.co/600x600/F1EFEA/111111?text=Shoe' }

export default function Preview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Design system</h1>
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
      </div>
      <div className="grid max-w-md gap-4">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" error="Password is required" />
      </div>
      <div className="grid max-w-xs"><ProductCard product={demo} /></div>
      <Modal open={open} onClose={() => setOpen(false)} title="Add address">
        <Input label="Full name" placeholder="Your name" />
        <Button full className="mt-4">Save</Button>
      </Modal>
    </div>
  )
}