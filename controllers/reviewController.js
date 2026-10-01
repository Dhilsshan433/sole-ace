import Review from '../models/Review.js'
import Product from '../models/Product.js'

// GET /api/reviews/product/:productId — public, only approved reviews
export async function getProductReviews(req, res) {
  const reviews = await Review.find({ product: req.params.productId, status: 'Approved' }).populate('user', 'name').sort('-createdAt')
  res.json(reviews)
}

// GET /api/reviews/mine
export async function getMyReviews(req, res) {
  const reviews = await Review.find({ user: req.user._id }).populate('product', 'name images').sort('-createdAt')
  res.json(reviews)
}

// POST /api/reviews   { product, rating, text }
export async function createReview(req, res) {
  try {
    const review = await Review.create({ ...req.body, user: req.user._id })
    await recalcRating(req.body.product)
    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// PUT /api/reviews/:id — only the owner can edit
export async function updateReview(req, res) {
  const review = await Review.findById(req.params.id)
  if (!review) return res.status(404).json({ message: 'Review not found' })
  if (String(review.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not your review' })
  review.rating = req.body.rating ?? review.rating
  review.text = req.body.text ?? review.text
  review.status = 'Pending' // re-review after edit
  await review.save()
  await recalcRating(review.product)
  res.json(review)
}

// DELETE /api/reviews/:id — owner or admin
export async function deleteReview(req, res) {
  const review = await Review.findById(req.params.id)
  if (!review) return res.status(404).json({ message: 'Review not found' })
  if (String(review.user) !== String(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not allowed' })
  }
  await review.deleteOne()
  await recalcRating(review.product)
  res.json({ message: 'Review deleted' })
}

// ---- Admin ----

// GET /api/reviews
export async function getAllReviews(req, res) {
  const reviews = await Review.find().populate('user', 'name').populate('product', 'name').sort('-createdAt')
  res.json(reviews)
}

// PATCH /api/reviews/:id/status   { status: 'Approved' | 'Flagged' }
export async function setReviewStatus(req, res) {
  const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
  if (!review) return res.status(404).json({ message: 'Review not found' })
  await recalcRating(review.product)
  res.json(review)
}

async function recalcRating(productId) {
  const reviews = await Review.find({ product: productId, status: 'Approved' })
  const reviewCount = reviews.length
  const rating = reviewCount ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1) : 0
  await Product.findByIdAndUpdate(productId, { rating, reviewCount })
}