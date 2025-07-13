import React from 'react';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-sections">
        <div className="footer-block">
          <h4>About ShopEasy</h4>
          <p>
            ShopEasy is your one-stop online marketplace, offering a wide range of quality
            products at amazing prices.
          </p>
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
        <p>© 2025 ShopEasy — All Rights Reserved</p>
        <p>Powered by ShopEasy Tech</p>
      </div>

      <style>{`
        .custom-footer {
          background: #000;
          color: #fff;
          font-family: 'Poppins', sans-serif;
          padding: 2rem 1rem;
        }

        .footer-sections {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-block {
          max-width: 300px;
          text-align: center;
        }

        .footer-block h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .footer-block p,
        .footer-block a {
          font-size: 0.95rem;
          color: #ccc;
          transition: color 0.3s ease;
        }

        .footer-block ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-block li {
          margin: 0.4rem 0;
        }

        .footer-block a {
          text-decoration: none;
        }

        .footer-block a:hover {
          color: #1e90ff;
        }

        .footer-bottom {
          border-top: 1px solid #444;
          padding-top: 1rem;
          font-size: 0.85rem;
          color: #999;
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-sections {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            text-align: left;
          }

          .footer-block {
            max-width: none;
            width: 220px;
            text-align: left;
          }

          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
