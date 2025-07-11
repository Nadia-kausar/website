import getProductModel from "../model/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const Product = getProductModel();
    const products = await Product.find().populate('author', 'fullname email').sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, author, price, description } = req.body;
    if (!title || !author || !price) return res.status(400).json({ message: 'Title, author, price required' });

    const Product = getProductModel();
    const product = new Product({ title, author, price, description });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
