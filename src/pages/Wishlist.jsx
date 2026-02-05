import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(ShopContext);

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-subtitle">Save your favorite items for later</p>
      </div>
      
      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is currently empty.</p>
          <Link to="/products" className="wishlist-empty-link">Start Shopping</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <div key={product.id} className="wishlist-card group">
              <Link to={`/products/${product.id}`}>
                <div className="wishlist-img-wrap">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="wishlist-img"
                  />
                </div>
              </Link>
              
              <div className="wishlist-details">
                <Link to={`/products/${product.id}`}>
                   <h3 className="wishlist-product-name">{product.name}</h3>
                </Link>
                <p className="wishlist-product-price">${product.price}</p>
                
                <div className="wishlist-actions">
                  <button 
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="btn-wishlist-cart"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="btn-wishlist-remove"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Wishlist;
