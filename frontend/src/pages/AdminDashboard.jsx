import React, { useState } from 'react';
import AdminAddProductPage from './AdminAddProductPage';
import AdminOrderListPage from './AdminOrderListPage';

const AdminDashboard = () => {
  const [tab, setTab] = useState('orders');

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛠 Admin Dashboard</h1>
      <div style={styles.tabButtons}>
        <button onClick={() => setTab('add')} style={styles.button}>➕ Add Product</button>
        <button onClick={() => setTab('orders')} style={styles.button}>📦 View Orders</button>
      </div>
      <div style={styles.content}>
        {tab === 'add' ? <AdminAddProductPage /> : <AdminOrderListPage />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    padding: '40px',
    fontFamily: 'Poppins, sans-serif'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px'
  },
  tabButtons: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#111',
    padding: '20px',
    borderRadius: '10px'
  }
};

export default AdminDashboard;
