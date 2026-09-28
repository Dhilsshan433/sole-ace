import { Routes, Route } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import Preview from './pages/user/Preview'

export default function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Preview />} />
      </Route>
    </Routes>
  )
}