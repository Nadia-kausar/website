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
      const res = await axios.post("http://localhost:4001/order/place", order);
      if (res.status === 201) {
        toast.success("Order placed successfully!");
        clearCart();
        setCurrentPage("myorder");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
    }
  };

  const styles = {
    page: {
      backgroundColor: "#f2f2f2",
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
      alignItems: "flex-start",
      justifyContent: "center",
    },
    cartList: {
      flex: "1 1 600px",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      padding: "1rem 0",
      background: "#fff",
      borderRadius: "8px",
      marginBottom: "1rem",
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
      color: "#666",
    },
    itemQty: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    qtyButton: {
      padding: "0.3rem 0.6rem",
      fontSize: "1rem",
      background: "#e0e0e0",
      border: "1px solid #bbb",
      color: "#333",
      cursor: "pointer",
      borderRadius: "4px",
    },
    removeBtn: {
      color: "#e53935",
      fontSize: "1.5rem",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    summaryBox: {
      flex: "1 1 300px",
      background: "#fff",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    summaryTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
    },
    label: {
      fontWeight: 600,
      color: "#666",
      fontSize: "0.9rem",
    },
    select: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      background: "#fafafa",
      color: "#333",
      marginTop: "0.5rem",
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
      color: "#333",
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 700,
      fontSize: "1.2rem",
      marginTop: "1rem",
      color: "#111",
    },
    placeBtn: {
      marginTop: "2rem",
      background: "#444",
      color: "#fff",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "6px",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      width: "100%",
    },
  };

  return (
    <section style={styles.page}>
      <div style={styles.cartContainer}>
        {/* Cart List */}
        <div style={styles.cartList}>
          <h2 style={styles.title}>Shopping Cart ({cartItems.length})</h2>
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
                  <div style={styles.itemPrice}>${p.price.toFixed(2)}</div>
                </div>
              </div>
              <div style={styles.itemQty}>
                <button style={styles.qtyButton} onClick={() => updateQuantity(p.id, p.quantity - 1)}>-</button>
                <span>{p.quantity}</span>
                <button style={styles.qtyButton} onClick={() => updateQuantity(p.id, p.quantity + 1)}>+</button>
              </div>
              <div style={{ fontWeight: '600' }}>${(p.price * p.quantity).toFixed(2)}</div>
              <button style={styles.removeBtn} onClick={() => removeFromCart(p.id)}>×</button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside style={styles.summaryBox}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={styles.label}>DELIVERY ADDRESS</div>
            <div style={{ marginTop: '0.5rem' }}>DGK, Punjab, Pakistan</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={styles.label}>PAYMENT METHOD</div>
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
            <span>Price</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div style={styles.priceRow}>
            <span>Shipping Fee</span>
            <span>{shippingFee ? `$${shippingFee}` : "Free"}</span>
          </div>
          <div style={styles.totalRow}>
            <span>Total Amount:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button onClick={checkout} style={styles.placeBtn}>Place Order</button>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
