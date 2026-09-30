import Product from '../models/Product.js'

// GET /api/products?category=Sneakers&brand=Nimbus&search=air
export async function getProducts(req, res) {
  try {
    const { category, brand, search } = req.query
    const filter = { isActive: true }
    if (category) filter.category = category
    if (brand) filter.brand = brand
    if (search) filter.name = { $regex: search, $options: 'i' }

    const products = await Product.find(filter).populate('brand category', 'name')
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/products/:id
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('brand category', 'name')
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/products/:id/related
export async function getRelatedProducts(req, res) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4)
    res.json(related)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ---- Admin only ----

// POST /api/products
export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// PUT /api/products/:id
export async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /api/products/:id
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}