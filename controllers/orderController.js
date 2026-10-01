import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Coupon from '../models/Coupon.js'

// POST /api/orders
export async function createOrder(req, res) {
  try {
    const { items, address, paymentMethod, couponCode } = req.body
    if (!items?.length) return res.status(400).json({ message: 'Cart is empty' })

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    let discount = 0

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true })
      if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date()) && subtotal >= coupon.minOrderValue) {
        discount = coupon.discountType === 'percentage' ? Math.round((subtotal * coupon.discountValue) / 100) : coupon.discountValue
        coupon.usedCount += 1
        await coupon.save()
      }
    }

    const total = Math.max(subtotal - discount, 0)

    const order = await Order.create({
      user: req.user._id, items, address, paymentMethod,
      subtotal, discount, couponCode: discount > 0 ? couponCode?.toUpperCase() : undefined,
      total,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
    })

    for (const item of items) {
      await Product.updateOne(
        { _id: item.product, 'variants.size': item.size },
        { $inc: { 'variants.$.stock': -item.qty } }
      )
    }

    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/orders/mine
export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt')
  res.json(orders)
}

// GET /api/orders/:id
export async function getOrderById(req, res) {
  const order = await Order.findById(req.params.id)
  if (!order) return res.status(404).json({ message: 'Order not found' })
  if (String(order.user) !== String(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not your order' })
  }
  res.json(order)
}

// PATCH /api/orders/:id/cancel
export async function cancelOrder(req, res) {
  const order = await Order.findById(req.params.id)
  if (!order) return res.status(404).json({ message: 'Order not found' })
  if (String(order.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not your order' })
  if (order.status === 'Shipped' || order.status === 'Delivered') {
    return res.status(400).json({ message: 'This order can no longer be cancelled' })
  }
  order.status = 'Cancelled'
  await order.save()
  res.json(order)
}

// ---- Admin ----

// GET /api/orders
export async function getAllOrders(req, res) {
  const orders = await Order.find().populate('user', 'name email').sort('-createdAt')
  res.json(orders)
}

// PATCH /api/orders/:id/status   { status }
export async function updateOrderStatus(req, res) {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
  if (!order) return res.status(404).json({ message: 'Order not found' })
  res.json(order)
}