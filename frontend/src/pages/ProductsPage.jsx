import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReviewPage from './ReviewPage';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showReviewFor, setShowReviewFor] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://website-backend-project.vercel.app/product');
      setProducts(res.data);
    } catch (err) {
      toast.error('❌ Failed to load products');
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.title,
      price: parseFloat(product.price),
      quantity: 1,
    });
    toast.success(`${product.title} added to cart!`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://website-backend-project.vercel.app/product/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      toast.success('🗑️ Product deleted successfully');
    } catch (error) {
      toast.error('❌ Failed to delete product');
    }
  };

  const isAdmin = user?.role === 'admin' || user?.isAdmin;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛍️ Explore Products</h1>
      <div style={styles.grid}>
        {products.map((product) => {
          const isVisible = showReviewFor === product._id;

          return (
            <div key={product._id} style={styles.card}>
              <h2 style={styles.productTitle}>{product.title}</h2>
              {product.author?.name && (
                <p style={styles.author}>By: {product.author.name}</p>
              )}
              <p style={styles.price}>Rs. {Number(product.price).toFixed(2)}</p>
              <p style={styles.desc}>
                {product.description || 'No description available.'}
              </p>

              <button
                style={styles.cartBtn}
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>

              <button
                style={styles.reviewBtn}
                onClick={() => setShowReviewFor(isVisible ? null : product._id)}
              >
                {isVisible ? 'Hide Reviews' : 'View Reviews'}
              </button>

              {isVisible && (
                <div style={styles.reviewBox}>
                  <ReviewPage
                    productId={product._id}
                    userId={user?._id}
                    onReviewSubmit={() => {}}
                  />
                </div>
              )}

              {isAdmin && (
                <div style={styles.adminControls}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f4f4f4',
    padding: '30px 20px',
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: '100vh',
  },
  title: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#222',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s',
  },
  productTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: '#333',
    textAlign: 'center',
  },
  author: {
    fontSize: '13px',
    color: '#777',
    textAlign: 'center',
    marginBottom: '6px',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#e53935',
    textAlign: 'center',
    marginBottom: '10px',
  },
  desc: {
    fontSize: '14px',
    color: '#555',
    textAlign: 'center',
    marginBottom: '10px',
    minHeight: '50px',
  },
  cartBtn: {
    backgroundColor: '#f57224',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
    width: '100%',
    marginBottom: '10px',
  },
  reviewBtn: {
    backgroundColor: '#fff',
    color: '#f57224',
    border: '2px solid #f57224',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px',
    width: '100%',
    marginBottom: '10px',
  },
  reviewBox: {
    marginTop: '10px',
  },
  adminControls: {
    marginTop: '10px',
  },
  deleteBtn: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default ProductsPage;
