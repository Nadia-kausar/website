import React from 'react';

const styles = {
  page: {
    maxWidth: 960,
    margin: '40px auto',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#fff',
    padding: 24,
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    borderRadius: 12,
    color: '#2D3748',
  },
  header: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 24,
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: 12,
  },
  cartList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #E2E8F0',
  },
  itemImageWrapper: {
    flexShrink: 0,
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 20,
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemDetails: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1a202c',
    marginBottom: 6,
  },
  itemPrice: {
    color: '#319795',
    fontWeight: 700,
    fontSize: 16,
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    border: '1px solid #CBD5E0',
    borderRadius: 4,
    width: 28,
    height: 28,
    fontSize: 18,
    fontWeight: 700,
    color: '#2D3748',
    backgroundColor: '#f7fafc',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.2s',
  },
  quantityButtonHover: {
    backgroundColor: '#e2e8f0',
  },
  quantityNumber: {
    minWidth: 32,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
    color: '#2D3748',
  },
  removeButton: {
    marginLeft: 24,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#c53030',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 14,
    transition: 'color 0.3s',
  },
  removeButtonHover: {
    color: '#9b2c2c',
  },
  summary: {
    marginTop: 32,
    paddingTop: 24,
    borderTop: '2px solid #E2E8F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 700,
    color: '#2D3748',
  },
  checkoutButton: {
    marginTop: 32,
    width: '100%',
    backgroundColor: '#319795',
    color: 'white',
    padding: '16px 0',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  checkoutButtonHover: {
    backgroundColor: '#2c7a7b',
  },
  emptyCart: {
    textAlign: 'center',
    color: '#718096',
    fontSize: 18,
    paddingTop: 80,
  },
};

const CartPage = ({ cartItems, updateQuantity, removeItem, proceedToCheckout }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div style={styles.emptyCart}>Your cart is empty.</div>;
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Your Shopping Cart</h1>

      <ul style={styles.cartList}>
        {cartItems.map((item) => (
          <li key={item.id} style={styles.cartItem}>
            <div style={styles.itemImageWrapper}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
            </div>

            <div style={styles.itemDetails}>
              <div style={styles.itemName}>{item.name}</div>
              <div style={styles.itemPrice}>${item.price.toFixed(2)}</div>
              <div style={styles.quantityControl}>
                <button
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  title="Decrease quantity"
                >
                  –
                </button>
                <div style={styles.quantityNumber}>{item.quantity}</div>
                <button
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              style={styles.removeButton}
              onClick={() => removeItem(item.id)}
              title="Remove item"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#9b2c2c')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#c53030')}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div style={styles.summary}>
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <button
        style={styles.checkoutButton}
        onClick={proceedToCheckout}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2c7a7b')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#319795')}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
