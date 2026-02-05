const PrivacyPolicy = () => {
  return (
    <div className="info-page-container">
      <div className="info-header">
        <h1 className="info-title">Privacy Policy</h1>
        <div className="info-divider"></div>
        <p className="info-last-updated">Last updated: February 2026</p>
      </div>

      <div className="info-spacer">
        <section className="info-section">
          <h2 className="info-section-title">1. Information We Collect</h2>
          <p className="info-text">
            We collect information you provide directly to us, such as when you create an account, make a purchase, 
            sign up for our newsletter, or contact us for support. This may include your name, email address, 
            billing and shipping address, phone number, and payment information.
          </p>
          <p className="info-text">
            We also automatically collect certain information about your device and how you interact with our website, 
            such as your IP address, browser type, and pages visited.
          </p>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">2. How We Use Your Information</h2>
          <p className="info-text">
            We use the information we collect to:
          </p>
          <ul className="privacy-list">
            <li>Process your orders and payments</li>
            <li>Communicate with you about your account and orders</li>
            <li>Send you marketing communications (if you opt-in)</li>
            <li>Improve our website and customer service</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">3. Security</h2>
          <p className="info-text">
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized 
            access, disclosure, alteration and destruction.
          </p>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">4. Cookies</h2>
          <p className="info-text">
            We use cookies and similar technologies to collect information about your browsing activities and to 
            improve your experience on our website. You can control cookies through your browser settings.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
