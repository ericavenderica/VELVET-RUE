import { useState, useEffect } from 'react';
import { User, Bell, Shield, Check } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notification, setNotification] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        name: data.name,
                        email: data.email
                    });
                }
            } catch (error) {
                console.error("Error fetching user settings", error);
            }
        }
    };
    fetchUser();
  }, []);

  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: false
  });

  const handleSave = () => {
    setNotification('Settings saved successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Account Settings</h1>
        <p className="settings-subtitle">Manage your profile preferences and security settings.</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            >
              <User size={18} /> Profile Information
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`settings-nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            >
              <Bell size={18} /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`settings-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
            >
              <Shield size={18} /> Security
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="settings-content">
          {notification && (
            <div className="settings-success-msg">
              <Check size={16} /> {notification}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="settings-section-title">Profile Information</h2>
              <div className="settings-form-group">
                <label className="settings-label">Full Name</label>
                <input 
                  type="text" 
                  className="settings-input"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div className="settings-form-group">
                <label className="settings-label">Email Address</label>
                <input 
                  type="email" 
                  className="settings-input"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
              <button className="btn-black" onClick={handleSave}>Save Changes</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="settings-section-title">Notification Preferences</h2>
              <div className="settings-toggle-row">
                <div className="settings-toggle-info">
                  <h4>Order Updates</h4>
                  <p>Receive emails about your order status and delivery.</p>
                </div>
                <div 
                  className={`toggle-switch ${notifications.orders ? 'active' : ''}`}
                  onClick={() => setNotifications(prev => ({...prev, orders: !prev.orders}))}
                >
                  <div className="toggle-dot"></div>
                </div>
              </div>
              <div className="settings-toggle-row">
                <div className="settings-toggle-info">
                  <h4>Promotions & Offers</h4>
                  <p>Receive emails about new products and sales.</p>
                </div>
                <div 
                  className={`toggle-switch ${notifications.promotions ? 'active' : ''}`}
                  onClick={() => setNotifications(prev => ({...prev, promotions: !prev.promotions}))}
                >
                  <div className="toggle-dot"></div>
                </div>
              </div>
              <div className="margin-top-6">
                 <button className="btn-black" onClick={handleSave}>Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="settings-section-title">Security Settings</h2>
              <div className="settings-form-group">
                <label className="settings-label">Current Password</label>
                <input type="password" className="settings-input" placeholder="••••••••" />
              </div>
              <div className="settings-form-group">
                <label className="settings-label">New Password</label>
                <input type="password" className="settings-input" placeholder="••••••••" />
              </div>
              <div className="settings-form-group">
                <label className="settings-label">Confirm New Password</label>
                <input type="password" className="settings-input" placeholder="••••••••" />
              </div>
              <button className="btn-black" onClick={handleSave}>Update Password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
