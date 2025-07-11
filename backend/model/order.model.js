import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "Not provided" },
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "Cash On Delivery" },
  status: { type: String, default: "Order Placed" },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;