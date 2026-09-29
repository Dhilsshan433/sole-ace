import StatusCard from '../../components/StatusCard'
export default function SomethingWrong() {
  return <div className="flex justify-center py-20"><StatusCard title="Something went wrong" subtitle="We hit an unexpected problem. Please try again in a moment." primary={{ label: 'Try again', to: '/' }} secondary={{ label: 'Go to home', to: '/' }} /></div>
}