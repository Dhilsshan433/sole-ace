import { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'
import api from '../../../api/axios'
import { useAuth } from '../../../context/AuthContext'

export default function Addresses() {
  const { user, setUser } = useAuth()
  const [addresses, setAddresses] = useState(user?.addresses || [])
  const [modal, setModal] = useState(null) // 'add' | address object
  const [form, setForm] = useState({ label: '', fullName: '', phone: '', line1: '', city: '', state: '', pincode: '' })

  useEffect(() => { setAddresses(user?.addresses || []) }, [user])

  const openEdit = (addr) => { setModal(addr); setForm(addr) }
  const openAdd = () => { setModal('add'); setForm({ label: '', fullName: '', phone: '', line1: '', city: '', state: '', pincode: '' }) }

  const save = async () => {
    const res = modal === 'add'
      ? await api.post('/users/addresses', form)
      : await api.put(`/users/addresses/${modal._id}`, form)
    setAddresses(res.data)
    setUser({ ...user, addresses: res.data })
    setModal(null)
  }

  const remove = async (id) => {
    const res = await api.delete(`/users/addresses/${id}`)
    setAddresses(res.data)
    setUser({ ...user, addresses: res.data })
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Addresses</h1>
        <Button onClick={openAdd}>Add new address</Button>
      </div>
      <div className="space-y-4">
        {addresses.length === 0 && <p className="text-muted">No addresses saved yet.</p>}
        {addresses.map((a) => (
          <div key={a._id} className="rounded-2xl border border-stone-line bg-white p-5">
            <div className="mb-1 flex items-center gap-2">
              <p className="font-semibold">{a.label}</p>
              {a.isDefault && <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Default</span>}
            </div>
            <p className="text-sm text-muted">{a.line1}</p>
            <p className="text-sm text-muted">{a.city}, {a.state} {a.pincode} · {a.phone}</p>
            <div className="mt-2 flex gap-4 text-sm font-semibold">
              <button className="text-accent" onClick={() => openEdit(a)}>Edit</button>
              <button className="text-red-500" onClick={() => remove(a._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add address' : 'Edit address'}>
        <Input label="Label" placeholder="Home / Office" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
        <Input label="Full name" placeholder="Your name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <Input label="Phone" placeholder="+91" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Address" placeholder="House no, street, area" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="City" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input label="PIN code" placeholder="000000" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
        </div>
        <Input label="State" placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        <Button full className="mt-2" onClick={save}>{modal === 'add' ? 'Save address' : 'Update address'}</Button>
      </Modal>
    </>
  )
}