import { Link } from 'react-router-dom'
import Logo from './Logo'

const cols = [
  { title: 'Shop', items: [['New arrivals', '/shop'], ['Brands', '/brands'], ['Deals', '/deals']] },
  { title: 'Account', items: [['Profile', '/profile'], ['Orders', '/profile/orders'], ['Wishlist', '/profile/wishlist']] },
  { title: 'Help', items: [['Support', '/support'], ['Track order', '/profile/orders']] },
]

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm text-white/60">Shoes built for every step. Simple, honest, comfortable.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-sm font-semibold">{c.title}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {c.items.map(([label, to]) => (
                <li key={label}><Link to={to} className="hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">© 2026 SOLE ACE. All rights reserved.</div>
    </footer>
  )
}