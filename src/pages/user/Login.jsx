import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: call POST /api/auth/login
    const ok = true // placeholder
    navigate(ok ? '/login/success' : '/login/failed')
  }

  return (
    <AuthCard title="Welcome back" subtitle="Log in to track orders and check out faster.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" required
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" placeholder="Enter your password" required
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
          <Link to="/forgot-password" className="font-semibold text-accent">Forgot password?</Link>
        </div>
        <Button type="submit" full>Log in</Button>
      </form>
      <p className="text-center text-sm text-muted">
        New to SOLE ACE? <Link to="/signup" className="font-semibold text-accent">Sign up</Link>
      </p>
    </AuthCard>
  )
}