import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8"><Outlet /></main>
      <Footer />
    </>
  )
}