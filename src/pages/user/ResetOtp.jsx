import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'
import OtpInput from '../../components/OtpInput'
import Button from '../../components/Button'
import api from '../../api/axios'

export default function ResetOtp() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const verify = async () => {
    setError('')
    try {
      await api.post('/auth/verify-reset-otp', { email: state?.email, code })
      navigate('/reset/password', { state: { email: state?.email, code } })
    } catch (err) {
      setError(err.response?.data?.message || 'The code was incorrect or has expired')
    }
  }

  return (
    <AuthCard title="Enter reset code" subtitle={`We sent a 6-digit code to ${state?.email || 'your email'}.`}>
      <OtpInput onChange={setCode} />
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      <Button full onClick={verify} disabled={code.length < 6}>Verify code</Button>
    </AuthCard>
  )
}