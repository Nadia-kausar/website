import React, { useEffect, useState } from "react";
import axios from "axios";

const backendURL = "https://website-backend-project.vercel.app";

const styles = {
  page: {
    padding: "24px 16px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f4f4f4",
    minHeight: "100vh",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "32px",
    color: "#222",
    fontWeight: "700",
    textAlign: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "box-shadow 0.3s ease",
  },
  userInfo: {
    marginBottom: "14px",
    fontSize: "15px",
    color: "#333",
    lineHeight: 1.6,
  },
  item: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "6px",
    paddingLeft: "10px",
  },
  total: {
    fontWeight: "bold",
    marginTop: "14px",
    fontSize: "16px",
    color: "#111",
  },
  status: {
    marginTop: "14px",
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "capitalize",
    border: "1px solid transparent",
  },
  payment: {
    fontStyle: "italic",
    fontSize: "13px",
    color: "#666",
    marginTop: "8px",
  },
  empty: {
    color: "#777",
    fontSize: "16px",
    marginTop: "40px",
    textAlign: "center",
  },
};

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "shipped":
      return { background: "#e0f3ff", color: "#007bff", borderColor: "#90caf9" };
    case "processing":
      return { background: "#fff8e1", color: "#f0ad4e", borderColor: "#ffe082" };
    case "completed":
      return { background: "#e0f7e9", color: "#28a745", borderColor: "#a5d6a7" };
    case "cancelled":
      return { background: "#fdecea", color: "#dc3545", borderColor: "#ef9a9a" };
    case "order placed":
    default:
      return { background: "#edf2f7", color: "#4a5568", borderColor: "#cbd5e0" };
  }
};

const AdminOrderListPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendURL}/order/all`)
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("Error loading orders:", err);
        alert("❌ Failed to load orders");
      });
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>📦 Admin Dashboard — All Orders</h2>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              ...styles.card,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div style={styles.userInfo}>
              <strong>👤 Name:</strong> {order.user?.name || "N/A"} <br />
              <strong>📧 Email:</strong> {order.user?.email || "N/A"}
            </div>

            <div>
              <strong>🛒 Items:</strong>
              {order.items.map((item, index) => (
                <div key={index} style={styles.item}>
                  • {item.name} × {item.quantity}
                </div>
              ))}
            </div>

            <div style={styles.total}>💰 Total: Rs {Number(order.total).toFixed(2)}</div>
            <div style={styles.payment}>
              💳 Payment Method: {order.paymentMethod || "Not Specified"}
            </div>
            <div style={{ ...styles.status, ...getStatusStyle(order.status) }}>
              {order.status || "Order Placed"}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrderListPage;
