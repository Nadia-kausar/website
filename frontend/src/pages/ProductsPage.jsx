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
      const res = await axios.get('http://localhost:4001/product');
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
              <p style={styles.price}>Rs. {product.price.toFixed(2)}</p>
              <p style={styles.desc}>{product.description}</p>

              <button
                style={styles.cartBtn}
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>

              <button
                style={styles.reviewBtn}
                onClick={() =>
                  setShowReviewFor(isVisible ? null : product._id)
                }
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
    padding: '40px 30px',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1a1a1a',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.2s ease',
  },
  productTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: '#333',
    textAlign: 'center',
  },
  author: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '10px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: '10px',
  },
  desc: {
    fontSize: '14px',
    color: '#444',
    textAlign: 'center',
    minHeight: '50px',
    marginBottom: '10px',
  },
  cartBtn: {
    backgroundColor: '#f57224',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    transition: 'background 0.2s ease',
  },
  reviewBtn: {
    backgroundColor: '#fff',
    color: '#f57224',
    border: '2px solid #f57224',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    transition: 'all 0.2s ease',
  },
  reviewBox: {
    marginTop: '15px',
    width: '100%',
  },
};

export default ProductsPage;
