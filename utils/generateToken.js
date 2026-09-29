import jwt from 'jsonwebtoken'

export function generateToken(res, userId, role) {
  const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '30d' })
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
  return token
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString() // 6 digits
}