import React, { useMemo, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const shippingFee = useMemo(() => (getCartTotal() < 250 && getCartTotal() > 0 ? 20 : 0), [cartItems]);
  const grandTotal = getCartTotal() + shippingFee;

  const checkout = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setLoading(true);
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/order/place`, order);
      if (res.status === 201) {
        toast.success("Order placed successfully!");
        clearCart();
        setCurrentPage("myorder");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    // ... your styles unchanged
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
                <button
                  style={styles.qtyButton}
                  onClick={() => updateQuantity(p.id, Math.max(1, p.quantity - 1))}
                  disabled={loading}
                >
                  -
                </button>
                <span>{p.quantity}</span>
                <button
                  style={styles.qtyButton}
                  onClick={() => updateQuantity(p.id, p.quantity + 1)}
                  disabled={loading}
                >
                  +
                </button>
              </div>
              <div style={{ fontWeight: "600" }}>${(p.price * p.quantity).toFixed(2)}</div>
              <button
                style={styles.removeBtn}
                onClick={() => removeFromCart(p.id)}
                disabled={loading}
                aria-label={`Remove ${p.name} from cart`}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside style={styles.summaryBox}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>

          <div style={{ marginBottom: "1.5rem" }}>
            <div style={styles.label}>DELIVERY ADDRESS</div>
            <div style={{ marginTop: "0.5rem" }}>DGK, Punjab, Pakistan</div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <div style={styles.label}>PAYMENT METHOD</div>
            <select
              style={styles.select}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={loading}
            >
              <option value="">Select payment method</option>
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

          <button
            onClick={checkout}
            style={styles.placeBtn}
            disabled={loading || !cartItems.length}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
