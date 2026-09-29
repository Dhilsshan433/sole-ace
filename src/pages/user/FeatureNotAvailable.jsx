import StatusCard from '../../components/StatusCard'
export default function FeatureNotAvailable() {
  return <div className="flex justify-center py-20"><StatusCard title="Feature not available" subtitle="This feature is not available yet. We are working on it and it will be here soon." primary={{ label: 'Go to home', to: '/' }} /></div>
}