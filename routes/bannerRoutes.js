import express from 'express'
import { getBanners, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()
router.get('/', getBanners) // public — shown on Home page later
router.post('/', protect, adminOnly, createBanner)
router.put('/:id', protect, adminOnly, updateBanner)
router.delete('/:id', protect, adminOnly, deleteBanner)
export default router