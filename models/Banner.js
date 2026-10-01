import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  position: { type: String, enum: ['Home top', 'Home middle', 'Deals page'], required: true },
  linkUrl: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Banner', bannerSchema)