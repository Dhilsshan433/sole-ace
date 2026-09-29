import User from '../models/User.js'
import { generateToken, generateOtp } from '../utils/generateToken.js'
import { sendOtpEmail } from '../utils/sendEmail.js'

// POST /api/auth/signup
export async function signup(req, res) {
  try {
    const { name, email, phone, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'An account with this email already exists' })

    const otp = generateOtp()
    const user = await User.create({
      name, email, phone, password,
      otp: { code: otp, expiresAt: Date.now() + 10 * 60 * 1000 },
    })
    await sendOtpEmail(email, otp)
    res.status(201).json({ message: 'OTP sent to your email', email: user.email })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/verify-signup   { email, code }
export async function verifySignup(req, res) {
  try {
    const { email, code } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.otp?.code) return res.status(400).json({ message: 'Verification failed. Please sign up again.' })
    if (user.otp.code !== code || user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'The code was incorrect or has expired' })
    }
    user.isVerified = true
    user.otp = undefined
    await user.save()
    generateToken(res, user._id, user.role)
    res.json({ message: 'Verified', user: user.toSafeObject() })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/login   { email, password }
export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' })
    }
    if (user.isBlocked) return res.status(403).json({ message: 'Your account has been blocked' })
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email first' })

    generateToken(res, user._id, user.role)
    res.json({ message: 'Login successful', user: user.toSafeObject() })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/forgot-password   { email }
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'No account found with this email' })

    const otp = generateOtp()
    user.otp = { code: otp, expiresAt: Date.now() + 10 * 60 * 1000 }
    await user.save()
    await sendOtpEmail(email, otp)
    res.json({ message: 'Reset code sent', email })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/verify-reset-otp   { email, code }
export async function verifyResetOtp(req, res) {
  try {
    const { email, code } = req.body
    const user = await User.findOne({ email })
    if (!user || user.otp?.code !== code || user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'The code was incorrect or has expired' })
    }
    res.json({ message: 'Code verified' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/reset-password   { email, code, newPassword }
export async function resetPassword(req, res) {
  try {
    const { email, code, newPassword } = req.body
    const user = await User.findOne({ email })
    if (!user || user.otp?.code !== code || user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'The code was incorrect or has expired' })
    }
    user.password = newPassword
    user.otp = undefined
    await user.save()
    res.json({ message: 'Password reset successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/logout
export function logout(req, res) {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
}

// GET /api/auth/me
export async function getMe(req, res) {
  res.json({ user: req.user.toSafeObject() })
}