
// src/components/ProductCard.jsx

import React from "react";
import { useCart } from "../context/CartContext";
import { styles } from "../styles/styles";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={styles.productCard}>
      <div style={styles.productImage}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={styles.productImageTag}
          />
        ) : (
          <span style={{ fontSize: "3rem" }}>📚</span>
        )}
      </div>

      <h3 style={styles.productName}>{product.name}</h3>
      <p style={styles.productPrice}>${product.price}</p>

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
