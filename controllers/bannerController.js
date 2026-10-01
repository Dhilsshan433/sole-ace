import Banner from '../models/Banner.js'

export async function getBanners(req, res) {
  const banners = await Banner.find().sort('-createdAt')
  res.json(banners)
}
export async function createBanner(req, res) {
  try { res.status(201).json(await Banner.create(req.body)) }
  catch (err) { res.status(400).json({ message: err.message }) }
}
export async function updateBanner(req, res) {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!banner) return res.status(404).json({ message: 'Banner not found' })
  res.json(banner)
}
export async function deleteBanner(req, res) {
  const banner = await Banner.findByIdAndDelete(req.params.id)
  if (!banner) return res.status(404).json({ message: 'Banner not found' })
  res.json({ message: 'Banner deleted' })
}