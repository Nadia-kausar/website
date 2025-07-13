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
      padding: "40px 20px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
    },
    cartContainer: {
      display: "flex",
      gap: "2rem",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    cartList: {
      flex: "1 1 600px",
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    itemLeft: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
    itemName: {
      fontWeight: 600,
    },
    itemPrice: {
      color: "#888",
    },
    itemQty: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    qtyButton: {
      padding: "0.3rem 0.7rem",
      fontSize: "1rem",
      background: "#eee",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
    },
    removeBtn: {
      background: "none",
      border: "none",
      color: "#e53935",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    summaryBox: {
      flex: "1 1 300px",
      background: "#fff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    },
    summaryTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
    },
    label: {
      fontWeight: 600,
      color: "#555",
      fontSize: "0.9rem",
      marginBottom: "0.25rem",
    },
    select: {
      width: "100%",
      padding: "0.6rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      background: "#fefefe",
      color: "#333",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "700",
      fontSize: "1.1rem",
      marginTop: "1rem",
    },
    placeBtn: {
      marginTop: "2rem",
      background: "#1e88e5",
      color: "#fff",
      border: "none",
      padding: "0.9rem 1.5rem",
      borderRadius: "6px",
      fontWeight: "bold",
      fontSize: "1rem",
      width: "100%",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <section style={styles.page}>
      <div style={styles.cartContainer}>
        {/* Cart List */}
        <div style={styles.cartList}>
          <h2 style={styles.title}>🛒 Shopping Cart ({cartItems.length})</h2>
          {!cartItems.length && <p>Your cart is empty.</p>}
          {cartItems.map((p) => (
            <div key={p.id} style={styles.cartItem}>
              <div style={styles.itemLeft}>
                <img
                  src={p.image || "https://via.placeholder.com/60?text=No+Image"}
                  alt={p.name}
                  style={styles.itemImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/60?text=No+Image";
                  }}
                />
                <div>
                  <div style={styles.itemName}>{p.name}</div>
                  <div style={styles.itemPrice}>Rs. {p.price.toFixed(2)}</div>
                </div>
              </div>
              <div style={styles.itemQty}>
                <button style={styles.qtyButton} onClick={() => updateQuantity(p.id, p.quantity - 1)}>-</button>
                <span>{p.quantity}</span>
                <button style={styles.qtyButton} onClick={() => updateQuantity(p.id, p.quantity + 1)}>+</button>
              </div>
              <div><strong>Rs. {(p.price * p.quantity).toFixed(2)}</strong></div>
              <button style={styles.removeBtn} onClick={() => removeFromCart(p.id)}>×</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside style={styles.summaryBox}>
          <h3 style={styles.summaryTitle}>🧾 Order Summary</h3>

          <div>
            <div style={styles.label}>Delivery Address</div>
            <div>DGK, Punjab, Pakistan</div>
          </div>

          <div style={{ marginTop: "1rem" }}>
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
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
