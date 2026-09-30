import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Category from '../models/Category.js'
import Brand from '../models/Brand.js'
import Product from '../models/Product.js'

dotenv.config()
await connectDB()

const categoryNames = ['Sneakers', 'Running', 'Formal', 'Sandals', 'Boots']
const brandNames = ['Nimbus', 'Stride', 'Oak & Co']

const categories = {}
for (const name of categoryNames) {
  categories[name] = (await Category.findOneAndUpdate({ name }, { name }, { upsert: true, new: true }))._id
}
const brands = {}
for (const name of brandNames) {
  brands[name] = (await Brand.findOneAndUpdate({ name }, { name }, { upsert: true, new: true }))._id
}

await Product.deleteMany({})

const img = (text) => `https://placehold.co/600x600/F1EFEA/111111?text=${encodeURIComponent(text)}`

const data = [
  { name: 'Air Runner 90', brand: 'Nimbus', category: 'Sneakers', price: 5999, oldPrice: 7499, description: 'A lightweight everyday runner with a breathable knit upper and a cushioned sole built for long comfortable days.', colors: ['#111111', '#E7E5E0', '#FF4F1F'], sizes: [7, 8, 9, 10] },
  { name: 'Street Low', brand: 'Stride', category: 'Sneakers', price: 4299, description: 'Clean, minimal street sneaker built for everyday wear.', colors: ['#111111', '#FFFFFF'], sizes: [6, 7, 8, 9] },
  { name: 'Trail Pro', brand: 'Nimbus', category: 'Running', price: 6799, oldPrice: 8199, description: 'Rugged grip and extra cushioning for off-road running.', colors: ['#111111', '#556B2F'], sizes: [8, 9, 10, 11] },
  { name: 'Oxford Classic', brand: 'Oak & Co', category: 'Formal', price: 7499, description: 'A timeless formal oxford, hand-finished leather upper.', colors: ['#5C3A21'], sizes: [7, 8, 9, 10] },
  { name: 'Court Vision', brand: 'Stride', category: 'Sneakers', price: 4999, oldPrice: 5999, description: 'Retro court styling with modern comfort foam.', colors: ['#FFFFFF', '#FF4F1F'], sizes: [6, 7, 8, 9] },
  { name: 'Cloud Walker', brand: 'Nimbus', category: 'Running', price: 3999, description: 'Ultra-light everyday walking shoe.', colors: ['#111111'], sizes: [7, 8, 9, 10] },
  { name: 'Chelsea Boot', brand: 'Oak & Co', category: 'Boots', price: 8299, oldPrice: 9499, description: 'Classic Chelsea boot in premium leather.', colors: ['#111111'], sizes: [8, 9, 10, 11] },
  { name: 'Slide Comfort', brand: 'Stride', category: 'Sandals', price: 1999, description: 'Soft footbed slides for home and short trips.', colors: ['#111111', '#3B5B7A'], sizes: [7, 8, 9, 10] },
]

for (const d of data) {
  const variants = d.sizes.flatMap((size) =>
    d.colors.map((color) => ({ size, color, sku: `SA-${d.name.replace(/\s/g, '').toUpperCase().slice(0, 6)}-${size}-${color.replace('#', '')}`, stock: Math.floor(Math.random() * 30) + 5 }))
  )
  await Product.create({
    name: d.name, brand: brands[d.brand], category: categories[d.category],
    price: d.price, oldPrice: d.oldPrice, description: d.description,
    images: [img(d.name)], colors: d.colors, variants,
    rating: (4 + Math.random()).toFixed(1),
  })
}

console.log(`Seeded ${data.length} products with categories and brands.`)
process.exit()