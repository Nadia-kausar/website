import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const handleAuthClick = () => {
    logout();
    setCurrentPage('login');
  };

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
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div
          style={{ fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', color: '#fff' }}
          onClick={() => setCurrentPage('home')}
        >
          ShopEasy
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {['home', 'products', 'about', 'cart', 'myorder'].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                backgroundColor: currentPage === page ? '#fff' : 'transparent',
                color: currentPage === page ? '#000' : '#fff',
                border: '1px solid #fff',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: '0.3s ease'
              }}
            >
              {page === 'cart'
                ? `Cart (${cartCount})`
                : page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}

          {isAuthenticated && (
            <button
              onClick={() => setCurrentPage('adminDashboard')}
              style={{
                backgroundColor: currentPage === 'adminDashboard' ? '#fff' : 'transparent',
                color: currentPage === 'adminDashboard' ? '#000' : '#fff',
                border: '1px solid #fff',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: '0.3s ease'
              }}
            >
              Dashboard
            </button>
          )}

          <button
            onClick={handleAuthClick}
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: '1px solid #fff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s ease'
            }}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
