import express from 'express'
import { addAddress, updateAddress, deleteAddress, getWishlist, toggleWishlist, updateProfile, getAllUsers, toggleBlockUser } from '../controllers/userController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.put('/profile', protect, updateProfile)
router.post('/addresses', protect, addAddress)
router.put('/addresses/:addressId', protect, updateAddress)
router.delete('/addresses/:addressId', protect, deleteAddress)
router.get('/wishlist', protect, getWishlist)
router.post('/wishlist', protect, toggleWishlist)

router.get('/', protect, adminOnly, getAllUsers)
router.patch('/:id/block', protect, adminOnly, toggleBlockUser)

export default router