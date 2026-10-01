import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/brands', label: 'Brands' },
  { to: '/deals', label: 'Deals' },
  { to: '/support', label: 'Support' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count } = useCart()

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
          <Link to="/cart" className="relative rounded-lg p-2 hover:bg-stone-soft">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          {user ? (
            <button onClick={logout} className="rounded-lg p-2 hover:bg-stone-soft" title="Log out">
              <User size={20} />
            </button>
          ) : (
            <Link to="/login" className="rounded-lg p-2 hover:bg-stone-soft"><User size={20} /></Link>
          )}
        </div>
      </div>
    </header>
  )
}