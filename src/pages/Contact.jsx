
const Contact = () => {
  return (
    <div className="contact-container">
      <section className="section-heading">
        <div className="heading-text heading-line">
          CONTACT <span>US</span>
        </div>
      </section>

      <div className="contact-layout">
        <div className="contact-image-section">
          <img 
            src="/assets/contact_hero.jpg" 
            alt="Contact Us" 
            className="about-img"
          />
        </div>
        <div className="contact-info-section">
          <div>
            <h3 className="contact-store-title">Our Store</h3>
            <div className="contact-address-block">
              <p className="contact-address-line">29348 Cascais Station,</p>
              <p className="contact-address-line">Suite 140, Lisbon, Portugal</p>
            </div>
            <p>Email: admin@velvetrue.com</p>
          </div>

        </div>
      </div>

      <section className="newsletter-section">
        <h3 className="newsletter-title">Subscribe now & get 10% off</h3>
        <p className="newsletter-desc">
          Stay updated with our latest collections, exclusive offers, and beauty tips.
        </p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" className="newsletter-input" />
          <button className="newsletter-btn">SUBSCRIBE</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
