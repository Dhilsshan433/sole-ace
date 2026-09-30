import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../api/axios'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await api.post('/auth/signup', form)
      navigate('/signup/otp', { state: { email: form.email } })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Create your account" subtitle="Join SOLE ACE for faster checkout and order tracking.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Full name" placeholder="Your name" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" placeholder="you@example.com" required
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone" placeholder="+91 98765 43210" required
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Password" type="password" placeholder="Create a password" required
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" full disabled={loading}>{loading ? 'Creating account…' : 'Create account'}</Button>
      </form>
      <p className="text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="font-semibold text-accent">Log in</Link>
      </p>
    </AuthCard>
  )
}