import { Routes, Route } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import AuthLayout from './layouts/AuthLayout'
import Preview from './pages/user/Preview'
import Login from './pages/user/Login'
import LoginSuccess from './pages/user/LoginSuccess'
import LoginFailed from './pages/user/LoginFailed'
import SignUp from './pages/user/SignUp'
import SignUpOtp from './pages/user/SignUpOtp'
import SignUpSuccess from './pages/user/SignUpSuccess'
import SignUpFailed from './pages/user/SignUpFailed'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetOtp from './pages/user/ResetOtp'
import ResetPassword from './pages/user/ResetPassword'
import ResetSuccess from './pages/user/ResetSuccess'
import Home from './pages/user/Home'
import Landing from './pages/user/Landing'
import ProductListing from './pages/user/ProductListing'
import ProductDetail from './pages/user/ProductDetail'
import Cart from './pages/user/Cart'
import Checkout from './pages/user/Checkout'
import OrderSuccess from './pages/user/OrderSuccess'
import OrderFailed from './pages/user/OrderFailed'
import OrderSummary from './pages/user/OrderSummary'
import OrderTracking from './pages/user/OrderTracking'
import OrderPlaced from './pages/user/OrderPlaced'

export default function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Preview />} />
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/shop" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/failed" element={<OrderFailed />} />
        <Route path="/order/summary" element={<OrderSummary />} />
        <Route path="/order/tracking" element={<OrderTracking />} />
        <Route path="/order/placed" element={<OrderPlaced />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/login/failed" element={<LoginFailed />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/otp" element={<SignUpOtp />} />
        <Route path="/signup/success" element={<SignUpSuccess />} />
        <Route path="/signup/failed" element={<SignUpFailed />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/otp" element={<ResetOtp />} />
        <Route path="/reset/password" element={<ResetPassword />} />
        <Route path="/reset/success" element={<ResetSuccess />} />
      </Route>
    </Routes>
  )
}