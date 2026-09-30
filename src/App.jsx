import { Routes, Route } from 'react-router-dom'

// Layouts
import UserLayout from './layouts/UserLayout'
import AuthLayout from './layouts/AuthLayout'
import ProfileLayout from './layouts/ProfileLayout'
import AdminLayout from './layouts/AdminLayout'
import RequireAuth from './components/RequireAuth'
import RequireAdmin from './components/RequireAdmin'

// Auth pages
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

// Shopping pages
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

// Profile pages
import PersonalInfo from './pages/user/profile/PersonalInfo'
import Addresses from './pages/user/profile/Addresses'
import Reviews from './pages/user/profile/Reviews'
import Referral from './pages/user/profile/Referral'
import Questions from './pages/user/profile/Questions'
import ProfileOrders from './pages/user/profile/Orders'
import OrderDetails from './pages/user/profile/OrderDetails'
import Wishlist from './pages/user/profile/Wishlist'
import Wallet from './pages/user/profile/Wallet'
import WalletAddMoney from './pages/user/profile/WalletAddMoney'

// Info & error pages
import Brands from './pages/user/Brands'
import Deals from './pages/user/Deals'
import Support from './pages/user/Support'
import SomethingWrong from './pages/user/SomethingWrong'
import FeatureNotAvailable from './pages/user/FeatureNotAvailable'
import NotFound from './pages/user/NotFound'

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminProducts from './pages/admin/Products'
import AdminCategories from './pages/admin/Categories'
import AdminBrands from './pages/admin/Brands'
import AdminOrders from './pages/admin/Orders'
import AdminOrderDetails from './pages/admin/OrderDetails'

export default function App() {
  return (
    <Routes>
      {/* Main site — navbar + footer */}
      <Route element={<UserLayout />}>
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

        <Route path="/brands" element={<Brands />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/support" element={<Support />} />
        <Route path="/error" element={<SomethingWrong />} />
        <Route path="/unavailable" element={<FeatureNotAvailable />} />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfileLayout />
            </RequireAuth>
          }
        >
          <Route index element={<PersonalInfo />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="referral" element={<Referral />} />
          <Route path="questions" element={<Questions />} />
          <Route path="orders" element={<ProfileOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/add" element={<WalletAddMoney />} />
        </Route>
      </Route>

      {/* Auth pages — centered card, no navbar/footer */}
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

      {/* Admin panel */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="brands" element={<AdminBrands />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetails />} />
      </Route>

      {/* 404 — must stay last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}