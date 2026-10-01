import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', form)
      if (res.data.user.role !== 'admin') { setError('This account is not an admin.'); return }
      setUser(res.data.user)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1B1B1B] p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl bg-white p-10">
        <div className="text-center text-xl font-bold">SOLE<span className="text-accent"> ACE</span></div>
        <h1 className="text-center text-2xl font-bold">Admin login</h1>
        <p className="text-center text-sm text-muted">Sign in to manage SOLE ACE.</p>
        <Input label="Email" type="email" placeholder="admin@soleace.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" full>Log in</Button>
      </form>
    </div>
  )
}