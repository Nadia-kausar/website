import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = ({ setCurrentPage }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    paymentMethod,
    setPaymentMethod,
  } = useCart();
  const { user } = useAuth();

  const shippingFee = useMemo(() => (getCartTotal() < 250 ? 20 : 0), [cartItems]);
  const grandTotal = getCartTotal() + shippingFee;

  const checkout = async () => {
    if (!cartItems.length) return toast.error("Your cart is empty!");

    const order = {
      user: {
        name: user?.fullname || user?.name || "Guest",
        email: user?.email || "N/A",
        phone: user?.phone || "Not provided",
      },
      items: [...cartItems],
      total: grandTotal,
      status: "Order Placed",
      paymentMethod,
    };

    try {
      const res = await axios.post("https://website-backend-project.vercel.app/order/place", order);
      if (res.status === 201) {
        toast.success("🎉 Order placed successfully!");
        clearCart();
        setCurrentPage("myorder");
      }
    } catch {
      toast.error("❌ Failed to place order");
    }
  };

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>🛒 Shopping Cart</h2>
      <div style={styles.container}>
        {/* Cart Items */}
        <div style={styles.cartSection}>
          {cartItems.length === 0 ? (
            <p style={styles.empty}>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <div>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemDetail}>Rs. {item.price.toFixed(2)}</div>
                  <div style={styles.itemDetail}>Qty: {item.quantity}</div>
                  <div style={styles.itemDetail}>
                    Description: {item.description || "No description provided"}
                  </div>
                  <div style={styles.itemTotal}>
                    Total: Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeBtn}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div style={styles.summarySection}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>

          <div style={styles.summaryRow}>
            <strong>Delivery Address:</strong>
            <p>DGK, Punjab, Pakistan</p>
          </div>

          <div style={styles.summaryRow}>
            <strong>Payment Method:</strong>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.select}
            >
              <option value="Cash On Delivery">Cash On Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>Rs. {getCartTotal().toFixed(2)}</span>
          </div>

          <div style={styles.summaryRow}>
            <span>Shipping Fee:</span>
            <span>{shippingFee ? `Rs. ${shippingFee}` : "Free"}</span>
          </div>

          <div style={styles.totalRow}>
            <strong>Total Amount:</strong>
            <strong>Rs. {grandTotal.toFixed(2)}</strong>
          </div>

          <button onClick={checkout} style={styles.checkoutBtn}>
            ✅ Place Order
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  page: {
    background: "#fff", // white background
    color: "#000",       // black text
    padding: "30px 16px",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cartSection: {
    flex: "1 1 100%",
    maxWidth: "650px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    background: "#f9f9f9", // light gray card
    borderRadius: "10px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
    flexWrap: "wrap",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  itemDetail: {
    fontSize: "0.9rem",
    color: "#333",
  },
  itemTotal: {
    marginTop: "6px",
    fontWeight: "500",
  },
  removeBtn: {
    fontSize: "24px",
    color: "#e74c3c",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  summarySection: {
    flex: "1 1 100%",
    maxWidth: "360px",
    background: "#f9f9f9", // light gray summary box
    borderRadius: "10px",
    padding: "24px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  },
  summaryTitle: {
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  summaryRow: {
    marginBottom: "16px",
    fontSize: "0.95rem",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  select: {
    marginTop: "6px",
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: "20px",
    fontSize: "1.05rem",
  },
  checkoutBtn: {
    marginTop: "24px",
    width: "100%",
    background: "#f57224",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  empty: {
    fontSize: "1.1rem",
    textAlign: "center",
    color: "#555",
  },
};

export default CartPage;
