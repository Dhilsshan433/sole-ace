import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import api from '../../api/axios'

const emptyForm = {
  name: '', brand: '', category: '', price: '', oldPrice: '', description: '',
  images: '', colors: '', variants: [{ size: '', color: '', sku: '', stock: '' }],
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [modal, setModal] = useState(null) // 'add' | product object
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const load = () => api.get('/products').then((res) => setProducts(res.data)).finally(() => setLoading(false))

  useEffect(() => {
    load()
    api.get('/brands').then((res) => setBrands(res.data))
    api.get('/categories').then((res) => setCategories(res.data))
  }, [])

  const openAdd = () => { setForm(emptyForm); setModal('add') }
  const openEdit = (p) => {
    setForm({
      name: p.name,
      brand: p.brand?._id || p.brand,
      category: p.category?._id || p.category,
      price: p.price,
      oldPrice: p.oldPrice || '',
      description: p.description || '',
      images: (p.images || []).join(', '),
      colors: (p.colors || []).join(', '),
      variants: p.variants?.length ? p.variants.map((v) => ({ size: v.size, color: v.color, sku: v.sku, stock: v.stock })) : [{ size: '', color: '', sku: '', stock: '' }],
    })
    setModal(p)
  }

  const updateVariant = (i, field, value) => {
    const next = [...form.variants]
    next[i] = { ...next[i], [field]: value }
    setForm({ ...form, variants: next })
  }
  const addVariantRow = () => setForm({ ...form, variants: [...form.variants, { size: '', color: '', sku: '', stock: '' }] })
  const removeVariantRow = (i) => setForm({ ...form, variants: form.variants.filter((_, idx) => idx !== i) })

  const save = async () => {
    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      description: form.description,
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map((s) => s.trim()).filter(Boolean),
      variants: form.variants
        .filter((v) => v.size && v.sku)
        .map((v) => ({ size: Number(v.size), color: v.color, sku: v.sku, stock: Number(v.stock) || 0 })),
    }
    try {
      if (modal === 'add') await api.post('/products', payload)
      else await api.put(`/products/${modal._id}`, payload)
      setModal(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not save product')
    }
  }

  const confirmDelete = async () => {
    await api.delete(`/products/${deleteTarget._id}`)
    setDeleteTarget(null)
    load()
  }

  const stockLabel = (p) => {
    const total = p.variants?.reduce((sum, v) => sum + v.stock, 0) || 0
    if (total === 0) return { text: 'Out of stock', color: 'bg-red-100 text-red-700' }
    if (total < 20) return { text: 'Low stock', color: 'bg-amber-100 text-amber-700' }
    return { text: 'In stock', color: 'bg-green-100 text-green-700' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={openAdd}>Add product</Button>
      </div>

      {loading && <p className="text-muted">Loading…</p>}

      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-soft text-xs uppercase text-muted">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const s = stockLabel(p)
                return (
                  <tr key={p._id} className="border-t border-stone-line">
                    <td className="flex items-center gap-3 p-4 font-medium">
                      <img src={p.images?.[0]} className="h-10 w-10 rounded-lg bg-stone-soft object-cover" />
                      {p.name}
                    </td>
                    <td className="p-4 text-muted">{p.category?.name}</td>
                    <td className="p-4 text-muted">{p.brand?.name}</td>
                    <td className="p-4">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-4"><span className={`rounded-md px-2 py-1 text-xs font-semibold ${s.color}`}>{s.text}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => openEdit(p)}>Edit</Button>
                        <Button variant="dark" onClick={() => setDeleteTarget(p)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {products.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-muted">No products yet. Click "Add product" to create one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add product' : 'Edit product'}>
        <Input label="Product name" placeholder="e.g. Air Runner 90" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Category</span>
          <select className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm outline-none focus:border-ink"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Brand</span>
          <select className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm outline-none focus:border-ink"
            value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}>
            <option value="">Select brand</option>
            {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Price" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Input label="Compare at price (optional)" placeholder="0" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
        </div>

        <Input label="Description" placeholder="Describe the product…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input label="Image URLs (comma separated)" placeholder="https://…, https://…" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
        <Input label="Colors (comma separated hex codes)" placeholder="#111111, #FF4F1F" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />

        <div>
          <span className="mb-1.5 block text-sm font-medium">Variants (size, color, SKU, stock)</span>
          <div className="space-y-2">
            {form.variants.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input placeholder="Size" value={v.size} onChange={(e) => updateVariant(i, 'size', e.target.value)} className="w-16 rounded-lg border border-stone-line px-2 py-2 text-sm" />
                <input placeholder="Color hex" value={v.color} onChange={(e) => updateVariant(i, 'color', e.target.value)} className="w-24 rounded-lg border border-stone-line px-2 py-2 text-sm" />
                <input placeholder="SKU" value={v.sku} onChange={(e) => updateVariant(i, 'sku', e.target.value)} className="flex-1 rounded-lg border border-stone-line px-2 py-2 text-sm" />
                <input placeholder="Stock" value={v.stock} onChange={(e) => updateVariant(i, 'stock', e.target.value)} className="w-16 rounded-lg border border-stone-line px-2 py-2 text-sm" />
                <button onClick={() => removeVariantRow(i)} className="text-sm text-red-500">✕</button>
              </div>
            ))}
          </div>
          <button onClick={addVariantRow} className="mt-2 text-sm font-semibold text-accent">+ Add variant</button>
        </div>

        <Button full className="mt-2" onClick={save}>{modal === 'add' ? 'Publish product' : 'Save changes'}</Button>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete product?">
        <p className="text-sm text-muted">
          {deleteTarget?.name} and all its variants will be permanently removed from the store.
        </p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" full onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button full onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}