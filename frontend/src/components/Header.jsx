import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ setCurrentPage }) => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const handleAuthClick = () => {
    logout();
    setCurrentPage('login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Left Side: Logo + Nav */}
        <div style={styles.left}>
          <div style={styles.logo} onClick={() => setCurrentPage('home')}>
            ShopEasy
          </div>
          <nav style={styles.nav}>
            {['home', 'about', 'products', 'cart'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={styles.navLink}
              >
                {page === 'cart' ? `Cart (${cartCount})` : capitalize(page)}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side: Auth / Dashboard / Welcome */}
        <div style={styles.right}>
          {isAuthenticated && (
            <button
              onClick={() => setCurrentPage('adminDashboard')}
              style={styles.dashboardBtn}
            >
              🛠 Dashboard
            </button>
          )}

          {isAuthenticated && (
            <span style={styles.welcomeText}>
              Welcome, {user.fullname || user.name || 'User'}!
            </span>
          )}

          <button onClick={handleAuthClick} style={styles.authBtn}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

// Capitalize helper
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Styling
const styles = {
  header: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '1rem 1.5rem',
    borderBottom: '2px solid #fff',
    fontFamily: "'Poppins', sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 999,
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
    fontSize: '1.6rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    marginLeft: '2rem',
  },
  navLink: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  right: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  dashboardBtn: {
    backgroundColor: '#1e90ff',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  welcomeText: {
    fontSize: '0.95rem',
    color: '#ccc',
  },
  authBtn: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default Header;
