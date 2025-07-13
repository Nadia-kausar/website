import React from 'react';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-sections">
        <div className="footer-block">
          <h4>About ShopEasy</h4>
          <p>ShopEasy is your one-stop online marketplace, offering a wide range of quality products at amazing prices.</p>
        </div>

        <div className="footer-block">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">How to Buy</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-block">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-block">
          <h4>Connect With Us</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 ShopEasy - All Rights Reserved</p>
        <p>Powered by ShopEasy Tech</p>
      </div>

      <style>{`
        .custom-footer {
          background: #fff;
          color: #333;
          font-family: 'Poppins', sans-serif;
          padding: 2rem 1rem;
          text-align: center;
        }

        .footer-sections {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .footer-block {
          max-width: 300px;
        }

        .footer-block h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #111;
        }

        .footer-block p {
          font-size: 0.95rem;
          color: #555;
        }

        .footer-block ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-block li {
          margin: 0.3rem 0;
        }

        .footer-block a {
          color: #555;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .footer-block a:hover {
          color: #007bff;
        }

        .footer-bottom {
          border-top: 1px solid #ddd;
          padding-top: 1rem;
          font-size: 0.85rem;
          color: #777;
        }

        @media (min-width: 768px) {
          .footer-sections {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            text-align: left;
            flex-wrap: wrap;
          }

          .footer-block {
            max-width: none;
            width: 220px;
          }

          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;