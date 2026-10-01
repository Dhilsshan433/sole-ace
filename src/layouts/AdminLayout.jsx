import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  ['Dashboard', '/admin'],
  ['Users', '/admin/users'],
  ['Products', '/admin/products'],
  ['Categories', '/admin/categories'],
  ['Brands', '/admin/brands'],
  ['Orders', '/admin/orders'],
  ['Coupons', '/admin/coupons'],
  ['Offers', '/admin/offers'],
  ['Banners', '/admin/banners'],
  ['Reviews', '/admin/reviews'],
  ['Support', '/admin/support'],
  ['Referral', '/admin/referral'],
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => { await logout(); navigate('/admin/login') }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col gap-1 bg-[#1B1B1B] p-4 text-white">
        <div className="mb-6 px-2 py-2 text-xl font-bold">SOLE<span className="text-accent"> ACE</span></div>
        {links.map(([label, to]) => (
          <NavLink key={to} to={to} end={to === '/admin'}
            className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-accent text-white' : 'text-white/70 hover:bg-white/5'}`}>
            {label}
          </NavLink>
        ))}
        <button onClick={handleLogout} className="mt-auto rounded-xl px-4 py-3 text-left text-sm font-medium text-red-400 hover:bg-white/5">
          Log out
        </button>
      </aside>
      <main className="flex-1 bg-paper p-8"><Outlet /></main>
    </div>
  )
}