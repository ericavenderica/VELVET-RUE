import { useState, useEffect } from 'react';
import { Trash2, Edit, X } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: 'Customer', status: 'Active' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      //ensure status exists
      const usersWithStatus = data.map(u => ({ ...u, status: u.status || 'Active' }));
      setUsers(usersWithStatus);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Failed to load users');
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id));
      showNotification('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Failed to delete user');
    }
  };

  const openAddModal = () => {
    setCurrentUser({ name: '', email: '', role: 'Customer', status: 'Active' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/users/${currentUser.id}` : '/api/users';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUser)
      });

      if (response.ok) {
        showNotification(isEditing ? 'User updated successfully' : 'User added successfully');
        setIsModalOpen(false);
        fetchUsers();
      } else {
        showNotification('Operation failed');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      showNotification('Error saving user');
    }
  };

  return (
    <div>
      {notification && (
        <div className="notification-toast">
          {notification}
        </div>
      )}
      
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="modal-close-btn"
            >
              <X size={20} />
            </button>
            <h2 className="modal-title">{isEditing ? 'Edit User' : 'Add New User'}</h2>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-input-admin"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input-admin"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select 
                  className="form-input-admin"
                  value={currentUser.role}
                  onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select 
                  className="form-input-admin"
                  value={currentUser.status}
                  onChange={(e) => setCurrentUser({...currentUser, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <button type="submit" className="btn-black mt-2">
                {isEditing ? 'Save Changes' : 'Add User'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="admin-page-header">
        <h1 className="page-title">User Management</h1>
        <button className="btn-black" onClick={openAddModal}>Add User</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead className="admin-table-head">
            <tr>
              <th className="admin-th">Name</th>
              <th className="admin-th">Email</th>
              <th className="admin-th">Role</th>
              <th className="admin-th">Status</th>
              <th className="admin-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="admin-tr">
                <td className="admin-td admin-td-medium">{user.name}</td>
                <td className="admin-td admin-td-muted">{user.email}</td>
                <td className="admin-td">
                  <span className={`status-badge ${user.role?.toLowerCase() === 'admin' ? 'badge-purple' : 'badge-gray'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="admin-td">
                  <span className={`status-badge ${user.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="admin-td text-right">
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit"
                      onClick={() => openEditModal(user)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
