import mongoose from 'mongoose'

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discountPercent: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // null = all categories
  startsAt: { type: Date },
  endsAt: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Offer', offerSchema)