import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-stone-soft flex items-center justify-center p-6">
      <Outlet />
    </div>
  )
}