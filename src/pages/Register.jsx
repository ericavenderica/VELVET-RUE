import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import API_URL from '../config';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Check if user already exists
      const checkRes = await fetch(`${API_URL}/api/users?email=${formData.email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        setError('An account with this email already exists. Please login.');
        return;
      }

      // 2. Create new user
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password, // In a real app, hash this!
        role: 'customer',
        status: 'Active'
      };

      const createRes = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (createRes.ok) {
        //auto-login after register
        localStorage.setItem('customerToken', 'valid-customer');
        localStorage.setItem('userId', (await createRes.json()).id); // Store ID for order association
        navigate('/profile');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="customer-login-card">
        {/* Title */}
        <div className="login-header">
          <h2 className="login-title-text">
            Create Account
          </h2>
          <span className="login-divider">—</span>
        </div>
        
        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="form-input"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="login-links" style={{ justifyContent: 'center' }}>
            <Link to="/login" className="login-link">Already have an account? Login</Link>
          </div>

          <button 
            type="submit" 
            className="btn-signin"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
