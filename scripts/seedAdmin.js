import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import User from '../models/User.js'

dotenv.config()
await connectDB()

const email = 'admin@soleace.com'
const exists = await User.findOne({ email })
if (exists) {
  console.log('Admin already exists.')
} else {
  await User.create({
    name: 'Admin', email, phone: '+910000000000',
    password: 'Admin@123', role: 'admin', isVerified: true,
  })
  console.log('Admin created: admin@soleace.com / Admin@123')
}
process.exit()