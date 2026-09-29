import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    navigate('/reset/otp', { state: { email } })
  }

  return (
    <AuthCard title="Forgot your password?" subtitle="Enter your email and we'll send you a code to reset it.">
      <form onSubmit={submit} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" full>Send code</Button>
      </form>
      <p className="text-center text-sm text-muted">
        Remembered it? <Link to="/login" className="font-semibold text-accent">Back to login</Link>
      </p>
    </AuthCard>
  )
}