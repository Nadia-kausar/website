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
                <div style={styles.details}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemPrice}>Price: Rs. {item.price.toFixed(2)}</div>
                  <div style={styles.itemDescription}>
                    Description: {item.description || "No description"}
                  </div>
                </div>

                <div style={styles.actions}>
                  <div style={styles.qtyBox}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={styles.qtyBtn}
                    >
                      −
                    </button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  <div style={styles.subtotal}>
                    Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                    title="Remove Item"
                  >
                    ×
                  </button>
                </div>
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
            <span>Shipping:</span>
            <span>{shippingFee ? `Rs. ${shippingFee}` : "Free"}</span>
          </div>

          <div style={styles.totalRow}>
            <strong>Total:</strong>
            <strong>Rs. {grandTotal.toFixed(2)}</strong>
          </div>

          <button onClick={checkout} style={styles.checkoutBtn}>
            ✅ Place Order
          </button>

          <button
            onClick={() => setCurrentPage("products")}
            style={styles.continueBtn}
          >
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  page: {
    background: "#fff",
    color: "#000",
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
    gap: "18px",
  },
  cartItem: {
    background: "#f9f9f9",
    padding: "18px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  itemPrice: {
    fontSize: "0.95rem",
    color: "#333",
  },
  itemDescription: {
    fontSize: "0.9rem",
    color: "#555",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  qtyBtn: {
    padding: "6px 14px",
    fontSize: "18px",
    border: "1px solid #aaa",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#fff",
  },
  qty: {
    minWidth: "30px",
    textAlign: "center",
    fontWeight: "600",
  },
  subtotal: {
    fontSize: "1rem",
    fontWeight: "500",
  },
  removeBtn: {
    background: "none",
    border: "none",
    fontSize: "22px",
    color: "#e53935",
    fontWeight: "bold",
    cursor: "pointer",
  },
  summarySection: {
    flex: "1 1 100%",
    maxWidth: "360px",
    background: "#f4f4f4",
    borderRadius: "10px",
    padding: "24px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
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
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: "20px",
    fontSize: "1.1rem",
  },
  checkoutBtn: {
    marginTop: "20px",
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
  continueBtn: {
    marginTop: "12px",
    width: "100%",
    background: "#000",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.95rem",
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
