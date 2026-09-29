import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import ProductCard from '../../components/ProductCard'
import { products } from '../../data/products'

const categories = ['Sneakers', 'Running', 'Formal', 'Sandals', 'Boots', 'Kids']

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="flex flex-col items-center gap-10 rounded-3xl bg-ink p-10 text-white md:flex-row md:p-16">
        <div className="flex-1 space-y-5">
          <p className="text-xs font-semibold tracking-wide text-accent">NEW SEASON</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">Step into<br />your best pace.</h1>
          <p className="max-w-md text-white/60">Everyday sneakers, running shoes and more. Comfort first, no fuss.</p>
          <div className="flex gap-3">
            <Link to="/shop"><Button>Shop now</Button></Link>
            <Link to="/deals"><Button variant="ghost" className="border border-white/20 text-white">View deals</Button></Link>
          </div>
        </div>
        <div className="flex h-72 w-full max-w-sm items-center justify-center rounded-2xl bg-white/10 md:h-96">
          <span className="text-sm text-white/40">Hero shoe image</span>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shop by category</h2>
          <Link to="/shop" className="text-sm font-semibold text-accent">View all</Link>
        </div>
        <div className="flex flex-wrap justify-between gap-4">
          {categories.map((c) => (
            <Link to={`/shop?category=${c}`} key={c} className="flex flex-col items-center gap-2">
              <div className="h-20 w-20 rounded-full bg-stone-soft" />
              <span className="text-sm font-medium">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-stone-soft p-10 md:flex-row">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-accent">SEASONAL SALE</p>
          <h2 className="text-4xl font-bold">Up to 40% off</h2>
          <p className="text-muted">Selected sneakers and running shoes, this week only.</p>
          <Link to="/deals"><Button variant="dark">Grab the deal</Button></Link>
        </div>
        <span className="text-7xl font-bold text-accent">40%</span>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Top selling</h2>
          <Link to="/shop" className="text-sm font-semibold text-accent">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-ink p-10 text-white md:flex-row">
        <div>
          <h2 className="text-2xl font-bold">Join the SOLE ACE club</h2>
          <p className="text-white/60">New drops and offers. No spam.</p>
        </div>
        <div className="flex w-full max-w-md gap-2">
          <input placeholder="Enter your email" className="w-full rounded-xl px-4 py-3 text-sm text-ink outline-none" />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  )
}