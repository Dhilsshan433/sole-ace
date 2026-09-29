import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function protect(req, res, next) {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Not logged in' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    if (!req.user) return res.status(401).json({ message: 'User not found' })
    if (req.user.isBlocked) return res.status(403).json({ message: 'Your account has been blocked' })
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired session' })
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admins only' })
  next()
}