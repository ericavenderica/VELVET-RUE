import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="customer-login-card">

        <div className="login-header">
          <h2 className="login-title-text">
            Reset Password
          </h2>
          <span className="login-divider">—</span>
        </div>

        {submitted ? (
          <div className="text-center">
            <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
              If an account exists for <strong>{email}</strong>, we have sent password reset instructions.
            </div>
            <Link to="/login" className="btn-signin" style={{ display: 'inline-block', width: 'auto' }}>
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <p className="text-gray-600 text-center mb-4 text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <input 
              type="email" 
              placeholder="Email" 
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <div className="login-links" style={{ justifyContent: 'center' }}>
              <Link to="/login" className="login-link">Back to Login</Link>
            </div>

            <button 
              type="submit" 
              className="btn-signin"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
