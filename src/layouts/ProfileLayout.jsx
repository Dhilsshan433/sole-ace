import { NavLink, Outlet } from 'react-router-dom'

const links = [
  ['Personal information', '/profile'],
  ['Addresses', '/profile/addresses'],
  ['My reviews', '/profile/reviews'],
  ['Referral program', '/profile/referral'],
  ['Questions & answers', '/profile/questions'],
  ['My orders', '/profile/orders'],
  ['Wishlist', '/profile/wishlist'],
  ['My wallet', '/profile/wallet'],
]

export default function ProfileLayout() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <aside className="w-full shrink-0 space-y-1 rounded-2xl border border-stone-line bg-white p-4 md:w-64">
        <div className="mb-3 flex items-center gap-3 p-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-soft font-semibold">AM</div>
          <div>
            <p className="font-semibold">Alex Morgan</p>
            <p className="text-xs text-muted">alex@example.com</p>
          </div>
        </div>
        {links.map(([label, to]) => (
          <NavLink key={to} to={to} end={to === '/profile'}
            className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-ink text-white' : 'hover:bg-stone-soft'}`}>
            {label}
          </NavLink>
        ))}
        <button className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-stone-soft">Log out</button>
      </aside>
      <div className="flex-1 space-y-6"><Outlet /></div>
    </div>
  )
}