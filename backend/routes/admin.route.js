// routes/admin.route.js
import express from 'express';
import Product from '../model/product.model.js';
import OrderList from '../model/orderlist.model.js';

const router = express.Router();

router.post('/add-product', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
});

router.delete('/delete-product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await OrderList.find().populate('userId', 'fullname email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

export default router;
