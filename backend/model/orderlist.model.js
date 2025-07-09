import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      title: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
}, { timestamps: true });

const OrderList = mongoose.model('OrderList', orderSchema);
export default OrderList;
