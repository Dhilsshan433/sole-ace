import express from 'express'
import { createOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/mine', protect, getMyOrders)
router.get('/', protect, adminOnly, getAllOrders)
router.get('/:id', protect, getOrderById)
router.patch('/:id/cancel', protect, cancelOrder)
router.patch('/:id/status', protect, adminOnly, updateOrderStatus)

export default router