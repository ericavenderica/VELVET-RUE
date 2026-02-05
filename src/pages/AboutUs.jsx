import { useState } from 'react';

const AboutUs = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {

      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="about-page-container">
      <section className="section-heading">
        <div className="heading-text heading-line">
          ABOUT <span>US</span>
        </div>
      </section>

      <div className="about-layout">
        <div className="about-image-section">
          <img 
            src="/assets/about_hero.jpg" 
            alt="About Us" 
            className="about-img"
          />
        </div>
        <div className="about-content-section">
          <p>
            Velvet Rue was born out of a passion for innovation and a desire to revolutionize the way people shop for beauty products online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of artistic makeup from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From bold colors and artistic palettes to everyday essentials, we offer an extensive collection sourced from trusted suppliers.
          </p>
          <div>
            <h3 className="about-mission-title">Our Mission</h3>
            <p>
              Our mission at Velvet Rue is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      <section className="section-heading-left">
        <div className="heading-text heading-line heading-text-start">
          WHY <span>CHOOSE US</span>
        </div>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <h4 className="feature-title">Quality Assurance:</h4>
          <p className="feature-desc">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="feature-card">
          <h4 className="feature-title">Convenience:</h4>
          <p className="feature-desc">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="feature-card">
          <h4 className="feature-title">Exceptional Customer Service:</h4>
          <p className="feature-desc">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

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

export default AboutUs;
