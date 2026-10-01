import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import api from '../../api/axios'
import { useToast } from '../../context/ToastContext'

export default function Brands() {
  const { showToast } = useToast()
  const [brands, setBrands] = useState([])
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => api.get('/brands').then((res) => setBrands(res.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openAdd = () => { setName(''); setModal('add') }
  const openEdit = (b) => { setName(b.name); setModal(b) }

  const save = async () => {
    try {
      if (modal === 'add') await api.post('/brands', { name })
      else await api.put(`/brands/${modal._id}`, { name })
      showToast(modal === 'add' ? 'Brand added successfully' : 'Changes saved')
      setModal(null)
      load()
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not save brand', 'error')
    }
  }

  const confirmDelete = async () => {
    try {
      await api.delete(`/brands/${deleteTarget._id}`)
      showToast('Brand deleted')
      setDeleteTarget(null)
      load()
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not delete brand', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Brands</h1>
        <Button onClick={openAdd}>Add brand</Button>
      </div>

      {loading && <p className="text-muted">Loading…</p>}

      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Brand</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b._id} className="border-t border-stone-line">
                  <td className="flex items-center gap-3 p-4 font-medium">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-soft text-xs font-bold">{b.name[0]}</div>
                    {b.name}
                  </td>
                  <td className="p-4">
                    <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      {b.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => openEdit(b)}>Edit</Button>
                      <Button variant="dark" onClick={() => setDeleteTarget(b)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr><td colSpan={3} className="p-6 text-center text-muted">No brands yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add brand' : 'Edit brand'}>
        <Input label="Brand name" placeholder="e.g. Trekka" value={name} onChange={(e) => setName(e.target.value)} />
        <Button full className="mt-2" onClick={save}>{modal === 'add' ? 'Add brand' : 'Save changes'}</Button>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete brand?">
        <p className="text-sm text-muted">Products under "{deleteTarget?.name}" will be unassigned from this brand.</p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" full onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button full onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}