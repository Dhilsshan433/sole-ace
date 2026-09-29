import StatusCard from '../../components/StatusCard'

export default function SignUpFailed() {
  return (
    <StatusCard title="Verification failed"
      subtitle="The code was incorrect or has expired. Please try again."
      primary={{ label: 'Try again', to: '/signup/otp' }}
      secondary={{ label: 'Change email', to: '/signup' }} />
  )
}