import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import MyOrderPage from './pages/MyOrderPage';
import AdminDashboard from './pages/AdminDashboard';
import ReviewPage from './pages/ReviewPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'home';
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'products':
        return <ProductsPage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'cart':
        return <CartPage setOrders={setOrders} setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      case 'myorder':
        return <MyOrderPage orders={orders} setCurrentPage={setCurrentPage} />;
      case 'adminDashboard':
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      case 'review':
        return <ReviewPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div style={styles.appWrapper}>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main style={styles.main}>
            <Toaster position="top-center" />
            {renderPage()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

const styles = {
  appWrapper: {
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Poppins', sans-serif",
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
};

export default App;
