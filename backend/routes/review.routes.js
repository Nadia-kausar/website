import express from 'express';
import Review from '../model/review.model.js';
const router = express.Router();

// POST new review (no userId or productId required)
router.post('/', async (req, res) => {
  try {
    const { message, rating } = req.body;

    if (!message || !rating) {
      return res.status(400).json({ message: 'Rating and message are required' });
    }

    const review = new Review({ message, rating });
    await review.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET all reviews (you can later filter by product if needed)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
});

export default router;
