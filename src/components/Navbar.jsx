import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User } from 'lucide-react'
import Logo from './Logo'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/brands', label: 'Brands' },
  { to: '/deals', label: 'Deals' },
  { to: '/support', label: 'Support' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => `text-sm font-medium transition hover:text-accent ${isActive ? 'text-accent' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/shop" className="rounded-lg p-2 hover:bg-stone-soft"><Search size={20} /></Link>
          <Link to="/profile/wishlist" className="rounded-lg p-2 hover:bg-stone-soft"><Heart size={20} /></Link>
          <Link to="/cart" className="rounded-lg p-2 hover:bg-stone-soft"><ShoppingBag size={20} /></Link>
          <Link to="/login" className="rounded-lg p-2 hover:bg-stone-soft"><User size={20} /></Link>
        </div>
      </div>
    </header>
  )
}