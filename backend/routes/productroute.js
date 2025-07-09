// routes/productroute.js
import express from 'express';
import Product from '../model/product.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load products', error: err.message });
  }
});

export default router;
