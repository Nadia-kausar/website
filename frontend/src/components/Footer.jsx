import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#000000',
      color: '#ffffff',
      marginTop: 'auto',
      width: '100%',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 1rem 2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    footerSection: {
      marginBottom: '1rem',
    },
    footerSectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#ffffff',
    },
    footerText: {
      color: '#cccccc',
      lineHeight: '1.6',
      marginBottom: '1rem',
    },
    footerLinks: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    footerLinkItem: {
      marginBottom: '0.5rem',
    },
    footerLink: {
      color: '#cccccc',
      textDecoration: 'none',
      display: 'block',
      padding: '0.25rem 0',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
    },
    footerLinkHover: {
      color: '#ffffff',
    },
    footerBottom: {
      borderTop: '1px solid #333333',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    footerBottomText: {
      color: '#888888',
      fontSize: '0.9rem',
      margin: '0',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h3 style={styles.footerSectionTitle}>ShopEasy</h3>
          <p style={styles.footerText}>Your trusted online shopping destination</p>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerSectionTitle}>Quick Links</h4>
          <ul style={styles.footerLinks}>
            <li style={styles.footerLinkItem}>
              <a href="#" style={styles.footerLink}>Privacy Policy</a>
            </li>
            <li style={styles.footerLinkItem}>
              <a href="#" style={styles.footerLink}>Terms of Service</a>
            </li>
            <li style={styles.footerLinkItem}>
              <a href="#" style={styles.footerLink}>Shipping Info</a>
            </li>
            <li style={styles.footerLinkItem}>
              <a href="#" style={styles.footerLink}>Returns</a>
            </li>
          </ul>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerSectionTitle}>Customer Service</h4>
          <p style={styles.footerText}>Email: support@shopeasy.com</p>
          <p style={styles.footerText}>Phone: 1-800-SHOP-EASY</p>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p style={styles.footerBottomText}>&copy; 2025 ShopEasy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
