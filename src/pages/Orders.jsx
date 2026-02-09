import { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import API_URL from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('customerToken');
        
        let url = `${API_URL}/api/orders`;

        if (token !== 'valid-admin' && userId) {
             url += `?userId=${userId}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const filteredData = (token !== 'valid-admin' && userId) 
            ? data.filter(order => order.userId === userId)
            : data;

        setOrders(filteredData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'badge-green';
      case 'shipped': return 'badge-blue';
      case 'pending': return 'badge-yellow';
      case 'processing': return 'badge-purple';
      case 'cancelled': return 'badge-red';
      default: return 'badge-gray';
    }
  };

  return (
    <div>
      <h1 className="page-title">Orders</h1>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedOrder(null)}
              className="modal-close-btn"
            >
              <X size={20} />
            </button>
            
            <div className="order-modal-header">
              <h2 className="order-id-title">Order Details #{selectedOrder.id}</h2>
              <p className="order-date-text">Placed on {selectedOrder.date}</p>
            </div>

            <div className="order-info-grid">
              <div>
                <h3 className="order-info-label">Customer</h3>
                <p className="order-info-value">{selectedOrder.customer}</p>
                <p className="order-info-subtext">customer@example.com</p>
              </div>
              <div className="text-right">
                <h3 className="order-info-label">Status</h3>
                <select 
                  className={`status-badge border-none outline-none cursor-pointer ${getStatusColor(selectedOrder.status)}`}
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="order-summary-box">
              <h3 className="order-info-label">Order Summary</h3>
              
              {/* Items List */}
              <div className="order-items-list">
                {selectedOrder.orderItems && selectedOrder.orderItems.length > 0 ? (
                  selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className="order-item-row">
                      <div className="order-item-thumb">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="order-item-img" 
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=No+Img'; }}
                        />
                      </div>
                      <div className="order-item-details">
                        <p className="order-item-name">{item.name}</p>
                        <p className="order-item-price">${item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No item details available.</p>
                )}
              </div>

              <div className="order-cost-row" style={{ paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
                <span>Items ({selectedOrder.items})</span>
                <span>-</span>
              </div>
              <div className="order-cost-row">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="order-total-row">
                <span>Total</span>
                <span>{selectedOrder.total}</span>
              </div>
            </div>

            <div className="order-modal-actions">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="btn-secondary"
              >
                Close
              </button>
              <button className="btn-black text-sm">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead className="admin-table-head">
            <tr>
              <th className="admin-th">Order ID</th>
              <th className="admin-th">Customer</th>
              <th className="admin-th">Date</th>
              <th className="admin-th">Items</th>
              <th className="admin-th">Total</th>
              <th className="admin-th">Status</th>
              <th className="admin-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="p-4 text-center">Loading orders...</td></tr>
            ) : orders.map((order) => (
              <tr key={order.id} className="admin-tr">
                <td className="admin-td font-medium">#{order.id}</td>
                <td className="admin-td">{order.customer}</td>
                <td className="admin-td text-gray-500">{order.date}</td>
                <td className="admin-td">
                  <span title={order.orderItems?.map(i => i.name).join(', ')}>
                    {order.items} items
                  </span>
                </td>
                <td className="admin-td font-medium">{order.total}</td>
                <td className="admin-td">
                  <select 
                    className={`status-badge border-none outline-none cursor-pointer appearance-none ${getStatusColor(order.status)}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="admin-td text-right">
                  <button 
                    className="action-btn text-blue-600 hover:bg-blue-50"
                    onClick={() => setSelectedOrder(order)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
