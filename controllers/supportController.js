import SupportTicket from '../models/SupportTicket.js'

// POST /api/support   { subject, message }
export async function createTicket(req, res) {
  try {
    const ticket = await SupportTicket.create({
      user: req.user._id,
      subject: req.body.subject,
      messages: [{ from: 'user', text: req.body.message }],
    })
    res.status(201).json(ticket)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/support/mine
export async function getMyTickets(req, res) {
  const tickets = await SupportTicket.find({ user: req.user._id }).sort('-createdAt')
  res.json(tickets)
}

// GET /api/support/:id
export async function getTicketById(req, res) {
  const ticket = await SupportTicket.findById(req.params.id)
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' })
  if (String(ticket.user) !== String(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not allowed' })
  }
  res.json(ticket)
}

// POST /api/support/:id/reply   { text }  — either side can reply
export async function replyToTicket(req, res) {
  const ticket = await SupportTicket.findById(req.params.id)
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' })
  const from = req.user.role === 'admin' ? 'admin' : 'user'
  ticket.messages.push({ from, text: req.body.text })
  if (from === 'admin') ticket.status = 'Open'
  await ticket.save()
  res.json(ticket)
}

// ---- Admin ----

// GET /api/support
export async function getAllTickets(req, res) {
  const tickets = await SupportTicket.find().populate('user', 'name email').sort('-createdAt')
  res.json(tickets)
}

// PATCH /api/support/:id/resolve
export async function resolveTicket(req, res) {
  const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, { status: 'Resolved' }, { new: true })
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' })
  res.json(ticket)
}