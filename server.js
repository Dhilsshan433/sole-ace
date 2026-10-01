import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import offerRoutes from './routes/offerRoutes.js'
import bannerRoutes from './routes/bannerRoutes.js'


dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.use('/api/categories', categoryRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/orders', orderRoutes)

app.use('/api/coupons', couponRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/banners', bannerRoutes)

app.use('/api/users', userRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// In production, serve the built React app from this same server
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))