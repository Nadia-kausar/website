import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
    if (isMobile) setMenuOpen(false);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    if (isMobile) setMenuOpen(false);
  };

  const navButtonStyle = (active) => ({
    backgroundColor: active ? '#fff' : 'transparent',
    color: active ? '#000' : '#fff',
    border: '1px solid #fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'left' : 'center',
    fontSize: '1rem',
  });

  const navLinks = (
    <>
      {['home', 'products', 'about', 'cart', 'myorder'].map((page) => (
        <button
          key={page}
          onClick={() => handleNavClick(page)}
          style={navButtonStyle(currentPage === page)}
        >
          {page === 'cart'
            ? `Cart (${cartCount})`
            : page.charAt(0).toUpperCase() + page.slice(1)}
        </button>
      ))}

      {isAuthenticated && (
        <button
          onClick={() => handleNavClick('adminDashboard')}
          style={navButtonStyle(currentPage === 'adminDashboard')}
        >
          Dashboard
        </button>
      )}

      <button
        onClick={handleLogout}
        style={navButtonStyle(false)}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </>
  );

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <div
          style={styles.logo}
          onClick={() => handleNavClick('home')}
        >
          ShopEasy
        </div>

        {/* Hamburger Menu */}
        {isMobile && (
          <div onClick={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
            <div style={styles.line} />
            <div style={styles.line} />
            <div style={styles.line} />
          </div>
        )}

        {/* Navigation Links */}
        <div
          style={{
            display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '0.75rem',
            marginTop: isMobile ? '1rem' : 0,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          {navLinks}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '1rem',
    borderBottom: '2px solid #fff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#fff',
    cursor: 'pointer',
  },
  hamburger: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
  },
  line: {
    width: '25px',
    height: '3px',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
};

export default Navbar;
