import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" onClick={scrollToTop}>
            VELVET RUE<span className="logo-dot">.</span>
          </Link>
          <p className="footer-desc">
            Premium beauty products designed to enhance your natural radiance. 
            Cruelty-free, sustainable, and crafted with care.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">COMPANY</h4>
          <ul className="footer-links">
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/about" onClick={scrollToTop}>About us</Link></li>
            <li><Link to="/delivery" onClick={scrollToTop}>Delivery</Link></li>
            <li><Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">GET IN TOUCH</h4>
          <ul className="footer-links">
            <li><a href="mailto:support@velvetrue.com">support@velvetrue.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>Copyright 2026@ velvetrue.com - All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;