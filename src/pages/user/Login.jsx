import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      setUser(res.data.user)
      navigate('/login/success')
    } catch (err) {
      navigate('/login/failed')
    } finally {
      setLoading(false)
    }
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
        <Button type="submit" full disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</Button>
      </form>
      <p className="text-center text-sm text-muted">
        New to SOLE ACE? <Link to="/signup" className="font-semibold text-accent">Sign up</Link>
      </p>
    </AuthCard>
  )
}