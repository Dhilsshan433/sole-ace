import StatusCard from '../../components/StatusCard'

export default function ResetSuccess() {
  return <StatusCard ok title="Password reset" subtitle="Your password has been updated. You can log in now." primary={{ label: 'Back to login', to: '/login' }} />
}