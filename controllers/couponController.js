import Coupon from '../models/Coupon.js'

export async function getCoupons(req, res) {
  const coupons = await Coupon.find().sort('-createdAt')
  res.json(coupons)
}

export async function createCoupon(req, res) {
  try {
    const coupon = await Coupon.create(req.body)
    res.status(201).json(coupon)
  } catch (err) {
    res.status(400).json({ message: err.code === 11000 ? 'This coupon code already exists' : err.message })
  }
}

export async function updateCoupon(req, res) {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!coupon) return res.status(404).json({ message: 'Coupon not found' })
  res.json(coupon)
}

export async function deleteCoupon(req, res) {
  const coupon = await Coupon.findByIdAndDelete(req.params.id)
  if (!coupon) return res.status(404).json({ message: 'Coupon not found' })
  res.json({ message: 'Coupon deleted' })
}

// POST /api/coupons/validate   { code, subtotal }  — used at checkout
export async function validateCoupon(req, res) {
  const { code, subtotal } = req.body
  const coupon = await Coupon.findOne({ code: code?.toUpperCase(), isActive: true })
  if (!coupon) return res.status(404).json({ message: 'Invalid coupon code' })
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return res.status(400).json({ message: 'This coupon has expired' })
  if (subtotal < coupon.minOrderValue) return res.status(400).json({ message: `Minimum order value is ₹${coupon.minOrderValue}` })

  const discount = coupon.discountType === 'percentage'
    ? Math.round((subtotal * coupon.discountValue) / 100)
    : coupon.discountValue

  res.json({ discount, code: coupon.code })
}