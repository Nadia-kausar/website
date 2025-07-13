import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAuthClick = () => {
    logout();
    setCurrentPage('login');
  };

  const navButtonStyle = (active) => ({
    backgroundColor: active ? '#fff' : 'transparent',
    color: active ? '#000' : '#fff',
    border: '1px solid #fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s ease',
    width: isMobile ? '100%' : 'auto',
    textAlign: 'left',
  });

  const navLinks = (
    <>
      {['home', 'products', 'about', 'cart', 'myorder'].map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
            if (isMobile) setMenuOpen(false);
          }}
          style={navButtonStyle(currentPage === page)}
        >
          {page === 'cart'
            ? `Cart (${cartCount})`
            : page.charAt(0).toUpperCase() + page.slice(1)}
        </button>
      ))}

      {isAuthenticated && (
        <button
          onClick={() => {
            setCurrentPage('adminDashboard');
            if (isMobile) setMenuOpen(false);
          }}
          style={navButtonStyle(currentPage === 'adminDashboard')}
        >
          Dashboard
        </button>
      )}

      <button
        onClick={() => {
          handleAuthClick();
          if (isMobile) setMenuOpen(false);
        }}
        style={navButtonStyle(false)}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </>
  );

  return (
    <nav style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: '1rem',
      borderBottom: '2px solid #fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {/* Logo */}
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '1.4rem',
            cursor: 'pointer',
            color: '#fff',
          }}
          onClick={() => setCurrentPage('home')}
        >
          ShopEasy
        </div>

        {/* Hamburger Menu (Mobile) */}
        {isMobile && (
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}>
            <div style={{ width: '25px', height: '3px', backgroundColor: '#fff', margin: '4px 0' }} />
            <div style={{ width: '25px', height: '3px', backgroundColor: '#fff', margin: '4px 0' }} />
            <div style={{ width: '25px', height: '3px', backgroundColor: '#fff', margin: '4px 0' }} />
          </div>
        )}

        {/* Nav Links */}
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

export default Navbar;
