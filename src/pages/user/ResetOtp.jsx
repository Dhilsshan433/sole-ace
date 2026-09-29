import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'
import OtpInput from '../../components/OtpInput'
import Button from '../../components/Button'

export default function ResetOtp() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [code, setCode] = useState('')

  return (
    <AuthCard title="Enter reset code" subtitle={`We sent a 6-digit code to ${state?.email || 'your email'}.`}>
      <OtpInput onChange={setCode} />
      <Button full onClick={() => navigate('/reset/password')}>Verify code</Button>
    </AuthCard>
  )
}