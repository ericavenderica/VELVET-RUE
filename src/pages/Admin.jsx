import { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const Admin = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    growth: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch Orders
        const ordersRes = await fetch('/api/orders');
        const orders = await ordersRes.json();
        
        //fetch Users
        const usersRes = await fetch('/api/users');
        const users = await usersRes.json();

        // calculate revenue
        const revenue = orders.reduce((sum, order) => {
          const amount = parseFloat(order.total.replace('$', ''));
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0);

        //calculate growth (Mock logic: compare vs "last month" hardcoded or derived)
        const growth = 12.5;

        setStats({
          revenue: revenue,
          orders: orders.length,
          users: users.length,
          growth: growth
        });

        //recent activity: combine new orders and new users
        const recentOrders = orders
          .map(o => {
            return {
              id: `order-${o.id}`,
              type: 'Order',
              user: o.customer, 
              action: `placed an order for ${o.total}`,
              time: o.date, 
              timestamp: new Date(o.date).getTime()
            };
          });
        
        const activity = [...recentOrders].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
        setRecentActivity(activity);

      } catch (error) {
        console.error("Failed to fetch admin data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Total Revenue</p>
              <h3 className="stat-value">${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="stat-icon-bg bg-green-100 text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
          <p className="stat-trend text-green-600">
            <TrendingUp size={16} /> +{stats.growth}% from last month
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Total Orders</p>
              <h3 className="stat-value">{stats.orders}</h3>
            </div>
            <div className="stat-icon-bg bg-blue-100 text-blue-600">
              <ShoppingBag size={24} />
            </div>
          </div>
          <p className="stat-trend text-blue-600">
            +5 new today
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Total Users</p>
              <h3 className="stat-value">{stats.users}</h3>
            </div>
            <div className="stat-icon-bg bg-purple-100 text-purple-600">
              <Users size={24} />
            </div>
          </div>
          <p className="stat-trend text-purple-600">
            +3 new this week
          </p>
        </div>
      </div>

      <div className="dashboard-widget">
        <h2 className="widget-title">Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.length > 0 ? (
            recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <div className={`activity-icon-wrap ${item.type === 'Order' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                  {item.type === 'Order' ? <ShoppingBag size={20} /> : <Users size={20} />}
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <span className="activity-highlight">{item.user}</span> {item.action}
                  </p>
                  <p className="activity-time">{item.time}</p>
                </div>
              </div>
            ))
          ) : (
             <p className="text-gray-500">No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
