import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { styles } from '../styles/styles';

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
        <div style={styles.left}>
          <div style={styles.logo} onClick={() => setCurrentPage('home')}>
            ShopEasy
          </div>
          <nav style={styles.nav}>
            <button style={styles.navLink} onClick={() => setCurrentPage('home')}>Home</button>
            <button style={styles.navLink} onClick={() => setCurrentPage('about')}>About</button>
            <button style={styles.navLink} onClick={() => setCurrentPage('products')}>Products</button>
            <button style={styles.navLink} onClick={() => setCurrentPage('cart')}>Cart ({cartCount})</button>
          </nav>
        </div>

        <div style={styles.right}>
          {isAuthenticated && (
            <button onClick={() => setCurrentPage('adminDashboard')} style={styles.dashboardBtn}>
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



export default Header;
