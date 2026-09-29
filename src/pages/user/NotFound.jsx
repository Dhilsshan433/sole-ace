import { Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <p className="text-8xl font-bold text-accent">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted">The page you are looking for does not exist or has been moved.</p>
      <Link to="/"><Button>Back to home</Button></Link>
    </div>
  )
}