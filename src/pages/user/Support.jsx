import { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'

const faqs = ['How do I track my order?', 'What is your return policy?', 'How long does a refund take?', 'Do you offer cash on delivery?']

export default function Support() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-ink p-12 text-center text-white">
        <p className="text-xs font-semibold text-accent">SUPPORT</p>
        <h1 className="mt-2 text-4xl font-bold">How can we help?</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Frequently asked questions</h2>
          {faqs.map((q) => (
            <div key={q} className="flex items-center justify-between rounded-xl border border-stone-line bg-white p-4">
              <span className="text-sm font-medium">{q}</span><span className="text-muted">+</span>
            </div>
          ))}
        </div>
        <form className="space-y-4 rounded-2xl border border-stone-line bg-white p-6" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-lg font-semibold">Contact us</h2>
          <Input label="Name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Message" placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <Button full type="submit">Send message</Button>
        </form>
      </div>
    </div>
  )
}