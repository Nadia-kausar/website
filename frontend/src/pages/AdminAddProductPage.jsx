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
    } catch (err) {
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
    } catch (error) {
      toast.error('❌ Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${backendURL}/admin/delete-product/${id}`);
      toast.success('🗑️ Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('❌ Failed to delete product');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>➕ Add New Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Title"
          value={product.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="author"
          placeholder="Author"
          value={product.author}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>

      <h3 style={styles.subheading}>📦 All Products</h3>
      {loading ? (
        <p style={{ color: '#aaa', marginTop: 20 }}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{ color: '#888', marginTop: 20 }}>No products found.</p>
      ) : (
        <ul style={styles.list}>
          {products.map((p) => (
            <li
              key={p._id}
              style={styles.item}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#191919')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = '#111')
              }
            >
              <div>
                <strong>{p.title}</strong> — {p.author} (${p.price})
              </div>
              <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 24px',
    fontFamily: 'Poppins, sans-serif',
    background: '#000',
    color: '#f5f5f5',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '24px',
    fontWeight: '700',
  },
  subheading: {
    marginTop: '40px',
    fontSize: '22px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '400px',
    background: '#111',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #333',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #555',
    backgroundColor: '#222',
    color: '#fff',
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #555',
    backgroundColor: '#222',
    color: '#fff',
    minHeight: '80px',
  },
  button: {
    background: '#00ffc8',
    color: '#000',
    padding: '10px 16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    marginTop: '10px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
  },
  item: {
    background: '#111',
    padding: '16px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #333',
    marginBottom: '12px',
    transition: 'background 0.2s',
  },
  deleteBtn: {
    background: 'red',
    color: '#fff',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default AdminAddProductPage;
