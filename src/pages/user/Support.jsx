import { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

const faqs = ['How do I track my order?', 'What is your return policy?', 'How long does a refund take?', 'Do you offer cash on delivery?']

export default function Support() {
  const { user } = useAuth()
  const [form, setForm] = useState({ subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!user) { setError('Please log in to contact support.'); return }
    try {
      await api.post('/support', form)
      setSent(true)
      setForm({ subject: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send your message. Please try again.')
    }
  }

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
              <span className="text-sm font-medium">{q}</span>
              <span className="text-muted">+</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-stone-line bg-white p-6">
          {sent ? (
            <div className="space-y-3 text-center">
              <h2 className="text-lg font-semibold">Message sent</h2>
              <p className="text-sm text-muted">We'll get back to you soon. You can check replies in your account's support history.</p>
              <Button full variant="outline" onClick={() => setSent(false)}>Send another message</Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={submit}>
              <h2 className="text-lg font-semibold">Contact us</h2>
              <Input
                label="Subject"
                placeholder="What do you need help with?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <Input
                label="Message"
                placeholder="How can we help?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button full type="submit">Send message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}