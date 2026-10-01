import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import api from '../../api/axios'
import { useToast } from '../../context/ToastContext'

const positions = ['Home top', 'Home middle', 'Deals page']
const emptyForm = { title: '', image: '', position: 'Home top', linkUrl: '' }

export default function Banners() {
  const { showToast } = useToast()
  const [banners, setBanners] = useState([])
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const load = () => api.get('/banners').then((res) => setBanners(res.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(emptyForm); setModal('add') }
  const openEdit = (b) => { setForm({ title: b.title, image: b.image, position: b.position, linkUrl: b.linkUrl || '' }); setModal(b) }

  const save = async () => {
    try {
      if (modal === 'add') await api.post('/banners', form)
      else await api.put(`/banners/${modal._id}`, form)
      showToast(modal === 'add' ? 'Banner added successfully' : 'Changes saved')
      setModal(null)
      load()
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not save banner', 'error')
    }
  }

  const confirmDelete = async () => {
    try {
      await api.delete(`/banners/${deleteTarget._id}`)
      showToast('Banner deleted')
      setDeleteTarget(null)
      load()
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not delete banner', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Banners</h1>
        <Button onClick={openAdd}>Add new banner</Button>
      </div>

      {loading && <p className="text-muted">Loading…</p>}

      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Banner</th><th className="p-4">Position</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
            </thead>
            <tbody>
              {banners.map((b) => (
                <tr key={b._id} className="border-t border-stone-line">
                  <td className="flex items-center gap-3 p-4 font-medium">
                    <img src={b.image} className="h-8 w-14 rounded-md bg-stone-soft object-cover" />
                    {b.title}
                  </td>
                  <td className="p-4 text-muted">{b.position}</td>
                  <td className="p-4">
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${b.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-soft text-muted'}`}>
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
              {banners.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted">No banners yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add banner' : 'Edit banner'}>
        <Input label="Title" placeholder="e.g. New season" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input label="Image URL" placeholder="https://…" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Position</span>
          <select className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm outline-none focus:border-ink"
            value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
            {positions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <Input label="Link URL (optional)" placeholder="/deals" value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} />
        <Button full className="mt-2" onClick={save}>{modal === 'add' ? 'Add banner' : 'Save changes'}</Button>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete banner?">
        <p className="text-sm text-muted">{deleteTarget?.title} will be removed from the {deleteTarget?.position?.toLowerCase()} immediately.</p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" full onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button full onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}