import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import api from '../../api/axios'

const emptyForm = { code: '', discountType: 'percentage', discountValue: '', minOrderValue: '', expiresAt: '' }

export default function Coupons() {
  const [coupons, setCoupons] = useState([])
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const load = () => api.get('/coupons').then((res) => setCoupons(res.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(emptyForm); setModal('add') }
  const openEdit = (c) => {
    setForm({
      code: c.code, discountType: c.discountType, discountValue: c.discountValue,
      minOrderValue: c.minOrderValue || '', expiresAt: c.expiresAt ? c.expiresAt.slice(0, 10) : '',
    })
    setModal(c)
  }

  const save = async () => {
    const payload = {
      code: form.code,
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minOrderValue: Number(form.minOrderValue) || 0,
      expiresAt: form.expiresAt || undefined,
    }
    try {
      if (modal === 'add') await api.post('/coupons', payload)
      else await api.put(`/coupons/${modal._id}`, payload)
      setModal(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not save coupon')
    }
  }

  const confirmDelete = async () => {
    await api.delete(`/coupons/${deleteTarget._id}`)
    setDeleteTarget(null)
    load()
  }

  const isExpired = (c) => c.expiresAt && new Date(c.expiresAt) < new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Coupons</h1>
        <Button onClick={openAdd}>Add coupon</Button>
      </div>

      {loading && <p className="text-muted">Loading…</p>}

      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr>
                <th className="p-4">Code</th><th className="p-4">Discount</th><th className="p-4">Used</th>
                <th className="p-4">Expires</th><th className="p-4">Status</th><th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id} className="border-t border-stone-line">
                  <td className="p-4 font-semibold">{c.code}</td>
                  <td className="p-4">{c.discountType === 'percentage' ? `${c.discountValue}% off` : `₹${c.discountValue} off`}</td>
                  <td className="p-4 text-muted">{c.usedCount}</td>
                  <td className="p-4 text-muted">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No expiry'}</td>
                  <td className="p-4">
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${isExpired(c) ? 'bg-stone-soft text-muted' : 'bg-green-100 text-green-700'}`}>
                      {isExpired(c) ? 'Expired' : 'Active'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => openEdit(c)}>Edit</Button>
                      <Button variant="dark" onClick={() => setDeleteTarget(c)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted">No coupons yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add coupon' : 'Edit coupon'}>
        <Input label="Coupon code" placeholder="e.g. SAVE20" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Discount type</span>
          <select className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm outline-none focus:border-ink"
            value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })}>
            <option value="percentage">Percentage</option>
            <option value="flat">Flat amount</option>
          </select>
        </label>
        <Input label={form.discountType === 'percentage' ? 'Discount %' : 'Discount amount (₹)'} placeholder="e.g. 20"
          value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })} />
        <Input label="Minimum order value (optional)" placeholder="₹0" value={form.minOrderValue} onChange={(e) => setForm({ ...form, minOrderValue: e.target.value })} />
        <Input label="Expiry date (optional)" type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
        <Button full className="mt-2" onClick={save}>{modal === 'add' ? 'Add coupon' : 'Save changes'}</Button>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete coupon?">
        <p className="text-sm text-muted">{deleteTarget?.code} has been used {deleteTarget?.usedCount} times. Deleting it will stop it from working immediately.</p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" full onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button full onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}