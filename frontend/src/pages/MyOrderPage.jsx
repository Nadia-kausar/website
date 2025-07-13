import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const styles = {
  page: {
    padding: "40px 24px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f9f9fb",
    minHeight: "100vh",
    color: "#2D3748",
    maxWidth: 960,
    margin: "0 auto",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    flexWrap: "wrap",
    gap: "16px",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
    margin: 0,
    flex: "1 1 auto",
  },
  backButton: {
    padding: "12px 24px",
    background: "#1a202c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 16,
    transition: "background-color 0.3s ease",
  },
  orderGroup: {
    marginBottom: 40,
  },
  orderDate: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
    color: "#4A5568",
    borderBottom: "2px solid #CBD5E0",
    paddingBottom: 8,
  },
  orderCard: {
    background: "#ffffff",
    border: "1px solid #E2E8F0",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.3s ease",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.5,
    flexWrap: "wrap",
    gap: "8px",
  },
  orderStatus: {
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 700,
    textTransform: "capitalize",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    minWidth: 100,
    textAlign: "center",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    borderBottom: "1px solid #EDF2F7",
    paddingBottom: 12,
    flexWrap: "wrap",
  },
  orderItemDetails: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 8,
    fontSize: 15,
    color: "#2D3748",
    width: "100%",
  },
  orderItemName: {
    fontWeight: 600,
  },
  orderSummary: {
    marginTop: 24,
    background: "#f0f4f8",
    padding: 20,
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    fontSize: 15,
  },
  orderCustomer: {
    marginBottom: 16,
    lineHeight: 1.6,
    color: "#4A5568",
  },
  orderTotal: {
    fontWeight: 700,
    fontSize: 18,
    marginTop: 8,
    color: "#1a202c",
    textAlign: "right",
  },
  emptyState: {
    textAlign: "center",
    marginTop: 80,
    color: "#4A5568",
  },
  animatedImage: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 24,
    borderRadius: 12,
    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
  },
  primaryButton: {
    marginTop: 24,
    padding: "14px 32px",
    background: "#1a202c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 16,
  },
  loadingText: {
    paddingTop: 40,
    fontSize: 18,
    color: "#718096",
    textAlign: "center",
  },
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return { background: "#e6fffa", color: "#2c7a7b" };
    case "processing":
      return { background: "#fffbea", color: "#b7791f" };
    case "shipped":
      return { background: "#ebf8ff", color: "#2b6cb0" };
    case "cancelled":
      return { background: "#fff5f5", color: "#c53030" };
    default:
      return { background: "#edf2f7", color: "#4a5568" };
  }
};

const MyOrderPage = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.email) throw new Error("No user logged in");
        const res = await axios.get(
          `https://website-backend-project.vercel.app/order/user/${user.email}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <p style={styles.loadingText}>Loading your orders...</p>;

  const grouped = orders.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    acc[date] = acc[date] || [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>🧾 My Order History</h1>
        <button
          style={styles.backButton}
          onClick={() => setCurrentPage("products")}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2d3748")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1a202c")}
        >
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
          <button
            style={styles.primaryButton}
            onClick={() => setCurrentPage("products")}
          >
            Discover Products
          </button>
        </div>
      ) : (
        Object.entries(grouped).map(([date, ordersOnDate]) => (
          <div key={date} style={styles.orderGroup}>
            <h2 style={styles.orderDate}>{date}</h2>
            {ordersOnDate.map((o) => (
              <div
                key={o._id}
                style={styles.orderCard}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0,0,0,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(0,0,0,0.06)")
                }
              >
                <div style={styles.orderHeader}>
                  <div>
                    <strong>Order ID:</strong>{" "}
                    <span style={{ color: "#319795", fontFamily: "monospace" }}>
                      {o._id}
                    </span>
                  </div>
                  <div style={{ ...styles.orderStatus, ...getStatusColor(o.status) }}>
                    {o.status}
                  </div>
                </div>

                <h3 style={{ marginBottom: 12, fontWeight: 600 }}>Items</h3>
                {o.items.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <div style={styles.orderItemDetails}>
                      <div style={styles.orderItemName}>{item.name}</div>
                      <div>Unit: Rs. {item.price.toFixed(2)}</div>
                      <div>Qty: {item.quantity}</div>
                      <div>Total: Rs. {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}

                <div style={styles.orderSummary}>
                  <div style={styles.orderCustomer}>
                    <h4 style={{ marginBottom: 8, fontWeight: 600 }}>Customer</h4>
                    <p>
                      <strong>Name:</strong> {o.user?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {o.user?.email || "N/A"}
                    </p>
                  </div>
                  <div style={styles.orderTotal}>
                    Order Total: Rs. {o.total.toFixed(2)}
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
