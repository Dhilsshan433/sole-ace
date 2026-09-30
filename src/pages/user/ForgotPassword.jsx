import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../api/axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/forgot-password', { email })
      navigate('/reset/otp', { state: { email } })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <AuthCard title="Forgot your password?" subtitle="Enter your email and we'll send you a code to reset it.">
      <form onSubmit={submit} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" full>Send code</Button>
      </form>
      <p className="text-center text-sm text-muted">
        Remembered it? <Link to="/login" className="font-semibold text-accent">Back to login</Link>
      </p>
    </AuthCard>
  )
}