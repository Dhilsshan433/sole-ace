import express from 'express'
import { getOffers, createOffer, updateOffer, deleteOffer } from '../controllers/offerController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()
router.get('/', getOffers) // public — shown on Deals page later
router.post('/', protect, adminOnly, createOffer)
router.put('/:id', protect, adminOnly, updateOffer)
router.delete('/:id', protect, adminOnly, deleteOffer)
export default router