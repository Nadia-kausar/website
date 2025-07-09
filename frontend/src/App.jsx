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
import SignupPage from './pages/SignupPage';
import MyOrderPage from './pages/MyOrderPage';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'products':
        return <ProductsPage />;
      case 'about':
        return <AboutPage />;
      case 'cart':
        return <CartPage setOrders={setOrders} setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      case 'myorder':
        return <MyOrderPage orders={orders} setCurrentPage={setCurrentPage} />;
      case 'adminDashboard':
        return <AdminDashboard />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main style={{ flex: '1', maxWidth: '1200px', margin: '0 auto', padding: '2rem', width: '100%' }}>
          <Toaster position="top-center" />
          {renderPage()}
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;