import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, Package } from 'lucide-react';
import AdminLogin from '../pages/AdminLogin';

const AdminLayout = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'valid-admin-token') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('adminToken', 'valid-admin-token');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/orders', icon: Package, label: 'Orders' },
  ];

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo-area">
          <Link to="/" className="navbar-logo" style={{ fontSize: '1.5rem' }}>
            VELVET RUE<span className="logo-dot" style={{ fontSize: '2rem' }}>.</span>
          </Link>
          <p className="admin-label">ADMIN PANEL</p>
        </div>
        
        <nav className="admin-nav-list">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="admin-main-wrapper">
        <header className="admin-header">
          <div className="admin-header-actions">
            <span className="admin-user-label">Admin</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <main className="admin-content overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
