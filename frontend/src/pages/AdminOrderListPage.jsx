import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  page: {
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f4f4f4",
    minHeight: "100vh"
  },
  heading: {
    fontSize: "28px",
    marginBottom: "24px",
    color: "#222"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  userInfo: {
    marginBottom: "12px",
    fontSize: "16px",
    color: "#333"
  },
  item: {
    fontSize: "15px",
    color: "#444",
    marginBottom: "4px"
  },
  total: {
    fontWeight: "bold",
    marginTop: "12px",
    color: "#000"
  },
  status: {
    marginTop: "6px",
    padding: "6px 12px",
    display: "inline-block",
    background: "#e0f7e9",
    color: "#007e33",
    borderRadius: "6px",
    fontSize: "14px"
  },
  payment: {
    fontStyle: "italic",
    fontSize: "14px",
    color: "#666"
  }
};

const AdminOrderListPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/order/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error loading orders:", err));
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Admin Dashboard - All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <div style={styles.userInfo}>
              <strong>Name:</strong> {order.user.name} <br />
              <strong>Email:</strong> {order.user.email}
            </div>

            <div>
              <strong>Items:</strong>
              {order.items.map((item, index) => (
                <div key={index} style={styles.item}>
                  {item.name} = {item.quantity}
                </div>
              ))}
            </div>

            <div style={styles.total}>Total: Rs {order.total}</div>
            <div style={styles.payment}>Payment Method: {order.paymentMethod || "Not Specified"}</div>
            <div style={styles.status}>Status: {order.status}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrderListPage;
