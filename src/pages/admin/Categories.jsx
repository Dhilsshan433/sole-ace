import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import api from '../../api/axios'
import { useToast } from '../../context/ToastContext'

export default function Categories() {
  const { showToast } = useToast()
  const [categories, setCategories] = useState([])
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => api.get('/categories').then((res) => setCategories(res.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openAdd = () => { setName(''); setModal('add') }
  const openEdit = (c) => { setName(c.name); setModal(c) }

  const save = async () => {
    try {
      if (modal === 'add') await api.post('/categories', { name })
      else await api.put(`/categories/${modal._id}`, { name })
      showToast(modal === 'add' ? 'Category added successfully' : 'Changes saved')
      setModal(null)
      load()
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not save category', 'error')
    }
  }

  const confirmDelete = async () => {
    try {
      await api.delete(`/categories/${deleteTarget._id}`)
      showToast('Category deleted')
      setDeleteTarget(null)
      load()
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not delete category', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={openAdd}>Add category</Button>
      </div>

      {loading && <p className="text-muted">Loading…</p>}

      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id} className="border-t border-stone-line">
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4">
                    <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      {c.isActive ? 'Active' : 'Hidden'}
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
              {categories.length === 0 && (
                <tr><td colSpan={3} className="p-6 text-center text-muted">No categories yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add category' : 'Edit category'}>
        <Input label="Category name" placeholder="e.g. Sandals" value={name} onChange={(e) => setName(e.target.value)} />
        <Button full className="mt-2" onClick={save}>{modal === 'add' ? 'Add category' : 'Save changes'}</Button>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete category?">
        <p className="text-sm text-muted">Products in "{deleteTarget?.name}" will be unassigned from this category.</p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" full onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button full onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}