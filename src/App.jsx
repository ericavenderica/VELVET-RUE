import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ProductList from './pages/ProductList';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UserProfile from './pages/UserProfile';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Delivery from './pages/Delivery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Error from './pages/Error';

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
        {/* Main Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* Error Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
    </ShopProvider>
  );
}

export default App;
