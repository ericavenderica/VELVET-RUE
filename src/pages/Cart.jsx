import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import API_URL from '../config';

const Cart = () => {
  const { cartItems, clearCart } = useContext(ShopContext);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const shippingFee = cartItems.length > 0 ? 10.00 : 0;
  const total = subtotal + shippingFee;

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('customerToken');
    const userId = localStorage.getItem('userId');
    
    if (!token) {
      showNotification('You must be logged in to purchase.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (cartItems.length === 0) {
      showNotification('Your cart is empty.');
      return;
    }

    let customerName = "Valued Customer";
  
    if (userId) {
        try {
            const userRes = await fetch(`${API_URL}/api/users/${userId}`);
            if (userRes.ok) {
                const userData = await userRes.json();
                customerName = userData.name;
            }
        } catch (e) {
            console.error("Could not fetch user name for order", e);
        }
    }

    //create order object
    const order = {
      userId: userId || "unknown", 
      customer: customerName,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      total: `$${total.toFixed(2)}`,
      status: "Pending",
      items: cartItems.length,
      //store actual item details
      orderItems: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl
      }))
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (response.ok) {
        clearCart();
        showNotification('Order placed successfully!');
      } else {
        showNotification('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      showNotification('An error occurred during checkout.');
    }
  };

  return (
    <div className="cart-page-container">
      {notification && (
        <div className="notification-toast">
          {notification}
        </div>
      )}
      
      <div className="cart-header">
        <h2 className="section-title-large">
          <span className="title-light">YOUR</span>
          <span className="title-highlight">CART</span>
          <span className="title-line"></span>
        </h2>
      </div>

      <div className="cart-layout">

        <div className="cart-items-section">
           {cartItems.length === 0 ? (
             <p className="cart-empty-text">Your cart is currently empty.</p>
           ) : (
             <div className="cart-items-list">
               {cartItems.map((item, index) => (
                 <div key={index} className="cart-item-row">
                   <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                   <div className="cart-item-info">
                     <h3>{item.name}</h3>
                     <p className="cart-item-price">${item.price}</p>
                   </div>
                 </div>
               ))}
               <button 
                 onClick={() => {
                   clearCart();
                 }}
                 className="clear-cart-btn"
               >
                 Clear Cart
               </button>
             </div>
           )}
        </div>


        <div className="cart-totals-section">
          <div className="totals-header">
            <h2 className="section-title-medium">
              <span className="title-light">CART</span>
              <span className="title-highlight">TOTALS</span>
              <span className="title-line"></span>
            </h2>
          </div>

          <div className="cart-summary-col">
            <div className="totals-row">
              <span className="totals-label">Subtotal</span>
              <span className="totals-value">$ {subtotal.toFixed(2)}</span>
            </div>
            
            <div className="totals-row">
              <span className="totals-label">Shipping Fee</span>
              <span className="totals-value">$ {shippingFee.toFixed(2)}</span>
            </div>

            <div className="totals-row final">
              <span className="totals-value bold">Total</span>
              <span className="totals-value bold">$ {cartItems.length > 0 ? total.toFixed(2) : '0.00'}</span>
            </div>

            <div className="checkout-btn-container">
              <button 
                onClick={handleCheckout}
                className="btn-checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
