import { useState } from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'

export default function PersonalInfo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Personal information</h1>
        <Button variant="outline" onClick={() => setOpen(true)}>Edit profile</Button>
      </div>
      <div className="space-y-6 rounded-2xl border border-stone-line bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-soft text-xl font-semibold">AM</div>
          <div><p className="text-lg font-semibold">Alex Morgan</p><p className="text-sm text-muted">Member since Jan 2026</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[['Full name', 'Alex Morgan'], ['Email', 'alex@example.com'], ['Phone', '+91 98765 43210'], ['Location', 'Tiruvalla, Kerala']].map(([l, v]) => (
            <div key={l}><p className="text-xs text-muted">{l}</p><p className="font-medium">{v}</p></div>
          ))}
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit profile">
        <Input label="Full name" defaultValue="Alex Morgan" />
        <Input label="Email" defaultValue="alex@example.com" />
        <Input label="Phone" defaultValue="+91 98765 43210" />
        <Button full className="mt-2" onClick={() => setOpen(false)}>Save changes</Button>
      </Modal>
    </>
  )
}