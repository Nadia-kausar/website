import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const styles = {
  page: {
    padding: '40px 24px',
    fontFamily: "'Poppins', sans-serif",
    background: '#f9f9fb',
    minHeight: '100vh',
    color: '#2D3748',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
  },
  backButton: {
    padding: '10px 20px',
    background: '#1a202c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
  },
  orderGroup: {
    marginBottom: 40,
  },
  orderDate: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 16,
    color: '#4A5568',
  },
  orderCard: {
    background: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 500,
  },
  orderStatus: {
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottom: '1px solid #EDF2F7',
    paddingBottom: 8,
  },
  orderItemDetails: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  orderSummary: {
    marginTop: 16,
    background: '#f0f4f8',
    padding: 16,
    borderRadius: 12,
    border: '1px solid #E2E8F0',
  },
  orderCustomer: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
    lineHeight: 1.5,
  },
  orderTotal: {
    fontWeight: 700,
    fontSize: 16,
    marginTop: 12,
    color: '#2D3748',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 80,
    color: '#4A5568',
  },
  animatedImage: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
  },
  primaryButton: {
    marginTop: 24,
    padding: '12px 24px',
    background: '#1a202c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 16,
  },
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed': return { background: '#e6fffa', color: '#2c7a7b' };
    case 'processing': return { background: '#fffbea', color: '#b7791f' };
    case 'shipped': return { background: '#ebf8ff', color: '#2b6cb0' };
    case 'cancelled': return { background: '#fff5f5', color: '#c53030' };
    default: return { background: '#edf2f7', color: '#4a5568' };
  }
};

const MyOrderPage = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.email) throw new Error('No user logged in');
        const res = await axios.get(`http://localhost:4001/order/user/${user.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <p style={{ textAlign: 'center', paddingTop: '40px' }}>Loading your orders...</p>;

  const grouped = orders.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString();
    acc[date] = acc[date] || [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>My Order History</h1>
        <button style={styles.backButton} onClick={() => setCurrentPage('products')}>
          Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <img
            src="https://placehold.co/600x400/edf2f7/1a202c?text=No+Orders+Yet"
            alt="No orders"
            style={styles.animatedImage}
          />
          <h2>No Orders Yet</h2>
          <p>Your purchases will appear here once you place an order.</p>
          <button style={styles.primaryButton} onClick={() => setCurrentPage('products')}>
            Discover Products
          </button>
        </div>
      ) : (
        Object.entries(grouped).map(([date, ordersOnDate]) => (
          <div key={date} style={styles.orderGroup}>
            <h2 style={styles.orderDate}>{date}</h2>
            {ordersOnDate.map((o) => (
              <div key={o._id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <strong>Order ID:</strong> <span style={{ color: '#319795' }}>{o._id}</span>
                  </div>
                  <div style={{ ...styles.orderStatus, ...getStatusColor(o.status) }}>
                    {o.status}
                  </div>
                </div>

                <h3 style={{ marginBottom: 12 }}>Items</h3>
                {o.items.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <div style={styles.orderItemDetails}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div>Unit: ${item.price}</div>
                      <div>{item.quantity}+</div>
                      <div>Total: ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}

                <div style={styles.orderSummary}>
                  <div style={styles.orderCustomer}>
                    <h4 style={{ marginBottom: 8 }}>Customer</h4>
                    <p><strong>Name:</strong> {o.user.name}</p>
                    <p><strong>Email:</strong> {o.user.email}</p>
                  </div>
                  <div style={styles.orderTotal}>
                    Order Total: ${o.total.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrderPage;
