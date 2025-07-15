import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const backendURL = 'https://website-backend-project.vercel.app';

const AdminAddProductPage = () => {
  const [product, setProduct] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}/product`);
      setProducts(res.data);
    } catch {
      toast.error('❌ Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.title.trim() || !product.author.trim()) {
      toast.error('Title and Author are required!');
      return;
    }
    if (isNaN(product.price) || Number(product.price) <= 0) {
      toast.error('Enter a valid price!');
      return;
    }

    try {
      await axios.post(`${backendURL}/admin/add-product`, product);
      toast.success('✅ Product added successfully');
      setProduct({ title: '', author: '', price: '', description: '' });
      fetchProducts();
    } catch {
      toast.error('❌ Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${backendURL}/admin/delete-product/${id}`);
      toast.success('🗑️ Product deleted');
      fetchProducts();
    } catch {
      toast.error('❌ Failed to delete product');
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🛠️ Admin Panel – Add Product</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="author"
          placeholder="Author / Brand"
          value={product.author}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="price"
          placeholder="Price (PKR)"
          value={product.price}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>➕ Add Product</button>
      </form>

      <h3 style={styles.subheading}>📦 Existing Products</h3>

      {loading ? (
        <p style={styles.loading}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={styles.loading}>No products found.</p>
      ) : (
        <div style={styles.productList}>
          {products.map((p) => (
            <div key={p._id} style={styles.productCard}>
              <div style={styles.productDetails}>
                <div style={styles.productTitle}>{p.title}</div>
                <div style={styles.meta}>
                  <span style={styles.tag}>{p.author}</span>
                  <span style={styles.price}>Rs. {p.price}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#e9ecef', // light gray theme
    minHeight: '100vh',
    padding: '40px 16px',
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: '26px',
    textAlign: 'center',
    marginBottom: '28px',
    fontWeight: 'bold',
    color: '#2f2f2f',
  },
  form: {
    backgroundColor: '#fff',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
  },
  textarea: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minHeight: '80px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  subheading: {
    fontSize: '22px',
    margin: '40px 0 20px',
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  productList: {
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  productCard: {
    background: '#fff',
    padding: '16px 20px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    flexWrap: 'wrap',
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  productTitle: {
    fontWeight: '600',
    fontSize: '1rem',
    color: '#222',
  },
  meta: {
    display: 'flex',
    gap: '10px',
    fontSize: '0.9rem',
    color: '#777',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#dee2e6',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: '500',
  },
  price: {
    fontWeight: '600',
    color: '#28a745',
  },
  deleteBtn: {
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default AdminAddProductPage;
