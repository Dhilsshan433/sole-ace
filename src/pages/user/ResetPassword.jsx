import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ pass: '', confirm: '' })

  const submit = (e) => {
    e.preventDefault()
    navigate('/reset/success')
  }

  return (
    <AuthCard title="Set a new password" subtitle="Choose a strong password you have not used before.">
      <form onSubmit={submit} className="space-y-4">
        <Input label="New password" type="password" placeholder="Enter new password" required
          value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })} />
        <Input label="Confirm password" type="password" placeholder="Re-enter password" required
          value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
        <Button type="submit" full>Reset password</Button>
      </form>
    </AuthCard>
  )
}