import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { styles } from '../styles/styles';

function Product() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get('http://localhost:4001/book');
        setBook(res.data);
        console.log("Books fetched:", res.data);
      } catch (error) {
        console.error("Error fetching books from backend:", error);
      }
    };

    getBook();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>Our Books</h2>

      <div style={styles.productsGrid}>
        {book.map((b, i) => (
          <ProductCard key={i} product={b} />
        ))}
      </div>
    </div>
  );
}

export default Product;
