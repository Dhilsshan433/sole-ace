import User from '../models/User.js'

// POST /api/users/addresses
export async function addAddress(req, res) {
  const user = await User.findById(req.user._id)
  if (user.addresses.length === 0) req.body.isDefault = true
  user.addresses.push(req.body)
  await user.save()
  res.status(201).json(user.addresses)
}

// PUT /api/users/addresses/:addressId
export async function updateAddress(req, res) {
  const user = await User.findById(req.user._id)
  const addr = user.addresses.id(req.params.addressId)
  if (!addr) return res.status(404).json({ message: 'Address not found' })
  Object.assign(addr, req.body)
  await user.save()
  res.json(user.addresses)
}

// DELETE /api/users/addresses/:addressId
export async function deleteAddress(req, res) {
  const user = await User.findById(req.user._id)
  user.addresses.pull(req.params.addressId)
  await user.save()
  res.json(user.addresses)
}

// GET/POST /api/users/wishlist
export async function getWishlist(req, res) {
  const user = await User.findById(req.user._id).populate('wishlist')
  res.json(user.wishlist)
}
export async function toggleWishlist(req, res) {
  const user = await User.findById(req.user._id)
  const { productId } = req.body
  const exists = user.wishlist.some((id) => String(id) === productId)
  user.wishlist = exists
    ? user.wishlist.filter((id) => String(id) !== productId)
    : [...user.wishlist, productId]
  await user.save()
  res.json({ wishlist: user.wishlist, added: !exists })
}

// PUT /api/users/profile
export async function updateProfile(req, res) {
  const { name, phone } = req.body
  const user = await User.findByIdAndUpdate(req.user._id, { name, phone }, { new: true })
  res.json(user.toSafeObject())
}

// ---- Admin ----

// GET /api/users
export async function getAllUsers(req, res) {
  const users = await User.find({ role: 'user' }).select('-password -otp').sort('-createdAt')
  res.json(users)
}

// PATCH /api/users/:id/block
export async function toggleBlockUser(req, res) {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  user.isBlocked = !user.isBlocked
  await user.save()
  res.json(user.toSafeObject())
}