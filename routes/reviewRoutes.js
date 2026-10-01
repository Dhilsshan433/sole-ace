import express from 'express'
import { getProductReviews, getMyReviews, createReview, updateReview, deleteReview, getAllReviews, setReviewStatus } from '../controllers/reviewController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()
router.get('/product/:productId', getProductReviews)
router.get('/mine', protect, getMyReviews)
router.post('/', protect, createReview)
router.put('/:id', protect, updateReview)
router.delete('/:id', protect, deleteReview)
router.get('/', protect, adminOnly, getAllReviews)
router.patch('/:id/status', protect, adminOnly, setReviewStatus)
export default router