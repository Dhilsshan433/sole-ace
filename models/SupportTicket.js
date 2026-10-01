import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  from: { type: String, enum: ['user', 'admin'], required: true },
  text: { type: String, required: true },
}, { timestamps: true })

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' },
  messages: [messageSchema],
}, { timestamps: true })

export default mongoose.model('SupportTicket', ticketSchema)