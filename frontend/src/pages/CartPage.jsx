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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/place`,
        order
      );
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

  // ... keep your styles and JSX layout as-is
};

export default CartPage;
