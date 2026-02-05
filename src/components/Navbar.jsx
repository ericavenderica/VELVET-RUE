import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { getCartCount, wishlistItems, search, setSearch } = useContext(ShopContext);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={scrollToTop}>
          <span>VELVET</span>
          <span>RUE<span className="logo-dot">.</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul className="nav-menu-list">
            <li><NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={scrollToTop}>HOME</NavLink></li>
            <li><NavLink to="/products" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={scrollToTop}>COLLECTION</NavLink></li>
            <li><NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={scrollToTop}>ABOUT</NavLink></li>
            <li><NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={scrollToTop}>CONTACT</NavLink></li>
          </ul>
          <Link to="/admin" className="admin-pill" onClick={scrollToTop}>Admin Panel</Link>
        </div>

        {/* Icons */}
        <div className="nav-icons">
          {showSearch ? (
            <div className="search-container">
               <input 
                  type="text" 
                  placeholder="Search..." 
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                      if(e.key === 'Enter') {
                          navigate('/products');
                          setShowSearch(false);
                      }
                  }}
                  autoFocus
               />
               <X size={16} className="search-close-icon" onClick={() => setShowSearch(false)} />
            </div>
          ) : (
            <Search size={20} className="nav-icon" onClick={() => setShowSearch(true)} />
          )}
          
          <Link to="/profile"><User size={20} className="nav-icon" /></Link>
          <Link to="/wishlist" className="nav-icon-link">
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="cart-badge">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingBag size={20} className="nav-icon" />
            <span className="cart-count">{getCartCount()}</span>
          </Link>
          <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             <Menu className="nav-icon" />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-inner">
          <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
          <ul className="mobile-nav-list">
            <li><NavLink to="/" className="mobile-nav-link" onClick={scrollToTop}>HOME</NavLink></li>
            <li><NavLink to="/products" className="mobile-nav-link" onClick={scrollToTop}>COLLECTION</NavLink></li>
            <li><NavLink to="/about" className="mobile-nav-link" onClick={scrollToTop}>ABOUT</NavLink></li>
            <li><NavLink to="/contact" className="mobile-nav-link" onClick={scrollToTop}>CONTACT</NavLink></li>
            <li><NavLink to="/admin" className="mobile-nav-link" onClick={scrollToTop}>ADMIN PANEL</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;