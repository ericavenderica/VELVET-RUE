import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import API_URL from '../config';

const Products = () => {
  const { id } = useParams();
  const { addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '4rem 1rem' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '4rem 1rem' }}>Product not found</div>;

  return (
    <div className="product-detail-container">
      {notification && (
        <div className="notification-toast">
          {notification}
        </div>
      )}
      <div className="product-detail-layout">
        {/* Image */}
        <div className="product-detail-image-section">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-detail-img"
          />
        </div>

        {/* Info */}
        <div className="product-detail-info-section">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price-large">${product.price}</p>
          <p className="product-description">
            {product.description}
          </p>
          
          <div className="product-category">
            <span className="category-label">Category:</span>
            <span className="category-value">{product.category}</span>
          </div>

          <div className="product-actions">
            <button 
              className="btn-black"
              onClick={() => {
                addToCart(product);
                setNotification('Product added to cart!');
                setTimeout(() => setNotification(''), 3000);
              }}
            >
              ADD TO CART
            </button>
          </div>
          
          <div className="product-policy">
            <p className="policy-text">100% Original Product.<br/>Cash on delivery is available on this product.<br/>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
