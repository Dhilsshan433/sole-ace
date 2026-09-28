import { Link } from 'react-router-dom'

export default function Logo({ light }) {
  return (
    <Link to="/" className={`font-display text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
      SOLE<span className="text-accent"> ACE</span>
    </Link>
  )
}