import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import API_URL from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. fetch user by email
      const response = await fetch(`${API_URL}/api/users?email=${email}`);
      const users = await response.json();

      if (users.length === 0) {
        setError('Account not found. Please register first.');
        return;
      }

      const user = users[0];

      // 2. validate password 
      if (user.password !== password) {
        setError('Invalid password. Please try again.');
        return;
      }

      // 3. handle successful login
      if (user.role === 'admin') {
        localStorage.setItem('customerToken', 'valid-admin'); 
        navigate('/admin');
      } else {
        localStorage.setItem('customerToken', 'valid-customer');
        localStorage.setItem('userId', user.id);
        navigate('/profile');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="customer-login-card">
        {/* Title */}
        <div className="login-header">
          <h2 className="login-title-text">
            Login
          </h2>
          <span className="login-divider">—</span>
        </div>

        {error && <div className="error-message-text">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="email" 
            placeholder="Email" 
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="login-links">
            <Link to="/forgot-password" className="login-link">Forgot your password?</Link>
            <Link to="/register" className="login-link">Create account</Link>
          </div>

          <button 
            type="submit" 
            className="btn-signin"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
