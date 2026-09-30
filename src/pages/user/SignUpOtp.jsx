import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'
import OtpInput from '../../components/OtpInput'
import Button from '../../components/Button'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

export default function SignUpOtp() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const verify = async () => {
    setError(''); setLoading(true)
    try {
      const res = await api.post('/auth/verify-signup', { email: state?.email, code })
      setUser(res.data.user)
      navigate('/signup/success')
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed')
      navigate('/signup/failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Verify your email" subtitle={`We sent a 6-digit code to ${state?.email || 'your email'}.`}>
      <OtpInput onChange={setCode} />
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      <Button full onClick={verify} disabled={loading || code.length < 6}>{loading ? 'Verifying…' : 'Verify'}</Button>
      <p className="text-center text-sm text-muted">
        Didn't get the code? <button className="font-semibold text-accent">Resend</button>
      </p>
    </AuthCard>
  )
}