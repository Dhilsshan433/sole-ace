import Category from '../models/Category.js'

export async function getCategories(req, res) {
  const categories = await Category.find({ isActive: true })
  res.json(categories)
}
export async function createCategory(req, res) {
  try { res.status(201).json(await Category.create(req.body)) }
  catch (err) { res.status(400).json({ message: err.message }) }
}
export async function updateCategory(req, res) {
  const c = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!c) return res.status(404).json({ message: 'Category not found' })
  res.json(c)
}
export async function deleteCategory(req, res) {
  const c = await Category.findByIdAndDelete(req.params.id)
  if (!c) return res.status(404).json({ message: 'Category not found' })
  res.json({ message: 'Category deleted' })
}