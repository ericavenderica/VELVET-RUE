const Delivery = () => {
  return (
    <div className="info-page-container">
      <div className="info-header">
        <h1 className="info-title">Delivery Information</h1>
        <div className="info-divider"></div>
      </div>

      <div className="space-y-12">
        {/* section 1 */}
        <section className="info-section">
          <h2 className="info-section-title">Shipping Policy</h2>
          <p className="info-text">
            At Velvet Rue, we strive to deliver your products as quickly and safely as possible. 
            We currently ship to over 50 countries worldwide. All orders are processed within 1-2 business days.
          </p>
          <p className="info-text">
            Once your order has been shipped, you will receive a confirmation email with a tracking number 
            so you can monitor your package's journey to your doorstep.
          </p>
        </section>

        {/* section 2 */}
        <section className="info-section">
          <h2 className="info-section-title">Delivery Times & Costs</h2>
          <div className="info-table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Estimated Time</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>United States</td>
                  <td>3-5 Business Days</td>
                  <td>$10.00 (Free over $100)</td>
                </tr>
                <tr>
                  <td>Europe</td>
                  <td>5-10 Business Days</td>
                  <td>$15.00</td>
                </tr>
                <tr>
                  <td>Rest of World</td>
                  <td>10-15 Business Days</td>
                  <td>$25.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* section 3 */}
        <section className="info-section">
          <h2 className="info-section-title">Returns & Exchanges</h2>
          <p className="info-text">
            We want you to love your purchase. If you are not completely satisfied, you may return items 
            within 30 days of delivery for a full refund or exchange. Please ensure the items are 
            unused and in their original packaging.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Delivery;
