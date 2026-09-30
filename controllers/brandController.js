import Brand from '../models/Brand.js'

export async function getBrands(req, res) {
  const brands = await Brand.find({ isActive: true })
  res.json(brands)
}
export async function createBrand(req, res) {
  try { res.status(201).json(await Brand.create(req.body)) }
  catch (err) { res.status(400).json({ message: err.message }) }
}
export async function updateBrand(req, res) {
  const b = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!b) return res.status(404).json({ message: 'Brand not found' })
  res.json(b)
}
export async function deleteBrand(req, res) {
  const b = await Brand.findByIdAndDelete(req.params.id)
  if (!b) return res.status(404).json({ message: 'Brand not found' })
  res.json({ message: 'Brand deleted' })
}