import express from 'express'
import { getCoupons, createCoupon, updateCoupon, deleteCoupon, validateCoupon } from '../controllers/couponController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()
router.get('/', protect, adminOnly, getCoupons)
router.post('/', protect, adminOnly, createCoupon)
router.put('/:id', protect, adminOnly, updateCoupon)
router.delete('/:id', protect, adminOnly, deleteCoupon)
router.post('/validate', protect, validateCoupon) // any logged-in user, used at checkout
export default router