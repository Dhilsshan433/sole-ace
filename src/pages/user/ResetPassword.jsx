import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../api/axios'

export default function ResetPassword() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState({ pass: '', confirm: '' })
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.pass !== form.confirm) return setError('Passwords do not match')
    try {
      await api.post('/auth/reset-password', { email: state?.email, code: state?.code, newPassword: form.pass })
      navigate('/reset/success')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <AuthCard title="Set a new password" subtitle="Choose a strong password you have not used before.">
      <form onSubmit={submit} className="space-y-4">
        <Input label="New password" type="password" placeholder="Enter new password" required
          value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })} />
        <Input label="Confirm password" type="password" placeholder="Re-enter password" required
          value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" full>Reset password</Button>
      </form>
    </AuthCard>
  )
}