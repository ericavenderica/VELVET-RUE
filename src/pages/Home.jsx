import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCcw, CheckCircle, Headphones } from 'lucide-react';

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setLatestProducts(data.slice(0, 5));
        setBestSellers(data.filter(p => p.bestseller).slice(0, 5));
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {

      setSubscribed(true);
      setEmail('');
    }
  };

  const ProductCard = ({ product }) => (
    <Link to={`/products/${product.id}`} className="product-item">
      <div className="product-img-wrap">
        <img src={product.imageUrl} alt={product.name} className="product-img" />
      </div>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price}</p>
    </Link>
  );

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-label">
            OUR BESTSELLERS
          </div>
          <h1 className="hero-title">Latest Arrivals</h1>
          <Link to="/products" className="hero-link">
            SHOP NOW
          </Link>
        </div>
        <div className="hero-right">
          <img 
            src="/assets/hero.jpg" 
            alt="Makeup Model" 
            className="hero-img"
          />
        </div>
      </section>

      {/* Latest Collections */}
      <section className="section-heading">
        <div className="heading-text heading-line">
          LATEST <span>COLLECTIONS</span>
        </div>
        <p className="heading-desc">
          Discover our newest makeup releases designed to enhance your natural beauty.
        </p>
      </section>
      
      <div className="product-grid mb-16">
        {latestProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Best Sellers */}
      <section className="section-heading">
        <div className="heading-text">
          BEST <span>SELLERS</span>
        </div>
        <p className="heading-desc">
          Our most loved products, chosen by you.
        </p>
      </section>
      
      <div className="product-grid mb-16">
        {bestSellers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Policy Section */}
      <section className="policy-section">
        <div className="policy-item">
          <RefreshCcw size={32} className="mb-4" />
          <h4 className="policy-title">Easy Exchange Policy</h4>
          <p className="policy-desc">We offer hassle free exchange policy</p>
        </div>
        <div className="policy-item">
          <CheckCircle size={32} className="mb-4" />
          <h4 className="policy-title">7 Days Return Policy</h4>
          <p className="policy-desc">We provide 7 days free return policy</p>
        </div>
        <div className="policy-item">
          <Headphones size={32} className="mb-4" />
          <h4 className="policy-title">Best customer support</h4>
          <p className="policy-desc">we provide 24/7 customer support</p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <h3 className="newsletter-title">Subscribe now & get 10% off</h3>
        <p className="newsletter-desc">
          Stay updated with our latest collections, exclusive offers, and beauty tips.
        </p>
        
        {subscribed ? (
          <div className="newsletter-success">
            Thank you for subscribing! Check your email for your 10% off code.
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="newsletter-btn">SUBSCRIBE</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Home;
