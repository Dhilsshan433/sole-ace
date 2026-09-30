import express from 'express'
import { getProducts, getProductById, getRelatedProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.get('/:id/related', getRelatedProducts)

router.post('/', protect, adminOnly, createProduct)
router.put('/:id', protect, adminOnly, updateProduct)
router.delete('/:id', protect, adminOnly, deleteProduct)

export default router