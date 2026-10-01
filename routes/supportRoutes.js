import express from 'express'
import { createTicket, getMyTickets, getTicketById, replyToTicket, getAllTickets, resolveTicket } from '../controllers/supportController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()
router.post('/', protect, createTicket)
router.get('/mine', protect, getMyTickets)
router.get('/:id', protect, getTicketById)
router.post('/:id/reply', protect, replyToTicket)
router.get('/', protect, adminOnly, getAllTickets)
router.patch('/:id/resolve', protect, adminOnly, resolveTicket)
export default router