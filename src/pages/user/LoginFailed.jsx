import StatusCard from '../../components/StatusCard'

export default function LoginFailed() {
  return (
    <StatusCard title="Login failed" subtitle="Incorrect email or password. Please check and try again."
      primary={{ label: 'Try again', to: '/login' }}
      secondary={{ label: 'Reset password', to: '/forgot-password' }} />
  )
}