// src/components/ProductCard.jsx

import React from "react";
import { useCart } from "../context/CartContext";
import { styles } from "../styles/styles";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={styles.productCard}>
      {/* Show emoji or default if no image field */}
      <div style={styles.productImage}>
        {product.image || '📚'}
      </div>

      <h3 style={styles.productName}>{product.name}</h3>
      <p style={styles.productPrice}>
        ${product.price}
      </p>

      <button
        style={styles.addToCartButton}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
