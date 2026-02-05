import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
