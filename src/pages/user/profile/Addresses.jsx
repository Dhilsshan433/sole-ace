import { useState } from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'

const initial = [
  { id: 1, label: 'Home', tag: 'Default', lines: ['12 Lake View Road, Tiruvalla', 'Kerala 689101 · +91 98765 43210'] },
  { id: 2, label: 'Office', tag: null, lines: ['4th Floor, Tech Park, Kochi', 'Kerala 682030 · +91 98765 43210'] },
]

export default function Addresses() {
  const [addresses, setAddresses] = useState(initial)
  const [modal, setModal] = useState(null) // 'add' | address object

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Addresses</h1>
        <Button onClick={() => setModal('add')}>Add new address</Button>
      </div>
      <div className="space-y-4">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-2xl border border-stone-line bg-white p-5">
            <div className="mb-1 flex items-center gap-2">
              <p className="font-semibold">{a.label}</p>
              {a.tag && <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">{a.tag}</span>}
            </div>
            {a.lines.map((l) => <p key={l} className="text-sm text-muted">{l}</p>)}
            <div className="mt-2 flex gap-4 text-sm font-semibold">
              <button className="text-accent" onClick={() => setModal(a)}>Edit</button>
              <button className="text-red-500" onClick={() => setAddresses((prev) => prev.filter((x) => x.id !== a.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add address' : 'Edit address'}>
        <Input label="Full name" placeholder="Your name" defaultValue={modal?.label ? 'Alex Morgan' : ''} />
        <Input label="Phone" placeholder="+91" />
        <Input label="Address" placeholder="House no, street, area" />
        <div className="grid grid-cols-2 gap-3"><Input label="City" placeholder="City" /><Input label="PIN code" placeholder="000000" /></div>
        <Input label="State" placeholder="State" />
        <Button full className="mt-2" onClick={() => setModal(null)}>{modal === 'add' ? 'Save address' : 'Update address'}</Button>
      </Modal>
    </>
  )
}