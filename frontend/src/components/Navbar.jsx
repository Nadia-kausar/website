import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navItems = ['home', 'products', 'about', 'cart', 'myorder'];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <div
          style={styles.logo}
          onClick={() => {
            setCurrentPage('home');
            setMenuOpen(false);
          }}
        >
          ShopEasy
        </div>

        {/* Hamburger for Mobile */}
        {isMobile && (
          <div onClick={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
            <div style={styles.line} />
            <div style={styles.line} />
            <div style={styles.line} />
          </div>
        )}

        {/* Navigation */}
        <nav
          style={{
            ...styles.nav,
            ...(isMobile
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginTop: '1rem',
                  maxHeight: menuOpen ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out',
                }
              : {
                  flexDirection: 'row',
                  display: 'flex',
                  marginTop: 0,
                  gap: '0.75rem',
                }),
          }}
        >
          {navItems.map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                setMenuOpen(false);
              }}
              style={{
                ...styles.link,
                ...(currentPage === page ? styles.activeLink : {}),
                ...(isMobile ? styles.mobileLink : {}),
              }}
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
                setMenuOpen(false);
              }}
              style={{
                ...styles.link,
                ...(isMobile ? styles.mobileLink : {}),
              }}
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => {
              logout();
              setCurrentPage('login');
              setMenuOpen(false);
            }}
            style={{
              ...styles.link,
              ...(isMobile ? styles.mobileLink : {}),
            }}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '1rem',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  link: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    width: 'auto',
    textAlign: 'center',
  },
  activeLink: {
    backgroundColor: '#fff',
    color: '#000',
  },
  mobileLink: {
    width: '100%',
    textAlign: 'left',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '6px',
    backgroundColor: '#000',
  },
  line: {
    width: '25px',
    height: '3px',
    backgroundColor: '#fff',
    transition: 'all 0.3s',
  },
};

export default Navbar;
