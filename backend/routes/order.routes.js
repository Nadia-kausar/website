import express from "express";
import { placeOrder, getAllOrders, getUserOrders } from "../controller/order.controller.js";

const router = express.Router();

// ✅ Customer places an order
router.post("/place", placeOrder);

// 🔴 Admin: Get all orders (no auth middleware yet)
router.get("/all", getAllOrders);

// 🔵 User: Get orders by email
router.get("/user/:email", getUserOrders);

export default router;
