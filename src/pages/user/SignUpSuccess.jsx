import StatusCard from '../../components/StatusCard'

export default function SignUpSuccess() {
  return (
    <StatusCard ok title="Verification successful"
      subtitle="Your account is ready. Start exploring the latest shoes."
      primary={{ label: 'Continue shopping', to: '/' }} />
  )
}