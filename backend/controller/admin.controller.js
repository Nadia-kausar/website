import Order from "../model/order.model.js";
import User from "../model/user.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "fullname email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get All Orders Error:", error.message);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};
