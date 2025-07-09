import Order from "../model/order.model.js";

// 🟢 Place a new order
export const placeOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔵 Get all orders (Admin access - no middleware here)
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ date: -1 });
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🟣 Get orders for a specific user by email
export const getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;
    const userOrders = await Order.find({ "user.email": email }).sort({ date: -1 });
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
