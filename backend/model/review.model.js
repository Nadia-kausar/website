import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // optional now
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },       // optional now
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
