import mongoose from 'mongoose'

const variantSchema = new mongoose.Schema({
  size: { type: Number, required: true },
  color: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  description: { type: String },
  images: [{ type: String }],
  colors: [{ type: String }],
  variants: [variantSchema],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

// total stock across all variants — used for "In stock / Low stock / Out of stock"
productSchema.virtual('totalStock').get(function () {
  return this.variants.reduce((sum, v) => sum + v.stock, 0)
})
productSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Product', productSchema)