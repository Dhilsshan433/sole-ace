import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: call POST /api/auth/signup, then navigate on success
    navigate('/signup/otp', { state: { email: form.email } })
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
        <Button type="submit" full>Create account</Button>
      </form>
      <p className="text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="font-semibold text-accent">Log in</Link>
      </p>
    </AuthCard>
  )
}