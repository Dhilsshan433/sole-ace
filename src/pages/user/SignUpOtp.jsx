import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'
import OtpInput from '../../components/OtpInput'
import Button from '../../components/Button'

export default function SignUpOtp() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [code, setCode] = useState('')

  const verify = () => {
    // TODO: call POST /api/auth/verify-signup { email: state?.email, code }
    const ok = code.length === 6 // placeholder check
    navigate(ok ? '/signup/success' : '/signup/failed')
  }

  return (
    <AuthCard title="Verify your email" subtitle={`We sent a 6-digit code to ${state?.email || 'your email'}.`}>
      <OtpInput onChange={setCode} />
      <Button full onClick={verify}>Verify</Button>
      <p className="text-center text-sm text-muted">
        Didn't get the code? <button className="font-semibold text-accent">Resend</button>
      </p>
    </AuthCard>
  )
}