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
      <h2 style={styles.title}>🛒 Your Cart ({cartItems.length})</h2>
      <div style={styles.grid}>
        {/* CART ITEMS */}
        <div style={styles.cartList}>
          {cartItems.length === 0 && <p>Your cart is empty.</p>}
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.itemHeader}>
                <img
                  src={item.image || "https://via.placeholder.com/60?text=No+Image"}
                  alt={item.name}
                  style={styles.itemImage}
                />
                <div style={styles.itemInfo}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemPrice}>Rs. {item.price.toFixed(2)}</div>
                  <div style={styles.itemTotal}>Total: Rs. {(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>

              <div style={styles.itemBottom}>
                <div style={styles.qtyControl}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyBtn}>−</button>
                  <span style={styles.qtyNum}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>×</button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>🧾 Order Summary</h3>
          <div style={styles.section}>
            <div style={styles.label}>Delivery Address:</div>
            <p>DGK, Punjab, Pakistan</p>
          </div>
          <div style={styles.section}>
            <div style={styles.label}>Payment Method:</div>
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
          <div style={styles.priceRow}><span>Subtotal</span><span>Rs. {getCartTotal().toFixed(2)}</span></div>
          <div style={styles.priceRow}><span>Shipping</span><span>{shippingFee ? `Rs. ${shippingFee}` : "Free"}</span></div>
          <div style={styles.totalRow}><span>Total</span><span>Rs. {grandTotal.toFixed(2)}</span></div>

          <button style={styles.checkoutBtn} onClick={checkout}>✅ Place Order</button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  page: {
    backgroundColor: "#f5f5f5",
    padding: "30px 16px",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#222",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxWidth: "1150px",
    margin: "0 auto",
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  itemHeader: {
    display: "flex",
    gap: "16px",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    objectFit: "cover",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemName: {
    fontWeight: "600",
    fontSize: "1rem",
  },
  itemPrice: {
    color: "#888",
    fontSize: "0.9rem",
  },
  itemTotal: {
    fontWeight: "500",
    fontSize: "0.95rem",
  },
  itemBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  qtyBtn: {
    padding: "4px 10px",
    border: "1px solid #bbb",
    background: "#f1f1f1",
    borderRadius: "6px",
    cursor: "pointer",
  },
  qtyNum: {
    minWidth: "24px",
    textAlign: "center",
    fontWeight: "500",
  },
  removeBtn: {
    fontSize: "20px",
    color: "#e53935",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  summary: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  summaryTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  section: {
    marginBottom: "16px",
  },
  label: {
    fontWeight: "600",
    fontSize: "0.95rem",
    marginBottom: "6px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
    fontSize: "0.95rem",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginTop: "16px",
  },
  checkoutBtn: {
    marginTop: "24px",
    width: "100%",
    background: "#f57224",
    color: "#fff",
    padding: "14px",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CartPage;
