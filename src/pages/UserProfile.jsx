import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Package, MapPin, LogOut } from 'lucide-react';
import API_URL from '../config';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const userRes = await fetch(`${API_URL}/api/users/${userId}`);
          if (userRes.ok) {
            setUser(await userRes.json());
          }

          const ordersRes = await fetch(`${API_URL}/api/orders?userId=${userId}`);
          if (ordersRes.ok) {
            setOrders(await ordersRes.json());
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  //simple auth check
  const isAuthenticated = localStorage.getItem('customerToken');

  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <div className="profile-login-prompt">
          <h1 className="profile-login-title">Account Access</h1>
          <p className="profile-login-desc">Please log in to view your profile and order history.</p>
          <div className="profile-login-actions">
            <Link to="/login" className="btn-black">Log In</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="profile-container text-center py-20">Loading profile...</div>;
  }

  if (!user) {
    return <div className="profile-container text-center py-20">User not found. <button onClick={handleLogout} className="underline">Logout</button></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="profile-content">
        {/* Sidebar / Info Card */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar-area">
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full text-gray-600">
                {user.role || 'Customer'}
              </span>
            </div>
            
            <div className="space-y-3 mt-6 pt-6 border-t border-gray-100">
              <Link to="/orders" className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                <Package size={18} /> My Orders
              </Link>
              <Link to="/settings" className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                <MapPin size={18} /> Addresses
              </Link>
            </div>
          </div>
        </div>

        {/* Main Details */}
        <div className="flex-1">
          <div className="profile-card mb-6">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Account Details</h3>
            <div className="profile-info-grid">
              <div>
                <label className="profile-field-label">Full Name</label>
                <p className="profile-field-value">{user.name}</p>
              </div>
              <div>
                <label className="profile-field-label">Email Address</label>
                <p className="profile-field-value">{user.email}</p>
              </div>
              <div>
                <label className="profile-field-label">Member Since</label>
                <p className="profile-field-value">{user.joined || 'January 2026'}</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
             <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <h3 className="text-lg font-bold">Recent Orders</h3>
                <Link to="/orders" className="text-sm underline text-gray-500 hover:text-black">View All</Link>
             </div>
             <p className="text-gray-500 text-sm">No recent orders found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
