import Offer from '../models/Offer.js'

export async function getOffers(req, res) {
  const offers = await Offer.find().populate('category', 'name').sort('-createdAt')
  res.json(offers)
}
export async function createOffer(req, res) {
  try { res.status(201).json(await Offer.create(req.body)) }
  catch (err) { res.status(400).json({ message: err.message }) }
}
export async function updateOffer(req, res) {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!offer) return res.status(404).json({ message: 'Offer not found' })
  res.json(offer)
}
export async function deleteOffer(req, res) {
  const offer = await Offer.findByIdAndDelete(req.params.id)
  if (!offer) return res.status(404).json({ message: 'Offer not found' })
  res.json({ message: 'Offer deleted' })
}