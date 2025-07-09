import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const StarRating = ({ rating }) => {
  const stars = Array(5).fill(0);
  return (
    <div style={styles.starContainer}>
      {stars.map((_, index) => (
        <span key={index} style={styles.star}>
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:4001/product')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('❌ Failed to load products:', err);
        toast.error('Failed to load products');
      });
  }, []);

  const handleAddToCart = (product) => {
    const item = {
      id: product._id,
      name: product.title,
      price: parseFloat(product.price),
      quantity: 1
    };
    addToCart(item);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 Browse Our Collection</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <h3 style={styles.productTitle}>{product.title}</h3>
            <p style={styles.author}>{product.author}</p>
            <p style={styles.price}>${parseFloat(product.price).toFixed(2)}</p>
            <p style={styles.desc}>{product.description}</p>
            <StarRating rating={product.rating} />
            <button style={styles.button} onClick={() => handleAddToCart(product)}>
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: '#1a1a1a', // Light black background
    color: '#fff', // Light text
    padding: '40px',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '40px',
    letterSpacing: '1px',
    color: '#ffffff', // Title in white
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    background: '#ffffff', // White card
    color: '#000', // Black text inside card
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
  },
  productTitle: {
    fontSize: '20px',
    marginBottom: '8px',
    color: '#000', // Black text
  },
  starContainer: {
    margin: '8px 0',
    fontSize: '20px',
    color: 'gold',
  },
  star: {
    margin: '0 2px',
  },
  author: {
    fontSize: '14px',
    color: '#555', // Dark gray
    marginBottom: '4px',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginTop: '6px',
    color: '#000',
  },
  desc: {
    fontSize: '14px',
    color: '#333',
    marginTop: '6px',
    minHeight: '50px',
  },
  button: {
    marginTop: '12px',
    padding: '10px 16px',
    backgroundColor: '#000', // Black button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  }
};

export default ProductsPage;
