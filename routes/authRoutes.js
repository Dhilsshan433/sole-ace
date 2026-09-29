import express from 'express'
import { signup, verifySignup, login, forgotPassword, verifyResetOtp, resetPassword, logout, getMe } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/verify-signup', verifySignup)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/verify-reset-otp', verifyResetOtp)
router.post('/reset-password', resetPassword)
router.post('/logout', logout)
router.get('/me', protect, getMe)

export default router