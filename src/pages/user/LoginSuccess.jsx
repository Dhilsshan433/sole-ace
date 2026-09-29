import StatusCard from '../../components/StatusCard'

export default function LoginSuccess() {
  return <StatusCard ok title="Login successful" subtitle="Welcome back! Taking you to your account." primary={{ label: 'Go to home', to: '/' }} />
}