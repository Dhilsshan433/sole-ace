import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import api from '../../api/axios'

const emptyForm = { name: '', discountPercent: '', category: '', startsAt: '', endsAt: '' }

export default function Offers() {
  const [offers, setOffers] = useState([])
  const [categories, setCategories] = useState([])
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const load = () => api.get('/offers').then((res) => setOffers(res.data)).finally(() => setLoading(false))
  useEffect(() => {
    load()
    api.get('/categories').then((res) => setCategories(res.data))
  }, [])

  const openAdd = () => { setForm(emptyForm); setModal('add') }
  const openEdit = (o) => {
    setForm({
      name: o.name, discountPercent: o.discountPercent, category: o.category?._id || '',
      startsAt: o.startsAt ? o.startsAt.slice(0, 10) : '', endsAt: o.endsAt ? o.endsAt.slice(0, 10) : '',
    })
    setModal(o)
  }

  const save = async () => {
    const payload = {
      name: form.name,
      discountPercent: Number(form.discountPercent),
      category: form.category || undefined,
      startsAt: form.startsAt || undefined,
      endsAt: form.endsAt || undefined,
    }
    try {
      if (modal === 'add') await api.post('/offers', payload)
      else await api.put(`/offers/${modal._id}`, payload)
      setModal(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not save offer')
    }
  }

  const confirmDelete = async () => {
    await api.delete(`/offers/${deleteTarget._id}`)
    setDeleteTarget(null)
    load()
  }

  const statusOf = (o) => {
    const now = new Date()
    if (o.startsAt && new Date(o.startsAt) > now) return { text: 'Scheduled', color: 'bg-amber-100 text-amber-700' }
    if (o.endsAt && new Date(o.endsAt) < now) return { text: 'Ended', color: 'bg-stone-soft text-muted' }
    return { text: 'Active', color: 'bg-green-100 text-green-700' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Offers</h1>
        <Button onClick={openAdd}>Add new offer</Button>
      </div>

      {loading && <p className="text-muted">Loading…</p>}

      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Offer</th><th className="p-4">Discount</th><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
            </thead>
            <tbody>
              {offers.map((o) => {
                const s = statusOf(o)
                return (
                  <tr key={o._id} className="border-t border-stone-line">
                    <td className="p-4 font-medium">{o.name}</td>
                    <td className="p-4">{o.discountPercent}% off</td>
                    <td className="p-4 text-muted">{o.category?.name || 'All'}</td>
                    <td className="p-4"><span className={`rounded-md px-2 py-1 text-xs font-semibold ${s.color}`}>{s.text}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => openEdit(o)}>Edit</Button>
                        <Button variant="dark" onClick={() => setDeleteTarget(o)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {offers.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted">No offers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add new offer' : 'Edit offer'}>
        <Input label="Offer name" placeholder="e.g. Festive Sale" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Discount %" placeholder="e.g. 25" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: e.target.value })} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Category</span>
          <select className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm outline-none focus:border-ink"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">All categories</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Starts on" type="date" value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} />
          <Input label="Ends on" type="date" value={form.endsAt} onChange={(e) => setForm({ ...form, endsAt: e.target.value })} />
        </div>
        <Button full className="mt-2" onClick={save}>{modal === 'add' ? 'Create offer' : 'Save changes'}</Button>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete offer?">
        <p className="text-sm text-muted">{deleteTarget?.name} will be removed and no longer shown to customers.</p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" full onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button full onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}