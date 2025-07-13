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
    if (!cartItems.length) {
      toast.error("Your cart is empty!");
      return;
    }

    const order = {
      user: {
        name: user?.fullname || user?.name || "Guest",
        email: user?.email || "N/A",
        phone: user?.phone || "Not provided",
      },
      items: [...cartItems],
      total: grandTotal,
      status: "Order Placed",
      paymentMethod: paymentMethod,
    };

    try {
      const res = await axios.post("https://website-backend-project.vercel.app/order/place", order);
      if (res.status === 201) {
        toast.success("🎉 Order placed successfully!");
        clearCart();
        setCurrentPage("myorder");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("❌ Failed to place order");
    }
  };

  const styles = {
    page: {
      backgroundColor: "#f9f9f9",
      color: "#222",
      fontFamily: "'Poppins', sans-serif",
      minHeight: "100vh",
      padding: "40px 16px",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    cartContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    cartList: {
      width: "100%",
    },
    cartItem: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "1rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    itemTop: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
    itemDetails: {
      display: "flex",
      flexDirection: "column",
    },
    itemName: {
      fontWeight: "600",
    },
    itemPrice: {
      fontSize: "14px",
      color: "#777",
    },
    itemQty: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    qtyButton: {
      padding: "4px 10px",
      border: "1px solid #aaa",
      borderRadius: "4px",
      cursor: "pointer",
      background: "#f1f1f1",
    },
    removeBtn: {
      alignSelf: "flex-end",
      background: "none",
      border: "none",
      color: "#e53935",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    summaryBox: {
      width: "100%",
      background: "#fff",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    },
    summaryTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textAlign: "center",
    },
    label: {
      fontWeight: 600,
      fontSize: "0.9rem",
      marginTop: "1rem",
    },
    select: {
      width: "100%",
      padding: "0.6rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginTop: "0.5rem",
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
    },
    totalRow: {
      fontWeight: "bold",
      fontSize: "1.1rem",
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
    },
    placeBtn: {
      marginTop: "2rem",
      width: "100%",
      background: "#1e88e5",
      color: "#fff",
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>🛒 Your Cart ({cartItems.length})</h2>

      <div style={styles.cartContainer}>
        <div style={styles.cartList}>
          {cartItems.length === 0 && <p>Your cart is empty.</p>}
          {cartItems.map((p) => (
            <div key={p.id} style={styles.cartItem}>
              <div style={styles.itemTop}>
                <img
                  src={p.image || "https://via.placeholder.com/60?text=No+Image"}
                  alt={p.name}
                  style={styles.itemImage}
                />
                <div style={styles.itemDetails}>
                  <div style={styles.itemName}>{p.name}</div>
                  <div style={styles.itemPrice}>Rs. {p.price.toFixed(2)}</div>
                </div>
              </div>

              <div style={styles.itemQty}>
                <button style={styles.qtyButton} onClick={() => updateQuantity(p.id, p.quantity - 1)}>-</button>
                <span>{p.quantity}</span>
                <button style={styles.qtyButton} onClick={() => updateQuantity(p.id, p.quantity + 1)}>+</button>
              </div>

              <div><strong>Total: Rs. {(p.price * p.quantity).toFixed(2)}</strong></div>
              <button style={styles.removeBtn} onClick={() => removeFromCart(p.id)}>×</button>
            </div>
          ))}
        </div>

        <div style={styles.summaryBox}>
          <h3 style={styles.summaryTitle}>🧾 Order Summary</h3>

          <div>
            <div style={styles.label}>Delivery Address</div>
            <p>DGK, Punjab, Pakistan</p>
          </div>

          <div>
            <div style={styles.label}>Payment Method</div>
            <select
              style={styles.select}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash On Delivery">Cash On Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div style={styles.priceRow}>
            <span>Subtotal</span>
            <span>Rs. {getCartTotal().toFixed(2)}</span>
          </div>
          <div style={styles.priceRow}>
            <span>Shipping</span>
            <span>{shippingFee ? `Rs. ${shippingFee}` : "Free"}</span>
          </div>
          <div style={styles.totalRow}>
            <span>Total</span>
            <span>Rs. {grandTotal.toFixed(2)}</span>
          </div>

          <button style={styles.placeBtn} onClick={checkout}>✅ Place Order</button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
